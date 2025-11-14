import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./loader.css";
import Analytics from "@/components/Analytics";
import { Providers } from "./providers";
import { ThemeSurface } from "@/components/ThemeSurface";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://simfolio.com"),
  title: "Sim Bienvenue HOULBOUMI | DevOps Engineer & Full Stack Developer",
  description:
    "Sim Bienvenue Houlboumi – DevOps engineer & full stack developer delivering resilient cloud architectures, reliable CI/CD and business-focused code. Spécialisé en Java/Spring Boot, React, DevOps (Ansible, Jenkins, Docker, CI/CD).",
  keywords: [
    "DevOps engineer",
    "full stack developer",
    "Java",
    "Spring Boot",
    "React",
    "Next.js",
    "DevOps",
    "Ansible",
    "Jenkins",
    "Docker",
    "CI/CD",
    "microservices",
    "API REST",
    "cloud architecture",
    "Kubernetes"
  ],
  authors: [{ name: "Sim Bienvenue HOULBOUMI" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Sim Bienvenue HOULBOUMI | DevOps Engineer & Full Stack Developer",
    description:
      "Découvrez les études de cas CI/CD, microservices et cloud portées par Sim Bienvenue Houlboumi.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://simfolio.com",
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
    title: "Sim Bienvenue HOULBOUMI | DevOps Engineer & Full Stack Developer",
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
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ThemeSurface>{children}</ThemeSurface>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
