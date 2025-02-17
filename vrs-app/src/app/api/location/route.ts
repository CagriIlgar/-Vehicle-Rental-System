import { pool } from "@/lib/mysql";
import { NextResponse, NextRequest } from "next/server";
import { ResultSetHeader } from "mysql2";

// Handler for GET request
export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const sellerId = url.searchParams.get("sellerId"); // Get query parameter

    if (!sellerId) {
        return NextResponse.json({ message: "Seller ID is required" }, { status: 400 });
    }

    try {
        const [rows]: any[] = await pool.execute(
            "SELECT * FROM location WHERE SellerID = ?",
            [sellerId]
        );
        return NextResponse.json({ locations: rows });
    } catch (error) {
        console.error("Error fetching locations:", error);
        return NextResponse.error();
    }
}

// Handler for POST request to add a new location
export async function POST(request: NextRequest) {
    const { SellerID, LocationType, Address, City, Latitude, Longitude } = await request.json();

    try {
        const [result]: any = await pool.execute<ResultSetHeader>(
            "INSERT INTO location (SellerID, LocationType, Address, City, Latitude, Longitude) VALUES (?, ?, ?, ?, ?, ?)",
            [SellerID, LocationType, Address, City, Latitude, Longitude]
        );

        if (result.affectedRows > 0) {
            return NextResponse.json({ message: "Location added successfully" });
        } else {
            return NextResponse.json({ message: "Failed to add location" }, { status: 400 });
        }
    } catch (error) {
        console.error("Error adding location:", error);
        return NextResponse.error();
    }
}