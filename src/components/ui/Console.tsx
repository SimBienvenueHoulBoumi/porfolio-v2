"use client";

import { ReactNode } from "react";

interface ConsoleProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

const ConsolePanel = ({ children, title, className = "" }: ConsoleProps) => (
  <div className={`rounded-3xl border border-slate-900/40 bg-slate-950/95 shadow-[0_20px_45px_rgba(15,23,42,0.35)] ${className}`}>
    <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
      </div>
      {title && <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">{title}</span>}
    </div>
    <div className="p-4">
      <pre className="code-block bg-transparent p-0 text-[13px] leading-7 sm:text-sm">
        {children}
      </pre>
    </div>
  </div>
);

export default ConsolePanel;
