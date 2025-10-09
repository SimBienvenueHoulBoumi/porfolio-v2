import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://simfolio.com"),
  title: "Simfolio",
  description:
    "Sim Bienvenue Houlboumi – DevOps engineer & full stack developer delivering resilient cloud architectures, reliable CI/CD and business-focused code.",
  openGraph: {
    title: "Simfolio",
    description:
      "Découvrez les études de cas CI/CD, microservices et cloud portées par Sim Bienvenue Houlboumi.",
    url: "https://simfolio.com",
    siteName: "Simfolio",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Portrait de Sim Bienvenue Houlboumi"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Simfolio",
    description:
      "CI/CD, microservices et cloud résilient : découvrez le portfolio de Sim Bienvenue Houlboumi.",
    images: ["/profile.png"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
