"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const SocialBanger = () => {
  const { language } = useLanguage();

  const altText =
    language === "fr" ? "Portrait de Sim Bienvenue Houlboumi" : "Portrait of Sim Bienvenue Houlboumi";

  return (
    <div className="relative flex items-center justify-center group/avatar mt-2 mb-2">
      <div className="relative h-40 w-40 sm:h-44 sm:w-44 lg:h-48 lg:w-48">
        <div className="pointer-events-none absolute inset-0 -translate-y-[12%] blur-3xl animate-pulse-slow">
          <div className="h-full w-full rounded-full bg-gradient-to-br from-cyan-500/35 via-blue-500/25 to-purple-500/25" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-32 w-32 rounded-full border border-cyan-400/30 bg-cyan-500/10 blur-2xl transition-all duration-500 group-hover/avatar:scale-125" />
        </div>
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-cyan-500/40 opacity-70 transition-all duration-500 group-hover/avatar:scale-110 group-hover/avatar:opacity-100" />
          <div className="absolute inset-2 rounded-full border border-blue-500/30 opacity-60 transition-all duration-500 group-hover/avatar:scale-110 group-hover/avatar:opacity-80" />
          <div className="relative rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 p-[3px] shadow-2xl shadow-cyan-500/40 transition-all duration-500 group-hover/avatar:scale-105 group-hover/avatar:shadow-cyan-500/60 animate-gradient-move">
            <Image
              src="/profile.png"
              alt={altText}
              width={180}
              height={180}
              className="block h-full w-full rounded-full border border-white/20 object-cover transition-transform duration-500 group-hover/avatar:scale-105"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialBanger;
