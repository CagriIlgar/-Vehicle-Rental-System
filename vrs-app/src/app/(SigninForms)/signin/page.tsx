'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './signin.css';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (response?.error) {
      setErrorMessage(response.error);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="siginPageContainer">
      <h1>CyRent</h1>
      <div className="loginContainer">
        <p>Please enter your details</p>
        <h2>Welcome back</h2>

        <div className="formGroup">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="example@cyrent.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        {errorMessage && <div className="error">{errorMessage}</div>}
        <div className="formGroup" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <label>
            <input type="checkbox" />
            <span style={{ color: "#7E7E7E", marginLeft: '8px' }}>Remember</span>
          </label>
          <a href="#" className="forgotPasswordBtn">Forgot Password?</a>
        </div>

        <button className="signInButton" onClick={handleSubmit}>
          Sign In
        </button>
        <a href="/registration" className="forgotPasswordBtn">Create Account</a>
        <div className="divider">
          <span>or</span>
        </div>
        <button className="googleButton" onClick={() => signIn('google', { callbackUrl: "/" })}>
          <Image
            src="/google_PNG.png"
            alt="Google Icon"
            className="googleIcon"
            width={28}
            height={28}
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
