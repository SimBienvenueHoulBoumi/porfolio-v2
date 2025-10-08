"use client";
import { FC } from "react";
import { FaBuilding, FaUsers, FaCalendar, FaCode } from "react-icons/fa";

const Tooltip: FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => (
  <span className="relative group cursor-help">
    {children}
    <span
      className="
        absolute left-1/2 -translate-x-1/2 bottom-full mb-2
        opacity-0 group-hover:opacity-100
        pointer-events-none
        bg-gray-900 text-white text-xs px-3 py-1 rounded-lg shadow-lg
        whitespace-pre-line z-30
        transition-opacity duration-300
        w-max max-w-xs
        font-normal
        border border-cyan-500/30
      "
      style={{ minWidth: "140px" }}
    >
      {text}
    </span>
  </span>
);

const EXPERIENCES = [
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
            Conception d'une interface d'administration des données avec <span className="text-sky-400 font-semibold">React / Next.js</span>, centrée sur l'ergonomie et la performance.
          </>
        )
      },
      {
        content: (
          <>
            Vérification des règles métiers directement en base avec des requêtes <span className="text-yellow-200 font-semibold">SQL</span> ciblées, en environnement de production.
          </>
        )
      },
      {
        content: (
          <>
            Consommation d'API sécurisées (<span className="text-pink-300 font-semibold">NestJS</span>) avec authentification et gestion fine des erreurs, assurant une intégration fluide front/backend.
          </>
        )
      },
      {
        content: (
          <>
            Déploiement automatisé d'environnements de test avec <span className="text-cyan-300 font-semibold">Docker Compose</span>, facilitant la reproduction des bugs et les validations techniques.
          </>
        )
      },
      {
        content: (
          <>
            Participation à l'automatisation des tests et du déploiement continu <Tooltip text="Exécution automatique des jobs, validation, déploiement."><span className="text-gray-100 font-semibold cursor-help">CI/CD</span></Tooltip>, avec contribution aux scripts Jenkins et à la documentation technique.
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
    title: "Développeur BACKEND JAVA-SPRINGBOOT",
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
            Développement d'<span className="text-indigo-300 font-semibold">API REST</span> sécurisées avec <span className="text-indigo-300 font-semibold">Spring Boot</span> et authentification JWT, dans une architecture modulaire robuste.
          </>
        )
      },
      {
        content: (
          <>
            Intégration de <span className="text-pink-300 font-semibold">Kafka</span> pour la communication asynchrone entre microservices.
          </>
        )
      },
      {
        content: (
          <>
            Écriture de pipelines <span className="text-gray-100 font-semibold">Jenkins CI/CD</span> pour automatiser le build, les tests et les déploiements, avec notifications intégrées.
          </>
        )
      },
      {
        content: (
          <>
            Contribution à la supervision et à la fiabilisation des flux via <span className="text-green-200 font-semibold">Datadog</span>, gestion des erreurs, suivi des métriques critiques, documentation technique.
          </>
        )
      },
      {
        content: (
          <>
            <span className="text-cyan-300 font-semibold">Conteneurisation Docker</span> des services pour des environnements reproductibles en développement, test et production.
          </>
        )
      },
    ]
  }
];

const Experience: FC = () => (
  <section id="experience" className="py-20 px-4 bg-gradient-to-b from-gray-950 via-slate-900 to-gray-900 relative overflow-hidden">
    {/* Background effects */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />
    </div>

    <div className="max-w-5xl mx-auto relative z-10">
      {/* Title */}
      <div className="text-center mb-16">
        <h3 className="text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Expériences Professionnelles
        </h3>
        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 transform md:-translate-x-1/2"></div>

        <ul className="space-y-12">
          {EXPERIENCES.map((exp, idx) => (
            <li
              key={exp.company.label + idx}
              className={`relative ${idx % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:text-right'}`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 top-8 w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full transform md:-translate-x-1/2 border-4 border-gray-900 z-10 shadow-lg shadow-cyan-500/50"></div>

              {/* Content card */}
              <div className={`ml-8 md:ml-0 ${idx % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="relative z-10">
                    {/* Company badge */}
                    <div className={`flex ${idx % 2 === 0 ? 'justify-start' : 'md:justify-end justify-start'} mb-4`}>
                      <Tooltip text={exp.company.tooltip}>
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${exp.company.color} text-white font-bold shadow-lg border border-white/20 cursor-help hover:scale-105 transition-transform`}>
                          <FaBuilding className="text-sm" />
                          {exp.company.label}
                        </div>
                      </Tooltip>
                    </div>

                    {/* Title and meta */}
                    <div className={`flex flex-wrap items-center gap-3 mb-4 ${idx % 2 === 0 ? '' : 'md:flex-row-reverse md:justify-end'}`}>
                      <h4 className="text-xl font-bold text-white flex items-center gap-2">
                        <FaCode className="text-cyan-400" />
                        {exp.title}
                      </h4>
                      <Tooltip text={exp.tech.tooltip}>
                        <span className={`${exp.tech.color} font-semibold cursor-help px-3 py-1 bg-gray-900/50 rounded-full border border-cyan-500/30 text-sm hover:border-cyan-500/60 transition-colors`}>
                          {exp.tech.label}
                        </span>
                      </Tooltip>
                    </div>

                    {/* Team and date */}
                    <div className={`flex flex-wrap items-center gap-3 mb-4 ${idx % 2 === 0 ? '' : 'md:flex-row-reverse md:justify-end'}`}>
                      <Tooltip text={exp.team.tooltip}>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${exp.team.color} text-white text-xs font-medium cursor-help hover:scale-105 transition-transform`}>
                          <FaUsers className="text-xs" />
                          {exp.team.label}
                        </div>
                      </Tooltip>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <FaCalendar className="text-cyan-400" />
                        {exp.date}
                      </div>
                    </div>

                    {/* Bullets */}
                    <ul className="space-y-2 text-gray-200 text-sm sm:text-base text-left">
                      {exp.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-1 flex-shrink-0">▹</span>
                          <span>{b.content}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default Experience;
