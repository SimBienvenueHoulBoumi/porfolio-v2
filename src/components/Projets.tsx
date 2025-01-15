import React from "react";
import { FaExternalLinkAlt, FaJava } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiReact,
  SiJsonwebtokens,
  SiSpringboot,
} from "react-icons/si";

function Projets() {
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
      pointsFort: [
        "Effets dynamiques (neige animée)",
        "Interface conviviale et moderne",
      ],
    },
    {
      titre: "RemPro webapp front",
      description: "Une plateforme complète de gestion de projets, UI",
      technologies: [
        { name: "Node.js", icon: <SiReact className="text-blue-500" /> },
        {
          name: "React",
          icon: <SiReact className="text-blue-500" />,
        },
        {
          name: "TailwindCSS",
          icon: <SiTailwindcss className="text-teal-400" />,
        },
      ],
      url: "https://github.com/SimBienvenueHoulBoumi/rempro-webapp",
      pointsFort: [
        "Gestion complète des projets",
        "Interface utilisateur moderne et réactive",
        "Intégration transparente frontend - backend",
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
        {
          name: "jwt",
          icon: <SiJsonwebtokens className="text-teal-400" />,
        },
      ],
      url: "https://github.com/SimBienvenueHoulBoumi/rempro-api",
      pointsFort: [
        "Gestion des utilisateurs",
        "Mise en place de middleware",
        "Gestion des interactions entre les models",
      ],
    },
  ];

  return (
    <>
      <div className="grid px-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projets.map((projet, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6"
            style={{ animation: "swipeIn 0.5s ease-out" }}
          >
            <h3 className="text-xl uppercase font-semibold text-blue-500 mb-2">
              {projet.titre}
            </h3>
            <p className="italic text-gray-600 mb-3">{projet.description}</p>
            {projet.technologies && (
              <div className="mb-3">
                <strong className="block mb-1">Technologies :</strong>
                <div className="flex space-x-4">
                  {projet.technologies.map((tech, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      {tech.icon}
                      <span className="text-sm text-gray-800">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {projet.pointsFort && (
              <ul className="list-none space-y-2 mb-3">
                {projet.pointsFort.map((point, idx) => (
                  <li key={idx} className="flex items-center">
                    <FiCheckCircle className="text-green-500 mr-2" />
                    {point}
                  </li>
                ))}
              </ul>
            )}
            {projet.url && (
              <a
                href={projet.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 inline-flex items-center"
              >
                Voir le projet
                <FaExternalLinkAlt className="ml-2" />
              </a>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Projets;
