import type { HeroContent } from "@/lib/content";

export const heroContent: HeroContent = {
  name: "Sim Bienvenue Houlboumi",
  tagline: "Ingénieur DevOps & spécialiste Spring Boot",
  introduction:
    "Je conçois des API sécurisées et des pipelines DevOps robustes pour accompagner les équipes backend & infra vers des déploiements fiables.",
  typewriter: [
    "Déployer des environnements DevOps prêts pour les équipes...",
    "Industrialiser des pipelines Jenkins de bout en bout...",
    "Automatiser qualité et sécurité avec Trivy & Snyk..."
  ],
  headline: ["Ingénieur DevOps", "&", "Spécialiste backend"],
  highlights: [
    { label: "Pipelines CI/CD", value: "Jenkins · Build → Test → Sécu" },
    { label: "Quality gate", value: "Trivy + SonarQube" },
    { label: "Plateforme locale", value: "Docker Compose complet" }
  ],
  ctaPrimary: "Planifier un call",
  ctaSecondary: "Voir le portfolio",
  availability: "Disponible pour des missions DevOps & backend",
  availabilityDescription:
    "Audit express de vos pipelines ou design complet d’une plateforme CI/CD.",
  trustedStack: "Stack actuelle",
  objective: [
    "Développer des API REST Spring Boot et Node sécurisées, prêtes pour la scalabilité.",
    "Concevoir des UI interactives (React/Next/Angular) pour exposer la valeur métier.",
    "Déployer des stacks DevOps locales (Jenkins, Trivy, Nexus, SonarQube, Snyk) via Docker Compose.",
    "Automatiser build, tests, qualité et sécurité dans des pipelines Jenkins déclaratifs."
  ]
};

