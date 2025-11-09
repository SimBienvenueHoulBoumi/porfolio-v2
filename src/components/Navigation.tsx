"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const navItems = [
  { id: "hero", labelEn: "Home", labelFr: "Accueil" },
  { id: "skills", labelEn: "Skills", labelFr: "Compétences" },
  { id: "experience", labelEn: "Experience", labelFr: "Expérience" },
  { id: "contact", labelEn: "Contact", labelFr: "Contact" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isAurora = theme === "aurora";

  useEffect(() => {
    const handleScroll = () => {
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navBg = isAurora
    ? "bg-white/95 backdrop-blur-md border-b border-sky-200/30 shadow-lg shadow-sky-200/10 transition-all duration-300"
    : "bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-cyan-500/20 transition-all duration-300";

  const activeButton = isAurora
    ? "bg-sky-500/20 text-sky-600"
    : "bg-cyan-500/20 text-cyan-400";

  const inactiveButton = isAurora
    ? "text-slate-600 hover:text-sky-600 hover:bg-slate-100/50"
    : "text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
      role="navigation"
      aria-label={language === "fr" ? "Navigation principale" : "Main navigation"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => scrollToSection("hero")}
            className={`text-xl font-bold transition-colors ${
              isAurora ? "text-sky-600 hover:text-sky-700" : "text-cyan-400 hover:text-cyan-300"
            }`}
            aria-label={language === "fr" ? "Retour à l'accueil" : "Back to home"}
          >
            Simfolio
          </button>
          
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                  activeSection === item.id ? activeButton : inactiveButton
                }`}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                <span className="relative z-10">{language === "fr" ? item.labelFr : item.labelEn}</span>
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse" />
                )}
              </button>
            ))}
          </div>

          <div className="md:hidden">
            <MobileMenu
              navItems={navItems}
              scrollToSection={scrollToSection}
              language={language}
              isAurora={isAurora}
              inactiveButton={inactiveButton}
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
  language,
  isAurora,
  inactiveButton
}: {
  navItems: Array<{ id: string; labelEn: string; labelFr: string }>;
  scrollToSection: (id: string) => void;
  language: string;
  isAurora: boolean;
  inactiveButton: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuBg = isAurora
    ? "bg-white/98 backdrop-blur-md border-b border-sky-200/30"
    : "bg-gray-900/98 backdrop-blur-md border-b border-cyan-500/20";

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 transition-colors ${
          isAurora ? "text-slate-600 hover:text-sky-600" : "text-gray-300 hover:text-cyan-400"
        }`}
        aria-label={language === "fr" ? "Menu" : "Menu"}
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
        <div className={`absolute top-16 left-0 right-0 ${menuBg} md:hidden`}>
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${inactiveButton}`}
              >
                {language === "fr" ? item.labelFr : item.labelEn}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
