import React from "react";
import "./contact.css";

const Contact: React.FC = () => {
  return (
    <div className="contact-container">
      <div className="contact-shape"></div>

      <h2 className="contact-header">Contact Us</h2>

      <div className="contact-info">
        <div className="contact-info-item">
          <span role="img" aria-label="phone">📞</span>
          <p>+90 392 630 1518</p>
        </div>
        <div className="contact-info-item">
          <span role="img" aria-label="email">✉️</span>
          <p>cyrent@email.com</p>
        </div>
        <div className="contact-info-item">
          <span role="img" aria-label="location">📍</span>
          <p>Doğu Akdeniz Üniversitesi, Magusa/TRNC</p>
        </div>
      </div>

      <div className="contact-footer">@CYRENT</div>
    </div>
  );
};

export default Contact;
