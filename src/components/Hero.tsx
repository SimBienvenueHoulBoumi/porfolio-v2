"use client";
import { forwardRef, useEffect, useState } from "react";
import { FaDocker, FaGitAlt, FaServer, FaCode, FaRocket, FaCloud } from "react-icons/fa";
import { SiKubernetes, SiJenkins, SiAnsible } from "react-icons/si";
import { FiTerminal } from "react-icons/fi";

import SocialBanger from "./SocialBanger";
import Banner from "./Banner";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import DownLoadCV from "./DownLoadCV";
import { useLanguage } from "@/context/LanguageContext";

const HERO_COPY = {
  fr: {
    typewriter: [
      "Créer des microservices évolutifs...",
      "Automatiser l’infrastructure comme du code...",
      "Déployer avec des pipelines CI/CD..."
    ],
    introduction: "Ingénieur DevOps & développeur full stack, j’aide les équipes produit à livrer vite et bien : pipelines fiables, architectures cloud résilientes et code orienté business.",
    badges: [
      { icon: FaCode, text: "Développeur Full Stack" },
      { icon: FaServer, text: "Ingénieur DevOps" },
      { icon: FaCloud, text: "Architecte Cloud" }
    ],
    projectTitle: "Faire décoller vos projets",
    projectDescription: "De la conception à la production : automatisation CI/CD, observabilité, microservices, infrastructure cloud. Mon objectif est simple : des livraisons fréquentes, stables et faciles à maintenir.",
    availability: "Disponible pour de nouveaux défis",
    trustedStack: "Stack de confiance",
    keyNumbers: "Chiffres clés",
    yearsExperience: "Années d'expérience",
    masteredTechs: "Technologies maîtrisées"
  },
  en: {
    typewriter: [
      "Building scalable microservices...",
      "Automating infrastructure as code...",
      "Shipping with resilient CI/CD pipelines..."
    ],
    introduction: "DevOps engineer & full stack developer helping product teams deliver fast and safe: reliable pipelines, resilient cloud architectures, and business-focused code.",
    badges: [
      { icon: FaCode, text: "Full Stack Developer" },
      { icon: FaServer, text: "DevOps Engineer" },
      { icon: FaCloud, text: "Cloud Architect" }
    ],
    projectTitle: "Launch your projects",
    projectDescription: "From design to production: CI/CD automation, observability, microservices, cloud infrastructure. My goal is simple: frequent releases that stay stable and easy to maintain.",
    availability: "Available for new challenges",
    trustedStack: "Trusted stack",
    keyNumbers: "Key figures",
    yearsExperience: "Years of experience",
    masteredTechs: "Technologies mastered"
  }
} as const satisfies Record<"fr" | "en", { typewriter: string[]; introduction: string; badges: { icon: typeof FaCode; text: string }[]; projectTitle: string; projectDescription: string; availability: string; trustedStack: string; keyNumbers: string; yearsExperience: string; masteredTechs: string }>;

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

