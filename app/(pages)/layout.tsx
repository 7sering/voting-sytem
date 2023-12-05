import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

// INNER IMPORTS
import { Navbar } from "@/app/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Voting System",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
          }}
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}