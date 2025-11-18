"use client";

import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";
type ThemeVariant = "aurora" | "neon";

const variantStyles: Record<ThemeVariant, Record<ButtonVariant, string>> = {
  aurora: {
    primary:
      "bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 text-white border border-cyan-300/60 shadow-glow-premium hover:shadow-glow-premium hover:brightness-110 hover-lift-3d btn-premium animate-gradient-shift",
    secondary:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 shadow-glow-premium hover:shadow-glow-premium hover-lift-3d scale-on-hover",
    ghost:
      "border border-transparent text-slate-600 hover:bg-slate-100/60 scale-on-hover",
  },
  neon: {
    primary:
      "bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-slate-950 border border-cyan-400/40 shadow-glow-premium hover:shadow-glow-premium hover:brightness-110 hover-lift-3d btn-premium animate-gradient-shift",
    secondary:
      "border border-cyan-500/40 text-cyan-200 hover:bg-white/5 shadow-glow-premium hover:shadow-glow-premium hover-lift-3d scale-on-hover",
    ghost:
      "border border-transparent text-gray-300 hover:bg-white/5 scale-on-hover",
  },
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "text-sm px-4 py-2.5",
  lg: "text-sm px-6 py-3",
};

type ButtonProps<T extends ElementType = "button"> = {
  as?: T;
  children: ReactNode;
  isAurora: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export default function Button<T extends ElementType = "button">({
  as,
  children,
  isAurora,
  variant = "primary",
  size = "lg",
  iconLeft,
  iconRight,
  className = "",
  ...rest
}: ButtonProps<T>) {
  const Component = as ?? "button";
  const theme: ThemeVariant = isAurora ? "aurora" : "neon";
  const base =
    "inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const toneClass = variantStyles[theme][variant];
  const sizeClass = sizeStyles[size];
  const ringColor = isAurora ? "focus-visible:ring-cyan-400/60 focus-visible:ring-offset-white" : "focus-visible:ring-cyan-500/60 focus-visible:ring-offset-slate-950";

  return (
    <Component className={`${base} ${sizeClass} ${toneClass} ${ringColor} ${className}`} {...rest}>
      {iconLeft && <span className="text-base">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="text-base">{iconRight}</span>}
    </Component>
  );
}
