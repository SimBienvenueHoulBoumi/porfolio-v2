"use client";

import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type CardTone = "solid" | "soft" | "glass";
type ThemeVariant = "aurora" | "neon";

const toneStyles: Record<ThemeVariant, Record<CardTone, string>> = {
  aurora: {
    solid: "border-sky-200/70 bg-white text-slate-700 shadow-[0_20px_40px_rgba(148,163,184,0.25)]",
    soft: "border-sky-200/60 bg-white/85 text-slate-700 backdrop-blur-xl shadow-[0_12px_32px_rgba(148,163,184,0.2)]",
    glass: "border-white/40 bg-white/10 text-slate-100 backdrop-blur-2xl",
  },
  neon: {
    solid: "border-cyan-500/25 bg-slate-950/80 text-gray-200 shadow-[0_20px_45px_rgba(6,182,212,0.25)]",
    soft: "border-cyan-500/25 bg-slate-950/60 text-gray-200 backdrop-blur-xl shadow-[0_12px_32px_rgba(6,182,212,0.2)]",
    glass: "border-white/10 bg-white/5 text-white backdrop-blur-2xl",
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
