//api/vehicles/route.ts
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

// Handler for GET request (fetch vehicles with their locations)
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
          l.Latitude,
          l.Longitude,
          s.ContactPersonName as SellerName, 
          s.ContactPersonSurname as SellerSurname
        FROM vehicle v
        LEFT JOIN seller s ON v.SellerID = s.SellerID
        LEFT JOIN location l ON v.LocationID = l.LocationID
      `;

    const params: any[] = [];

    if (sellerId) {
      query += " WHERE v.SellerID = ?";
      params.push(sellerId);
    }

    const [vehicles]: any[] = await pool.execute(query, params);

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
      vehicleLocationID: locationID = null, // Ensure default value is null if not provided
      contact = '',
      locationId = '',
      sellerId = '',
    } = Object.fromEntries(formData);

    // Ensure LocationID is either set to null or a default value if not provided
    const finalLocationID = locationID ? locationID : null;

    const [result]: any = await pool.execute(
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
        finalLocationID,  // Use the finalLocationID here
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

//Delete vehicle
export async function DELETE(req: NextRequest) {
  try {
    const { vehicleID } = await req.json(); // Parse the JSON body

    if (!vehicleID) {
      return NextResponse.json({ message: 'Vehicle ID is required.' }, { status: 400 });
    }

    const [result]: any = await pool.execute(
      `DELETE FROM vehicle WHERE VehicleID = ?`,
      [vehicleID]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'No vehicle found with the given ID' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Vehicle deleted successfully' }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error in DELETE:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Failed to delete vehicle', error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Unknown error occurred' }, { status: 500 });
  }
}
export async function PUT(req: NextRequest) {
  try {
    const { VehicleID, Type, Brand, Model, PricePerDay, AvailabilityStatus } = await req.json();

    const query = `
      UPDATE vehicle 
      SET Type = ?, Brand = ?, Model = ?, PricePerDay = ?, AvailabilityStatus = ?
      WHERE VehicleID = ?
    `;
    
    const params = [Type, Brand, Model, PricePerDay, AvailabilityStatus, VehicleID];

    const [result]: any = await pool.execute(query, params);

    if (result.affectedRows > 0) {
      return NextResponse.json({ message: "Vehicle updated successfully" });
    } else {
      return NextResponse.json({ message: "Failed to update vehicle" }, { status: 400 });
    }
  } catch (error: unknown) {
    console.error('Error in PUT:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Failed to edit vehicle', error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Unknown error occurred' }, { status: 500 });
  }
}
