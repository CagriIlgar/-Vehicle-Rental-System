import React from "react";
import "./footer.css";

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="logo">
                    <h2>Vehicle Rental</h2>
                </div>
                <div className="links">
                    <ul>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/privacy-policy">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="socials">
                    <ul>
                        <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                        <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                    </ul>
                </div>
            </div>
            <div className="copy">
                <p>&copy; {new Date().getFullYear()} Vehicle Rental. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;