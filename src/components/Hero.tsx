"use client";

import { forwardRef, useEffect, useState } from "react";
import {
  FaDocker,
  FaGitAlt,
  FaServer,
  FaCodeBranch,
  FaReact
} from "react-icons/fa";
import { SiKubernetes, SiSpringboot } from "react-icons/si";
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
  const heroNameClass = isAurora
    ? "heading-display block text-slate-900"
    : "heading-display block text-gradient-animated";
  const headlineClass = isAurora ? "heading-lg block text-slate-700" : "heading-lg block text-emerald-200";
  const heroRoleClass = headlineClass;
  const introTextClass = isAurora ? "body-base text-slate-700" : "body-base text-slate-300";
  const typewriterText = isAurora ? "mono-label text-slate-700" : "mono-label text-emerald-300";
  const typewriterAccent = isAurora ? "text-slate-900" : "text-emerald-400";
  const typewriterCursor = isAurora ? "text-slate-700" : "text-emerald-300";
  const highlightCardClasses = isAurora
    ? "relative overflow-hidden rounded-3xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50 px-6 py-5 text-left shadow-[0_20px_45px_rgba(15,23,42,0.08)] flex flex-col gap-3"
    : "relative overflow-hidden rounded-3xl border border-emerald-500/35 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 px-6 py-5 text-left shadow-[0_22px_50px_rgba(0,0,0,0.65)] flex flex-col gap-3";
  const highlightLabelClass = isAurora
    ? "text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-600/90"
    : "text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-300/90";
  const highlightValueClass = isAurora
    ? "text-xl sm:text-2xl leading-snug font-semibold text-slate-900"
    : "text-xl sm:text-2xl leading-snug font-semibold text-emerald-100";
  const stackPanelClasses = isAurora
    ? "rounded-3xl border border-emerald-200/70 bg-white/90 p-6 text-left shadow-[0_28px_60px_rgba(15,23,42,0.15)]"
    : "rounded-3xl border border-emerald-500/35 bg-slate-950 p-6 text-left shadow-2xl shadow-emerald-500/25";
  const stackPanelTitle = isAurora ? "text-slate-700" : "text-emerald-300";
  const stackCellClasses = isAurora
    ? "rounded-2xl border border-emerald-200/60 bg-white px-2 py-4 shadow-emerald-200/30"
    : "rounded-2xl border border-white/10 bg-slate-900 px-2 py-4 backdrop-blur-sm";
  const stackIconClass = isAurora ? "text-slate-600" : "text-emerald-300";
  const stackLabelClass = isAurora
    ? "mt-2 text-[8px] uppercase tracking-[0.08em] text-slate-600 leading-tight"
    : "mt-2 text-[8px] uppercase tracking-[0.08em] text-emerald-200 leading-tight";
  const stackTextClass = isAurora ? "text-slate-600" : "text-slate-300";
  const introCardClasses = isAurora
    ? "relative"
    : "relative";
  const glowGradient = isAurora
    ? "linear-gradient(120deg, rgba(34,197,94,0.16), rgba(240,253,244,0.7), rgba(34,197,94,0.12))"
    : "linear-gradient(120deg, rgba(15,23,42,0.9), rgba(6,78,59,0.6), rgba(15,23,42,0.9))";
  const availabilityCardClasses = isAurora
    ? "flex flex-col gap-3 rounded-3xl border border-emerald-200/70 bg-white p-6 text-slate-700 shadow-[0_18px_45px_rgba(15,23,42,0.12)]"
    : "flex flex-col gap-3 rounded-3xl border border-emerald-500/35 bg-slate-950/70 p-6 text-slate-200 shadow-emerald-500/25";
  const availabilityTitleClass = isAurora ? "text-slate-700" : "text-emerald-200";
  const availabilitySubtitleClass = isAurora ? "text-slate-600" : "text-slate-400";
  const pulseColor = isAurora ? "bg-emerald-300/40" : "bg-emerald-500/40";
  const objectiveCardClasses = isAurora
    ? "rounded-3xl border border-emerald-200/70 bg-white p-6 shadow-[0_24px_65px_rgba(15,23,42,0.16)]"
    : "rounded-3xl border border-emerald-500/35 bg-slate-950 p-6 shadow-2xl shadow-emerald-500/25";
  const objectiveTextClass = isAurora ? "text-sm text-slate-600" : "text-sm text-slate-300";
  const headlineStyle = undefined;

  const techCapsules = [
    { Icon: FaDocker, label: "Docker" },
    { Icon: SiKubernetes, label: "Kubernetes" },
    { Icon: SiSpringboot, label: "Spring Boot" },
    { Icon: FaReact, label: "React / Next.js" },
    { Icon: FaGitAlt, label: "Git" },
    { Icon: FaServer, label: "DevOps" }
  ];

  return (
    <header ref={ref} id="hero" className="hero-section relative overflow-hidden pt-16 pb-10 sm:py-20 scroll-mt-16">
      <div className="pointer-events-none absolute inset-0">
        {!isAurora && (
          <>
            <div className="absolute inset-0 opacity-40">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 20%, rgba(34,197,94,0.22), transparent 55%), radial-gradient(circle at 80% 15%, rgba(16,185,129,0.18), transparent 60%)"
                }}
              />
            </div>
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(16,185,129,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.25) 1px, transparent 1px)",
                  backgroundSize: "46px 46px"
                }}
              />
            </div>
            <div className="absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
            <div className="absolute -bottom-16 right-1/3 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
          </>
        )}
      </div>

      <div className="layout-shell relative z-10 flex flex-col gap-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,440px)] lg:gap-10 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,520px)]">
          <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <Badge
              isAurora={isAurora}
              variant="soft"
              icon={<FiZap />}
            >
              {content.tagline}
            </Badge>
            <div className="w-full space-y-3 sm:space-y-4">
              <h1 className="space-y-2 sm:space-y-1">
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
            </div>
            <div className="mx-auto w-full max-w-xl sm:mx-0">
              <DownLoadCV />
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center gap-6 lg:mt-0 lg:items-end lg:gap-3">
            <div className="lg:self-end lg:pb-2">
              <SocialBanger />
            </div>
            <div className="-mt-10 flex w-full flex-col lg:-mt-20 lg:self-end lg:pt-0">
              <div className={`${availabilityCardClasses} relative z-10 mb-4 lg:mb-6`}>
                <div className="flex items-center gap-3 text-left">
                  <div className="relative">
                    <div className={`absolute inset-0 rounded-full ${pulseColor}`} />
                    <div
                      className={`relative flex h-10 w-10 items-center justify-center rounded-full ${
                        isAurora
                          ? "bg-emerald-500 text-white shadow-emerald-200/40"
                          : "bg-emerald-500 text-slate-950"
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
              <div className={`${objectiveCardClasses} -mt-3 lg:-mt-5`}>
                    <div className="space-y-3">
                  {content.objective.map((paragraph) => (
                    <div key={paragraph} className={`flex items-start gap-3 ${objectiveTextClass}`}>
                      <FiCheckCircle className={isAurora ? "mt-0.5 text-emerald-500" : "mt-0.5 text-emerald-400"} />
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
            <div className="relative z-10 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,280px)] lg:items-center">
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {content.highlights.map((highlight) => (
                  <div
                    key={highlight.label}
                    className={highlightCardClasses}
                  >
                    <span className={highlightLabelClass}>{highlight.label}</span>
                    <p className={highlightValueClass}>{highlight.value}</p>
                  </div>
                ))}
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
