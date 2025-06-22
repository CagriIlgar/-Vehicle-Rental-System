import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    const { name, email, message } = await req.json();

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "cyrent.info@gmail.com",
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });

    const mailOptions = {
        from: `"Website Contact Form" <cyrent.info@gmail.com>`,
        to: "cyrent.info@gmail.com",
        subject: `New Contact Message from ${name}`,
        replyTo: email,
        text: `
You received a new message from the website contact form.

Name: ${name}
Email: ${email}

Message:
${message}
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Email send error:", err);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
