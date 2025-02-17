"use client";

import React, { useState } from "react";
import "./viewDeal.css";

const Page = () => {
    const [extras, setExtras] = useState({
        babySeat: 0,
        carCharger: 0,
    });

    const handleAddExtra = (type: "babySeat" | "carCharger") => {
        setExtras((prevExtras) => ({
            ...prevExtras,
            [type]: prevExtras[type] + 1,
        }));
    };

    const handleRemoveExtra = (type: "babySeat" | "carCharger") => {
        setExtras((prevExtras) => ({
            ...prevExtras,
            [type]: Math.max(prevExtras[type] - 1, 0),
        }));
    };

    return (
        <div className="view-deal-container">
            <div className="deal-card">
                <div className="car-info">
                    <img src="/bmw-320i.jpg" alt="BMW 320i" className="car-image" />
                    <div className="details">
                        <h2>BMW 320i</h2>
                        <p>🚘 5 seats &nbsp; ⚙️ Automatic</p>
                        <p>🧳 Large bag &nbsp; ♾️ Unlimited mileage</p>
                    </div>
                </div>

                <div className="location-info">
                    <div>
                        <h3>Pick-up Location</h3>
                        <p>Emu Computer Faculty</p>
                        <p>Monday, Dec 05, 10:30 am</p>
                    </div>
                    <div>
                        <h3>Drop-off Location</h3>
                        <p>Emu Computer Faculty</p>
                        <p>Monday, Dec 05, 10:30 am</p>
                    </div>
                </div>

                <div className="extras">
                    <div className="extra-item">
                        <img src="/baby-seat.jpg" alt="Baby Seat" />
                        <div>
                            <h4>Baby Seat</h4>
                            <p>Forward-facing baby seat suitable for Age: 1-6 years</p>
                            <p>Weight: up to 18 kg</p>
                        </div>
                        <div className="extra-action">
                            <button className="btn green" onClick={() => handleRemoveExtra("babySeat")}>Delete</button>
                            <span className="extra-count">{extras.babySeat}</span>
                            <button className="btn green" onClick={() => handleAddExtra("babySeat")}>Add</button>
                        </div>
                    </div>

                    <div className="extra-item">
                        <img src="/car-charger.jpg" alt="Car Charger USB" />
                        <div>
                            <h4>Car Charger USB</h4>
                            <p>A simple cigarette lighter USB adapter to charge any USB device on the go.</p>
                        </div>
                        <div className="extra-action">
                            <button className="btn green" onClick={() => handleRemoveExtra("carCharger")}>Delete</button>
                            <span className="extra-count">{extras.carCharger}</span>
                            <button className="btn green" onClick={() => handleAddExtra("carCharger")}>Add</button>
                        </div>
                    </div>
                </div>

                <div className="pricing">
                    <p>Rental Price: <strong>$150</strong></p>
                    <p>Options Price: <strong>${extras.babySeat * 10 + extras.carCharger * 5}</strong></p>
                    <p>Total Price: <strong>${150 + extras.babySeat * 10 + extras.carCharger * 5}</strong></p>
                </div>

                <button className="pay-now">Pay Now!</button>
            </div>
        </div>
    );
};

export default Page;