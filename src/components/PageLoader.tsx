"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

type PageLoaderProps = {
  onComplete?: () => void;
  stageDurationMs?: number;
  completionDelayMs?: number;
};

const PageLoader = ({ onComplete, stageDurationMs = 1400, completionDelayMs = 800 }: PageLoaderProps) => {
  const { theme } = useTheme();
  const isAurora = theme === "aurora";

  const copy = {
    message: "Chargement ...",
    stages: ["Initialisation", "Chargement des ressources", "Presque prêt"],
    fallback: "Cela semble plus long que prévu. Essayez d'actualiser si besoin.",
    retryLabel: "Rafraîchir"
  };

  const [stageIndex, setStageIndex] = useState(0);
  const [showSupport, setShowSupport] = useState(false);
  const [showRetry, setShowRetry] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    setStageIndex(0);

    const totalStages = copy.stages.length;
    if (totalStages <= 1) {
      const singleTimer = window.setTimeout(() => {
        onComplete?.();
      }, completionDelayMs);

      return () => window.clearTimeout(singleTimer);
    }

    let current = 0;

    const interval = window.setInterval(() => {
      current += 1;
      if (current >= totalStages - 1) {
        setStageIndex(totalStages - 1);
        window.clearInterval(interval);
      } else {
        setStageIndex(current);
      }
    }, stageDurationMs);

    return () => window.clearInterval(interval);
  }, [completionDelayMs, onComplete, stageDurationMs, copy.stages.length]);

  useEffect(() => {
    if (stageIndex === copy.stages.length - 1) {
      const timer = window.setTimeout(() => {
        onComplete?.();
      }, completionDelayMs);

      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [stageIndex, completionDelayMs, onComplete, copy.stages.length]);

  useEffect(() => {
    setShowSupport(false);
    setShowRetry(false);
    const supportTimeout = window.setTimeout(() => setShowSupport(true), 12000);
    const retryTimeout = window.setTimeout(() => setShowRetry(true), 15000);

    return () => {
      window.clearTimeout(supportTimeout);
      window.clearTimeout(retryTimeout);
    };
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
                className={`h-full rounded-full transition-all duration-700 animate-shimmer ${
                  isAurora ? "bg-gradient-to-r from-sky-500 via-sky-400 to-sky-500" : "bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500"
                }`}
                style={{ width: `${progressValue}%`, backgroundSize: "200% 100%" }}
              />
            </div>
          </div>

          <p
            className={`text-sm font-medium tracking-wide ${
              isAurora ? "text-slate-700" : "text-gray-300"
            }`}
          >
            {copy.message}
          </p>
          <div
            className={`flex flex-col items-center gap-1 text-xs font-semibold uppercase tracking-[0.35em] ${
              isAurora ? "text-slate-700" : "text-cyan-200"
            }`}
          >
            <span>{copy.stages[stageIndex]}</span>
            <span className="flex gap-1">
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className={`block h-1.5 w-1.5 rounded-full ${
                    isAurora ? "bg-sky-500/80" : "bg-cyan-400/80"
                  }`}
                />
              ))}
            </span>
          </div>
          {showSupport && (
            <p
              className={`max-w-xs text-xs ${
                isAurora ? "text-slate-700" : "text-gray-200"
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
