"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type ThemeKind = "dark" | "aurora";

interface ThemeContextValue {
  theme: ThemeKind;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeKind>("dark");

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "aurora" : "dark"));
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return ctx;
};
