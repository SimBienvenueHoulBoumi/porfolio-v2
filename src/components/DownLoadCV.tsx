"use client";

import { FiDownload, FiEye } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import Button from "@/components/ui/Button";

const COPY = {
  fr: {
    badge: "Version PDF · CV personnel",
    title: "Consulter le CV",
    description: "Découvrez mon parcours en détail et gardez une copie pour plus tard.",
    view: "Voir le CV",
    download: "Télécharger"
  },
  en: {
    badge: "PDF version · Personal résumé",
    title: "View the résumé",
    description: "See the full journey and keep a copy for later.",
    view: "View résumé",
    download: "Download"
  }
} as const;

const PDF_PATH = "/developpeur_java_react_cv.pdf";

const DownLoadCV = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const copy = COPY[language];
  const isAurora = theme === "aurora";

  const containerClasses = isAurora
    ? "flex flex-col items-center gap-4 rounded-3xl border border-sky-200/70 bg-white px-6 py-6 text-center shadow-[0_24px_60px_rgba(59,130,246,0.12)] sm:flex-row sm:items-center sm:justify-between sm:text-left"
    : "flex flex-col items-center gap-4 rounded-3xl border border-cyan-500/25 bg-slate-950/75 px-6 py-6 text-center shadow-2xl shadow-cyan-500/20 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:text-left";

  const badgeClasses = isAurora
    ? "inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-sky-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-700"
    : "inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-200";

  const titleClass = isAurora ? "text-slate-800" : "text-white";
  const descriptionClass = isAurora ? "text-slate-600" : "text-slate-300";

  return (
    <div className={`${containerClasses} transition-all duration-500 hover-lift group/cv`}>
      <div className="space-y-2 text-center sm:text-left">
        <span className={`${badgeClasses} transition-all duration-300 group-hover/cv:scale-105`}>{copy.badge}</span>
        <div className="space-y-1">
          <h3 className={`text-base sm:text-lg font-semibold transition-colors duration-300 ${titleClass}`}>{copy.title}</h3>
          <p className={`text-sm transition-colors duration-300 ${descriptionClass}`}>{copy.description}</p>
        </div>
      </div>
      <div className="mt-2 flex w-full max-w-xs flex-col gap-2 sm:mt-0 sm:w-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-end sm:gap-3">
        <Button
          as="a"
          href={PDF_PATH}
          target="_blank"
          rel="noopener noreferrer"
          isAurora={isAurora}
          variant="primary"
          size="md"
          className="group/btn"
          aria-label={copy.view}
          iconLeft={<FiEye className="transition-transform duration-300 group-hover/btn:scale-125" />}
        >
          {copy.view}
        </Button>
        <Button
          as="a"
          href={PDF_PATH}
          download
          isAurora={isAurora}
          variant="secondary"
          size="md"
          className="group/btn"
          aria-label={copy.download}
          iconLeft={<FiDownload className="transition-transform duration-300 group-hover/btn:scale-125" />}
        >
          {copy.download}
        </Button>
      </div>
    </div>
  );
};

export default DownLoadCV;
