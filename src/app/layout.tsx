import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "@/components/navBar/NavBar";

const nunito = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Si Forever",
  description: "Tarjetas de invitacion",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={nunito.className}>
        
          <div className="flex flex-col min-h-screen pt-20 ">
            {/* Navbar */}
            <Navbar />

            {/* Main content */}
            <main className="flex-3">
              {/* Banner o secciones que deben ocupar toda la pantalla */}
              {children}
            </main>

           
          </div>
        
      </body>
    </html>
  );
}
