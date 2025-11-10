"use client";

import { FC } from "react";
import { FiArrowUpRight, FiGitBranch, FiShield, FiTrendingUp, FiCheckCircle } from "react-icons/fi";

import { useTheme } from "@/context/ThemeContext";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import Pill from "@/components/ui/Pill";
import Button from "@/components/ui/Button";
import StatCard from "@/components/ui/StatCard";

type Project = {
  id: string;
  badge: string;
  name: string;
  role: string;
  description: string;
  impact: string;
  stack: string[];
  href: string;
};

const PROJECTS: readonly Project[] = [
  {
    id: "rail-platform",
    badge: "SNCF Voyageurs",
    name: "Rail Data Governance",
    role: "Lead Dev React & pipeline",
    description:
      "Interfaces stratégiques Next.js pour la data ferroviaire, reliées à des APIs Spring sécurisées.",
    impact:
      "Livraisons hebdomadaires, traçabilité complète et résilience renforcée pour le pilotage des flux passagers.",
    stack: ["Next.js", "Spring Boot", "PostgreSQL", "Docker", "Jenkins"],
    href: "https://github.com/SimBienvenueHoulBoumi"
  },
  {
    id: "core-banking",
    badge: "INFO 2R",
    name: "HR Operations Hub",
    role: "Engineer DevOps & backend",
    description:
      "Plateforme RH interne pour orchestrer onboarding, gestion des congés et reporting réglementaire.",
    impact:
      "Processus RH industrialisés, temps de traitement réduit de 30% et conformité automatisée.",
    stack: ["Java", "Spring Boot", "Kafka", "Datadog", "Ansible"],
    href: "https://github.com/SimBienvenueHoulBoumi"
  },
  {
    id: "cloud-lab",
    badge: "R&D",
    name: "Cloud Native Lab",
    role: "Architecture & experimentation",
    description:
      "Laboratoire multi-cloud pour valider IaC, GitOps, observabilité et stratégies de déploiement progressive.",
    impact:
      "Templates reproductibles, blueprints Terraform et pipelines GitOps prêts à l’emploi.",
    stack: ["Terraform", "Kubernetes", "ArgoCD", "Grafana", "GitHub Actions"],
    href: "https://github.com/SimBienvenueHoulBoumi"
  }
] as const;

const PROJECTS_COPY = {
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
} as const;

const Projects: FC = () => {
  const { theme } = useTheme();

  const copy = PROJECTS_COPY;
  const isAurora = theme === "aurora";

  const sectionBg = isAurora
    ? "from-slate-50 via-white to-sky-100"
    : "from-slate-950 via-slate-900 to-black";

  const projectBg = isAurora
    ? "border-sky-200/70 bg-white focus-visible:ring-sky-400/50 focus-visible:ring-offset-white shadow-[0_20px_55px_rgba(59,130,246,0.12)]"
    : "border-cyan-500/25 bg-slate-950/75 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-slate-950";

  const projectGlow = isAurora
    ? "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(196,181,253,0.25))"
    : "linear-gradient(135deg, rgba(56,189,248,0.18), rgba(129,140,248,0.22))";
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

      <div className="layout-shell relative z-10 flex flex-col gap-10">
        <SectionHeader
          isAurora={isAurora}
          title={copy.title}
          description={copy.subtitle}
        />

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
                <Badge
                  isAurora={isAurora}
                  variant="soft"
                  className="self-start text-[11px]"
                >
                  {project.badge}
                </Badge>
                <div className="space-y-3">
                  <h4 className={`text-xl font-semibold ${isAurora ? "text-slate-900" : "text-white"}`}>
                    {project.name}
                  </h4>
                  <p className={`text-xs uppercase tracking-[0.3em] ${isAurora ? "text-slate-600" : "text-cyan-300"}`}>
                    {project.role}
                  </p>
                  <p className={`text-sm leading-relaxed ${isAurora ? "text-slate-600" : "text-gray-300"}`}>
                    {project.description}
                  </p>
                  <p className={`flex items-start gap-2 text-sm font-medium ${isAurora ? "text-slate-700" : "text-gray-100"}`}>
                    <FiCheckCircle className={isAurora ? "mt-0.5 text-sky-500" : "mt-0.5 text-cyan-400"} />
                    <span>{project.impact}</span>
                  </p>
                </div>
              </div>
              <div className="relative z-10 mt-6 flex flex-wrap items-center gap-2">
                {project.stack.map((tech) => (
                  <Pill key={tech} isAurora={isAurora} className="text-[11px]">
                    {tech}
                  </Pill>
                ))}
                <span className="ml-auto inline-flex items-center gap-1 text-xs uppercase tracking-wide text-cyan-300">
                  GitHub
                  <FiArrowUpRight className="text-base" />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,320px)] md:items-center">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <Button
              as="a"
              href="https://github.com/SimBienvenueHoulBoumi"
              target="_blank"
              rel="noopener noreferrer"
              isAurora={isAurora}
              variant="primary"
              size="md"
              className="group"
              iconRight={<FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1" />}
            >
              {copy.primaryCta}
            </Button>
            <Button
              as="a"
              href="#contact"
              isAurora={isAurora}
              variant="secondary"
              size="md"
            >
              {copy.secondaryCta}
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {copy.stats.map(({ icon: Icon, label, value }) => (
              <StatCard key={label} icon={<Icon />} value={value} label={label} isAurora={isAurora} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
