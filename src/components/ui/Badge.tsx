"use client";

import { ReactNode } from "react";

type BadgeVariant = "solid" | "soft" | "outline";
type BadgeTone = "brand" | "neutral";
type ThemeVariant = "aurora" | "neon";

const variantStyles: Record<ThemeVariant, Record<BadgeVariant, Record<BadgeTone, string>>> = {
  aurora: {
    solid: {
      brand: "bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 text-white border-cyan-300/70",
      neutral: "bg-white text-slate-700 border-slate-200",
    },
    soft: {
      brand: "bg-cyan-100 text-slate-700 border-cyan-200/80",
      neutral: "bg-slate-100 text-slate-700 border-slate-200",
    },
    outline: {
      brand: "border-cyan-300 text-slate-600",
      neutral: "border-slate-300 text-slate-600",
    },
  },
  neon: {
    solid: {
      brand: "bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 border-cyan-400/50",
      neutral: "bg-slate-900 text-white border-white/10",
    },
    soft: {
      brand: "bg-cyan-500/15 text-cyan-200 border-cyan-500/30",
      neutral: "bg-white/5 text-gray-200 border-white/10",
    },
    outline: {
      brand: "border-cyan-400 text-cyan-200",
      neutral: "border-white/20 text-gray-200",
    },
  },
};

type BadgeProps = {
  children: ReactNode;
  isAurora: boolean;
  variant?: BadgeVariant;
  tone?: BadgeTone;
  icon?: ReactNode;
  uppercase?: boolean;
  className?: string;
};

export default function Badge({
  children,
  isAurora,
  variant = "soft",
  tone = "brand",
  icon,
  uppercase = true,
  className = "",
}: BadgeProps) {
  const base = "inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold";
  const casing = uppercase ? "uppercase tracking-[0.3em]" : "";
  const theme: ThemeVariant = isAurora ? "aurora" : "neon";
  const variantClass = variantStyles[theme][variant][tone];

  return (
    <span className={`${base} ${casing} ${variantClass} ${className}`}>
      {icon && <span className="text-sm">{icon}</span>}
      {children}
    </span>
  );
}
