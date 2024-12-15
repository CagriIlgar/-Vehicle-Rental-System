import { NextResponse } from 'next/server';
import { pool } from '../../../lib/mysql';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  const { name, surname, email, password,phone, businessName, industry, businessCity, businessAddress } = await request.json();
  if (!name || !surname || !email || !password || !phone || !businessName || !industry || !businessCity || !businessAddress) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.execute(
      `INSERT INTO users (email, password, isBusiness) VALUES (?, ?, ?)`,
      [email, hashedPassword, true]
    );

    const [result] = await pool.execute(
      `INSERT INTO seller (BusinessName, Industry, ContactPersonName, ContactPersonSurname, BusinessEmail, BusinessPhone, BusinessCity, BusinessAddress, Password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [businessName, industry, name, surname, email, phone, businessCity, businessAddress, password]
    );

    return NextResponse.json({ message: 'Registration successful', result }, { status: 200 });
  } catch (error) {
    console.error('Error during registration:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Registration failed', error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Unknown error occurred', error: 'Unknown' }, { status: 500 });
  }
}