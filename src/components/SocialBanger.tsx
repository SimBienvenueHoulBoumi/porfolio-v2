"use client";

import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

const SocialBanger = () => {
  const { theme } = useTheme();
  const isAurora = theme === "aurora";
  const altText = "Portrait de Sim Bienvenue Houlboumi";

  return (
    <div className="relative z-20 flex items-center justify-center mt-6 mb-2 translate-y-6 md:translate-y-0 lg:-translate-y-10 transition-transform duration-300">
      <div
        className={`h-44 w-44 sm:h-48 sm:w-48 lg:h-52 lg:w-52 rounded-full p-[2px] ${
          isAurora
            ? "border border-emerald-200/70 bg-[#f4fff7]/90 shadow-[0_22px_55px_rgba(15,23,42,0.12)]"
            : "border border-emerald-500/35 bg-slate-950/80 shadow-[0_22px_55px_rgba(0,0,0,0.75)] backdrop-blur-md"
        }`}
      >
        <div className="h-full w-full overflow-hidden rounded-full">
          <Image
            src="/profile.png"
            alt={altText}
            width={256}
            height={256}
            className="block h-full w-full object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default SocialBanger;
