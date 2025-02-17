import { NextRequest, NextResponse } from 'next/server';
import { pool } from '../../../lib/mysql';

//get:bring all booking details with accessories
export async function GET(req: NextRequest) {
    try {
        const [bookings]: any[] = await pool.execute(`
        SELECT 
            b.BookingID, 
            b.StartDate, 
            b.EndDate, 
            b.TotalCost, 
            b.Status, 
            b.Location,
            c.CustomerName, 
            c.CustomerSurname, 
            v.Brand, 
            v.Model
        FROM booking b
        JOIN customer c ON b.CustomerID = c.CustomerID
        JOIN vehicle v ON b.VehicleID = v.VehicleID
        ORDER BY b.StartDate DESC
    `);

        //bring accessories for each booking
        for (let booking of bookings) {
            const [accessories]: any[] = await pool.execute(
                `SELECT a.AccessoryID, a.AccessoryName, ba.Quantity, ba.TotalCost
            FROM booking_accessory ba
            JOIN accessory a ON ba.AccessoryID = a.AccessoryID
            WHERE ba.BookingID = ?`,
                [booking.BookingID]
            );
            booking.Accessories = accessories; //attach accessories to the booking
        }

        return NextResponse.json({ bookings });
    } catch (error: unknown) {
        console.error('Error fetching bookings:', error);
        return NextResponse.json({ message: 'Failed to fetch bookings', error: (error as Error).message }, { status: 500 });
    }
}

//post:insert new booking with accessories
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        console.log("Received formData:", Object.fromEntries(formData));

        const { startDate, endDate, totalCost, customerId, vehicleId, location } = Object.fromEntries(formData);
        let accessories = formData.get("accessories");

        if (!startDate || !endDate || !totalCost || !customerId || !vehicleId || !location) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        //insert booking
        const [bookingResult]: any = await pool.execute(
            `INSERT INTO booking (StartDate, EndDate, TotalCost, CustomerID, VehicleID, Location) 
        VALUES (?, ?, ?, ?, ?, ?)`,
            [startDate, endDate, totalCost, customerId, vehicleId, location]
        );
        const bookingId = bookingResult.insertId;
        console.log(`Booking created with ID: ${bookingId}`);

        //check if accessories exist and properly parse JSON
        if (accessories && typeof accessories === "string" && accessories.trim() !== "") {
            try {
                console.log("Raw Accessories Data:", accessories);

                if (accessories.startsWith('"') && accessories.endsWith('"')) {
                    accessories = accessories.slice(1, -1);
                }

                const accessoryList = JSON.parse(accessories);
                console.log("Parsed Accessories:", accessoryList);

                if (!Array.isArray(accessoryList)) {
                    throw new Error("Accessories must be an array.");
                }

                for (const accessory of accessoryList) {
                    const { accessoryId, quantity, totalCost } = accessory;

                    if (!accessoryId || !quantity || !totalCost) {
                        console.log("Invalid accessory data:", accessory);
                        return NextResponse.json({ message: 'Invalid accessory data format' }, { status: 400 });
                    }

                    //check if accessory exists before inserting into booking_accessory
                    const [accessoryCheck]: any = await pool.execute(
                        "SELECT 1 FROM accessory WHERE AccessoryID = ?",
                        [accessoryId]
                    );

                    if (accessoryCheck.length === 0) {
                        console.log(`Error: Accessory ID ${accessoryId} does not exist.`);
                        return NextResponse.json({ message: `Accessory ID ${accessoryId} does not exist.`, status: 400 });
                    }

                    console.log(`Inserting accessory: BookingID ${bookingId}, AccessoryID ${accessoryId}, Quantity ${quantity}, TotalCost ${totalCost}`);

                    await pool.execute(
                        `INSERT INTO booking_accessory (BookingID, AccessoryID, Quantity, TotalCost) 
                    VALUES (?, ?, ?, ?)`,
                        [bookingId, accessoryId, quantity, totalCost]
                    );

                    console.log(`Accessory ID ${accessoryId} added to Booking ${bookingId}`);
                }
            } catch (error) {
                console.error('Error parsing accessories:', error);
                return NextResponse.json({ message: 'Invalid accessory data format' }, { status: 400 });
            }
        } else {
            console.log("No accessories provided, skipping accessory insert.");
        }

        return NextResponse.json({ message: 'Booking created successfully!', bookingId }, { status: 201 });
    } catch (error: unknown) {
        console.error('Error in POST:', error);
        return NextResponse.json({ message: 'Failed to create booking', error: (error as Error).message }, { status: 500 });
    }
}

//delete:remove bookings and linked accessories
export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const bookingId = searchParams.get('id');

        if (!bookingId) {
            return NextResponse.json({ message: 'Booking ID is required' }, { status: 400 });
        }

        //first: delete accessories linked to the booking
        await pool.execute("DELETE FROM booking_accessory WHERE BookingID = ?", [bookingId]);

        //second: delete the booking itself
        const [result]: any = await pool.execute("DELETE FROM booking WHERE BookingID = ?", [bookingId]);

        if (result.affectedRows === 0) {
            return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
        }

        return NextResponse.json({ message: "Booking and its accessories removed successfully" });
    } catch (error: unknown) {
        console.error('Error in DELETE:', error);
        return NextResponse.json({ message: 'Failed to remove booking', error: (error as Error).message }, { status: 500 });
    }
}