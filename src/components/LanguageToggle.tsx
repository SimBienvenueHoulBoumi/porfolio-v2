"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { FiGlobe } from "react-icons/fi";

const LanguageToggle = () => {
  const [language, setLanguage] = useState<"fr" | "en">("fr");
  const { theme } = useTheme();
  const isAurora = theme === "aurora";

  useEffect(() => {
    const saved = localStorage.getItem("language");
    if (saved === "fr" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "fr" ? "en" : "fr";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
    // Ici vous pouvez ajouter la logique pour changer la langue de l'application
  };

  const baseClasses = isAurora
    ? "border-slate-200/80 bg-white text-slate-800 shadow-lg shadow-sky-200/25 hover:border-sky-300 hover:bg-sky-50 focus-visible:ring-offset-white"
    : "border-blue-500/40 bg-slate-950/70 text-blue-200 shadow-lg shadow-blue-500/20 hover:border-blue-300 hover:bg-slate-900 focus-visible:ring-offset-slate-950";
  const ringClass = isAurora ? "focus-visible:ring-sky-400/60" : "focus-visible:ring-blue-400/60";

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`group relative inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.35em] transition-all duration-300 hover:cursor-pointer hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 ripple-effect magnetic shadow-glow-premium hover:shadow-glow-premium ${ringClass} ${baseClasses}`}
      aria-label={`Switch to ${language === "fr" ? "English" : "Français"}`}
      title={language === "fr" ? "Switch to English" : "Passer en français"}
    >
      <FiGlobe className={`${isAurora ? "text-slate-700" : "text-blue-300"} text-sm transition-transform duration-300 group-hover:rotate-12`} />
      <span className="transition-all duration-300">{language === "fr" ? "FR" : "EN"}</span>
      <span
        className={`absolute inset-0 -z-10 rounded-full opacity-0 transition-opacity group-hover:opacity-100 ${
          isAurora ? "bg-sky-200/40 blur" : "bg-blue-500/20 blur"
        }`}
      />
      <span
        className={`pointer-events-none absolute bottom-0 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full transition-all duration-200 ${
          isAurora ? "bg-sky-400 group-hover:w-8" : "bg-blue-400 group-hover:w-8"
        }`}
      />
    </button>
  );
};

export default LanguageToggle;

