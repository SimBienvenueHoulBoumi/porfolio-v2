"use client";

import { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow?: ReactNode;
  title: string;
  description?: string;
  align?: "left" | "center";
  isAurora: boolean;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  children?: ReactNode;
};

const alignmentClass = {
  left: "text-left items-start",
  center: "text-center items-center",
} as const;

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  isAurora,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  children,
}: SectionHeaderProps) {
  const headingBase = isAurora
    ? "text-3xl font-bold sm:text-4xl text-slate-900"
    : "text-3xl font-bold sm:text-4xl text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text";

  const descriptionBase = isAurora ? "text-slate-600" : "text-gray-300";
  const eyebrowClass = isAurora
    ? "text-xs font-semibold uppercase tracking-[0.35em] text-slate-500"
    : "text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300";

  return (
    <div className={`flex flex-col gap-3 ${alignmentClass[align]} ${className}`}>
      {eyebrow && <div className={eyebrowClass}>{eyebrow}</div>}
      <h3 className={`${headingBase} ${titleClassName}`}>{title}</h3>
      {description && (
        <p className={`max-w-3xl text-sm sm:text-base ${descriptionBase} ${descriptionClassName}`}>
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
