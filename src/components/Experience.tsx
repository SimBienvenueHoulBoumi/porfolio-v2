"use client";
import { FC } from "react";

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
      color: "bg-blue-900/70 text-blue-200",
      tooltip: "Groupe ferroviaire français, division transport de voyageurs.",
      border: "border-blue-500"
    },
    team: {
      label: "Équipe Agile",
      color: "bg-green-900/80 text-green-200",
      tooltip: "Travail en mode Agile, avec rituels Scrum hebdomadaires."
    },
    title: "Développeur Front ReactJS",
    tech: {
      label: "Next.js",
      color: "text-blue-400",
      tooltip: "Framework React avec SSR, utilisé pour des interfaces modernes et performantes."
    },
    contract: "(Alternance)",
    contractColor: "text-blue-300",
    date: "Octobre 2021 – Septembre 2023",
    bullets: [
      {
        content: (
          <>
            Conception d’une interface d'administration des données avec <span className="text-sky-400 font-semibold">React / Next.js</span>, centrée sur l’ergonomie et la performance.
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
            Consommation d’API sécurisées (<span className="text-pink-300 font-semibold">NestJS</span>) avec authentification et gestion fine des erreurs, assurant une intégration fluide front/backend.
          </>
        )
      },
      {
        content: (
          <>
            Déploiement automatisé d’environnements de test avec <span className="text-cyan-300 font-semibold">Docker Compose</span>, facilitant la reproduction des bugs et les validations techniques.
          </>
        )
      },
      {
        content: (
          <>
            Participation à l’automatisation des tests et du déploiement continu <Tooltip text="Exécution automatique des jobs, validation, déploiement."><span className="text-gray-100 font-semibold cursor-help">CI/CD</span></Tooltip>, avec contribution aux scripts Jenkins et à la documentation technique.
          </>
        )
      }
    ]
  },
  {
    company: {
      label: "INFO 2R",
      color: "bg-indigo-900/70 text-indigo-200",
      tooltip: "ESN spécialisée dans les services IT et le développement logiciel.",
      border: "border-indigo-500"
    },
    team: {
      label: "Équipe DevOps",
      color: "bg-orange-900/80 text-orange-200",
      tooltip: "Travail collaboratif sur les pipelines, les environnements et la supervision."
    },
    title: "Développeur BACKEND JAVA-SPRINGBOOT",
    tech: {
      label: "Spring Boot",
      color: "text-indigo-400",
      tooltip: "Framework Java moderne pour développer des API REST sécurisées et modulaires."
    },
    contract: "(Stage)",
    contractColor: "text-indigo-300",
    date: "Mars 2024 – Septembre 2024",
    bullets: [
      {
        content: (
          <>
            Développement d’<span className="text-indigo-300 font-semibold">API REST</span> sécurisées avec <span className="text-indigo-300 font-semibold">Spring Boot</span> et authentification JWT, dans une architecture modulaire robuste.
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
            <span className="text-cyan-300 font-semibold">Conteneurisation Docker</span> des services pour des environnements reproductibles en développement, test et production.
          </>
        )
      },
      {
        content: (
          <>
            Contribution à la supervision et à la fiabilisation des flux via <span className="text-green-200 font-semibold">Datadog</span> : gestion des erreurs, suivi des métriques critiques, documentation technique.
          </>
        )
      }
    ]
  }
];

const Experience: FC = () => (
  <section id="experience" className="py-16 px-4 bg-gray-950">
    <div className="max-w-5xl mx-auto fade-in">
      <h3 className="text-3xl font-bold mb-8 text-blue-400">Expériences Professionnelles</h3>
      <ul className="space-y-10">
        {EXPERIENCES.map((exp, idx) => (
          <li
            key={exp.company.label + idx}
            className={`border-l-4 pl-6 pb-2 ${exp.company.border}`}
          >
            <div className="flex justify-start mb-4">
              <Tooltip text={exp.company.tooltip}>
                <span className={`text-sm ${exp.company.color} px-6 py-1 rounded-md font-extrabold shadow cursor-help border-2 border-blue-600/40`}>
                  {exp.company.label}
                </span>
              </Tooltip>
            </div>
            <div className="flex flex-wrap items-center gap-4 mb-1">
              <h4 className="text-xl font-bold text-white">
                {exp.title}
                <Tooltip text={exp.tech.tooltip}>
                  <span className={`${exp.tech.color} font-semibold cursor-help ml-2`}>{exp.tech.label}</span>
                </Tooltip>
                <span className={`text-base font-normal ml-2 ${exp.contractColor}`}> {exp.contract}</span>
              </h4>
              <Tooltip text={exp.team.tooltip}>
                <span className={`text-xs ${exp.team.color} px-2 py-0.5 rounded-full font-medium cursor-help`}>
                  {exp.team.label}
                </span>
              </Tooltip>
              <span className="text-xs text-gray-400 ml-auto">{exp.date}</span>
            </div>
            <ul className="list-disc pl-6 text-gray-200 space-y-1 text-sm sm:text-base">
              {exp.bullets.map((b, i) => (
                <li key={i}>{b.content}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Experience;
