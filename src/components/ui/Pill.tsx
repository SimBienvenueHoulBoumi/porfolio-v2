"use client";

import { ReactNode } from "react";

type PillVariant = "solid" | "outline";
type ThemeVariant = "aurora" | "neon";

const pillStyles: Record<ThemeVariant, Record<PillVariant, string>> = {
  aurora: {
    solid: "bg-slate-100 text-slate-700 border border-slate-200",
    outline: "border border-slate-300 text-slate-600",
  },
  neon: {
    solid: "bg-emerald-500/10 text-emerald-200 border border-emerald-500/30",
    outline: "border border-emerald-400 text-emerald-200",
  },
};

type PillProps = {
  children: ReactNode;
  isAurora: boolean;
  variant?: PillVariant;
  className?: string;
};

export default function Pill({ children, isAurora, variant = "solid", className = "" }: PillProps) {
  const theme: ThemeVariant = isAurora ? "aurora" : "neon";
  const base = "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold tracking-wide";
  return <span className={`${base} ${pillStyles[theme][variant]} ${className}`}>{children}</span>;
}
