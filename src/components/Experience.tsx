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

// Tableau de données d'expérience
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
      tooltip: "Équipe Agile Scrum : sprints, daily meetings, planning poker."
    },
    title: "Développeur Front",
    tech: {
      label: "ReactJS",
      color: "text-blue-400",
      tooltip: "Stack JS moderne côté client et serveur."
    },
    contract: "(Alternance)",
    contractColor: "text-blue-300",
    date: "Octobre 2021 – Septembre 2023",
    bullets: [
      {
        content: (
          <>
            <Tooltip text="Interface Homme-Machine : application de gestion pour les métiers.">
              <span className="underline decoration-dotted underline-offset-2 cursor-help">IHM d’administration</span>
            </Tooltip> et paramétrage de données (<Tooltip text="Framework React avec SSR, UI dynamique, composants réutilisables."><span className="text-sky-400 font-semibold cursor-help">Next.js / React</span></Tooltip>).
          </>
        )
      },
      {
        content: (
          <>
            Vérification des règles métier par tests <Tooltip text="Requêtes SQL, validation des traitements côté base."><span className="text-yellow-200 font-semibold cursor-help">SQL</span></Tooltip>.
          </>
        )
      },
      {
        content: (
          <>
            Consommation d’API REST sécurisées (<Tooltip text="Framework backend Node.js TypeScript (REST, Auth, sécurité)."><span className="text-pink-300 font-semibold cursor-help">NestJS</span></Tooltip>), optimisation échanges de données.
          </>
        )
      },
      {
        content: (
          <>
            <Tooltip text="Docker facilite la conteneurisation : chaque app s’exécute dans son propre conteneur (build, déploiement, test, CI/CD).">
              <span className="text-cyan-300 font-semibold cursor-help">Conteneurisation</span>
            </Tooltip> des applications pour déploiement & scalabilité.
          </>
        )
      },
      {
        content: (
          <>
            <Tooltip text="Socle technique : Next.js, React, SQL, Docker, CI/CD, Auth, REST">
              <span className="bg-blue-700/20 text-blue-100 rounded px-2 ml-1 text-xs font-semibold cursor-help">Socle technique</span>
            </Tooltip>
          </>
        )
      }
    ]
  },
  {
    company: {
      label: "INFO 2R",
      color: "bg-indigo-900/70 text-indigo-200",
      tooltip: "ESN / société de services en informatique.",
      border: "border-indigo-500"
    },
    team: {
      label: "Équipe DevOps",
      color: "bg-orange-900/80 text-orange-200",
      tooltip: "Équipe DevOps, organisation collaborative, pair programming, standups."
    },
    title: "Développeur Backend",
    tech: {
      label: "Java-Spring Boot",
      color: "text-indigo-400",
      tooltip: "Stack backend Java 17+, Spring Boot : API REST, microservices, sécurité, tests."
    },
    contract: "(Stage)",
    contractColor: "text-indigo-300",
    date: "Mars 2024 – Septembre 2024",
    bullets: [
      {
        content: (
          <>
            API REST testées, sécurisées (<Tooltip text="Spring Security avec JWT, Auth, scopes, CORS."><span className="text-indigo-300 font-semibold cursor-help">JWT</span></Tooltip>), architecture modulaire maintenable.
          </>
        )
      },
      {
        content: (
          <>
            <Tooltip text="Microservices déployés dans des conteneurs pour l’isolation et la portabilité (Docker Compose, Dockerfile, images custom).">
              <span className="text-cyan-300 font-semibold cursor-help">Conteneurisation microservices Docker</span>
            </Tooltip>, déploiement simplifié.
          </>
        )
      },
      {
        content: (
          <>
            Intégration de <Tooltip text="Kafka : message broker asynchrone pour microservices, scalable, performant."><span className="text-pink-300 font-semibold cursor-help">Kafka</span></Tooltip> pour communication entre services.
          </>
        )
      },
      {
        content: (
          <>
            <Tooltip text="Automatisation de l’intégration continue et du déploiement continu. Jenkins pipeline YAML, jobs Docker, notifications.">
              <span className="text-gray-100 font-semibold cursor-help">Jobs Jenkins CI/CD</span>
            </Tooltip>.
          </>
        )
      },
      {
        content: (
          <>
            <Tooltip text="Stack front AngularJS, consommation d’API REST, modals, data-table, sécurité.">
              <span className="text-orange-200 font-semibold cursor-help">IHM AngularJS</span>
            </Tooltip>.
          </>
        )
      },
      {
        content: (
          <>
            <Tooltip text="Socle technique : Java, Spring Boot, Docker, Kafka, Jenkins, AngularJS, REST">
              <span className="bg-indigo-700/20 text-indigo-100 rounded px-2 ml-1 text-xs font-semibold cursor-help">Socle technique</span>
            </Tooltip>
          </>
        )
      }
    ]
  }
];

// Affichage des expériences
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
            {/* Nom de l'entreprise sur une ligne, centré et mis en évidence */}
            <div className="flex justify-start mb-4">
              <Tooltip text={exp.company.tooltip}>
                <span className={`text-sm ${exp.company.color} px-6 py-1 rounded-md font-extrabold shadow cursor-help border-2 border-blue-600/40`}>
                  {exp.company.label}
                </span>
              </Tooltip>
            </div>
            {/* Reste des informations */}
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
