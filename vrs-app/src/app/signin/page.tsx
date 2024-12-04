'use client'; // React 18+ için 'use client' bildirimi

import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";

const SignInPage = () => {
  return (
    <div>
      <h1 style={{color:"white"}}>Sign In with Google</h1>
      <button style={{color:"white"}} onClick={() => signIn('google')}>Sign in with Google</button>
      <br />
      <button style={{color:"white"}} onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};

export default SignInPage;
