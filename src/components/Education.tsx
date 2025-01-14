import React from "react";
import { FaGraduationCap, FaLaptopCode } from "react-icons/fa";

export const Education: React.FC = () => {
  const educationData = [
    {
      title: "ETNA Paris",
      institution: "Piscine Intensive",
      year: "2023 - 2024",
      description: (
        <>
          <p>
            Formation axée sur le développement technique en{" "}
            <strong>Java</strong>, <strong>Python</strong> et{" "}
            <strong>Javascript/TypeScript</strong>.
          </p>
          <ul className="list-disc pl-5 mt-2 text-gray-600">
            <li>Conception d&apos;API avec Node.js, NestJS et Spring Boot</li>
            <li>Frameworks : Django, React, Vue.js, Flutter</li>
            <li>
              Gestion de projets sous pression et approche pluridisciplinaire
            </li>
          </ul>
          <p className="mt-4 text-gray-700">
            <strong>Cours pertinents :</strong>
          </p>
          <ul className="list-disc pl-5 mt-2 text-gray-600">
            <li>Algorithmique avancée et optimisation</li>
            <li>Systèmes distribués</li>
            <li>Conception et intégration d&apos;API RESTful</li>
          </ul>
        </>
      ),
      icon: <FaLaptopCode />,
    },
    {
      title: "Mastère Développement Web",
      institution: "Nantes Ynov Campus",
      year: "2021 - 2024",
      description: (
        <>
          <p>
            Formation axée sur le travail d&apos;équipe et la gestion de projets
            avec :
          </p>
          <ul className="list-disc pl-5 mt-2 text-gray-600">
            <li>
              Maîtrise des frameworks : React, Next.js, Angular, Node.js,
              NestJS, Spring Boot
            </li>
            <li>Compétence en conteneurisation et CI/CD (Docker)</li>
            <li>Apprentissage rapide de nouvelles technologies</li>
            <li>Coordination Back/Front</li>
          </ul>
          <p className="mt-4 text-gray-700">
            <strong>Cours pertinents :</strong>
          </p>
          <ul className="list-disc pl-5 mt-2 text-gray-600">
            <li>DevOps : Docker, Kubernetes et CI/CD</li>
            <li>Gestion et architecture des bases de données avancées</li>
            <li>Sécurité des applications web</li>
          </ul>
        </>
      ),
      icon: <FaGraduationCap />,
    },
    {
      title: "Licence ASR (Systèmes et Réseaux)",
      institution: "UIT Douala-CMR",
      year: "2015 - 2018",
      description: (
        <>
          <p>Formation orientée pratique, centrée sur :</p>
          <ul className="list-disc pl-5 mt-2 text-gray-600">
            <li>Langages : C, C++, Java</li>
            <li>Virtualisation des systèmes et administration réseau</li>
            <li>Configuration des équipements (routeurs/switchs)</li>
          </ul>
          <p className="mt-4 text-gray-700">
            <strong>Cours pertinents :</strong>
          </p>
          <ul className="list-disc pl-5 mt-2 text-gray-600">
            <li>Principes d&apos;administration réseau et protocoles</li>
            <li>Conception des réseaux locaux et étendus</li>
            <li>Sécurité des réseaux : Firewall et VPN</li>
          </ul>
        </>
      ),
      icon: <FaGraduationCap />,
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold text-left mb-8 ">
        Diplômes et Formations
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {educationData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            {/* Icône */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 flex justify-center items-center bg-blue-500 text-white rounded-full shadow-md">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-500">
                  {item.title}
                </h3>
                <p className="text-md text-gray-600">{item.institution}</p>
                <p className="text-sm text-gray-500">{item.year}</p>
              </div>
            </div>

            {/* Description */}
            <div className="text-sm text-gray-700">{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
