"use client";

import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

const CHANNELS = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sim-bienvenue-houl-boumi/",
    accent: "bg-gradient-to-br from-sky-500 to-blue-500",
    ring: "focus-visible:ring-sky-400/60"
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/SimBienvenueHoulBoumi",
    accent: "bg-gradient-to-br from-slate-800 to-slate-900",
    ring: "focus-visible:ring-cyan-400/60"
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:houlboumi.sim.bienvenue@gmail.com",
    accent: "bg-gradient-to-br from-pink-500 to-purple-500",
    ring: "focus-visible:ring-pink-400/60"
  }
] as const;

const ICON_MAP = {
  linkedin: FiLinkedin,
  github: FiGithub,
  email: FiMail
} as const;

const BANNER_COPY = {
  fr: {
    caption: "Canaux prioritaires",
    description:
      "Connectons-nous, synchronisons et lançons le prochain incrément sans friction. Choisissez votre signal."
  },
  en: {
    caption: "Priority channels",
    description:
      "Connect, sync, and launch the next increment without friction. Pick your signal."
  }
} as const;

const Banner = () => {
  const { language } = useLanguage();
  const copy = BANNER_COPY[language];

  return (
    <div className="banner-section relative z-10 mt-4 mb-16 flex justify-center">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-cyan-500/20 bg-slate-950/70 px-6 py-6 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(120deg, rgba(56,189,248,0.18), rgba(32,211,238,0.08), rgba(129,140,248,0.15))"
            }}
          />
        </div>
        <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-left">
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">{copy.caption}</p>
            <p className="text-sm text-slate-300">{copy.description}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:justify-end">
            {CHANNELS.map(({ id, label, href, accent, ring }) => {
              const Icon = ICON_MAP[id as keyof typeof ICON_MAP];
              return (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group inline-flex items-center gap-2 rounded-full border border-cyan-400/20 px-4 py-2 text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${ring}`}
                >
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full ${accent}`}>
                    <Icon className="text-base" />
                  </span>
                  <span className="text-cyan-200">{label}</span>
                  <FiArrowUpRight className="text-base text-cyan-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
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
