"use client";

import Image from "next/image";

const SocialBanger = () => {
  const altText = "Portrait de Sim Bienvenue Houlboumi";

  return (
    <div className="relative flex items-center justify-center mt-2 mb-2 md:-translate-y-6 lg:translate-y-0 transition-transform duration-300">
      <div className="h-40 w-40 sm:h-44 sm:w-44 lg:h-48 lg:w-48">
        <Image
          src="/profile.png"
          alt={altText}
          width={180}
          height={180}
          className="block h-full w-full rounded-full object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default SocialBanger;
