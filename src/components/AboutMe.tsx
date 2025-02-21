import React from "react";

function AboutMe() {
  return (
    <div className="container pt-24 px-4 sm:px-6 lg:px-8 w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
      {/* Container principal */}
      <div className="flex flex-col items-center w-full space-y-8">
        {/* Section Bio */}
        <div className="max-w-4xl w-full bg-white p-6 sm:p-8 rounded-md shadow-lg">
          <h1 className="text-md sm:text-xl text-center font-bold text-blue-400">
            Brève présentation
          </h1>
          <p className="text-xs sm:text-sm font-light mb-3 leading-relaxed text-gray-800">
            Je suis un développeur web passionné par les technologies modernes.
            Titulaire d&apos;un mastère en développement web, je cherche
            toujours à me perfectionner et à découvrir de nouvelles façons
            d&apos;apprendre et de créer. À travers mes projets, j&apos;ai
            acquis des compétences en développement frontend et backend, avec
            une forte expertise en React, JavaScript et Spring Boot.
          </p>

          {/* Centres d'intérêt */}
          <h2 className="text-lg sm:text-xl font-semibold text-blue-400">
            Centres d&apos;intérêt
          </h2>
          <ul className="text-sm font-light text-gray-800">
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
