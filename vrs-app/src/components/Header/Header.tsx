'use client';
import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import "../Header/header.css";
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';

const Header: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLoginClick = () => {
    router.push("/signin");
  };
  const handleGetStartedClick = () => {
    router.push("/registration");
  };
  const handleProfileClick = () => {
    router.push("/profile");
  };
  const handleNavClick = (path: string) => {
    router.push(path);
  };
  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <Suspense fallback={<div className="header-container">Loading...</div>}>
      <div className="top-bar">
        <div className="top-contact-info">
          <div className="top-contact-item">
            <span className="icon">📞</span>
            <a href="tel:+905551112233">+90 555 111 22 33</a>
          </div>
          <div className="top-contact-item">
            <span className="icon">✉️</span>
            <a href="mailto:info@cyrent.com">info@cyrent.com</a>
          </div>
        </div>
      </div>

      <div className="header-container">
        <header>
          <div className="left-section">
            <div className="logo" onClick={handleLogoClick}>CyRent</div>
            <nav className="nav-bar">
              <button className="nav-link" onClick={() => handleNavClick("/")}>HOME</button>
              <button className="nav-link" onClick={() => handleNavClick("/about")}>ABOUT</button>
              <button className="nav-link" onClick={() => handleNavClick("/contact")}>CONTACT</button>
            </nav>
          </div>

          <div className="right-section actions">
            {session ? (
              <>
                <button className="profile" onClick={handleProfileClick}>Profile</button>
                <ThemeToggle />
              </>
            ) : (
              <>
                <button className="login" onClick={handleLoginClick}>Log in</button>
                <button className="get-started" onClick={handleGetStartedClick}>Get started</button>
                <ThemeToggle />
              </>
            )}
          </div>
        </header>

      </div>
    </Suspense>
  );
};

export default Header;