"use client";
import React from "react";
import { useRouter } from "next/navigation";
import "../Header/header.css";

const Header: React.FC = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/signin");
  };

  return (
    <div className="header-container">
      <header>
        <div className="logo">CyRent</div>
        <div className="navBar">
          <nav>
            <a href="#">HOME</a>
            <a href="#">ABOUT US</a>
            <a href="#">CONTACT</a>
          </nav>
        </div>
        <div className="actions">
          <button className="login" onClick={handleLoginClick}>Log in</button>
          <button className="get-started">Get started</button>
        </div>
      </header>
    </div>
  );
};

export default Header;
