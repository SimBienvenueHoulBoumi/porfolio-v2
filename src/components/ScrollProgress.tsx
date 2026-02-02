"use client";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme } = useTheme();
  const isAurora = theme === "aurora";

  useEffect(() => {
    const updateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const totalScrollable = documentHeight - windowHeight;
      const progress = totalScrollable > 0 ? (scrollTop / totalScrollable) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScrollProgress);
    updateScrollProgress();

    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  const barColor = isAurora ? "bg-emerald-500" : "bg-emerald-500";

  return (
    <div
      className={`fixed top-0 left-0 right-0 h-1 z-50 ${
        isAurora ? "bg-slate-200" : "bg-gray-800"
      }`}
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progression du défilement"
    >
      <div className={`h-full ${barColor} transition-all duration-150 ease-out`} style={{ width: `${scrollProgress}%` }} />
    </div>
  );
}

