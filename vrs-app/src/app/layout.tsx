import Header from "@/components/Header/Header";
import "../app/globals.css";

export const metadata = {
  title: "CyRent",
  description: "Your car rental solution",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
