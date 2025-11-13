"use client";

import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";

interface InteractivePlaygroundProps {
  code: string;
  language: string;
  title?: string;
}

export default function InteractivePlayground({ code, language, title }: InteractivePlaygroundProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const themeTokens = {
    bg: theme === "aurora" ? "bg-white" : "bg-slate-900",
    border: theme === "aurora" ? "border-slate-200" : "border-slate-800",
    text: theme === "aurora" ? "text-slate-900" : "text-slate-100",
    muted: theme === "aurora" ? "text-slate-600" : "text-slate-400",
    button: theme === "aurora" ? "bg-slate-100 hover:bg-slate-200" : "bg-slate-800 hover:bg-slate-700",
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Erreur lors de la copie:", error);
    }
  };

  return (
    <div className={`rounded-2xl border ${themeTokens.border} ${themeTokens.bg} overflow-hidden`}>
      <div className={`flex items-center justify-between px-4 py-3 border-b ${themeTokens.border}`}>
        <div className="flex items-center gap-3">
          <span className={`text-sm font-medium ${themeTokens.text}`}>
            {title || "Playground Interactif"}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${theme === "aurora" ? "bg-slate-100 text-slate-600" : "bg-slate-800 text-slate-400"}`}>
            {language}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyCode}
            className={`p-2 rounded-lg transition ${themeTokens.button} ${themeTokens.text}`}
            title="Copier le code"
          >
            {copied ? <FiCheck className="text-green-500" /> : <FiCopy />}
          </button>
        </div>
      </div>

      <div className="p-4">
        <pre className={`text-sm overflow-auto ${themeTokens.text} font-mono`}>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
