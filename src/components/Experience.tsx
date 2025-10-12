"use client";

import { FC, ReactNode } from "react";
import {
  FaBuilding,
  FaUsers,
  FaCalendar,
  FaMicrochip,
  FaChevronRight
} from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const Tooltip: FC<{ text: string; children: ReactNode }> = ({ text, children }) => {
  const { theme } = useTheme();
  const isAurora = theme === "aurora";

  const bubbleClasses = isAurora
    ? "bg-white text-slate-700 border border-sky-200 shadow-xl shadow-sky-200/40"
    : "bg-slate-950 text-white border border-cyan-500/40 shadow-xl shadow-cyan-500/20";

  return (
    <span className="relative group cursor-help">
      {children}
      <span
        className={`pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-xs -translate-x-1/2 rounded-lg px-3 py-1 text-xs opacity-0 transition-opacity duration-300 ${bubbleClasses} group-hover:opacity-100`}
      >
        {text}
      </span>
    </span>
  );
};

type ExperienceBullet = {
  content: ReactNode;
};

type ExperienceItem = {
  company: { label: string; tooltip: string };
  team: { label: string; tooltip: string };
  role: string;
  tech: { label: string; tooltip: string };
  date: string;
  location?: string;
  impact: string;
  bullets: ExperienceBullet[];
};

type ExperienceCopy = {
  title: string;
  subtitle: string;
  experiences: ExperienceItem[];
};

