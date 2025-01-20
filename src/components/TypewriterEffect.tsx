"use client";

import React, { useState, useEffect } from "react";

/**
 * Composant pour afficher un effet de machine à écrire avec saisie et suppression de texte en boucle.
 *
 * @param {Object} props - Propriétés du composant.
 * @param {string[]} props.texts - Tableau de textes à afficher dans l'animation.
 * @param {number} [props.typeSpeed=50] - Vitesse de saisie du texte (en millisecondes).
 * @param {number} [props.deleteSpeed=100] - Vitesse de suppression du texte (en millisecondes).
 * @param {number} [props.pauseSpeed=500] - Pause après chaque texte avant de passer à un autre (en millisecondes).
 */
interface TypewriterEffectProps {
  texts: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseSpeed?: number;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  texts,
  typeSpeed = 50,
  deleteSpeed = 100,
  pauseSpeed = 500,
}) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    if (isDeleting) {
      if (charIndex > 0) {
        const deletingInterval = setTimeout(() => {
          setText(texts[index].substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, deleteSpeed);

        return () => clearTimeout(deletingInterval);
      }

      const changeTextInterval = setTimeout(() => {
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }, pauseSpeed);

      return () => clearTimeout(changeTextInterval);
    } else {
      if (charIndex < texts[index].length) {
        const typingInterval = setTimeout(() => {
          setText(texts[index].substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, typeSpeed);

        return () => clearTimeout(typingInterval);
      }

      const afterTypingPause = setTimeout(() => {
        setIsDeleting(true);
      }, pauseSpeed);

      return () => clearTimeout(afterTypingPause);
    }
  }, [charIndex, isDeleting, index, texts, typeSpeed, deleteSpeed, pauseSpeed]);

  // Gérer le clignotement du curseur
  useEffect(() => {
    const cursorBlinkInterval = setInterval(() => {
      setIsBlinking((prev) => !prev);
    }, 500); // Le curseur clignote toutes les 500ms

    return () => clearInterval(cursorBlinkInterval);
  }, []);

  return (
    <span className="text-blue-500">
      <span className="border-b-2 pb-1 border-blue-500">{text}</span>
      <span
        className={`inline-block ${isBlinking ? "opacity-100" : "opacity-0"} border-r-2 border-blue-500`}
        style={{ transition: "opacity 0.3s ease-in-out" }}
      >
        {/* Curseur clignotant */}
      </span>
    </span>
  );
};

export default TypewriterEffect;
