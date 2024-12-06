'use client';

import { signIn } from "next-auth/react";
import './registration.css';

const Registration = () => {
  return (
    <div className="registerPageContainer">
      <h1>CyRent</h1>
      <div className="registerContainer">
        <h2>Registration Form</h2>
        <p>Fill out the form carefully for registration</p>

        <div className="formGroup">
          <label>Name</label>
          <input type="text" placeholder="Name" />
        </div>

        <div className="formGroup">
          <label>Surname</label>
          <input type="text" placeholder="Surname" />
        </div>

        <div className="formGroup">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="example@cyrent.com" />
        </div>

        <div className="formGroup">
          <label htmlFor="password" >Password</label>
          <input id="password" type="password" />
        </div>

        <div className="formGroup">
          <label>Date of Birth</label>
          <input type="date" placeholder="dd/mm/yyyy" />
        </div>

        <div className="formGroup">
          <label>Phone Number</label>
          <input type="text" placeholder="(533) *** ** **" />
        </div>

        <button className="registerButton" onClick={() => signIn('google', { callbackUrl: "/" })}>
          Register
        </button>

        <div className="formGroup" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#" className="returnToLoginBtn">Return to login</a>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <button className="googleButton" onClick={() => signIn('google', { callbackUrl: "/" })}>
          <img src="/google_PNG.png" alt="Google Icon" className="googleIcon" />
          Sign in with Google
        </button>
      </div>
    </div>

  );
};

export default Registration;
