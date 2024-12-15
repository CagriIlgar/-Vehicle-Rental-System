import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { pool } from "../../../../lib/mysql";
import bcrypt from "bcryptjs";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const [rows]: any[] = await pool.execute(
          "SELECT * FROM users WHERE email = ?",
          [credentials.email]
        );
      
        if (rows.length === 0) {
          throw new Error("No user found with the provided email");
        }
      
        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }
      
        if (user.isBusiness === 1) {
          const [sellerRows]: any[] = await pool.execute(
            "SELECT * FROM seller WHERE BusinessEmail = ?",
            [user.email]
          );
          const seller = sellerRows[0];
          return {
            id: seller.SellerID,
            name: seller.ContactPersonName,
            surname: seller.ContactPersonSurname,
            email: seller.BusinessEmail,
            isBusiness: true,
            businessPhone: seller.BusinessPhone,
            businessCity: seller.BusinessCity,
          };
        }
      
        const [customerRows]: any[] = await pool.execute(
          "SELECT * FROM customer WHERE CustomerEmail = ?",
          [user.email]
        );
        const customer = customerRows[0];
        return {
          id: customer.CustomerID,
          name: customer.CustomerName,
          surname: customer.CustomerSurname,
          email: customer.CustomerEmail,
          isBusiness: false,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    signOut: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.surname) {
        token.surname = user.surname;
      }
      if (user?.isBusiness && user.businessPhone) {
        token.businessPhone = user.businessPhone;
      }
      if (user?.isBusiness && user.businessCity) {
        token.businessCity = user.businessCity;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.surname) {
        session.user.surname = token.surname as string;
      }
      if (token.businessPhone) {
        session.user.businessPhone = token.businessPhone as string;
      }
      if (token.businessCity) {
        session.user.businessCity = token.businessCity as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };