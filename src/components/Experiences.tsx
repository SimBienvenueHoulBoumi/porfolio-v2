import React from "react";
import { SiNextdotjs, SiSpringboot } from "react-icons/si";

export const Experiences: React.FC = () => {
  const experiences = [
    {
      title: "Alternance - Développeur Full-Stack",
      company: "SNCF VOYAGEURS - DSI",
      year: "2021 - 2023",
      description:
        "Contribué à la création et à la maintenance d'applications Next.js pour la gestion interne et suivi des infrastructures. Collaboration avec des équipes pluridisciplinaires dans un environnement agile.",
      technologies: ["Next.js", "Node.js", "Git"],
      icon: <SiNextdotjs />,
    },
    {
      title: "Stage - Développeur Backend",
      company: "INFO 2R",
      year: "2020",
      description:
        "Développement d'APIs backend avec Spring Boot et intégration de services cloud. Implémentation d'une architecture robuste et scalable.",
      technologies: ["Spring Boot", "PostgreSQL", "Docker"],
      icon: <SiSpringboot />,
    },
  ];

  return (
    <div className="container mx-auto py-24 lg:px-8 px-0 w-full md:w-3/4 lg:w-3/5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-start max-w-screen-xl w-full py-4 px-3">
        {experiences.map((experience, index) => (
          <div
            key={index}
            className="flex flex-col items-start bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Icône */}
            <div className="text-5xl mb-4 text-green-500 transition-transform duration-300 ease-in-out">
              {experience.icon}
            </div>

            {/* Titre */}
            <h3 className="text-sm font-semibold mb-2 text-gray-800">
              {experience.title}
            </h3>

            {/* Informations de l'entreprise */}
            <p className="text-xs font-medium text-gray-600 italic">
              {experience.company} • {experience.year}
            </p>

            {/* Description */}
            <p className="text-xs text-gray-600 mt-4">
              {experience.description}
            </p>

            {/* Technologies */}
            <div className="flex w-full flex-wrap gap-2 mt-4">
              {experience.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
