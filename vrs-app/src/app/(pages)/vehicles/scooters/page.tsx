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
  Year: number;
  Transmission: string;
  LargeBag: string;
  FuelType: string;
  PricePerDay: string;
  Contact: string;
  ImportantInfo: string;
  SellerName: string;
  SellerSurname: string;
  Color: string;
  LocationID: number;
  Address: string;
  City: string;
  Latitude: number;
  Longitude: number;
}

const Scooters: React.FC = () => {
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
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);


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

  const [selectedCity, setSelectedCity] = useState<string>("");

  const uniqueCities = Array.from(new Set(vehicles.map(v => v.City))).filter(Boolean).sort();

  const filteredVehicles = vehicles
    .filter((vehicle) =>
      vehicle.Type === "Scooter" &&
      startDate && endDate &&
      vehicle.AvailabilityStatus === "Available" &&
      filterByPrice(vehicle.PricePerDay) &&
      (selectedColors.length === 0 || selectedColors.includes(vehicle.Color.toLowerCase())) &&
      (transmission.automatic && vehicle.Transmission === "Automatic" ||
        transmission.manual && vehicle.Transmission === "Manual" ||
        (!transmission.automatic && !transmission.manual)) &&
      (vehicle.Brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.Model.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCity === "" || vehicle.City === selectedCity)
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

  const handleViewDeal = (vehicle: Vehicle) => {
    if (!startDate || !endDate || !startTime || !endTime) {
      alert("Please select rental dates and times before proceeding.");
      return;
    }

    const dayDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const rentalDays = dayDiff > 0 ? dayDiff : 1;

    const totalPrice = rentalDays * parseFloat(vehicle.PricePerDay);

    const rentalData = {
      VehicleID: vehicle.VehicleID,
      Brand: vehicle.Brand,
      Model: vehicle.Model,
      StartDate: startDate.toISOString(),
      EndDate: endDate.toISOString(),
      PickUpTime: startTime.toISOString(),
      DropOffTime: endTime.toISOString(),
      PricePerDay: vehicle.PricePerDay,
      TotalPrice: totalPrice,
      Photo: vehicle.Photo,
      Address: vehicle.Address,
      City: vehicle.City,
    };

    localStorage.setItem("selectedVehicle", JSON.stringify(rentalData));
    window.location.href = "/view-deal";
  };



  if (loading) return <div>Loading vehicles...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ClientLayout>
      {!startDate || !endDate || !startTime || !endTime ? (
        <div className="date-selection-container">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{ width: "90%", padding: "10px", marginBottom: "10px" }}
          >
            <option value="">All Locations</option>
            {uniqueCities.map((city) => (
              <option key={city} value={city}>
                {city.toUpperCase()}
              </option>
            ))}
          </select>
          <div className="date-picker">
            <div className="date-picker-field">
              <label className="date-picker-label">Pick Up Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Select Start Date"
                minDate={new Date()}
                popperPlacement="bottom"
                className="custom-datepicker"
              />
            </div>

            <div className="date-picker-field">
              <label className="date-picker-label">Drop Off Date</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                placeholderText="Select End Date"
                minDate={startDate || new Date()}
                popperPlacement="bottom"
                className="custom-datepicker"
              />
            </div>

            <div className="date-picker-field">
              <label className="date-picker-label">Pick Up Time</label>
              <DatePicker
                selected={startTime}
                onChange={(time) => setStartTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Pick Up Time"
                dateFormat="h:mm aa"
                placeholderText="Select Time"
                className="custom-datepicker"
              />
            </div>

            <div className="date-picker-field">
              <label className="date-picker-label">Drop Off Time</label>
              <DatePicker
                selected={endTime}
                onChange={(time) => setEndTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Drop Off Time"
                dateFormat="h:mm aa"
                placeholderText="Select Time"
                className="custom-datepicker"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="vehicles-container" style={{ display: "flex", padding: "20px" }}>
          <div className="filter-sidebar">
            <MapComponent center={{ lat: 35.1856, lng: 33.3823 }} zoom={12} vehicles={vehicles} />
            <h2>Filter by: </h2>
            <h3>Change Location</h3>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            >
              <option value="">All Locations</option>
              {uniqueCities.map((city) => (
                <option key={city} value={city}>
                  {city.toUpperCase()}
                </option>
              ))}
            </select>
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

          <div className="vehicles-list" style={{ width: "70%" }}>
            <h1>Available Scooters</h1>
            <input
              type="text"
              placeholder="Search by Brand or Model"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="brand-search"
              style={{ width: "100%" }}
            />
            <select
              onChange={(e) => setSortBy(e.target.value)}
              value={sortBy}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            >
              <option value="price">By Price</option>
              <option value="seats">By Number of Seats</option>
              <option value="brand">By Brand</option>
            </select>
            <div className="date-picker">
              <div className="date-picker-field">
                <label className="date-picker-label">Pick Up Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Select Start Date"
                  minDate={new Date()}
                  popperPlacement="bottom"
                  className="custom-datepicker"
                />
              </div>

              <div className="date-picker-field">
                <label className="date-picker-label">Drop Off Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Select End Date"
                  minDate={startDate || new Date()}
                  popperPlacement="bottom"
                  className="custom-datepicker"
                />
              </div>

              <div className="date-picker-field">
                <label className="date-picker-label">Pick Up Time</label>
                <DatePicker
                  selected={startTime}
                  onChange={(time) => setStartTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Pick Up Time"
                  dateFormat="h:mm aa"
                  placeholderText="Select Time"
                  className="custom-datepicker"
                />
              </div>

              <div className="date-picker-field">
                <label className="date-picker-label">Drop Off Time</label>
                <DatePicker
                  selected={endTime}
                  onChange={(time) => setEndTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Drop Off Time"
                  dateFormat="h:mm aa"
                  placeholderText="Select Time"
                  className="custom-datepicker"
                />
              </div>
            </div>


            {filteredVehicles.length === 0 ? (
              <p>Filtrelere uygun araç bulunamadı.</p>
            ) : (
              filteredVehicles.map((vehicle) => (
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
                  fuelType={vehicle.FuelType}
                  contact={vehicle.Contact}
                  year={vehicle.Year}
                  importantInfo={vehicle.ImportantInfo}
                  sellerName={vehicle.SellerName}
                  sellerSurname={vehicle.SellerSurname}
                  onViewDealClick={() => handleViewDeal(vehicle)}
                />
              ))
            )}
          </div>
        </div>
      )}
    </ClientLayout>
  );
};

export default Scooters;