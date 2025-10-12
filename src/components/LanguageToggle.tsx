"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  const { theme } = useTheme();

  const isFrench = language === "fr";
  const isAurora = theme === "aurora";

  const baseClasses = isAurora
    ? "border-sky-200/80 bg-white text-slate-700 shadow-lg shadow-sky-200/20 hover:border-sky-300 hover:bg-sky-50 focus-visible:ring-offset-white"
    : "border-cyan-500/40 bg-slate-950/70 text-cyan-200 shadow-lg shadow-cyan-500/20 hover:border-cyan-300 hover:bg-slate-900 focus-visible:ring-offset-slate-950";

  const activeText = isAurora ? "text-slate-900" : "text-white";
  const inactiveText = isAurora ? "text-slate-500" : "text-cyan-200/70";
  const hoverText = isAurora ? "group-hover:text-slate-900" : "group-hover:text-white";
  const ringClass = isAurora ? "focus-visible:ring-sky-400/60" : "focus-visible:ring-cyan-400/60";
  const dividerClass = isAurora ? "text-slate-400" : "text-cyan-500";

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`group relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.35em] transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${ringClass} ${baseClasses}`}
      aria-label={isFrench ? "Passer le site en anglais" : "Switch the site to French"}
      title={isFrench ? "English version" : "Version française"}
    >
      <span className={isFrench ? `${activeText} font-semibold` : `${inactiveText} ${hoverText}`}>
        FR
      </span>
      <span className={dividerClass}>/</span>
      <span className={!isFrench ? `${activeText} font-semibold` : `${inactiveText} ${hoverText}`}>
        EN
      </span>
      <span
        className={`absolute inset-0 -z-10 rounded-full opacity-0 transition-opacity group-hover:opacity-100 ${
          isAurora ? "bg-sky-200/30 blur" : "bg-cyan-500/20 blur"
        }`}
      />
      <span
        className={`pointer-events-none absolute bottom-0 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full transition-all duration-200 ${
          isAurora ? "bg-sky-400 group-hover:w-8" : "bg-cyan-400 group-hover:w-8"
        }`}
      />
    </button>
  );
};

export default LanguageToggle;
