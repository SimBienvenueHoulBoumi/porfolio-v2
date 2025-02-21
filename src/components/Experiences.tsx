import React from "react";
import { SiNextdotjs, SiSpringboot } from "react-icons/si";

export const Experiences: React.FC = () => {
  const experiences = [
    {
      title: "Alternance - Développeur Full-Stack",
      company: "SNCF VOYAGEURS - DSI",
      year: "Octobre 2021 - Septembre 2023",
      description:
        "Développement et maintenance d’interfaces utilisateur intuitives et réactives pour des applications internes en Next.js/React. Conception d'API sécurisées en Node.js et optimisation des performances pour réduire les temps de réponse.",
      technologies: ["Next.js", "React", "Node.js", "Git", "Docker"],
      icon: <SiNextdotjs />,
    },
    {
      title: "Stage - Développeur Backend",
      company: "INFO 2R",
      year: "Mars 2021 - Septembre 2021",
      description:
        "Conception et développement d'API REST sécurisées avec Spring Boot. Mise en place d'un système de gestion des profils utilisateurs, sécurisation des endpoints avec Spring Security et gestion des authentifications via JWT.",
      technologies: [
        "Spring Boot",
        "PostgreSQL",
        "Docker",
        "JWT",
        "Spring Security",
      ],
      icon: <SiSpringboot />,
    },
  ];

  return (
    <div className="container pt-24 px-2 sm:px-4 lg:px-8 w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-start max-w-screen-xl w-full py-4 px-3">
        {experiences.map((experience, index) => (
          <div
            key={index}
            className="flex flex-col items-start bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
          >
            {/* Icône */}
            <div className="text-5xl mb-4 text-green-500 transition-transform duration-300 ease-in-out">
              {experience.icon}
            </div>

            {/* Titre */}
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              {experience.title}
            </h3>

            {/* Informations de l'entreprise */}
            <p className="text-sm font-medium text-gray-600 italic">
              {experience.company} • {experience.year}
            </p>

            {/* Description */}
            <p className="text-sm text-gray-700 mt-4">
              {experience.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-3 mt-4">
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
