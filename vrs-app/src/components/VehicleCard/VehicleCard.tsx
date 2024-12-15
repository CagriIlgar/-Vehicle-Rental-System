import React from 'react';
import "../VehicleCard/vehicleCard.css";

type VehicleCardProps = {
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

const VehicleCard: React.FC<VehicleCardProps> = ({ image, model, type, price, seller, onViewDealClick }) => {
  return (
    <div className="vehicle-card">
      <img src={image} alt={model} className="vehicle-image" />
      <div className="vehicle-details">
        <div className="vehicle-info">
          <h3 className="vehicle-model">{model}</h3>
          <p className="vehicle-type">{type} from: {seller}</p>
          <p className="vehicle-price">Price per day:</p>
          <p className="vehicle-price"><span>${price}</span></p>
        </div>
        <div className="vehicle-actions">
          <button className="info-button">Important info</button>
          <button className="contact-button">Contact</button>
          <button onClick={onViewDealClick} className="view-deal-button">View Deal</button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;