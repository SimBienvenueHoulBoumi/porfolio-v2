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

import { motion } from "framer-motion";

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState("Accueil");

  const sections = [
    {
      name: "Accueil",
      component: <Accueil />,
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

  // Définir les variantes d'animation
  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Barre de navigation */}
      <CustomHeader
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Section active */}
      <div className="flex-1 w-full overflow-hidden">
        <motion.div
          key={activeSection} // Nécessaire pour déclencher une animation à chaque changement
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex items-center justify-center h-full"
        >
          {
            sections.find((section) => section.name === activeSection)
              ?.component
          }
        </motion.div>
      </div>
    </div>
  );
};

export default App;
