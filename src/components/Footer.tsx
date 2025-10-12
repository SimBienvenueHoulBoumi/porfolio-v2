"use client";

import { forwardRef } from "react";
import { FaHeart, FaCode } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const FOOTER_COPY = {
  fr: {
    role: "Dev Fullstack Java/React",
    madeWith: "Fait avec",
    and: "et",
    by: "par un passionné de code"
  },
  en: {
    role: "Full-stack Java/React developer",
    madeWith: "Made with",
    and: "and",
    by: "by a code enthusiast"
  }
} as const;

const Footer = forwardRef<HTMLDivElement>((_props, ref) => {
  const { language } = useLanguage();
  const copy = FOOTER_COPY[language];
  const { theme } = useTheme();
  const isAurora = theme === "aurora";

  const footerBackground = isAurora
    ? "from-slate-100 via-white to-sky-100"
    : "from-transparent via-slate-950 to-black";
  const gridOverlay = isAurora
    ? "linear-gradient(rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.18) 1px, transparent 1px)"
    : "linear-gradient(rgba(14,165,233,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.08) 1px, transparent 1px)";
  const topGlow = isAurora ? "bg-sky-200/50" : "bg-cyan-500/20";
  const bottomGlow = isAurora ? "bg-indigo-200/45" : "bg-blue-500/20";
  const badgeClasses = isAurora
    ? "inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-sky-700 shadow-sm shadow-sky-200/40"
    : "inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-slate-900/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-300";
  const rolePill = isAurora
    ? "inline-flex items-center gap-2 rounded-full border border-sky-300/80 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white shadow-sm shadow-sky-300/40"
    : "inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-cyan-200";
  const textPrimary = isAurora ? "text-slate-600" : "text-slate-400";
  const textSecondary = isAurora ? "text-slate-500" : "text-slate-300";
  const sectionTitle = isAurora ? "text-sky-600" : "text-cyan-200";
  const dividerGradient = isAurora
    ? "from-transparent via-sky-300/40 to-transparent"
    : "from-transparent via-cyan-500/40 to-transparent";
  const backgroundOverlay = isAurora ? "shadow-[0_-30px_80px_rgba(59,130,246,0.18)]" : "";

  return (
    <footer
      ref={ref}
      className={`footer-section relative overflow-hidden border-t ${isAurora ? "border-sky-200/60" : "border-cyan-500/20"} bg-gradient-to-b ${footerBackground} ${backgroundOverlay}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.08]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: gridOverlay,
              backgroundSize: "44px 44px"
            }}
          />
        </div>
        <div className={`absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full blur-3xl ${topGlow}`} />
        <div className={`absolute -bottom-20 right-1/3 h-64 w-64 rounded-full blur-3xl ${bottomGlow}`} />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3 text-left">
            <span className={badgeClasses}>
              Sim Bienvenue Houlboumi
            </span>
            <p className={`text-sm max-w-sm ${textPrimary}`}>
              {language === "fr"
                ? "Ingénierie DevOps & full-stack : livraisons sans friction, plateformes stables, code orienté business."
                : "DevOps & full-stack engineering: frictionless delivery, resilient platforms, business-driven code."}
            </p>
          </div>
          <div className={`flex items-center gap-4 text-sm ${textSecondary}`}>
            <span className={rolePill}>
              {copy.role}
            </span>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className={`flex flex-col gap-2 text-xs uppercase tracking-[0.35em] ${isAurora ? "text-sky-500" : "text-cyan-300"}`}>
            <span>&copy; 2025</span>
            <span>Sim Bienvenue Houlboumi</span>
          </div>
          <div className={`flex flex-col gap-2 text-sm ${textSecondary}`}>
            <span className={`font-semibold ${sectionTitle}`}>{language === "fr" ? "Stack de production" : "Production stack"}</span>
            <span>Next.js · Spring Boot · Kubernetes · Datadog</span>
          </div>
          <div className={`flex flex-col gap-2 text-sm ${textSecondary}`}>
            <span className={`font-semibold ${sectionTitle}`}>{copy.madeWith}</span>
            <span className={`inline-flex items-center gap-2 ${textPrimary}`}>
              <FaHeart className="text-red-500 animate-pulse" />
              {copy.and}
              <FaCode className={isAurora ? "text-sky-500" : "text-cyan-400"} />
              {copy.by}
            </span>
          </div>
        </div>

        <div className={`mx-auto h-px w-full max-w-3xl bg-gradient-to-r ${dividerGradient}`} />
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
