"use client";
import React, { useState } from "react";
import "./contact-session.css";

const ContactSection: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [resultMessage, setResultMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setResultMessage(null);

        try {
            const res = await fetch("/api/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setResultMessage("Message sent successfully!");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setResultMessage("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setResultMessage("A server error occurred. Please try again later.");
        }

        setIsLoading(false);
    };

    return (
        <section className="contact-section">
            <div className="contact-form">
                <h2>Get in Touch</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Full Name*</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="email">Email*</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="message">Your Message*</label>
                    <textarea
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Sending..." : "Send Message"}
                    </button>

                    {resultMessage && <p style={{ marginTop: "15px" }}>{resultMessage}</p>}
                </form>
            </div>

            <div className="contact-details">
                <h3>Contact Information</h3>
                <p>
                    <strong>Phone:</strong> +90 555 111 22 33
                </p>
                <p>
                    <strong>Email:</strong> info@cyrent.com
                </p>
                <p>
                    <strong>Location:</strong> Eastern Mediterranean University, Famagusta / TRNC
                </p>
            </div>
        </section>
    );
};

export default ContactSection;
