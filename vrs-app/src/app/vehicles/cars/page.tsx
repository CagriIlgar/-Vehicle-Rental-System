'use client';

import React, { useState } from 'react';
import VehicleCard from '../../../components/VehicleCard/VehicleCard';
import "./cars.css";


const Cars: React.FC = () => {
  const handleViewDeal = (model: string) => {
    alert(`Viewing details for ${model}`);
  };

  return (
    <div className='car-page-container'>
      <h1>Available Vehicles</h1>
      <div className="vehicle-list">
        <VehicleCard
          image="/BMW-white.png"
          model="BMW 318i"
          type="Sedan"
          price={50}
          onViewDealClick={() => handleViewDeal('BMW 318i')}
        />
        <VehicleCard
          image="/BMW-white.png"
          model="Audi A4"
          type="SUV"
          price={60}
          onViewDealClick={() => handleViewDeal('Audi A4')}
        />
        <VehicleCard
          image="/BMW-white.png"
          model="Mercedes-Benz C-Class"
          type="Coupe"
          price={70}
          onViewDealClick={() => handleViewDeal('Mercedes-Benz C-Class')}
        />
        <VehicleCard
          image="/BMW-white.png"
          model="Tesla Model 3"
          type="Electric"
          price={80}
          onViewDealClick={() => handleViewDeal('Tesla Model 3')}
        />
        <VehicleCard
          image="/BMW-white.png"
          model="Ford Mustang"
          type="Convertible"
          price={90}
          onViewDealClick={() => handleViewDeal('Ford Mustang')}
        />
      </div>
    </div>
  );
};

export default Cars;

