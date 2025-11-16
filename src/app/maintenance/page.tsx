"use client";

// pbara@arvadon.fr :: envoyer le cv en pdf

import Link from "next/link";
import { FiArrowLeft, FiTool, FiBell } from "react-icons/fi";
import Button from "@/components/ui/Button";
import { useTheme } from "@/context/ThemeContext";

export default function MaintenancePage() {
  const { theme } = useTheme();
  const isAurora = theme === "aurora";

  const surface = isAurora
    ? "bg-gradient-to-br from-white via-sky-50 to-white"
    : "bg-gradient-to-br from-slate-950 via-slate-900 to-black";
  const cardClass = isAurora
    ? "border-sky-200/70 bg-white/85 text-slate-700"
    : "border-emerald-400/20 bg-slate-950/80 text-slate-100";
  const accent = isAurora ? "text-sky-600" : "text-emerald-300";
  const muted = isAurora ? "text-slate-500" : "text-slate-400";

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className={`absolute inset-0 ${surface}`} />
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.15), transparent 55%), radial-gradient(circle at 80% 10%, rgba(16,185,129,0.12), transparent 60%)"
          }}
        />
      </div>

      <div className="layout-shell relative z-10 flex min-h-screen items-center justify-center py-16">
        <div className={`mx-auto flex max-w-3xl flex-col gap-8 rounded-[32px] border px-8 py-10 text-center shadow-2xl ${cardClass}`}>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/30">
            <FiTool className={`${accent} text-3xl`} />
          </div>

          <div className="space-y-3">
            <p className={`text-xs font-semibold uppercase tracking-[0.4em] ${muted}`}>Maintenance planifiée</p>
            <h1 className={`text-3xl font-semibold leading-tight sm:text-4xl ${isAurora ? "text-slate-900" : "text-white"}`}>
              Cette page est momentanément indisponible
            </h1>
            <p className={`text-base ${muted}`}>
              Nous appliquons une mise à jour rapide afin d'aligner le contenu avec la dernière charte produit.
              Revenez un peu plus tard, la page sera de nouveau accessible très bientôt.
            </p>
          </div>

          <div
            className={`rounded-2xl border px-4 py-3 text-sm ${isAurora ? "border-sky-100 bg-sky-50" : "border-emerald-500/20 bg-emerald-500/5"}`}
          >
            <p className={`flex flex-wrap items-center justify-center gap-2 font-semibold ${accent}`}>
              <FiBell />
              Mise à disposition très prochainement
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              as={Link}
              href="/"
              isAurora={isAurora}
              variant="secondary"
              iconLeft={<FiArrowLeft />}
            >
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
