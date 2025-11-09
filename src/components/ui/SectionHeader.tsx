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
    ? "heading-xl text-slate-900"
    : "heading-xl text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text";

  const descriptionBase = isAurora ? "body-base text-slate-600" : "body-base text-gray-300";
  const eyebrowClass = isAurora ? "eyebrow-label" : "eyebrow-label text-cyan-300";

  return (
    <div className={`flex flex-col gap-3 ${alignmentClass[align]} ${className}`}>
      {eyebrow && <div className={eyebrowClass}>{eyebrow}</div>}
      <h3 className={`${headingBase} ${titleClassName}`}>{title}</h3>
      {description && (
        <p className={`max-w-3xl ${descriptionBase} ${descriptionClassName}`}>
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
