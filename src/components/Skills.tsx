"use client";

import { FC } from "react";
import { FaJava, FaReact, FaDatabase, FaDocker, FaLinux } from "react-icons/fa";
import { SiJenkins, SiAnsible, SiKubernetes, SiTypescript, SiTailwindcss, SiRedux } from "react-icons/si";
import { useLanguage } from "@/context/LanguageContext";

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
  const copy = SKILLS_COPY[language];

  return (
    <section id="skills" className="skills-section py-20 px-4 bg-gradient-to-b from-gray-900 via-slate-900 to-gray-950 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            {copy.title}
          </h3>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
        </div>

        {/* Main Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-orange-500/20 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <FaJava className="text-5xl mb-3 text-orange-500 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-lg text-white">Java / Spring Boot</p>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <FaReact className="text-5xl mb-3 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
              <p className="font-semibold text-lg text-white">React / JS</p>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <FaDatabase className="text-5xl mb-3 text-blue-400 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-lg text-white">PostgreSQL / MySQL</p>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-blue-400/20 rounded-xl p-6 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-400/20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <FaDocker className="text-5xl mb-3 text-blue-400 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-lg text-white">Docker / CI/CD</p>
            </div>
          </div>
        </div>

        {/* Secondary Skills Tags */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent blur-xl" />
          <div className="relative bg-gradient-to-br from-gray-900/70 via-gray-900/60 to-gray-900/40 backdrop-blur-md border border-cyan-400/30 rounded-2xl p-8 shadow-xl shadow-cyan-500/15">
            <h4 className="text-center text-lg font-semibold text-cyan-300 mb-6 drop-shadow-sm">{copy.secondaryTitle}</h4>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="group px-4 py-2 bg-gradient-to-r from-purple-700/70 to-purple-500/70 border border-purple-400/60 rounded-full text-sm text-purple-100 hover:border-purple-300 hover:scale-105 transition-all duration-200 cursor-default flex items-center gap-2 shadow-md shadow-purple-500/20">
                <SiRedux className="text-purple-200" />
                Redux
              </span>
              <span className="group px-4 py-2 bg-gradient-to-r from-cyan-600/70 to-cyan-400/70 border border-cyan-300/60 rounded-full text-sm text-cyan-900 hover:border-cyan-200 hover:scale-105 transition-all duration-200 cursor-default flex items-center gap-2 shadow-md shadow-cyan-500/20">
                <SiTailwindcss className="text-cyan-950" />
                TailwindCSS
              </span>
              <span className="group px-4 py-2 bg-gradient-to-r from-blue-600/70 to-indigo-600/70 border border-blue-400/60 rounded-full text-sm text-blue-50 hover:border-blue-300 hover:scale-105 transition-all duration-200 cursor-default flex items-center gap-2 shadow-md shadow-blue-500/25">
                <SiTypescript className="text-blue-200" />
                TypeScript
              </span>
              <span className="group px-4 py-2 bg-gradient-to-r from-slate-700/70 to-slate-900/70 border border-slate-500/60 rounded-full text-sm text-slate-200 hover:border-slate-300 hover:scale-105 transition-all duration-200 cursor-default flex items-center gap-2 shadow-md shadow-slate-900/30">
                <FaLinux className="text-amber-300" />
                Linux
              </span>
              <span className="group px-4 py-2 bg-gradient-to-r from-amber-500/80 to-orange-500/80 border border-amber-300/70 rounded-full text-sm text-amber-950 hover:border-amber-200 hover:scale-105 transition-all duration-200 cursor-default flex items-center gap-2 shadow-md shadow-amber-300/35">
                <SiAnsible className="text-rose-200" />
                Ansible
              </span>
              <span className="group px-4 py-2 bg-gradient-to-r from-slate-800/70 to-slate-950/70 border border-slate-600/50 rounded-full text-sm text-slate-100 hover:border-slate-300 hover:scale-105 transition-all duration-200 cursor-default flex items-center gap-2 shadow-md shadow-slate-900/30">
                <SiJenkins className="text-rose-200" />
                Jenkins
              </span>
              <span className="group px-4 py-2 bg-gradient-to-r from-sky-500/70 to-blue-500/70 border border-sky-300/60 rounded-full text-sm text-sky-50 hover:border-sky-200 hover:scale-105 transition-all duration-200 cursor-default flex items-center gap-2 shadow-md shadow-sky-500/25">
                <SiKubernetes className="text-blue-100" />
                Kubernetes
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
