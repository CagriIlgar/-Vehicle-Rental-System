// src/app/api/admin/route.ts
import { NextResponse } from 'next/server';
import { pool } from '@/lib/mysql';

export async function GET() {
    try {
        const connection = await pool.getConnection();

        const [businesses] = await connection.execute('SELECT * FROM seller');
        const [customers] = await connection.execute('SELECT * FROM customer');

        connection.release();

        return NextResponse.json({ businesses, customers });
    } catch (error) {
        console.error('Database query failed:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const connection = await pool.getConnection();

        if (data.action === 'approve' || data.action === 'disapprove') {
            const approvedStatus = data.action === 'approve' ? 1 : 0;
            await connection.execute(
                'UPDATE seller SET Approved = ? WHERE SellerID = ?',
                [approvedStatus, data.id]
            );
            connection.release();
            return NextResponse.json({ success: true });
        }

        if ('BusinessName' in data) {
            const {
                SellerID,
                BusinessName,
                Industry,
                ContactPersonName,
                ContactPersonSurname,
                BusinessEmail,
                BusinessPhone,
                BusinessCity,
                BusinessAddress,
                Approved,
            } = data;

            await connection.execute(
                `UPDATE seller SET 
                BusinessName = ?, Industry = ?, ContactPersonName = ?, ContactPersonSurname = ?, 
                BusinessEmail = ?, BusinessPhone = ?, BusinessCity = ?, BusinessAddress = ?, Approved = ?
                WHERE SellerID = ?`,
                [
                    BusinessName,
                    Industry,
                    ContactPersonName,
                    ContactPersonSurname,
                    BusinessEmail,
                    BusinessPhone,
                    BusinessCity,
                    BusinessAddress,
                    Approved ?? 1,
                    SellerID,
                ]
            );

            connection.release();
            return NextResponse.json({ success: true });
        }

        if ('CustomerName' in data) {
            const {
                CustomerID,
                CustomerName,
                CustomerSurname,
                DateOfBirth,
                CustomerEmail,
                CustomerPhone,
            } = data;

            await connection.execute(
                `UPDATE customer SET 
                CustomerName = ?, CustomerSurname = ?, DateOfBirth = ?, 
                CustomerEmail = ?, CustomerPhone = ?
                WHERE CustomerID = ?`,
                [
                    CustomerName,
                    CustomerSurname,
                    DateOfBirth,
                    CustomerEmail,
                    CustomerPhone,
                    CustomerID,
                ]
            );

            connection.release();
            return NextResponse.json({ success: true });
        }

        connection.release();
        return NextResponse.json({ error: 'Invalid update payload' }, { status: 400 });

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Update failed:', error.message);
        } else {
            console.error('Update failed:', error);
        }
        return NextResponse.json({ error: 'Server error during update' }, { status: 500 });
    }
}
