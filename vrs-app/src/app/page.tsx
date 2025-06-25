"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../styles/home.css";
import ClientLayout from "@/app/client-layout";
import ContactSection from "@/components/ContactSection/ContactSection";

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
    const router = useRouter();
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    // Dinamik olarak tema class'ını takip et
    useEffect(() => {
        const checkTheme = () => {
            const isLight = document.documentElement.classList.contains('light');
            setTheme(isLight ? 'light' : 'dark');
        };

        checkTheme();

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    const handleThingsClick = (path: string) => {
        router.push(path);
    };

    const backgroundImageUrl =
        theme === 'dark'
            ? "url('/home-first-section-dark.png')"
            : "url('/home-first-section.png')";

    return (
        <ClientLayout>
            <div
                className="relative bg-cover bg-center min-h-screen"
                style={{
                    backgroundImage: backgroundImageUrl,
                }}
            >
                <div className="home-info">
                    <h1 className="home-title">Welcome to CyRent</h1>
                    <p className="intro-text">
                        Discover a wide range of vehicles to suit your needs. Whether
                        you’re looking for cars, motorcycles, scooters, or even boats,
                        we’ve got you covered. Start your journey with us today!
                    </p>
                </div>
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
            </div>

            <div className="home-second-section-container">
                <section className="things-to-do-section">
                    <h2 className="things-title">Things to do in Cyprus</h2>
                    <div className="things-grid">
                        <div className="things-card" onClick={() => handleThingsClick("/relax-nature")} style={{ cursor: "pointer" }}>
                            <img src="/beach.jpg" alt="Beach" />
                            <h3><span className="things-link">RELAX ON THE BEACH:</span> Cyprus is well known for its beautiful sandy beaches and the crystal clear waters.</h3>
                        </div>
                        <div className="things-card" onClick={() => handleThingsClick("/places-to-visit")} style={{ cursor: "pointer" }}>
                            <img src="/places.jpg" alt="Places to Visit" />
                            <h3><span className="things-link">PLACES TO VISIT:</span> Discover Cyprus with a car rental and explore its rich culture and landscapes.</h3>
                        </div>
                        <div className="things-card" onClick={() => handleThingsClick("/night-life")} style={{ cursor: "pointer" }}>
                            <img src="/nightlife.jpg" alt="Nightlife" />
                            <h3><span className="things-link">CYPRUS NIGHTLIFE:</span> Enjoy a wide range of cafes, bars, lounges and clubs on the island.</h3>
                        </div>
                        <div className="things-card" onClick={() => handleThingsClick("/cuisine")} style={{ cursor: "pointer" }}>
                            <img src="/cuisine.jpg" alt="Cuisine" />
                            <h3><span className="things-link">CYPRUS CUISINE:</span> Try traditional dishes and delicacies during your holidays in Cyprus.</h3>
                        </div>
                    </div>
                </section>
            </div>

            <div
                className="relative bg-cover bg-center"
                style={{
                    backgroundImage: "url('/home.jpg')",
                    paddingTop: "60px",
                    paddingBottom: "60px",
                }}
            >
                <ContactSection />
            </div>
        </ClientLayout>
    );
};

export default HomePage;
