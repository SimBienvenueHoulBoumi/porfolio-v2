import React from "react";
import TypewriterEffect from "./TypewriterEffect";
import {
  FaCogs,
  FaGraduationCap,
  FaSuitcase,
  FaEnvelope,
} from "react-icons/fa";

interface AccueilProps {
  setActiveSection: (name: string) => void;
}

export const Accueil: React.FC<AccueilProps> = ({ setActiveSection }) => {
  const texts = [
    "développeur web junior.",
    "titulaire d'un mastère en développement web.",
    "passionné de nouvelles technologies.",
  ];

  const sections = [
    { name: "Compétences", icon: <FaCogs /> },
    { name: "Éducation", icon: <FaGraduationCap /> },
    { name: "Expériences", icon: <FaSuitcase /> },
    { name: "À propos", icon: <FaEnvelope /> },
  ];

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-900 relative overflow-hidden">
      {/* Arrière-plan animé */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 opacity-20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500 opacity-20 rounded-full filter blur-2xl animate-ping" />
      </div>

      {/* Corps centré */}
      <div className="flex m-4 flex-col items-center text-center bg-opacity-80 bg-gradient-to-tr from-gray-800 via-gray-900 to-black p-8 rounded-2xl shadow-2xl border border-gray-700">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-[2rem] md:text-[3rem] font-bold mb-4 text-white glow-text">
            Sim B.H.B.
          </h1>
          <div className="w-full text-lg text-gray-300">
            Je suis <TypewriterEffect texts={texts} />
          </div>
        </div>

        {/* Liste des sections */}
        <div className="flex flex-wrap justify-center gap-2 text-lg font-medium text-gray-200">
          {sections.map((section) => (
            <button
              key={section.name}
              className="flex items-center gap-1 p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white hover:scale-105 transform transition-all shadow-md hover:shadow-lg hover:shadow-purple-500/50"
              onClick={() => setActiveSection(section.name)}
            >
              <div className="text-xl">{section.icon}</div>
              <span>{section.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accueil;
