"use client"

import React, { useState, useEffect } from "react";
import VehicleCard from "../../../../components/VehicleCard/VehicleCard";
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
  NormalCost: string;
  PricePerDay: string;
  Contact: string;
  SellerName: string;
  SellerSurname: string;
  Color: string;
}

const Bicycles: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("price");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

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
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred");
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
      default:
        return 0;
    }
  };

  const filterByPrice = (price: string): boolean => {
    const pricePerDay = parseFloat(price);
    if (selectedPriceRanges.length === 0) return true;
    return selectedPriceRanges.some(range => {
      const [min, max] = range.split("-").map(Number);
      return max ? pricePerDay >= min && pricePerDay <= max : pricePerDay >= min;
    });
  };

  const filterByColor = (color: string): boolean => {
    return selectedColors.length === 0 || selectedColors.includes(color.toLowerCase());
  };

  const filteredVehicles = vehicles
    .filter(vehicle =>
      vehicle.Type === "Bicycle" &&
      filterByPrice(vehicle.PricePerDay) &&
      filterByColor(vehicle.Color) &&
      (vehicle.Brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.Model.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort(handleSort);

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
        </div>
        <div className="vehicles-list">
          <h1>Available Bicycles</h1>
          <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
            <option value="price">Sort by Price (Low to High)</option>
            <option value="seats">Sort by Seats</option>
          </select>
          <div>
            {filteredVehicles.map(vehicle => (
              <VehicleCard
                key={vehicle.VehicleID}
                brand={vehicle.Brand}
                image={vehicle.Photo}
                model={vehicle.Model}
                type={vehicle.Type}
                price={vehicle.PricePerDay}
                seats={vehicle.Seats}
                seller={`${vehicle.SellerName} ${vehicle.SellerSurname}`}
                color={vehicle.Color}
                onViewDealClick={() => handleViewDeal(vehicle.Model)}
              />
            ))}
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default Bicycles;