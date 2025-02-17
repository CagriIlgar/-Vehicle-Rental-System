import { NextResponse } from 'next/server';
import { pool } from '@/lib/mysql';
// burda request yerine ilkten NextRequest yazmistim kabul etmedi
//Aksesuarlari listeleme get kullanarak
export async function GET() {
    try {
        const [accessories]: any[] = await pool.execute(`SELECT AccessoryID, AccessoryName, Availability, CostPerDay,Quantity,SellerID FROM accessory`);
        return NextResponse.json({ accessories });
        //return NextResponse.json({ accessories }, { status: 200 });
    }
    catch (error: unknown) {
        return NextResponse.json({ message: 'Failed to get accessories', error: (error as Error).message }, { status: 500 });
    }
}

//kullanicinin aksesuar eklemesi
export async function POST(req: Request) {
    try {
        const { AccessoryID, AccessoryName, Availability, CostPerDay, Quantity, SellerID } = await req.json();
        if (!AccessoryName || Availability === undefined || !CostPerDay || Quantity === undefined || !SellerID) {
            return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
        }
        //bu kisimda eklenir aksesuarlar
        const [result]: any = await pool.execute(
            `INSERT INTO accessory (AccessoryName, Availability, CostPerDay,Quantity,SellerID) VALUES (?,?,?,?,?)`,
            [AccessoryName, Availability, CostPerDay, Quantity, SellerID]
        );
        return NextResponse.json({ message: 'Accessory Added Succesfully', AccessoryID: result.insertID }, { status: 201 });
    }
    catch (error: unknown) {
        return NextResponse.json({ message: 'Failed to add accessory', error: (error as Error).message }, { status: 500 });
    }
}

//Aksesuar guncellemesi
export async function PUT(req: Request) {
    try {
        const { AccessoryID, AccessoryName, Availability, CostPerDay, Quantity, SellerID } = await req.json();
        if (!AccessoryID) {
            return NextResponse.json({ message: 'Accessory ID is required' }, { status: 400 });
        }
        const [result]: any = await pool.execute(
            `UPDATE accessory SET AccessoryName = ?, Availability = ?, CostPerDay = ?, Quantity = ?, SellerID = ? WHERE AccessoryID = ?`,
            [AccessoryID, AccessoryName, Availability, CostPerDay, Quantity, SellerID]
        );
        if (result.affectedRows === 0) {
            return NextResponse.json({ message: 'Accessory not found or no changes applied' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Accessory updated successfully' }, { status: 200 });
    }
    catch (error: unknown) {
        return NextResponse.json({ message: 'Failed to update accessory', error: (error as Error).message }, { status: 500 });
    }
}

//Aksesuar silme
export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const AccessoryID = searchParams.get('AccessoryID');
        if (!AccessoryID) {
            return NextResponse.json({ message: 'AccessoryID is required' }, { status: 400 });
        }
        const [result]: any = await pool.execute(`DELETE FROM accessory WHERE AccessoryID= ?,[AccessoryID]`);
        if (result.affectedRows === 0) {
            return NextResponse.json({ message: 'Accessory not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Accessory Deleted Succesfully' }, { status: 200 });
    }
    catch (error: unknown) {
        return NextResponse.json({ message: 'Failed to delete aceessory', error: (error as Error).message }, { status: 500 })
    }
}