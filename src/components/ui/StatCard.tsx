"use client";

import { ReactNode } from "react";

type StatCardProps = {
  icon: ReactNode;
  value: string;
  label: string;
  isAurora: boolean;
  className?: string;
};

export default function StatCard({ icon, value, label, isAurora, className = "" }: StatCardProps) {
  const base =
    "flex flex-col items-start gap-2 rounded-2xl border px-4 py-4 backdrop-blur-md transition-all duration-300";
  const variant = isAurora
    ? "border-sky-200/70 bg-white text-slate-700 shadow-sky-200/40"
    : "border-cyan-500/25 bg-slate-950/75 text-gray-200 shadow-cyan-500/20";

  return (
    <div className={`${base} ${variant} ${className}`}>
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 text-slate-950">
        {icon}
      </span>
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-xs uppercase tracking-[0.3em] opacity-80">{label}</p>
    </div>
  );
}
