"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const SocialBanger = () => {
  const { language } = useLanguage();

  const altText =
    language === "fr" ? "Portrait de Sim Bienvenue Houlboumi" : "Portrait of Sim Bienvenue Houlboumi";

  return (
    <div className="relative w-28 h-30 sm:w-32 sm:h-32 md:w-40 md:h-40">
      <div className="absolute -inset-2 sm:-inset-3 rounded-full bg-white blur-2xl opacity-40" />
      <Image
        src="/DSC_0066.JPG"
        alt={altText}
        width={160}
        height={160}
        className="w-full h-full object-cover rounded-full border-4 shadow-2xl"
        priority
      />
    </div>
  );
};

export default SocialBanger;
