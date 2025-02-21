import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "simfolio",
  description: "porfolio v2",
};

import localFont from "next/font/local";

const orbitron = localFont({
  src: "./fonts/Orbitron/Orbitron-VariableFont_wght.ttf", // Chemin relatif
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`antialiased text-black ${orbitron.className}`}
      >
        {children}
      </body>
    </html>
  );
}
