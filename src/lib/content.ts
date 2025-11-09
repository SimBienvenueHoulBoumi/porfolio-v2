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
  narrative: string;
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

export type SiteContentMap = Record<"fr" | "en", SiteContent>;

export const SITE_CONTENT: SiteContentMap = {
  fr: {
    hero: {
      name: "Sim Bienvenue Houlboumi",
      tagline: "Créateur de plateformes fiables",
      typewriter: [
        "Créer des microservices évolutifs...",
        "Automatiser l’infrastructure comme du code...",
        "Déployer avec des pipelines CI/CD..."
      ],
      headline: ["Ingénieur DevOps", "&", "Développeur Full-stack"],
      introduction:
        "J’accompagne les équipes produit vers un delivery continu : pipelines fiables, plateformes cloud résilientes et code taillé pour la valeur métier.",
      highlights: [
        { label: "Deploy frequency", value: "x8" },
        { label: "Incidents réduits", value: "-45%" },
        { label: "Cloud cost", value: "-18%" }
      ],
      narrative:
        "Du cadrage à la MEP : IaC, observabilité, microservices et culture d’ingénierie pour shipper vite, bien et sans surprises.",
      ctaPrimary: "Planifier un call",
      ctaSecondary: "Découvrir les stacks",
      availability: "Disponible pour de nouveaux challenges",
      availabilityDescription: "On synchronise les objectifs, on déploie en continu.",
      trustedStack: "Stack de confiance",
      objective: [
        "Livrer plus vite que le cycle logique, sans sacrifier la stabilité ni la maintenabilité.",
        "Automatisation CI/CD, observabilité proactive et culture d’équipe orientée feedback."
      ]
    },
    skills: {
      title: "Compétences néon",
      subtitle:
        "Un stack orienté delivery contrôlé : IaC, pipelines, front data-driven et observabilité temps réel.",
      secondaryTitle: "Toolbelt opérationnelle",
      loopsTitle: "Boucles de feedback",
      coreSkills: [
        {
          id: "delivery",
          icon: "docker",
          title: "Delivery automatisé",
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
          title: "Value stream tracking",
          description:
            "KPIs pipeline, cycle time et DORA metrics pour prédire et stabiliser le delivery."
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
        { label: "SQL Engines", icon: "database" },
        { label: "Linux Tooling", icon: "terminal" }
      ]
    },
    experience: {
      title: "Expériences terrain",
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
  },
  en: {
    hero: {
      name: "Sim Bienvenue Houlboumi",
      tagline: "Building resilient platforms",
      typewriter: [
        "Building scalable microservices...",
        "Automating infrastructure as code...",
        "Shipping with resilient CI/CD pipelines..."
      ],
      headline: ["DevOps Engineer", "&", "Full-stack Developer"],
      introduction:
        "I help product teams unlock continuous delivery: reliable pipelines, resilient cloud platforms, and business-first code.",
      highlights: [
        { label: "Deployment frequency", value: "x8" },
        { label: "Incidents reduced", value: "-45%" },
        { label: "Cloud cost", value: "-18%" }
      ],
      narrative:
        "From scoping to production: IaC, observability, microservices, and engineering culture to ship fast, safe, and sustainably.",
      ctaPrimary: "Book a call",
      ctaSecondary: "Explore the stack",
      availability: "Open to new missions",
      availabilityDescription: "We align the objectives, then keep shipping continuously.",
      trustedStack: "Trusted stack",
      objective: [
        "Ship faster than the logical cycle without trading away stability or maintainability.",
        "CI/CD automation, proactive observability, and a team culture wired around feedback loops."
      ]
    },
    skills: {
      title: "Neon skillset",
      subtitle:
        "A stack engineered for controlled delivery: IaC, pipelines, data-driven front-end, and real-time observability.",
      secondaryTitle: "Operational toolbelt",
      loopsTitle: "Feedback loops",
      coreSkills: [
        {
          id: "delivery",
          icon: "docker",
          title: "Automated delivery",
          description:
            "Versioned CI/CD pipelines, orchestrated testing, feature flags, and progressive deploy strategies.",
          impact:
            "Ship any branch to production in under 15 minutes without disrupting live traffic.",
          stack: ["GitOps", "Jenkins", "GitHub Actions", "ArgoCD", "Docker"]
        },
        {
          id: "platform",
          icon: "cloud",
          title: "Cloud native platforms",
          description:
            "Modular IaC, proactive observability, and multi-environment governance for microservices.",
          impact:
            "Built-in resilience and security, optimized costs, and real-time situational awareness.",
          stack: ["Kubernetes", "Datadog", "Cloud Governance"]
        },
        {
          id: "experience",
          icon: "react",
          title: "Front-end & APIs",
          description:
            "Data-driven React/Next.js interfaces, secure Spring Boot APIs, and product-driven documentation.",
          impact:
            "Responsive UX, reduced debt, maintainable code, and scalability-ready foundations.",
          stack: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "Redis"]
        }
      ],
      loops: [
        {
          icon: "activity",
          title: "Proactive observability",
          description:
            "Product-centric dashboards, structured alerting, and trace/log correlation to act before incidents."
        },
        {
          icon: "layers",
          title: "Composable architecture",
          description:
            "Containerized services, versioned API contracts, and feature toggles to ship without freeze."
        },
        {
          icon: "trendingUp",
          title: "Value stream tracking",
          description:
            "Pipeline KPIs, cycle times, and DORA metrics keeping delivery predictable and steady."
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
        { label: "SQL Engines", icon: "database" },
        { label: "Linux Tooling", icon: "terminal" }
      ]
    },
    experience: {
      title: "Field experience",
      subtitle:
        "Teams operating in continuous delivery mode: product alignment, CI/CD pipelines, observability, and feedback culture.",
      experiences: [
        {
          company: {
            label: "SNCF Voyageurs",
            tooltip: "French railway group, passenger transportation division."
          },
          team: {
            label: "Agile team",
            tooltip: "Scrum cadence, two-week sprints, rituals aligned with the delivery pipeline."
          },
          role: "ReactJS Front-end Developer",
          tech: {
            label: "Next.js",
            tooltip: "React framework with SSR and ISR, used to build modern high-performance interfaces."
          },
          date: "October 2021 – September 2023",
          impact:
            "Data interface powering passenger flow operations, weekly releases, and real-time visibility on key indicators.",
          highlights: [
            { label: "Scope", value: "National passengers" },
            { label: "Visibility", value: "Real time" }
          ],
          bullets: [
            "Designed a data interface in **React / Next.js** focused on UX and performance.",
            "Controlled business rules through targeted **SQL** queries executed in production.",
            "Integrated secure **Spring Boot** APIs with authentication and robust error handling.",
            "Automated test environments with **Docker Compose** to reproduce incidents.",
            "Contributed to **Jenkins CI/CD** pipelines and maintained technical documentation."
          ]
        },
        {
          company: {
            label: "INFO 2R",
            tooltip: "Modernized internal HR platform streamlining employee processes."
          },
          team: {
            label: "DevOps squad",
            tooltip: "Accountable for HR automation, CI/CD pipelines, and operational monitoring."
          },
          role: "Java / Spring Boot Backend Developer",
          tech: {
            label: "Spring Boot",
            tooltip: "Modern Java framework for building secure, modular REST APIs."
          },
          date: "March 2024 – September 2024",
          impact:
            "Modular HR platform: onboarding, leave management, and compliance reporting delivered 30% faster.",
          highlights: [
            { label: "Processes", value: "Onboarding & leave" },
            { label: "Automation", value: "HR CI/CD" }
          ],
          bullets: [
            "Developed secure **Spring Boot REST APIs** with JWT authentication.",
            "Implemented **Kafka** to synchronize HR events across services.",
            "Built **Jenkins CI/CD** pipelines for automated builds, tests, and deployments.",
            "Drove HR observability with **Datadog** dashboards, alerting, and runbooks.",
            "Containerized services with **Docker** to guarantee reproducible environments."
          ]
        }
      ]
    },
    contact: {
      title: "Contact",
      subtitle: "Priority channel",
      description:
        "Let's establish a direct line to align product objectives, validate the stack, and deploy the next increments without friction.",
      processTitle: "Fast-track protocol",
      steps: [
        {
          accent: "T+0",
          title: "Express brief",
          description: "Share the context (product, team, stack) through your preferred channel."
        },
        {
          accent: "T+1h",
          title: "Quick sync",
          description: "I confirm reception, clarify the mission, and suggest a call slot if needed."
        },
        {
          accent: "T+24h",
          title: "Roadmap",
          description: "Receive an action plan or estimate to launch the engagement."
        }
      ],
      callouts: [
        { label: "Availability", value: "Freelance & Full-time" },
        { label: "Time zone", value: "CET / CEST" },
        { label: "Response SLA", value: "< 24h" }
      ],
      channels: [
        {
          id: "email",
          label: "Priority email",
          description:
            "Best channel to detail your needs, share requirements, or send a prioritized backlog.",
          action: "Send a message",
          badge: "Reply < 24h",
          href: "mailto:houlboumi.sim.bienvenue@gmail.com",
          icon: "mail"
        },
        {
          id: "linkedin",
          label: "LinkedIn",
          description:
            "Perfect to kick off a business conversation, validate cultural fit, and share product challenges.",
          action: "Connect",
          badge: "Pro network",
          href: "https://www.linkedin.com/in/sim-bienvenue-houl-boumi/",
          icon: "linkedin",
          external: true
        },
        {
          id: "github",
          label: "GitHub",
          description:
            "Browse production-grade code, CI/CD pipelines, and cloud-native experiments.",
          action: "Explore projects",
          badge: "Active repos",
          href: "https://github.com/SimBienvenueHoulBoumi",
          icon: "github",
          external: true
        }
      ],
      footnote: "Phone slots are proposed after an initial discussion on your chosen channel."
    },
    footer: {
      label: "Personal portfolio",
      role: "Full-stack Java/React Engineer",
      madeWith: "Built with",
      and: "and",
      by: "by Sim Bienvenue Houlboumi",
      year: "2025",
      stackTitle: "Production stack",
      stackItems: "Next.js · Spring Boot · Kubernetes · Datadog"
    }
  }
};
