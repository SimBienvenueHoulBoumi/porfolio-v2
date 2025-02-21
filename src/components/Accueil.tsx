import React from "react";
import { motion } from "framer-motion";
import TypewriterEffect from "./TypewriterEffect"; // Assurez-vous d'importer votre composant TypewriterEffect
import { FaGithub, FaLinkedin } from "react-icons/fa";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const Accueil: React.FC<{}> = () => {
  const texts = ["développeur web fullstack.", "passionné par l'innovation."];

  return (
    <div className="relative h-screen overflow-hidden flex flex-col items-center justify-center p-8">
      {/* Conteneur principal */}
      <div className="flex justify-start w-full space-x-4 my-4">
        <a
          href="https://github.com/SimBienvenueHoulBoumi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors"
        >
          <FaGithub size={30} />
        </a>
        <a
          href="https://www.linkedin.com/in/sim-bienvenue-houl-boumi/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-500 transition-colors text-2xl"
        >
          <FaLinkedin size={30} />
        </a>
      </div>
      <div className="flex flex-col items-center w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col space-y-6 items-center text-center p-10 bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700 relative overflow-hidden z-10"
        >

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-200 space-y-4"
          >
            <p className="text-2xl font-bold">
              Je suis <TypewriterEffect texts={texts} />
            </p>
            <p className="text-md text-gray-400">
              Passionné par les nouvelles technologies et toujours à la
              recherche de nouveaux défis.
            </p>
          </motion.div>

          {/* Message inspirant */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-white max-w-xs mx-auto"
          >
            <p className="font-medium text-sm ">
              Créatif et déterminé, prêt à collaborer sur des projets innovants.
            </p>
          </motion.div>
        </motion.div>
        {/* Section Réseaux sociaux */}
      </div>
    </div>
  );
};

export default Accueil;