const Hero = forwardRef<HTMLDivElement, object>((_props, ref) => {
  const { language } = useLanguage();
  const copy = HERO_COPY[language];
  const subtitle = useTypewriter(copy.typewriter, 60, 1800);

  const techIcons = [
    { Icon: FaDocker, color: "text-blue-400", label: "Docker" },
    { Icon: SiKubernetes, color: "text-blue-500", label: "Kubernetes" },
    { Icon: FaGitAlt, color: "text-orange-500", label: "Git" },
    { Icon: SiJenkins, color: "text-red-400", label: "Jenkins" },
    { Icon: SiAnsible, color: "text-red-500", label: "Ansible" },
    { Icon: FaServer, color: "text-green-400", label: "SRE" }
  ];

  const focusTags = ["CI/CD", "Microservices", "Cloud Native"];

  return (
    <header
      ref={ref}
      className="hero-section relative py-12 sm:py-16 flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-black px-4 sm:px-6"
    >
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6 z-30 flex flex-col items-end gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>
      {/* Fond quadrillé */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.08) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(34, 211, 238, 0.08) 1px, transparent 1px)`,
            backgroundSize: "50px 50px"
          }}
        />
      </div>

      {/* Icônes flottantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { left: "12%", top: "18%", delay: "0s", duration: "16s" },
          { left: "80%", top: "26%", delay: "0.6s", duration: "18s" },
          { left: "28%", top: "68%", delay: "1s", duration: "20s" },
          { left: "68%", top: "74%", delay: "1.4s", duration: "22s" },
          { left: "44%", top: "34%", delay: "2s", duration: "24s" },
          { left: "18%", top: "84%", delay: "2.4s", duration: "26s" }
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute text-cyan-500/5 animate-float"
            style={{
              left: pos.left,
              top: pos.top,
              animationDelay: pos.delay,
              animationDuration: pos.duration
            }}
          >
            <FaCode className="text-6xl sm:text-8xl" />
          </div>
        ))}
      </div>

      {/* halos lumineux */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-cyan-500/10 blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 sm:w-72 sm:h-72 rounded-full bg-blue-500/10 blur-3xl animate-pulse delay-500" />
        <div className="absolute bottom-1/4 left-1/2 w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-purple-500/10 blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(260px,1fr)]">
          {/* Colonne contenu */}
          <div className="space-y-8">
            <div className="bg-gray-900/75 backdrop-blur-sm border border-cyan-500/20 rounded-2xl px-6 py-6 shadow-2xl shadow-cyan-500/10">
              <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span>~/portfolio</span>
              </div>
              <div className="mt-4 space-y-3">
                <p className="text-sm font-mono text-green-400">$ whoami</p>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Sim bienvenue HOULBOUMI
                </h1>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {copy.introduction}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {copy.badges.map((badge, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 text-white/90 px-4 py-2 text-xs sm:text-sm"
                >
                  <badge.icon className="text-cyan-300" />
                  {badge.text}
                </div>
              ))}
            </div>
            <DownLoadCV />

            <div className="bg-gray-950/80 backdrop-blur-sm border border-green-500/25 rounded-2xl px-5 py-4 shadow-2xl shadow-green-500/10">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <div className="flex items-center gap-2">
                  <FiTerminal className="text-green-400" />
                  <span>bash</span>
                </div>
                <span className="text-gray-500">live</span>
              </div>
              <div className="mt-3 font-mono text-sm text-gray-100">
                <span className="text-blue-400">$</span>
                <span className="ml-2">{subtitle}</span>
                <span className="text-green-400 animate-pulse">▮</span>
              </div>
            </div>

            <div className="bg-gray-900/80 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 shadow-xl shadow-cyan-500/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/40">
                    <FaRocket className="text-white text-xl" />
                  </div>
                </div>
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold text-white">{copy.projectTitle}</h2>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {copy.projectDescription}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {focusTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-200 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>


          </div>

          {/* Colonne visuelle */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative -pb-10">
              <SocialBanger />
              <div className="availability-badge absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full text-xs font-semibold tracking-wide px-4 py-2 whitespace-nowrap">
                {copy.availability}
              </div>
            </div>

            <div className="w-full bg-gray-900/70 border border-cyan-500/20 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">{copy.trustedStack}</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                {techIcons.map(({ Icon, color, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2 text-xs text-gray-400">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 ${color}`}>
                      <Icon className="text-xl" />
                    </div>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full bg-gray-900/70 border border-blue-500/20 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">{copy.keyNumbers}</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                  <div className="text-2xl font-bold text-cyan-400">2+</div>
                  <p className="text-xs text-gray-400 mt-1 leading-tight">{copy.yearsExperience}</p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                  <div className="text-2xl font-bold text-blue-400">5+</div>
                  <p className="text-xs text-gray-400 mt-1 leading-tight">{copy.masteredTechs}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bandeau social */}
        <div className="mt-10 mb-6 opacity-1 animate-fadeInUp" style={{ animationDelay: "1.3s", animationFillMode: "both" }}>
          <Banner />
        </div>
      </div>
    </header>
  );
});

Hero.displayName = "Hero";
export default Hero;
