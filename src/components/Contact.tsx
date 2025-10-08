"use client";

import { FC } from "react";
import { FiMail, FiGithub, FiLinkedin } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

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
  const copy = CONTACT_COPY[language];

  return (
    <section id="contact" className="contact-section relative overflow-hidden py-20 px-4">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Title */}
        <div className="mb-12">
          <h3 className="text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            {copy.title}
          </h3>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
        </div>

        {/* Main content card */}
        <div className="relative group mb-8">
          {/* Animated border glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 animate-gradient-move" />

          <div className="relative bg-gray-900/90 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 sm:p-12">

            {/* Email */}
            <div className="mb-8">
              <a
                href="mailto:houlboumi.sim.bienvenue@gmail.com"
                className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/50"
                aria-label={copy.mailLabel}
              >
                <FiMail className="text-xl" />
              </a>
            </div>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-900 text-gray-400">{copy.divider}</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex justify-center gap-6">
              {/* GitHub */}
              <a
                href="https://github.com/SimBienvenueHoulBoumi"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-14 h-14 bg-gray-800 hover:bg-gray-700 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-500/50"
                aria-label="GitHub"
              >
                <FiGithub className="text-2xl text-gray-300 group-hover:text-white transition-colors" />
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-3 py-1 rounded-lg pointer-events-none transition-all duration-200 whitespace-nowrap shadow-lg">
                  GitHub
                </span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/sim-bienvenue-houl-boumi/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-14 h-14 bg-blue-600 hover:bg-blue-500 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="text-2xl text-white transition-colors" />
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-blue-700 text-white text-xs px-3 py-1 rounded-lg pointer-events-none transition-all duration-200 whitespace-nowrap shadow-lg">
                  LinkedIn
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Additional info */}
        <div className="text-gray-400 text-sm">
          <p>{copy.availability}</p>
          <p className="mt-2">{copy.responseTime}</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
