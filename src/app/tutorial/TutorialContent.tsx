"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { FiChevronRight } from "react-icons/fi";

import Button from "@/components/ui/Button";
import ConsoleWindow from "@/components/ui/ConsoleWindow";
import InteractivePlayground from "@/components/ui/InteractivePlayground";
import PageLoader from "@/components/PageLoader";

import { tutorialContent, type TutorialStack } from "@/data/tutorial";
import { useTheme } from "@/context/ThemeContext";
import { getTutorialThemeTokens } from "./theme-tokens";
import { useTutorialLoading } from "./loading-context";

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
  },
  linux: {
    files: "/etc/passwd",
    processes: "/proc/",
    services: "/etc/systemd/system/",
    disk: "/etc/fstab",
    ssh: "/etc/ssh/sshd_config",
    users: "/etc/group"
  },
  sql: {
    basics: "sql/foundations.sql",
    intermediate: "sql/analytics/joins.sql",
    advanced: "sql/analytics/windows.sql",
    optimization: "sql/optimization/indexing.sql"
  },
  nosql: {
    basics: "nosql/foundations.js",
    queries: "nosql/analytics/aggregation.js",
    indexing: "nosql/indexing.js",
    design: "nosql/design/schema_patterns.js"
  }
};

type TutorialContentProps = {
  stack: TutorialStack;
};

