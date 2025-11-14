export type HeroHighlight = {
  label: string;
  value: string;
};

export type HeroContent = {
  name: string;
  tagline: string;
  typewriter: string[];
  headline: [string, string, string];
  introduction: string;
  highlights: HeroHighlight[];
  ctaPrimary: string;
  ctaSecondary: string;
  availability: string;
  availabilityDescription: string;
  trustedStack: string;
  objective: string[];
};

export type CoreSkill = {
  id: string;
  icon: string;
  title: string;
  description: string;
  impact: string;
  stack: string[];
};

export type FeedbackLoop = {
  icon: string;
  title: string;
  description: string;
};

export type ToolboxItem = {
  label: string;
  icon: string;
  href?: string;
};

export type SkillsContent = {
  title: string;
  subtitle: string;
  secondaryTitle: string;
  loopsTitle: string;
  coreSkills: CoreSkill[];
  loops: FeedbackLoop[];
  toolbox: ToolboxItem[];
};

export type ExperienceHighlight = {
  label: string;
  value: string;
};

export type ExperienceItem = {
  company: { label: string; tooltip: string };
  team: { label: string; tooltip: string };
  role: string;
  tech: { label: string; tooltip: string };
  date: string;
  location?: string;
  impact: string;
  highlights: ExperienceHighlight[];
  bullets: string[];
};

export type ExperienceContent = {
  title: string;
  subtitle: string;
  experiences: ExperienceItem[];
};

export type ContactStep = {
  accent: string;
  title: string;
  description: string;
};

export type ContactChannel = {
  id: string;
  label: string;
  description: string;
  action: string;
  href: string;
  badge?: string;
  icon: string;
  external?: boolean;
};

export type ContactContent = {
  title: string;
  subtitle: string;
  description: string;
  processTitle: string;
  steps: ContactStep[];
  callouts: { label: string; value: string }[];
  channels: ContactChannel[];
  footnote: string;
};

export type FooterContent = {
  label: string;
  role: string;
  madeWith: string;
  and: string;
  by: string;
  year: string;
  stackTitle: string;
  stackItems: string;
};

export type SiteContent = {
  hero: HeroContent;
  skills: SkillsContent;
  experience: ExperienceContent;
  contact: ContactContent;
  footer: FooterContent;
};

