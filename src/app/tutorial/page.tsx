"use client";

import { useCallback, useEffect, useState } from "react";

import Link from "next/link";
import PageLoader from "@/components/PageLoader";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { FiChevronRight, FiMenu, FiX } from "react-icons/fi";
import { tutorialContent, tutorialStacks, TutorialStack } from "@/data/nodeApiTutorial";
import ConsolePanel from "@/components/ui/Console";

const TutorialPage = () => {
  const [isReady, setIsReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleComplete = useCallback(() => setIsReady(true), []);
  const [stack, setStack] = useState<TutorialStack>("node");
  const content = tutorialContent[stack];
  const steps = content.sidebar;

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
    <div className="min-h-screen bg-slate-50 text-slate-900">
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
            className={`fixed inset-y-0 left-0 z-40 flex h-full w-[88%] max-w-sm flex-col rounded-r-[28px] border border-l-0 border-slate-100 bg-white px-6 py-8 shadow-[0_25px_60px_rgba(15,23,42,0.08)] transition-transform lg:sticky lg:top-8 lg:h-[calc(100vh-64px)] lg:w-full lg:max-w-none lg:rounded-[28px] lg:border ${
              drawerOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            }`}
            aria-label="Navigation du tutoriel"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="eyebrow-label">Tutoriel</p>
                <h2 className="heading-sm text-slate-900">Démarrage rapide</h2>
              </div>
              <button
                type="button"
                className="rounded-full border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 lg:hidden"
                onClick={() => setDrawerOpen(false)}
                aria-label="Fermer le sommaire"
              >
                <FiX />
              </button>
            </div>
            <nav className="space-y-3 body-sm text-slate-600">
              <Link
                href="/"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 px-3 py-2 body-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white"
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
                        stack === id ? "text-cyan-600" : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {label}
                      {stack === id && <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />}
                    </button>
                  </li>
                ))}
              </ul>
              <p className="eyebrow-label text-slate-400">{stack === "node" ? "Node.js" : "Spring Boot"}</p>
              {steps.map((step) => (
                <a
                  key={step.id}
                  href={`#${step.id}`}
                  className="flex items-center justify-between rounded-xl px-3 py-2 transition hover:bg-white hover:shadow-sm"
                  onClick={() => setDrawerOpen(false)}
                >
                  <span className="body-sm font-medium text-slate-700">{step.label}</span>
                  <FiChevronRight className="text-slate-400" />
                </a>
              ))}
            </nav>
          </aside>
          <main className="w-full">
            <div className="space-y-12">
            <button
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 body-sm text-slate-600 shadow-sm transition hover:bg-white lg:hidden"
              onClick={() => setDrawerOpen(true)}
            >
              <FiMenu />
              Sommaire
            </button>
            <section
              id="intro"
              className="space-y-8 rounded-[32px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 px-6 py-10 shadow-[0_25px_60px_rgba(15,23,42,0.08)] sm:px-10 sm:py-12"
            >
              <div className="space-y-2 max-w-3xl">
                <span className="eyebrow-label text-cyan-500">Tutoriel</span>
                <h1 className="heading-display">{content.heroTitle}</h1>
                <p className="body-base text-slate-600">{content.heroDescription}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-6 py-6 shadow-sm sm:px-8">
                <p className="heading-sm text-slate-900">Vous allez apprendre</p>
                <ul className="mt-4 space-y-3 body-base text-slate-600">
                  {content.learnList.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-b from-cyan-300 to-cyan-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
                <div>
                  <h3 className="heading-lg text-slate-900">Quick start</h3>
                  <p className="body-sm text-slate-500">Les trois blocs critiques pour livrer une API robuste.</p>
                  <div className="mt-4 flex flex-col gap-4">
                    {content.quickStartCards.map((card) => (
                      <article key={card.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                        <div className="flex items-center justify-between mono-label text-cyan-500">
                          <span>{card.title}</span>
                          <span className="text-slate-400">{card.minutes}</span>
                        </div>
                        <ConsolePanel className="mt-3" title={card.title}>
                          <code>{card.command}</code>
                        </ConsolePanel>
                        <ul className="mt-4 space-y-2 body-base text-slate-600">
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
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="heading-lg text-slate-900">Arborescence recommandée</h3>
                  <p className="body-base text-slate-500">Utilisez la même structure pour aligner services, validations et tests.</p>
                  <ConsolePanel className="mt-4" title="Structure">
                    <code>{content.projectTree}</code>
                  </ConsolePanel>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="heading-lg text-slate-900">Contenu des fichiers clés</h3>
                  <p className="body-base text-slate-500">
                    Copiez-collez ces snippets pour obtenir un squelette d&apos;API complet, puis adaptez-les à votre domaine métier.
                  </p>
                  <div className="mt-6 space-y-5">
                    {content.projectFiles.map((file) => (
                      <article key={file.path} className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
                        <div className="flex items-center justify-between gap-4">
                          <p className="body-sm font-semibold text-slate-900">{file.path}</p>
                          <span className="mono-label text-cyan-500">Core</span>
                      </div>
                      <p className="mt-2 body-sm text-slate-500">{file.description}</p>
                      <ConsolePanel className="mt-4" title={file.path}>
                        <code>{file.snippet}</code>
                      </ConsolePanel>
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
                    <div className="flex items-center gap-3 py-4 mono-label text-cyan-600">
                      <span>{`Étape ${index + 1}`}</span>
                      <span className="text-slate-300">/</span>
                      <span>{section.title}</span>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl sm:p-8">
                      <h2 className="heading-lg text-slate-900">{section.title}</h2>
                      <p className="mt-3 body-base text-slate-600">{section.description}</p>
                      {section.bullets && (
                        <ul className="mt-4 space-y-3 body-base text-slate-600">
                          {section.bullets.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                              <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-b from-cyan-300 to-cyan-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {section.code && (
                        <ConsolePanel className="mt-4" title={section.title}>
                          <code>{section.code}</code>
                        </ConsolePanel>
                      )}
                    </div>
                  </section>
                );
              })}
            </div>
            <section className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-6 sm:px-8">
              <h3 className="heading-lg text-slate-900">Ressources utiles</h3>
              <p className="body-base text-slate-500">Guides complémentaires pour aller plus loin.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {content.resources.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 px-4 py-2 body-sm text-cyan-600 transition hover:bg-cyan-50"
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
  return (
    <ThemeProvider>
      <LanguageProvider>
        <TutorialPage />
      </LanguageProvider>
    </ThemeProvider>
  );
}
