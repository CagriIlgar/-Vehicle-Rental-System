'use client';

import React, { useState, useEffect } from 'react';
import VehicleCard from '../../../../components/VehicleCard/VehicleCard';
import './cars.css';

interface Vehicle {
  VehicleID: number;
  Brand: string;
  Model: string;
  Type: string;
  Photo: string;
  Seats: number;
  Transmission: string;
  LargeBag: string;
  UnlimitedMileage: string;
  NormalCost: string;
  PricePerDay: string;
  Contact: string;
  SellerName: string;
  SellerSurname: string;
}

const Cars: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch('/api/vehicles');

        if (!res.ok) {
          throw new Error(`Failed to fetch vehicles: ${res.statusText}`);
        }

        const data = await res.json();

        if (Array.isArray(data.vehicles)) {
          setVehicles(data.vehicles);
        } else {
          throw new Error('Invalid response format: vehicles data is not an array');
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(`Error: ${error.message}`);
          console.error('Error fetching vehicles:', error);
        } else {
          setError('An unknown error occurred');
          console.error('Unexpected error:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleViewDeal = (model: string) => {
    alert(`Viewing details for ${model}`);
  };

  if (loading) return <div>Loading vehicles...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="car-page-container">
      <h1>Available Vehicles</h1>
      <div className="vehicle-list">
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.VehicleID}
            brand={vehicle.Brand}
            image={vehicle.Photo}
            model={vehicle.Model}
            type={vehicle.Type}
            price={vehicle.PricePerDay}
            seats={vehicle.Seats}
            transmission={vehicle.Transmission}
            largeBag={vehicle.LargeBag}
            unlimitedMileage={vehicle.UnlimitedMileage}
            seller={`${vehicle.SellerName} ${vehicle.SellerSurname}`}
            onViewDealClick={() => handleViewDeal(vehicle.Model)}
          />
        ))}
      </div>
    </div>
  );
};

export default Cars;
