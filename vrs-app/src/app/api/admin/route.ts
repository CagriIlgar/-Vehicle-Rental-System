import { pool } from "@/lib/mysql";
import { NextResponse } from "next/server";
import { ResultSetHeader, RowDataPacket } from "mysql2";

// Define the expected shape of the seller row
interface Seller extends RowDataPacket {
    SellerID: number;
    BusinessName: string;
    Industry: string;
    ContactPersonName: string;
    ContactPersonSurname: string;
    BusinessEmail: string;
    BusinessCity: string;
    BusinessAddress: string;
    Password: string;
    Approved: number;
    BusinessPhone: string;
    
}

export async function GET() {
    try {
        const [rows] = await pool.execute<Seller[]>("SELECT * FROM seller WHERE Approved = 0");

        return NextResponse.json({ businesses: rows });
    } catch (error) {
        console.error("Error fetching businesses:", error);
        return NextResponse.error();
    }
}

export async function PUT(request: Request) {
    const { SellerID, approved }: { SellerID: number, approved: boolean } = await request.json();

    try {
        const [result] = await pool.execute<ResultSetHeader>(
            "UPDATE seller SET Approved = ? WHERE SellerID = ?",
            [approved ? 1 : 0, SellerID]
        );

        if (result.affectedRows > 0) {
            return NextResponse.json({ message: "Approval status updated successfully" });
        } else {
            return NextResponse.json({ message: "Failed to update approval status" }, { status: 400 });
        }
    } catch (error) {
        console.error("Error updating approval status:", error);
        return NextResponse.error();
    }
}
