import React, { useState } from "react";
import "../VehicleCard/vehicle-card.css";
import { FaUserFriends, FaCog, FaGasPump, FaSuitcase, FaPalette, FaCalendarAlt } from "react-icons/fa";

type VehicleCardProps = {
  brand?: string;
  image?: string;
  model?: string;
  type?: string;
  year?: number;
  fuelType?: string;
  transmission?: string | null;
  seats?: number | null;
  largeBag?: string | null;
  price?: string;
  color?: string | null;
  importantInfo?: string;
  sellerName?: string;
  sellerSurname?: string;
  contact?: string;
  onViewDealClick: () => void;
};

const VehicleCard: React.FC<VehicleCardProps> = ({
  image,model,price,sellerName,sellerSurname,seats,transmission,
  largeBag,brand,color,year,fuelType,importantInfo,contact,
  onViewDealClick,
}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`vehicle-card ${flipped ? "flipped" : ""}`}>
      <div className="card-inner">

        {/* Front side */}
        <div className="card-front">
          <img src={image} alt={model} className="vehicle-image" />
          <div className="vehicle-details">

            <div className="vehicle-left">
              <h3 className="vehicle-model">{brand} {model}</h3>
              <div className="vehicle-specs">
                <div className="spec-row">
                  {seats != null && (
                    <p className="spec-item">
                      <FaUserFriends className="spec-icon" />
                      {seats} seats
                    </p>
                  )}
                  {transmission && (
                    <p className="spec-item">
                      <FaCog className="spec-icon" />
                      {transmission}
                    </p>
                  )}
                  {fuelType && (
                    <p className="spec-item">
                      <FaGasPump className="spec-icon" />
                      {fuelType}
                    </p>
                  )}
                </div>
                <div className="spec-row">
                  {largeBag && (
                    <p className="spec-item">
                      <FaSuitcase className="spec-icon" />
                      {largeBag} Large bag
                    </p>
                  )}
                  {color && (
                    <p className="spec-item">
                      <FaPalette className="spec-icon" />
                      Color: {color}
                    </p>
                  )}
                  {year && (
                    <p className="spec-item">
                      <FaCalendarAlt className="spec-icon" />
                      Year: {year}
                    </p>
                  )}
                </div>
              </div>
              <div className="vehicle-buttons">
                <button
                  className="info-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFlipped(true);
                  }}
                >
                  More Info
                </button>
              </div>
            </div>

            <div className="vehicle-right">
              <div className="vehicle-price-container">
                <p className="vehicle-price">Price per day:</p>
                <p className="vehicle-price"><span>${price}</span></p>
              </div>
              <button onClick={onViewDealClick} className="view-deal-button">
                View Deal
              </button>
            </div>

          </div>
        </div>

        {/* Back side */}
        <div className="card-back">
          <button
            className="info-button"
            onClick={(e) => {
              e.stopPropagation();
              setFlipped(false);
            }}
          >
            Close
          </button>
          <table className="back-table">
            <tbody>
              <tr>
                <td>
                  <h4><strong>{brand} {model}</strong></h4>
                  <p><strong>Contact Person:</strong> {sellerName} {sellerSurname}</p>
                  <p><strong>Contact Info:</strong> {contact}</p>
                  <br />
                  <p><strong>Transmission:</strong> {transmission}</p>
                  <p><strong>Production Year:</strong> {year}</p>
                  <p><strong>Fuel Type:</strong> {fuelType}</p>
                  <p><strong>important Info:</strong> {importantInfo}</p>
                </td>
                <td>
                  <p className="no-deposit blinking-red">No Deposit</p>
                  <h3>Included in price</h3>
                  <li>Unlimited mileage</li>
                  <li>VAT, Local taxes</li>
                  <li>Third Party Insurance</li>
                  <li>24hr Breakdown assistance</li>
                  <li>Replacement in case of breakdown</li>
                  <li>Delivery and Collection</li>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
