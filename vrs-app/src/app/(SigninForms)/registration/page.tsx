'use client';

import { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './registration.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    dob: '',
    phone: ''
  });

    const handleLogoClick = () => {
    router.push("/");
  };

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push('/signin');
    }
  };

  return (
    <div className="registerPageContainer">
      <div className="logo" onClick={handleLogoClick}>CyRent</div>
      <div className="registerContainer">
        <h2>Registration Form</h2>
        <p>Fill out the form carefully for registration</p>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required/>
          </div>

          <div className="formGroup">
            <label>Surname</label>
            <input type="text" name="surname" value={formData.surname} onChange={handleChange} placeholder="Surname" required/>
          </div>

          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="example@cyrent.com" required/>
          </div>

          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required/>
          </div>

          <div className="formGroup">
            <label>Date of Birth</label>
            <input name="dob" type="date" value={formData.dob} onChange={handleChange} required/>
          </div>

          <div className="formGroup">
            <label>Phone Number</label>
            <input name="phone" type="text" value={formData.phone} onChange={handleChange} placeholder="(533) *** ** **" required/>
          </div>

          <button className="registerButton" type="submit">
            Register
          </button>
        </form>

        <div className="formGroup" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="signin" className="returnToLoginBtn">Return to login</a>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <button className="googleButton" onClick={() => signIn('google', { callbackUrl: "/" })}>
          <Image
            src="/google_PNG.png"
            alt="Google Icon"
            width={28}
            height={28}
          />
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
