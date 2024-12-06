'use client';

import { useSession, signOut } from "next-auth/react";
import "./profile.css";

const ProfilePage = () => {
  const { data: session, status } = useSession();

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
      <h1 className="profile-header">Profile Page</h1>
      <div className="user-info">
        <p className="user-greeting">
          Welcome, <strong>{session.user?.name || "User"}</strong>!
        </p>
        <p className="user-email">Email: {session.user?.email}</p>
        {session.user?.image && (
          <img
            src={session.user.image}
            alt="User Avatar"
            className="user-avatar"
          />
        )}
      </div>

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

      <button className="sign-out-btn" onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  );
};

export default ProfilePage;
