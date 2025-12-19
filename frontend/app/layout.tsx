import type { Metadata } from "next";
import { Great_Vibes, Merriweather } from "next/font/google";
import "../src/style/globals.css";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  title: "GlamStudio",
  description: "Estudio de belleza premium",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${greatVibes.variable} ${merriweather.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
