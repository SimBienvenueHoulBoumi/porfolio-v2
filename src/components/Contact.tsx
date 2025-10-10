"use client";

import { FC } from "react";
import { FiMail, FiGithub, FiLinkedin } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const CONTACT_COPY = {
  fr: {
    title: "Contact",
    divider: "ou connectez-vous via",
    availability: "Disponible pour des missions en freelance ou CDI",
    responseTime: "Réponse sous 24h 🚀",
    mailLabel: "Envoyer un email"
  },
  en: {
    title: "Contact",
    divider: "or reach out via",
    availability: "Available for freelance missions or full-time roles",
    responseTime: "Replies within 24h 🚀",
    mailLabel: "Send an email"
  }
} as const;

const Contact: FC = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isAurora = theme === "aurora";
  const copy = CONTACT_COPY[language];

  const sectionClasses = isAurora
    ? "contact-section relative overflow-hidden py-20 px-4 bg-gradient-to-b from-sky-50 via-white to-slate-100"
    : "contact-section relative overflow-hidden py-20 px-4";

  const gridColor = isAurora ? "rgba(37, 99, 235, 0.05)" : "rgba(34, 211, 238, 0.1)";

  const glowClasses = isAurora
    ? "absolute -inset-0.5 bg-gradient-to-r from-sky-400 via-blue-400 to-purple-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"
    : "absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 animate-gradient-move";

  const cardClasses = isAurora
    ? "relative bg-white/90 backdrop-blur-xl border border-sky-200 rounded-2xl p-8 sm:p-12 shadow-xl shadow-sky-200/50"
    : "relative bg-gray-900/90 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 sm:p-12 shadow-xl shadow-cyan-500/20";

  const dividerBorderClass = isAurora ? "border-slate-200" : "border-gray-700";
  const dividerLabelClass = isAurora ? "px-4 bg-white text-slate-500" : "px-4 bg-gray-900 text-gray-400";

  const socialLabelBase = isAurora
    ? "absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs px-3 py-1 rounded-lg pointer-events-none transition-all duration-200 whitespace-nowrap shadow-lg shadow-slate-300/40 border border-slate-200 bg-white text-slate-700"
    : "absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs px-3 py-1 rounded-lg pointer-events-none transition-all duration-200 whitespace-nowrap shadow-lg bg-gray-800 text-white";

  const infoTextClass = isAurora ? "text-slate-600" : "text-gray-400";
  const sectionTitleClass = isAurora
    ? "text-4xl font-bold mb-3 text-gray-700"
    : "text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent";

  return (
    <section id="contact" className={sectionClasses}>
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px),
                         linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="mb-12">
          <h3 className={sectionTitleClass}>
            {copy.title}
          </h3>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
        </div>

        <div className="relative group mb-8">
          <div className={glowClasses} />

          <div className={cardClasses}>
            <div className="mb-8">
              <a
                href="mailto:houlboumi.sim.bienvenue@gmail.com"
                className={`group inline-flex items-center gap-3 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105 ${
                  isAurora
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-lg shadow-sky-300/50"
                    : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-500/50"
                }`}
                aria-label={copy.mailLabel}
              >
                <FiMail className="text-xl" />
              </a>
            </div>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${dividerBorderClass}`} />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={dividerLabelClass}>{copy.divider}</span>
              </div>
            </div>

            <div className="flex justify-center gap-6">
              <a
                href="https://github.com/SimBienvenueHoulBoumi"
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 hover:scale-110 ${
                  isAurora
                    ? "bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-md shadow-slate-300/40"
                    : "bg-gray-800 hover:bg-gray-700 shadow-lg shadow-gray-500/50"
                }`}
                aria-label="GitHub"
              >
                <FiGithub
                  className={`text-2xl transition-colors ${
                    isAurora ? "text-slate-600 group-hover:text-slate-800" : "text-gray-300 group-hover:text-white"
                  }`}
                />
                <span className={socialLabelBase}>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/sim-bienvenue-houl-boumi/"
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 hover:scale-110 ${
                  isAurora
                    ? "bg-gradient-to-br from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-lg shadow-sky-300/50"
                    : "bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/50"
                }`}
                aria-label="LinkedIn"
              >
                <FiLinkedin className="text-2xl text-white transition-colors" />
                <span
                  className={`${socialLabelBase} ${
                    isAurora
                      ? "bg-sky-500 text-white border border-sky-400 shadow-sky-400/40"
                      : "bg-blue-700"
                  }`}
                >
                  LinkedIn
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className={`${infoTextClass} text-sm`}>
          <p>{copy.availability}</p>
          <p className="mt-2">{copy.responseTime}</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
