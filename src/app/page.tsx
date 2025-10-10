"use client";

import { useEffect, useRef, useState } from "react";

import useFadeIn from "../hooks/useFadeIn";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollControls from "../components/ScrollControls";
import LanguageToggle from "../components/LanguageToggle";
import ThemeToggle from "../components/ThemeToggle";
import PageLoader from "../components/PageLoader";
import Experience from "@/components/Experience";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";

const PageContent = () => {
  useFadeIn();
  const footerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoading(false), 600);
    return () => window.clearTimeout(timeout);
  }, []);

  const handleScrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const themeContainerClass =
    theme === "dark"
      ? "bg-gray-900 text-white theme-dark"
      : "bg-slate-100 text-slate-900 theme-aurora";

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className={`${themeContainerClass} font-sans relative transition-colors duration-500`}>
      <div className="relative">
        <Hero />
        <div className="fixed bottom-24 right-4 sm:bottom-28 sm:right-8 z-50 flex flex-col items-end gap-3">
          <ThemeToggle />
          <LanguageToggle />
        </div>
        <ScrollControls onScrollToFooter={handleScrollToFooter} />
      </div>
      <Skills />
      <Experience />
      <Contact />
      <Footer ref={footerRef} />
    </div>
  );
};

export default function Page() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PageContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
