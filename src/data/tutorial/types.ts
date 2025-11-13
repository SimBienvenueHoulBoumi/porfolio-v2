import type { Language } from "prism-react-renderer";

export type TutorialStack = "node" | "spring" | "ansible" | "docker" | "linux" | "sql" | "nosql";

export type ProgressState = {
  completedSections: string[];
  currentSection: string | null;
  lastUpdated: Date;
};

export type UserProgress = Record<TutorialStack, ProgressState>;

export type SidebarEntry = {
  id: string;
  label: string;
};

export type QuickStartCard = {
  id: string;
  title: string;
  minutes: string;
  command: string;
  bullets: string[];
  language?: Language;
};

export type TutorialSection = {
  id: string;
  title: string;
  description: string;
  bullets?: string[];
  code?: string;
  codeLanguage?: Language;
  codePath?: string;
  interactive?: {
    type: "playground" | "demo";
    url?: string;
    code?: string;
    language?: Language;
  };
};

export type ProjectFile = {
  path: string;
  description: string;
  snippet: string;
  language?: Language;
};

export type TutorialContent = {
  heroTitle: string;
  heroDescription: string;
  learnList: string[];
  quickStartHeading: string;
  quickStartIntro: string;
  sidebar: SidebarEntry[];
  quickStartCards: QuickStartCard[];
  projectTree: string;
  projectFiles: ProjectFile[];
  tutorialSections: TutorialSection[];
  resources: { label: string; href: string }[];
};
