"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  const { theme } = useTheme();

  const isFrench = language === "fr";
  const isAurora = theme === "aurora";

  const baseClasses = isAurora
    ? "border-cyan-400/50 bg-white/80 text-slate-700 shadow-lg shadow-cyan-400/20 hover:border-cyan-400 hover:text-slate-900 hover:shadow-cyan-400/40 focus-visible:ring-offset-slate-100"
    : "border-cyan-500/30 bg-black/60 text-gray-300 shadow-lg shadow-cyan-500/20 hover:border-cyan-400 hover:text-white hover:shadow-cyan-500/40 focus-visible:ring-offset-black";

  const activeText = isAurora ? "text-slate-900" : "text-white";
  const inactiveText = isAurora ? "text-slate-400" : "text-gray-400";
  const hoverText = isAurora ? "group-hover:text-slate-900" : "group-hover:text-white";

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`group relative inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 focus-visible:ring-offset-2 ${baseClasses}`}
      aria-label={isFrench ? "Passer le site en anglais" : "Switch the site to French"}
      title={isFrench ? "English version" : "Version française"}
    >
      <span className={isFrench ? `${activeText} font-semibold` : `${inactiveText} ${hoverText}`}>
        FR
      </span>
      <span className="text-cyan-500">/</span>
      <span className={!isFrench ? `${activeText} font-semibold` : `${inactiveText} ${hoverText}`}>
        EN
      </span>
      <span
        className={`absolute inset-0 -z-10 rounded-full blur opacity-0 transition-opacity group-hover:opacity-100 ${
          isAurora ? "bg-cyan-400/20" : "bg-cyan-500/10"
        }`}
      />
    </button>
  );
};

export default LanguageToggle;
