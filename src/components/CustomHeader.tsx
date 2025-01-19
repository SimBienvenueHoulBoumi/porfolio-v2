import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

interface Section {
  name: string;
  icon: React.ReactNode;
}

interface CustomHeaderProps {
  sections: Section[];
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  sections,
  activeSection,
  setActiveSection,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white py-4 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center text-md w-full">
        {/* Logo ou Nom */}
        <div className="text-lg sm:text-xl md:text-2xl font-semibold uppercase">
          SimDev
        </div>

        {/* Bouton hamburger */}
        <button
          className="md:hidden text-white z-20"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Menu de navigation */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } absolute top-14 left-0 w-full bg-gray-800 text-white flex-col items-start px-6 py-8 md:flex md:flex-row md:relative md:top-auto md:left-auto md:w-auto md:px-0 md:py-0 space-y-4 md:space-y-0 md:space-x-6 transition-all duration-300`}
        >
          {sections.map((section) => (
            <button
              key={section.name}
              className={`${
                activeSection === section.name
                  ? "text-blue-400"
                  : "hover:text-blue-400 transition-colors"
              } flex items-center justify-center py-2 px-4`}
              onClick={() => {
                setActiveSection(section.name);
                setIsMenuOpen(false);
              }}
            >
              {/* Affiche le contenu en fonction de la taille de l'écran */}
              <div className="flex items-center gap-2 md:hidden text-xs">
                <div>{section.icon}</div>
                <span>{section.name}</span>
              </div>
              <div className="hidden md:block lg:hidden">
                <span>{section.name}</span>
              </div>
              <div className="hidden lg:flex items-center gap-2">
                <div>{section.icon}</div>
                <span>{section.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CustomHeader;
