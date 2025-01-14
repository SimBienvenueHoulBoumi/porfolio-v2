"use client";

import React, { useState } from "react";
import { Accueil } from "@/components/Accueil";
import { Competences } from "@/components/Competences";
import { Education } from "@/components/Education";
import { Experiences } from "@/components/Experiences";
import { Contact } from "@/components/Contact";
import AboutMe from "@/components/AboutMe";

import {
  FaHome,
  FaCogs,
  FaGraduationCap,
  FaSuitcase,
  FaEnvelope,
} from "react-icons/fa";
import { RiAccountCircleLine } from "react-icons/ri";
import CustomHeader from "@/components/CustomHeader";

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState("Accueil");

  const isAccueil = activeSection === "Accueil";

  const sections = [
    {
      name: "Accueil",
      component: <Accueil setActiveSection={setActiveSection} />,
      icon: <FaHome />,
    },
    { name: "Compétences", component: <Competences />, icon: <FaCogs /> },
    { name: "Éducation", component: <Education />, icon: <FaGraduationCap /> },
    { name: "Expériences", component: <Experiences />, icon: <FaSuitcase /> },
    { name: "À propos", component: <AboutMe />, icon: <FaEnvelope /> },
    { name: "Contact", component: <Contact />, icon: <RiAccountCircleLine /> },
  ];

  return (
    <div className="flex flex-col">
      {/* Barre de navigation */}
      {!isAccueil && (
        <CustomHeader
          sections={sections}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      )}

      {/* Section active */}
      <div
        className={`${
          isAccueil ? "h-screen w-auto flex items-center justify-center" : "pt-24"
        } w-full flex-1`}
      >
        {sections.find((section) => section.name === activeSection)?.component}
      </div>
    </div>
  );
};

export default App;
