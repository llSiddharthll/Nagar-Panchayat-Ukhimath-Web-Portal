import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Script from "next/script";
// import { Geist, Geist_Mono } from "next/font/google"; // Not used directly here
// import Script from "next/script"; // Not used directly here
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Nagar Panchayat Ukhimath",
  description:
    "Official Website of Nagar Panchayat Ukhimath, Rudraprayag District, Uttarakhand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AuthProvider>
        
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
