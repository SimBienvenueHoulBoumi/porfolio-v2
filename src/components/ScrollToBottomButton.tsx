"use client";
import { FC } from "react";
import { FiChevronsDown } from "react-icons/fi";

interface ScrollToBottomButtonProps {
  onClick: () => void;
}
const ScrollToBottomButton: FC<ScrollToBottomButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Descendre en bas de page"
    className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer bg-transparent border-0 mt-10"
    style={{ outline: "none" }}
  >
    <FiChevronsDown size={38} className="text-blue-400 drop-shadow-lg hover:text-blue-500 transition" />
  </button>
);

export default ScrollToBottomButton;
