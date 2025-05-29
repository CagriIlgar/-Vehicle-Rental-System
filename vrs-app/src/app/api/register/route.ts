import { NextResponse } from 'next/server';
import { pool } from '../../../lib/mysql';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  const { name, surname, email, password, dob, phone, recaptchaToken } = await request.json();

  if (!name || !surname || !email || !password || !dob || !phone || !recaptchaToken) {
    return NextResponse.json({ message: 'All fields and reCAPTCHA token are required' }, { status: 400 });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  const verifyResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: secretKey || '',
      response: recaptchaToken,
    }),
  });

  const verifyData = await verifyResponse.json();

  if (!verifyData.success) {
    return NextResponse.json({ message: 'Failed reCAPTCHA verification' }, { status: 400 });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.execute(
      `INSERT INTO users (email, password, isBusiness) VALUES (?, ?, ?)`,
      [email, hashedPassword, 0]
    );

    const [result] = await pool.execute(
      `INSERT INTO customer (CustomerName, CustomerSurname, CustomerEmail, CustomerPassword, DateOfBirth, CustomerPhone)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [name, surname, email, hashedPassword, dob, phone]
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
