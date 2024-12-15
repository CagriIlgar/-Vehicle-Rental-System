import { pool } from '../../../lib/mysql';

export async function GET(req: Request) {
  try {
    const [vehicles]: any[] = await pool.execute(`
      SELECT 
        v.VehicleID, 
        v.Model, 
        v.Type, 
        v.Photo, 
        v.Seats, 
        v.Transmission, 
        v.LargeBag, 
        v.UnlimitedMileage, 
        v.NormalCost, 
        v.PricePerDay, 
        v.ImportantInfo, 
        v.Contact,
        s.ContactPersonName as SellerName, 
        s.ContactPersonSurname as SellerSurname
      FROM vehicle v
      LEFT JOIN seller s ON v.SellerID = s.SellerID
    `);
    
    const vehiclesWithBase64Photos = vehicles.map((vehicle: any) => {
      const base64Image = vehicle.Photo ? Buffer.from(vehicle.Photo).toString('base64') : null;
      return { ...vehicle, Photo: base64Image };
    });

    console.log('Vehicles fetched:', vehiclesWithBase64Photos);
    return new Response(JSON.stringify(vehiclesWithBase64Photos), { status: 200 });
  } catch (error: any) {
    if (error instanceof Error) {
      console.error('Error fetching vehicles:', error.message);
      return new Response(JSON.stringify({ message: 'Error fetching vehicles', error: error.message }), { status: 500 });
    } else {
      console.error('An unknown error occurred');
      return new Response(JSON.stringify({ message: 'An unknown error occurred' }), { status: 500 });
    }
  }
}