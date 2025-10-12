"use client";

import { FC } from "react";
import { IconType } from "react-icons";
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiClock,
  FiZap,
  FiArrowUpRight
} from "react-icons/fi";

import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

type Channel = {
  id: string;
  label: string;
  description: string;
  action: string;
  href: string;
  badge?: string;
  icon: IconType;
  external?: boolean;
};

type Step = {
  accent: string;
  title: string;
  description: string;
};

type Callout = {
  label: string;
  value: string;
};

type ContactCopy = {
  title: string;
  subtitle: string;
  description: string;
  processTitle: string;
  steps: Step[];
  callouts: Callout[];
  channels: Channel[];
  footnote: string;
};

const CONTACT_COPY: Record<"fr" | "en", ContactCopy> = {
  fr: {
    title: "Contact",
    subtitle: "Interface prioritaire",
    description:
      "Engageons un canal direct pour aligner vos objectifs produit, valider la stack et déployer les prochains incréments sans friction.",
    processTitle: "Protocole express",
    steps: [
      {
        accent: "T+0",
        title: "Brief express",
        description:
          "Partagez le contexte (produit, équipe, stack) via le canal de votre choix."
      },
      {
        accent: "T+1h",
        title: "Sync rapide",
        description:
          "Je confirme la réception, clarifie les enjeux et propose un créneau d’échange si nécessaire."
      },
      {
        accent: "T+24h",
        title: "Feuille de route",
        description:
          "Envoi d’un plan d’action ou d’une estimation pour enclencher la mission."
      }
    ],
    callouts: [
      { label: "Disponibilité", value: "Freelance & CDI" },
      { label: "Fuseau horaire", value: "CET / CEST" },
      { label: "SLA réponse", value: "< 24h" }
    ],
    channels: [
      {
        id: "email",
        label: "Email prioritaire",
        description:
          "Canal direct pour détailler votre besoin, partager un cahier des charges ou un backlog prioritaire.",
        action: "Envoyer un message",
        badge: "Réponse < 24h",
        href: "mailto:houlboumi.sim.bienvenue@gmail.com",
        icon: FiMail
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        description:
          "Idéal pour démarrer une discussion business, valider le fit culturel et partager vos défis produits.",
        action: "Entrer en contact",
        badge: "Réseau pro",
        href: "https://www.linkedin.com/in/sim-bienvenue-houl-boumi/",
        icon: FiLinkedin,
        external: true
      },
      {
        id: "github",
        label: "GitHub",
        description:
          "Parcourez le code, pipelines CI/CD et expérimentations cloud-native livrés en production.",
        action: "Explorer les projets",
        badge: "Repos actifs",
        href: "https://github.com/SimBienvenueHoulBoumi",
        icon: FiGithub,
        external: true
      }
    ],
    footnote: "Les créneaux téléphoniques sont proposés après un premier échange sur le canal choisi."
  },
  en: {
    title: "Contact",
    subtitle: "Priority interface",
    description:
      "Let’s open a direct channel, align on your product goals, validate the stack, and ship the next increments without friction.",
    processTitle: "Rapid protocol",
    steps: [
      {
        accent: "T+0",
        title: "Instant brief",
        description:
          "Share product context, team setup, and tech stack through your preferred channel."
      },
      {
        accent: "T+1h",
        title: "Quick sync",
        description:
          "I acknowledge reception, clarify the scope, and propose a call if needed."
      },
      {
        accent: "T+24h",
        title: "Action plan",
        description:
          "Receive a roadmap or estimate to launch the engagement."
      }
    ],
    callouts: [
      { label: "Availability", value: "Freelance & Full-time" },
      { label: "Timezone", value: "CET / CEST" },
      { label: "Response SLA", value: "< 24h" }
    ],
    channels: [
      {
        id: "email",
        label: "Priority email",
        description:
          "Best for sharing scope details, requirements, or a priority backlog in one pass.",
        action: "Send a message",
        badge: "Reply < 24h",
        href: "mailto:houlboumi.sim.bienvenue@gmail.com",
        icon: FiMail
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        description:
          "Great to kick off a business conversation, check culture fit, and share product challenges.",
        action: "Connect",
        badge: "Professional network",
        href: "https://www.linkedin.com/in/sim-bienvenue-houl-boumi/",
        icon: FiLinkedin,
        external: true
      },
      {
        id: "github",
        label: "GitHub",
        description:
          "Browse real-world code, CI/CD pipelines, and cloud-native experiments delivered in production.",
        action: "View projects",
        badge: "Active repos",
        href: "https://github.com/SimBienvenueHoulBoumi",
        icon: FiGithub,
        external: true
      }
    ],
    footnote: "Phone slots are proposed right after the first touch-point on the selected channel."
  }
};

