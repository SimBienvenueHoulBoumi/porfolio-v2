"use client";

import { ReactNode } from "react";
import { useTheme } from "@/context/ThemeContext";
import FloatingThemeToggle from "./FloatingThemeToggle";

export const ThemeSurface = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  const surfaceClass =
    theme === "dark"
      ? "theme-dark bg-gray-950 text-white"
      : "theme-aurora bg-slate-50 text-slate-900";

  return (
    <div className={`${surfaceClass} min-h-screen font-sans transition-colors duration-500`}>
      {children}
      <FloatingThemeToggle />
    </div>
  );
};
