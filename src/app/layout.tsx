import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

// Import the LandingPage component
import LandingPage from "./landingPage";

import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {

  title: "Scrapetastic",
  description: "A platform that takes any URL, scrapes the content, and extracts relevant data for display and analysis.",

};

export default function RootLayout({
  children,

}: Readonly<{

  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">

        <body
          className={`${inter.className} bg-gradient-to-b from-gray-200 to-white dark:from-black dark:to-gray-900 text-gray-900 dark:text-white`}
        >
          <Header />

          <main>

            <SignedOut>

            <LandingPage />

            </SignedOut>

            <SignedIn>

              {children}

            </SignedIn>


          </main>

          <Footer />
        </body>

      </html>
    </ClerkProvider>
  );
}
