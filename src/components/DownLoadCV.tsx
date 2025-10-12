"use client";

import { FiDownload, FiEye } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

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
  const copy = COPY[language];

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-cyan-500/25 bg-slate-950/75 px-6 py-6 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-2 text-left">
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-200">
          CV / Résumé
        </span>
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-semibold text-white">{copy.title}</h3>
          <p className="text-sm text-slate-300">{copy.description}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <a
          href={PDF_PATH}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonBase} cv-download-primary border border-cyan-400/30 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 hover:translate-x-1 hover:shadow-2xl hover:shadow-cyan-500/30 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-slate-950`}
          aria-label={copy.view}
        >
          <FiEye className="text-base" />
        </a>
        <a
          href={PDF_PATH}
          download
          className={`${buttonBase} cv-download-secondary border border-cyan-400/30 text-cyan-200 hover:border-cyan-300 hover:text-white focus-visible:ring-cyan-400/40 focus-visible:ring-offset-slate-950`}
          aria-label={copy.download}
        >
          <FiDownload className="text-base" />
        </a>
      </div>
    </div>
  );
};

export default DownLoadCV;
