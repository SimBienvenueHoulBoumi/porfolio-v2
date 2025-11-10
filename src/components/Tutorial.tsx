"use client";

import { useTheme } from "@/context/ThemeContext";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";

const STEPS = [
  {
    id: "plan",
    title: "Planifier le parcours",
    description: "Identifier objectifs, stack cible et jalons de release pour cadrer la mission.",
    tips: ["Alignement produit/tech", "Roadmap partagée"],
  },
  {
    id: "build",
    title: "Construire avec rigueur",
    description: "Mettre en place pipeline, observabilité et code testable pour sécuriser le delivery.",
    tips: ["CI/CD vérifiée", "Monitoring connecté"],
  },
  {
    id: "ship",
    title: "Livrer en continu",
    description: "Déployer étape par étape, mesurer l'impact et itérer avec les équipes produit.",
    tips: ["Boucles de feedback", "Post-mortem rapide"],
  },
];

export default function Tutorial() {
  const { theme } = useTheme();
  const isAurora = theme === "aurora";

  return (
    <section id="tutorial" className={`relative overflow-hidden bg-gradient-to-br ${
      isAurora ? "from-slate-50 via-white to-sky-100" : "from-slate-950 via-slate-900 to-black"
    } py-24 px-4 sm:px-8`}>
      <div className="layout-shell relative z-10 flex flex-col gap-12">
        <SectionHeader
          isAurora={isAurora}
          title="Mise en activité"
          description="La méthode pour passer d'une idée à une plateforme opérationnelle sans dettes cachées."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <Card
              key={step.id}
              isAurora={isAurora}
              tone="soft"
              className="p-6 space-y-4 hover-lift"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <span className="text-xs font-mono uppercase tracking-[0.35em] text-cyan-400">T{index + 1}</span>
              <h4 className="text-lg font-semibold">{step.title}</h4>
              <p className={isAurora ? "text-slate-600" : "text-gray-300"}>{step.description}</p>
              <div className="space-y-2">
                {step.tips.map((tip) => (
                  <div key={tip} className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <span className={isAurora ? "text-slate-600" : "text-gray-300"}>{tip}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
