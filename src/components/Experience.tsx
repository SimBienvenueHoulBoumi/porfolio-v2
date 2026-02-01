"use client";

import { FC, ReactNode } from "react";
import {
  FaBuilding,
  FaUsers,
  FaCalendar,
  FaMicrochip,
  FaArrowRight
} from "react-icons/fa";

import { ExperienceContent } from "@/lib/content";
import { useTheme } from "@/context/ThemeContext";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import InfoItem from "@/components/ui/InfoItem";

const emphasize = (text: string, className: string): ReactNode[] => {
  const segments = text.split("**");
  return segments.map((segment, index) =>
    index % 2 === 1 ? (
      <span key={index} className={className}>
        {segment}
      </span>
    ) : (
      <span key={index}>{segment}</span>
    )
  );
};

type ExperienceProps = {
  content: ExperienceContent;
};

const Experience: FC<ExperienceProps> = ({ content }) => {
  const { theme } = useTheme();
  const { ref: sectionRef, hasIntersected } = useIntersectionObserver();
  const isAurora = theme === "aurora";

  const sectionLabel = isAurora
    ? "text-xs uppercase tracking-[0.35em] text-slate-500"
    : "text-xs uppercase tracking-[0.35em] text-cyan-300";
  const isFrench = content.title.toLowerCase().includes("exp");
  const highlightHeadingText = isFrench ? "Résultats clés" : "Key outcomes";
  const strategyCardClasses = isAurora
    ? "grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_40px_rgba(148,163,184,0.25)] sm:grid-cols-2"
    : "grid gap-4 rounded-2xl border border-cyan-500/20 bg-slate-950/40 p-4 backdrop-blur sm:grid-cols-2";

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="experience"
      className={`experience-section relative overflow-hidden py-12 px-4 sm:px-8 scroll-mt-16 ${
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
              backgroundSize: "44px 44px"
            }}
          />
        </div>
        <div className="absolute -top-20 left-1/3 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-16 right-1/4 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      <div className="layout-shell relative z-10 flex flex-col gap-12">
        <SectionHeader
          isAurora={isAurora}
          title={content.title}
          description={content.subtitle}
        >
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono uppercase tracking-[0.35em] text-cyan-400">
            <span>{content.experiences[0]?.date.split("–")[0]?.trim() ?? ""}</span>
            <FaArrowRight className="text-cyan-500" />
            <span>{content.experiences.at(-1)?.date.split("–").pop()?.trim() ?? ""}</span>
          </div>
        </SectionHeader>

        <div className="relative">
          <div
            className={`absolute left-6 top-0 hidden h-full w-[3px] -translate-x-1/2 rounded-full blur-sm sm:block ${
              isAurora ? "bg-cyan-300/50" : "bg-cyan-500/50"
            }`}
          />
          <div className="space-y-10 sm:pl-4">
            {content.experiences.map((experience, index) => (
              <Card
                as="article"
                key={`${experience.company.label}-${experience.role}`}
                isAurora={isAurora}
                tone="soft"
                className={`relative px-6 py-7 backdrop-blur-xl transition-all duration-500 hover-lift hover-glow group sm:px-10 ${
                  hasIntersected ? "animate-scale-in" : ""
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div
                  className={`absolute -left-6 top-10 hidden h-4 w-4 -translate-x-1/2 rounded-full transition-all duration-300 group-hover:scale-150 group-hover:shadow-lg sm:block ${
                    isAurora
                      ? "border border-cyan-300 bg-cyan-400/60 group-hover:bg-cyan-500"
                      : "border border-cyan-400 bg-cyan-500/50 group-hover:bg-cyan-400"
                  }`}
                />

                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-3">
                      <FaBuilding className="text-cyan-500" />
                      <div className="flex flex-col">
                        <span
                          className={`text-sm font-semibold ${
                            isAurora ? "text-slate-800" : "text-white"
                          }`}
                        >
                          {experience.company.label}
                        </span>
                        <span
                          className={`text-xs ${
                            isAurora ? "text-slate-500" : "text-gray-300"
                          }`}
                        >
                          {experience.company.tooltip}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaUsers className="text-cyan-500" />
                      <div className="flex flex-col">
                        <span
                          className={`text-sm font-semibold ${
                            isAurora ? "text-slate-800" : "text-white"
                          }`}
                        >
                          {experience.team.label}
                        </span>
                        <span
                          className={`text-xs ${
                            isAurora ? "text-slate-500" : "text-gray-300"
                          }`}
                        >
                          {experience.team.tooltip}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <InfoItem
                      icon={<FaMicrochip />}
                      label="Stack"
                      value={experience.tech.label}
                      isAurora={isAurora}
                    />
                    <InfoItem
                      icon={<FaCalendar />}
                      label="Période"
                      value={experience.date}
                      isAurora={isAurora}
                    />
                    <InfoItem
                      icon={<FaUsers />}
                      label="Rôle"
                      value={experience.role}
                      isAurora={isAurora}
                    />
                  </div>

                  <div className="space-y-2">
                    <p className={sectionLabel}>{highlightHeadingText}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {experience.highlights.map((highlight) => (
                        <Badge
                          key={highlight.label}
                          isAurora={isAurora}
                          variant="soft"
                          uppercase={false}
                          className="tracking-normal text-[11px]"
                        >
                          <span className="font-semibold">{highlight.label}</span>
                          <span className="ml-1 opacity-80">{highlight.value}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p
                      className={`text-sm font-medium leading-relaxed ${
                        isAurora ? "text-slate-700" : "text-gray-100"
                      }`}
                    >
                      {experience.impact}
                    </p>
                    <div className={strategyCardClasses}>
                      <div>
                        <p className={sectionLabel}>{isFrench ? "Défis" : "Challenges"}</p>
                        <div className="mt-2 space-y-3">
                          {experience.bullets.slice(0, 2).map((bullet, index) => (
                            <p
                              key={`challenge-${index}`}
                              className={`text-sm leading-relaxed ${
                                isAurora ? "text-slate-600" : "text-slate-300"
                              }`}
                            >
                              {emphasize(
                                bullet,
                                isAurora ? "text-cyan-600 font-semibold" : "text-cyan-300 font-semibold"
                              )}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className={sectionLabel}>{isFrench ? "Actions" : "Actions"}</p>
                        <div className="mt-2 space-y-3">
                          {experience.bullets.slice(2).map((bullet, index) => (
                            <p
                              key={`action-${index}`}
                              className={`text-sm leading-relaxed ${
                                isAurora ? "text-slate-600" : "text-slate-300"
                              }`}
                            >
                              {emphasize(
                                bullet,
                                isAurora ? "text-cyan-600 font-semibold" : "text-cyan-300 font-semibold"
                              )}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
