'use client';
import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import "../Header/header.css";

const Header: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleLoginClick = () => {
    router.push("/signin");
  };

  const handleProfileClick = () => {
    router.push("/profile");
  };

  return (
    <Suspense fallback={<div className="header-container">Loading...</div>}>
      <div className="header-container">
        <header>
          <div className="logo">CyRent</div>
          <div className="navBar">
            <nav>
              <a href="/">HOME</a>
              <a href="/about">ABOUT US</a>
              <a href="/contact">CONTACT</a>
            </nav>
          </div>
          <div className="actions">
            {session ? (
              <>
                <button className="profile" onClick={handleProfileClick}>
                  Profile
                </button>
              </>
            ) : (
              <>
                <button className="login" onClick={handleLoginClick}>
                  Log in
                </button>
                <button className="get-started">Get started</button>
              </>
            )}
          </div>
        </header>
      </div>
    </Suspense>
  );
};

export default Header;
