"use client";

import { forwardRef } from "react";
import { FaHeart, FaCode } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { FooterContent } from "@/lib/content";

type FooterProps = {
  content: FooterContent;
};

const Footer = forwardRef<HTMLDivElement, FooterProps>(({ content }, ref) => {
  const { theme } = useTheme();
  const isAurora = theme === "aurora";
  const gridOverlay = isAurora
    ? "linear-gradient(rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.18) 1px, transparent 1px)"
    : "linear-gradient(rgba(34,197,94,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.08) 1px, transparent 1px)";
  const topGlow = isAurora ? "bg-emerald-200/50" : "bg-emerald-500/20";
  const bottomGlow = isAurora ? "bg-emerald-200/45" : "bg-emerald-400/20";
  const badgeClasses = isAurora
    ? "inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-700 shadow-sm shadow-emerald-200/40"
    : "inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-slate-900/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-emerald-200";
  const rolePill = isAurora
    ? "inline-flex items-center gap-2 rounded-full border border-emerald-300/80 bg-emerald-500 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white shadow-sm shadow-emerald-300/40"
    : "inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-emerald-200";
  const textPrimary = isAurora ? "text-slate-600" : "text-slate-400";
  const textSecondary = isAurora ? "text-slate-500" : "text-slate-300";
  const sectionTitle = isAurora ? "text-slate-700" : "text-emerald-200";
  const backgroundOverlay = isAurora ? "shadow-[0_-30px_80px_rgba(34,197,94,0.18)]" : "";

  return (
    <footer
      ref={ref}
      className={`footer-section relative overflow-hidden border-t transition-all duration-500 ${
        isAurora ? "border-emerald-200/60" : "border-emerald-500/20"
      } ${backgroundOverlay}`}
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

      <div className="layout-shell relative z-10 flex flex-col gap-8 py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3 text-left">
            <span className={badgeClasses}>{content.label}</span>
            <p className={`text-sm max-w-sm ${textPrimary}`}>{content.by}</p>
          </div>
          <div className={`flex items-center gap-4 text-sm ${textSecondary}`}>
            <span className={rolePill}>{content.role}</span>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className={`flex flex-col gap-2 text-xs uppercase tracking-[0.35em] ${isAurora ? "text-slate-600" : "text-emerald-300"}`}>
            <span>&copy; {content.year}</span>
            <span>{content.label}</span>
          </div>
          <div className={`flex flex-col gap-2 text-sm ${textSecondary}`}>
            <span className={`font-semibold ${sectionTitle}`}>{content.stackTitle}</span>
            <span>{content.stackItems}</span>
          </div>
          <div className={`flex flex-col gap-2 text-sm ${textSecondary}`}>
            <span className={`font-semibold ${sectionTitle}`}>{content.madeWith}</span>
            <span className={`inline-flex items-center gap-2 ${textPrimary} group/heart`}>
              <FaHeart
                className={`transition-transform duration-300 group-hover/heart:scale-125 group-hover/heart:animate-pulse ${
                  isAurora ? "text-emerald-500" : "text-red-500"
                }`}
              />
              {content.and}
              <FaCode
                className={`transition-transform duration-300 group-hover/heart:rotate-12 ${
                  isAurora ? "text-slate-700" : "text-emerald-400"
                }`}
              />
              {content.by}
            </span>
          </div>
        </div>

        <div className="mx-auto h-px w-full max-w-3xl bg-emerald-500/40" />
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
