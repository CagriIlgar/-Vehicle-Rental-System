"use client";
import React, { useEffect, useState } from "react";
import "./viewDeal.css";

const ViewDeal = () => {
    const [vehicle, setVehicle] = useState<any>(null);
    const [extras, setExtras] = useState({ babySeat: 0, carCharger: 0 });

    useEffect(() => {
        const storedVehicle = localStorage.getItem("selectedVehicle");

        if (storedVehicle) {
            setVehicle(JSON.parse(storedVehicle));
        }
    }, []);

    if (!vehicle) {
        return <div>Loading vehicle details...</div>;
    }

    const extraPrice = extras.babySeat * 10 + extras.carCharger * 5;
    const totalCost = vehicle.TotalPrice + extraPrice;

    return (
        <div className="view-deal-container">
            <div className="deal-card">
                <div className="car-info">
                    <img src={vehicle.Photo} alt={vehicle.Model} className="car-image" />
                    <div className="details">
                        <h2>{vehicle.Brand} {vehicle.Model}</h2>
                        <p>🚘 5 seats &nbsp; ⚙️ {vehicle.Transmission}</p> 
                        <p>🧳 Large bag &nbsp; ♾️ Unlimited mileage</p>
                    </div>
                </div>

                <div className="location-info">
                    <div>
                        <h3>Pick-up Date</h3>
                        <p>{new Date(vehicle.StartDate).toDateString()}</p>
                    </div>
                    <div>
                        <h3>Drop-off Date</h3>
                        <p>{new Date(vehicle.EndDate).toDateString()}</p>
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
                            <button onClick={() => setExtras((prev) => ({ ...prev, babySeat: Math.max(prev.babySeat - 1, 0) }))}>-</button>
                            <span>{extras.babySeat}</span>
                            <button onClick={() => setExtras((prev) => ({ ...prev, babySeat: prev.babySeat + 1 }))}>+</button>
                        </div>
                    </div>

                    <div className="extra-item">
                        <img src="/car-charger.jpg" alt="Car Charger USB" />
                        <div>
                            <h4>Car Charger USB</h4>
                            <p>A simple cigarette lighter USB adapter to charge any USB device on the go.</p>
                        </div>
                        <div className="extra-action">
                            <button onClick={() => setExtras((prev) => ({ ...prev, carCharger: Math.max(prev.carCharger - 1, 0) }))}>-</button>
                            <span>{extras.carCharger}</span>
                            <button onClick={() => setExtras((prev) => ({ ...prev, carCharger: prev.carCharger + 1 }))}>+</button>
                        </div>
                    </div>
                </div>

                <div className="pricing">
                    <p>Rental Price: <strong>${vehicle.TotalPrice}</strong></p>
                    <p>Options Price: <strong>${extraPrice}</strong></p>
                    <p>Total Price: <strong>${totalCost}</strong></p>
                </div>

                <button className="pay-now">Pay Now!</button>
            </div>
        </div>
    );
};

export default ViewDeal;