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

  return (
    <span className="text-blue-500">
      <span className="border-b-2 pb-1 border-blue-500">{text}</span>
    </span>
  );
};

export default TypewriterEffect;
