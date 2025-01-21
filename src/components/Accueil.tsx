import React from "react";
import {
  FaGraduationCap,
  FaSuitcase,
  FaEnvelope,
  FaSatellite,
} from "react-icons/fa";
import TypewriterEffect from "./TypewriterEffect"; // Assurez-vous d'importer votre composant TypewriterEffect

interface AccueilProps {
  setActiveSection: (name: string) => void;
}

export const Accueil: React.FC<AccueilProps> = ({ setActiveSection }) => {
  const sections = [
    { name: "Éducation", icon: <FaGraduationCap /> },
    { name: "Expériences", icon: <FaSuitcase /> },
    { name: "À propos", icon: <FaEnvelope /> },
    { name: "Projets", icon: <FaSatellite /> },
  ];

  const texts = ["développeur web fullstack.", "passionné par l'innovation."];

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 relative overflow-hidden">
      {/* Fond subtil avec animations douces */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[280px] h-[280px] bg-gradient-to-br from-fuchsia-50 to-green-400 opacity-15 rounded-full filter blur-xl animate-pulse" />
        <div className="absolute bottom-12 right-12 w-[220px] h-[220px] bg-gradient-to-br from-green-500 to-blue-500 opacity-12 rounded-full filter blur-xl animate-ping" />
      </div>

      {/* Conteneur principal centré */}
      <div className="flex flex-col items-center text-center bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 p-8 rounded-xl shadow-xl border border-transparent relative overflow-hidden">
        {/* Titre et effet Typewriter */}
        <div className="text-center text-gray-300 mb-6">
          <p className="text-3xl font-semibold mb-4">
            Je suis <TypewriterEffect texts={texts} />
          </p>
          <p className="text-lg text-gray-400">
            Passionné par les nouvelles technologies et toujours à la recherche
            de nouveaux défis.
          </p>
        </div>

        {/* Liste des sections */}
        <div className="flex justify-center gap-5 text-gray-200">
          {sections.map((section) => (
            <button
              key={section.name}
              className="flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-500 text-white hover:bg-gradient-to-l hover:from-indigo-500 hover:to-teal-500 shadow-sm transition-all ease-in-out hover:scale-110 duration-300"
              onClick={() => setActiveSection(section.name)}
            >
              <span className="text-2xl">{section.icon}</span>
            </button>
          ))}
        </div>

        {/* Message inspirant */}
        <div className="mt-10 text-gray-400 max-w-xs mx-auto">
          <p className="font-medium text-lg">
            Créatif et déterminé, prêt à collaborer sur des projets innovants.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
