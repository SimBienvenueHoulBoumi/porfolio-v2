"use client";

import { FC } from "react";
import { FaJava, FaReact, FaDatabase, FaDocker, FaLinux } from "react-icons/fa";
import { SiJenkins, SiAnsible, SiKubernetes, SiTypescript, SiTailwindcss, SiRedux } from "react-icons/si";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const SKILLS_COPY = {
  fr: {
    title: "Compétences",
    secondaryTitle: "Technologies & Outils"
  },
  en: {
    title: "Skills",
    secondaryTitle: "Technologies & Tools"
  }
} as const;

const Skills: FC = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isAurora = theme === "aurora";
  const copy = SKILLS_COPY[language];

  const sectionClasses = isAurora
    ? "skills-section relative overflow-hidden py-20 px-4 bg-gradient-to-b from-slate-50 via-sky-50/70 to-white"
    : "skills-section relative overflow-hidden py-20 px-4 bg-gradient-to-b from-gray-900 via-slate-900 to-gray-950";

  const gridColor = isAurora ? "rgba(37, 99, 235, 0.05)" : "rgba(34, 211, 238, 0.1)";

  const baseCardClasses = isAurora
    ? "group/skill relative bg-white/85 backdrop-blur-md rounded-xl p-6 transition-all duration-300 cursor-pointer shadow-lg hover:-translate-y-1"
    : "group/skill relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 cursor-pointer hover:scale-105 shadow-lg shadow-black/30";

  const overlayBase =
    "absolute inset-0 rounded-xl opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300";

  const auroraMainCardClasses =
    "border border-sky-200 hover:border-sky-300 shadow-sky-200/40 hover:shadow-sky-200/70";
  const auroraMainOverlayClasses = "bg-gradient-to-br from-sky-200/35 via-sky-100/20 to-transparent";
  const auroraMainIconClass = "text-sky-600";

  const mainSkills = [
    {
      icon: FaJava,
      title: "Java / Spring Boot",
      darkIconClass: "text-orange-500",
      darkCardClasses: "border border-orange-500/20 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/20",
      darkOverlayClasses: "bg-gradient-to-br from-orange-500/5 to-transparent"
    },
    {
      icon: FaReact,
      title: "React / JS",
      darkIconClass: "text-cyan-400",
      darkCardClasses: "border border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/20",
      darkOverlayClasses: "bg-gradient-to-br from-cyan-500/5 to-transparent"
    },
    {
      icon: FaDatabase,
      title: "PostgreSQL / MySQL",
      darkIconClass: "text-blue-400",
      darkCardClasses: "border border-blue-500/20 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/20",
      darkOverlayClasses: "bg-gradient-to-br from-blue-500/5 to-transparent"
    },
    {
      icon: FaDocker,
      title: "Docker / CI/CD",
      darkIconClass: "text-blue-400",
      darkCardClasses: "border border-blue-400/20 hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-400/20",
      darkOverlayClasses: "bg-gradient-to-br from-blue-400/5 to-transparent"
    }
  ] as const;

  const secondaryHighlight = isAurora
    ? "absolute inset-0 bg-gradient-to-r from-transparent via-sky-300/12 to-transparent blur-2xl"
    : "absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent blur-xl";

  const secondaryContainerClasses = isAurora
    ? "relative bg-white/90 backdrop-blur-md border border-sky-200 rounded-2xl p-8 shadow-xl shadow-sky-200/50"
    : "relative bg-gradient-to-br from-gray-900/70 via-gray-900/60 to-gray-900/40 backdrop-blur-md border border-cyan-400/30 rounded-2xl p-8 shadow-xl shadow-cyan-500/15";

  const secondaryTitleClass = isAurora ? "text-gray-600" : "text-cyan-300";

  const auroraSecondaryClasses =
    "group px-4 py-2 bg-white border border-sky-200 rounded-full text-sm text-sky-700 hover:border-sky-300 hover:bg-sky-50 hover:-translate-y-1 transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-md shadow-sky-200/50";
  const auroraSecondaryIconClass = "text-sky-600";

  const secondarySkills = [
    {
      icon: SiRedux,
      label: "Redux",
      classes: isAurora
        ? auroraSecondaryClasses
        : "group px-4 py-2 bg-gradient-to-r from-purple-700/70 to-purple-500/70 border border-purple-400/60 rounded-full text-sm text-purple-100 hover:border-purple-300 hover:scale-105 transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-md shadow-purple-500/20",
      iconClass: isAurora ? auroraSecondaryIconClass : "text-purple-200"
    },
    {
      icon: SiTailwindcss,
      label: "TailwindCSS",
      classes: isAurora
        ? auroraSecondaryClasses
        : "group px-4 py-2 bg-gradient-to-r from-cyan-600/70 to-cyan-400/70 border border-cyan-300/60 rounded-full text-sm text-cyan-900 hover:border-cyan-200 hover:scale-105 transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-md shadow-cyan-500/20",
      iconClass: isAurora ? auroraSecondaryIconClass : "text-cyan-950"
    },
    {
      icon: SiTypescript,
      label: "TypeScript",
      classes: isAurora
        ? auroraSecondaryClasses
        : "group px-4 py-2 bg-gradient-to-r from-blue-600/70 to-indigo-600/70 border border-blue-400/60 rounded-full text-sm text-blue-50 hover:border-blue-300 hover:scale-105 transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-md shadow-blue-500/25",
      iconClass: isAurora ? auroraSecondaryIconClass : "text-blue-200"
    },
    {
      icon: FaLinux,
      label: "Linux",
      classes: isAurora
        ? auroraSecondaryClasses
        : "group px-4 py-2 bg-gradient-to-r from-slate-700/70 to-slate-900/70 border border-slate-500/60 rounded-full text-sm text-slate-200 hover:border-slate-300 hover:scale-105 transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-md shadow-slate-900/30",
      iconClass: isAurora ? auroraSecondaryIconClass : "text-amber-300"
    },
    {
      icon: SiAnsible,
      label: "Ansible",
      classes: isAurora
        ? auroraSecondaryClasses
        : "group px-4 py-2 bg-gradient-to-r from-amber-500/80 to-orange-500/80 border border-amber-300/70 rounded-full text-sm text-amber-950 hover:border-amber-200 hover:scale-105 transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-md shadow-amber-300/35",
      iconClass: isAurora ? auroraSecondaryIconClass : "text-rose-200"
    },
    {
      icon: SiJenkins,
      label: "Jenkins",
      classes: isAurora
        ? auroraSecondaryClasses
        : "group px-4 py-2 bg-gradient-to-r from-slate-800/70 to-slate-950/70 border border-slate-600/50 rounded-full text-sm text-slate-100 hover:border-slate-300 hover:scale-105 transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-md shadow-slate-900/30",
      iconClass: isAurora ? auroraSecondaryIconClass : "text-rose-200"
    },
    {
      icon: SiKubernetes,
      label: "Kubernetes",
      classes: isAurora
        ? auroraSecondaryClasses
        : "group px-4 py-2 bg-gradient-to-r from-sky-500/70 to-blue-500/70 border border-sky-300/60 rounded-full text-sm text-sky-50 hover:border-sky-200 hover:scale-105 transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-md shadow-sky-500/25",
      iconClass: isAurora ? auroraSecondaryIconClass : "text-blue-100"
    }
  ] as const;

  const sectionTitleClass = isAurora
    ? "text-4xl font-bold mb-3 text-gray-700"
    : "text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent";

  return (
    <section id="skills" className={sectionClasses}>
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px),
                         linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h3 className={sectionTitleClass}>
            {copy.title}
          </h3>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {mainSkills.map(({ icon: Icon, title, darkCardClasses, darkOverlayClasses, darkIconClass }) => {
            const cardClasses = isAurora ? auroraMainCardClasses : darkCardClasses;
            const overlayClasses = isAurora ? auroraMainOverlayClasses : darkOverlayClasses;
            const iconClass = isAurora ? auroraMainIconClass : darkIconClass;

            return (
              <div key={title} className={`${baseCardClasses} ${cardClasses}`}>
                <div className={`${overlayBase} ${overlayClasses}`} />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <Icon className={`text-5xl mb-3 ${iconClass}`} />
                  <p className={`font-semibold text-lg ${isAurora ? "text-slate-900" : "text-white"}`}>{title}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative">
          <div className={secondaryHighlight} />
          <div className={secondaryContainerClasses}>
            <h4 className={`text-center text-lg font-semibold mb-6 drop-shadow-sm ${secondaryTitleClass}`}>
              {copy.secondaryTitle}
            </h4>
            <div className="flex flex-wrap justify-center gap-3">
              {secondarySkills.map(({ icon: Icon, label, classes, iconClass }) => (
                <span key={label} className={classes}>
                  <Icon className={iconClass} />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
