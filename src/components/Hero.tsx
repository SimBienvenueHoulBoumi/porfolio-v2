"use client";

import { forwardRef, useEffect, useState } from "react";
import {
  FaDocker,
  FaGitAlt,
  FaServer,
  FaCodeBranch,
  FaRocket
} from "react-icons/fa";
import { SiKubernetes, SiJenkins, SiAnsible } from "react-icons/si";
import { FiZap, FiTerminal, FiArrowRight } from "react-icons/fi";

import SocialBanger from "./SocialBanger";
import Banner from "./Banner";
import DownLoadCV from "./DownLoadCV";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const HERO_COPY = {
  fr: {
    tagline: "Pipeline haute performance",
    typewriter: [
      "Créer des microservices évolutifs...",
      "Automatiser l’infrastructure comme du code...",
      "Déployer avec des pipelines CI/CD..."
    ],
    headline: ["DevOps Engineer", "&", "Full-stack Developer"],
    introduction:
      "J’accompagne les équipes produit vers un delivery continu : pipelines fiables, plateformes cloud résilientes et code taillé pour la valeur métier.",
    highlights: [
      { label: "Deploy frequency", value: "x8" },
      { label: "Incidents réduits", value: "-45%" },
      { label: "Cloud cost", value: "-18%" }
    ],
    narrative:
      "Du cadrage à la MEP : IaC, observabilité, microservices et culture d’ingénierie pour shipper vite, bien et sans surprises.",
    ctaPrimary: "Planifier un call",
    ctaSecondary: "Découvrir les stacks",
    availability: "Disponible pour de nouveaux challenges",
    trustedStack: "Stack de confiance"
  },
  en: {
    tagline: "High velocity pipeline",
    typewriter: [
      "Building scalable microservices...",
      "Automating infrastructure as code...",
      "Shipping with resilient CI/CD pipelines..."
    ],
    headline: ["DevOps Engineer", "&", "Full-stack Developer"],
    introduction:
      "I help product teams unlock continuous delivery: reliable pipelines, resilient cloud platforms, and business-first code.",
    highlights: [
      { label: "Deployment frequency", value: "x8" },
      { label: "Incidents reduced", value: "-45%" },
      { label: "Cloud cost", value: "-18%" }
    ],
    narrative:
      "From scoping to production: IaC, observability, microservices, and engineering culture to ship fast, safe, and sustainably.",
    ctaPrimary: "Book a call",
    ctaSecondary: "Explore the stack",
    availability: "Open to new missions",
    trustedStack: "Trusted stack"
  }
} as const;

function useTypewriter(words: readonly string[], speed = 65, pause = 1600) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (displayed.length < words[index].length) {
      timeout = setTimeout(() => {
        setDisplayed(words[index].slice(0, displayed.length + 1));
      }, speed);
    } else {
      timeout = setTimeout(() => {
        setDisplayed("");
        setIndex((prev) => (prev + 1) % words.length);
      }, pause);
    }

    return () => clearTimeout(timeout);
  }, [displayed, index, pause, speed, words]);

  return displayed;
}

