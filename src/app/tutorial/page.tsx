"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import Link from "next/link";
import PageLoader from "@/components/PageLoader";
import { FiChevronRight, FiMenu, FiX } from "react-icons/fi";
import { tutorialContent, tutorialStacks, TutorialStack } from "@/data/nodeApiTutorial";
import ConsoleWindow from "@/components/ui/ConsoleWindow";
import { useTheme } from "@/context/ThemeContext";

const TutorialPage = () => {
  const [isReady, setIsReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleComplete = useCallback(() => setIsReady(true), []);
  const [stack, setStack] = useState<TutorialStack>("node");
  const { theme } = useTheme();
  const content = tutorialContent[stack];
  const steps = content.sidebar;
  const themeTokens = useMemo(() => {
    const isDark = theme === "dark";
    return {
      pageBg: isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900",
      panel: isDark ? "bg-slate-950/60 backdrop-blur border border-slate-800" : "bg-white border border-slate-100",
      muted: isDark ? "text-slate-400" : "text-slate-600",
      button: isDark ? "border-slate-700 text-slate-200 hover:border-slate-500" : "border-slate-200 text-slate-600 hover:border-slate-300",
      accent: isDark ? "text-cyan-300" : "text-cyan-600",
      strong: isDark ? "text-white" : "text-slate-900",
      hero: isDark
        ? "border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800"
        : "border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100",
      card: isDark ? "border border-slate-800 bg-slate-900/70" : "border border-slate-200 bg-white",
      subCard: isDark ? "border border-slate-800 bg-slate-900/60" : "border border-slate-200 bg-white/90",
      soft: isDark ? "border border-slate-800 bg-slate-900/40" : "border border-slate-200 bg-slate-50"
    };
  }, [theme]);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  if (!isReady) {
    return <PageLoader onComplete={handleComplete} />;
  }

  return (
    <div className={`min-h-screen ${themeTokens.pageBg}`}>
      {drawerOpen && (
        <button
          type="button"
          aria-label="Fermer le menu tutoriel"
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}
      <div className="layout-shell min-h-screen py-8">
        
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
          <aside
            className={`fixed inset-y-0 left-0 z-40 flex h-full w-[88%] max-w-sm flex-col rounded-r-[28px] border-l-0 px-6 py-8 shadow-[0_25px_60px_rgba(15,23,42,0.15)] transition-transform lg:sticky lg:top-8 lg:h-[calc(100vh-64px)] lg:w-full lg:max-w-none lg:rounded-[28px] ${
              drawerOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            } ${themeTokens.panel}`}
            aria-label="Navigation du tutoriel"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="eyebrow-label">Tutoriels</p>
              </div>
              <button
                type="button"
                className={`rounded-full border p-2 transition lg:hidden ${themeTokens.button}`}
                onClick={() => setDrawerOpen(false)}
                aria-label="Fermer le sommaire"
              >
                <FiX />
              </button>
            </div>
            <nav className={`space-y-3 body-sm ${themeTokens.muted}`}>
              <Link
                href="/"
                className={`inline-flex w-full items-center justify-center rounded-2xl border px-3 py-2 body-sm font-semibold transition hover:bg-white/5 ${themeTokens.button}`}
                onClick={() => setDrawerOpen(false)}
              >
                ← Retour à l&apos;accueil
              </Link>
              <ul className="space-y-1">
                {tutorialStacks.map(({ id, label }) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => setStack(id)}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left body-sm font-semibold transition ${
                        stack === id ? `${themeTokens.accent}` : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {label}
                      {stack === id && <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />}
                    </button>
                  </li>
                ))}
              </ul>
              <p className={`eyebrow-label ${themeTokens.muted}`}>{stack === "node" ? "Node.js" : "Spring Boot"}</p>
              {steps.map((step) => (
                <a
                  key={step.id}
                  href={`#${step.id}`}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 transition hover:bg-white/5`}
                  onClick={() => setDrawerOpen(false)}
                >
                  <span className={`body-sm font-medium ${theme === "dark" ? "text-white" : "text-slate-700"}`}>{step.label}</span>
                  <FiChevronRight className="text-slate-400" />
                </a>
              ))}
            </nav>
          </aside>
          <main className="w-full">
            <div className="space-y-12">
            <button
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 body-sm shadow-sm transition hover:bg-white/5 lg:hidden ${themeTokens.button}`}
              onClick={() => setDrawerOpen(true)}
            >
              <FiMenu />
              Sommaire
            </button>
            <section
              id="intro"
              className={`space-y-8 rounded-[32px] px-6 py-10 shadow-[0_25px_60px_rgba(15,23,42,0.15)] sm:px-10 sm:py-12 ${themeTokens.hero}`}
            >
              <div className="space-y-2 max-w-3xl">
                <span className="eyebrow-label text-cyan-400">Tutoriel</span>
                <h1 className="heading-display">{content.heroTitle}</h1>
                <p className={`body-base ${themeTokens.muted}`}>{content.heroDescription}</p>
              </div>
              <div className={`rounded-2xl px-6 py-6 shadow-sm sm:px-8 ${themeTokens.card}`}>
                <p className={`heading-sm ${themeTokens.strong}`}>Vous allez apprendre</p>
                <ul className={`mt-4 space-y-3 body-base ${themeTokens.muted}`}>
                  {content.learnList.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-b from-cyan-300 to-cyan-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
                <div>
                  <h3 className={`heading-lg ${themeTokens.strong}`}>{content.quickStartHeading}</h3>
                  <p className={`body-sm ${themeTokens.muted}`}>{content.quickStartIntro}</p>
                  <div className="mt-4 flex flex-col gap-4">
                    {content.quickStartCards.map((card) => (
                      <article key={card.id} className={`rounded-2xl p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${themeTokens.card}`}>
                        <div className={`flex items-center justify-between mono-label ${themeTokens.accent}`}>
                          <span>{card.title}</span>
                          <span className={`${themeTokens.muted}`}>{card.minutes}</span>
                        </div>
                        <ConsoleWindow className="mt-3" title={card.title} language={card.language}>
                          <code>{card.command}</code>
                        </ConsoleWindow>
                        <ul className={`mt-4 space-y-2 body-base ${themeTokens.muted}`}>
                          {card.bullets.map((tip) => (
                            <li key={tip} className="flex items-start gap-3">
                              <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-b from-cyan-300 to-cyan-500" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </div>
                <div className={`rounded-2xl p-6 shadow-sm ${themeTokens.card}`}>
                  <h3 className={`heading-lg ${themeTokens.strong}`}>Arborescence recommandée</h3>
                  <p className={`body-base ${themeTokens.muted}`}>Utilisez la même structure pour aligner services, validations et tests.</p>
                  <ConsoleWindow className="mt-4" title="Structure" language="bash">
                    <code>{content.projectTree}</code>
                  </ConsoleWindow>
                </div>
                <div className={`rounded-2xl p-6 shadow-sm ${themeTokens.card}`}>
                  <h3 className={`heading-lg ${themeTokens.strong}`}>Contenu des fichiers clés</h3>
                  <p className={`body-base ${themeTokens.muted}`}>
                    Copiez-collez ces snippets pour obtenir un squelette d&apos;API complet, puis adaptez-les à votre domaine métier.
                  </p>
                  <div className="mt-6 space-y-5">
                    {content.projectFiles.map((file) => (
                      <article key={file.path} className={`rounded-2xl p-5 shadow-sm ${themeTokens.subCard}`}>
                        <div className="flex items-center justify-between gap-4">
                          <p className={`body-sm font-semibold ${themeTokens.strong}`}>{file.path}</p>
                          <span className={`mono-label ${themeTokens.accent}`}>Core</span>
                      </div>
                      <p className={`mt-2 body-sm ${themeTokens.muted}`}>{file.description}</p>
                      <ConsoleWindow className="mt-4" title={file.path} language={file.language}>
                        <code>{file.snippet}</code>
                      </ConsoleWindow>
                      </article>
                    ))}
                  </div>
                </div>
            </section>
            <div className="relative space-y-2 pb-10 mt-2">
              {content.tutorialSections.map((section, index) => {
                const stackClass = index === 0 ? "mt-0" : "mt-8";
                return (
                  <section
                    key={section.id}
                    id={section.id}
                    className={`relative ${stackClass}`}
                    style={{ zIndex: content.tutorialSections.length - index }}
                  >
                    <div className={`flex items-center gap-3 py-4 mono-label ${themeTokens.accent}`}>
                      <span>{`Étape ${index + 1}`}</span>
                      <span className="text-slate-500">/</span>
                      <span>{section.title}</span>
                    </div>
                    <div className={`rounded-3xl p-6 shadow-xl sm:p-8 ${themeTokens.card}`}>
                      <h2 className={`heading-lg ${themeTokens.strong}`}>{section.title}</h2>
                      <p className={`mt-3 body-base ${themeTokens.muted}`}>{section.description}</p>
                      {section.bullets && (
                        <ul className={`mt-4 space-y-3 body-base ${themeTokens.muted}`}>
                          {section.bullets.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                              <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-b from-cyan-300 to-cyan-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {section.code && (
                        <ConsoleWindow className="mt-4" title={section.title} language={section.codeLanguage}>
                          <code>{section.code}</code>
                        </ConsoleWindow>
                      )}
                    </div>
                  </section>
                );
              })}
            </div>
            <section className={`rounded-3xl px-6 py-6 sm:px-8 ${themeTokens.soft}`}>
              <h3 className={`heading-lg ${themeTokens.strong}`}>Ressources utiles</h3>
              <p className={`body-base ${themeTokens.muted}`}>Guides complémentaires pour aller plus loin.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {content.resources.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 body-sm transition ${theme === "dark" ? "border-cyan-400/20 text-cyan-200 hover:bg-cyan-500/10" : "border-cyan-400/40 text-cyan-600 hover:bg-cyan-50"}`}
                  >
                    {item.label}
                    <FiChevronRight className="text-sm" />
                  </a>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  </div>
  );
};

export default function TutorialPageWithProviders() {
  return <TutorialPage />;
}
