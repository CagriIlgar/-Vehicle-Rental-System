import React from "react";
import "./page.css";

const HomePage: React.FC = () => {
  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: "url('/path/to/background-image.jpg')", // Arka plan resmi buraya eklenecek
      }}
    >
      <div className="bg-black min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="title">Welcome to CyRent</h1>
        <p className="intro-text">
          Discover a wide range of <span className="font-bold">vehicles</span> to suit your needs. Whether you’re
          looking for <span className="font-bold">cars</span>,{" "}
          <span className="font-bold">motorcycles</span>,{" "}
          <span className="font-bold">scooters</span>, or even{" "}
          <span className="font-bold">boats</span>, we’ve got you covered. Start
          your journey with us today!
        </p>

        
        <div className="row">
          <div className="card">
            <img src="/path/to/car.jpg" alt="CARS" className="card-img" />
            <h2 className="card-title">CARS</h2>
            <button className="card-button">VIEW ALL!</button>
          </div>
          <div className="card">
            <img
              src="/path/to/motorcycle.jpg"
              alt="MOTORCYCLES"
              className="card-img"
            />
            <h2 className="card-title">MOTORCYCLES</h2>
            <button className="card-button">VIEW ALL!</button>
          </div>
          <div className="card">
            <img src="/path/to/boat.jpg" alt="BOATS" className="card-img" />
            <h2 className="card-title">BOATS</h2>
            <button className="card-button">VIEW ALL!</button>
          </div>
        </div>
        <div className="row">
          <div className="card">
            <img src="/path/to/scooter.jpg" alt="SCOOTERS" className="card-img" />
            <h2 className="card-title">SCOOTERS</h2>
            <button className="card-button">VIEW ALL!</button>
          </div>
          <div className="card">
            <img src="/path/to/bicycle.jpg" alt="BICYCLES" className="card-img" />
            <h2 className="card-title">BICYCLES</h2>
            <button className="card-button">VIEW ALL!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
