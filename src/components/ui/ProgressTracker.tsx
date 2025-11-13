"use client";

import { useState, useEffect } from "react";
import { FiCheck, FiPlay, FiLock } from "react-icons/fi";
import { TutorialStack, ProgressState } from "@/data/tutorial";
import { useTheme } from "@/context/ThemeContext";

interface ProgressTrackerProps {
  stack: TutorialStack;
  sections: Array<{ id: string; title: string }>;
  currentSection: string | null;
}

export default function ProgressTracker({ stack, sections, currentSection }: ProgressTrackerProps) {
  const [progress, setProgress] = useState<ProgressState>({
    completedSections: [],
    currentSection: null,
    lastUpdated: new Date()
  });
  const { theme } = useTheme();

  // Charger la progression depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`tutorial-progress-${stack}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProgress({
          ...parsed,
          lastUpdated: new Date(parsed.lastUpdated)
        });
      } catch (error) {
        console.error("Erreur lors du chargement de la progression:", error);
      }
    }
  }, [stack]);

  // Sauvegarder la progression
  const saveProgress = (newProgress: ProgressState) => {
    setProgress(newProgress);
    localStorage.setItem(`tutorial-progress-${stack}`, JSON.stringify(newProgress));
  };

  const markSectionComplete = (sectionId: string) => {
    if (!progress.completedSections.includes(sectionId)) {
      const newProgress: ProgressState = {
        ...progress,
        completedSections: [...progress.completedSections, sectionId],
        lastUpdated: new Date()
      };
      saveProgress(newProgress);
    }
  };

  const setCurrentSection = (sectionId: string) => {
    const newProgress: ProgressState = {
      ...progress,
      currentSection: sectionId,
      lastUpdated: new Date()
    };
    saveProgress(newProgress);
  };

  const resetProgress = () => {
    const newProgress: ProgressState = {
      completedSections: [],
      currentSection: null,
      lastUpdated: new Date()
    };
    saveProgress(newProgress);
  };

  const getSectionStatus = (sectionId: string) => {
    if (progress.completedSections.includes(sectionId)) {
      return "completed";
    }
    if (currentSection === sectionId || progress.currentSection === sectionId) {
      return "current";
    }
    return "locked";
  };

  const completedCount = progress.completedSections.length;
  const totalCount = sections.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const themeTokens = {
    bg: theme === "aurora" ? "bg-white" : "bg-slate-900",
    border: theme === "aurora" ? "border-slate-200" : "border-slate-800",
    text: theme === "aurora" ? "text-slate-900" : "text-slate-100",
    muted: theme === "aurora" ? "text-slate-600" : "text-slate-400",
    progressBg: theme === "aurora" ? "bg-slate-200" : "bg-slate-700",
    progressFill: theme === "aurora" ? "bg-lime-500" : "bg-emerald-500",
    completed: theme === "aurora" ? "text-lime-600 bg-lime-50 border-lime-200" : "text-emerald-400 bg-emerald-900/20 border-emerald-800",
    current: theme === "aurora" ? "text-blue-600 bg-blue-50 border-blue-200" : "text-blue-400 bg-blue-900/20 border-blue-800",
    locked: theme === "aurora" ? "text-slate-400 bg-slate-50 border-slate-200" : "text-slate-500 bg-slate-800/50 border-slate-700"
  };

  return (
    <div className={`rounded-2xl border ${themeTokens.border} ${themeTokens.bg} p-6`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={`text-lg font-semibold ${themeTokens.text}`}>Progression</h3>
          <p className={`text-sm ${themeTokens.muted}`}>
            {completedCount} sur {totalCount} sections terminées
          </p>
        </div>
        <button
          onClick={resetProgress}
          className={`text-sm px-3 py-1 rounded-lg transition ${
            theme === "aurora"
              ? "text-slate-600 hover:bg-slate-100"
              : "text-slate-400 hover:bg-slate-800"
          }`}
        >
          Réinitialiser
        </button>
      </div>

      {/* Barre de progression */}
      <div className={`w-full h-2 rounded-full ${themeTokens.progressBg} mb-6`}>
        <div
          className={`h-full rounded-full transition-all duration-300 ${themeTokens.progressFill}`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Liste des sections */}
      <div className="space-y-3">
        {sections.map((section, index) => {
          const status = getSectionStatus(section.id);
          const isClickable = status !== "locked";

          return (
            <div
              key={section.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition ${
                status === "completed"
                  ? themeTokens.completed
                  : status === "current"
                  ? themeTokens.current
                  : themeTokens.locked
              } ${isClickable ? "cursor-pointer hover:opacity-80" : "cursor-not-allowed"}`}
              onClick={() => {
                if (isClickable) {
                  setCurrentSection(section.id);
                  // Scroll vers la section
                  const element = document.getElementById(section.id);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }
              }}
            >
              <div className="flex-shrink-0">
                {status === "completed" ? (
                  <FiCheck className="w-5 h-5" />
                ) : status === "current" ? (
                  <FiPlay className="w-5 h-5" />
                ) : (
                  <FiLock className="w-5 h-5" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    Étape {index + 1}
                  </span>
                  <span className="text-xs opacity-75">
                    {section.title}
                  </span>
                </div>
              </div>

              {status === "completed" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Retirer de la liste des complétées
                    const newCompleted = progress.completedSections.filter(id => id !== section.id);
                    saveProgress({
                      ...progress,
                      completedSections: newCompleted,
                      lastUpdated: new Date()
                    });
                  }}
                  className="text-xs opacity-50 hover:opacity-100"
                >
                  ✕
                </button>
              )}
            </div>
          );
        })}
      </div>

      {progress.lastUpdated && (
        <div className={`text-xs ${themeTokens.muted} mt-4 text-center`}>
          Dernière mise à jour: {progress.lastUpdated.toLocaleDateString()}
        </div>
      )}
    </div>
  );
}
