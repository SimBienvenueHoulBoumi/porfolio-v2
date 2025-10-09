"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const SocialBanger = () => {
  const { language } = useLanguage();

  const altText =
    language === "fr" ? "Portrait de Sim Bienvenue Houlboumi" : "Portrait of Sim Bienvenue Houlboumi";

  return (
    <div className="relative flex justify-center">
      <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/40 via-blue-500/30 to-purple-500/30 blur-3xl opacity-70 animate-pulse-slow" />
        <div className="relative rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 p-[3px] sm:p-[4px] shadow-2xl shadow-cyan-500/40">
          <Image
            src="/profile.png"
            alt={altText}
            width={170}
            height={170}
            className="block h-full w-full rounded-full object-cover border border-white/15"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default SocialBanger;
