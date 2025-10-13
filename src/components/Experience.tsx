"use client";

import { FC, ReactNode } from "react";
import {
  FaBuilding,
  FaUsers,
  FaCalendar,
  FaMicrochip,
  FaChevronRight
} from "react-icons/fa";

import { ExperienceContent, ExperienceItem } from "@/lib/content";
import { useTheme } from "@/context/ThemeContext";

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

const DetailItem: FC<{ icon: ReactNode; label: string; value: string; isAurora: boolean }> = ({
  icon,
  label,
  value,
  isAurora
}) => (
  <div
    className={`flex items-center gap-2 text-sm ${
      isAurora ? "text-slate-600" : "text-gray-200"
    }`}
  >
    <span
      className={`flex h-8 w-8 items-center justify-center rounded-2xl border ${
        isAurora ? "border-sky-200/70 bg-white text-slate-700" : "border-cyan-500/40 bg-slate-950/70 text-cyan-200"
      }`}
    >
      {icon}
    </span>
    <div className="flex flex-col leading-tight">
      <span className="text-xs uppercase tracking-[0.35em] opacity-70">{label}</span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  </div>
);

type ExperienceProps = {
  content: ExperienceContent;
};

const Experience: FC<ExperienceProps> = ({ content }) => {
  const { theme } = useTheme();
  const isAurora = theme === "aurora";

  const sectionBg = isAurora
    ? "from-slate-50 via-white to-sky-100"
    : "from-slate-950 via-slate-900 to-black";

  const headingClass = isAurora
    ? "text-3xl font-bold sm:text-4xl text-slate-900"
    : "text-3xl font-bold sm:text-4xl text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text";

  const cardClasses = isAurora
    ? "border-sky-200/70 bg-white text-slate-700 focus-visible:ring-sky-400/50 focus-visible:ring-offset-white"
    : "border-cyan-500/25 bg-slate-950/75 text-gray-200 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-slate-950";

  const highlightBadge = isAurora
    ? "rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-700"
    : "rounded-full bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-200";

  const renderBullets = (item: ExperienceItem) => (
    <ul className="space-y-3 text-sm leading-relaxed">
      {item.bullets.map((bullet, index) => (
        <li key={index} className="flex items-start gap-3">
          <FaChevronRight className={`mt-1 text-xs ${isAurora ? "text-cyan-500" : "text-cyan-400"}`} />
          <span className={isAurora ? "text-slate-600" : "text-slate-300"}>
            {emphasize(bullet, isAurora ? "text-cyan-600 font-semibold" : "text-cyan-300 font-semibold")}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      id="experience"
      className={`experience-section relative overflow-hidden bg-gradient-to-br ${sectionBg} py-24 px-4 sm:px-8`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.08]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(14,165,233,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.08) 1px, transparent 1px)",
              backgroundSize: "44px 44px"
            }}
          />
        </div>
        <div className="absolute -top-20 left-1/3 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-16 right-1/4 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-12">
        <div className="text-center space-y-4">
          <h3 className={headingClass}>
            {content.title}
          </h3>
          <p className={`mx-auto max-w-3xl text-sm sm:text-base ${isAurora ? "text-slate-600" : "text-gray-300"}`}>
            {content.subtitle}
          </p>
        </div>

        <div className="relative">
          <div className={`absolute left-6 top-0 hidden h-full w-[3px] -translate-x-1/2 rounded-full blur-sm sm:block ${isAurora ? "bg-gradient-to-b from-sky-400/60 via-sky-300/10 to-transparent" : "bg-gradient-to-b from-cyan-500/60 via-cyan-500/10 to-transparent"}`} />
          <div className="space-y-10 sm:pl-4">
            {content.experiences.map((experience) => (
              <article
                key={`${experience.company.label}-${experience.role}`}
                className={`relative rounded-3xl border px-6 py-7 backdrop-blur-xl transition-all duration-300 sm:pl-16 ${cardClasses}`}
              >
                <div className={`absolute -left-6 top-10 hidden h-4 w-4 -translate-x-1/2 rounded-full sm:block ${isAurora ? "border border-sky-300 bg-sky-400/60" : "border border-cyan-400 bg-cyan-500/50"}`} />

                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-3">
                      <FaBuilding className="text-cyan-500" />
                      <div className="flex flex-col">
                        <span className={`text-sm font-semibold ${isAurora ? "text-slate-800" : "text-white"}`}>{experience.company.label}</span>
                        <span className={`text-xs ${isAurora ? "text-slate-500" : "text-gray-300"}`}>{experience.company.tooltip}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaUsers className="text-cyan-500" />
                      <div className="flex flex-col">
                        <span className={`text-sm font-semibold ${isAurora ? "text-slate-800" : "text-white"}`}>{experience.team.label}</span>
                        <span className={`text-xs ${isAurora ? "text-slate-500" : "text-gray-300"}`}>{experience.team.tooltip}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <DetailItem icon={<FaMicrochip />} label="Stack" value={experience.tech.label} isAurora={isAurora} />
                    <DetailItem icon={<FaCalendar />} label="Période" value={experience.date} isAurora={isAurora} />
                    <DetailItem icon={<FaUsers />} label="Rôle" value={experience.role} isAurora={isAurora} />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {experience.highlights.map((highlight) => (
                      <span key={highlight.label} className={highlightBadge}>
                        {highlight.label} · {highlight.value}
                      </span>
                    ))}
                  </div>

                  <p className={`text-sm font-medium ${isAurora ? "text-slate-700" : "text-gray-100"}`}>
                    {experience.impact}
                  </p>

                  {renderBullets(experience)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
