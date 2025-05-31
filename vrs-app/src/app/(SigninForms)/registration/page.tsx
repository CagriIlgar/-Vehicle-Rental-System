'use client';

import { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './registration.css';
import Recaptcha from '@/components/ReCAPTCHA/ReCAPTCHA';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    phone: '',
    isOver18Confirmed: false,
  });

  const [error, setError] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return regex.test(password);
  };

  const is18OrOlder = (dob: string): boolean => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    return age > 18 || (age === 18 && m >= 0);
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!captchaToken) {
      setError('Please complete the reCAPTCHA challenge.');
      return;
    }

    if (!is18OrOlder(formData.dob)) {
      setError("You must be 18 years or older to register.");
      return;
    }

    if (!formData.isOver18Confirmed) {
      setError("Please confirm you are over 18.");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError("Password must be at least 8 characters long, include one uppercase letter and one special character.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, recaptchaToken: captchaToken }),
    });

    if (response.ok) {
      router.push('/signin');
    } else {
      const data = await response.json();
      setError(data.message || "Registration failed.");
    }
  };

  

  return (
    <div className="registerPageContainer">
      <div className="logo" onClick={handleLogoClick}>CyRent</div>
      <div className="registerContainer">
        <h2>Registration Form</h2>
        <p>Fill out the form carefully for registration</p>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="formGroup">
            <label>Surname</label>
            <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />
          </div>

          <div className="formGroup">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="formGroup">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="formGroup">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>

          <div className="formGroup">
            <label>Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
          </div>

          <div className="formGroup">
            <label>Phone Number</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="formGroup">
            <label>
              <input type="checkbox" name="isOver18Confirmed" checked={formData.isOver18Confirmed} onChange={handleChange} />
              I confirm that I am 18 years or older.
            </label>
          </div>

          <Recaptcha onChange={handleCaptchaChange} />
          
          <button type="submit" className="registerButton">Register</button>
        </form>

        <div className="formGroup" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <a href="signin" className="returnToLoginBtn">Return to login</a>
        </div>

        <div className="divider"><span>or</span></div>

        <button className="googleButton" onClick={() => signIn('google', { callbackUrl: "/" })}>
          <Image src="/google_PNG.png" alt="Google Icon" width={28} height={28} />
          Sign in with Google
        </button>

        <hr style={{ margin: '20px 0', borderColor: '#ccc' }} />
        <a href="/businessRegs" className="BusinessBtn">
          Click Here If You Are a Business
        </a>
      </div>
    </div>
  );
};

export default Registration;
