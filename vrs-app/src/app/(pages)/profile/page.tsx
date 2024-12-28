"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  if (status === "loading") {
    return <p className="loading-text">Loading...</p>;
  }

  if (!session) {
    return (
      <div className="profile-container">
        <p className="not-signed-in">You are not signed in.</p>
        <button className="log-in-btn" onClick={() => router.push("/signin")}>
          Log In
        </button>
      </div>
    );
  }
  else{
    console.log("Session in frontend:", session);

  }

  const isBusiness = session.user?.isBusiness;

  return (
    <div className="profile-container">
      <div className="user-info">
        <h1 className="profile-header">
          {isBusiness ? "Business Profile" : "Customer Profile"}
        </h1>
        {session.user?.image && (
          <img
            src={session.user.image}
            alt="User Avatar"
            className="user-avatar"
          />
        )}
        <p className="user-greeting">
          Welcome, <strong>{session?.user?.name}</strong>!
        </p>
      </div>

      {isBusiness ? (
        <div className="business-section">
          <div>
            <button
              className="add-car-btn"
              onClick={() => router.push("/addVehicle")}
            >
              Add a Vehicle
            </button>
          </div>
          <br />
          <div className="business-cars-list">
            <h2 className="business-title">Your Added Vehicles</h2>

            <p className="no-cars">No vehicles added yet.</p>
          </div>
        </div>
      ) : (
        <div className="rental-info">
          <h2 className="rental-title">Current Rental</h2>
        </div>
      )}

      <button className="sign-out-btn" onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  );
};

export default ProfilePage;
