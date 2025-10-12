"use client";

import { FC } from "react";
import {
  FaDocker,
  FaReact,
  FaJava,
  FaDatabase,
  FaCloud,
  FaTerminal
} from "react-icons/fa";
import {
  SiKubernetes,
  SiJenkins,
  SiAnsible,
  SiTypescript,
  SiRedux,
  SiTailwindcss
} from "react-icons/si";
import { FiActivity, FiLayers, FiTrendingUp } from "react-icons/fi";

import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

type CoreSkill = {
  id: string;
  icon: FC<{ className?: string }>;
  title: Record<"fr" | "en", string>;
  description: Record<"fr" | "en", string>;
  impact: Record<"fr" | "en", string>;
  stack: string[];
};

type Tool = {
  label: string;
  href?: string;
  icon: FC<{ className?: string }>;
};

const CORE_SKILLS: readonly CoreSkill[] = [
  {
    id: "delivery",
    icon: FaDocker,
    title: {
      fr: "Delivery automatisé",
      en: "Automated delivery"
    },
    description: {
      fr: "Pipelines CI/CD versionnés, tests orchestrés, feature flags et stratégies de déploiement progressif.",
      en: "Versioned CI/CD pipelines, orchestrated testing, feature flags, and progressive deploy strategies."
    },
    impact: {
      fr: "Livrer n'importe quelle branche en moins de 15 minutes, sans impacter la prod.",
      en: "Ship any branch to production in under 15 minutes without disrupting live traffic."
    },
    stack: ["GitOps", "Jenkins", "GitHub Actions", "ArgoCD", "Docker"]
  },
  {
    id: "platform",
    icon: FaCloud,
    title: {
      fr: "Plateformes cloud natives",
      en: "Cloud native platforms"
    },
    description: {
      fr: "IaC modulaire, observabilité proactive et gouvernance multi-environnements pour microservices.",
      en: "Modular IaC, proactive observability, and multi-environment governance for microservices."
    },
    impact: {
      fr: "Résilience et sécurité intégrées, coûts optimisés et visibilité en temps réel.",
      en: "Built-in resilience and security, optimized costs, and real-time situational awareness."
    },
    stack: ["Kubernetes", "Datadog", "Cloud Governance"]
  },
  {
    id: "experience",
    icon: FaReact,
    title: {
      fr: "Expérience front & APIs",
      en: "Front-end & APIs"
    },
    description: {
      fr: "Interfaces React/Next.js data-driven, APIs Spring Boot sécurisées et documentation orientée produit.",
      en: "Data-driven React/Next.js interfaces, secure Spring Boot APIs, and product-driven documentation."
    },
    impact: {
      fr: "UX réactive, dette réduite, code maintenable et prête pour la scalabilité.",
      en: "Responsive UX, reduced debt, maintainable code, and scalability-ready foundations."
    },
    stack: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "Redis"]
  }
] as const;

const TOOLBOX: readonly Tool[] = [
  { label: "TypeScript", href: "https://www.typescriptlang.org", icon: SiTypescript },
  { label: "Redux Toolkit", href: "https://redux.js.org", icon: SiRedux },
  { label: "Tailwind CSS", href: "https://tailwindcss.com", icon: SiTailwindcss },
  { label: "Jenkins", href: "https://www.jenkins.io", icon: SiJenkins },
  { label: "Ansible", href: "https://www.ansible.com", icon: SiAnsible },
  { label: "Kubernetes", href: "https://kubernetes.io", icon: SiKubernetes },
  { label: "Java / Spring", href: "https://spring.io/projects/spring-boot", icon: FaJava },
  { label: "SQL Engines", icon: FaDatabase },
  { label: "Linux Tooling", icon: FaTerminal }
] as const;

const SKILLS_COPY = {
  fr: {
    title: "Compétences néon",
    subtitle:
      "Un stack orienté delivery contrôlé : IaC, pipelines, front data-driven et observabilité temps réel.",
    secondaryTitle: "Toolbelt opérationnelle",
    loopsTitle: "Boucles de feedback",
    loops: [
      {
        icon: FiActivity,
        title: "Observabilité proactive",
        description:
          "Dashboards centrés produit, alerting structuré, corrélation traces/logs pour agir avant l’incident."
      },
      {
        icon: FiLayers,
        title: "Architecture modulable",
        description:
          "Services conteneurisés, contrats d’API versionnés et feature toggles pour livrer sans freeze."
      },
      {
        icon: FiTrendingUp,
        title: "Value stream tracking",
        description:
          "KPIs pipeline, cycle time et DORA metrics pour prédire et stabiliser le delivery."
      }
    ]
  },
  en: {
    title: "Neon skillset",
    subtitle:
      "A stack engineered for controlled delivery: IaC, pipelines, data-driven front-end, and real-time observability.",
    secondaryTitle: "Operational toolbelt",
    loopsTitle: "Feedback loops",
    loops: [
      {
        icon: FiActivity,
        title: "Proactive observability",
        description:
          "Product-centric dashboards, structured alerting, and trace/log correlation to act before incidents."
      },
      {
        icon: FiLayers,
        title: "Composable architecture",
        description:
          "Containerized services, versioned API contracts, and feature toggles to ship without freeze."
      },
      {
        icon: FiTrendingUp,
        title: "Value stream tracking",
        description:
          "Pipeline KPIs, cycle times, and DORA metrics keeping delivery predictable and steady."
      }
    ]
  }
} as const;

