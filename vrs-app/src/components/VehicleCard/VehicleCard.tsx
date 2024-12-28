import React from 'react';
import "../VehicleCard/vehicleCard.css";

type VehicleCardProps = {
  brand: string;
  image: string;
  model: string;
  type: string;
  price: string;
  seats: number;
  transmission: string;
  largeBag: string;
  unlimitedMileage: string;
  seller: string;
  onViewDealClick: () => void;
};

const VehicleCard: React.FC<VehicleCardProps> = ({ image, model, type, price, seller, seats, transmission, largeBag, brand, onViewDealClick }) => {
  return (
    <div className="vehicle-card">
      <img src={image} alt={model} className="vehicle-image" />
      <div className="vehicle-details">
        <div className="vehicle-left">
          <h3 className="vehicle-model">{brand} {model}</h3>
          <p className="vehicle-type">
            
          </p>
          <div className="vehicle-specs">
            <div className="spec-row">
              <p>{seats} seats</p>
              <p>{transmission}</p>
            </div>
            <div className="spec-row">
              <p>{largeBag} Large bag</p>
              <p></p>
            </div>
          </div>
          <div className="vehicle-buttons">
            <button className="info-button">Important Info</button>
            <button className="contact-button">Contact</button>
          </div>
        </div>

        <div className="vehicle-right">
          <div className="vehicle-price-container">
            <p className="vehicle-price">Price per day:</p>
            <p className="vehicle-price">
              <span>${price}</span>
            </p>
          </div>
          <button onClick={onViewDealClick} className="view-deal-button">
            View Deal
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
