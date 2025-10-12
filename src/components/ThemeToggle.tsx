"use client";

import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { language } = useLanguage();
  const isAurora = theme === "aurora";

  const baseClasses = isAurora
    ? "border-slate-200/80 bg-white text-slate-800 shadow-lg shadow-sky-200/25 hover:border-sky-300 hover:bg-sky-50 focus-visible:ring-offset-white"
    : "border-cyan-500/40 bg-slate-950/70 text-cyan-200 shadow-lg shadow-cyan-500/20 hover:border-cyan-300 hover:bg-slate-900 focus-visible:ring-offset-slate-950";
  const ringClass = isAurora ? "focus-visible:ring-sky-400/60" : "focus-visible:ring-cyan-400/60";

  const label = isAurora
    ? language === "fr"
      ? "Activer le thème dark"
      : "Switch to dark theme"
    : language === "fr"
      ? "Activer le thème light"
      : "Switch to light theme";

  const tooltip = isAurora ? "Dark mode" : "Light mode";
  const buttonText = isAurora ? "Dark" : "Light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`group relative inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.35em] transition-all duration-200 hover:cursor-pointer focus:outline-none focus-visible:ring-2 ${ringClass} ${baseClasses}`}
      aria-label={label}
      title={tooltip}
    >
      {isAurora ? (
        <>
          <FiMoon className="text-slate-700 text-sm" />
          <span>{buttonText}</span>
        </>
      ) : (
        <>
          <FiSun className="text-amber-300 text-sm" />
          <span>{buttonText}</span>
        </>
      )}
      <span
        className={`absolute inset-0 -z-10 rounded-full opacity-0 transition-opacity group-hover:opacity-100 ${
          isAurora ? "bg-sky-200/40 blur" : "bg-cyan-500/20 blur"
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

export default ThemeToggle;
