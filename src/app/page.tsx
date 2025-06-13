"use client";

import { useRef } from "react";

import useFadeIn from "../hooks/useFadeIn";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollToBottomButton from "../components/ScrollToBottomButton";
import Experience from "@/components/Experience";

export default function Page() {
  useFadeIn();
  const footerRef = useRef<HTMLDivElement>(null);

  const handleScrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-900 text-white font-sans relative">
      <div className="relative">
        <Hero />
        <ScrollToBottomButton onClick={handleScrollToFooter} />
      </div>
      <Skills />
      <Experience />
      <Contact />
      <Footer ref={footerRef} />
    </div>
  );
}
