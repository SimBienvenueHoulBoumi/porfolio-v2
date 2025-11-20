"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

const navItems: { id: string; label: string }[] = [
  { id: "hero", label: "Accueil" },
  { id: "skills", label: "Compétences" },
  { id: "experience", label: "Expérience" },
  { id: "contact", label: "Contact" }
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isElevated, setIsElevated] = useState(false);
  const { theme } = useTheme();
  const isAurora = theme === "aurora";

  useEffect(() => {
    const handleScroll = () => {
      setIsElevated(window.scrollY > 32);
      const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navBg = isAurora
    ? isElevated
      ? "bg-white/95 backdrop-blur-xl border-b border-cyan-200/60 shadow-xl shadow-cyan-200/30 backdrop-premium"
      : "bg-white/75 backdrop-blur-md border-b border-transparent shadow-none backdrop-premium"
    : isElevated
      ? "bg-gray-950/95 backdrop-blur-xl border-b border-cyan-500/40 shadow-xl shadow-cyan-900/50 backdrop-premium"
      : "bg-gray-950/50 backdrop-blur-md border-b border-transparent shadow-none backdrop-premium";

  const activeButton = isAurora
    ? "bg-cyan-500/20 text-cyan-600"
    : "bg-cyan-500/20 text-cyan-400";

  const inactiveButton = isAurora
    ? "text-slate-600 hover:text-cyan-600 hover:bg-slate-100/50"
    : "text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="layout-shell">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => scrollToSection("hero")}
            className="group flex items-center gap-3 rounded-full border border-transparent px-1 py-1 transition-all duration-300 hover:border-white/10"
            aria-label="Retour à l'accueil"
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br ${
                isAurora ? "from-cyan-400 via-cyan-500 to-cyan-500" : "from-cyan-400 via-blue-500 to-purple-600"
              } text-sm font-extrabold text-white shadow-lg shadow-cyan-500/40 group-hover:scale-105 transition-transform`}
            >
              SF
            </span>
            <span className="flex flex-col leading-tight text-left">
              <span
                className={`text-[10px] font-semibold uppercase tracking-[0.6em] ${
                  isAurora ? "text-slate-500/80" : "text-cyan-100/70"
                }`}
              >
                Sim
              </span>
              <span
                className={`text-base font-black tracking-wide ${
                  isAurora ? "text-slate-900" : "text-white"
                }`}
              >
                Simfolio
              </span>
            </span>
          </button>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-lg body-sm font-medium transition-all duration-300 relative overflow-hidden group scale-on-hover ${
                  activeSection === item.id ? activeButton : inactiveButton
                }`}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                <span className="relative z-10">{item.label}</span>
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-pulse shadow-glow-premium" />
                )}
              </button>
            ))}
          </div>

          <div className="md:hidden">
            <MobileMenu
              navItems={navItems}
              scrollToSection={scrollToSection}
              isAurora={isAurora}
              inactiveButton={inactiveButton}
              activeButton={activeButton}
              activeSection={activeSection}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

function MobileMenu({
  navItems,
  scrollToSection,
  isAurora,
  inactiveButton,
  activeButton,
  activeSection
}: {
  navItems: ReadonlyArray<{ id: string; label: string }>;
  scrollToSection: (id: string) => void;
  isAurora: boolean;
  inactiveButton: string;
  activeButton: string;
  activeSection: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const panelBg = isAurora
    ? "bg-white/95 text-slate-800 border border-cyan-100 shadow-cyan-200/40"
    : "bg-gray-900/95 text-gray-50 border border-cyan-500/20 shadow-cyan-900/30";
  const brandColor = isAurora ? "text-cyan-600" : "text-cyan-300";

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 transition-colors ${
          isAurora ? "text-slate-600 hover:text-cyan-600" : "text-gray-300 hover:text-cyan-400"
        }`}
        aria-label="Menu"
        aria-expanded={isOpen}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-x-3 top-16 z-50 md:hidden">
            <div className={`rounded-3xl px-5 py-6 shadow-2xl ${panelBg}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-3xl bg-gradient-to-br ${
                      isAurora ? "from-cyan-400 via-cyan-500 to-cyan-500" : "from-cyan-400 via-blue-500 to-purple-600"
                    } text-sm font-extrabold text-white shadow-lg shadow-cyan-500/40`}
                  >
                    SF
                  </span>
                  <div>
                    <p className={`text-lg font-semibold ${brandColor}`}>Simfolio</p>
                    <p className="text-xs uppercase tracking-[0.3em] opacity-70">Menu</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Fermer le menu"
                  className="rounded-full p-2 hover:bg-white/10 transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsOpen(false);
                  }}
                    className={`block w-full rounded-2xl px-4 py-3 text-left font-medium transition-all ${
                      isActive
                        ? isAurora
                          ? "bg-cyan-50 text-cyan-600 shadow-inner shadow-cyan-100"
                          : "bg-gray-800 text-cyan-300 shadow-inner shadow-cyan-900/30"
                        : "text-inherit hover:bg-white/5"
                    }`}
                >
                  {item.label}
                </button>
              );
            })}
            </div>
          </div>
          </div>
        </>
      )}
    </>
  );
}
