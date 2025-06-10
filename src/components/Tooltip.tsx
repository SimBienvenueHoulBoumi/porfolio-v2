import { FC } from "react";

const Tooltip: FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => (
  <span className="relative group cursor-help">
    {children}
    <span
      className="
        absolute left-1/2 -translate-x-1/2 bottom-full mb-2
        opacity-0 group-hover:opacity-100
        pointer-events-none
        bg-gray-900 text-white text-xs px-2 py-1 rounded-lg shadow-lg
        whitespace-pre-line z-30
        transition-opacity duration-300
        w-max max-w-xs
        font-normal
      "
      style={{ minWidth: "140px" }}
    >
      {text}
    </span>
  </span>
);

export default Tooltip;