const Contact: FC = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  const copy = CONTACT_COPY[language];
  const isAurora = theme === "aurora";

  const sectionBg = isAurora
    ? "from-slate-100 via-sky-50 to-white"
    : "from-gray-950 via-gray-900 to-black";

  const primaryPanel = isAurora
    ? "border-sky-200/60 bg-white/90 text-slate-700 shadow-sky-200/40"
    : "border-cyan-500/30 bg-gray-950/80 text-gray-200 shadow-cyan-500/20";

  const stepCard = isAurora
    ? "border-sky-200/60 bg-white/60 hover:border-sky-300 hover:bg-white/80"
    : "border-cyan-500/30 bg-gray-900/60 hover:border-cyan-400/50 hover:bg-gray-900/80";

  const calloutCard = isAurora
    ? "border-sky-200/70 bg-white/70 text-slate-700 shadow-sky-200/30"
    : "border-cyan-500/25 bg-gray-900/70 text-gray-200 shadow-cyan-500/15";

  const channelCard = isAurora
    ? "border-sky-200/70 bg-white/75 hover:border-sky-300 hover:bg-white/90 focus-visible:ring-sky-400/50 focus-visible:ring-offset-white"
    : "border-cyan-500/25 bg-gray-900/80 hover:border-cyan-400/60 hover:bg-gray-900/95 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-gray-950";

  return (
    <section
      id="contact"
      className={`contact-section relative overflow-hidden bg-gradient-to-br ${sectionBg} py-24 px-4 sm:px-8`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(34,211,238,0.12), transparent 55%), radial-gradient(circle at 80% 30%, rgba(59,130,246,0.15), transparent 60%), radial-gradient(circle at 50% 75%, rgba(147,51,234,0.12), transparent 65%)"
            }}
          />
        </div>
        <div className="absolute inset-0 opacity-[0.08]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(14,165,233,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.08) 1px, transparent 1px)",
              backgroundSize: "46px 46px"
            }}
          />
        </div>
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/15 blur-3xl motion-safe:animate-pulse-slow" />
        <div className="absolute -bottom-20 right-1/3 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl motion-safe:animate-pulse-slow" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12">
        <div className="text-center space-y-4">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] ${
              isAurora
                ? "border-sky-200/80 bg-white/70 text-sky-500"
                : "border-cyan-500/30 bg-gray-900/80 text-cyan-300"
            }`}
          >
            <FiClock className="text-sm" />
            {copy.subtitle}
          </span>
          <h3
            className={`text-4xl font-bold sm:text-5xl ${
              isAurora
                ? "text-transparent bg-gradient-to-r from-slate-900 via-sky-700 to-purple-700 bg-clip-text"
                : "text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text"
            }`}
          >
            {copy.title}
          </h3>
          <p
            className={`mx-auto max-w-3xl text-sm sm:text-base ${
              isAurora ? "text-slate-600" : "text-gray-300"
            }`}
          >
            {copy.description}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,400px)]">
          <div className="space-y-8">
            <div
              className={`relative overflow-hidden rounded-3xl border backdrop-blur-xl px-8 py-10 sm:px-10 sm:py-12 ${primaryPanel}`}
            >
              <div className="pointer-events-none absolute -right-24 top-10 hidden h-64 w-64 rounded-full bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-purple-500/30 blur-3xl motion-safe:animate-pulse-slow lg:block" />
              <div className="relative z-10 space-y-6">
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${
                    isAurora ? "bg-sky-100 text-sky-600" : "bg-cyan-500/15 text-cyan-200"
                  }`}
                >
                  <FiZap className="text-sm" />
                  {copy.processTitle}
                </span>
                <p className={isAurora ? "text-base text-slate-600" : "text-base text-gray-300"}>
                  {language === "fr"
                    ? "Chaque interaction est pensée comme un pipeline fiable : entrée claire, validation rapide, décision alignée."
                    : "Every touchpoint behaves like a reliable pipeline: clear input, swift validation, aligned decision."}
                </p>
                <ul className="grid gap-4 sm:grid-cols-3">
                  {copy.steps.map((step) => (
                    <li
                      key={step.title}
                      className={`group relative overflow-hidden rounded-2xl border px-4 py-5 transition-all duration-300 ${stepCard}`}
                    >
                      <div
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          backgroundImage:
                            "linear-gradient(120deg, rgba(56,189,248,0.15), rgba(192,132,252,0.18))"
                        }}
                      />
                      <div className="relative z-10 space-y-3">
                        <span
                          className={`inline-flex items-center justify-center rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] ${
                            isAurora ? "bg-sky-100 text-sky-600" : "bg-cyan-500/20 text-cyan-200"
                          }`}
                        >
                          {step.accent}
                        </span>
                        <h4
                          className={`text-sm font-semibold ${
                            isAurora ? "text-slate-700" : "text-gray-100"
                          }`}
                        >
                          {step.title}
                        </h4>
                        <p className={`text-xs leading-relaxed ${isAurora ? "text-slate-500" : "text-gray-400"}`}>
                          {step.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {copy.callouts.map((callout) => (
                <div
                  key={callout.label}
                  className={`rounded-2xl border px-5 py-4 text-left backdrop-blur-md transition-all duration-300 ${calloutCard}`}
                >
                  <p className="text-xs uppercase tracking-[0.35em] opacity-80">{callout.label}</p>
                  <p className="mt-2 text-lg font-semibold">{callout.value}</p>
                </div>
              ))}
            </div>

            <p
              className={`text-xs ${isAurora ? "text-slate-500" : "text-gray-400"}`}
            >
              {copy.footnote}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {copy.channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <a
                  key={channel.id}
                  href={channel.href}
                  target={channel.external ? "_blank" : undefined}
                  rel={channel.external ? "noopener noreferrer" : undefined}
                  className={`group relative flex overflow-hidden rounded-2xl border px-6 py-6 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${channelCard}`}
                  aria-label={channel.action}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, rgba(56,189,248,0.2), rgba(129,140,248,0.18))"
                      }}
                    />
                  </div>
                  <div className="relative z-10 flex w-full flex-col gap-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                            isAurora
                              ? "bg-gradient-to-br from-sky-400 to-blue-500 text-white shadow-lg shadow-sky-200/40"
                              : "bg-gradient-to-br from-cyan-500 to-blue-500 text-gray-900 shadow-lg shadow-cyan-500/30"
                          }`}
                        >
                          <Icon className="text-xl" />
                        </span>
                        <div>
                          <p className={`text-sm font-semibold ${isAurora ? "text-slate-700" : "text-white"}`}>
                            {channel.label}
                          </p>
                          {channel.badge && (
                            <span
                              className={`mt-1 inline-flex items-center rounded-full px-2 py-1 text-[11px] font-medium ${
                                isAurora ? "bg-sky-100 text-sky-600" : "bg-cyan-500/20 text-cyan-200"
                              }`}
                            >
                              {channel.badge}
                            </span>
                          )}
                        </div>
                      </div>
                      <FiArrowUpRight
                        className={`text-xl transition-transform duration-300 ${
                          isAurora ? "text-sky-500" : "text-cyan-300"
                        } group-hover:rotate-12 group-hover:scale-110`}
                      />
                    </div>
                    <p className={`text-sm leading-relaxed ${isAurora ? "text-slate-500" : "text-gray-400"}`}>
                      {channel.description}
                    </p>
                    <span
                      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] ${
                        isAurora ? "text-sky-500" : "text-cyan-300"
                      }`}
                    >
                      {channel.action}
                      <span
                        className={`h-px w-6 transition-all duration-300 ${
                          isAurora ? "bg-sky-400 group-hover:w-10" : "bg-cyan-400 group-hover:w-10"
                        }`}
                      />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
