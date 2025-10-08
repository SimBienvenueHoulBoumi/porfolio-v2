"use client";

import { forwardRef } from "react";
import { FaHeart, FaCode } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

const FOOTER_COPY = {
  fr: {
    role: "Dev Fullstack Java/React",
    madeWith: "Fait avec",
    and: "et",
    by: "par un passionné de code"
  },
  en: {
    role: "Full-stack Java/React developer",
    madeWith: "Made with",
    and: "and",
    by: "by a code enthusiast"
  }
} as const;

const Footer = forwardRef<HTMLDivElement>((_props, ref) => {
  const { language } = useLanguage();
  const copy = FOOTER_COPY[language];

  return (
    <footer ref={ref} className="footer-section relative text-center bg-black border-t border-cyan-500/20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto p-4">
        {/* Main text */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-gray-400 text-sm">
          <span className="flex items-center gap-2">&copy; 2025 Sim Bienvenue HOULBOUMI</span>
          <span className="hidden sm:inline text-cyan-500/50">•</span>
          <span className="flex items-center gap-2">{copy.role}</span>
        </div>

        {/* Made with love */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <span>{copy.madeWith}</span>
          <FaHeart className="text-red-500 animate-pulse" />
          <span>{copy.and}</span>
          <FaCode className="text-cyan-400" />
          <span>{copy.by}</span>
        </div>

        {/* Decorative line */}
        <div className="mt-6 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
