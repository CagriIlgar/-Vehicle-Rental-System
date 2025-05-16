import React from "react";
import "./footer.css";
import { FaFacebook, FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-column">
                    <h2>CYRENT</h2>
                    <p>We provide reliable and affordable vehicle rental services for all your travel needs. 🚗</p>
                </div>

                <div className="footer-column">
                    <h3>Quick Links 🔗</h3>
                    <ul className="bullet-list">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/profile">Profile</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/privacy-policy">Privacy Policy</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Contact Us 📞</h3>
                    <ul className="contact-list">
                        <li>📍 123 Main Street, Istanbul, TR</li>
                        <li>📧 support@cyrent.com</li>
                        <li>📱 +90 555 123 4567</li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Follow Us 🌐</h3>

                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF size={36} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={36} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaXTwitter size={36} />
                        </a>
                    </div>

                </div>
            </div>

            <div className="copy">
                <p>&copy; {new Date().getFullYear()} CYRENT. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
