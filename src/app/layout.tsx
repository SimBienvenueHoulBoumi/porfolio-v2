import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "simfolio",
  description: "porfolio v2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`antialiased text-black`}
      >
        {children}
      </body>
    </html>
  );
}
