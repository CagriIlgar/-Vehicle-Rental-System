import React from "react";
import Image from 'next/image';
import "./about.css";

const About: React.FC = () => {
  return (
    <div className="aboutContainer">
      <section className="text-center mb-10">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="text-lg about-info-text">
          Cyrent vehicle rental system is a North Cyprus-based vehicle rental application that appeals to all users.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 items-center">
        <Image
          src="/cars.png"
          alt="Our Mission"
          className="image"
          layout="intrinsic"
        />
        <div>
          <h3>Our Mission: Easy to use rental</h3>
          <p className="about-info-text">
            Our mission is to provide a seamless and comprehensive vehicle rental experience for a wide range of users. By incorporating advanced logistics, user-friendly reservation tools, and customizable features like chauffeur services and accessories, we aim to empower users with convenience and flexibility. Our approach ensures quality, efficiency, and satisfaction while supporting eco-friendly options such as bicycles and small boats. We believe in not just growing bigger but growing better, aligning our success with the satisfaction of our customers.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h3>Our Story</h3>
          <p className="about-info-text"> 
            Inspired by the growing demand for flexible and user-centric transportation solutions, our journey began with the vision of creating a rental system that goes beyond conventional services. In 2024, under the guidance of Assoc.Prof.Dr Ahmet Ünveren, a team of dedicated students envisioned a platform that would combine the convenience of vehicle rentals with advanced features such as real-time logistics, service tracking, and add-on customization. Through collaboration, innovation, and a commitment to excellence, the system was designed to cater to a variety of users, from individuals looking for short-term car rentals to families needing specialized accessories. With a focus on leveraging modern technologies like secure payment gateways, API integration for location tracking, and responsive web design, the project exemplifies how technology can transform traditional services into seamless digital experiences.
          </p>
        </div>
        <Image
          src="/scooters.png"
          alt="Our Story"
          className="image"
          layout="intrinsic"
        />
      </section>
    </div>
  );
};

export default About;