export default function TutorialContent({ stack }: TutorialContentProps) {
  const { theme } = useTheme();
  const content = tutorialContent[stack];
  const themeTokens = getTutorialThemeTokens(theme);
  const [isReady, setIsReady] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(content.tutorialSections[0]?.id ?? null);
  const [useInnerScroll, setUseInnerScroll] = useState(false);
  const [contentEl, setContentEl] = useState<HTMLDivElement | null>(null);
  const { markReady } = useTutorialLoading();

  const handleComplete = useCallback(() => {
    setIsReady(true);
    markReady();
  }, [markReady]);

  const steps = useMemo(
    () =>
      content.sidebar
        .map((entry) => {
          const section = content.tutorialSections.find((section) => section.id === entry.id);
          return section ? { ...entry, label: section.title ?? entry.label } : entry;
        })
        .filter((entry) => content.tutorialSections.some((section) => section.id === entry.id)),
    [content]
  );

  const introSectionIds = ["intro", "setup", "structure"];
  const introSections = content.tutorialSections.filter((section) => introSectionIds.includes(section.id));
  const remainingSections = content.tutorialSections.filter((section) => !introSectionIds.includes(section.id));

  useEffect(() => {
    setActiveSection(content.tutorialSections[0]?.id ?? null);
  }, [content]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }
    const mql = window.matchMedia("(min-width: 1024px)");
    const update = (event: MediaQueryList | MediaQueryListEvent) => {
      setUseInnerScroll(event.matches);
    };
    update(mql);
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", update);
    } else {
      mql.addListener(update);
    }

    // Écouter les événements de marquage de section comme terminée
    const handleSectionComplete = (event: CustomEvent<{ sectionId: string }>) => {
      const { sectionId } = event.detail;
      // Mettre à jour le localStorage
      const key = `tutorial-progress-${stack}`;
      const saved = localStorage.getItem(key);
      let progress: { completedSections: string[]; currentSection: string | null; lastUpdated: Date } = {
        completedSections: [],
        currentSection: null,
        lastUpdated: new Date()
      };
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          progress = { ...parsed, lastUpdated: new Date(parsed.lastUpdated) };
        } catch (error) {
          console.error("Erreur lors du chargement de la progression:", error);
        }
      }
      if (!progress.completedSections.includes(sectionId)) {
        progress.completedSections.push(sectionId);
        localStorage.setItem(key, JSON.stringify(progress));
      }
    };

    window.addEventListener('sectionComplete', handleSectionComplete as EventListener);

    return () => {
      if (typeof mql.removeEventListener === "function") {
        mql.removeEventListener("change", update);
      } else {
        mql.removeListener(update);
      }
    };
  }, [stack]);

  useEffect(() => {
    if (useInnerScroll && !contentEl) {
      return undefined;
    }

    const scrollRoot = useInnerScroll ? contentEl : null;
    const lookupRoot: ParentNode = scrollRoot ?? document;

    const sectionElements = steps
      .map((step) => lookupRoot.querySelector(`#${step.id}`))
      .filter((element): element is HTMLElement => Boolean(element));

    if (sectionElements.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting || entry.intersectionRatio > 0);
        if (visibleEntries.length === 0) {
          return;
        }

        const rootTop = scrollRoot ? scrollRoot.getBoundingClientRect().top : 0;

        visibleEntries.sort((a, b) => {
          const aDistance = Math.abs(a.boundingClientRect.top - rootTop);
          const bDistance = Math.abs(b.boundingClientRect.top - rootTop);
          if (Math.abs(aDistance - bDistance) < 1) {
            return b.intersectionRatio - a.intersectionRatio;
          }
          return aDistance - bDistance;
        });

        const nextId = visibleEntries[0].target.id;
        setActiveSection((current) => (current === nextId ? current : nextId));
      },
      {
        root: scrollRoot ?? undefined,
        rootMargin: scrollRoot ? "0px 0px -40% 0px" : "-10% 0px -40% 0px",
        threshold: [0, 0.25, 0.5]
      }
    );

    sectionElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [steps, useInnerScroll, contentEl]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [stack]);

  if (!isReady) {
    return <PageLoader onComplete={handleComplete} />;
  }

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-4">
      <main className="w-full pt-8 sm:pt-12 md:pt-16 lg:pt-0 lg:h-[calc(100vh-4rem)] lg:overflow-hidden">
        <div
          ref={setContentEl}
          className="space-y-12 pt-6 lg:pt-0 lg:h-full lg:overflow-y-auto lg:pr-2"
        >
          <section
            id="intro"
            className={`space-y-8 rounded-[32px] px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 shadow-sm ${themeTokens.card}`}
          >
            <div className="space-y-2 max-w-3xl">
              <span className={`text-xs font-semibold uppercase tracking-[0.35em] ${themeTokens.accentLabel}`}>Apprendre</span>
              <h1 className={`heading-display ${themeTokens.strong}`}>{content.heroTitle}</h1>
              <p className={`body-base ${themeTokens.muted}`}>{content.heroDescription}</p>
            </div>
            <div className={`rounded-2xl px-4 sm:px-8 py-4 sm:py-6 ${themeTokens.subCard}`}>
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
                  <article key={card.id} className={`rounded-2xl p-3 sm:p-4 shadow-sm ${themeTokens.card}`}>
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
              <article key={section.id} className={`rounded-2xl p-4 sm:p-6 shadow-sm ${themeTokens.card}`}>
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

            <section className={`rounded-2xl px-4 sm:px-6 py-4 sm:py-6 ${themeTokens.soft}`}>
              <div className="space-y-3">
                <h3 className={`heading-lg ${themeTokens.strong}`}>Contenu des fichiers clés</h3>
                <p className={`body-base ${themeTokens.muted}`}>Chaque extrait met en lumière les fichiers d’infrastructure et de service les plus critiques.</p>
              </div>
              <div className="mt-4 space-y-6 divide-y divide-slate-700/30">
                {content.projectFiles.map((file, index) => (
                  <article key={`${file.path}-${index}`} className="space-y-3 py-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className={`body-sm font-semibold break-all ${themeTokens.strong}`}>{file.path}</p>
                      <span className={`text-xs font-semibold uppercase tracking-[0.35em] ${themeTokens.accentLabel}`}>Core</span>
                    </div>
                    <p className={`body-sm ${themeTokens.muted}`}>{file.description}</p>
                    <ConsoleWindow className="mt-2 max-w-full break-all sm:break-normal" title={file.path} language={file.language}>
                      <code>{file.snippet}</code>
                    </ConsoleWindow>
                  </article>
                ))}
              </div>
            </section>
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
                  <div className={`rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm ${themeTokens.card}`}>
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
                    {section.interactive && (
                      <div className="mt-6">
                        {section.interactive.type === "playground" ? (
                          <InteractivePlayground
                            code={section.interactive.code || section.code || ""}
                            language={section.interactive.language || section.codeLanguage || "typescript"}
                            title={`Playground: ${section.title}`}
                          />
                        ) : section.interactive.type === "demo" ? (
                          <InteractivePlayground
                            code={section.interactive.code || section.code || ""}
                            language={section.interactive.language || section.codeLanguage || "typescript"}
                            title={`Démo: ${section.title}`}
                          />
                        ) : null}
                      </div>
                    )}

                  </div>
                </section>
              );
            })}
          </div>
          <section className={`rounded-3xl px-4 sm:px-8 py-4 sm:py-6 ${themeTokens.soft}`}>
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
          <section className={`rounded-3xl px-4 sm:px-8 py-4 sm:py-6 ${themeTokens.card}`}>
            <h3 className={`heading-lg ${themeTokens.strong}`}>Soutenir mes recherches</h3>
            <p className={`body-base ${themeTokens.muted}`}>
              Ces tutoriels restent gratuits et évolutifs grâce au temps passé en veille et en expérimentation. Si vous souhaitez encourager ce travail,
              vous pouvez offrir un café.
            </p>
            <div className="mt-4">
              <Button
                as="a"
                href="https://buymeacoffee.com/simdev"
                isAurora={theme === "aurora"}
                target="_blank"
                rel="noreferrer"
              >
                Offrir un café
              </Button>
            </div>
          </section>
        </div>
      </main>
      <aside className="hidden lg:block">
        <div className={`${themeTokens.outlineCard} sticky top-8 max-h-[calc(100vh-64px)] overflow-auto`}>
          <p className={themeTokens.outlineHeading}>Sur cette page</p>
          <ol className="mt-4 space-y-3">
            {steps.map((step) => (
              <li key={step.id} className={themeTokens.outlineBullet}>
                <a
                  href={`#${step.id}`}
                  className={themeTokens.outlineLink}
                  onClick={(event) => {
                    event.preventDefault();
                    const target = document.getElementById(step.id);
                    if (target) {
                      window.history.replaceState(null, "", `#${step.id}`);
                      setActiveSection(step.id);
                      target.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                >
                  {step.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </aside>
    </div>
  );
}
