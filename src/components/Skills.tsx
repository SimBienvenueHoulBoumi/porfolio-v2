"use client";

import { FC } from "react";

import { ICON_MAP, IconKey } from "@/lib/icon-map";
import { SkillsContent } from "@/lib/content";
import { useTheme } from "@/context/ThemeContext";

const getIconComponent = (key: string) => ICON_MAP[key as IconKey];

type SkillsProps = {
  content: SkillsContent;
};

const Skills: FC<SkillsProps> = ({ content }) => {
  const { theme } = useTheme();

  const isAurora = theme === "aurora";

  const sectionBg = isAurora
    ? "from-slate-50 via-white to-sky-100"
    : "from-slate-950 via-slate-900 to-black";

  const coreCard = isAurora
    ? "border-sky-200/70 bg-white text-slate-700 focus-visible:ring-sky-400/50 focus-visible:ring-offset-white"
    : "border-cyan-500/25 bg-slate-950/75 text-gray-200 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-slate-950";

  const loopCard = isAurora
    ? "border-sky-200/70 bg-white/80 text-slate-700"
    : "border-cyan-500/25 bg-slate-950/70 text-gray-200";

  const toolPill = isAurora
    ? "bg-white text-slate-700 border border-sky-200 focus-visible:ring-sky-300 focus-visible:ring-offset-white"
    : "bg-slate-950 text-cyan-200 border border-cyan-500/40 focus-visible:ring-cyan-400 focus-visible:ring-offset-slate-950";
  const headingClass = isAurora
    ? "text-3xl font-bold sm:text-4xl text-slate-900"
    : "text-3xl font-bold sm:text-4xl text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text";

  return (
    <section
      id="skills"
      className={`skills-section relative overflow-hidden bg-gradient-to-br ${sectionBg} py-24 px-4 sm:px-8`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.08]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(14,165,233,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.08) 1px, transparent 1px)",
              backgroundSize: "42px 42px"
            }}
          />
        </div>
        <div className="absolute -top-16 left-1/4 h-60 w-60 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute -bottom-12 right-1/3 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-12">
        <div className="text-center space-y-4">
          <h3 className={headingClass}>{content.title}</h3>
          <p className={`mx-auto max-w-3xl text-sm sm:text-base ${isAurora ? "text-slate-600" : "text-gray-300"}`}>
            {content.subtitle}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {content.coreSkills.map((skill) => {
            const Icon = getIconComponent(skill.icon) ?? ICON_MAP.docker;
            return (
              <div
                key={skill.id}
                className={`relative flex h-full flex-col overflow-hidden rounded-3xl border px-6 py-7 backdrop-blur-xl transition-all duration-300 ${coreCard}`}
              >
                <div className="relative z-10 space-y-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/30">
                    <Icon className="text-xl" />
                  </span>
                  <div className="space-y-3">
                    <h4 className="text-xl font-semibold">{skill.title}</h4>
                    <p className="text-sm leading-relaxed">{skill.description}</p>
                    <p className="text-sm font-medium opacity-80">{skill.impact}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.25em] text-cyan-400">
                    {skill.stack.map((stackItem) => (
                      <span
                        key={stackItem}
                        className={`rounded-full px-3 py-1 ${
                          isAurora ? "bg-slate-100 text-slate-700" : "bg-cyan-500/10 text-cyan-200"
                        }`}
                      >
                        {stackItem}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {content.loops.map((loop) => {
            const Icon = getIconComponent(loop.icon) ?? ICON_MAP.activity;
            return (
              <div
                key={loop.title}
                className={`rounded-3xl border px-6 py-7 text-left transition-colors ${loopCard}`}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 text-slate-950 shadow-cyan-500/30">
                    <Icon className="text-sm" />
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
          <p className={`text-xs uppercase tracking-[0.35em] ${isAurora ? "text-slate-600" : "text-cyan-300"}`}>
            {content.secondaryTitle}
          </p>
          <div className="flex flex-wrap gap-2">
            {content.toolbox.map((tool) => {
              const Icon = getIconComponent(tool.icon) ?? ICON_MAP.terminal;
              const pill = (
                <span
                  key={tool.label}
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] transition-colors ${toolPill}`}
                >
                  <Icon className="text-sm" />
                  {tool.label}
                </span>
              );

              return tool.href ? (
                <a
                  key={tool.label}
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-400"
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
