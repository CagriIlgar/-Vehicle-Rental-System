import { pool } from "@/lib/mysql";
import { NextResponse, NextRequest } from "next/server";
import { ResultSetHeader } from "mysql2";

//Handler for GET request (fetch locations by SellerID)
export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const sellerId = url.searchParams.get("sellerId");

        if (!sellerId) {
            return NextResponse.json({ message: "Seller ID is required" }, { status: 400 });
        }

        const [rows]: any[] = await pool.execute(
            "SELECT * FROM location WHERE SellerID = ?",
            [sellerId]
        );

        return NextResponse.json({ locations: rows });
    } catch (error) {
        console.error("Error fetching locations:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}


// Handler for POST request (add a new location)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { SellerID, LocationName, LocationType, Address, City, Latitude, Longitude } = body;

        // Validate required fields
        if (!SellerID || !LocationName || !LocationType || !Address || !City || !Latitude || !Longitude) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const [result]: any = await pool.execute<ResultSetHeader>(
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