import type { ThemeKind } from "@/context/ThemeContext";

export type TutorialThemeTokens = {
  pageBg: string;
  panel: string;
  muted: string;
  button: string;
  accentLabel: string;
  strong: string;
  hero: string;
  card: string;
  subCard: string;
  soft: string;
  returnLink: string;
  navSection: string;
  navHeading: string;
  navList: string;
  navItemBase: string;
  navItemActive: string;
  navItem: string;
  navStepBase: string;
  navStepLink: string;
  outlineCard: string;
  outlineHeading: string;
  outlineBullet: string;
  outlineLink: string;
  outlineLinkActive: string;
  bullet: string;
};

export const getTutorialThemeTokens = (theme: ThemeKind): TutorialThemeTokens => {
  if (theme === "aurora") {
    return {
      pageBg: "bg-slate-50 text-slate-900",
      panel:
        "bg-white/90 text-slate-700 border border-slate-200 shadow-[0_8px_30px_rgba(15,23,42,0.08)]",
      muted: "text-slate-600",
      button: "border border-slate-200 text-slate-600 hover:bg-slate-100",
      accentLabel: "text-lime-600",
      strong: "text-slate-900",
      hero: "border border-slate-200 bg-white",
      card: "border border-slate-200 bg-white",
      subCard: "border border-slate-200 bg-slate-50",
      soft: "border border-slate-200 bg-slate-50",
      returnLink: "border border-slate-200 text-slate-700 hover:bg-slate-100",
      navSection: "space-y-4",
      navHeading: "text-xs font-semibold uppercase tracking-[0.35em] text-slate-500",
      navList: "space-y-1",
      navItemBase:
        "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition",
      navItemActive: "bg-slate-900/5 text-slate-900 border-l-4 border-l-lime-500 pl-2.5",
      navItem: "text-slate-500 hover:text-slate-900 hover:bg-slate-100",
      navStepBase:
        "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition",
      navStepLink: "text-sm font-medium text-slate-600 hover:text-slate-900 hover:underline",
      outlineCard: "rounded-2xl border border-slate-200 bg-white/90 p-4 text-base text-slate-600",
      outlineHeading: "text-sm font-semibold uppercase tracking-[0.35em] text-slate-500",
      outlineBullet: "border-l border-slate-200 pl-3",
      outlineLink: "text-base font-medium text-slate-600 hover:text-slate-900 hover:underline",
      outlineLinkActive: "text-lime-600",
      bullet: "bg-lime-500"
    };
  }

  return {
    pageBg: "bg-slate-950 text-slate-100",
    panel: "bg-slate-900/80 text-slate-100 border border-slate-800",
    muted: "text-slate-400",
    button: "border border-slate-700 text-slate-200 hover:bg-slate-900",
    accentLabel: "text-emerald-300",
    strong: "text-white",
    hero: "border border-slate-800 bg-slate-900",
    card: "border border-slate-800 bg-slate-900/80",
    subCard: "border border-slate-800 bg-slate-900/70",
    soft: "border border-slate-800 bg-slate-900/60",
    returnLink: "border border-slate-700 text-slate-100 hover:bg-slate-900",
    navSection: "space-y-4",
    navHeading: "text-xs font-semibold uppercase tracking-[0.35em] text-slate-400",
    navList: "space-y-1",
    navItemBase:
      "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition",
    navItemActive: "bg-emerald-400/10 text-emerald-200 border-l-4 border-l-emerald-400 pl-2.5",
    navItem: "text-slate-400 hover:text-white hover:bg-white/10",
    navStepBase:
      "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition",
    navStepLink: "text-sm font-medium text-slate-300 hover:bg-white/10",
    outlineCard:
      "rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-base text-slate-300",
    outlineHeading: "text-sm font-semibold uppercase tracking-[0.35em] text-slate-400",
    outlineBullet: "border-l border-slate-800 pl-3",
    outlineLink: "text-base font-medium text-slate-300 hover:text-white hover:underline",
    outlineLinkActive: "text-emerald-300",
    bullet: "bg-emerald-400"
  };
};
