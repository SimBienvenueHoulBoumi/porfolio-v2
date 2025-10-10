"use client";

import { useEffect, useMemo } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

const PageLoader = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isAurora = theme === "aurora";

  const copy = useMemo(
    () =>
      language === "fr"
        ? { message: "Chargement ..." }
        : { message: "Loading ..." },
    [language]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-colors duration-300 ${
        isAurora ? "bg-slate-100" : "bg-gray-950"
      }`}
    >
      <div
        className={`h-14 w-14 rounded-full border-4 border-transparent animate-spin ${
          isAurora
            ? "border-t-sky-500 border-l-sky-300"
            : "border-t-cyan-400 border-l-blue-500"
        }`}
      />
      <p
        className={`mt-6 text-sm font-medium tracking-wide ${
          isAurora ? "text-slate-600" : "text-gray-300"
        }`}
      >
        {copy.message}
      </p>
    </div>
  );
};

export default PageLoader;
