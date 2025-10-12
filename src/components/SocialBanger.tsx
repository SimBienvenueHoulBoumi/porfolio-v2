"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const SocialBanger = () => {
  const { language } = useLanguage();

  const altText =
    language === "fr" ? "Portrait de Sim Bienvenue Houlboumi" : "Portrait of Sim Bienvenue Houlboumi";

  return (
    <div className="relative flex items-center justify-center">
      <div className="relative h-36 w-36 sm:h-40 sm:w-40">
        <div className="pointer-events-none absolute inset-0 -translate-y-1/6 blur-3xl">
          <div className="h-full w-full rounded-full bg-gradient-to-br from-cyan-500/35 via-blue-500/25 to-purple-500/25 motion-safe:animate-pulse-slow" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-32 w-32 rounded-full border border-cyan-400/30 bg-cyan-500/10 blur-2xl" />
        </div>
        <div className="relative flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full border border-cyan-500/40 motion-safe:animate-spin"
            style={{ animationDuration: "20s" }}
          />
          <div
            className="absolute inset-2 rounded-full border border-blue-500/30 motion-safe:animate-spin"
            style={{ animationDuration: "16s", animationDirection: "reverse" }}
          />
          <div className="relative rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 p-[3px] shadow-2xl shadow-cyan-500/40">
            <Image
              src="/profile.png"
              alt={altText}
              width={180}
              height={180}
              className="block h-full w-full rounded-full border border-white/20 object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialBanger;
