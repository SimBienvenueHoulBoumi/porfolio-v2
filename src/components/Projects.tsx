"use client";

import { FC } from "react";
import { FiArrowUpRight, FiGitBranch, FiShield, FiTrendingUp } from "react-icons/fi";

import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

type Project = {
  id: string;
  badge: string;
  name: string;
  role: Record<"fr" | "en", string>;
  description: Record<"fr" | "en", string>;
  impact: Record<"fr" | "en", string>;
  stack: string[];
  href: string;
};

const PROJECTS: readonly Project[] = [
  {
    id: "rail-platform",
    badge: "SNCF Voyageurs",
    name: "Rail Data Governance",
    role: {
      fr: "Lead Dev React & pipeline",
      en: "Lead React & pipeline engineer"
    },
    description: {
      fr: "Interfaces stratégiques Next.js pour la data ferroviaire, reliées à des APIs Spring sécurisées.",
      en: "Strategic Next.js interfaces for railway data, backed by secured Spring microservices."
    },
    impact: {
      fr: "Livraisons hebdomadaires, traçabilité complète et résilience renforcée pour le pilotage des flux passagers.",
      en: "Weekly releases, full traceability, and reinforced resilience for passenger flow steering."
    },
    stack: ["Next.js", "Spring Boot", "PostgreSQL", "Docker", "Jenkins"],
    href: "https://github.com/SimBienvenueHoulBoumi"
  },
  {
    id: "core-banking",
    badge: "INFO 2R",
    name: "HR Operations Hub",
    role: {
      fr: "Engineer DevOps & backend",
      en: "Backend & DevOps engineer"
    },
    description: {
      fr: "Plateforme RH interne pour orchestrer onboarding, gestion des congés et reporting réglementaire.",
      en: "Internal HR platform orchestrating onboarding flows, leave management, and regulatory reporting."
    },
    impact: {
      fr: "Processus RH industrialisés, temps de traitement réduit de 30% et conformité automatisée.",
      en: "Industrialized HR processes, 30% faster processing time, and automated compliance."
    },
    stack: ["Java", "Spring Boot", "Kafka", "Datadog", "Ansible"],
    href: "https://github.com/SimBienvenueHoulBoumi"
  },
  {
    id: "cloud-lab",
    badge: "R&D",
    name: "Cloud Native Lab",
    role: {
      fr: "Architecture & experimentation",
      en: "Architecture & experimentation"
    },
    description: {
      fr: "Laboratoire multi-cloud pour valider IaC, GitOps, observabilité et stratégies de déploiement progressive.",
      en: "Multi-cloud lab validating IaC, GitOps, observability, and progressive deployment strategies."
    },
    impact: {
      fr: "Templates reproductibles, blueprints Terraform et pipelines GitOps prêts à l’emploi.",
      en: "Reproducible templates, Terraform blueprints, and ready-to-use GitOps pipelines."
    },
    stack: ["Terraform", "Kubernetes", "ArgoCD", "Grafana", "GitHub Actions"],
    href: "https://github.com/SimBienvenueHoulBoumi"
  }
] as const;

const PROJECTS_COPY = {
  fr: {
    title: "Cas d'usage terrain",
    subtitle:
      "Des plateformes construites pour survivre aux rushs produits : pipelines fiables, code maintenable, monitoring temps réel.",
    primaryCta: "Découvrir sur GitHub",
    secondaryCta: "Me contacter",
    stats: [
      { icon: FiGitBranch, label: "Pipelines automatisés", value: "18+" },
      { icon: FiShield, label: "Environnements sécurisés", value: "7" },
      { icon: FiTrendingUp, label: "KPIs suivis", value: "25" }
    ]
  },
  en: {
    title: "Real-world impact",
    subtitle:
      "Platforms engineered to survive product rushes: reliable pipelines, maintainable code, real-time monitoring.",
    primaryCta: "Browse on GitHub",
    secondaryCta: "Contact me",
    stats: [
      { icon: FiGitBranch, label: "Automated pipelines", value: "18+" },
      { icon: FiShield, label: "Secured environments", value: "7" },
      { icon: FiTrendingUp, label: "Monitored KPIs", value: "25" }
    ]
  }
} as const;

