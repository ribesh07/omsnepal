// "use client";
// import { useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Toast from "@/components/Toast";
import { Toaster } from "react-hot-toast";
import FooterBar from "@/components/FooterBar";
import "./globals.css";
import HeaderBarNew from "@/components/HeaderBarNew";
import TawkToWidget from "@/components/TawkToWidget";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import ClientLayout from "./ClientLayout";
// import { useProductStore } from "@/stores/InitdataFetch";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "OMSNEPAL - Quality Products Provider",
  description:
    "Buy high-quality  products  online.",
  keywords: [
    "Quality products",
  ],
  icons: {
    icon: "logo.ico",
  },
};

export default function RootLayout({ children }) {

   

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.ico" />
       
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <HeaderBarNew />
           <ClientLayout>{children}</ClientLayout>
     
        <CookieConsentBanner />
        <FooterBar />
        <TawkToWidget />
        <Toaster position="top-right" />
        <Toast />
      </body>
    </html>
  );
}
