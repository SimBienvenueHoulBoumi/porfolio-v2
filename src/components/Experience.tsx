"use client";

import { FC, ReactNode } from "react";
import { FaBuilding, FaUsers, FaCalendar, FaCode } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const Tooltip: FC<{ text: string; children: ReactNode }> = ({ text, children }) => {
  const { theme } = useTheme();
  const isAurora = theme === "aurora";

  const bubbleClasses = isAurora
    ? "bg-white text-slate-700 border border-sky-200 shadow-lg shadow-sky-200/40"
    : "bg-gray-900 text-white border border-cyan-500/30 shadow-lg";

  return (
    <span className="relative group cursor-help">
      {children}
      <span
        className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 pointer-events-none text-xs px-3 py-1 rounded-lg whitespace-pre-line z-30 transition-opacity duration-300 w-max max-w-xs font-normal ${bubbleClasses}`}
        style={{ minWidth: "140px" }}
      >
        {text}
      </span>
    </span>
  );
};

const EXPERIENCE_COPY = {
  fr: {
    title: "Expériences Professionnelles",
    experiences: [
      {
        company: {
          label: "SNCF Voyageurs",
          color: "from-blue-600 to-blue-800",
          tooltip: "Groupe ferroviaire français, division transport de voyageurs.",
          border: "border-blue-500"
        },
        team: {
          label: "Équipe Agile",
          color: "from-green-600 to-green-800",
          tooltip: "Travail en mode Agile, avec rituels Scrum hebdomadaires."
        },
        title: "Développeur Front ReactJS",
        tech: {
          label: "Next.js",
          color: "text-blue-400",
          tooltip: "Framework React avec SSR, utilisé pour des interfaces modernes et performantes."
        },
        date: "Octobre 2021 – Septembre 2023",
        bullets: [
          {
            content: (
              <>
                Conception d&apos;une interface data en <span className="text-sky-400 font-semibold">React / Next.js</span> orientée UX et performance.
              </>
            )
          },
          {
            content: (
              <>
                Contrôle des règles métiers via requêtes <span className="text-yellow-200 font-semibold">SQL</span> ciblées en production.
              </>
            )
          },
          {
            content: (
              <>
                Intégration d&apos;API <span className="text-pink-300 font-semibold">Spring Boot</span> sécurisées avec authentification et gestion d&apos;erreurs.
              </>
            )
          },
          {
            content: (
              <>
                Automatisation des environnements de test avec <span className="text-cyan-300 font-semibold">Docker Compose</span> pour reproduire les bugs.
              </>
            )
          },
          {
            content: (
              <>
                Participation aux pipelines{" "}
                <Tooltip text="Exécution automatique des jobs, validation, déploiement.">
                  <span className="text-gray-100 font-semibold cursor-help">CI/CD</span>
                </Tooltip>
                Jenkins et à la documentation technique.
              </>
            )
          }
        ]
      },
      {
        company: {
          label: "INFO 2R",
          color: "from-indigo-600 to-indigo-800",
          tooltip: "ESN spécialisée dans les services IT et le développement logiciel.",
          border: "border-indigo-500"
        },
        team: {
          label: "Équipe DevOps",
          color: "from-orange-600 to-orange-800",
          tooltip: "Travail collaboratif sur les pipelines, les environnements et la supervision."
        },
        title: "Développeur Backend Java / Spring Boot",
        tech: {
          label: "Spring Boot",
          color: "text-indigo-400",
          tooltip: "Framework Java moderne pour développer des API REST sécurisées et modulaires."
        },
        date: "Mars 2024 – Septembre 2024",
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
                Mise en place de <span className="text-pink-300 font-semibold">Kafka</span> pour les échanges asynchrones.
              </>
            )
          },
          {
            content: (
              <>
                Création de pipelines <span className="text-gray-100 font-semibold">Jenkins CI/CD</span> pour build, tests et déploiements automatisés.
              </>
            )
          },
          {
            content: (
              <>
                Pilotage de l&apos;observabilité avec <span className="text-green-200 font-semibold">Datadog</span> : métriques, alerting et documentation.
              </>
            )
          },
          {
            content: (
              <>
                <span className="text-cyan-300 font-semibold">Conteneurisation Docker</span> des services pour des environnements reproductibles.
              </>
            )
          }
        ]
      }
    ]
  },
  en: {
    title: "Professional Experience",
    experiences: [
      {
        company: {
          label: "SNCF Voyageurs",
          color: "from-blue-600 to-blue-800",
          tooltip: "French railway group, passenger transport division.",
          border: "border-blue-500"
        },
        team: {
          label: "Agile Team",
          color: "from-green-600 to-green-800",
          tooltip: "Worked in Agile mode with weekly Scrum ceremonies."
        },
        title: "Front-end ReactJS Developer",
        tech: {
          label: "Next.js",
          color: "text-blue-400",
          tooltip: "React framework with SSR used to build modern, high-performance interfaces."
        },
        date: "October 2021 – September 2023",
        bullets: [
          {
            content: (
              <>
                Designed a data administration interface with <span className="text-sky-400 font-semibold">React / Next.js</span>, focusing on ergonomics and performance.
              </>
            )
          },
          {
            content: (
              <>
                Verified business rules directly in the database with targeted <span className="text-yellow-200 font-semibold">SQL</span> queries in production environments.
              </>
            )
          },
          {
            content: (
              <>
                Consumed secured APIs (<span className="text-pink-300 font-semibold">Springboot</span>) with authentication and robust error handling for seamless front/back integration.
              </>
            )
          },
          {
            content: (
              <>
                Automated test environments with <span className="text-cyan-300 font-semibold">Docker Compose</span>, simplifying bug reproduction and technical validation.
              </>
            )
          },
          {
            content: (
              <>
                Supported continuous testing and deployment{" "}
                <Tooltip text="Automatic job execution, validation, and deployment.">
                  <span className="text-gray-100 font-semibold cursor-help">CI/CD</span>
                </Tooltip>
                , contributing Jenkins scripts and technical documentation.
              </>
            )
          }
        ]
      },
      {
        company: {
          label: "INFO 2R",
          color: "from-indigo-600 to-indigo-800",
          tooltip: "IT services company specializing in software development.",
          border: "border-indigo-500"
        },
        team: {
          label: "DevOps Team",
          color: "from-orange-600 to-orange-800",
          tooltip: "Collaborative work on pipelines, environments, and monitoring."
        },
        title: "Backend Developer (Java/Spring Boot)",
        tech: {
          label: "Spring Boot",
          color: "text-indigo-400",
          tooltip: "Modern Java framework used to build secure and modular REST APIs."
        },
        date: "March 2024 – September 2024",
        bullets: [
          {
            content: (
              <>
                Built secure <span className="text-indigo-300 font-semibold">REST APIs</span> with{" "}
                <span className="text-indigo-300 font-semibold">Spring Boot</span> and JWT authentication in a robust modular architecture.
              </>
            )
          },
          {
            content: (
              <>
                Integrated <span className="text-pink-300 font-semibold">Kafka</span> to enable asynchronous communication between microservices.
              </>
            )
          },
          {
            content: (
              <>
                Wrote <span className="text-gray-100 font-semibold">Jenkins CI/CD</span> pipelines to automate builds, tests, and deployments with integrated notifications.
              </>
            )
          },
          {
            content: (
              <>
                Improved observability and reliability with <span className="text-green-200 font-semibold">Datadog</span>: error management, critical metrics tracking, and detailed documentation.
              </>
            )
          },
          {
            content: (
              <>
                <span className="text-cyan-300 font-semibold">Dockerized services</span> to keep development, testing, and production environments reproducible.
              </>
            )
          }
        ]
      }
    ]
  }
} as const;

const Experience: FC = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isAurora = theme === "aurora";
  const copy = EXPERIENCE_COPY[language];

  const sectionClasses = isAurora
    ? "experience-section py-10 px-4 bg-gradient-to-b from-white via-slate-100 to-sky-50 relative overflow-hidden"
    : "experience-section py-10 px-4 bg-gradient-to-b from-gray-950 via-slate-900 to-gray-900 relative overflow-hidden";

  const gridColor = isAurora ? "rgba(37, 99, 235, 0.06)" : "rgba(34, 211, 238, 0.1)";

  const timelineLineClasses = isAurora
    ? "absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-400 via-blue-400 to-purple-400 transform md:-translate-x-1/2"
    : "absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 transform md:-translate-x-1/2";

  const cardBaseClasses = isAurora
    ? "group/experience relative w-full max-w-2xl bg-white/90 backdrop-blur-md border border-sky-200 rounded-2xl p-6 transition-all duration-300 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-200/70"
    : "group/experience relative w-full max-w-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10";

  const glowClasses = isAurora
    ? "absolute inset-0 bg-gradient-to-br from-sky-200/40 to-transparent rounded-2xl opacity-0 group-hover/experience:opacity-100 transition-opacity"
    : "absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl opacity-0 group-hover/experience:opacity-100 transition-opacity";

  const metaTextClass = isAurora ? "text-slate-500" : "text-gray-400";
  const iconAccentClass = isAurora ? "text-sky-500" : "text-cyan-400";
  const headingTextClass = isAurora ? "text-slate-900" : "text-white";
  const bulletTextClass = isAurora ? "text-slate-700" : "text-gray-300";
  const bulletDotClass = isAurora ? "bg-sky-400/70" : "bg-cyan-400/70";
  const sectionTitleClass = isAurora
    ? "text-4xl font-bold mb-3 text-gray-700"
    : "text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent";

  return (
    <section id="experience" className={sectionClasses}>
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

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h3 className={sectionTitleClass}>
            {copy.title}
          </h3>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
        </div>

        <div className="relative">
          <div className={timelineLineClasses} />

          <ul className="space-y-12">
            {copy.experiences.map((exp, idx) => {
              const isLeftAligned = idx % 2 === 0;

              const timelineDotClasses = isAurora
                ? "absolute left-0 md:left-1/2 top-8 w-4 h-4 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full transform md:-translate-x-1/2 border-4 border-white z-10 shadow-lg shadow-sky-300/60"
                : "absolute left-0 md:left-1/2 top-8 w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full transform md:-translate-x-1/2 border-4 border-gray-900 z-10 shadow-lg shadow-cyan-500/50";

              const teamBadgeClasses = isAurora
                ? "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs sm:text-sm text-sky-700 font-medium cursor-help"
                : "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-cyan-500/30 text-xs sm:text-sm text-cyan-100 font-medium cursor-help";

              const techBadgeClasses = isAurora
                ? "inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-200 text-xs sm:text-sm text-sky-700 font-medium"
                : "inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-lg bg-gray-800/60 border border-cyan-500/20 text-xs sm:text-sm text-cyan-100 font-medium";

              const companyBadgeClasses = isAurora
                ? "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-50 text-sky-700 text-sm sm:text-base font-semibold shadow-md border border-sky-200 cursor-help hover:-translate-y-0.5 transition-transform"
                : `inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${exp.company.color} text-white text-sm sm:text-base font-bold shadow-lg border border-white/20 cursor-help hover:scale-105 transition-transform`;

              return (
                <li
                  key={exp.company.label + idx}
                  className={`relative ${isLeftAligned ? "md:pr-1/2" : "md:pl-1/2 md:text-right"}`}
                >
                  <div className={timelineDotClasses} />

                  <div className={`ml-8 md:ml-0 w-full ${isLeftAligned ? "md:mr-8" : "md:ml-8"} flex justify-start md:justify-center`}>
                    <div className={cardBaseClasses}>
                      <div className={`${glowClasses} pointer-events-none`} />

                      <div
                        className={`relative z-10 md:flex md:flex-col ${
                          isLeftAligned ? "md:items-start md:text-left" : "md:items-end md:text-right"
                        }`}
                      >
                        <div className={`flex ${isLeftAligned ? "justify-start" : "md:justify-end justify-start"} mb-4`}>
                          <Tooltip text={exp.company.tooltip}>
                            <div className={companyBadgeClasses}>
                              <FaBuilding className={`text-sm ${isAurora ? "text-sky-600" : "text-white"}`} />
                              {exp.company.label}
                            </div>
                          </Tooltip>
                        </div>

                        <div className={`flex flex-wrap items-center gap-3 mb-4 ${isLeftAligned ? "" : "md:flex-row-reverse md:justify-end"}`}>
                          <h4 className={`text-lg sm:text-xl font-semibold sm:font-bold flex items-center gap-2 text-balance ${headingTextClass}`}>
                            <FaCode className={iconAccentClass} />
                            {exp.title}
                          </h4>

                          <div className={`flex items-center gap-2 text-xs ${metaTextClass} ${isLeftAligned ? "" : "md:ml-auto md:justify-end"}`}>
                            <FaUsers className={iconAccentClass} />
                            <Tooltip text={exp.team.tooltip}>
                              <span className={teamBadgeClasses}>{exp.team.label}</span>
                            </Tooltip>
                          </div>

                          <div className={`flex items-center gap-2 text-xs ${metaTextClass} ${isLeftAligned ? "" : "md:ml-auto md:justify-end"}`}>
                            <FaCalendar className={iconAccentClass} />
                            <span>{exp.date}</span>
                          </div>
                        </div>

                        <div
                          className={`${techBadgeClasses} ${
                            isLeftAligned ? "" : "md:self-end md:justify-end md:text-right"
                          }`}
                        >
                          <span className={`font-semibold ${headingTextClass}`}>{exp.tech.label}</span>
                          <Tooltip text={exp.tech.tooltip}>
                            <span className={`${exp.tech.color} cursor-help`}>•</span>
                          </Tooltip>
                        </div>

                        <ul
                          className={`space-y-3 text-sm leading-snug sm:leading-relaxed text-pretty ${bulletTextClass} ${
                            isLeftAligned ? "" : "md:text-right"
                          }`}
                        >
                          {exp.bullets.map((bullet, bulletIdx) => (
                            <li
                              key={bulletIdx}
                              className={`relative pl-5 ${
                                isLeftAligned ? "md:pl-5 md:text-left" : "md:pl-0 md:pr-5 md:text-right"
                              }`}
                            >
                              <span
                                className={`absolute top-2 w-2 h-2 rounded-full ${bulletDotClass} ${
                                  isLeftAligned ? "left-0" : "left-0 md:left-auto md:right-0"
                                }`}
                              />
                              {bullet.content}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;
