"use client"

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import ClientLayout from "@/app/client-layout";
import "./profile.css";

interface Vehicle {
  VehicleID: number;
  Type: string;
  Brand: string;
  Model: string;
  Year: number;
  FuelType: string;
  Transmission: string;
  Seats: number;
  PricePerDay: number;
  AvailabilityStatus: string;
  Color: string;
  Photo: string;
  LargeBag: string;
  ImportantInfo: string;
  Contact: string;
  Location: string;
  SellerName: string;
  SellerSurname: string;
}

interface Location {
  LocationName: string;
  LocationType: string;
  Address: string;
  City: string;
  Latitude: string;
  Longitude: string;
}

const ProfilePage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [locationData, setLocationData] = useState({
    LocationName: "",
    LocationType: "",
    Address: "",
    City: "",
    Latitude: "",
    Longitude: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const fetchLocations = async () => {
    if (session && session.user) {
      const response = await fetch(`/api/location?sellerId=${session.user.id}`);
      const data = await response.json();
      if (response.ok) {
        setLocations(data.locations);
      } else {
        setMessage(data.message || "Failed to fetch locations.");
      }
    }
  };

  useEffect(() => {
    if (session && session.user) {
      const fetchVehicles = async () => {
        const response = await fetch(`/api/vehicles?sellerId=${session.user.id}`);
        const data = await response.json();
        setVehicles(data.vehicles);
      };

      const fetchLocations = async () => {
        const response = await fetch(`/api/location?sellerId=${session.user.id}`);
        const data = await response.json();
        setLocations(data.locations);
      };

      fetchVehicles();
      fetchLocations();
    }
  }, [session]);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocationData((prev) => ({ ...prev, [name]: value }));
  };

  const addLocation = async () => {
    if (
      !locationData.LocationName ||
      !locationData.LocationType ||
      !locationData.Address ||
      !locationData.City ||
      !locationData.Latitude ||
      !locationData.Longitude
    ) {
      setMessage("Please fill all fields.");
      return;
    }
  
    const response = await fetch("/api/location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        SellerID: session?.user.id,
        ...locationData,
      }),
    });
  
    const data = await response.json();
    if (response.ok) {
      setMessage("Location added successfully.");
      fetchLocations();
    } else {
      setMessage(data.message || "Failed to add location.");
    }
  };
  

  const deleteVehicle = async (vehicleId: number) => {
    try {
      const response = await fetch(`/api/vehicles`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vehicleID: vehicleId }),
      });
      const data = await response.json();

      if (response.ok) {
        setVehicles((prevVehicles) =>
          prevVehicles.filter((vehicle) => vehicle.VehicleID !== vehicleId)
        );
        alert("Vehicle deleted successfully!");
      } else {
        alert(`Failed to delete vehicle: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      alert("Failed to delete vehicle");
    }
  };

  if (status === "loading") {
    return <p className="loading-text">Loading...</p>;
  }

  if (!session) {
    return (
      <ClientLayout>
        <div className="profile-container">
          <p className="not-signed-in">You are not signed in.</p>
          <button className="log-in-btn" onClick={() => router.push("/signin")}>
            Log In
          </button>
        </div>
      </ClientLayout>
    );
  }

  const isBusiness = session.user?.isBusiness;

  return (
    <ClientLayout>
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

        {isBusiness && (
          <div className="business-section">
            <div>
              <button
                className="add-car-btn"
                onClick={() => router.push("/addVehicle")}
              >
                Add a Vehicle
              </button>
            </div>

            <div className="location-form">
              <h2>Add Location</h2>
              <input type="text" name="LocationName" value={locationData.LocationName} onChange={handleLocationChange} placeholder="Location Name" />
              <input type="text" name="LocationType" value={locationData.LocationType} onChange={handleLocationChange} placeholder="Location Type" />
              <input type="text" name="Address" value={locationData.Address} onChange={handleLocationChange} placeholder="Address" />
              <input type="text" name="City" value={locationData.City} onChange={handleLocationChange} placeholder="City" />
              <input type="text" name="Latitude" value={locationData.Latitude} onChange={handleLocationChange} placeholder="Latitude" />
              <input type="text" name="Longitude" value={locationData.Longitude} onChange={handleLocationChange} placeholder="Longitude" />
              <button className="add-location-btn" onClick={addLocation}>
                Add Location
              </button>
              {message && <p>{message}</p>}
            </div>

            <div className="business-locations-list">
              <h2 className="business-title">Your Locations</h2>
              {locations.length === 0 ? (
                <p className="no-locations">No locations added yet.</p>
              ) : (
                <div className="location-list">
                  {locations.map((location, index) => (
                    <div key={index} className="location-item">
                      <p>{location.LocationName}</p>
                      <p>{location.LocationType}</p>
                      <p>{location.Address}, {location.City}</p>
                      <p>Latitude: {location.Latitude}, Longitude: {location.Longitude}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="business-cars-list">
              <h2 className="business-title">Your Added Vehicles</h2>

              {vehicles.length === 0 ? (
                <p className="no-cars">No vehicles added yet.</p>
              ) : (
                <div className="vehicle-list">
                  {vehicles.map((vehicle) => (
                    <div key={vehicle.VehicleID} className="vehicle-item">
                      <img
                        src={vehicle.Photo}
                        alt={vehicle.Model}
                        className="vehicle-photo"
                      />
                      <p>{vehicle.Brand} {vehicle.Model}</p>
                      <p>{vehicle.PricePerDay} per day</p>
                      <p>{vehicle.AvailabilityStatus}</p>
                      <button
                        className="delete-btn"
                        onClick={() => deleteVehicle(vehicle.VehicleID)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <button className="sign-out-btn" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
    </ClientLayout>
  );
};

export default ProfilePage;
