import React from "react";
import { FaGraduationCap, FaLaptopCode } from "react-icons/fa";

export const Education: React.FC = () => {
  const educationData = [
    {
      title: "Piscine Intensive",
      institution: "ETNA Campus Paris",
      year: "2023 - 2024",
      description: (
        <>
          <p className="text-gray-600 text-xs">
            Formation axée sur le développement technique en{" "}
            <strong>Java</strong>, <strong>Python</strong>, et{" "}
            <strong>JavaScript/TypeScript</strong>.
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-1 text-gray-600 text-xs">
            <li>Conception d&apos;API avec Node.js, NestJS et Spring Boot</li>
            <li>Frameworks : Django, React, Vue.js, Flutter</li>
            <li>
              Gestion de projets sous pression et approche pluridisciplinaire
            </li>
          </ul>
          <p className="mt-4 text-xs text-gray-700 font-semibold">
            Cours pertinents :
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600 text-xs">
            <li>Algorithmique avancée et optimisation</li>
            <li>Systèmes distribués</li>
            <li>Conception et intégration d&apos;API RESTful</li>
          </ul>
        </>
      ),
      icon: <FaLaptopCode className="text-white text-lg md:text-xl" />,
    },
    {
      title: "Mastère Développement Web",
      institution: "Nantes Ynov Campus",
      year: "2021 - 2024",
      description: (
        <>
          <p className="text-gray-600 text-xs">
            Formation axée sur le travail d&apos;équipe et la gestion de projets
            avec :
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-600 text-xs">
            <li>
              Maîtrise des frameworks : React, Next.js, Angular, NestJS, Spring
              Boot
            </li>
            <li>Compétence en conteneurisation et CI/CD (Docker)</li>
            <li>Apprentissage rapide de nouvelles technologies</li>
            <li>Coordination Back/Front</li>
          </ul>
          <p className="mt-4 text-xs text-gray-700 font-semibold">
            Cours pertinents :
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-600 text-xs">
            <li>DevOps : Docker, Kubernetes et CI/CD</li>
            <li>Gestion et architecture des bases de données avancées</li>
            <li>Sécurité des applications web</li>
          </ul>
        </>
      ),
      icon: <FaGraduationCap className="text-white text-lg md:text-xl" />,
    },
    {
      title: "Licence ASR (Systèmes et Réseaux)",
      institution: "UIT Douala-CMR",
      year: "2015 - 2018",
      description: (
        <>
          <p className="text-gray-600 text-xs">
            Formation orientée pratique, centrée sur :
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-600 text-xs">
            <li>Langages : C, C++, Java</li>
            <li>Virtualisation des systèmes et administration réseau</li>
            <li>Configuration des équipements (routeurs/switchs)</li>
          </ul>
          <p className="mt-4 text-xs text-gray-700 font-semibold">
            Cours pertinents :
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-600 text-xs">
            <li>Principes d&apos;administration réseau et protocoles</li>
            <li>Conception des réseaux locaux et étendus</li>
            <li>Sécurité des réseaux : Firewall et VPN</li>
          </ul>
        </>
      ),
      icon: <FaGraduationCap className="text-white text-lg md:text-xl" />,
    },
  ];

  return (
    <div className="container mx-auto py-10 px-4 lg:px-8 w-2/3">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {educationData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl hover:border-teal-400 transition-all duration-300 max-w-xs mx-auto"
          >
            <div className="w-12 h-12 flex justify-center items-center bg-blue-500 rounded-full mb-4">
              {item.icon}
            </div>
            <h3 className="text-center font-bold text-gray-800 hover:text-teal-500 transition duration-200">
              {item.title}
            </h3>
            <p className="text-center text-xs text-gray-600">
              {item.institution}
            </p>
            <p className="text-center text-gray-500 mb-4 text-xs italic">{item.year}</p>
            <div className="text-gray-700">{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
