import React from "react";
import "../Header/header.css";

const Header: React.FC = () => {
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
          <button className="login">Log in</button>
          <button className="get-started">Get started</button>
        </div>
      </header>
    </div>
  );
};

export default Header;
