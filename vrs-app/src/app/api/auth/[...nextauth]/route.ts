import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { pool } from "../../../../lib/mysql";
import bcrypt from "bcryptjs";
import type { RowDataPacket } from "mysql2";
import type { ResultSetHeader } from "mysql2";


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
        const [adminRows] = await pool.execute(
          "SELECT * FROM admin WHERE AdminEmail = ?",
          [credentials.email]
        ) as [RowDataPacket[], unknown];

        if (adminRows.length > 0) {
          const admin = adminRows[0];
          if (credentials.password !== admin.AdminPassword) {
            throw new Error("Invalid admin password");
          }

          return {
            id: admin.AdminID,
            name: admin.AdminName,
            email: admin.AdminEmail,
            isAdmin: true,
          };
        }

        // Regular User Login Handling
        const [rows] = await pool.execute(
          "SELECT * FROM users WHERE email = ?",
          [credentials.email]
        ) as [RowDataPacket[], unknown];

        if (rows.length === 0) {
          throw new Error("No user found with the provided email");
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        if (user.isBusiness === 1) {
          const [sellerRows] = await pool.execute(
            "SELECT * FROM seller WHERE BusinessEmail = ?",
            [user.email]
          ) as [RowDataPacket[], unknown];

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

        const [customerRows] = await pool.execute(
          "SELECT * FROM customer WHERE CustomerEmail = ?",
          [user.email]
        ) as [RowDataPacket[], unknown];

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
      if (user?.email && !token.id) {
        const [rows] = await pool.execute(
          "SELECT * FROM users WHERE email = ?",
          [user.email]
        ) as [RowDataPacket[], unknown];

        let userId;
        let isBusiness = false;

        if (rows.length === 0) {
          const [insertUserResult] = await pool.execute<ResultSetHeader>(

            "INSERT INTO users (email, isBusiness) VALUES (?, ?)",
            [user.email, 0]
          );

          userId = insertUserResult.insertId;

          await pool.execute(
            "INSERT INTO customer (CustomerName, CustomerEmail) VALUES (?, ?)",
            [user.name ?? "Unknown", user.email]
          );

        } else {
          userId = rows[0].id;
          isBusiness = rows[0].isBusiness === 1;

        }

        token.id = userId;
        token.email = user.email;
        token.name = user.name;
        token.isBusiness = isBusiness;
      }
      if (user?.surname) {
        token.surname = user.surname;
      }
      if (user?.isBusiness !== undefined) {
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
      if (user?.isBusiness && user.approved !== undefined) {
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
      if (user?.isAdmin) {
        token.isAdmin = user.isAdmin;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.surname) {
        session.user.surname = token.surname as string;
      }
      if (token.isBusiness !== undefined) {
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
      if (token.approved !== undefined) {
        session.user.approved = token.approved as boolean;
      }
      if (token.businessName) {
        session.user.businessName = token.businessName as string;
      }
      if (token.latitude !== undefined) {
        session.user.latitude = token.latitude as number;
      }
      if (token.longitude !== undefined) {
        session.user.longitude = token.longitude as number;
      }
      if (token.isAdmin) {
        session.user.isAdmin = token.isAdmin as boolean;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
