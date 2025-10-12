"use client";

import { forwardRef } from "react";
import { FaHeart, FaCode } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

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

  return (
    <footer
      ref={ref}
      className="footer-section relative overflow-hidden border-t border-cyan-500/20 bg-gradient-to-b from-transparent via-slate-950 to-black"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.08]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(14,165,233,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.08) 1px, transparent 1px)",
              backgroundSize: "44px 44px"
            }}
          />
        </div>
        <div className="absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-20 right-1/3 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3 text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-slate-900/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-300">
              Sim Bienvenue Houlboumi
            </span>
            <p className="text-sm text-slate-400 max-w-sm">
              {language === "fr"
                ? "Ingénierie DevOps & full-stack : livraisons sans friction, plateformes stables, code orienté business."
                : "DevOps & full-stack engineering: frictionless delivery, resilient platforms, business-driven code."}
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-300">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-cyan-200">
              {copy.role}
            </span>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className="flex flex-col gap-2 text-xs uppercase tracking-[0.35em] text-cyan-300">
            <span>&copy; 2025</span>
            <span>Sim Bienvenue Houlboumi</span>
          </div>
          <div className="flex flex-col gap-2 text-sm text-slate-400">
            <span className="font-semibold text-cyan-200">{language === "fr" ? "Stack de production" : "Production stack"}</span>
            <span>Next.js · Spring Boot · Kubernetes · Datadog</span>
          </div>
          <div className="flex flex-col gap-2 text-sm text-slate-400">
            <span className="font-semibold text-cyan-200">{copy.madeWith}</span>
            <span className="inline-flex items-center gap-2 text-slate-300">
              <FaHeart className="text-red-500 animate-pulse" />
              {copy.and}
              <FaCode className="text-cyan-400" />
              {copy.by}
            </span>
          </div>
        </div>

        <div className="mx-auto h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
