"use client";

import Link from "next/link";
import { FiArrowLeft, FiCompass, FiAlertCircle } from "react-icons/fi";
import Button from "@/components/ui/Button";
import { useTheme } from "@/context/ThemeContext";

export default function NotFound() {
  const { theme } = useTheme();
  const isAurora = theme === "aurora";
  const surface = isAurora ? "bg-slate-50" : "bg-slate-950";
  const cardClass = isAurora
    ? "border-sky-200/70 bg-white/90 text-slate-700"
    : "border-cyan-400/20 bg-slate-950/80 text-slate-100";
  const accent = isAurora ? "text-sky-600" : "text-cyan-300";
  const muted = isAurora ? "text-slate-500" : "text-slate-400";

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className={`absolute inset-0 ${surface}`} />
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.18), transparent 55%), radial-gradient(circle at 80% 10%, rgba(14,165,233,0.12), transparent 60%)"
          }}
        />
      </div>

      <div className="layout-shell relative z-10 flex min-h-screen items-center justify-center py-16">
        <div className={`mx-auto flex max-w-3xl flex-col gap-8 rounded-[32px] border px-8 py-10 text-center shadow-2xl ${cardClass}`}>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/30">
            <FiCompass className={`${accent} text-3xl`} />
          </div>

          <div className="space-y-3">
            <p className={`text-xs font-semibold uppercase tracking-[0.4em] ${muted}`}>Page introuvable</p>
            <h1 className={`text-3xl font-semibold leading-tight sm:text-4xl ${isAurora ? "text-slate-900" : "text-white"}`}>
              Nous n&apos;avons pas trouvé cette adresse
            </h1>
            <p className={`text-base ${muted}`}>
              Contrairement à une maintenance planifiée, cette route n&apos;existe pas (ou plus).
              Vérifiez l&apos;URL ou revenez au sommaire pour poursuivre votre navigation.
            </p>
          </div>

          <div
            className={`rounded-2xl border px-4 py-3 text-sm ${isAurora ? "border-sky-100 bg-sky-50" : "border-cyan-500/20 bg-cyan-500/5"}`}
          >
            <p className={`flex flex-wrap items-center justify-center gap-2 font-semibold ${accent}`}>
              <FiAlertCircle />
              Si vous pensez qu&apos;il s&apos;agit d&apos;un lien valide, écrivez-moi via la page contact.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              as={Link}
              href="/"
              isAurora={isAurora}
              variant="primary"
              iconLeft={<FiArrowLeft />}
            >
              Retour à l&apos;accueil
            </Button>
            <Button
              as={Link}
              href="#contact"
              isAurora={isAurora}
              variant="ghost"
            >
              Aller au contact
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
