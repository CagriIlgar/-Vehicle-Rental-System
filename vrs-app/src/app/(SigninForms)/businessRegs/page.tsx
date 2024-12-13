'use client';

import { signIn } from "next-auth/react";
import './businessRegistration.css';

const Registration = () => {
  return (
    <div className="businessRegsPageContainer">
      <h1>CyRent</h1>
      <div className="registerContainer">
        <h2>Business Registration Form</h2>
        <p>Fill out the form carefully for registration</p>

        <div className="formGrid">
          <div className="formGroup">
            <label>Business Name</label>
            <input type="text" placeholder="Business Name" />
          </div>

          <div className="formGroup">
            <label>Industry</label>
            <input type="text" placeholder="e.g., Car Rental, Logistics" />
          </div>

          <div className="formGroup">
            <label>Contact Person Name</label>
            <input type="text" placeholder="Name" />
          </div>

          <div className="formGroup">
            <label>Contact Person Surname</label>
            <input type="text" placeholder="Surname" />
          </div>

          <div className="formGroup">
            <label>Phone Number</label>
            <input type="text" placeholder="(533) *** ** **" />
          </div>

          <div className="formGroup">
            <label htmlFor="email">Business Email</label>
            <input id="email" type="email" placeholder="example@cyrent.com" />
          </div>

          <div className="formGroup">
            <label>Business City</label>
            <input type="text" placeholder="Business City" />
          </div>

          <div className="formGroup">
            <label>Business Full Address</label>
            <input type="text" placeholder="" />
          </div>

          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" />
          </div>

          <div className="formGroup" style={{ gridColumn: "span 2" }}>
            <label>
              <input type="checkbox" />
              <span style={{ color: "#7E7E7E", marginLeft: '8px' }}>Terms and Conditions Agreement</span>
            </label>
          </div>

          <div className="formGroup" style={{ gridColumn: "span 2" }}>
            <label>
              <input type="checkbox" />
              <span style={{ color: "#7E7E7E", marginLeft: '8px' }}>Data Protection Consent</span>
            </label>
          </div>
        </div>

        <button className="registerButton" onClick={() => signIn('google', { callbackUrl: "/" })}>
          Register
        </button>

        <div className="formGroup" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <a href="/signin" className="returnToLoginBtn">Return to login</a>
        </div>
      </div>
    </div>
  );
};

export default Registration;
