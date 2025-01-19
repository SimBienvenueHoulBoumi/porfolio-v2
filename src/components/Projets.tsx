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
    <div className="flex min-h-screen flex-col space-y-2">
      {/* Barre de filtres avec boutons radio stylisés */}
      <div className="flex justify-start items-center space-x-8 pt-4">
        <div className="flex items-center space-x-4">
          <label
            className={`cursor-pointer transition duration-200 ease-in-out ${
              filter === "all" ? "text-teal-400" : "text-gray-500"
            }`}
          >
            <input
              type="radio"
              name="filter"
              value="all"
              checked={filter === "all"}
              onChange={() => setFilter("all")}
              className="hidden"
            />
            <span className="relative inline-block pl-8">
              <span className="absolute left-0 top-0 transform scale-0 transition-all duration-300 ease-in-out group-hover:scale-100">
                <span className="w-3 h-3 bg-teal-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
              </span>
              Tous les projets
            </span>
          </label>

          <label
            className={`cursor-pointer transition duration-200 ease-in-out ${
              filter === "frontend" ? "text-teal-400" : "text-gray-500"
            }`}
          >
            <input
              type="radio"
              name="filter"
              value="frontend"
              checked={filter === "frontend"}
              onChange={() => setFilter("frontend")}
              className="hidden"
            />
            <span className="relative inline-block pl-8">
              <span className="absolute left-0 top-0 transform scale-0 transition-all duration-300 ease-in-out group-hover:scale-100">
                <span className="w-3 h-3 bg-teal-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
              </span>
              Frontend
            </span>
          </label>

          <label
            className={`cursor-pointer transition duration-200 ease-in-out ${
              filter === "backend" ? "text-teal-400" : "text-gray-500"
            }`}
          >
            <input
              type="radio"
              name="filter"
              value="backend"
              checked={filter === "backend"}
              onChange={() => setFilter("backend")}
              className="hidden"
            />
            <span className="relative inline-block pl-8">
              <span className="absolute left-0 top-0 transform scale-0 transition-all duration-300 ease-in-out group-hover:scale-100">
                <span className="w-3 h-3 bg-teal-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
              </span>
              Backend
            </span>
          </label>
        </div>
      </div>

      {/* Liste des projets filtrée */}
      <div className="flex-1 px-8 bg-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filteredProjets.map((projet, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-200 to-blue-100 opacity-30 z-0 transition-all group-hover:opacity-50"></div>

              <div className="p-6 relative z-10">
                <h3 className="text-xl sm:text-lg font-bold text-gray-800 mb-4 hover:text-teal-500 transition duration-200 ease-in-out">
                  {projet.titre}
                </h3>
                <p className="text-gray-700 text-xs mb-6">
                  {projet.description}
                </p>

                <div className="flex flex-wrap gap-4 mb-6 text-sm sm:text-xs">
                  {projet.technologies.map((tech, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 font-medium text-gray-700"
                    >
                      {tech.icon}
                      <span>{tech.name}</span>
                    </div>
                  ))}
                </div>

                {projet.pointsFort && (
                  <ul className="list-none space-y-2 mb-6 text-sm sm:text-xs">
                    {projet.pointsFort.map((point, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <FiCheckCircle className="text-teal-500 mr-2" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}

                {projet.url && (
                  <Link
                    href={projet.url}
                    className="inline-flex items-center text-teal-600 font-semibold group-hover:text-teal-800 transition-colors duration-300 ease-in-out"
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
    </div>
  );
}

export default Projets;