const Skills: FC = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  const copy = SKILLS_COPY[language];
  const isAurora = theme === "aurora";

  const sectionBg = isAurora
    ? "from-slate-50 via-white to-sky-100"
    : "from-slate-950 via-slate-900 to-black";

  const coreCard = isAurora
    ? "border-sky-200/70 bg-white/85 text-slate-700 hover:border-sky-300/80 hover:bg-white/95 focus-visible:ring-sky-400/50 focus-visible:ring-offset-white"
    : "border-cyan-500/25 bg-slate-950/75 text-gray-200 hover:border-cyan-400/60 hover:bg-slate-950/90 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-slate-950";

  const loopCard = isAurora
    ? "border-sky-200/70 bg-white/80 text-slate-700"
    : "border-cyan-500/25 bg-slate-950/70 text-gray-200";

  const toolPill = isAurora
    ? "bg-white text-sky-700 border border-sky-200 hover:border-sky-300 hover:bg-sky-50 focus-visible:ring-sky-300 focus-visible:ring-offset-white"
    : "bg-slate-950 text-cyan-200 border border-cyan-500/40 hover:border-cyan-300 hover:bg-cyan-500/10 focus-visible:ring-cyan-400 focus-visible:ring-offset-slate-950";

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

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12">
        <div className="text-center space-y-4">
          <h3
            className={`text-3xl font-bold sm:text-4xl ${
              isAurora
                ? "text-transparent bg-gradient-to-r from-slate-900 via-sky-700 to-purple-700 bg-clip-text"
                : "text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text"
            }`}
          >
            {copy.title}
          </h3>
          <p className={`mx-auto max-w-3xl text-sm sm:text-base ${isAurora ? "text-slate-600" : "text-gray-300"}`}>
            {copy.subtitle}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {CORE_SKILLS.map((skill) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.id}
                className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border px-6 py-7 backdrop-blur-xl transition-all duration-300 ${coreCard}`}
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, rgba(56,189,248,0.18), rgba(129,140,248,0.22))"
                    }}
                  />
                </div>
                <div className="relative z-10 space-y-4">
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/30`}
                  >
                    <Icon className="text-xl" />
                  </span>
                  <div className="space-y-3">
                    <h4 className="text-xl font-semibold">
                      {skill.title[language]}
                    </h4>
                    <p className="text-sm leading-relaxed">{skill.description[language]}</p>
                    <p className="text-sm font-medium opacity-80">{skill.impact[language]}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.25em] text-cyan-400">
                    {skill.stack.map((stackItem) => (
                      <span
                        key={stackItem}
                        className={`rounded-full px-3 py-1 ${
                          isAurora ? "bg-sky-100 text-sky-700" : "bg-cyan-500/10 text-cyan-200"
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

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,360px)]">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-500/25 bg-slate-950/70 px-8 py-10 text-left text-slate-200 shadow-2xl shadow-cyan-500/15 backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, rgba(56,189,248,0.18), rgba(32,211,238,0.08), rgba(129,140,248,0.15))"
                }}
              />
            </div>
            <div className="relative z-10 space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-300">
                {copy.loopsTitle}
              </span>
              <div className="grid gap-5 sm:grid-cols-3">
                {copy.loops.map(({ icon: Icon, title, description }) => (
                  <div
                    key={title}
                    className={`flex h-full flex-col gap-3 rounded-2xl border px-4 py-5 text-sm backdrop-blur transition-all duration-300 ${loopCard}`}
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 text-slate-950">
                      <Icon />
                    </span>
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="text-xs leading-relaxed opacity-80">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-cyan-500/25 bg-slate-950/70 p-7 text-slate-200 shadow-2xl shadow-cyan-500/15 backdrop-blur-xl">
            <h4 className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
              {copy.secondaryTitle}
            </h4>
            <div className="mt-4 flex flex-wrap gap-3">
              {TOOLBOX.map(({ label, href, icon: Icon }) => {
                const baseClasses = `group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${toolPill}`;
                const content = (
                  <>
                    <Icon className="text-base" />
                    {label}
                  </>
                );
                return href ? (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
                    {content}
                  </a>
                ) : (
                  <span key={label} className={baseClasses}>
                    {content}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
