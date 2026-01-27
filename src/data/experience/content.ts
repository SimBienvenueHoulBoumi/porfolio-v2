import type { ExperienceContent } from "@/lib/content";

export const experienceContent: ExperienceContent = {
  title: "Expériences professionnelles",
  subtitle:
    "Développeur Java / Spring Boot orienté DevOps : front React/Next.js, APIs sécurisées, CI/CD Jenkins, conteneurisation Docker et observabilité.",
  experiences: [
    {
      company: {
        label: "SNCF Voyageurs",
        tooltip: "Groupe ferroviaire français, division transport de voyageurs."
      },
      team: {
        label: "Équipe Agile",
        tooltip: "Mode Scrum, sprints de 2 semaines, rituels calés sur le delivery."
      },
      role: "Développeur Front ReactJS",
      tech: {
        label: "React / Next.js",
        tooltip:
          "Développement d’IHM modernes avec React et Next.js (SSR/optimisations), centrées sur performance et ergonomie."
      },
      date: "2021 - 2023",
      impact:
        "Conception d’une IHM d’administration et de paramétrage de données (Java / React) (2021 - 2023).",
      highlights: [
        { label: "Produit", value: "IHM d’administration" },
        { label: "Stack", value: "React / Next.js" }
      ],
      bullets: [
        "Conception d’une interface d'administration des données avec **React / Next.js**, centrée sur l’ergonomie et la performance.",
        "Vérification des règles métiers directement en base via des requêtes **SQL** ciblées, en environnement de production.",
        "Consommation d’API sécurisées **Spring Boot (Java 11)** avec authentification et gestion fine des erreurs, assurant une intégration fluide front/back.",
        "Déploiement automatisé d’environnements de test avec **Docker Compose**, facilitant la reproduction des bugs et les validations techniques.",
        "Participation à l’automatisation des tests et au déploiement continu (**CI/CD**), contribution aux scripts **Jenkins** et à la documentation technique."
      ]
    },
    {
      company: {
        label: "INFO 2R",
        tooltip: "Éditeur interne de solutions métiers Java / Spring Boot."
      },
      team: {
        label: "Backend & Automatisation",
        tooltip:
          "Développement d’APIs, automatisation CI/CD et fiabilisation des flux / supervision."
      },
      role: "Développeur Backend Java - Spring Boot",
      tech: {
        label: "Java / Spring Boot",
        tooltip:
          "Développement d’API REST sécurisées et modulaires avec Spring Boot, intégration messaging et industrialisation CI/CD."
      },
      date: "2023 - 2025",
      impact:
        "Développement backend & automatisation (Java / SQL / Docker) pour une plateforme de microservices (2023 - 2025).",
      highlights: [
        { label: "Architecture", value: "Modulaire & hexagonale" },
        { label: "Industrialisation", value: "Jenkins CI/CD" }
      ],
      bullets: [
        "Conception et développement d’**API REST sécurisées** avec **Spring Boot**, selon une architecture **modulaire** et **hexagonale**, robuste et maintenable.",
        "Intégration de **Kafka** pour la communication asynchrone entre microservices, améliorant réactivité et résilience des traitements distribués.",
        "Écriture de pipelines **Jenkins CI/CD** pour automatiser build, tests et déploiements, avec **notifications intégrées**.",
        "Conteneurisation des services avec **Docker** pour des environnements reproductibles (dev, test, prod).",
        "Contribution à la supervision et à la fiabilisation des flux : gestion des erreurs, suivi des métriques critiques, documentation technique **Datadog**."
      ]
    }
  ]
};
