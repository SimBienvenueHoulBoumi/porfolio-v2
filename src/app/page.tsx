"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import useFadeIn from "@/hooks/useFadeIn";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Tutorial from "@/components/Tutorial";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import PageLoader from "@/components/PageLoader";
import Experience from "@/components/Experience";
import { SiteContent } from "@/lib/content";

const PageContent = () => {
  useFadeIn();
  const footerRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    let isActive = true;
    setContent(null);
    setError(null);
    setLoaderDone(false);

    const controller = new AbortController();

    fetch(`/api/content`, { signal: controller.signal })
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
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setLoaderDone(true);
  }, []);

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
    <div className={`relative page-transition`}>
      <ScrollProgress />
      <Navigation />
      <Hero content={content.hero} />
      <Skills content={content.skills} />
      <Tutorial />
      <Experience content={content.experience} />
      <Contact content={content.contact} />
      <Footer ref={footerRef} content={content.footer} />
    </div>
  );
};

export default function Page() {
  return <PageContent />;
}
