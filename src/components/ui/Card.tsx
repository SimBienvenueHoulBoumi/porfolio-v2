"use client";

import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type CardTone = "solid" | "soft" | "glass";
type ThemeVariant = "aurora" | "neon";

const toneStyles: Record<ThemeVariant, Record<CardTone, string>> = {
  aurora: {
    solid: "border-emerald-200/70 bg-white text-slate-700 shadow-glow-premium hover:shadow-glow-premium card-premium",
    soft: "border-emerald-200/60 bg-white/85 text-slate-700 backdrop-blur-xl shadow-glow-premium hover:shadow-glow-premium glass-premium card-premium",
    glass: "border-white/40 bg-white/10 text-slate-100 backdrop-blur-2xl glass-premium",
  },
  neon: {
    solid: "border-emerald-500/25 bg-slate-950/80 text-gray-200 shadow-glow-premium hover:shadow-glow-premium card-premium",
    soft: "border-emerald-500/25 bg-slate-950/60 text-gray-200 backdrop-blur-xl shadow-glow-premium hover:shadow-glow-premium glass-premium card-premium",
    glass: "border-white/10 bg-white/5 text-white backdrop-blur-2xl glass-premium",
  },
};

type CardProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  isAurora: boolean;
  tone?: CardTone;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export default function Card<T extends ElementType = "div">({
  as,
  children,
  isAurora,
  tone = "solid",
  className = "",
  ...rest
}: CardProps<T>) {
  const Component = as ?? "div";
  const theme: ThemeVariant = isAurora ? "aurora" : "neon";
  const base = "rounded-3xl border transition-all duration-300";
  const toneClass = toneStyles[theme][tone];

  return (
    <Component className={`${base} ${toneClass} ${className}`} {...rest}>
      {children}
    </Component>
  );
}