const EXPERIENCE_COPY: Record<"fr" | "en", ExperienceCopy> = {
  fr: {
    title: "Expériences terrain",
    subtitle:
      "Des équipes livrées en mode continu : alignment produit, pipelines CI/CD, observabilité et culture feedback.",
    experiences: [
      {
        company: {
          label: "SNCF Voyageurs",
          tooltip: "Groupe ferroviaire français, division transport de voyageurs."
        },
        team: {
          label: "Équipe Agile",
          tooltip: "Mode Scrum, sprints de 2 semaines, rituels calés sur le delivery pipeline."
        },
        role: "Développeur Front ReactJS",
        tech: {
          label: "Next.js",
          tooltip: "Framework React avec SSR et ISR, utilisé pour des interfaces modernes et performantes."
        },
        date: "Octobre 2021 – Septembre 2023",
        impact:
          "Interface data pour piloter les flux voyageurs, livraisons hebdomadaires et visibilité en temps réel sur les indicateurs clés.",
        bullets: [
          {
            content: (
              <>
                Conception d&apos;une interface data en{" "}
                <span className="text-cyan-300 font-semibold">React / Next.js</span> orientée UX et performance.
              </>
            )
          },
          {
            content: (
              <>
                Contrôle des règles métiers via requêtes{" "}
                <span className="text-amber-200 font-semibold">SQL</span> ciblées en production.
              </>
            )
          },
          {
            content: (
              <>
                Intégration d&apos;API{" "}
                <span className="text-pink-300 font-semibold">Spring Boot</span> sécurisées avec authentification et gestion
                d&apos;erreurs.
              </>
            )
          },
          {
            content: (
              <>
                Automatisation des environnements de test avec{" "}
                <span className="text-cyan-300 font-semibold">Docker Compose</span> pour reproduire les bugs.
              </>
            )
          },
          {
            content: (
              <>
                Participation aux pipelines{" "}
                <Tooltip text="Orchestration des jobs, validations automatiques, déploiements contrôlés.">
                  <span className="text-cyan-100 font-semibold">CI/CD</span>
                </Tooltip>{" "}
                Jenkins et à la documentation technique.
              </>
            )
          }
        ]
      },
      {
        company: {
          label: "INFO 2R",
          tooltip: "Plateforme RH interne modernisée pour piloter les processus employés."
        },
        team: {
          label: "Équipe DevOps",
          tooltip: "Responsable de l’automatisation RH, des pipelines et du monitoring opérationnel."
        },
        role: "Développeur Backend Java / Spring Boot",
        tech: {
          label: "Spring Boot",
          tooltip: "Framework Java moderne pour développer des API REST sécurisées et modulaires."
        },
        date: "Mars 2024 – Septembre 2024",
        impact:
          "Plateforme RH modulaire : gestion des onboarding, des congés et reporting légal, avec 30% de délais en moins.",
        bullets: [
          {
            content: (
              <>
                Développement d&apos;<span className="text-indigo-300 font-semibold">API REST</span> sécurisées en{" "}
                <span className="text-indigo-300 font-semibold">Spring Boot</span> avec authentification JWT.
              </>
            )
          },
          {
            content: (
              <>
                Mise en place de <span className="text-pink-300 font-semibold">Kafka</span> pour synchroniser les événements RH inter-services.
              </>
            )
          },
          {
            content: (
              <>
                Création de pipelines{" "}
                <span className="text-cyan-100 font-semibold">Jenkins CI/CD</span> pour build, tests et déploiements automatisés.
              </>
            )
          },
          {
            content: (
              <>
                Pilotage de l&apos;observabilité RH avec{" "}
                <span className="text-green-200 font-semibold">Datadog</span> : métriques, alerting et documentation.
              </>
            )
          },
          {
            content: (
              <>
                <span className="text-cyan-300 font-semibold">Conteneurisation Docker</span> des services pour des environnements
                reproductibles.
              </>
            )
          }
        ]
      }
    ]
  },
  en: {
    title: "Field experience",
    subtitle:
      "Teams running continuous delivery: product alignment, CI/CD pipelines, observability, and feedback culture.",
    experiences: [
      {
        company: {
          label: "SNCF Voyageurs",
          tooltip: "French railway group, passenger transport division."
        },
        team: {
          label: "Agile Team",
          tooltip: "Scrum setup, two-week sprints, rituals synchronized with the delivery pipeline."
        },
        role: "Front-end ReactJS Developer",
        tech: {
          label: "Next.js",
          tooltip: "React framework with SSR & ISR used to build modern, high-performance interfaces."
        },
        date: "October 2021 – September 2023",
        impact:
          "Data interface to steer passenger flows, weekly releases, and real-time visibility into key service metrics.",
        bullets: [
          {
            content: (
              <>
                Designed data administration interfaces with{" "}
                <span className="text-cyan-300 font-semibold">React / Next.js</span> focusing on ergonomics and performance.
              </>
            )
          },
          {
            content: (
              <>
                Validated business rules directly in production with targeted{" "}
                <span className="text-amber-200 font-semibold">SQL</span> queries.
              </>
            )
          },
          {
            content: (
              <>
                Consumed secured APIs (<span className="text-pink-300 font-semibold">Spring Boot</span>) with authentication and robust
                error handling.
              </>
            )
          },
          {
            content: (
              <>
                Automated test environments using{" "}
                <span className="text-cyan-300 font-semibold">Docker Compose</span> for reproducible bug fixing.
              </>
            )
          },
          {
            content: (
              <>
                Drove{" "}
                <Tooltip text="Automated jobs, validation gates, and controlled deployments.">
                  <span className="text-cyan-100 font-semibold">CI/CD</span>
                </Tooltip>{" "}
                Jenkins pipelines and technical documentation.
              </>
            )
          }
        ]
      },
      {
        company: {
          label: "INFO 2R",
          tooltip: "Internal HR platform modernized to drive employee lifecycle processes."
        },
        team: {
          label: "DevOps Squad",
          tooltip: "Automated HR workflows, managed pipelines, and operational monitoring."
        },
        role: "Backend Java / Spring Boot Developer",
        tech: {
          label: "Spring Boot",
          tooltip: "Modern Java framework to build secure, modular REST APIs."
        },
        date: "March 2024 – September 2024",
        impact:
          "Modular HR platform: onboarding, leave management, and legal reporting with 30% faster processing.",
        bullets: [
          {
            content: (
              <>
                Crafted secure <span className="text-indigo-300 font-semibold">REST APIs</span> with{" "}
                <span className="text-indigo-300 font-semibold">Spring Boot</span> and JWT authentication.
              </>
            )
          },
          {
            content: (
              <>
                Rolled out <span className="text-pink-300 font-semibold">Kafka</span> for cross-department HR event synchronization.
              </>
            )
          },
          {
            content: (
              <>
                Built{" "}
                <span className="text-cyan-100 font-semibold">Jenkins CI/CD</span> pipelines covering builds, tests, and deployments.
              </>
            )
          },
          {
            content: (
              <>
                Led HR observability with <span className="text-green-200 font-semibold">Datadog</span>: metrics, alerting, documentation.
              </>
            )
          },
          {
            content: (
              <>
                <span className="text-cyan-300 font-semibold">Dockerized services</span> to guarantee reproducible environments.
              </>
            )
          }
        ]
      }
    ]
  }
};

