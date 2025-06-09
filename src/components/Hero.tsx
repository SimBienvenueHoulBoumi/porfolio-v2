"use client";
import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

// Typing effect hook
function useTypewriter(words: string[], speed = 70, pause = 1200) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (displayed.length < words[index].length) {
      timeout = setTimeout(
        () => setDisplayed(words[index].slice(0, displayed.length + 1)),
        speed
      );
    } else {
      timeout = setTimeout(() => {
        setDisplayed("");
        setIndex((i) => (i + 1) % words.length);
      }, pause);
    }
    return () => clearTimeout(timeout);
  }, [displayed, index, words, speed, pause]);
  return displayed;
}

const Hero = forwardRef<HTMLDivElement, object>((_props, ref)=> {
  const subtitle = useTypewriter([
    "Développeur Fullstack Java & React",
    "Automatisation DevOps (Ansible, Docker, CI/CD)",
    "Web API | Microservices | Cloud Enthusiast"
  ], 55, 1450);

  return (
    <header
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-[#0a2342] via-[#191c29] to-black px-2 sm:px-0"
    >
      {/* Bokeh lights */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/3 w-44 h-44 sm:w-80 sm:h-80 rounded-full bg-blue-700/25 blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/3 left-1/2 w-28 h-28 sm:w-48 sm:h-48 rounded-full bg-pink-500/20 blur-3xl animate-pulse delay-300" />
        <div className="absolute top-[60%] left-[60%] w-24 h-24 sm:w-44 sm:h-44 rounded-full bg-cyan-400/15 blur-3xl animate-pulse delay-700" />
        <div className="absolute top-10 left-1/4 w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-indigo-400/20 blur-2xl animate-pulse delay-200" />
      </div>

      <div className="relative z-10 flex flex-col items-center fade-in w-full">
        {/* Avatar with animated aura */}
        <div className="relative mb-10 group w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40">
          {/* Aura */}
          <div className="absolute -inset-2 sm:-inset-3 rounded-full bg-gradient-to-tr from-blue-500 via-pink-400 to-cyan-400 blur-2xl opacity-40 group-hover:scale-110 transition-transform duration-500"></div>
          <img
            src="https://api.dicebear.com/8.x/identicon/svg?seed=dev"
            className="w-full h-full object-cover rounded-full border-4 border-blue-500 shadow-2xl group-hover:rotate-12 group-hover:scale-105 transition-transform duration-500"
            alt="Avatar dev"
          />
          {/* Badge ultra propre, centré et responsive */}
          <span
            className="
              absolute left-1/2 bottom-[-18px] sm:bottom-[-22px] -translate-x-1/2
              px-3 py-[2px] sm:px-4 sm:py-1 text-xs sm:text-sm font-semibold
              rounded-full bg-gradient-to-r from-blue-600 via-fuchsia-500 to-cyan-400
              text-white shadow-lg ring-2 ring-white/30 backdrop-blur-sm border border-white/20
              z-20 animate-bounce whitespace-nowrap select-none
              "
          >
            OPEN TO WORK
          </span>
        </div>

        {/* Name with reveal effect */}
        <h1
          className="
            text-2xl sm:text-3xl md:text-5xl font-extrabold mb-2 mt-1 sm:mt-4 text-center relative select-none group
            animate-fadeInName
          "
          style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
        >
          <span
            className="
              relative inline-block px-2
              bg-gradient-to-r from-blue-200 via-pink-200 to-cyan-200
              bg-[length:250%_250%] bg-clip-text text-transparent
              drop-shadow-[0_2px_18px_rgba(104,180,255,0.20)]
              animate-gradient-move
              transition-all duration-500
              "
            style={{
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextStroke: "0.5px #dbeafe", // bleu très pâle
              textShadow: "0 0 8px #dbeafe, 0 4px 16px #a5b4fc, 0 0 2px #fff",
            }}
          >
            Sim bienvenue HOULBOUMI
            {/* Soulignement animé */}
            <span
              className="
                absolute left-1/2 -translate-x-1/2 bottom-0
                w-[110%] h-2
                rounded-full
                bg-gradient-to-r from-blue-200 via-pink-200 to-cyan-200
                blur-md opacity-60
                animate-underline-pulse
                group-hover:animate-underline-pulse-hover
                z-[-1]
                pointer-events-none
              "
            ></span>
          </span>
        </h1>

        {/* Dynamic subtitle with typewriter effect */}
        <h2 className="text-base sm:text-lg md:text-xl font-medium text-blue-300  my-4 tracking-wider min-h-[28px] sm:min-h-[32px] md:min-h-[36px] text-center">
          {subtitle}
          <span className="inline-block w-2 h-5 sm:h-6 align-middle bg-blue-300 animate-pulse ml-1 rounded"></span>
        </h2>


      <div
        className="
          relative mb-6 px-5 py-5 sm:px-8 sm:py-6
          rounded-2xl max-w-xs sm:max-w-xl
          mx-auto text-center text-base sm:text-lg
          font-medium text-white
          bg-gradient-to-br from-blue-900/70 via-white/10 to-cyan-600/10
          border border-blue-400/40
          shadow-[0_0_30px_4px_rgba(34,212,255,0.18)]
          backdrop-blur-2xl
          animate-[fadeInUp_1s_ease]
          overflow-visible
          before:content-[''] before:absolute before:-bottom-4 before:left-1/2 before:-translate-x-1/2 before:w-8 before:h-8 before:bg-gradient-to-t before:from-blue-800/70 before:to-transparent before:rounded-b-full
          "
        style={{
          boxShadow: "0 2px 24px 0 rgba(32,165,255,0.15), 0 1.5px 0 0 rgba(62,220,255,0.08)",
          animationDelay: "0.7s",
          animationFillMode: "both",
        }}
      >
        {/* Glow animated border */}
        <span className="absolute -inset-1 rounded-3xl pointer-events-none z-0 blur-lg bg-gradient-to-r from-blue-400 via-pink-400 to-cyan-400 opacity-30 animate-gradient-move" aria-hidden="true"></span>

            {/* Icône stylée */}
        <span className="flex justify-center mb-2">
          <FaRegLightbulb className="text-cyan-300 text-xl sm:text-2xl drop-shadow-lg animate-pulse" />
        </span>
          <span className="relative z-10">
            <span className="font-semibold text-cyan-200">«</span>
            <span className="px-2 text-white/90">
              Passionné par la création de <span className="text-cyan-300 font-semibold">solutions robustes</span>,
              <span className="text-pink-300 font-semibold"> élégantes</span> et <span className="text-blue-300 font-semibold">évolutives</span>.
              <br className="hidden md:block" />
              J’accompagne entreprises & startups <span className="text-blue-200 font-semibold">de l’idée à la réussite technique</span>.
            </span>
            <span className="font-semibold text-cyan-200">»</span>
          </span>
        </div>
        </div>

      {/* Réseaux sociaux “banger” */}
      <div className="relative flex justify-center z-20 mt-2">
        <div
          className="
            flex gap-6 sm:gap-8 px-4 sm:px-8 py-3
            rounded-2xl
            transition-all duration-300
            fade-in
            animate-[fadeInUp_1s_ease]
          "
          style={{
            animationDelay: "1.2s",
            animationFillMode: "both",
          }}
        >
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/TON_ID/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group relative
              flex items-center justify-center
              text-blue-400 hover:text-blue-600
              bg-gradient-to-tr from-blue-500/10 via-white/0 to-fuchsia-400/10
              rounded-full
              shadow-xl
              p-3 sm:p-4
              transition-all duration-200
              focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/40
            "
            aria-label="LinkedIn"
          >
            <FiLinkedin size={34} />
            {/* Glow ring on hover */}
            <span className="absolute -inset-2 rounded-full border-2 border-blue-400 opacity-0 group-hover:opacity-40 group-hover:scale-110 transition-all duration-300 pointer-events-none"></span>
            {/* Tooltip */}
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-blue-700 text-white text-xs px-2 py-1 rounded-lg pointer-events-none transition-all duration-200 whitespace-nowrap shadow-lg z-30">
              LinkedIn
            </span>
          </a>
          {/* GitHub */}
          <a
            href="https://github.com/SimBienvenueHoulBoumi"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group relative
              flex items-center justify-center
              text-gray-300 hover:text-white
              bg-gradient-to-tr from-gray-500/10 via-white/0 to-blue-400/10
              rounded-full
              shadow-xl
              p-3 sm:p-4
              transition-all duration-200
              focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200/40
            "
            aria-label="GitHub"
          >
            <FiGithub size={34} />
            <span className="absolute -inset-2 rounded-full border-2 border-gray-400 opacity-0 group-hover:opacity-30 group-hover:scale-110 transition-all duration-300 pointer-events-none"></span>
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded-lg pointer-events-none transition-all duration-200 whitespace-nowrap shadow-lg z-30">
              GitHub
            </span>
          </a>
          {/* Email */}
          <a
            href="mailto:houlboumi.sim.bienevenue@gmail.com"
            className="
              group relative
              flex items-center justify-center
              text-pink-400 hover:text-white
              bg-gradient-to-tr from-pink-400/10 via-white/0 to-blue-400/10
              rounded-full
              shadow-xl
              p-3 sm:p-4
              transition-all duration-200
              focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-200/40
            "
            aria-label="E-mail"
          >
            <FiMail size={34} />
            <span className="absolute -inset-2 rounded-full border-2 border-pink-400 opacity-0 group-hover:opacity-30 group-hover:scale-110 transition-all duration-300 pointer-events-none"></span>
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-pink-600 text-white text-xs px-2 py-1 rounded-lg pointer-events-none transition-all duration-200 whitespace-nowrap shadow-lg z-30">
              Email
            </span>
          </a>
        </div>
      </div>


      {/* Decorative lines / bottom accent */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 pointer-events-none">
        <div className="h-6 w-0.5 sm:h-8 bg-gradient-to-b from-blue-500 via-blue-400 to-transparent mb-2 opacity-80"></div>
        <div className="h-3 w-0.5 sm:h-4 bg-gradient-to-b from-blue-300 to-transparent opacity-60"></div>
      </div>
    </header>
  );
});

Hero.displayName = "Hero";
export default Hero;
