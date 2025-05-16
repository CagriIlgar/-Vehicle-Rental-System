import React from "react";
import "../styles/contact-section.css";

const ContactSection: React.FC = () => {
    return (
        <section className="contact-section">
            <div className="contact-form">
                <h2>Get in Touch</h2>
                <form>
                    <label>Full Name*</label>
                    <input type="text" name="name" required />

                    <label>Email*</label>
                    <input type="email" name="email" required />

                    <label>Your Message*</label>
                    <textarea name="message" rows={5} required></textarea>

                    <button type="submit">Send Message</button>
                </form>
            </div>

            <div className="contact-details">
                <h3>Contact Details</h3>
                <p><strong>Phone:</strong> +90 392 630 1518</p>
                <p><strong>Email:</strong> cyrent@email.com</p>
                <p><strong>Location:</strong> Doğu Akdeniz Üniversitesi, Magusa/TRNC</p>
            </div>
        </section>
    );
};

export default ContactSection;