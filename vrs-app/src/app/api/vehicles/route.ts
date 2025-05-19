import { NextRequest, NextResponse } from 'next/server';
import { pool } from '../../../lib/mysql';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import type { RowDataPacket, OkPacket } from 'mysql2';

// Helper to convert Web ReadableStream to Node Readable
async function webStreamToNodeReadable(webStream: ReadableStream<Uint8Array>) {
  const reader = webStream.getReader();
  const stream = new Readable({
    async read() {
      try {
        const { done, value } = await reader.read();
        this.push(done ? null : value);
      } catch (error: unknown) {
        this.destroy(error instanceof Error ? error : new Error('Unknown stream error.'));
      }
    },
  });
  return stream;
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const sellerId = url.searchParams.get("sellerId");

    let query = `
      SELECT 
        v.VehicleID, 
        v.Type, 
        v.Brand, 
        v.Model,
        v.Year,  
        v.FuelType, 
        v.Transmission, 
        v.Seats, 
        v.PricePerDay, 
        v.AvailabilityStatus, 
        v.Color, 
        v.Photo,
        v.LargeBag,      
        v.ImportantInfo, 
        v.Contact,
        v.LocationID,
        l.Address,
        l.City,
        l.Latitude,
        l.Longitude,
        s.ContactPersonName as SellerName, 
        s.ContactPersonSurname as SellerSurname
      FROM vehicle v
      LEFT JOIN seller s ON v.SellerID = s.SellerID
      LEFT JOIN location l ON v.LocationID = l.LocationID
    `;

    const params: (string | null)[] = [];

    if (sellerId) {
      query += " WHERE v.SellerID = ?";
      params.push(sellerId);
    }

    const [vehicles] = await pool.execute<RowDataPacket[]>(query, params);
    return NextResponse.json({ vehicles });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error fetching vehicles:', message);
    return NextResponse.json({ message: 'Failed to fetch vehicles', error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const photo = formData.get('vehiclePhoto') as File | null;

    if (!photo) {
      return NextResponse.json({ message: 'Photo is required.' }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), 'public/uploads');
    await fs.promises.mkdir(uploadsDir, { recursive: true });

    const photoName = `${Date.now()}-${photo.name}`;
    const photoPath = path.join(uploadsDir, photoName);

    const photoStream = photo.stream();
    const nodeReadableStream = await webStreamToNodeReadable(photoStream);
    const writeStream = fs.createWriteStream(photoPath);
    nodeReadableStream.pipe(writeStream);

    await new Promise<void>((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    const {
      vehicleType: type = '',
      vehicleBrand: brand = '',
      vehicleModel: model = '',
      vehicleYear: year = '',
      vehicleFuelType: fuelType = '',
      transmission = '',
      vehicleSeats: seats = '',
      vehiclePrice: pricePerDay = '',
      vehicleAvailability: availability = '',
      vehicleColor: color = '',
      largeBar: largeBag = '',
      info: importantInfo = '',
      vehicleLocationID: locationID = null,
      contact = '',
      sellerId = '',
    } = Object.fromEntries(formData);

    const finalLocationID = locationID ? locationID : null;

    const [result] = await pool.execute<OkPacket>(
      `INSERT INTO vehicle 
        (Type, Brand, Model, Year, FuelType, Transmission, Seats,  PricePerDay, Photo, LargeBag, AvailabilityStatus,  Color,   ImportantInfo, Contact, LocationID, SellerID) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        type || null,
        brand || null,
        model || null,
        year || null,
        fuelType || null,
        transmission || null,
        seats || null,
        pricePerDay || null,
        `/uploads/${photoName}`,
        largeBag || null,
        availability || null,
        color || null,
        importantInfo || null,
        contact || null,
        finalLocationID,
        sellerId || null,
      ]
    );

    return NextResponse.json({ message: 'Vehicle added successfully!', vehicleId: result.insertId }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error in POST:', message);
    return NextResponse.json({ message: 'Failed to add vehicle', error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { vehicleID }: { vehicleID?: number } = await req.json();

    if (!vehicleID) {
      return NextResponse.json({ message: 'Vehicle ID is required.' }, { status: 400 });
    }

    const [result] = await pool.execute<OkPacket>(
      `DELETE FROM vehicle WHERE VehicleID = ?`,
      [vehicleID]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'No vehicle found with the given ID' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Vehicle deleted successfully' }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error in DELETE:', message);
    return NextResponse.json({ message: 'Failed to delete vehicle', error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { VehicleID, AvailabilityStatus }: { VehicleID?: number; AvailabilityStatus?: string } = await req.json();

    if (!VehicleID || !AvailabilityStatus) {
      return NextResponse.json({ message: 'VehicleID and AvailabilityStatus are required' }, { status: 400 });
    }

    const [result] = await pool.execute<OkPacket>(
      `UPDATE vehicle SET AvailabilityStatus = ? WHERE VehicleID = ?`,
      [AvailabilityStatus, VehicleID]
    );

    if (result.affectedRows > 0) {
      return NextResponse.json({ message: 'Availability status updated successfully' });
    }

    return NextResponse.json({ message: 'Failed to update availability status' }, { status: 400 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error in PUT:', message);
    return NextResponse.json({ message: 'Failed to update availability status', error: message }, { status: 500 });
  }
}
