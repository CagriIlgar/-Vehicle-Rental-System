import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    surname?: string;
    isBusiness?: boolean;
    businessPhone?: string;
    businessCity?: string;
    id?: string;
    sellerId?: string;
    approved?: boolean;
    businessName? : string;
  }

  interface Session {
    user: User;
  }
}
