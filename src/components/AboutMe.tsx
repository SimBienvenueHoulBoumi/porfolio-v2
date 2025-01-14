import React from "react";

function AboutMe() {
  return (
    <div className="flex flex-col items-center justify-center text-center text-white py-12 ">
      {/* Container principal */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full px-6 mb-12 ">
        {/* Bio et centres d'intérêt à droite */}
        <div className="max-w-4xl w-full text-center md:text-left bg-gray-800 p-8 rounded-md">
          <h1 className="text-xl font-bold mb-8 text-blue-400 text-left w-full">
            Brève présentation
          </h1>
          <p className="text-sm font-light text-gray-300 mb-6">
            Je suis un développeur web passionné par les technologies modernes.
            Titulaire d&apos;un mastère en développement web, je cherche
            toujours à me perfectionner et à découvrir de nouvelles façons
            d&apos;apprendre et de créer. À travers mes projets, j&apos;ai
            acquis des compétences en développement frontend et backend, avec
            une forte expertise en React, JavaScript et Spring Boot.
          </p>

          {/* Centres d'intérêt */}
          <h2 className="text-xl font-semibold text-blue-400 mb-4">
            Centres d&apos;intérêt
          </h2>
          <ul className="space-y-1 text-sm font-light text-gray-300">
            <li>
              💻 Passionné par le développement web et l&apos;évolution des
              technologies modernes.
            </li>
            <li>
              📚 Toujours en quête de nouveaux défis techniques, avec une forte
              envie d&apos;apprendre.
            </li>
            <li>
              🌍 Très intéressé par les sujets sociaux, notamment les enjeux
              autour de l&apos;égalité et de l&apos;inclusion.
            </li>
            <li>
              🎮 Amoureux des jeux vidéo et curieux de voir comment les
              technologies interactives se développent.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
