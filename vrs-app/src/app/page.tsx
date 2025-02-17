import React from "react";
import Card from "../components/CategoryCard/Card";
import "../styles/home.css";

const HomePage: React.FC = () => {
    return (
        <div
            className="relative bg-cover bg-center min-h-screen"
            style={{
                backgroundImage: "url('/home.jpg')",
            }}
        >
            <div className="home-info">
                <br />
                <h1 className="home-title">Welcome to CyRent</h1>
                <p className="intro-text">
                    Discover a wide range of vehicles to suit your needs. Whether
                    you’re looking for cars, motorcycles, scooters, or even boats,
                    we’ve got you covered. Start your journey with us today!
                </p>
            </div>
            <br />

            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10">
                <div className="row">
                    <Card image="/home-car.png" title="CARS" navigateTo="/vehicles/cars" />
                    <Card image="/home-motor.png" title="MOTORCYCLES" navigateTo="/vehicles/motorcycles"/>
                    <Card image="/home-boat.png" title="BOATS" navigateTo="/vehicles/boats" />
                </div>
                <div className="row">
                    <Card image="/home-scooter.png" title="SCOOTERS" navigateTo="/vehicles/scooters" />
                    <Card image="/home-bicycle.png" title="BICYCLES" navigateTo="/vehicles/bicycles" />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
