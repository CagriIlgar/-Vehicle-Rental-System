"use client";

import React from "react";
import { useRouter } from "next/navigation";
import "../styles/home.css";
import ClientLayout from "@/app/client-layout";

type CardProps = {
    image: string;
    title: string;
    navigateTo?: string;
};

const Card: React.FC<CardProps> = ({ image, title, navigateTo }) => {
    const router = useRouter();

    const handleButtonClick = () => {
        if (navigateTo) {
            router.push(navigateTo);
        }
    };

    return (
        <div className="card">
            <h3 className="card-title">{title}</h3>

            <img src={image} alt={title} className="card-img" onClick={handleButtonClick} />
            <button className="card-button" onClick={handleButtonClick}>
                VIEW ALL!
            </button>
        </div>
    );
};

const HomePage: React.FC = () => {
    return (
        <ClientLayout>
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
                <div className="relative z-10 categories-container">
                    <div className="row">
                        <Card image="/home-car.png" title="CARS" navigateTo="/vehicles/cars" />
                        <Card image="/home-motor.png" title="MOTORCYCLES" navigateTo="/vehicles/motorcycles" />
                        <Card image="/home-boat.png" title="BOATS" navigateTo="/vehicles/boats" />
                    </div>
                    <div className="row">
                        <Card image="/home-scooter.png" title="SCOOTERS" navigateTo="/vehicles/scooters" />
                        <Card image="/home-bicycle.png" title="BICYCLES" navigateTo="/vehicles/bicycles" />
                    </div>
                </div>
                <div className="seperator"></div>
                <section className="things-to-do-section">
                    <h2 className="things-title">Things to do in Cyprus</h2>
                    <div className="things-grid">
                        <div className="things-card">
                            <img src="/beach.jpg" alt="Beach" />
                            <h3>
                                <span className="things-link">RELAX ON THE BEACH:</span> Cyprus is well known for its beautiful sandy beaches and the crystal clear waters. You can find a wealth of beaches and the one you desire.
                            </h3>
                        </div>
                        <div className="things-card">
                            <img src="/places.jpg" alt="Places to Visit" />
                            <h3>
                                <span className="things-link">PLACES TO VISIT:</span> Rent a car in Cyprus with us and get ready to discover an island of compelling culture and landscapes, steeped in myth and riddled with ancient riches.
                            </h3>
                        </div>
                        <div className="things-card">
                            <img src="/nightlife.jpg" alt="Nightlife" />
                            <h3>
                                <span className="things-link">CYPRUS NIGHTLIFE:</span> Whatever you opt for, Cyprus has it. A huge range of stylish cafes and bars, pubs, chic lounges, jet set beach clubs, music bars or dance clubs.
                            </h3>
                        </div>
                        <div className="things-card">
                            <img src="/cuisine.jpg" alt="Cuisine" />
                            <h3>
                                <span className="things-link">CYPRUS CUISINE:</span> Your holidays in Cyprus will not be complete without tasting some traditional Cypriot dishes and delicacies.
                            </h3>
                        </div>
                    </div>
                </section>
            </div>
        </ClientLayout>
    );
};

export default HomePage;