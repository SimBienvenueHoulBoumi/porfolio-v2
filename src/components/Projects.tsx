"use client";

import { FC } from "react";
import { FiGithub } from "react-icons/fi";

import { useLanguage } from "@/context/LanguageContext";

const PROJECTS_COPY: Record<
  "fr" | "en",
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: { href: string; label: string };
  }
> = {
  fr: {
    eyebrow: "API REST Springboot",
    title: "Service Rest prêt pour la production",
    subtitle: "Qualité de code, tests unitaires fonctionels.",
    cta: {
      href: "https://github.com/SimBienvenueHoulBoumi/demo-rest-api",
      label: "Explorer mon GitHub"
    },
  },
  en: {
    eyebrow: "Case studies",
    title: "Production-grade platforms",
    subtitle: "Code quality, reliable pipelines and resilient cloud delivered on tangible projects.",
    cta: {
      href: "https://github.com/SimBienvenueHoulBoumi",
      label: "Browse my GitHub"
    },
  }
};



const Projects: FC = () => {
  const { language } = useLanguage();
  const copy = PROJECTS_COPY[language];

  return (
    <section
      id="projects"
      className="projects-section relative overflow-hidden py-20 px-4 bg-gradient-to-br from-gray-950 via-gray-900 to-black"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(14, 165, 233, 0.05) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(14, 165, 233, 0.05) 1px, transparent 1px)`,
            backgroundSize: "44px 44px"
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 fade-in">
        <div className="text-center space-y-2">
          <a
            href={copy.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition-all duration-300 hover:border-cyan-300/60 hover:text-white hover:shadow-lg hover:shadow-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
          >
            <FiGithub className="text-lg" />
            {copy.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
