'use client';
import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import "../Header/header.css";

const Header: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

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

  return (
    <Suspense fallback={<div className="header-container">Loading...</div>}>
      <div className="header-container">
        <header>
          <div className="logo">CyRent</div>
          <div className="navBar">
            <nav>
              <button className="nav-link" onClick={() => handleNavClick("/")}>HOME</button>
              <button className="nav-link" onClick={() => handleNavClick("/about")}>ABOUT US</button>
              <button className="nav-link" onClick={() => handleNavClick("/contact")}>CONTACT</button>
            </nav>
          </div>
          <div className="actions">
            {session ? (
              <button className="profile" onClick={handleProfileClick}>
                Profile
              </button>
            ) : (
              <>
                <button className="login" onClick={handleLoginClick}>
                  Log in
                </button>
                <button className="get-started" onClick={handleGetStartedClick}>
                  Get started
                </button>
              </>
            )}
          </div>
        </header>
      </div>
    </Suspense>
  );
};

export default Header;
