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
    ? "border-sky-400/40 bg-sky-100/80 text-sky-800"
    : "border-cyan-500/40 bg-cyan-500/10 text-cyan-200";
  const headlineGradient = isAurora
    ? "from-slate-950 via-indigo-800 to-sky-700"
    : "from-cyan-200 via-blue-200 to-purple-300";
  const introTextClass = isAurora ? "text-slate-700" : "text-slate-300";
  const typewriterText = isAurora ? "text-sky-700" : "text-cyan-300";
  const typewriterAccent = isAurora ? "text-sky-900" : "text-cyan-500";
  const typewriterCursor = isAurora ? "text-sky-600" : "text-cyan-400";
  const narrativeText = isAurora ? "text-slate-600" : "text-slate-300";
  const highlightCardClasses = isAurora
    ? "rounded-2xl border border-sky-200/70 bg-sky-100/80 px-4 py-3 text-left shadow-[0_18px_40px_rgba(59,130,246,0.15)] backdrop-blur-sm"
    : "rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-left shadow-cyan-500/10 backdrop-blur";
  const highlightLabelClass = isAurora ? "text-sky-500" : "text-cyan-300";
  const highlightValueClass = isAurora ? "text-slate-900" : "text-cyan-200";
  const stackPanelClasses = isAurora
    ? "rounded-3xl border border-sky-200/70 bg-white/90 p-6 text-left shadow-[0_28px_60px_rgba(59,130,246,0.15)]"
    : "rounded-3xl border border-cyan-400/30 bg-slate-950/80 p-6 text-left shadow-2xl shadow-cyan-500/20";
  const stackPanelTitle = isAurora ? "text-sky-500" : "text-cyan-300";
  const stackCellClasses = isAurora
    ? "group rounded-2xl border border-sky-200/60 bg-white px-2 py-4 shadow-sky-200/30 transition-all duration-300 hover:border-sky-400/80 hover:bg-sky-50"
    : "group rounded-2xl border border-white/10 bg-white/5 px-2 py-4 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/80 hover:bg-cyan-500/10";
  const stackIconClass = isAurora ? "text-sky-500" : "text-cyan-300";
  const stackLabelClass = isAurora
    ? "mt-2 text-[8px] uppercase tracking-[0.08em] text-sky-600 leading-tight"
    : "mt-2 text-[8px] uppercase tracking-[0.08em] text-cyan-200 leading-tight";
  const stackTextClass = isAurora ? "text-slate-600" : "text-slate-300";
  const introCardClasses = isAurora
    ? "relative overflow-hidden rounded-3xl border border-sky-200/60 bg-white/85 px-8 py-10 shadow-[0_32px_70px_rgba(59,130,246,0.18)] backdrop-blur-md"
    : "relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-white/5 px-8 py-10 backdrop-blur-xl";
  const glowGradient = isAurora
    ? "linear-gradient(120deg, rgba(59,130,246,0.16), rgba(236,233,254,0.55), rgba(14,165,233,0.12))"
    : "linear-gradient(120deg, rgba(56,189,248,0.18), rgba(32,211,238,0.08), rgba(129,140,248,0.15))";
  const availabilityCardClasses = isAurora
    ? "flex flex-col gap-4 rounded-3xl border border-sky-200/70 bg-white/85 p-6 text-slate-700 shadow-[0_24px_55px_rgba(59,130,246,0.18)] sm:flex-row sm:items-center sm:justify-between"
    : "flex flex-col gap-4 rounded-3xl border border-cyan-400/25 bg-slate-950/70 p-6 text-slate-200 shadow-cyan-500/20 sm:flex-row sm:items-center sm:justify-between";
  const availabilityTitleClass = isAurora ? "text-sky-600" : "text-cyan-200";
  const availabilitySubtitleClass = isAurora ? "text-slate-500" : "text-slate-400";
  const primaryCTAClasses = isAurora
    ? "group inline-flex items-center gap-3 rounded-full border border-sky-300/50 bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:translate-x-1 hover:shadow-[0_20px_45px_rgba(99,102,241,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
    : "group inline-flex items-center gap-3 rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-all duration-300 hover:translate-x-1 hover:shadow-2xl hover:shadow-cyan-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900";
  const pulseColor = isAurora ? "bg-sky-300/40" : "bg-cyan-500/40";
  const summaryCardClasses = isAurora
    ? "flex flex-col gap-3 rounded-3xl border border-sky-200/70 bg-white/90 p-6 shadow-[0_26px_60px_rgba(59,130,246,0.16)] backdrop-blur"
    : "flex flex-col gap-3 rounded-3xl border border-cyan-400/20 bg-slate-950/80 p-6 backdrop-blur-xl";
  const summaryTitleClass = isAurora
    ? "text-xs uppercase tracking-[0.35em] text-sky-500"
    : "text-xs uppercase tracking-[0.35em] text-cyan-300";
  const summaryBodyClass = isAurora ? "space-y-3 text-sm text-slate-600" : "space-y-3 text-sm text-slate-300";
  const objectiveCardClasses = isAurora
    ? "rounded-3xl border border-sky-200/70 bg-gradient-to-br from-white via-sky-50 to-white p-6 shadow-[0_24px_65px_rgba(59,130,246,0.16)]"
    : "rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 shadow-2xl shadow-cyan-500/15";
  const objectiveIconWrapper = isAurora
    ? "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-400 text-white shadow-sky-200/40"
    : "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 text-slate-950";
  const objectiveTextClass = isAurora ? "space-y-2 text-sm text-slate-600" : "space-y-2 text-sm text-slate-300";
  const headlineStyle = isAurora ? { textShadow: "0 18px 45px rgba(59,130,246,0.28)" } : undefined;

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
              style={headlineStyle}
            >
              {copy.headline[0]} <span>{copy.headline[1]}</span> {copy.headline[2]}
            </h1>
            <p className={`text-sm font-mono uppercase tracking-[0.35em] ${typewriterText}`}>
              <span className={typewriterAccent}>$</span>{" "}
              <span>{subtitle}</span>
              <span className={`ml-2 animate-pulse ${typewriterCursor}`}>▮</span>
            </p>
            <p className={`max-w-2xl text-base sm:text-lg ${introTextClass}`}>{copy.introduction}</p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className={primaryCTAClasses}
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
            <div className={introCardClasses}>
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: glowGradient
                  }}
                />
              </div>
              <div className="relative z-10 grid gap-6 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,280px)] sm:items-center">
                <div className="space-y-4">
                  <p className={`text-sm leading-relaxed ${narrativeText}`}>{copy.narrative}</p>
                  <div className="flex flex-wrap gap-3">
                    {copy.highlights.map((highlight) => (
                      <div
                        key={highlight.label}
                        className={highlightCardClasses}
                      >
                        <p className={`text-xs uppercase tracking-[0.3em] ${highlightLabelClass}`}>{highlight.label}</p>
                        <p className={`text-xl font-semibold ${highlightValueClass}`}>{highlight.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={stackPanelClasses}>
                  <p className={`text-xs uppercase tracking-[0.35em] ${stackPanelTitle}`}>{copy.trustedStack}</p>
                  <div className={`mt-4 grid grid-cols-3 gap-2 text-center ${stackTextClass}`}>
                    {techCapsules.map(({ Icon, label }) => (
                      <div key={label} className={stackCellClasses}>
                        <Icon className={`mx-auto text-lg transition-transform duration-300 group-hover:-translate-y-0.5 ${stackIconClass}`} />
                        <p className={stackLabelClass}>{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={availabilityCardClasses}>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`absolute inset-0 animate-ping rounded-full ${pulseColor}`} />
                  <div
                    className={`relative flex h-10 w-10 items-center justify-center rounded-full ${
                      isAurora
                        ? "bg-gradient-to-br from-sky-400 to-indigo-400 text-white shadow-sky-200/40"
                        : "bg-gradient-to-br from-cyan-500 to-blue-500 text-slate-950"
                    }`}
                  >
                    <FaCodeBranch />
                  </div>
                </div>
                <div>
                  <p className={`text-sm font-semibold ${availabilityTitleClass}`}>{copy.availability}</p>
                  <p className={`text-xs ${availabilitySubtitleClass}`}>
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
            <div className={summaryCardClasses}>
              <p className={summaryTitleClass}>{language === "fr" ? "Synthèse" : "Snapshot"}</p>
              <div className={summaryBodyClass}>
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

            <div className={objectiveCardClasses}>
              <div className="flex items-start gap-3">
                <div className={objectiveIconWrapper}>
                  <FaRocket />
                </div>
                <div className={objectiveTextClass}>
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
