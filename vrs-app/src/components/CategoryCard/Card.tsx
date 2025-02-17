"use client";

import React from "react";
import { useRouter } from "next/navigation";
import "./card.css";

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
            <h2 className="card-title">{title}</h2>

            <img src={image} alt={title} className="card-img" />
            <button className="card-button" onClick={handleButtonClick}>
                VIEW ALL!
            </button>
        </div>
    );
};

export default Card;