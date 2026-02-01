"use client";
import { useTheme } from "@/context/ThemeContext";

export default function SectionDivider() {
  const { theme } = useTheme();
  const isAurora = theme === "aurora";

  return (
    <div className="relative my-1 h-4 overflow-visible">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`w-full border-t transition-all duration-500 ${
            isAurora ? "border-slate-200" : "border-slate-800"
          }`}
        />
      </div>
      <div
        className={`absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-300 ${
          isAurora ? "border-cyan-400/70" : "border-cyan-500/70"
        }`}
      />
      <div
        className={`absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ${
          isAurora ? "bg-cyan-400/30" : "bg-cyan-500/30"
        } animate-ping`}
        style={{ animationDuration: "2s" }}
      />
    </div>
  );
}

