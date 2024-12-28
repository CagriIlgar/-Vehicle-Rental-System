import { NextRequest, NextResponse } from 'next/server';
import { pool } from '../../../lib/mysql';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';

async function webStreamToNodeReadable(webStream: ReadableStream<Uint8Array>) {
  const reader = webStream.getReader();
  const stream = new Readable({
    async read(size) {
      try {
        const { done, value } = await reader.read();
        if (done) {
          this.push(null);
        } else {
          this.push(value);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.destroy(error);
        } else {
          this.destroy(new Error('An unknown error occurred while reading the stream.'));
        }
      }
    },
  });

  return stream;
}

export async function GET(req: NextRequest) {
  try {
    const [vehicles]: any[] = await pool.execute(`
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
        v.Location,
        s.ContactPersonName as SellerName, 
        s.ContactPersonSurname as SellerSurname
      FROM vehicle v
      LEFT JOIN seller s ON v.SellerID = s.SellerID
    `);

    return NextResponse.json({ vehicles });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching vehicles:', error.message);
      return NextResponse.json(
        { message: 'Failed to fetch vehicles', error: error.message },
        { status: 500 }
      );
    } else {
      console.error('An unknown error occurred:', error);
      return NextResponse.json(
        { message: 'Failed to fetch vehicles', error: 'Unknown error occurred' },
        { status: 500 }
      );
    }
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
      vehicleLocation: location = '',
      contact = '',
      sellerId = '',
    } = Object.fromEntries(formData);

    const [result]: any = await pool.execute(
      `INSERT INTO vehicle 
         (Type, Brand, Model, Year, FuelType, Transmission, Seats,  PricePerDay, Photo, LargeBag, AvailabilityStatus,  Color,   ImportantInfo, Contact, Location, SellerID) 
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
        location || null,
        sellerId || null,
      ]
    );

    return NextResponse.json({ message: 'Vehicle added successfully!', vehicleId: result.insertId }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error in POST:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Failed to add vehicle', error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Unknown error occurred' }, { status: 500 });
  }
}

