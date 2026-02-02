"use client";

import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";

const CHANNELS = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sim-bienvenue-houl-boumi/",
    accent: "bg-emerald-500",
    ring: "focus-visible:ring-emerald-400/60"
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/SimBienvenueHoulBoumi",
    accent: "bg-slate-900",
    ring: "focus-visible:ring-emerald-400/60"
  },
  {
    id: "email",
    label: "Courriel",
    href: "mailto:houlboumi.sim.bienvenue@gmail.com",
    accent: "bg-pink-500",
    ring: "focus-visible:ring-pink-400/60"
  }
] as const;

const ICON_MAP = {
  linkedin: FiLinkedin,
  github: FiGithub,
  email: FiMail
} as const;

const BANNER_COPY = {
  caption: "Canaux prioritaires",
  description:
    "Connectons-nous, synchronisons et lançons le prochain incrément sans friction. Choisissez votre signal."
} as const;

const Banner = () => {
  const copy = BANNER_COPY;
  const { theme } = useTheme();
  const isAurora = theme === "aurora";

  const containerClasses = isAurora
    ? "relative w-full max-w-3xl overflow-hidden rounded-3xl border border-emerald-200/70 bg-white px-4 py-4 shadow-[0_18px_45px_rgba(15,23,42,0.16)] transition-all duration-500 hover:border-emerald-300/80 sm:px-6 sm:py-6"
    : "relative w-full max-w-3xl overflow-hidden rounded-3xl border border-emerald-500/25 bg-slate-950/70 px-4 py-4 shadow-2xl shadow-emerald-500/25 backdrop-blur-xl transition-all duration-500 hover:border-emerald-400/40 hover:shadow-emerald-500/30 sm:px-6 sm:py-6";

  const captionClass = isAurora ? "text-xs uppercase tracking-[0.35em] text-slate-500" : "text-xs uppercase tracking-[0.35em] text-emerald-300";
  const descriptionClass = isAurora ? "text-sm text-slate-600" : "text-sm text-slate-300";
  const linkTextClass = isAurora ? "text-slate-700 group-hover:text-emerald-700" : "text-emerald-200 group-hover:text-emerald-100";
  const arrowColorClass = isAurora ? "text-emerald-500" : "text-emerald-300";

  return (
    <div className="banner-section relative z-10 mt-4 mb-16 flex justify-center">
      <div className={containerClasses}>
        <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-left">
            <p className={captionClass}>{copy.caption}</p>
            <p className={descriptionClass}>{copy.description}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:justify-end">
            {CHANNELS.map(({ id, label, href, accent, ring }) => {
              const Icon = ICON_MAP[id as keyof typeof ICON_MAP];
              const accentClass = isAurora ? "bg-emerald-500" : accent;
              return (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className={`group flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ripple-effect ${
                    isAurora
                      ? "border-emerald-200/80 hover:border-emerald-300/80 hover:bg-emerald-50 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-white"
                      : `border-emerald-400/25 hover:border-emerald-400/40 hover:bg-emerald-500/10 hover:shadow-emerald-500/30 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-slate-950 ${ring}`
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${accentClass}`}
                  >
                    <Icon className="text-sm transition-transform duration-300 group-hover:scale-125" />
                  </span>
                  <span className="sr-only">{label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
