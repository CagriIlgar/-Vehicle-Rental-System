'use client';

import { signIn } from "next-auth/react";
import './signin.css';

const SignInPage = () => {
  return (
    <div className="siginPageContainer">
      <h1>CyRent</h1>
      <div className="loginContainer">
        <p>Please enter your details</p>
        <h2>Welcome back</h2>

        <div className="formGroup">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="example@cyrent.com" />
        </div>

        <div className="formGroup">
          <label htmlFor="password" >Password</label>
          <input id="password" type="password" />
        </div>

        <div className="formGroup" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <label>
            <input type="checkbox" />
            <span style={{ color: "#7E7E7E", marginLeft: '8px' }}>Remember</span>
          </label>
          <a href="#" className="forgotPasswordBtn">Forgot Password?</a>
        </div>

        <button className="signInButton" onClick={() => signIn('google', { callbackUrl: "/" })}>
          Sign In
        </button>
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

export default SignInPage;
