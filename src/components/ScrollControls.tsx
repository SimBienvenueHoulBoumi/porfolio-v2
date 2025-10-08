"use client";
import { FC, useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

interface ScrollControlsProps {
  onScrollToFooter: () => void;
}

const ScrollControls: FC<ScrollControlsProps> = ({ onScrollToFooter }) => {
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setAtBottom(scrollTop + clientHeight >= scrollHeight - 16);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (atBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onScrollToFooter();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-50 group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/70 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-cyan-500/50"
      aria-label={atBottom ? "Revenir en haut" : "Aller en bas"}
    >
      {atBottom ? (
        <FiArrowUp className="text-white text-xl sm:text-2xl group-hover:-translate-y-1 transition-transform" />
      ) : (
        <FiArrowDown className="text-white text-xl sm:text-2xl group-hover:translate-y-1 transition-transform" />
      )}

      <span className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg pointer-events-none transition-all duration-200 whitespace-nowrap shadow-lg border border-cyan-500/30">
        {atBottom ? "Aller en haut" : "Aller en bas"}
      </span>

      <span className="absolute inset-0 rounded-full bg-cyan-500/30 animate-ping opacity-75" />
    </button>
  );
};

export default ScrollControls;
