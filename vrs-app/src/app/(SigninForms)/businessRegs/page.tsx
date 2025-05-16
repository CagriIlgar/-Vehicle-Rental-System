'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import './businessRegistration.css';

const BusinessRegistration = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    contactPersonName: '',
    contactPersonSurname: '',
    email: '',
    businessCity: '',
    businessAddress: '',
    password: '',
    phone: '',
    termsAgreed: false,
    dataProtectionAgreed: false,
  });

    const handleLogoClick = () => {
    router.push("/");
  };

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' && 'checked' in e.target ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/busRegister', {
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
    <div className="businessRegsPageContainer">
      <div className="logo" onClick={handleLogoClick}>CyRent</div>
      <div className="registerContainer">
        <h2>Business Registration Form</h2>
        <p>Fill out the form carefully for registration</p>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="formGroup">
              <label>Business Name</label>
              <input
                type="text"
                name="businessName"
                placeholder="Business Name"
                value={formData.businessName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formGroup">
              <label>Industry</label>
              <input
                type="text"
                name="industry"
                placeholder="e.g., Car Rental, Logistics"
                value={formData.industry}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formGroup">
              <label>Contact Person Name</label>
              <input
                type="text"
                name="contactPersonName"
                placeholder="Name"
                value={formData.contactPersonName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formGroup">
              <label>Contact Person Surname</label>
              <input
                type="text"
                name="contactPersonSurname"
                placeholder="Surname"
                value={formData.contactPersonSurname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formGroup">
              <label htmlFor="email">Business Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="example@cyrent.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formGroup">
              <label>Business City</label>
              <input
                type="text"
                name="businessCity"
                placeholder="Business City"
                value={formData.businessCity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formGroup">
              <label>Business Full Address</label>
              <input
                type="text"
                name="businessAddress"
                placeholder=""
                value={formData.businessAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div className="formGroup">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="(533) *** ** **"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formGroup" style={{ gridColumn: "span 2" }}>
              <label>
                <input
                  type="checkbox"
                  name="termsAgreed"
                  checked={formData.termsAgreed}
                  onChange={handleChange}
                  required
                />
                <span style={{marginLeft: '8px' }}>Terms and Conditions Agreement</span>
              </label>
            </div>

            <div className="formGroup" style={{ gridColumn: "span 2" }}>
              <label>
                <input
                  type="checkbox"
                  name="dataProtectionAgreed"
                  checked={formData.dataProtectionAgreed}
                  onChange={handleChange}
                  required
                />
                <span style={{marginLeft: '8px' }}>Data Protection Consent</span>
              </label>
            </div>
          </div>

          <button className="registerButton" type="submit">
            Register
          </button>
        </form>


        <div className="formGroup" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <a href="/signin" className="returnToLoginBtn">Return to login</a>
        </div>
      </div>
    </div>
  );
};

export default BusinessRegistration; 