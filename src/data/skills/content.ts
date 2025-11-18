import type { SkillsContent } from "@/lib/content";

export const skillsContent: SkillsContent = {
  title: "Compétences techniques",
  subtitle:
    "Un stack orienté delivery contrôlé : IaC, pipelines, front data-driven et observabilité temps réel.",
  secondaryTitle: "Boîte à outils opérationnelle",
  loopsTitle: "Boucles de feedback",
  coreSkills: [
    {
      id: "delivery",
      icon: "docker",
      title: "Livraison automatisée",
      description:
        "Pipelines CI/CD versionnés, tests orchestrés, feature flags et stratégies de déploiement progressif.",
      impact:
        "Livrer n'importe quelle branche en moins de 15 minutes, sans impacter la prod.",
      stack: ["GitOps", "Jenkins", "GitHub Actions", "ArgoCD", "Docker"]
    },
    {
      id: "platform",
      icon: "cloud",
      title: "Plateformes cloud natives",
      description:
        "IaC modulaire, observabilité proactive et gouvernance multi-environnements pour microservices.",
      impact:
        "Résilience et sécurité intégrées, coûts optimisés et visibilité en temps réel.",
      stack: ["Kubernetes", "Datadog", "Cloud Governance"]
    },
    {
      id: "experience",
      icon: "react",
      title: "Expérience front & APIs",
      description:
        "Interfaces React/Next.js data-driven, APIs Spring Boot sécurisées et documentation orientée produit.",
      impact:
        "UX réactive, dette réduite, code maintenable et prêt pour la scalabilité.",
      stack: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "Redis"]
    }
  ],
  loops: [
    {
      icon: "activity",
      title: "Observabilité proactive",
      description:
        "Dashboards centrés produit, alerting structuré, corrélation traces/logs pour agir avant l’incident."
    },
    {
      icon: "layers",
      title: "Architecture modulable",
      description:
        "Services conteneurisés, contrats d’API versionnés et feature toggles pour livrer sans freeze."
    },
    {
      icon: "trendingUp",
      title: "Suivi du flux de valeur",
      description:
        "Indicateurs pipeline, temps de cycle et métriques Datadog pour prédire et stabiliser le delivery."
    }
  ],
  toolbox: [
    { label: "TypeScript", href: "https://www.typescriptlang.org", icon: "typescript" },
    { label: "Redux Toolkit", href: "https://redux.js.org", icon: "redux" },
    { label: "Tailwind CSS", href: "https://tailwindcss.com", icon: "tailwind" },
    { label: "Jenkins", href: "https://www.jenkins.io", icon: "jenkins" },
    { label: "Ansible", href: "https://www.ansible.com", icon: "ansible" },
    { label: "Kubernetes", href: "https://kubernetes.io", icon: "kubernetes" },
    { label: "Java / Spring", href: "https://spring.io/projects/spring-boot", icon: "java" },
    { label: "Moteurs SQL", icon: "database" },
    { label: "Outils Linux", icon: "terminal" }
  ]
};

