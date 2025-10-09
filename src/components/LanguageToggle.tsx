"use client";

import { useLanguage } from "@/context/LanguageContext";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  const isFrench = language === "fr";

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="relative inline-flex items-center gap-1 rounded-full border border-cyan-500/30 bg-black/60 px-3 py-1 text-xs font-medium text-gray-300 shadow-lg shadow-cyan-500/20 cursor-pointer transition-colors duration-200 hover:border-cyan-400 hover:text-white hover:shadow-cyan-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      aria-label={isFrench ? "Passer le site en anglais" : "Switch the site to French"}
      title={isFrench ? "English version" : "Version française"}
    >
      <span className={isFrench ? "text-white font-semibold" : "text-gray-400 group-hover:text-white"}>
        FR
      </span>
      <span className="text-cyan-400">/</span>
      <span className={!isFrench ? "text-white font-semibold" : "text-gray-400 group-hover:text-white"}>
        EN
      </span>
      <span className="absolute inset-0 -z-10 rounded-full bg-cyan-500/10 blur opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  );
};

export default LanguageToggle;
