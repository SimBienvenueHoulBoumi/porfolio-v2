"use client";

import { FC } from "react";

import { ICON_MAP, IconKey } from "@/lib/icon-map";
import { SkillsContent } from "@/lib/content";
import { useTheme } from "@/context/ThemeContext";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import SectionHeader from "@/components/ui/SectionHeader";
import Pill from "@/components/ui/Pill";

const getIconComponent = (key: string) => ICON_MAP[key as IconKey];

type SkillsProps = {
  content: SkillsContent;
};

const Skills: FC<SkillsProps> = ({ content }) => {
  const { theme } = useTheme();
  const { ref: sectionRef, hasIntersected } = useIntersectionObserver();

  const isAurora = theme === "aurora";

  const coreCard = isAurora
    ? "border-emerald-200/70 bg-white text-slate-700 focus-visible:ring-emerald-400/50 focus-visible:ring-offset-white"
    : "border-emerald-500/25 bg-slate-950/75 text-gray-200 focus-visible:ring-emerald-400/50 focus-visible:ring-offset-slate-950";

  const loopCard = isAurora
    ? "border-emerald-200/70 bg-white/80 text-slate-700"
    : "border-emerald-500/25 bg-slate-950/70 text-gray-200";

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="skills"
      className={`skills-section relative overflow-hidden py-12 px-4 sm:px-8 scroll-mt-16 ${
        hasIntersected ? "scroll-reveal revealed" : "scroll-reveal"
      }`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.08]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(97,218,251,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(97,218,251,0.08) 1px, transparent 1px)",
              backgroundSize: "42px 42px"
            }}
          />
        </div>
        <div className="absolute -top-16 left-1/4 h-60 w-60 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute -bottom-12 right-1/3 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />
      </div>

      <div className="layout-shell relative z-10 flex flex-col gap-12">
        <SectionHeader
          isAurora={isAurora}
          title={content.title}
          description={content.subtitle}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.coreSkills.map((skill, index) => {
            const Icon = getIconComponent(skill.icon) ?? ICON_MAP.docker;
            return (
              <div
                key={skill.id}
                className={`relative flex h-full flex-col overflow-hidden rounded-3xl border px-4 py-5 sm:px-6 sm:py-7 backdrop-blur-xl transition-all duration-500 hover-lift hover-glow group ${coreCard} ${hasIntersected ? "animate-scale-in" : ""}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative z-10 space-y-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Icon className="text-xl transition-transform duration-300 group-hover:scale-125" />
                  </span>
                  <div className="space-y-3">
                    <h4 className="text-xl font-semibold">{skill.title}</h4>
                    <p className="text-sm leading-relaxed">{skill.description}</p>
                    <p className="text-sm font-medium opacity-80">{skill.impact}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.stack.map((stackItem) => (
                      <Pill key={stackItem} isAurora={isAurora} className="text-xs">
                        {stackItem}
                      </Pill>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.loops.map((loop, index) => {
            const Icon = getIconComponent(loop.icon) ?? ICON_MAP.activity;
            return (
              <div
                key={loop.title}
                className={`rounded-3xl border px-4 py-5 sm:px-6 sm:py-7 text-left transition-all duration-300 hover-lift group ${loopCard} ${hasIntersected ? "animate-scale-in" : ""}`}
                style={{ animationDelay: `${(content.coreSkills.length + index) * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 shadow-emerald-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="text-sm transition-transform duration-300 group-hover:scale-125" />
                  </span>
                  <p className="text-sm font-semibold">{loop.title}</p>
                </div>
                <p className={`mt-3 text-sm leading-relaxed ${isAurora ? "text-slate-600" : "text-gray-300"}`}>
                  {loop.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="space-y-3">
          <p className={`text-xs uppercase tracking-[0.35em] ${isAurora ? "text-slate-600" : "text-emerald-300"}`}>
            {content.secondaryTitle}
          </p>
          <div className="flex flex-wrap gap-2">
            {content.toolbox.map((tool) => {
              const Icon = getIconComponent(tool.icon) ?? ICON_MAP.terminal;
              const pill = (
                <Pill
                  key={tool.label}
                  isAurora={isAurora}
                  className="gap-2 text-xs hover:scale-105 hover:shadow-lg transition-transform duration-300"
                >
                  <Icon className="text-sm" />
                  {tool.label}
                </Pill>
              );

              return tool.href ? (
                <a
                  key={tool.label}
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-400"
                >
                  {pill}
                </a>
              ) : (
                pill
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
