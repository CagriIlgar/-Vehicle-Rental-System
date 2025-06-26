// app/api/vehicles/status/route.ts
import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/mysql";
import type { OkPacket } from "mysql2";

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { VehicleID, AvailabilityStatus } = body;

        if (!VehicleID || !AvailabilityStatus) {
            return NextResponse.json(
                { message: "VehicleID and AvailabilityStatus are required" },
                { status: 400 }
            );
        }

        const [result] = await pool.execute<OkPacket>(
            `UPDATE vehicle SET AvailabilityStatus = ? WHERE VehicleID = ?`,
            [AvailabilityStatus, VehicleID]
        );

        if (result.affectedRows > 0) {
            return NextResponse.json({ message: "Status updated successfully" });
        } else {
            return NextResponse.json({ message: "No vehicle found" }, { status: 404 });
        }
    } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
        { message: "Failed to update status", error: message },
        { status: 500 }
    );
}

}
