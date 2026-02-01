import type { Metadata } from "next";
import { Great_Vibes, Merriweather } from "next/font/google";
import "../src/style/globals.css";
import Footer from "@/src/components/footer/Footer";
import Navbar from "@/src/components/navbar/Navbar";
import { Providers } from "./providers";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
  display: "swap",
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
    <html
      lang="es"
      className={`${greatVibes.variable} ${merriweather.variable}`}
    >
      <body className="antialiased relative overflow-x-hidden bg-[#FFEFD3]">
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