const Experience: FC = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  const copy = EXPERIENCE_COPY[language];
  const isAurora = theme === "aurora";

  const sectionBg = isAurora
    ? "from-slate-50 via-white to-sky-100"
    : "from-slate-950 via-slate-900 to-black";

  const cardClasses = isAurora
    ? "border-sky-200/70 bg-white/90 text-slate-700 hover:border-sky-300/80 hover:bg-white focus-visible:ring-sky-400/50 focus-visible:ring-offset-white"
    : "border-cyan-500/25 bg-slate-950/75 text-gray-200 hover:border-cyan-400/60 hover:bg-slate-950/90 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-slate-950";

  return (
    <section
      id="experience"
      className={`experience-section relative overflow-hidden bg-gradient-to-br ${sectionBg} py-24 px-4 sm:px-8`}
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
        <div className="absolute -top-20 left-1/3 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-16 right-1/4 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12">
        <div className="text-center space-y-4">
          <h3
            className={`text-3xl font-bold sm:text-4xl ${
              isAurora
                ? "text-transparent bg-gradient-to-r from-slate-900 via-sky-700 to-purple-700 bg-clip-text"
                : "text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text"
            }`}
          >
            {copy.title}
          </h3>
          <p className={`mx-auto max-w-3xl text-sm sm:text-base ${isAurora ? "text-slate-600" : "text-gray-300"}`}>
            {copy.subtitle}
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-6 top-0 hidden h-full w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-500/60 via-cyan-500/10 to-transparent blur-sm sm:block" />
          <div className="space-y-10 sm:pl-4">
            {copy.experiences.map((experience, index) => (
              <article
                key={`${experience.company.label}-${experience.role}`}
                className={`relative rounded-3xl border px-6 py-7 backdrop-blur-xl transition-all duration-300 sm:pl-16 ${cardClasses}`}
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(120deg, rgba(56,189,248,0.18), rgba(32,211,238,0.08), rgba(129,140,248,0.15))"
                    }}
                  />
                </div>
                <div className="absolute -left-6 top-10 hidden h-3 w-20 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400/40 via-cyan-500/10 to-transparent blur-sm sm:block" />
                <div className="absolute left-0 top-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border border-cyan-400 bg-cyan-500/50 sm:block">
                  <span className="absolute inset-0 animate-ping rounded-full bg-cyan-400/40" />
                </div>
                <div className="relative z-10 flex flex-col gap-5">
                  <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-cyan-400">
                      <span className="inline-flex items-center gap-2">
                        <FaBuilding />
                        <Tooltip text={experience.company.tooltip}>
                          <span className="font-semibold">{experience.company.label}</span>
                        </Tooltip>
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <FaUsers />
                        <Tooltip text={experience.team.tooltip}>
                          <span>{experience.team.label}</span>
                        </Tooltip>
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <FaMicrochip />
                        <Tooltip text={experience.tech.tooltip}>
                          <span>{experience.tech.label}</span>
                        </Tooltip>
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
                      <FaCalendar />
                      {experience.date}
                    </span>
                  </header>

                  <div className="space-y-3">
                    <h4 className="text-xl font-semibold">{experience.role}</h4>
                    <p className="text-sm font-medium">{experience.impact}</p>
                  </div>

                  <ul className="space-y-3 text-sm leading-relaxed">
                    {experience.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start gap-3 text-slate-300">
                        <FaChevronRight className="mt-1 text-xs text-cyan-300" />
                        <span>{bullet.content}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {index < copy.experiences.length - 1 && (
                  <div className="absolute -bottom-5 left-0 hidden h-12 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-400/30 to-transparent blur-[1px] sm:block" />
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
