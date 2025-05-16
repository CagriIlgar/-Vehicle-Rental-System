import React from "react";
import Image from "next/image";
import "./about.css";
import ClientLayout from "@/app/client-layout";

const About: React.FC = () => {
  return (
    <ClientLayout>
      <div className="aboutContainer">
        <section className="intro-section">
          <h1 className="about-title">About Us</h1>
          <p className="about-subtitle">
            Cyrent is a North Cyprus-based vehicle rental platform offering flexible, modern, and user-focused transportation solutions.
          </p>
        </section>

        <section className="about-section">
          <div className="about-text">
            <h2 className="section-title">Our Mission</h2>
            <p>
              Our mission is to provide a seamless and comprehensive vehicle rental experience for a wide range of users. By incorporating advanced logistics, user-friendly reservation tools, and customizable features like chauffeur services and accessories, we aim to empower users with convenience and flexibility.
              <br /><br />
              Our approach ensures quality, efficiency, and satisfaction while supporting eco-friendly options such as bicycles and small boats. We believe in not just growing bigger but growing better, aligning our success with the satisfaction of our customers.
            </p>
          </div>
          <div className="about-image">
            <Image
              src="/cars.png"
              alt="Our Mission"
              width={600}
              height={400}
              className="image"
              layout="intrinsic"
            />
          </div>
        </section>

        <section className="about-section reverse">
          <div className="about-image">
            <Image
              src="/scooters.png"
              alt="Our Story"
              width={600}
              height={400}
              className="image"
              layout="intrinsic"
            />
          </div>
          <div className="about-text">
            <h2 className="section-title">Our Story</h2>
            <p>
              Inspired by the growing demand for flexible and user-centric transportation solutions, our journey began with the vision of creating a rental system that goes beyond conventional services.
              <br /><br />
              In 2024, under the guidance of Assoc. Prof. Dr. Ahmet Ünveren, a team of dedicated students envisioned a platform that would combine convenience with advanced features like real-time logistics, service tracking, and customizable options.
              <br /><br />
              With a focus on modern technologies such as secure payments, location tracking, and responsive design, Cyrent stands as an innovative approach to digital vehicle rentals.
            </p>
          </div>
        </section>
      </div>
    </ClientLayout>
  );
};

export default About;
