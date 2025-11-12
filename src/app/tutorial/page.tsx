"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import Link from "next/link";
import PageLoader from "@/components/PageLoader";
import { FiChevronRight, FiMenu, FiX } from "react-icons/fi";
import { tutorialContent, tutorialStacks, TutorialStack } from "@/data/tutorial";
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
  const stackLabels: Record<TutorialStack, string> = {
    node: "Node.js",
    spring: "Spring Boot",
    ansible: "Ansible",
    docker: "Docker"
  };
  const sectionPaths: Partial<Record<TutorialStack, Record<string, string>>> = {
    node: {
      validation: "src/schemas/userSchema.ts",
      services: "src/services/userService.ts",
      routes: "src/routes/userRoutes.ts",
      observability: "src/config/logger.ts",
      testing: "tests/user.test.ts"
    },
    spring: {
      config: "src/main/resources/application.yml",
      model: "src/main/java/simdev/demo/models/Tasks.java",
      repository: "src/main/java/simdev/demo/repositories/TasksRepository.java",
      services: "src/main/java/simdev/demo/servicesImpl/TasksServiceImpl.java",
      controller: "src/main/java/simdev/demo/controllers/TasksController.java",
      observability: "src/main/resources/application.yml",
      testing: "src/test/java/simdev/demo/services/unit/CreateTaskServiceTest.java",
      delivery: ".github/workflows/ci.yml"
    },
    ansible: {
      vars: "ansible/inventory.ini & group_vars/db.yml",
      roles: "ansible/roles/postgres/tasks/main.yml",
      playbook: "ansible/playbooks/postgres.yml",
      commands: "ansible/",
      quality: ".github/workflows/ansible.yml"
    },
    docker: {
      compose: "docker/docker-compose.yml",
      init: "docker/init/001_schema.sql",
      volumes: "docker/",
      verification: "docker/",
      troubleshooting: "docker/"
    }
  };
  const introSectionIds = ["intro", "setup"];
  const introSections = content.tutorialSections.filter((section) => introSectionIds.includes(section.id));
  const remainingSections = content.tutorialSections.filter((section) => !introSectionIds.includes(section.id));
  const themeTokens = useMemo(() => {
    if (theme === "aurora") {
      return {
        pageBg: "bg-white text-slate-900",
        panel: "bg-white border border-slate-200 shadow-sm text-slate-700",
        muted: "text-slate-600",
        button: "border-slate-200 text-slate-600 hover:bg-slate-100",
        accentLabel: "text-sky-600",
        strong: "text-slate-900",
        hero: "border border-slate-200 bg-white",
        card: "border border-slate-200 bg-white",
        subCard: "border border-slate-200 bg-slate-50",
        soft: "border border-slate-200 bg-slate-50",
        returnLink: "border border-slate-200 text-slate-700 hover:bg-slate-100",
        navSection: "rounded-2xl border border-slate-200 bg-slate-50 p-4",
        navSectionSecondary: "rounded-2xl border border-slate-200 bg-white p-4",
        navItemBase: "flex w-full items-center justify-between rounded-xl border px-4 py-2 text-left font-semibold transition",
        navItemActive: "border-sky-400 bg-sky-50 text-sky-900",
        navItem: "border-transparent text-slate-600 hover:bg-white",
        navStepBase: "group flex items-center justify-between rounded-xl border px-4 py-2 font-medium transition",
        navStepLink: "border-slate-200 text-slate-700 hover:border-slate-200 hover:bg-slate-50",
        bullet: "bg-sky-400"
      };
    }

    return {
      pageBg: "bg-slate-950 text-slate-100",
      panel: "bg-slate-950/80 border border-slate-800 text-slate-100",
      muted: "text-slate-400",
      button: "border-slate-700 text-slate-200 hover:bg-slate-900",
      accentLabel: "text-cyan-300",
      strong: "text-white",
      hero: "border border-slate-800 bg-slate-900",
      card: "border border-slate-800 bg-slate-900/80",
      subCard: "border border-slate-800 bg-slate-900/70",
      soft: "border border-slate-800 bg-slate-900/60",
      returnLink: "border border-slate-700 text-slate-100 hover:bg-slate-900",
      navSection: "rounded-2xl border border-slate-800 bg-slate-900 p-4",
      navSectionSecondary: "rounded-2xl border border-slate-800 bg-slate-900/80 p-4",
      navItemBase: "flex w-full items-center justify-between rounded-xl border px-4 py-2 text-left font-semibold transition",
      navItemActive: "border-cyan-400/60 bg-cyan-400/10 text-cyan-200",
      navItem: "border-white/5 text-slate-400 hover:border-cyan-400/30 hover:text-white",
      navStepBase: "group flex items-center justify-between rounded-xl border px-4 py-2 font-medium transition",
      navStepLink: "border-white/5 text-slate-200 hover:border-cyan-400/40 hover:bg-white/10",
      bullet: "bg-cyan-400"
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
        
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-8">
          <aside
            className={`fixed inset-y-0 left-0 z-40 flex h-full w-[88%] max-w-sm flex-col rounded-3xl px-6 py-8 shadow-sm transition-transform lg:sticky lg:top-8 lg:h-[calc(100vh-64px)] lg:w-full lg:max-w-none ${
              drawerOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            } ${themeTokens.panel}`}
            aria-label="Navigation du tutoriel"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className={`text-xs font-semibold uppercase tracking-[0.35em] ${themeTokens.accentLabel}`}>Tutoriels</p>
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
            <Link
              href="/"
              className={`mb-4 inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl border px-4 py-2 text-center text-sm font-semibold transition ${themeTokens.returnLink}`}
              onClick={() => setDrawerOpen(false)}
            >
              <span aria-hidden>←</span>
              <span>Retour à l&apos;accueil</span>
            </Link>
            <nav className="flex-1 space-y-4 overflow-y-auto pr-2 text-sm lg:min-h-0">
              <div className={themeTokens.navSection}>
                <p className={`text-xs font-semibold uppercase tracking-[0.35em] ${themeTokens.accentLabel}`}>Technologies</p>
                <ul className="mt-3 space-y-2">
                  {tutorialStacks.map(({ id, label }) => {
                    const stackClasses = `${themeTokens.navItemBase} ${
                      stack === id ? themeTokens.navItemActive : themeTokens.navItem
                    }`;
                    return (
                      <li key={id}>
                        <button
                          type="button"
                          aria-current={stack === id ? "true" : undefined}
                          onClick={() => {
                            setStack(id);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className={stackClasses}
                        >
                          <span>{label}</span>
                          {stack === id && <span className={`h-1.5 w-1.5 rounded-full ${theme === "aurora" ? "bg-sky-500" : "bg-cyan-400"}`} />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={themeTokens.navSectionSecondary}>
                <p className={`text-xs font-semibold uppercase tracking-[0.35em] ${themeTokens.accentLabel}`}>{stackLabels[stack]}</p>
                <ul className="mt-4 space-y-2">
                  {steps.map((step) => (
                    <li key={step.id}>
                      <a
                        href={`#${step.id}`}
                        className={`${themeTokens.navStepBase} ${themeTokens.navStepLink}`}
                        onClick={() => setDrawerOpen(false)}
                      >
                        <span>{step.label}</span>
                        <FiChevronRight className="text-slate-400 transition group-hover:translate-x-1" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
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
              className={`space-y-8 rounded-[32px] px-6 py-10 shadow-sm sm:px-10 sm:py-12 ${themeTokens.card}`}
            >
              <div className="space-y-2 max-w-3xl">
                <span className={`text-xs font-semibold uppercase tracking-[0.35em] ${themeTokens.accentLabel}`}>Apprendre</span>
                <h1 className={`heading-display ${themeTokens.strong}`}>{content.heroTitle}</h1>
                <p className={`body-base ${themeTokens.muted}`}>{content.heroDescription}</p>
              </div>
              <div className={`rounded-2xl px-6 py-6 sm:px-8 ${themeTokens.subCard}`}>
                <p className={`heading-sm ${themeTokens.strong}`}>Vous allez apprendre</p>
                <ul className={`mt-4 space-y-3 body-base ${themeTokens.muted}`}>
                  {content.learnList.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className={`mt-2 inline-block h-2.5 w-2.5 rounded-full ${themeTokens.bullet}`} />
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
                    <article key={card.id} className={`rounded-2xl p-4 shadow-sm ${themeTokens.card}`}>
                      <div className={`flex items-center justify-between text-xs font-semibold uppercase tracking-[0.35em] ${themeTokens.accentLabel}`}>
                        <span className={themeTokens.strong}>{card.title}</span>
                        <span className={themeTokens.muted}>{card.minutes}</span>
                      </div>
                      <ConsoleWindow className="mt-3" title={card.title} language={card.language}>
                        <code>{card.command}</code>
                      </ConsoleWindow>
                      <ul className={`mt-4 space-y-2 body-base ${themeTokens.muted}`}>
                        {card.bullets.map((tip) => (
                          <li key={tip} className="flex items-start gap-3">
                            <span className={`mt-2 inline-block h-2.5 w-2.5 rounded-full ${themeTokens.bullet}`} />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>
              {introSections.map((section) => (
                <article key={section.id} className={`rounded-2xl p-6 shadow-sm ${themeTokens.card}`}>
                  <h3 className={`heading-lg ${themeTokens.strong}`}>{section.title}</h3>
                  <p className={`mt-3 body-base ${themeTokens.muted}`}>{section.description}</p>
                  {section.bullets && (
                    <ul className={`mt-4 space-y-3 body-base ${themeTokens.muted}`}>
                      {section.bullets.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className={`mt-2 inline-block h-2.5 w-2.5 rounded-full ${themeTokens.bullet}`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.code && (
                    <ConsoleWindow
                      className="mt-4"
                      title={sectionPaths[stack]?.[section.id] ?? section.title}
                      language={section.codeLanguage}
                    >
                      <code>{section.code}</code>
                    </ConsoleWindow>
                  )}
                </article>
              ))}
              <div className={`rounded-2xl p-6 shadow-sm ${themeTokens.card}`}>
                  <h3 className={`heading-lg ${themeTokens.strong}`}>Contenu des fichiers clés</h3>
                  <p className={`body-base ${themeTokens.muted}`}>
                    Copiez-collez ces snippets pour obtenir un squelette d&apos;API complet, puis adaptez-les à votre domaine métier.
                  </p>
                  <div className="mt-6 space-y-5">
                    {content.projectFiles.map((file, index) => (
                      <article
                        key={`${file.path}-${index}`}
                        className={`rounded-2xl p-5 shadow-sm ${themeTokens.subCard}`}
                      >
                        <div className="flex flex-wrap items-center gap-3">
                          <p className={`body-sm font-semibold break-all ${themeTokens.strong}`}>{file.path}</p>
                          <span className={`text-xs font-semibold uppercase tracking-[0.35em] ${themeTokens.accentLabel}`}>Core</span>
                      </div>
                      <p className={`mt-2 body-sm ${themeTokens.muted}`}>{file.description}</p>
                        <ConsoleWindow className="mt-4 max-w-full break-all sm:break-normal" title={file.path} language={file.language}>
                          <code>{file.snippet}</code>
                        </ConsoleWindow>
                      </article>
                    ))}
                  </div>
                </div>
            </section>
            <div className="relative space-y-2 pb-10 mt-2">
              {remainingSections.map((section, index) => {
                const stackClass = index === 0 ? "mt-0" : "mt-8";
                return (
                  <section
                    key={section.id}
                    id={section.id}
                    className={`relative ${stackClass}`}
                    style={{ zIndex: content.tutorialSections.length - index }}
                  >
                    <div className={`flex items-center gap-3 py-4 text-xs font-semibold uppercase tracking-[0.35em] ${themeTokens.accentLabel}`}>
                      <span>{`Étape ${index + 1}`}</span>
                      <span className="text-slate-400">/</span>
                      <span>{section.title}</span>
                    </div>
                    <div className={`rounded-3xl p-6 shadow-sm sm:p-8 ${themeTokens.card}`}>
                      <h2 className={`heading-lg ${themeTokens.strong}`}>{section.title}</h2>
                      <p className={`mt-3 body-base ${themeTokens.muted}`}>{section.description}</p>
                      {section.bullets && (
                        <ul className={`mt-4 space-y-3 body-base ${themeTokens.muted}`}>
                          {section.bullets.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                            <span className={`mt-2 inline-block h-2.5 w-2.5 rounded-full ${themeTokens.bullet}`} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {section.code && (
                        <ConsoleWindow
                          className="mt-4"
                          title={sectionPaths[stack]?.[section.id] ?? section.title}
                          language={section.codeLanguage}
                        >
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