const Hero = forwardRef<HTMLDivElement, object>((_props, ref) => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  const copy = HERO_COPY[language];
  const isAurora = theme === "aurora";
  const subtitle = useTypewriter(copy.typewriter);
  const heroBackground = isAurora ? "from-slate-50 via-sky-50 to-white" : "from-slate-950 via-slate-900 to-black";
  const taglineClasses = isAurora
    ? "border-sky-300/40 bg-sky-200/40 text-sky-600"
    : "border-cyan-500/40 bg-cyan-500/10 text-cyan-200";
  const headlineGradient = isAurora
    ? "from-slate-900 via-sky-700 to-purple-700"
    : "from-cyan-200 via-blue-200 to-purple-300";
  const introTextClass = isAurora ? "text-slate-600" : "text-slate-300";
  const typewriterText = isAurora ? "text-sky-600" : "text-cyan-300";
  const typewriterAccent = isAurora ? "text-sky-500" : "text-cyan-500";

  const techCapsules = [
    { Icon: FaDocker, label: "Docker" },
    { Icon: SiKubernetes, label: "Kubernetes" },
    { Icon: FaGitAlt, label: "Git" },
    { Icon: SiJenkins, label: "Jenkins" },
    { Icon: SiAnsible, label: "Ansible" },
    { Icon: FaServer, label: "SRE" }
  ];

  return (
    <header
      ref={ref}
      className={`hero-section relative overflow-hidden bg-gradient-to-br ${heroBackground} py-20 sm:py-28`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-40">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.18), transparent 55%), radial-gradient(circle at 80% 15%, rgba(129,140,248,0.15), transparent 60%)"
            }}
          />
        </div>
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(12,74,110,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(12,74,110,0.25) 1px, transparent 1px)",
              backgroundSize: "46px 46px"
            }}
          />
        </div>
        <div className="absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl motion-safe:animate-pulse-slow" />
        <div className="absolute -bottom-16 right-1/3 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl motion-safe:animate-pulse-slow delay-700" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6">
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] ${taglineClasses}`}
          >
            <FiZap className="text-sm" />
            {copy.tagline}
          </span>
          <div className="mt-6 space-y-3 sm:space-y-4">
            <h1
              className={`text-4xl font-bold text-transparent sm:text-5xl md:text-6xl bg-gradient-to-r ${headlineGradient} bg-clip-text`}
            >
              {copy.headline[0]} <span>{copy.headline[1]}</span> {copy.headline[2]}
            </h1>
            <p className={`text-sm font-mono uppercase tracking-[0.35em] ${typewriterText}`}>
              <span className={typewriterAccent}>$</span>{" "}
              <span>{subtitle}</span>
              <span className="ml-2 animate-pulse text-cyan-400">▮</span>
            </p>
            <p className={`max-w-2xl text-base sm:text-lg ${introTextClass}`}>{copy.introduction}</p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-all duration-300 hover:translate-x-1 hover:shadow-2xl hover:shadow-cyan-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              <FiTerminal className="text-base" />
              {copy.ctaPrimary}
              <FiArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <DownLoadCV />
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,360px)]">
          <div className="space-y-8">
            <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-white/5 px-8 py-10 backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(120deg, rgba(56,189,248,0.18), rgba(32,211,238,0.08), rgba(129,140,248,0.15))"
                  }}
                />
              </div>
              <div className="relative z-10 grid gap-6 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,280px)] sm:items-center">
                <div className="space-y-4">
                  <p className="text-sm leading-relaxed text-slate-300">{copy.narrative}</p>
                  <div className="flex flex-wrap gap-3">
                    {copy.highlights.map((highlight) => (
                      <div
                        key={highlight.label}
                        className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-left shadow-cyan-500/10 backdrop-blur"
                      >
                        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">{highlight.label}</p>
                        <p className="text-xl font-semibold text-cyan-200">{highlight.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-3xl border border-cyan-400/30 bg-slate-950/80 p-6 text-left shadow-2xl shadow-cyan-500/20">
                  <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">{copy.trustedStack}</p>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center text-slate-300">
                    {techCapsules.map(({ Icon, label }) => (
                      <div
                        key={label}
                        className="group rounded-2xl border border-white/10 bg-white/5 px-2 py-4 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/80 hover:bg-cyan-500/10"
                      >
                        <Icon className="mx-auto text-lg text-cyan-300 transition-transform duration-300 group-hover:-translate-y-0.5" />
                        <p className="mt-2 text-[8px] uppercase tracking-[0.08em] text-cyan-200 leading-tight">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-3xl border border-cyan-400/25 bg-slate-950/70 p-6 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-cyan-500/40" />
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-slate-950">
                    <FaCodeBranch />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-cyan-200">{copy.availability}</p>
                  <p className="text-xs text-slate-400">
                    {language === "fr"
                      ? "On synchronise les objectifs, on déploie en continu."
                      : "We align the objectives, then keep shipping continuously."}
                  </p>
                </div>
              </div>
              <SocialBanger />
            </div>

            <Banner />
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 rounded-3xl border border-cyan-400/20 bg-slate-950/80 p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">{language === "fr" ? "Synthèse" : "Snapshot"}</p>
              <div className="space-y-3 text-sm text-slate-300">
                <p>
                  {language === "fr"
                    ? "Architecture, pipelines, feature delivery : un triptyque aligné qui rend la roadmap prédictible."
                    : "Architecture, pipelines, and feature delivery: a tight trio that keeps the roadmap predictable."}
                </p>
                <p>
                  {language === "fr"
                    ? "Stack cloud multi-environnements, IaC versionnée, monitoring centralisé. Le delivery devient une boucle maîtrisée."
                    : "Multi-environment cloud stack, versioned IaC, centralized monitoring. Delivery turns into a controlled loop."}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 shadow-2xl shadow-cyan-500/15">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 text-slate-950">
                  <FaRocket />
                </div>
                <div className="space-y-2 text-sm text-slate-300">
                  <p>
                    {language === "fr"
                      ? "Objectif : livrer plus vite que le cycle logique, sans sacrifier la stabilité ni la maintenabilité."
                      : "Goal: ship faster than the logical cycle without trading away stability or maintainability."}
                  </p>
                  <p>
                    {language === "fr"
                      ? "Automatisation CI/CD, observabilité proactive et culture d’équipe orientée feedback."
                      : "CI/CD automation, proactive observability, and a team culture wired around feedback loops."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

Hero.displayName = "Hero";
export default Hero;
