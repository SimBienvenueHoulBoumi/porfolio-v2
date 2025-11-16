"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { useSelectedLayoutSegment } from "next/navigation";

import ThemeToggle from "@/components/ThemeToggle";
import { tutorialStacks, type TutorialStack } from "@/data/tutorial";
import { useTheme } from "@/context/ThemeContext";
import { getTutorialThemeTokens } from "./theme-tokens";

const backendStacks = tutorialStacks.filter(({ id }) => id !== "sql" && id !== "nosql");
const databaseStacks = tutorialStacks.filter(({ id }) => id === "sql" || id === "nosql");

const isValidStack = (value: unknown): value is TutorialStack =>
  typeof value === "string" && tutorialStacks.some((stack) => stack.id === value);

type TutorialLayoutProps = {
  children: React.ReactNode;
};

export default function TutorialLayout({ children }: TutorialLayoutProps) {
  const { theme } = useTheme();
  const themeTokens = getTutorialThemeTokens(theme);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeSegment = useSelectedLayoutSegment();
  const activeStack = isValidStack(activeSegment) ? activeSegment : tutorialStacks[0].id;
  const accentColor = theme === "aurora" ? "bg-lime-500" : "bg-emerald-400";

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
      <div className="layout-shell min-h-screen py-4 sm:py-8 overflow-x-hidden">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-4 lg:h-[calc(100vh-4rem)] lg:overflow-hidden">
          <aside
            className={`fixed inset-y-0 left-0 z-40 flex h-full w-[88%] max-w-sm flex-col rounded-3xl px-6 py-8 transition-transform lg:sticky lg:top-8 lg:h-[calc(100vh-64px)] lg:w-full lg:max-w-none ${
              drawerOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            } ${themeTokens.panel}`}
            aria-label="Navigation du tutoriel"
          >
            <div className="mb-6 flex items-center justify-end">
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
              <span>Retour à l'accueil</span>
            </Link>
            <nav className="flex-1 space-y-8 overflow-y-auto pr-2 text-sm lg:min-h-0">
              <div className={themeTokens.navSection}>
                <p className={themeTokens.navHeading}>Backend & DevOps</p>
                <ul className={themeTokens.navList}>
                  {backendStacks.map(({ id, label }) => {
                    const isActive = activeStack === id;
                    const stackClasses = `${themeTokens.navItemBase} ${
                      isActive ? themeTokens.navItemActive : themeTokens.navItem
                    }`;
                    return (
                      <li key={id}>
                        <Link
                          href={`/tutorial/${id}`}
                          onClick={() => {
                            setDrawerOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          aria-current={isActive ? "true" : undefined}
                          className={stackClasses}
                        >
                          <span>{label}</span>
                          {isActive && <span className={`h-1.5 w-1.5 rounded-full ${accentColor}`} />}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={themeTokens.navSection}>
                <p className={themeTokens.navHeading}>Bases de données</p>
                <ul className={themeTokens.navList}>
                  {databaseStacks.map(({ id, label }) => {
                    const isActive = activeStack === id;
                    const stackClasses = `${themeTokens.navItemBase} ${
                      isActive ? themeTokens.navItemActive : themeTokens.navItem
                    }`;
                    return (
                      <li key={id}>
                        <Link
                          href={`/tutorial/${id}`}
                          onClick={() => {
                            setDrawerOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          aria-current={isActive ? "true" : undefined}
                          className={stackClasses}
                        >
                          <span>{label}</span>
                          {isActive && <span className={`h-1.5 w-1.5 rounded-full ${accentColor}`} />}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>
          </aside>
          <div className="w-full pt-20 lg:pt-0 lg:h-[calc(100vh-4rem)] lg:overflow-hidden">
            <div className="lg:hidden">
              <div className="fixed top-4 inset-x-0 z-50 flex items-center justify-between gap-1 rounded-3xl border border-slate-700 bg-slate-900 px-6 py-3 shadow-xl shadow-slate-900/50 transition">
                <button
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 body-sm shadow-sm transition hover:bg-slate-800 ${themeTokens.button}`}
                  onClick={() => setDrawerOpen(!drawerOpen)}
                >
                  <FiMenu />
                  Sommaire
                </button>
                <ThemeToggle />
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
