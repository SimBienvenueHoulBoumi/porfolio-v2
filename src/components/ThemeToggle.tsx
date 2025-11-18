"use client";

import { useTheme } from "@/context/ThemeContext";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isAurora = theme === "aurora";

const baseClasses = isAurora
    ? "border-slate-200/80 bg-white text-slate-800 shadow-lg shadow-cyan-200/25 hover:border-cyan-300 hover:bg-cyan-50 focus-visible:ring-offset-white"
    : "border-blue-500/40 bg-slate-950/70 text-blue-200 shadow-lg shadow-blue-500/20 hover:border-blue-300 hover:bg-slate-900 focus-visible:ring-offset-slate-950";
  const ringClass = isAurora ? "focus-visible:ring-cyan-400/60" : "focus-visible:ring-blue-400/60";

  const label = isAurora ? "Activer le thème sombre" : "Activer le thème clair";

  const tooltip = isAurora ? "Mode sombre" : "Mode clair";
  const buttonText = isAurora ? "Sombre" : "Clair";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`group relative inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.35em] transition-all duration-300 hover:cursor-pointer hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 ripple-effect magnetic shadow-glow-premium hover:shadow-glow-premium ${ringClass} ${baseClasses}`}
      aria-label={label}
      title={tooltip}
    >
      {isAurora ? (
        <>
          <FiMoon className="text-slate-700 text-sm transition-transform duration-300 group-hover:rotate-12" />
          <span className="transition-all duration-300">{buttonText}</span>
        </>
      ) : (
        <>
          <FiSun className="text-amber-300 text-sm transition-transform duration-300 group-hover:rotate-90" />
          <span className="transition-all duration-300">{buttonText}</span>
        </>
      )}
      <span
        className={`absolute inset-0 -z-10 rounded-full opacity-0 transition-opacity group-hover:opacity-100 ${
          isAurora ? "bg-cyan-200/40 blur" : "bg-blue-500/20 blur"
        }`}
      />
      <span
        className={`pointer-events-none absolute bottom-0 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full transition-all duration-200 ${
          isAurora ? "bg-cyan-400 group-hover:w-8" : "bg-blue-400 group-hover:w-8"
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
