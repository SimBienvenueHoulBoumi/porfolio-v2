"use client";

import React, { ReactNode, useState, useMemo, isValidElement, useEffect } from "react";
import { Highlight, themes, type Language } from "prism-react-renderer";
import Prism from "prismjs";
import { FiTerminal, FiChevronDown } from "react-icons/fi";

const ensurePrismGlobal = () => {
  const globalAny = globalThis as typeof globalThis & { Prism?: typeof Prism };
  if (!globalAny.Prism) {
    globalAny.Prism = Prism;
  }
};

const loadPrismLanguages = () => {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }
  const globalAny = globalThis as typeof globalThis & { __prismLanguagesPromise?: Promise<void> };
  ensurePrismGlobal();
  if (!globalAny.__prismLanguagesPromise) {
    globalAny.__prismLanguagesPromise = (async () => {
      await import("prismjs/components/prism-markup");
      await import("prismjs/components/prism-clike");
      await import("prismjs/components/prism-javascript");
      await import("prismjs/components/prism-typescript");
      await import("prismjs/components/prism-jsx");
      await import("prismjs/components/prism-tsx");
      await import("prismjs/components/prism-bash");
      await import("prismjs/components/prism-java");
      await import("prismjs/components/prism-yaml");
      await import("prismjs/components/prism-json");
    })();
  }
  return globalAny.__prismLanguagesPromise;
};

interface ConsoleWindowProps {
  children: ReactNode;
  title?: string;
  className?: string;
  language?: Language;
}

const ConsoleWindow = ({ children, title, className = "", language = "typescript" }: ConsoleWindowProps) => {
  const textContent = useMemo(() => extractText(children), [children]);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    let mounted = true;
    loadPrismLanguages().catch((err) => {
      if (mounted) {
        console.error("Prism languages failed to load", err);
      }
    });
    return () => {
      mounted = false;
    };
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
    return (
      <div className={`rounded-2xl border border-slate-200 bg-white/95 shadow-lg shadow-slate-200/50 ${className}`}>
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
              <span className="font-semibold text-slate-700 text-sm truncate max-w-[160px]">
                {title ?? "Sortie console"}
              </span>
            </div>
          </div>
          <FiChevronDown
            className={`text-slate-500 transition-transform ${mobileOpen ? "rotate-180" : ""}`}
          />
        </button>
        {mobileOpen && (
          <div className="mx-3 mb-3 rounded-2xl border border-slate-200 bg-slate-950/95 px-4 py-3 text-slate-100">
            <pre className="whitespace-pre-wrap break-words text-[13px] leading-6 max-h-60 overflow-auto">
              {textContent}
            </pre>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`rounded-3xl border border-slate-900/40 bg-slate-950/95 shadow-[0_20px_45px_rgba(15,23,42,0.35)] ${className}`}>
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex items-center gap-3">
          {title && <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">{title}</span>}
          <CopyButton text={textContent} />
        </div>
      </div>
      <div className="p-4">
        <Highlight
          prism={Prism as never}
          code={textContent}
          language={language}
          theme={{ ...themes.nightOwl, plain: { ...themes.nightOwl.plain, backgroundColor: "transparent" } }}
        >
          {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`code-block overflow-x-auto whitespace-pre-wrap break-words bg-transparent text-[13px] leading-7 sm:text-sm ${highlightClassName}`}
              style={{ ...style, backgroundColor: "transparent" }}
            >
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i });
                const { key: lineKey, className: lineClassName, ...lineRest } = lineProps;
                const safeLineKey = typeof lineKey === "string" || typeof lineKey === "number" ? lineKey : i;
                return (
                  <div key={safeLineKey} {...lineRest} className={`table-row ${lineClassName ?? ""}`}>
                    <span className="table-cell select-none pr-4 text-right text-[11px] text-slate-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="table-cell">
                    {line.map((token, tokenIndex) => {
                      const tokenProps = getTokenProps({ token, key: tokenIndex });
                      const { key: tokenKey, ...rest } = tokenProps;
                      const safeKey = typeof tokenKey === "string" || typeof tokenKey === "number" ? tokenKey : `${i}-${tokenIndex}`;
                      return <span key={safeKey} {...rest} />;
                    })}
                  </span>
                </div>
              );})}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};
const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

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
      className="rounded-full border border-slate-700/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 transition hover:border-slate-500 hover:text-white"
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
