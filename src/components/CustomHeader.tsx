import Image from "next/image";
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
    <nav className="fixed top-0 left-0 w-full bg-[#151334] text-white py-2 shadow-md z-50">
      <div className="container mx-auto text-white flex justify-between items-center px-4">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/pictures/logo.png"
            className="bg-white rounded-full -m-1"
            alt="Logo"
            width={40}
            height={40}
            priority
          />
          <div
            className={`text-lg sm:text-xl font-semibold uppercase`}
          >
            SimDev
          </div>
        </div>

        {/* Bouton hamburger pour les petits écrans */}
        <button
          className="md:hidden z-20"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Menu de navigation */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } fixed inset-0 bg-gray-900 bg-opacity-90 flex-col items-center justify-center px-8 space-y-4 md:space-y-0 md:relative md:flex md:flex-row md:bg-transparent md:inset-auto md:space-x-6`}
        >
          {sections.map((section) => (
            <button
              key={section.name}
              className={`${
                activeSection === section.name
                  ? "text-[#FF007A]"
                  : "hover:text-[#FF007A] transition-colors"
              } flex items-center py-2 px-4 text-sm`}
              onClick={() => {
                setActiveSection(section.name);
                setIsMenuOpen(false); // Ferme le menu
              }}
            >
              {/* Icône et texte */}
              <div className="flex items-center gap-2">
                {section.icon}
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
