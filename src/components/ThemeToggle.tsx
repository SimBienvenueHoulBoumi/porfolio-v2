"use client";

import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { language } = useLanguage();
  const isAurora = theme === "aurora";

  const baseClasses = isAurora
    ? "border-amber-400/60 bg-white/70 text-slate-900 shadow-lg shadow-amber-400/40 hover:border-amber-300/80 hover:shadow-amber-400/60 focus:ring-amber-400/60"
    : "border-purple-400/40 bg-black/50 text-gray-100 shadow-lg shadow-purple-500/30 hover:border-purple-300/80 hover:shadow-purple-500/60 focus:ring-purple-400/60";

  const label = isAurora
    ? language === "fr"
      ? "Activer le thème sombre"
      : "Switch to dark theme"
    : language === "fr"
      ? "Activer le thème aurora"
      : "Switch to aurora theme";

  const tooltip = isAurora ? (language === "fr" ? "Mode sombre" : "Dark mode") : "Aurora mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`group relative flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition-all hover:cursor-pointer focus:outline-none focus:ring-2 ${baseClasses}`}
      aria-label={label}
      title={tooltip}
    >
      {isAurora ? (
        <>
          <FiMoon className="text-indigo-200 text-sm" />
          <span className="tracking-wide">{language === "fr" ? "Sombre" : "Dark"}</span>
        </>
      ) : (
        <>
          <FiSun className="text-amber-300 text-sm" />
          <span className="tracking-wide">Aurora</span>
        </>
      )}
      <span
        className={`absolute inset-0 -z-10 rounded-full blur opacity-0 transition-opacity group-hover:opacity-100 ${
          isAurora ? "bg-amber-400/30" : "bg-purple-500/10"
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
