import type { ContactContent } from "@/lib/content";

export const contactContent: ContactContent = {
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
};

