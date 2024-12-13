'use client';

import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header/Header";
import "../app/globals.css";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideHeader = pathname === "/signin" || pathname === "/registration" || pathname === "/businessRegs";

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {!hideHeader && <Header />}
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
