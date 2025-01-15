import React from "react";
import { SiNextdotjs, SiSpringboot } from "react-icons/si";

export const Experiences: React.FC = () => {
  const experiences = [
    {
      title: "Alternance - Développeur Full-Stack",
      company: "SNCF VOYAGEURS - DSI",
      year: "2021 - 2023",
      description:
        "Contribué à la création et à la maintenance d'applications Nextjs pour la gestion interne et suivi des infrastructures. Collaboration avec des équipes pluridisciplinaires dans un environnement agile.",
      technologies: ["Nextjs", "Node.js", "Git"],
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
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {experiences.map((experience, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg shadow-md"
          >
            <div
              className={`text-5xl mb-4 text-green-500 transition-transform duration-300 ease-in-out`}
            >
              {experience.icon}
            </div>
            <h3 className="text-xl text-center font-semibold mb-2 text-gray-800">
              {experience.title}
            </h3>
            <p className="text-sm text-center font-medium text-gray-600 w-full italic">
              {experience.company} • {experience.year}
            </p>
            <p className="text-sm text-center text-gray-600 mt-4">{experience.description}</p>
            <div className="flex w-full flex-wrap justify-center gap-2 mt-4">
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
