"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import "./profile.css";

interface Car {
  model: string;
  year: number;
  price: number;
  vehicleType: string;
  carPhoto: string;
  seats: number;
  transmission: string;
  largeBar: string;
  normalCost: number;
  location: string;
}


const ProfilePage: React.FC = () => {
  const { data: session, status } = useSession();
  const [isBusinessProfile, setIsBusinessProfile] = useState<boolean>(false);
  const [businessCars, setBusinessCars] = useState<Car[]>([]);

  const handleAddCar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCar: Car = {
      model: formData.get("carModel") as string,
      year: Number(formData.get("carYear")),
      price: Number(formData.get("carPrice")),
      vehicleType: formData.get("vehicleType") as string,
      carPhoto: formData.get("carPhoto") as string,
      seats: Number(formData.get("carSeats")),
      transmission: formData.get("transmission") as string,
      largeBar: formData.get("largeBar") as string,
      normalCost: Number(formData.get("normalCost")),
      location: formData.get("location") as string,
    };
    setBusinessCars([...businessCars, newCar]);
    e.currentTarget.reset();
  };
  

  if (status === "loading") {
    return <p className="loading-text">Loading...</p>;
  }

  if (!session) {
    return (
      <div className="profile-container">
        <p className="not-signed-in">You are not signed in.</p>
        <button className="sign-out-btn" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="user-info">
        <h1 className="profile-header">Profile Page</h1>
        {session.user?.image && (
          <img
            src={session.user.image}
            alt="User Avatar"
            className="user-avatar"
          />
        )}
        <p className="user-greeting">
          Welcome, <strong>{session.user?.name || "User"}</strong>!
        </p>
      </div>


      <div className="profile-toggle">
        <label className="business-checkbox-label">
          <input
            type="checkbox"
            checked={isBusinessProfile}
            onChange={(e) => setIsBusinessProfile(e.target.checked)}
          />
          Business Profile
        </label>
      </div>

      {isBusinessProfile ? (
        <div className="business-section">
          <form className="car-form" onSubmit={handleAddCar}>
            <h2 className="business-title">Add a New Car</h2>
            <div className="form-group">
              <label htmlFor="carModel">Car Model:</label>
              <input type="text" id="carModel" name="carModel" placeholder="e.g., Tesla Model S" required />
            </div>

            <div className="form-group">
              <label htmlFor="vehicleType">Vehicle Type:</label>
              <input type="text" id="vehicleType" name="vehicleType" placeholder="e.g., SUV" required />
            </div>

            <div className="form-group">
              <label htmlFor="carPhoto">Photo URL:</label>
              <input type="url" id="carPhoto" name="carPhoto" placeholder="e.g., https://example.com/car.jpg" required />
            </div>

            <div className="form-group">
              <label htmlFor="carSeats">Number of Seats:</label>
              <input type="number" id="carSeats" name="carSeats" placeholder="e.g., 5" required />
            </div>

            <div className="form-group">
              <label htmlFor="transmission">Transmission:</label>
              <input type="text" id="transmission" name="transmission" placeholder="e.g., Automatic" required />
            </div>

            <div className="form-group">
              <label htmlFor="largeBar">Large Bar (Yes/No):</label>
              <input type="text" id="largeBar" name="largeBar" placeholder="e.g., Yes" required />
            </div>

            <div className="form-group">
              <label htmlFor="normalCost">Normal Cost:</label>
              <input type="number" id="normalCost" name="normalCost" placeholder="e.g., 20000" required />
            </div>

            <div className="form-group">
              <label htmlFor="carPrice">Price per Day:</label>
              <input type="number" id="carPrice" name="carPrice" placeholder="e.g., 100" required />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input type="text" id="location" name="location" placeholder="e.g., New York" required />
            </div>

            <button type="submit" className="submit-btn">Add Car</button>
          </form>

          <div className="business-cars-list">
            <h2 className="business-title">Your Added Cars</h2>
            {businessCars.length > 0 ? (
              businessCars.map((car, index) => (
                <div key={index} className="business-car-item">
                  <p><strong>Model:</strong> {car.model}</p>
                  <p><strong>Vehicle Type:</strong> {car.vehicleType}</p>
                  <p><strong>Photo:</strong> <a href={car.carPhoto} target="_blank" rel="noopener noreferrer">View Photo</a></p>
                  <p><strong>Seats:</strong> {car.seats}</p>
                  <p><strong>Transmission:</strong> {car.transmission}</p>
                  <p><strong>Large Bar:</strong> {car.largeBar}</p>
                  <p><strong>Normal Cost:</strong> ${car.normalCost}</p>
                  <p><strong>Price per Day:</strong> ${car.price}</p>
                  <p><strong>Location:</strong> {car.location}</p>
                </div>
              ))
            ) : (
              <p className="no-cars">No cars added yet.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="rental-info">
          <h2 className="rental-title">Current Rental</h2>
          <div className="rental-details">
            <p>Car Model: Tesla Model 3</p>
            <p>Start Date: 2024-12-01</p>
            <p>End Date: 2024-12-07</p>
            <button className="return-car-btn">Return Car</button>
          </div>

          <h2 className="rental-title">Previous Rentals</h2>
          <div className="previous-rentals">
            <div className="previous-rental">
              <p>Car Model: BMW 320i</p>
              <p>Rental Date: 2024-11-10 to 2024-11-15</p>
            </div>
            <div className="previous-rental">
              <p>Car Model: Audi A4</p>
              <p>Rental Date: 2024-10-20 to 2024-10-25</p>
            </div>
          </div>
        </div>
      )}

      <button className="sign-out-btn" onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  );
};

export default ProfilePage;
