"use client";

import { FiDownload, FiEye } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";

const COPY = {
  badge: "Version PDF · CV personnel",
  description: "Découvrez mon parcours en détail et gardez une copie pour plus tard.",
  view: "Voir le CV",
  download: "Télécharger"
} as const;

const PDF_PATH = "/developpeur_java_react_cv.pdf";

const DownLoadCV = () => {
  const { theme } = useTheme();
  const copy = COPY;
  const isAurora = theme === "aurora";

  const containerClasses = isAurora
    ? "flex flex-col items-center gap-4 rounded-3xl border border-cyan-200/70 bg-white px-4 py-4 text-center shadow-[0_24px_60px_rgba(97,218,251,0.12)] sm:px-6 sm:py-6 sm:flex-row sm:items-center sm:justify-between sm:text-left"
    : "flex flex-col items-center gap-4 rounded-3xl border border-cyan-500/25 bg-slate-950/75 px-4 py-4 text-center shadow-2xl shadow-cyan-500/20 backdrop-blur-xl sm:px-6 sm:py-6 sm:flex-row sm:items-center sm:justify-between sm:text-left";

  const badgeClasses = isAurora
    ? "inline-flex items-center gap-2 rounded-full border border-cyan-200/80 bg-cyan-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-700"
    : "inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-200";

  const descriptionClass = isAurora ? "text-slate-600" : "text-slate-300";

  return (
    <div className={containerClasses}>
      <div className="space-y-2 text-center sm:text-left">
        <span className={badgeClasses}>{copy.badge}</span>
        <p className={`text-sm sm:text-base transition-colors duration-300 ${descriptionClass}`}>{copy.description}</p>
      </div>
      <div className="mt-3 flex w-full max-w-xs flex-row items-center justify-center gap-3 sm:mt-0 sm:w-auto sm:max-w-none sm:justify-end">
        <a
          href={PDF_PATH}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={copy.view}
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 ${
            isAurora
              ? "bg-cyan-500 text-white shadow-glow-premium"
              : "bg-cyan-500 text-slate-950 shadow-glow-premium"
          }`}
        >
          <FiEye className="text-sm" />
        </a>
        <a
          href={PDF_PATH}
          download
          aria-label={copy.download}
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 ${
            isAurora
              ? "bg-cyan-500 text-white shadow-glow-premium"
              : "bg-cyan-500 text-slate-950 shadow-glow-premium"
          }`}
        >
          <FiDownload className="text-sm" />
        </a>
      </div>
    </div>
  );
};

export default DownLoadCV;
