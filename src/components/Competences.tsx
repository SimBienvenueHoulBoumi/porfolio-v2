import React from "react";
import { FaReact, FaAngular, FaDocker, FaGit, FaGithub } from "react-icons/fa";
import { SiNextdotjs, SiNestjs, SiSpringboot } from "react-icons/si";
import { DiNodejs } from "react-icons/di";

export const Competences: React.FC = () => {
  const skills = [
    {
      name: "ReactJS",
      icon: <FaReact />,
      description: "Création d'interfaces dynamiques et interactives.",
      type: "Frontend",
      color: "text-blue-500",
    },
    {
      name: "NextJS",
      icon: <SiNextdotjs />,
      description: "Développement d'applications performantes et SEO-friendly.",
      type: "Frontend",
      color: "text-blue-500",
    },
    {
      name: "Angular",
      icon: <FaAngular />,
      description: "Construction d'applications modulaires et robustes.",
      type: "Frontend",
      color: "text-blue-500",
    },
    {
      name: "NodeJS",
      icon: <DiNodejs />,
      description: "Développement d'APIs rapides et scalables.",
      type: "Backend",
      color: "text-green-500",
    },
    {
      name: "NestJS",
      icon: <SiNestjs />,
      description: "Framework structuré pour des projets complexes.",
      type: "Backend",
      color: "text-green-500",
    },
    {
      name: "Spring Boot",
      icon: <SiSpringboot />,
      description: "Conception d'applications backend robustes.",
      type: "Backend",
      color: "text-green-500",
    },
    {
      name: "Docker",
      icon: <FaDocker />,
      description: "Conteneurisation et livraison rapide des applications.",
      type: "Outils",
      color: "text-purple-500",
    },
    {
      name: "Git",
      icon: <FaGit />,
      description: "Suivi et gestion de l'évolution des projets.",
      type: "Outils",
      color: "text-purple-500",
    },
    {
      name: "GitHub CI",
      icon: <FaGithub />,
      description: "Automatisation des pipelines CI/CD.",
      type: "Outils",
      color: "text-purple-500",
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-left text-gray-800 mb-6">
        Mon Arsenal de Compétences
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex flex-col items-center bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div
              className={`text-5xl mb-4 ${skill.color} transition-transform transform hover:scale-110`}
            >
              {skill.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {skill.name}
            </h3>
            <p className="text-sm text-gray-600 text-center">
              {skill.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
