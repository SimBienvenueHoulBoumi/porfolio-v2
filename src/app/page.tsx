"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import useFadeIn from "@/hooks/useFadeIn";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import LanguageToggle from "@/components/LanguageToggle";
import ThemeToggle from "@/components/ThemeToggle";
import PageLoader from "@/components/PageLoader";
import Experience from "@/components/Experience";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { SiteContent } from "@/lib/content";

const PageContent = () => {
  useFadeIn();
  const footerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [content, setContent] = useState<SiteContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    let isActive = true;
    setContent(null);
    setError(null);
    setLoaderDone(false);

    const controller = new AbortController();

    fetch(`/api/content?lang=${language}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Status ${response.status}`);
        }
        return response.json();
      })
      .then((data: SiteContent) => {
        if (isActive) {
          setContent(data);
        }
      })
      .catch((err) => {
        if (isActive && err.name !== "AbortError") {
          setError("Impossible de charger le contenu. Réessayez plus tard.");
        }
      });

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [language]);

  const handleLoaderComplete = useCallback(() => {
    setLoaderDone(true);
  }, []);

  const themeContainerClass =
    theme === "dark"
      ? "bg-gray-900 text-white theme-dark"
      : "bg-slate-100 text-slate-900 theme-aurora";

  const shouldShowLoader = !loaderDone || !content;

  if (shouldShowLoader && !error) {
    return <PageLoader onComplete={handleLoaderComplete} />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-700">
        <div className="max-w-md rounded-3xl border border-sky-200 bg-white p-8 text-center shadow-2xl shadow-sky-200/40">
          <p className="font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return null;
  }

  return (
    <div className={`${themeContainerClass} font-sans relative transition-colors duration-500 page-transition`}>
      <ScrollProgress />
      <Navigation />
      <div className="relative">
        <Hero content={content.hero} />
        <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-8 z-50 flex flex-col items-end gap-3 max-w-[calc(100vw-2rem)]">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
      <Skills content={content.skills} />
      <Experience content={content.experience} />
      <Contact content={content.contact} />
      <Footer ref={footerRef} content={content.footer} />
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