export const SITE_CONTENT: SiteContent = {
    hero: {
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
        { label: "Pipelines Jenkins", value: "Build → Test → Sécu" },
        { label: "Quality gate", value: "Trivy + SonarQube" },
        { label: "Stack locale", value: "Docker Compose complet" }
      ],
      ctaPrimary: "Planifier un call",
      ctaSecondary: "Voir le portfolio",
      availability: "Disponible pour des missions DevOps & backend",
      availabilityDescription: "Audit express de vos pipelines ou design complet d’une plateforme CI/CD.",
      trustedStack: "Stack actuelle",
      objective: [
        "Développer des API REST Spring Boot et Node sécurisées, prêtes pour la scalabilité.",
        "Concevoir des UI interactives (React/Next/Angular) pour exposer la valeur métier.",
        "Déployer des stacks DevOps locales (Jenkins, Trivy, Nexus, SonarQube, Snyk) via Docker Compose.",
        "Automatiser build, tests, qualité et sécurité dans des pipelines Jenkins déclaratifs."
      ]
    },
    skills: {
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
    },
    experience: {
      title: "Expériences",
      subtitle:
        "Des équipes livrées en mode continu : alignment produit, pipelines CI/CD, observabilité et culture feedback.",
      experiences: [
        {
          company: {
            label: "SNCF Voyageurs",
            tooltip: "Groupe ferroviaire français, division transport de voyageurs."
          },
          team: {
            label: "Équipe Agile",
            tooltip: "Mode Scrum, sprints de 2 semaines, rituels calés sur le delivery pipeline."
          },
          role: "Développeur Front ReactJS",
          tech: {
            label: "Next.js",
            tooltip: "Framework React avec SSR et ISR, utilisé pour des interfaces modernes et performantes."
          },
          date: "Octobre 2021 – Septembre 2023",
          impact:
            "Interface data pour piloter les flux voyageurs, livraisons hebdomadaires et visibilité en temps réel sur les indicateurs clés.",
          highlights: [
            { label: "Flux", value: "Voyageurs nationaux" },
            { label: "Visibilité", value: "Temps réel" }
          ],
          bullets: [
            "Conception d'une interface data en **React / Next.js** axée UX et performance.",
            "Contrôle des règles métiers via requêtes **SQL** ciblées en production.",
            "Intégration d'API **Spring Boot** sécurisées avec authentification et gestion des erreurs.",
            "Automatisation des environnements de test avec **Docker Compose** pour reproduire les bugs.",
            "Participation aux pipelines **CI/CD Jenkins** et à la documentation technique."
          ]
        },
        {
          company: {
            label: "INFO 2R",
            tooltip: "Plateforme RH interne modernisée pour piloter les processus employés."
          },
          team: {
            label: "Équipe DevOps",
            tooltip: "Responsable de l’automatisation RH, des pipelines et du monitoring opérationnel."
          },
          role: "Développeur Backend Java / Spring Boot",
          tech: {
            label: "Spring Boot",
            tooltip: "Framework Java moderne pour développer des API REST sécurisées et modulaires."
          },
          date: "Mars 2024 – Septembre 2024",
          impact:
            "Plateforme RH modulaire : gestion des onboarding, des congés et reporting légal, avec 30% de délais en moins.",
          highlights: [
            { label: "Processus", value: "Onboarding & congés" },
            { label: "Automatisation", value: "CI/CD RH" }
          ],
          bullets: [
            "Développement d'**API REST Spring Boot** sécurisées avec authentification JWT.",
            "Mise en place de **Kafka** pour synchroniser les événements RH inter-services.",
            "Création de pipelines **Jenkins CI/CD** pour build, tests et déploiements automatisés.",
            "Pilotage de l'observabilité RH avec **Datadog** : métriques, alerting et documentation.",
            "Conteneurisation **Docker** des services pour des environnements reproductibles."
          ]
        }
      ]
    },
    contact: {
      title: "Contact",
      subtitle: "Interface prioritaire",
      description:
        "Engageons un canal direct pour aligner vos objectifs produit, valider la stack et déployer les prochains incréments sans friction.",
      processTitle: "Protocole express",
      steps: [
        {
          accent: "T+0",
          title: "Brief express",
          description: "Partagez le contexte (produit, équipe, stack) via le canal de votre choix."
        },
        {
          accent: "T+1h",
          title: "Sync rapide",
          description: "Je confirme la réception, clarifie les enjeux et propose un créneau d’échange si nécessaire."
        },
        {
          accent: "T+24h",
          title: "Feuille de route",
          description: "Envoi d’un plan d’action ou d’une estimation pour enclencher la mission."
        }
      ],
      callouts: [
        { label: "Disponibilité", value: "Freelance & CDI" },
        { label: "Fuseau horaire", value: "CET / CEST" },
        { label: "SLA réponse", value: "< 24h" }
      ],
      channels: [
        {
          id: "email",
          label: "Email prioritaire",
          description:
            "Canal direct pour détailler votre besoin, partager un cahier des charges ou un backlog prioritaire.",
          action: "Envoyer un message",
          badge: "Réponse < 24h",
          href: "mailto:houlboumi.sim.bienvenue@gmail.com",
          icon: "mail"
        },
        {
          id: "linkedin",
          label: "LinkedIn",
          description:
            "Idéal pour démarrer une discussion business, valider le fit culturel et partager vos défis produits.",
          action: "Entrer en contact",
          badge: "Réseau pro",
          href: "https://www.linkedin.com/in/sim-bienvenue-houl-boumi/",
          icon: "linkedin",
          external: true
        },
        {
          id: "github",
          label: "GitHub",
          description:
            "Parcourez le code, pipelines CI/CD et expérimentations cloud-native livrés en production.",
          action: "Explorer les projets",
          badge: "Repos actifs",
          href: "https://github.com/SimBienvenueHoulBoumi",
          icon: "github",
          external: true
        }
      ],
      footnote: "Les créneaux téléphoniques sont proposés après un premier échange sur le canal choisi."
    },
    footer: {
      label: "Portfolio personnel",
      role: "Dev Fullstack Java/React",
      madeWith: "Fait avec",
      and: "et",
      by: "par Sim Bienvenue Houlboumi",
      year: "2025",
      stackTitle: "Stack de production",
      stackItems: "Next.js · Spring Boot · Kubernetes · Datadog"
    }
};
