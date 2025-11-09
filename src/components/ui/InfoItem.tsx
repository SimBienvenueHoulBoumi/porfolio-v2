"use client";

import { ReactNode } from "react";

type InfoItemProps = {
  icon: ReactNode;
  label: string;
  value: string;
  isAurora: boolean;
  className?: string;
};

export default function InfoItem({ icon, label, value, isAurora, className = "" }: InfoItemProps) {
  return (
    <div className={`flex items-center gap-2 text-sm ${isAurora ? "text-slate-600" : "text-gray-200"} ${className}`}>
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-2xl border ${
          isAurora ? "border-sky-200/70 bg-white text-slate-700" : "border-cyan-500/40 bg-slate-950/70 text-cyan-200"
        }`}
      >
        {icon}
      </span>
      <div className="flex flex-col leading-tight">
        <span className="text-xs uppercase tracking-[0.35em] opacity-70">{label}</span>
        <span className="text-sm font-semibold">{value}</span>
      </div>
    </div>
  );
}
