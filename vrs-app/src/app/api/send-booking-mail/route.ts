import nodemailer from "nodemailer";

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { to, vehicle, totalPrice } = body;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "cyrent.info@gmail.com",
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        const mailOptions = {
            from: "cyrent.info@gmail.com",
            to,
            subject: "Vehicle Rent Details - CyRent",
            html: `
                <h2>Reservation Confirmation</h2>
                <p><strong>${vehicle.Brand} ${vehicle.Model}</strong></p>
                <p><strong>Date:</strong> ${formatDate(vehicle.StartDate)} - ${formatDate(vehicle.EndDate)}</p>
                <p><strong>Total Price:</strong> $${totalPrice}</p>
                <p><strong>Address:</strong> ${vehicle.Address}, ${vehicle.City}</p>
                <br/>
                <p>Thank You!</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ message: "Mail sent successfully" }), { status: 200 });
    } catch (error) {
        console.error("Mail send error:", error);
        return new Response(JSON.stringify({ message: "Mail error" }), { status: 500 });
    }
}
