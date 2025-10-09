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
  "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 cursor-pointer";

const DownLoadCV = () => {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm border border-cyan-500/25 rounded-2xl px-6 py-5 shadow-2xl shadow-cyan-500/10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <h3 className="text-base sm:text-lg font-semibold text-white">{copy.title}</h3>
        <p className="text-sm text-gray-300">{copy.description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 sim:gap-4">
        <a
          href={PDF_PATH}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonBase} cv-download-primary bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 focus:ring-cyan-400/60`}
        >
          <FiEye className="text-base" />
          {copy.view}
        </a>
        <a
          href={PDF_PATH}
          download
          className={`${buttonBase} cv-download-secondary border border-cyan-400/40 text-cyan-200 hover:text-white hover:border-cyan-300/80 focus:ring-cyan-400/40`}
        >
          <FiDownload className="text-base" />
          {copy.download}
        </a>
      </div>
    </div>
  );
};

export default DownLoadCV;
