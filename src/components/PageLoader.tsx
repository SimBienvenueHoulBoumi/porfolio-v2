"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

const PageLoader = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isAurora = theme === "aurora";

  const copy = useMemo(
    () =>
      language === "fr"
        ? {
            message: "Chargement ...",
            stages: ["Initialisation", "Chargement des ressources", "Presque prêt"],
            fallback: "Cela semble plus long que prévu. Essayez d'actualiser si besoin.",
            retryLabel: "Rafraîchir"
          }
        : {
            message: "Loading ...",
            stages: ["Booting up", "Fetching resources", "Almost there"],
            fallback: "This is taking longer than expected. You can refresh if needed.",
            retryLabel: "Refresh"
          },
    [language]
  );

  const [stageIndex, setStageIndex] = useState(0);
  const [showSupport, setShowSupport] = useState(false);
  const [showRetry, setShowRetry] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    setStageIndex(0);
    const interval = window.setInterval(() => {
      setStageIndex((prev) => (prev + 1) % copy.stages.length);
    }, 1800);

    return () => window.clearInterval(interval);
  }, [copy.stages.length]);

  useEffect(() => {
    setShowSupport(false);
    setShowRetry(false);
    const supportTimeout = window.setTimeout(() => setShowSupport(true), 12000);
    const retryTimeout = window.setTimeout(() => setShowRetry(true), 15000);

    return () => {
      window.clearTimeout(supportTimeout);
      window.clearTimeout(retryTimeout);
    };
  }, [language]);

  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  const progressValue = Math.round(((stageIndex + 1) / copy.stages.length) * 100);

  return (
    <div className={`fixed inset-0 z-[9999] overflow-hidden`}>
      <div
        className={`absolute inset-0 transition-colors duration-300 ${
          isAurora
            ? "bg-gradient-to-br from-slate-100 via-white to-sky-100"
            : "bg-gradient-to-br from-slate-950 via-slate-900 to-black"
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-0 hidden mix-blend-screen opacity-70 sm:block ${
          isAurora
            ? "bg-[radial-gradient(circle_at_center,_rgba(125,211,252,0.35)_0%,_rgba(125,211,252,0.05)_45%,_transparent_75%)]"
            : "bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.25)_0%,_rgba(8,47,73,0.1)_55%,_transparent_80%)]"
        }`}
      />
      <div className="absolute inset-0">
        <div
          className={`absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl sm:h-72 sm:w-72 sm:blur-3xl ${
            isAurora ? "bg-sky-200/30" : "bg-cyan-500/20"
          }`}
        />
      </div>

      <div className="relative flex h-full w-full flex-col items-center justify-center px-4 py-6 sm:px-6 sm:py-8">
        <div
          role="status"
          aria-live="polite"
          className={`flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl border px-6 py-8 text-center shadow-2xl transition-colors sm:px-8 sm:py-10 ${
            isAurora
              ? "border-sky-200/70 bg-white/85 text-slate-700 shadow-sky-200/40"
              : "border-cyan-500/20 bg-gray-900/80 text-gray-200 shadow-cyan-500/15"
          }`}
        >
          {reduceMotion ? (
            <div className="w-full">
              <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progressValue}
                className={`relative h-3 w-full overflow-hidden rounded-full ${
                  isAurora ? "bg-sky-100" : "bg-gray-800"
                }`}
              >
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isAurora ? "bg-sky-500/80" : "bg-cyan-500/80"
                  }`}
                  style={{ width: `${progressValue}%` }}
                />
              </div>
              <p className={`mt-2 text-xs font-mono uppercase tracking-widest`}>
                {copy.stages[stageIndex]}
              </p>
            </div>
          ) : (
            <div className="relative h-20 w-20">
              <div
                className={`absolute inset-0 animate-spin rounded-full border-[3px] border-transparent ${
                  isAurora ? "border-t-sky-200 border-b-sky-400/70" : "border-t-cyan-500 border-b-blue-500/70"
                }`}
                style={{ animationDuration: "2.4s" }}
              />
              <div
                className={`absolute inset-2 animate-spin rounded-full border-[3px] border-transparent ${
                  isAurora ? "border-l-sky-500/80 border-r-sky-300/60" : "border-l-cyan-400 border-r-blue-400/60"
                }`}
                style={{ animationDirection: "reverse", animationDuration: "1.2s" }}
              />
              <div
                className={`absolute inset-6 rounded-full ${
                  isAurora ? "bg-white/50 blur-md" : "bg-cyan-500/10 blur-lg"
                }`}
              />
            </div>
          )}

          <p
            className={`text-sm font-medium tracking-wide ${
              isAurora ? "text-slate-600" : "text-gray-300"
            }`}
          >
            {copy.message}
          </p>
          <div
            className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] ${
              isAurora ? "text-sky-600" : "text-cyan-200"
            }`}
          >
            <span className={reduceMotion ? "" : "animate-pulse"}>{copy.stages[stageIndex]}</span>
            {!reduceMotion && (
              <span className="flex items-center gap-1">
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    className={`block h-1.5 w-1.5 rounded-full ${
                      isAurora ? "bg-sky-400/80" : "bg-cyan-400/80"
                    } animate-bounce`}
                    style={{ animationDelay: `${dot * 0.2}s` }}
                  />
                ))}
              </span>
            )}
          </div>
          {showSupport && (
            <p
              className={`max-w-xs text-xs ${
                isAurora ? "text-slate-600" : "text-gray-200"
              }`}
            >
              {copy.fallback}
            </p>
          )}
        </div>
        {showRetry && (
          <button
            type="button"
            onClick={() => window.location.reload()}
            className={`mt-4 inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold transition-all ${
              isAurora
                ? "bg-sky-500/90 text-white hover:bg-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
                : "bg-cyan-500/80 text-gray-900 hover:bg-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
            }`}
          >
            {copy.retryLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default PageLoader;
