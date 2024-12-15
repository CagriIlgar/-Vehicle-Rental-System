'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import './businessRegistration.css';

const BusinessRegistration = () => {
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [contactPersonName, setContactPersonName] = useState("");
  const [contactPersonSurname, setContactPersonSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [businessCity, setBusinessCity] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [password, setPassword] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [dataProtectionAgreed, setDataProtectionAgreed] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsAgreed || !dataProtectionAgreed) {
      alert("You must agree to the terms and conditions and data protection.");
      return;
    }

    const formData = {
      name: contactPersonName,
      surname: contactPersonSurname,
      email,
      password,
      phone,
      businessName,
      industry,
      businessCity,
      businessAddress,
    };

    try {
      const response = await fetch('/api/busRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Business registration successful!");
        router.push("/signin");
      } else {
        alert(`Registration failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="businessRegsPageContainer">
      <h1>CyRent</h1>
      <div className="registerContainer">
        <h2>Business Registration Form</h2>
        <p>Fill out the form carefully for registration</p>
        <div className="formGrid">
          <div className="formGroup">
            <label>Business Name</label>
            <input
              type="text"
              placeholder="Business Name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>

          <div className="formGroup">
            <label>Industry</label>
            <input
              type="text"
              placeholder="e.g., Car Rental, Logistics"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
          </div>

          <div className="formGroup">
            <label>Contact Person Name</label>
            <input
              type="text"
              placeholder="Name"
              value={contactPersonName}
              onChange={(e) => setContactPersonName(e.target.value)}
            />
          </div>

          <div className="formGroup">
            <label>Contact Person Surname</label>
            <input
              type="text"
              placeholder="Surname"
              value={contactPersonSurname}
              onChange={(e) => setContactPersonSurname(e.target.value)}
            />
          </div>

          <div className="formGroup">
            <label>Phone Number</label>
            <input
              type="text"
              placeholder="(533) *** ** **"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="email">Business Email</label>
            <input
              id="email"
              type="email"
              placeholder="example@cyrent.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="formGroup">
            <label>Business City</label>
            <input
              type="text"
              placeholder="Business City"
              value={businessCity}
              onChange={(e) => setBusinessCity(e.target.value)}
            />
          </div>

          <div className="formGroup">
            <label>Business Full Address</label>
            <input
              type="text"
              placeholder=""
              value={businessAddress}
              onChange={(e) => setBusinessAddress(e.target.value)}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="formGroup" style={{ gridColumn: "span 2" }}>
            <label>
              <input
                type="checkbox"
                checked={termsAgreed}
                onChange={() => setTermsAgreed(!termsAgreed)}
              />
              <span style={{ color: "#7E7E7E", marginLeft: '8px' }}>Terms and Conditions Agreement</span>
            </label>
          </div>

          <div className="formGroup" style={{ gridColumn: "span 2" }}>
            <label>
              <input
                type="checkbox"
                checked={dataProtectionAgreed}
                onChange={() => setDataProtectionAgreed(!dataProtectionAgreed)}
              />
              <span style={{ color: "#7E7E7E", marginLeft: '8px' }}>Data Protection Consent</span>
            </label>
          </div>
        </div>

        <button className="registerButton" onClick={handleSubmit}>
          Register
        </button>

        <div className="formGroup" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <a href="/signin" className="returnToLoginBtn">Return to login</a>
        </div>
      </div>
    </div>
  );
};

export default BusinessRegistration;