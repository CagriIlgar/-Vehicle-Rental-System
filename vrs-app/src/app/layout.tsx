import Providers from "./providers";
import "../styles/globals.css";

export const metadata = {
  title: "CyRent",
  description: "Best rent a vehicle system in Cyprus",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}