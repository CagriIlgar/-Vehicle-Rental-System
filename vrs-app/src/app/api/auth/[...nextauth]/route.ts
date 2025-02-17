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

        // Admin Login Handling
        // ------------------------------------------------
        const [adminRows]: any[] = await pool.execute(
          "SELECT * FROM admin WHERE AdminEmail = ?",
          [credentials.email]
        );

        if (adminRows.length > 0) {
          const admin = adminRows[0];
          // Direct password comparison since admin passwords are not encrypted
          if (credentials.password !== admin.AdminPassword) {
            throw new Error("Invalid admin password");
          }

          // Return Admin User Data
          return {
            id: admin.AdminID,
            name: admin.AdminName,
            email: admin.AdminEmail,
            isAdmin: true, // Custom flag to identify admin users
          };
        }
        // ------------------------------------------------

        // Regular User Login Handling
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
            approved: seller.Approved,
            businessName: seller.BusinessName,
            latitude: seller.Latitude,
            longitude: seller.Longitude,
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
      if (user?.isBusiness) {
        token.isBusiness = user.isBusiness;
      }
      if (user?.id) {
        token.id = user.id;
      }
      if (user?.isBusiness && user.businessPhone) {
        token.businessPhone = user.businessPhone;
      }
      if (user?.isBusiness && user.businessCity) {
        token.businessCity = user.businessCity;
      }
      if (user?.isBusiness && user.approved) {
        token.approved = user.approved;
      }
      if (user?.isBusiness && user.businessName) {
        token.businessName = user.businessName;
      }
      if (user?.isBusiness && user.latitude) {
        token.latitude = user.latitude;
      }
      if (user?.isBusiness && user.longitude) {
        token.longitude = user.longitude;
      }

      // Add isAdmin to JWT token
      if (user?.isAdmin) {
        token.isAdmin = user.isAdmin;
      }

      console.log("Token after JWT callback:", token);
      return token;
    },
    async session({ session, token }) {
      
      if (token.surname) {
        session.user.surname = token.surname as string;
      }
      if (token.isBusiness) {
        session.user.isBusiness = token.isBusiness as boolean;
      }
      if (token.businessPhone) {
        session.user.businessPhone = token.businessPhone as string;
      }
      if (token.businessCity) {
        session.user.businessCity = token.businessCity as string;
      }
      if (token.id) {
        session.user.id = token.id as string;
      }
      if (token.approved) {
        session.user.approved = token.approved as boolean;
      }
      if (token.businessName) {
        session.user.businessName = token.businessName as string;
      }
      if (token.latitude) {
        session.user.latitude = token.latitude as number;
      }
      if (token.longitude) {
        session.user.longitude = token.longitude as number;
      }
  

      // Add isAdmin to session
      if (token.isAdmin) {
        session.user.isAdmin = token.isAdmin as boolean;
      }

      console.log("Session after Session callback:", session);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };