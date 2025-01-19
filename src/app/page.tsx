"use client";

import React, { useState } from "react";
import { Accueil } from "@/components/Accueil";
import { Education } from "@/components/Education";
import { Experiences } from "@/components/Experiences";
import AboutMe from "@/components/AboutMe";
import Projets from "@/components/Projets";

import {
  FaHome,
  FaGraduationCap,
  FaSuitcase,
  FaEnvelope,
  FaSatellite,
} from "react-icons/fa";

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
    {
      name: "Éducation",
      component: <Education />,
      icon: <FaGraduationCap />,
    },
    {
      name: "Expériences",
      component: <Experiences />,
      icon: <FaSuitcase />,
    },
    {
      name: "Projets",
      component: <Projets />,
      icon: <FaSatellite />,
    },
    {
      name: "À propos",
      component: <AboutMe />,
      icon: <FaEnvelope />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
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
          isAccueil
            ? "h-screen flex items-center justify-center"
            : "pt-16"
        } w-full flex-1`}
      >
        {sections.find((section) => section.name === activeSection)?.component}
      </div>
    </div>
  );
};

export default App;
