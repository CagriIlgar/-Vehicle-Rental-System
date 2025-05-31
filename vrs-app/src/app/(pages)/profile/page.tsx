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
  LocationID: number;
  LocationName: string;
  LocationType: string;
  Address: string;
  City: string;
  Latitude: string;
  Longitude: string;
}

interface Booking {
  ReservationNumber: string | number;
  Brand: string;
  Model: string;
  Year: string | number;
  StartDate: string;
  EndDate: string;
  PickUpTime: string;
  DropOffTime: string;
  TotalCost: number;
  Status: string;
  Location: string;
  DropoffAddress: string;
  Photo: string;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);

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
    const fetchCustomerBooking = async () => {
      if (session?.user?.id && !session.user.isBusiness) {
        const res = await fetch(`/api/booking?customerId=${session.user.id}`);
        const data = await res.json();
        if (res.ok && data.bookings) {
          setBookings(data.bookings);
        }
      }
    };

    fetchCustomerBooking();
  }, [session]);

  useEffect(() => {
    if (session && session.user) {
      const fetchVehicles = async () => {
        const response = await fetch(`/api/vehicles?sellerId=${session.user.id}`);
        const data = await response.json();
        setVehicles(data.vehicles);
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

      if (response.ok) {
        alert("Availability status updated!");
      } else {
        alert(`Failed to update status: ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating vehicle status:", error);
      alert("Failed to update vehicle status");
    }
  };


  const deleteLocation = async (locationId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this location?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/location?locationId=${locationId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        setLocations((prevLocations) =>
          prevLocations.filter((location) => location.LocationID !== locationId)
        );
        alert("Location deleted successfully!");
      } else {
        alert(`Failed to delete location: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting location:", error);
      alert("Failed to delete location");
    }
  };


  const deleteVehicle = async (vehicleId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this vehicle?");
    if (!confirmDelete) return;

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
  const isApproved = session.user?.approved;

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
          {!isBusiness && bookings.length > 0 && (
            <div className="booking-details">
              <h2>Your Bookings</h2>
              {bookings.map((booking) => (
                <div key={booking.ReservationNumber} style={{ marginBottom: "20px" }}>
                  <h2>{booking.Brand} {booking.Model} ({booking.Year})</h2>
                  <p><strong>Reservation #:</strong> {booking.ReservationNumber}</p>
                  
                  <p><strong>Start Date:</strong> {new Date(booking.StartDate).toLocaleDateString()}</p>
                  <p><strong>End Date:</strong> {new Date(booking.EndDate).toLocaleDateString()}</p>
                  <p><strong>Pick Up Time:</strong> {booking.PickUpTime} </p>
                  <p><strong>Dropp Off Time:</strong> {booking.DropOffTime}</p>

                  <p><strong>Total Cost:</strong> ${booking.TotalCost}</p>
                  <p><strong>Status:</strong> {booking.Status}</p>
                  <p><strong>Pickup Location:</strong> {booking.Location}</p>
                  <p><strong>Dropoff Address:</strong> {booking.DropoffAddress}</p>
                  <img
                    src={booking.Photo}
                    alt="Vehicle"
                    style={{ width: "300px", borderRadius: "8px", marginTop: "10px" }}
                  />
                </div>
              ))}
            </div>
          )}

        </div>

        {message && (
          <div className="message-box">
            <p>{message}</p>
          </div>
        )}

        {isBusiness && isApproved && (
          <div className="business-section">
            <div className="action-buttons-container">
              <button
                className="add-car-btn"
                onClick={() => router.push("/add-vehicle")}
              >
                Add a Vehicle
              </button>

              <button className="add-car-btn" onClick={() => setIsModalOpen(true)}>
                Add a Location
              </button>
            </div>

            <div className="business-section-flex">
              {isModalOpen && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <h2>Add Location</h2>
                    <form onSubmit={addLocation}>
                      <input type="text" name="LocationName" value={locationData.LocationName} onChange={handleLocationChange} placeholder="Location Name" required />

                      <select
                        name="LocationType"
                        value={locationData.LocationType}
                        onChange={(e) =>
                          setLocationData((prev) => ({ ...prev, LocationType: e.target.value }))
                        }
                        required
                      >
                        <option value="">Select Location Type</option>
                        <option value="Sell Point">Sell Point</option>
                        <option value="Business">Business</option>
                      </select>

                      <input type="text" name="Address" value={locationData.Address} onChange={handleLocationChange} placeholder="Full Address" required />
                      <input type="text" name="City" value={locationData.City} onChange={handleLocationChange} placeholder="Place or City" required />
                      <input type="text" name="Latitude" value={locationData.Latitude} onChange={handleLocationChange} placeholder="Latitude" required />
                      <input type="text" name="Longitude" value={locationData.Longitude} onChange={handleLocationChange} placeholder="Longitude" required />

                      <div className="modal-buttons">
                        <button className="add-location-btn" type="submit">Add</button>
                        <button className="cancel-btn" type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <div className="business-locations-list">
                <h2 className="business-title">Your Locations</h2>
                {locations.length === 0 ? (
                  <p className="no-locations">No locations added yet.</p>
                ) : (
                  <div className="location-list">
                    {locations.map((location, index) => (
                      <div key={index} className="location-item">
                        <p><strong>{location.LocationName}</strong></p>
                        <p>{location.LocationType}</p>
                        <p>{location.Address}, {location.City}</p>
                        <p>Latitude: {Number(location.Latitude).toFixed(3)}</p>
                        <p>Longitude: {Number(location.Longitude).toFixed(3)}</p>
                        <button
                          className="delete-location-btn"
                          onClick={() => deleteLocation(location.LocationID)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="business-cars-list">
              <h2 className="business-title">Your Added Vehicles</h2>

              {vehicles.length === 0 ? (
                <p className="no-cars">No vehicles added yet.</p>
              ) : (
                <div className="vehicle-grid">
                  {vehicles.map((vehicle) => (
                    <div key={vehicle.VehicleID} className="vehicles">
                      <img
                        src={vehicle.Photo}
                        alt={vehicle.Model}
                        className="vehicle-photo"
                      />
                      <p>{vehicle.Brand} {vehicle.Model}</p>
                      <p>{vehicle.PricePerDay} per day</p>
                      <p>Status: {vehicle.AvailabilityStatus}</p>

                      <select
                        value={vehicle.AvailabilityStatus}
                        onChange={(e) =>
                          setVehicles((prev) =>
                            prev.map((v) =>
                              v.VehicleID === vehicle.VehicleID
                                ? { ...v, AvailabilityStatus: e.target.value }
                                : v
                            )
                          )
                        }
                      >
                        <option value="Available">Available</option>
                        <option value="Rented">Rented</option>
                        <option value="Maintenance">Maintenance</option>
                      </select>

                      <div>
                        <button
                          className="update-btn"
                          onClick={() => updateVehicleStatus(vehicle.VehicleID, vehicle.AvailabilityStatus)}
                        >
                          Update Status
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => deleteVehicle(vehicle.VehicleID)}
                        >
                          Delete
                        </button>
                      </div>
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
