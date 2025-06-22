"use client";
import React, { useEffect, useState } from "react";
import "./view-deal.css";
import ClientLayout from "@/app/client-layout";
import { useSession } from "next-auth/react";

type Vehicle = {
    VehicleID: number;
    Photo: string;
    Model: string;
    Brand: string;
    Transmission: string;
    Address: string;
    City: string;
    StartDate: string;
    EndDate: string;
    PickUpTime: string;
    DropOffTime: string;
    TotalPrice: number;
};

const ViewDeal = () => {
    const { data: session } = useSession();
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [extras, setExtras] = useState({ babySeat: 0, carCharger: 0 });

    useEffect(() => {
        const storedVehicle = localStorage.getItem("selectedVehicle");
        if (storedVehicle) {
            setVehicle(JSON.parse(storedVehicle));
        }
    }, []);

    const extraPrice = extras.babySeat * 10 + extras.carCharger * 5;
    const totalCost = vehicle ? vehicle.TotalPrice + extraPrice : 0;

    const updateVehicleStatus = async (vehicleId: number, status: string) => {
        try {
            const response = await fetch("/api/vehicles", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ VehicleID: vehicleId, AvailabilityStatus: status }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(`Failed to update status: ${data.message || "Unknown error"}`);
                return false;
            }
            return true;
        } catch (error) {
            console.error("Error updating vehicle status:", error);
            alert("Failed to update vehicle status");
            return false;
        }
    };

    const handlePayNow = async () => {
        if (!session) {
            window.location.href = "/signin";
            return;
        }

        const userId = session.user?.id;
        const userEmail = session.user?.email;

        if (!vehicle || !userId || !userEmail) {
            alert("Missing information!");
            return;
        }

        const confirmed = window.confirm("Are you sure?");
        if (!confirmed) return;

        const payload = {
            startDate: vehicle.StartDate,
            endDate: vehicle.EndDate,
            totalCost: totalCost,
            customerId: userId,
            vehicleId: vehicle.VehicleID,
            location: `${vehicle.Address} ${vehicle.City}`,
            dropoffAddress: `${vehicle.Address} ${vehicle.City}`,
            pickUpTime: vehicle.PickUpTime,
            dropOffTime: vehicle.DropOffTime,
        };

        try {
            const res = await fetch("/api/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                const updated = await updateVehicleStatus(vehicle.VehicleID, "Rented");

                if (updated) {
                    await fetch("/api/send-booking-mail", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            to: userEmail,
                            vehicle: vehicle,
                            totalPrice: totalCost,
                            extras: extras,
                        }),
                    });

                    window.location.href = "/profile";
                }
            } else {
                alert("Booking failed.");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong!");
        }
    };



    if (!vehicle) {
        return <div>Loading vehicle details...</div>;
    }

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
                                <button onClick={() => setExtras(prev => ({ ...prev, babySeat: Math.max(prev.babySeat - 1, 0) }))}>-</button>
                                <span>{extras.babySeat}</span>
                                <button onClick={() => setExtras(prev => ({ ...prev, babySeat: Math.min(prev.babySeat + 1, 3) }))}>+</button>
                            </div>
                        </div>

                        <div className="extra-item">
                            <img src="/car-charger.jpg" alt="Car Charger USB" />
                            <div>
                                <h4>Car Charger USB</h4>
                                <p>A simple cigarette lighter USB adapter to charge any USB device on the go.</p>
                            </div>
                            <div className="extra-action">
                                <button onClick={() => setExtras(prev => ({ ...prev, carCharger: Math.max(prev.carCharger - 1, 0) }))}>-</button>
                                <span>{extras.carCharger}</span>
                                <button onClick={() => setExtras(prev => ({ ...prev, carCharger: Math.min(prev.carCharger + 1, 2) }))}>+</button>
                            </div>
                        </div>
                    </div>

                    <div className="pricing">
                        <p>Rental Price: <strong>${vehicle.TotalPrice}</strong></p>
                        <p>Options Price: <strong>${extraPrice}</strong></p>
                        <p>Total Price: <strong>${totalCost}</strong></p>
                    </div>

                    <button className="pay-now" onClick={handlePayNow}>Book Now!</button>
                </div>
            </div>
        </ClientLayout>
    );
};

export default ViewDeal;
