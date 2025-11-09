"use client";

import { forwardRef, useEffect, useState } from "react";
import {
  FaDocker,
  FaGitAlt,
  FaServer,
  FaCodeBranch
} from "react-icons/fa";
import { SiKubernetes, SiJenkins, SiAnsible } from "react-icons/si";
import { FiZap, FiTerminal, FiArrowRight, FiCheckCircle } from "react-icons/fi";

import SocialBanger from "./SocialBanger";
import Banner from "./Banner";
import DownLoadCV from "./DownLoadCV";
import { useTheme } from "@/context/ThemeContext";
import { HeroContent } from "@/lib/content";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

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

type HeroProps = {
  content: HeroContent;
};

const Hero = forwardRef<HTMLDivElement, HeroProps>(({ content }, ref) => {
  const { theme } = useTheme();
  const isAurora = theme === "aurora";
  const subtitle = useTypewriter(content.typewriter);
  const heroBackground = isAurora ? "from-slate-50 via-sky-50 to-white" : "from-slate-950 via-slate-900 to-black";
  const nameGradient = "from-cyan-200 via-blue-300 to-purple-400";
  const heroNameClass = isAurora
    ? "heading-display block text-slate-900"
    : `heading-display block bg-gradient-to-r ${nameGradient} bg-clip-text text-transparent drop-shadow`;
  const headlineGradient = "from-cyan-200 via-blue-200 to-purple-300";
  const headlineClass = isAurora
    ? "heading-lg block text-slate-700"
    : `heading-lg block bg-gradient-to-r ${headlineGradient} bg-clip-text text-transparent`;
  const heroRoleClass = headlineClass;
  const introTextClass = isAurora ? "body-base text-slate-700" : "body-base text-slate-300";
  const typewriterText = isAurora ? "mono-label text-slate-700" : "mono-label text-cyan-300";
  const typewriterAccent = isAurora ? "text-slate-900" : "text-cyan-500";
  const typewriterCursor = isAurora ? "text-slate-700" : "text-cyan-400";
  const narrativeText = isAurora ? "body-base text-slate-600" : "body-base text-slate-300";
  const highlightCardClasses = isAurora
    ? "rounded-2xl border border-sky-200/70 bg-sky-100/80 px-4 py-3 text-left shadow-[0_18px_40px_rgba(59,130,246,0.15)] backdrop-blur-sm"
    : "rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-left shadow-cyan-500/10 backdrop-blur";
  const highlightLabelClass = isAurora ? "text-slate-600" : "text-cyan-300";
  const highlightValueClass = isAurora ? "text-slate-900" : "text-cyan-200";
  const stackPanelClasses = isAurora
    ? "rounded-3xl border border-sky-200/70 bg-white/90 p-6 text-left shadow-[0_28px_60px_rgba(59,130,246,0.15)]"
    : "rounded-3xl border border-cyan-400/30 bg-slate-950/80 p-6 text-left shadow-2xl shadow-cyan-500/20";
  const stackPanelTitle = isAurora ? "text-slate-700" : "text-cyan-300";
  const stackCellClasses = isAurora
    ? "rounded-2xl border border-sky-200/60 bg-white px-2 py-4 shadow-sky-200/30"
    : "rounded-2xl border border-white/10 bg-white/5 px-2 py-4 backdrop-blur-sm";
  const stackIconClass = isAurora ? "text-slate-600" : "text-cyan-300";
  const stackLabelClass = isAurora
    ? "mt-2 text-[8px] uppercase tracking-[0.08em] text-slate-600 leading-tight"
    : "mt-2 text-[8px] uppercase tracking-[0.08em] text-cyan-200 leading-tight";
  const stackTextClass = isAurora ? "text-slate-600" : "text-slate-300";
  const introCardClasses = isAurora
    ? "relative overflow-hidden rounded-3xl border border-sky-200/60 bg-white px-8 py-10 shadow-[0_32px_70px_rgba(59,130,246,0.18)] backdrop-blur-md"
    : "relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-white/5 px-8 py-10 backdrop-blur-xl";
  const glowGradient = isAurora
    ? "linear-gradient(120deg, rgba(59,130,246,0.16), rgba(236,233,254,0.55), rgba(14,165,233,0.12))"
    : "linear-gradient(120deg, rgba(56,189,248,0.18), rgba(32,211,238,0.08), rgba(129,140,248,0.15))";
  const availabilityCardClasses = isAurora
    ? "flex flex-col gap-3 rounded-3xl border border-sky-200/70 bg-white p-6 text-slate-700 shadow-[0_18px_45px_rgba(59,130,246,0.12)]"
    : "flex flex-col gap-3 rounded-3xl border border-cyan-400/25 bg-slate-950/70 p-6 text-slate-200 shadow-cyan-500/20";
  const availabilityTitleClass = isAurora ? "text-slate-700" : "text-cyan-200";
  const availabilitySubtitleClass = isAurora ? "text-slate-600" : "text-slate-400";
  const pulseColor = isAurora ? "bg-sky-300/40" : "bg-cyan-500/40";
  const objectiveCardClasses = isAurora
    ? "rounded-3xl border border-sky-200/70 bg-gradient-to-br from-white via-sky-50 to-white p-6 shadow-[0_24px_65px_rgba(59,130,246,0.16)]"
    : "rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 shadow-2xl shadow-cyan-500/15";
  const objectiveTextClass = isAurora ? "text-sm text-slate-600" : "text-sm text-slate-300";
  const headlineStyle = isAurora ? undefined : { textShadow: "0 18px 45px rgba(59,130,246,0.28)" };

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
      id="hero"
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
        <div className="absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute -bottom-16 right-1/3 h-64 w-64 rounded-full bg-purple-500/15 blur-3xl" />
      </div>

      <div className="layout-shell relative z-10 flex flex-col gap-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,420px)] lg:items-start">
          <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <Badge
              isAurora={isAurora}
              variant="soft"
              icon={<FiZap />}
            >
              {content.tagline}
            </Badge>
            <div className="w-full space-y-3 sm:space-y-4">
              <h1 className="space-y-1">
                <span
                  className={heroNameClass}
                  style={headlineStyle}
                >
                  {content.name}
                </span>
                <span
                  className={heroRoleClass}
                  style={headlineStyle}
                >
                  {content.headline[0]} <span>{content.headline[1]}</span> {content.headline[2]}
                </span>
              </h1>
              <p className={typewriterText}>
                <span className={typewriterAccent}>$</span>{" "}
                <span>{subtitle}</span>
                <span className={`ml-2 ${typewriterCursor}`}>▮</span>
              </p>
              <p className={`max-w-2xl text-center lg:text-left mx-auto lg:mx-0 ${introTextClass}`}>
                {content.introduction}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Button
                as="a"
                href="#contact"
                isAurora={isAurora}
                variant="primary"
                className="group ripple-effect"
                iconLeft={<FiTerminal className="transition-transform duration-300 group-hover:scale-110" />}
                iconRight={<FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />}
              >
                {content.ctaPrimary}
              </Button>
              <Button
                as="a"
                href="#experience"
                isAurora={isAurora}
                variant="secondary"
                className="hover:-translate-y-0.5"
              >
                {content.ctaSecondary}
              </Button>
              <Button
                as="a"
                href="/tutorial"
                isAurora={isAurora}
                variant="ghost"
                className="hover:-translate-y-0.5"
              >
                {isAurora ? "Page tuto" : "Tutorial page"}
              </Button>
            </div>
            <div className="mx-auto w-full max-w-xl sm:mx-0">
              <DownLoadCV />
            </div>
          </div>
          <div className="mt-16 flex flex-col items-center gap-6 lg:mt-0 lg:items-end lg:gap-8">
            <div className="lg:self-end lg:pb-2">
              <SocialBanger />
            </div>
            <div className="mt-6 flex w-full max-w-sm flex-col gap-6 lg:mt-0 lg:w-full lg:max-w-none lg:self-end lg:pt-8">
              <div className={availabilityCardClasses}>
                <div className="flex items-center gap-3 text-left">
                  <div className="relative">
                    <div className={`absolute inset-0 rounded-full ${pulseColor}`} />
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
                    <p className={`text-sm font-semibold ${availabilityTitleClass}`}>{content.availability}</p>
                    <p className={`text-xs ${availabilitySubtitleClass}`}>
                      {content.availabilityDescription}
                    </p>
                  </div>
                </div>
              </div>
              <div className={objectiveCardClasses}>
                <div className="space-y-3">
                  {content.objective.map((paragraph) => (
                    <div key={paragraph} className={`flex items-start gap-3 ${objectiveTextClass}`}>
                      <FiCheckCircle className={isAurora ? "mt-0.5 text-sky-500" : "mt-0.5 text-cyan-400"} />
                      <p>{paragraph}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className={introCardClasses}>
            <div className="pointer-events-none absolute inset-0 opacity-0">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: glowGradient
                }}
              />
            </div>
            <div className="relative z-10 grid gap-6 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,280px)] sm:items-center">
              <div className="space-y-4">
                <p className={narrativeText}>{content.narrative}</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {content.highlights.map((highlight) => (
                    <div
                      key={highlight.label}
                      className={highlightCardClasses}
                    >
                      <p className={`text-xs font-medium tracking-wide ${highlightLabelClass}`}>{highlight.label}</p>
                      <p className={`text-2xl font-semibold ${highlightValueClass}`}>{highlight.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={stackPanelClasses}>
                <p className={`text-xs uppercase tracking-[0.35em] ${stackPanelTitle}`}>{content.trustedStack}</p>
                <div className={`mt-4 grid grid-cols-3 gap-2 text-center ${stackTextClass}`}>
                  {techCapsules.map(({ Icon, label }) => (
                    <div key={label} className={stackCellClasses}>
                      <Icon className={`mx-auto text-lg ${stackIconClass}`} />
                      <p className={stackLabelClass}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Banner />
        </div>
      </div>
    </header>
  );
});

Hero.displayName = "Hero";
export default Hero;
