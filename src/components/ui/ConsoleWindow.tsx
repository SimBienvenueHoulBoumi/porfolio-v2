"use client";

/* eslint-disable @typescript-eslint/no-require-imports */

import React, { ReactNode, useState, useMemo, isValidElement, useEffect } from "react";
import { Highlight, themes, type Language } from "prism-react-renderer";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-java";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-json";
import "prismjs/components/prism-ini";
import "prismjs/components/prism-python";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-docker";
import { FiTerminal, FiChevronDown } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";

const ensurePrismGlobal = () => {
  const globalAny = globalThis as typeof globalThis & { Prism?: typeof Prism };
  if (!globalAny.Prism) {
    globalAny.Prism = Prism;
  }
};

interface ConsoleWindowProps {
  children: ReactNode;
  title?: string;
  className?: string;
  language?: Language;
}

const ConsoleWindow = ({ children, title, className = "", language = "typescript" }: ConsoleWindowProps) => {
  const textContent = useMemo(() => extractText(children), [children]);
  const { theme } = useTheme();
  const isAurora = theme === "aurora";
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    ensurePrismGlobal();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mql = window.matchMedia("(max-width: 640px)");
    const update = (event: MediaQueryList | MediaQueryListEvent) => {
      setIsMobile(event.matches);
      if (!event.matches) {
        setMobileOpen(false);
      }
    };
    update(mql);
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", update);
    } else {
      mql.addListener(update);
    }
    return () => {
      if (typeof mql.removeEventListener === "function") {
        mql.removeEventListener("change", update);
      } else {
        mql.removeListener(update);
      }
    };
  }, []);

  if (isMobile) {
    const mobileShell = isAurora
      ? "border-slate-200 bg-white"
      : "border-slate-800/50 bg-slate-900";
    const mobileText = isAurora ? "text-slate-700" : "text-slate-100";

    return (
      <div className={`rounded-2xl border ${mobileShell} shadow-sm ${className}`}>
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-sky-100 p-2 text-sky-500">
              <FiTerminal />
            </span>
            <div className="flex flex-col min-w-0">
              <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Log</span>
              <span className={`font-semibold text-sm truncate max-w-[200px] ${mobileText}`}>
                {title ?? "Snippet"}
              </span>
            </div>
          </div>
          <FiChevronDown
            className={`text-slate-500 transition-transform ${mobileOpen ? "rotate-180" : ""}`}
          />
        </button>
        {mobileOpen && (
          <div className={`mx-3 mb-3 rounded-2xl border ${mobileShell} px-4 py-3 ${mobileText}`}>
            <pre className="whitespace-pre-wrap break-words text-[13px] leading-6 max-h-60 overflow-auto">
              {textContent}
            </pre>
          </div>
        )}
      </div>
    );
  }

  const desktopShell = isAurora
    ? "border border-slate-200 bg-slate-50 text-slate-800"
    : "border border-slate-800/50 bg-slate-900 text-slate-100";
  const highlightTheme = isAurora ? themes.duotoneLight : themes.nightOwl;

  return (
    <div className={`rounded-3xl ${desktopShell} ${className}`}>
      <div className="relative p-4 pt-12">
        <div className="absolute right-4 top-4">
          <CopyButton text={textContent} />
        </div>
        <Highlight prism={Prism as never} code={textContent} language={language} theme={highlightTheme}>
          {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${highlightClassName} overflow-x-auto whitespace-pre-wrap break-words text-sm leading-7`}
              style={{ ...style, backgroundColor: "transparent" }}
            >
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i });
                const { key: lineKey, className: lineClassName, ...lineRest } = lineProps;
                const safeLineKey = typeof lineKey === "string" || typeof lineKey === "number" ? lineKey : i;
                return (
                  <div key={safeLineKey} {...lineRest} className={`table-row ${lineClassName ?? ""}`}>
                    <span className="table-cell select-none pr-4 text-right text-[11px] opacity-60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="table-cell">
                      {line.map((token, tokenIndex) => {
                        const tokenProps = getTokenProps({ token, key: tokenIndex });
                        const { key: tokenKey, ...rest } = tokenProps;
                        const safeKey =
                          typeof tokenKey === "string" || typeof tokenKey === "number" ? tokenKey : `${i}-${tokenIndex}`;
                        return <span key={safeKey} {...rest} />;
                      })}
                    </span>
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};
const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const isAurora = theme === "aurora";

  const handleCopy = async () => {
    if (!text) {
      return;
    }

    const fallbackCopy = () => {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      textarea.style.pointerEvents = "none";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);
      try {
        const ok = document.execCommand("copy");
        setCopied(ok);
      } catch {
        setCopied(false);
      } finally {
        document.body.removeChild(textarea);
      }
    };

    const canUseClipboard =
      typeof window !== "undefined" && window.isSecureContext && navigator.clipboard && navigator.clipboard.writeText;

    if (canUseClipboard) {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
        return;
      } catch {
        // continue to fallback
      }
    }

    fallbackCopy();
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] transition ${
        isAurora
          ? "border-slate-200 text-slate-900 bg-white/80 hover:bg-white"
          : "border-emerald-400/70 text-emerald-200 hover:border-emerald-300 hover:text-white"
      }`}
    >
      {copied ? "Copié !" : "Copier"}
    </button>
  );
};

export default ConsoleWindow;

function extractText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") {
    return "";
  }

  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractText).join("");
  }

  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    return extractText(props.children);
  }

  return "";
}
