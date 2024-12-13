import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { pool } from "../../../../lib/mysql";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
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
          "SELECT * FROM customer WHERE CustomerEmail = ?",
          [credentials.email]
        );
        if (rows.length === 0) {
          throw new Error("No user found with the provided email");
        }
        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(credentials.password, user.CustomerPassword);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }
        return {
          id: user.CustomerID,
          name: user.CustomerName,
          email: user.CustomerEmail,
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
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
