"use client";
import React, { useEffect, useState } from "react";
import "./view-deal.css";
import ClientLayout from "@/app/client-layout";

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
        <ClientLayout>
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
                    <div className="pickup-location">
                        <div>
                            <h3>Pick Up Location</h3>
                            <p>{vehicle.Address} {vehicle.City}</p>
                        </div>
                        <div>
                            <h3>Drop Off Location</h3>
                            <p>{vehicle.Address} {vehicle.City}</p>
                        </div>
                    </div>
                    <div className="location-info">
                        <div>
                            <h3>Pick-up Date & Time</h3>
                            <p>{new Date(vehicle.StartDate).toDateString()} - {new Date(vehicle.PickUpTime).toTimeString().slice(0, 5)}</p>
                        </div>
                        <div>
                            <h3>Drop-off Date & Time</h3>
                            <p>{new Date(vehicle.EndDate).toDateString()} - {new Date(vehicle.DropOffTime).toTimeString().slice(0, 5)}</p>
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
                                <button
                                    onClick={() =>
                                        setExtras((prev) => ({
                                            ...prev,
                                            babySeat: Math.max(prev.babySeat - 1, 0)
                                        }))
                                    }
                                >
                                    -
                                </button>

                                <span>{extras.babySeat}</span>

                                <button
                                    onClick={() =>
                                        setExtras((prev) => ({
                                            ...prev,
                                            babySeat: Math.min(prev.babySeat + 1, 3)
                                        }))
                                    }
                                >
                                    +
                                </button>

                            </div>
                        </div>

                        <div className="extra-item">
                            <img src="/car-charger.jpg" alt="Car Charger USB" />
                            <div>
                                <h4>Car Charger USB</h4>
                                <p>A simple cigarette lighter USB adapter to charge any USB device on the go.</p>
                            </div>
                            <div className="extra-action">
                                <button
                                    onClick={() =>
                                        setExtras((prev) => ({
                                            ...prev,
                                            carCharger: Math.max(prev.carCharger - 1, 0)
                                        }))
                                    }
                                >
                                    -
                                </button>
                                <span>{extras.carCharger}</span>
                                <button
                                    onClick={() =>
                                        setExtras((prev) => ({
                                            ...prev,
                                            carCharger: Math.min(prev.carCharger + 1, 2)
                                        }))
                                    }
                                >
                                    +
                                </button>
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
        </ClientLayout>
    );
};

export default ViewDeal;