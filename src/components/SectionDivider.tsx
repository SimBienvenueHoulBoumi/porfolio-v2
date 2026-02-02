"use client";
import { useTheme } from "@/context/ThemeContext";

export default function SectionDivider() {
  const { theme } = useTheme();
  const isAurora = theme === "aurora";

  return (
    <div className="relative my-0">
      <div
        className={`h-px w-full rounded-full bg-gradient-to-r transition-all duration-500 ${
          isAurora
            ? "from-transparent via-emerald-300/70 to-transparent"
            : "from-transparent via-cyan-500/80 to-transparent"
        }`}
      />
    </div>
  );
}

