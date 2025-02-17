"use client";

import React, { useState, useEffect } from "react";
import VehicleCard from "../../../../components/VehicleCard/VehicleCard";
import MapComponent from "../../../../components/Map/Map";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/vehicles.css";
import ClientLayout from "@/app/client-layout";

interface Vehicle {
  VehicleID: number;
  Brand: string;
  Model: string;
  Type: string;
  Photo: string;
  AvailabilityStatus: string;
  Seats: number;
  Transmission: string;
  LargeBag: string;
  UnlimitedMileage: string;
  NormalCost: string;
  PricePerDay: string;
  Contact: string;
  SellerName: string;
  SellerSurname: string;
  Color: string;
  Location: string;
}

const Cars: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("price");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [transmission, setTransmission] = useState({
    automatic: false,
    manual: false,
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [locationQuery, setLocationQuery] = useState<string>("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch("/api/vehicles");

        if (!res.ok) {
          throw new Error(`Failed to fetch vehicles: ${res.statusText}`);
        }

        const data = await res.json();

        if (Array.isArray(data.vehicles)) {
          setVehicles(data.vehicles);
        } else {
          throw new Error("Invalid response format: vehicles data is not an array");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(`Error: ${error.message}`);
          console.error("Error fetching vehicles:", error);
        } else {
          setError("An unknown error occurred");
          console.error("Unexpected error:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleSort = (a: Vehicle, b: Vehicle) => {
    switch (sortBy) {
      case "price":
        return parseFloat(a.PricePerDay) - parseFloat(b.PricePerDay);
      case "seats":
        return b.Seats - a.Seats;
      case "brand":
        return a.Brand.localeCompare(b.Brand);
      default:
        return 0;
    }
  };

  const filterByPrice = (price: string): boolean => {
    const pricePerDay = parseFloat(price);
    if (selectedPriceRanges.length === 0) return true;
    return (
      (selectedPriceRanges.includes("0-50") && pricePerDay <= 50) ||
      (selectedPriceRanges.includes("50-100") && pricePerDay > 50 && pricePerDay <= 100) ||
      (selectedPriceRanges.includes("100-150") && pricePerDay > 100 && pricePerDay <= 150) ||
      (selectedPriceRanges.includes("150-200") && pricePerDay > 150 && pricePerDay <= 200) ||
      (selectedPriceRanges.includes("200+") && pricePerDay > 200)
    );
  };

  const filteredVehicles = vehicles
    .filter((vehicle) =>
      vehicle.AvailabilityStatus === "Available" &&
      vehicle.Location.toLowerCase().includes(locationQuery.toLowerCase()) &&
      (transmission.automatic && vehicle.Transmission === "Automatic" || 
       transmission.manual && vehicle.Transmission === "Manual" ||
       (!transmission.automatic && !transmission.manual)) &&
      (vehicle.Brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
       vehicle.Model.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return parseFloat(a.PricePerDay) - parseFloat(b.PricePerDay);
        case "seats":
          return b.Seats - a.Seats;
        case "brand":
          return a.Brand.localeCompare(b.Brand);
        default:
          return 0;
      }
    });

  const handleViewDeal = (model: string) => {
    alert(`Viewing details for ${model}`);
  };

  if (loading) return <div>Loading vehicles...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ClientLayout>
      <div className="vehicles-container">
        <div className="filter-sidebar">
          <h2>Filter by: </h2>
          <input
            type="text"
            placeholder="Search by Brand or Model"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          

          <h3>Price per Day</h3>
          {["0-50", "50-100", "100-150", "150-200", "200+"].map(range => (
            <label key={range}>
              <input
                type="checkbox"
                checked={selectedPriceRanges.includes(range)}
                onChange={() => setSelectedPriceRanges(prev =>
                  prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
                )}
              />
              {range === "200+" ? "$200+" : `$${range.replace("-", " - $")}`}
            </label>
          ))}
          <h3>Color</h3>
          {["Red", "Blue", "Black", "White", "Green"].map(color => (
            <label key={color}>
              <input
                type="checkbox"
                checked={selectedColors.includes(color.toLowerCase())}
                onChange={() => setSelectedColors(prev =>
                  prev.includes(color.toLowerCase())
                    ? prev.filter(c => c !== color.toLowerCase())
                    : [...prev, color.toLowerCase()]
                )}
              />
              {color}
            </label>
          ))}
          <h3>Transmission</h3>
          <label>
            <input
              type="checkbox"
              checked={transmission.automatic}
              onChange={() => setTransmission(prev => ({ ...prev, automatic: !prev.automatic }))}
            />
            Automatic
          </label>
          <label>
            <input
              type="checkbox"
              checked={transmission.manual}
              onChange={() => setTransmission(prev => ({ ...prev, manual: !prev.manual }))}
            />
            Manual
          </label>
        </div>
        <div className="vehicles-list">
          <h1>Available Cars</h1>
          <input
            type="text"
            placeholder="Search by Location"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
          />
          <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
            <option value="price">Sort by Price (Low to High)</option>
            <option value="seats">Sort by Seats</option>
            <option value="brand">Sort by Brand</option>
          </select>
          <h3>Select Rental Dates</h3>
          <div className="date-picker">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              placeholderText="End Date"
            />
          </div>
          <div>
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.VehicleID}
                brand={vehicle.Brand}
                image={vehicle.Photo}
                model={vehicle.Model}
                transmission={vehicle.Transmission}
                color={vehicle.Color}
                type={vehicle.Type}
                price={vehicle.PricePerDay}
                largeBag={vehicle.LargeBag}
                seats={vehicle.Seats}
                seller={`${vehicle.SellerName} ${vehicle.SellerSurname}`}
                onViewDealClick={() => handleViewDeal(vehicle.Model)}
              />
            ))}
          </div>
          <MapComponent center={{ lat: 35.185, lng: 33.382 }} zoom={12} />
        </div>
      </div>
    </ClientLayout>
  );
};

export default Cars;