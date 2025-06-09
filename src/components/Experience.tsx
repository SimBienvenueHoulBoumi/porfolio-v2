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

const Experience: FC = () => (
  <section id="experience" className="py-16 px-4 bg-gray-950">
    <div className="max-w-5xl mx-auto fade-in">
      <h3 className="text-3xl font-bold mb-8 text-blue-400">Expériences Professionnelles</h3>
      <div className="space-y-10">

        {/* SNCF */}
        <div className="border-l-4 border-blue-500 pl-6 pb-2">
          <div className="flex flex-wrap items-center gap-4 mb-1">
            <h4 className="text-xl font-bold text-white">
              Développeur Front 
              <Tooltip text="Stack JS moderne côté client et serveur.">
                <span className="text-blue-400 font-semibold cursor-help ml-2">ReactJS</span>
              </Tooltip>
              <span className="text-base text-blue-300 font-normal"> (Alternance)</span>
            </h4>
            <Tooltip text="Groupe ferroviaire français, division transport de voyageurs.">
              <span className="text-xs bg-blue-900/70 text-blue-300 px-3 py-0.5 rounded-full font-medium cursor-help">
                SNCF Voyageurs
              </span>
            </Tooltip>
            <Tooltip text="Équipe Agile Scrum : sprints, daily meetings, planning poker.">
              <span className="text-xs bg-green-900/80 text-green-200 px-2 py-0.5 rounded-full font-medium cursor-help">
                Équipe Agile
              </span>
            </Tooltip>
            <span className="text-xs text-gray-400 ml-auto">Octobre 2021 – Septembre 2023</span>
          </div>
          <ul className="list-disc pl-6 text-gray-200 space-y-1 text-sm sm:text-base">
            <li>
              <Tooltip text="Interface Homme-Machine : application de gestion pour les métiers.">
                <span className="underline decoration-dotted underline-offset-2 cursor-help">IHM d’administration</span>
              </Tooltip> et paramétrage de données (<Tooltip text="Framework React avec SSR, UI dynamique, composants réutilisables."><span className="text-sky-400 font-semibold cursor-help">Next.js / React</span></Tooltip>).
            </li>
            <li>
              Vérification des règles métier par tests <Tooltip text="Requêtes SQL, validation des traitements côté base."><span className="text-yellow-200 font-semibold cursor-help">SQL</span></Tooltip>.
            </li>
            <li>
              Consommation d’API REST sécurisées (<Tooltip text="Framework backend Node.js TypeScript (REST, Auth, sécurité)."><span className="text-pink-300 font-semibold cursor-help">NestJS</span></Tooltip>), optimisation échanges de données.
            </li>
            <li>
              <Tooltip text="Docker facilite la conteneurisation : chaque app s’exécute dans son propre conteneur (build, déploiement, test, CI/CD).">
                <span className="text-cyan-300 font-semibold cursor-help">Conteneurisation</span>
              </Tooltip> des applications pour déploiement & scalabilité.
            </li>
            <li>
              <Tooltip text="Socle technique : Next.js, React, SQL, Docker, CI/CD, Auth, REST">
                <span className="bg-blue-700/20 text-blue-100 rounded px-2 ml-1 text-xs font-semibold cursor-help">Socle technique</span>
              </Tooltip>
            </li>
          </ul>
        </div>

        {/* INFO 2R */}
        <div className="border-l-4 border-indigo-500 pl-6 pb-2">
          <div className="flex flex-wrap items-center gap-4 mb-1">
            <h4 className="text-xl font-bold text-white">
              Développeur Backend 
              <Tooltip text="Stack backend Java 17+, Spring Boot : API REST, microservices, sécurité, tests.">
                <span className="text-indigo-400 font-semibold cursor-help ml-2">Java-Spring Boot</span>
              </Tooltip>
              <span className="text-base text-indigo-300 font-normal"> (Stage)</span>
            </h4>
            <Tooltip text="ESN / société de services en informatique.">
              <span className="text-xs bg-indigo-900/70 text-indigo-200 px-3 py-0.5 rounded-full font-medium cursor-help">
                INFO 2R
              </span>
            </Tooltip>
            <Tooltip text="Équipe DevOps, organisation collaborative, pair programming, standups.">
              <span className="text-xs bg-orange-900/80 text-orange-200 px-2 py-0.5 rounded-full font-medium cursor-help">
                Équipe DevOps
              </span>
            </Tooltip>
            <span className="text-xs text-gray-400 ml-auto">Mars 2024 – Septembre 2024</span>
          </div>
          <ul className="list-disc pl-6 text-gray-200 space-y-1 text-sm sm:text-base">
            <li>
              API REST testées, sécurisées (<Tooltip text="Spring Security avec JWT, Auth, scopes, CORS."><span className="text-indigo-300 font-semibold cursor-help">JWT</span></Tooltip>), architecture modulaire maintenable.
            </li>
            <li>
              <Tooltip text="Microservices déployés dans des conteneurs pour l’isolation et la portabilité (Docker Compose, Dockerfile, images custom).">
                <span className="text-cyan-300 font-semibold cursor-help">Conteneurisation microservices Docker</span>
              </Tooltip>, déploiement simplifié.
            </li>
            <li>
              Intégration de <Tooltip text="Kafka : message broker asynchrone pour microservices, scalable, performant."><span className="text-pink-300 font-semibold cursor-help">Kafka</span></Tooltip> pour communication entre services.
            </li>
            <li>
              <Tooltip text="Automatisation de l’intégration continue et du déploiement continu. Jenkins pipeline YAML, jobs Docker, notifications.">
                <span className="text-gray-100 font-semibold cursor-help">Jobs Jenkins CI/CD</span>
              </Tooltip>.
            </li>
            <li>
              <Tooltip text="Stack front AngularJS, consommation d’API REST, modals, data-table, sécurité.">
                <span className="text-orange-200 font-semibold cursor-help">API via AngularJS</span>
              </Tooltip>.
            </li>
            <li>
              <Tooltip text="Socle technique : Java, Spring Boot, Docker, Kafka, Jenkins, AngularJS, REST">
                <span className="bg-indigo-700/20 text-indigo-100 rounded px-2 ml-1 text-xs font-semibold cursor-help">Socle technique</span>
              </Tooltip>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
