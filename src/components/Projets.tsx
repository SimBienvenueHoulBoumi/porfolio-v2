import Link from "next/link";
import React, { useState } from "react";
import { FaExternalLinkAlt, FaJava } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiReact,
  SiJsonwebtokens,
  SiSpringboot,
  SiChartdotjs,
} from "react-icons/si";

function Projets() {
  const [filter, setFilter] = useState("all");

  const projets = [
    {
      titre: "Wish Maker",
      description:
        "Un projet interactif permettant de créer et partager des vœux avec un design innovant et une expérience utilisateur intuitive.",
      technologies: [
        { name: "Next.js", icon: <SiNextdotjs className="text-gray-800" /> },
        {
          name: "TailwindCSS",
          icon: <SiTailwindcss className="text-teal-400" />,
        },
      ],
      url: "https://wish-maker.vercel.app/",
      type: "frontend",
      pointsFort: [
        "Effets dynamiques (neige animée)",
        "Interface conviviale et moderne",
      ],
    },
    {
      titre: "RemPro webapp front",
      description: "Une plateforme complète de gestion de projets, UI",
      technologies: [
        { name: "React", icon: <SiReact className="text-blue-500" /> },
        {
          name: "TailwindCSS",
          icon: <SiTailwindcss className="text-teal-400" />,
        },
      ],
      url: "https://github.com/SimBienvenueHoulBoumi/rempro-webapp",
      type: "frontend",
      pointsFort: [
        "Gestion complète des projets",
        "Interface utilisateur moderne et réactive",
        "Intégration frontend - backend",
      ],
    },
    {
      titre: "RemPro webapp backend",
      description: "Une plateforme complète de gestion de projets, Backend.",
      technologies: [
        { name: "Java", icon: <FaJava className="text-blue-500" /> },
        {
          name: "Springboot",
          icon: <SiSpringboot className="text-blue-500" />,
        },
        { name: "JWT", icon: <SiJsonwebtokens className="text-teal-400" /> },
      ],
      url: "https://github.com/SimBienvenueHoulBoumi/rempro-api",
      type: "backend",
      pointsFort: [
        "Gestion des utilisateurs",
        "Mise en place de middleware",
        "Gestion des interactions entre les models",
      ],
    },
    {
      titre: "ChartJS User Stats",
      description:
        "Un tableau de bord interactif avec des graphiques dynamiques et des données personnalisées, basé sur Chart.js.",
      technologies: [
        { name: "Next.js", icon: <SiNextdotjs className="text-gray-800" /> },
        {
          name: "TailwindCSS",
          icon: <SiTailwindcss className="text-teal-400" />,
        },
        {
          name: "Chart.js",
          icon: <SiChartdotjs className="text-orange-400" />,
        },
      ],
      url: "https://chartjs-use.vercel.app/",
      type: "frontend",
      pointsFort: [
        "Graphiques dynamiques interactifs",
        "Flexibilité dans la visualisation des données",
        "Interface moderne et épurée",
      ],
    },
  ];

  const filteredProjets =
    filter === "all"
      ? projets
      : projets.filter((projet) => projet.type === filter);

  return (
    <div className="flex flex-col items-center space-y-2 p-6">
      {/* Barre de filtres */}
      <div className="flex justify-start items-center max-w-screen-xl w-full space-x-4 mb-6 px-3">
        <label
          className={`cursor-pointer ${
            filter === "all" ? "text-teal-500" : "text-gray-600"
          }`}
        >
          <input
            type="radio"
            value="all"
            checked={filter === "all"}
            onChange={() => setFilter("all")}
            className="hidden"
          />
          Tous les projets
        </label>
        <label
          className={`cursor-pointer ${
            filter === "frontend" ? "text-teal-500" : "text-gray-600"
          }`}
        >
          <input
            type="radio"
            value="frontend"
            checked={filter === "frontend"}
            onChange={() => setFilter("frontend")}
            className="hidden"
          />
          Frontend
        </label>
        <label
          className={`cursor-pointer ${
            filter === "backend" ? "text-teal-500" : "text-gray-600"
          }`}
        >
          <input
            type="radio"
            value="backend"
            checked={filter === "backend"}
            onChange={() => setFilter("backend")}
            className="hidden"
          />
          Backend
        </label>
      </div>

      {/* Liste des projets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-start max-w-screen-xl w-full px-0">
        {filteredProjets.map((projet, index) => (
          <div
            key={index}
            className="group bg-white rounded-lg shadow-md max-w-sm mx-auto w-full hover:shadow-lg transition-transform transform hover:scale-105"
          >
            {/* Carte projet */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">
                {projet.titre}
              </h3>
              <p className="text-sm text-gray-600 my-2">{projet.description}</p>
              <div className="flex flex-wrap gap-2">
                {projet.technologies.map((tech, idx) => (
                  <div
                    key={idx}
                    className="flex items-center text-sm space-x-2"
                  >
                    {tech.icon}
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
              <ul className="list-disc list-inside mt-4 text-gray-600 space-y-1">
                {projet.pointsFort.map((point, idx) => (
                  <li key={idx} className="text-xs flex items-center space-x-2">
                    <FiCheckCircle className="text-teal-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              {projet.url && (
                <Link
                  href={projet.url}
                  className="mt-4 inline-flex items-center text-teal-600 text-sm hover:underline"
                >
                  Voir le projet
                  <FaExternalLinkAlt className="ml-2" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projets;
