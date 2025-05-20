import React from "react";
import "./contact.css";
import ClientLayout from "@/app/client-layout";
import ContactSection from "@/components/ContactSection/ContactSection";

const Contact: React.FC = () => {
  return (
    <ClientLayout>
      <div className="contact-container">
        <div className="contact-shape"></div>

        <h2 className="contact-header">Contact Us</h2>

        <div className="contact-info">
          <div className="contact-info-item">
            <span role="img" aria-label="phone">📞</span>
            <p>+90 555 111 222</p>
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
      <div
        className="relative bg-cover bg-center py-20"
        style={{
          backgroundImage: "url('/home.jpg')",
        }}
      >
        <ContactSection />
        <br />
      </div>
    </ClientLayout>

  );
};

export default Contact;