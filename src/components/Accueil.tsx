import React from "react";
import TypewriterEffect from "./TypewriterEffect"; // Assurez-vous d'importer votre composant TypewriterEffect


import Contact from "./Contact";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const Accueil: React.FC<{}> = () => {
  const texts = ["développeur web fullstack.", "passionné par l'innovation."];

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 relative overflow-hidden">
      {/* Fond subtil avec animations douces */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[280px] h-[280px] bg-gradient-to-br from-fuchsia-50 to-green-400 opacity-15 rounded-full filter blur-xl animate-pulse" />
        <div className="absolute bottom-12 right-12 w-[220px] h-[220px] bg-gradient-to-br from-green-500 to-blue-500 opacity-12 rounded-full filter blur-xl animate-ping" />
      </div>

      {/* Conteneur principal centré */}
      <div className="flex flex-col space-y-4 items-center text-center bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 p-8 rounded-xl shadow-xl border border-transparent relative overflow-hidden">
        {/* Titre et effet Typewriter */}
        <div className="text-center text-gray-300 space-y-4">
          <p className="text-xl font-semibold">
            Je suis <TypewriterEffect texts={texts} />
          </p>
          <p className="text-sm text-gray-400">
            Passionné par les nouvelles technologies et toujours à la recherche
            de nouveaux défis.
          </p>
        </div>

        {/* Liste des sections */}
        <Contact />

        {/* Message inspirant */}
        <div className="text-gray-400 max-w-xs mx-auto">
          <p className="font-medium text-sm">
            Créatif et déterminé, prêt à collaborer sur des projets innovants.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
