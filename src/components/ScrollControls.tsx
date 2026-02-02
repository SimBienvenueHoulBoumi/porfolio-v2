"use client";

import { useState, useEffect } from "react";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";

const ScrollControls = () => {
  const [atBottom, setAtBottom] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollBottom = scrollTop + windowHeight;

      // Check if at bottom (with 100px threshold)
      const nearBottom = scrollBottom >= documentHeight - 100;
      setAtBottom(nearBottom);

      // Show button after scrolling down a bit
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (atBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleClick}
      className="scroll-button fixed bottom-32 right-4 sm:bottom-36 sm:right-8 z-[60] group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 shadow-glow-premium hover:shadow-glow-premium transition-all duration-500 hover:scale-110 active:scale-95 ripple-effect magnetic focus:outline-none focus:ring-4 focus:ring-emerald-500/50 safe-area-inset-bottom"
      aria-label={atBottom ? "Retour en haut" : "Aller en bas"}
    >
      {atBottom ? (
        <FiArrowUp className="text-white text-2xl sm:text-3xl group-hover:-translate-y-1 transition-transform duration-300" />
      ) : (
        <FiArrowDown className="text-white text-2xl sm:text-3xl group-hover:translate-y-1 transition-transform duration-300 animate-bounce" style={{ animationDuration: "2s" }} />
      )}
      <span className="absolute inset-0 rounded-full bg-emerald-500/30 opacity-60 animate-ping" style={{ animationDuration: "2s" }} />
      <span className="absolute inset-0 rounded-full bg-emerald-400/20 animate-pulse" />
    </button>
  );
};

export default ScrollControls;

