"use client";
import "./afterPayment.css";
import React from "react";


const Page = () => {
    return (
        <div className="payment-success-container">
            <div className="payment-content">
                <div className="status-iconlogo">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="icon-checklogo"
                    >
                        <circle cx="12" cy="12" r="12" fill="#4caf50" />
                        <path
                            d="M9 12.5l2.5 2.5 5-5"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <h1 className="payment-title">Payment Successful!</h1>
                <p className="payment-message">Thank you! Your payment has been received.</p>

                <h2 className="details-heading-payment">Reservation Details</h2>
                <div className="reservation-details-payment">
                    <div className="detail-row-payment">
                        <p>
                            <strong>Car Model:</strong>
                        </p>
                        <p>Toyota Corolla</p>
                    </div>
                    <div className="detail-row">
                        <p>
                            <strong>Rental Dates:</strong>
                        </p>
                        <p>Jan 25, 2025 - Jan 30, 2025</p>
                    </div>
                    <div className="detail-row">
                        <p>
                            <strong>Pickup Location:</strong>
                        </p>
                        <p>Downtown Rental Office</p>
                    </div>
                    <div className="detail-row">
                        <p>
                            <strong>Total Amount:</strong>
                        </p>
                        <p>₹ 5000</p>
                    </div>
                </div>

                <p className="footer-message">
                    You can view your reservations in the dashboard.
                </p>

                <button className="ok-button">OK</button>
            </div>
        </div>
    );
};

export default Page;