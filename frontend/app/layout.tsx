import type { Metadata } from "next";
import { Great_Vibes, Merriweather } from "next/font/google";
import "../src/style/globals.css";
import Footer from "@/src/components/footer/Footer";
import Navbar from "@/src/components/navbar/Navbar";

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
  icons: {
    icon: "./favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${greatVibes.variable} ${merriweather.variable} antialiased overflow-x-hidden bg-[#FFEFD3] `}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
