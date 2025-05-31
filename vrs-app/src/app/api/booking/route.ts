import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/mysql';
import type { RowDataPacket } from 'mysql2';

interface BookingRow extends RowDataPacket {
    ReservationNumber: string;
    StartDate: string;
    EndDate: string;
    TotalCost: number;
    Status: string;
    Location: string;
    DropoffAddress: string;
    PickUpTime: string;
    DropOffTime: string;

    VehicleID: number;
    Type: string;
    Brand: string;
    Model: string;
    Year: number;
    FuelType: string;
    Transmission: string;
    Seats: number;
    PricePerDay: number;
    AvailabilityStatus: string;
    Color: string;
    Photo: string;
    LargeBag: number;
    ImportantInfo: string;
    Contact: string;
    LocationID: number;
    Address: string;
    City: string;
    Latitude: number;
    Longitude: number;
    SellerName: string;
    SellerSurname: string;
}


function formatDateForMySQL(dateString: string): string {
    const date = new Date(dateString);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

async function generateReservationNumber(): Promise<string> {
    const year = new Date().getFullYear();

    const [rows] = await pool.execute<BookingRow[]>(
        `SELECT COUNT(*) AS count FROM booking WHERE YEAR(StartDate) = ?`,
        [year]
    );

    const count = rows[0].count + 1;
    const paddedCount = count.toString().padStart(2, '0');
    const randomSuffix = generateRandomString(20);

    return `CYRENT-${year}-${paddedCount}-${randomSuffix}`;
}

function formatDateTimeForMySQL(dateString: string): string {
    const date = new Date(dateString);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        const formattedPickUpTime = formatDateTimeForMySQL(data.pickUpTime);
        const formattedDropOffTime = formatDateTimeForMySQL(data.dropOffTime);
        const reservationNumber = await generateReservationNumber();

        await pool.execute(
            `INSERT INTO booking
    (ReservationNumber, StartDate, EndDate, TotalCost, Status, CustomerID, VehicleID, Location, DropoffAddress, PickUpTime, DropOffTime)
    VALUES (?, ?, ?, ?, 'Pending', ?, ?, ?, ?, ?, ?)`,
            [
                reservationNumber,
                formatDateForMySQL(data.startDate),
                formatDateForMySQL(data.endDate),
                data.totalCost,
                data.customerId,
                data.vehicleId,
                data.location,
                data.dropoffAddress,
                formattedPickUpTime,
                formattedDropOffTime
            ]
        );

        return NextResponse.json({
            message: 'Booking created successfully.',
            reservationNumber,
        }, { status: 201 });

    } catch (error) {
        console.error('Booking error:', error);
        return NextResponse.json({ error: 'Failed to create booking.' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const customerId = url.searchParams.get("customerId");

        if (!customerId) {
            return NextResponse.json({ message: "Customer ID is required." }, { status: 400 });
        }

        const [rows] = await pool.execute<BookingRow[]>(
            `SELECT 
    b.ReservationNumber,
    b.StartDate,
    b.EndDate,
    b.TotalCost,
    b.Status,
    b.Location,
    b.DropoffAddress,
    b.PickUpTime,
    b.DropOffTime,
    v.*
    FROM booking b
    JOIN vehicle v ON b.VehicleID = v.VehicleID
    WHERE b.CustomerID = ? AND b.Status != 'Cancelled'
    ORDER BY b.StartDate DESC`
            ,
            [customerId]
        );

        if (rows.length === 0) {
            return NextResponse.json({ bookings: [] }, { status: 200 });
        }

        return NextResponse.json({ bookings: rows }, { status: 200 });

    } catch (error) {
        console.error("Error fetching booking:", error);
        return NextResponse.json({ message: "Server error." }, { status: 500 });
    }
}
