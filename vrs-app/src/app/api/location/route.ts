import { pool } from "@/lib/mysql";
import { NextResponse, NextRequest } from "next/server";
import { ResultSetHeader, RowDataPacket } from "mysql2";

// Define the type for a location row
interface LocationRow extends RowDataPacket {
    LocationID: number;
    SellerID: number;
    LocationName: string;
    LocationType: string;
    Address: string;
    City: string;
    Latitude: number;
    Longitude: number;
}

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const sellerId = url.searchParams.get("sellerId");

        if (!sellerId) {
            return NextResponse.json({ message: "Seller ID is required" }, { status: 400 });
        }

        const [rows] = await pool.execute<LocationRow[]>(
            "SELECT * FROM location WHERE SellerID = ?",
            [sellerId]
        );

        return NextResponse.json({ locations: rows });
    } catch (error) {
        console.error("Error fetching locations:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { SellerID, LocationName, LocationType, Address, City, Latitude, Longitude } = body;

        if (!SellerID || !LocationName || !LocationType || !Address || !City || !Latitude || !Longitude) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const [result] = await pool.execute<ResultSetHeader>(
            "INSERT INTO location (SellerID, LocationName, LocationType, Address, City, Latitude, Longitude) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [SellerID, LocationName, LocationType, Address, City, Latitude, Longitude]
        );

        if (result.affectedRows > 0) {
            return NextResponse.json({ message: "Location added successfully", id: result.insertId });
        } else {
            return NextResponse.json({ message: "Failed to add location" }, { status: 400 });
        }
    } catch (error) {
        console.error("Error adding location:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const locationId = url.searchParams.get("locationId");

        if (!locationId) {
            return NextResponse.json({ message: "Location ID is required" }, { status: 400 });
        }

        const [result] = await pool.execute<ResultSetHeader>(
            "DELETE FROM location WHERE LocationID = ?",
            [locationId]
        );

        if (result.affectedRows > 0) {
            return NextResponse.json({ message: "Location deleted successfully" });
        } else {
            return NextResponse.json({ message: "Location not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error deleting location:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
