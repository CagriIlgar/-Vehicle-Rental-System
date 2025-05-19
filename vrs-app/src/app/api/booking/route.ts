import { NextRequest, NextResponse } from 'next/server';
import { pool } from '../../../lib/mysql';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// Define types
interface Booking extends RowDataPacket {
    BookingID: number;
    StartDate: string;
    EndDate: string;
    TotalCost: number;
    Status: string;
    Location: string;
    CustomerName: string;
    CustomerSurname: string;
    Brand: string;
    Model: string;
    Accessories?: Accessory[];
}

interface Accessory extends RowDataPacket {
    AccessoryID: number;
    AccessoryName: string;
    Quantity: number;
    TotalCost: number;
}

// GET: Fetch all booking details with accessories
export async function GET() {
    try {
        const [bookings] = await pool.execute<Booking[]>(`
      SELECT 
        b.BookingID, b.StartDate, b.EndDate, b.TotalCost, b.Status, b.Location,
        c.CustomerName, c.CustomerSurname, v.Brand, v.Model
      FROM booking b
      JOIN customer c ON b.CustomerID = c.CustomerID
      JOIN vehicle v ON b.VehicleID = v.VehicleID
      ORDER BY b.StartDate DESC
    `);

        for (const booking of bookings) {
            const [accessories] = await pool.execute<Accessory[]>(
                `SELECT a.AccessoryID, a.AccessoryName, ba.Quantity, ba.TotalCost
         FROM booking_accessory ba
         JOIN accessory a ON ba.AccessoryID = a.AccessoryID
         WHERE ba.BookingID = ?`,
                [booking.BookingID]
            );
            booking.Accessories = accessories;
        }

        return NextResponse.json({ bookings });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return NextResponse.json(
            { message: 'Failed to fetch bookings', error: (error as Error).message },
            { status: 500 }
        );
    }
}

// POST: Create a new booking with optional accessories
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const formValues = Object.fromEntries(formData);

        const { startDate, endDate, totalCost, customerId, vehicleId, location } = formValues;
        let accessories = formData.get('accessories');

        if (!startDate || !endDate || !totalCost || !customerId || !vehicleId || !location) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const [bookingResult] = await pool.execute<ResultSetHeader>(
            `INSERT INTO booking (StartDate, EndDate, TotalCost, CustomerID, VehicleID, Location) 
       VALUES (?, ?, ?, ?, ?, ?)`,
            [startDate, endDate, totalCost, customerId, vehicleId, location]
        );
        const bookingId = bookingResult.insertId;

        if (accessories && typeof accessories === 'string' && accessories.trim() !== '') {
            try {
                // Clean extra quotes from stringified JSON
                if (accessories.startsWith('"') && accessories.endsWith('"')) {
                    accessories = accessories.slice(1, -1);
                }

                const accessoryList = JSON.parse(accessories);

                if (!Array.isArray(accessoryList)) {
                    throw new Error('Accessories must be an array.');
                }

                for (const accessory of accessoryList) {
                    const { accessoryId, quantity, totalCost } = accessory;

                    if (!accessoryId || !quantity || !totalCost) {
                        return NextResponse.json({ message: 'Invalid accessory data format' }, { status: 400 });
                    }

                    const [check] = await pool.execute<RowDataPacket[]>(
                        'SELECT 1 FROM accessory WHERE AccessoryID = ?',
                        [accessoryId]
                    );

                    if (check.length === 0) {
                        return NextResponse.json({ message: `Accessory ID ${accessoryId} does not exist.` }, { status: 400 });
                    }

                    await pool.execute(
                        `INSERT INTO booking_accessory (BookingID, AccessoryID, Quantity, TotalCost) 
             VALUES (?, ?, ?, ?)`,
                        [bookingId, accessoryId, quantity, totalCost]
                    );
                }
            } catch (err) {
                console.error('Error parsing accessories:', err);
                return NextResponse.json({ message: 'Invalid accessory data format' }, { status: 400 });
            }
        }

        return NextResponse.json({ message: 'Booking created successfully!', bookingId }, { status: 201 });
    } catch (error) {
        console.error('Error in POST:', error);
        return NextResponse.json(
            { message: 'Failed to create booking', error: (error as Error).message },
            { status: 500 }
        );
    }
}

// DELETE: Delete booking and its accessories
export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const bookingId = searchParams.get('id');

        if (!bookingId) {
            return NextResponse.json({ message: 'Booking ID is required' }, { status: 400 });
        }

        await pool.execute('DELETE FROM booking_accessory WHERE BookingID = ?', [bookingId]);

        const [result] = await pool.execute<ResultSetHeader>(
            'DELETE FROM booking WHERE BookingID = ?',
            [bookingId]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Booking and its accessories removed successfully' });
    } catch (error) {
        console.error('Error in DELETE:', error);
        return NextResponse.json(
            { message: 'Failed to remove booking', error: (error as Error).message },
            { status: 500 }
        );
    }
}
