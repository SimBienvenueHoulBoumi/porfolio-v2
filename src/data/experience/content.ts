import type { ExperienceContent } from "@/lib/content";

export const experienceContent: ExperienceContent = {
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
        tooltip:
          "Framework React avec SSR et ISR, utilisé pour des interfaces modernes et performantes."
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
        tooltip:
          "Framework Java moderne pour développer des API REST sécurisées et modulaires."
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
};