const Projects: FC = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  const copy = PROJECTS_COPY[language];
  const isAurora = theme === "aurora";

  const sectionBg = isAurora
    ? "from-slate-50 via-white to-sky-100"
    : "from-slate-950 via-slate-900 to-black";

  const projectBg = isAurora
    ? "border-sky-200/70 bg-white focus-visible:ring-sky-400/50 focus-visible:ring-offset-white shadow-[0_20px_55px_rgba(59,130,246,0.12)]"
    : "border-cyan-500/25 bg-slate-950/75 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-slate-950";

  const statCard = isAurora
    ? "border-sky-200/70 bg-white/80 text-slate-700 shadow-sky-200/40"
    : "border-cyan-500/25 bg-slate-950/75 text-gray-200 shadow-cyan-500/20";
  const projectGlow = isAurora
    ? "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(196,181,253,0.25))"
    : "linear-gradient(135deg, rgba(56,189,248,0.18), rgba(129,140,248,0.22))";
  const stackPillText = isAurora ? "text-slate-600" : "text-cyan-400";
  const headingClass = isAurora
    ? "text-3xl font-bold sm:text-4xl text-slate-900"
    : "text-3xl font-bold sm:text-4xl text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text";

  return (
    <section
      id="projects"
      className={`projects-section relative overflow-hidden bg-gradient-to-br ${sectionBg} py-20 px-4 sm:px-8`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 0% 0%, rgba(56,189,248,0.16), transparent 55%), radial-gradient(circle at 100% 10%, rgba(129,140,248,0.15), transparent 65%)"
            }}
          />
        </div>
        <div className="absolute inset-0 opacity-[0.08]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(14,165,233,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.06) 1px, transparent 1px)",
              backgroundSize: "44px 44px"
            }}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10">
        <div className="text-center space-y-4">
          <h3 className={headingClass}>
            {copy.title}
          </h3>
          <p className={`mx-auto max-w-2xl text-sm sm:text-base ${isAurora ? "text-slate-600" : "text-gray-300"}`}>
            {copy.subtitle}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <a
              key={project.id}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border px-6 py-7 backdrop-blur-xl transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${projectBg} hover:-translate-y-1`}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: projectGlow
                  }}
                />
              </div>
              <div className="relative z-10 flex flex-col gap-4">
                <span
                  className={`inline-flex items-center gap-2 self-start rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] ${
                    isAurora ? "bg-slate-100 text-slate-700" : "bg-cyan-500/20 text-cyan-200"
                  }`}
                >
                  {project.badge}
                </span>
                <div className="space-y-3">
                  <h4 className={`text-xl font-semibold ${isAurora ? "text-slate-900" : "text-white"}`}>
                    {project.name}
                  </h4>
                  <p className={`text-xs uppercase tracking-[0.3em] ${isAurora ? "text-slate-600" : "text-cyan-300"}`}>
                    {project.role[language]}
                  </p>
                  <p className={`text-sm leading-relaxed ${isAurora ? "text-slate-600" : "text-gray-300"}`}>
                    {project.description[language]}
                  </p>
                  <p className={`text-sm font-medium ${isAurora ? "text-slate-700" : "text-gray-100"}`}>
                    {project.impact[language]}
                  </p>
                </div>
              </div>
              <div className={`relative z-10 mt-6 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.25em] ${stackPillText}`}>
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className={`rounded-full px-3 py-1 ${
                      isAurora ? "bg-slate-100 text-slate-700" : "bg-cyan-500/10 text-cyan-200"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
                <FiArrowUpRight className="ml-auto text-lg text-cyan-400" />
              </div>
            </a>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,320px)] md:items-center">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <a
              href="https://github.com/SimBienvenueHoulBoumi"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:translate-x-1 hover:shadow-2xl hover:shadow-cyan-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              {copy.primaryCta}
              <FiArrowUpRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 px-5 py-2.5 text-sm font-semibold text-cyan-200 transition-all duration-300 hover:border-cyan-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              {copy.secondaryCta}
            </a>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {copy.stats.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className={`flex flex-col items-start gap-2 rounded-2xl border px-4 py-4 backdrop-blur-md transition-all duration-300 ${statCard}`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 text-slate-950">
                  <Icon />
                </span>
                <p className="text-2xl font-semibold">{value}</p>
                <p className="text-xs uppercase tracking-[0.3em] opacity-80">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
