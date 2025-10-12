"use client";

import { FiDownload, FiEye } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const COPY = {
  fr: {
    title: "Consulter mon CV",
    description: "Découvrez mon parcours en détail et gardez une copie pour plus tard.",
    view: "Voir le CV",
    download: "Télécharger"
  },
  en: {
    title: "Check my resume",
    description: "See the full journey and keep a copy for later.",
    view: "View résumé",
    download: "Download"
  }
} as const;

const PDF_PATH = "/developpeur_java_react_cv.pdf";

const buttonBase =
  "inline-flex items-center justify-center rounded-full p-3 text-base transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer";

const DownLoadCV = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const copy = COPY[language];
  const isAurora = theme === "aurora";

  const containerClasses = isAurora
    ? "flex flex-col gap-4 rounded-3xl border border-sky-200/70 bg-white/90 px-6 py-6 shadow-[0_28px_70px_rgba(59,130,246,0.15)] backdrop-blur"
    : "flex flex-col gap-4 rounded-3xl border border-cyan-500/25 bg-slate-950/75 px-6 py-6 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl";

  const primaryButton = isAurora
    ? "border border-sky-300/40 bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 text-white hover:translate-x-1 hover:shadow-lg hover:shadow-sky-300/40"
    : "border border-cyan-400/30 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 hover:translate-x-1 hover:shadow-lg hover:shadow-cyan-500/30";

  const secondaryButton = isAurora
    ? "border border-sky-200/80 text-sky-600 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
    : "border border-cyan-400/30 text-cyan-200 hover:border-cyan-300 hover:text-white";

  const badgeClasses = isAurora
    ? "inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-sky-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-sky-700"
    : "inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-200";

  const titleClass = isAurora ? "text-slate-800" : "text-white";
  const descriptionClass = isAurora ? "text-slate-600" : "text-slate-300";
  const primaryFocusRing = isAurora
    ? "focus-visible:ring-sky-400/60 focus-visible:ring-offset-white"
    : "focus-visible:ring-cyan-500/50 focus-visible:ring-offset-slate-950";
  const secondaryFocusRing = isAurora
    ? "focus-visible:ring-sky-300/50 focus-visible:ring-offset-white"
    : "focus-visible:ring-cyan-400/40 focus-visible:ring-offset-slate-950";

  return (
    <div className={`${containerClasses} sm:flex-row sm:items-center sm:justify-between`}>
      <div className="space-y-2 text-left">
        <span className={badgeClasses}>CV / Résumé</span>
        <div className="space-y-1">
          <h3 className={`text-base sm:text-lg font-semibold ${titleClass}`}>{copy.title}</h3>
          <p className={`text-sm ${descriptionClass}`}>{copy.description}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <a
          href={PDF_PATH}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonBase} cv-download-primary ${primaryButton} ${primaryFocusRing}`}
          aria-label={copy.view}
        >
          <FiEye className="text-base" />
        </a>
        <a
          href={PDF_PATH}
          download
          className={`${buttonBase} cv-download-secondary ${secondaryButton} ${secondaryFocusRing}`}
          aria-label={copy.download}
        >
          <FiDownload className="text-base" />
        </a>
      </div>
    </div>
  );
};

export default DownLoadCV;
