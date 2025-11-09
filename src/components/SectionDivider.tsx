"use client";
import { useTheme } from "@/context/ThemeContext";

export default function SectionDivider() {
  const { theme } = useTheme();
  const isAurora = theme === "aurora";

  return (
    <div className="relative h-24 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`h-px w-full ${
            isAurora
              ? "bg-gradient-to-r from-transparent via-sky-300/50 to-transparent"
              : "bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
          }`}
        />
      </div>
      <div
        className={`absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ${
          isAurora ? "bg-sky-400" : "bg-cyan-500"
        } animate-pulse`}
      />
      <div
        className={`absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ${
          isAurora ? "bg-sky-400/30" : "bg-cyan-500/30"
        } animate-ping`}
        style={{ animationDuration: "2s" }}
      />
    </div>
  );
}

