import { heroContent } from "@/data/hero/content";
import { skillsContent } from "@/data/skills/content";
import { experienceContent } from "@/data/experience/content";
import { contactContent } from "@/data/contact/content";
import { footerContent } from "@/data/footer/content";

export type HeroHighlight = {
  label: string;
  value: string;
};

export type HeroContent = {
  name: string;
  tagline: string;
  typewriter: string[];
  headline: [string, string, string];
  introduction: string;
  highlights: HeroHighlight[];
  ctaPrimary: string;
  ctaSecondary: string;
  availability: string;
  availabilityDescription: string;
  trustedStack: string;
  objective: string[];
};

export type CoreSkill = {
  id: string;
  icon: string;
  title: string;
  description: string;
  impact: string;
  stack: string[];
};

export type FeedbackLoop = {
  icon: string;
  title: string;
  description: string;
};

export type ToolboxItem = {
  label: string;
  icon: string;
  href?: string;
};

export type SkillsContent = {
  title: string;
  subtitle: string;
  secondaryTitle: string;
  loopsTitle: string;
  coreSkills: CoreSkill[];
  loops: FeedbackLoop[];
  toolbox: ToolboxItem[];
};

export type ExperienceHighlight = {
  label: string;
  value: string;
};

export type ExperienceItem = {
  company: { label: string; tooltip: string };
  team: { label: string; tooltip: string };
  role: string;
  tech: { label: string; tooltip: string };
  date: string;
  location?: string;
  impact: string;
  highlights: ExperienceHighlight[];
  bullets: string[];
};

export type ExperienceContent = {
  title: string;
  subtitle: string;
  experiences: ExperienceItem[];
};

export type ContactStep = {
  accent: string;
  title: string;
  description: string;
};

export type ContactChannel = {
  id: string;
  label: string;
  description: string;
  action: string;
  href: string;
  badge?: string;
  icon: string;
  external?: boolean;
};

export type ContactContent = {
  title: string;
  subtitle: string;
  description: string;
  processTitle: string;
  steps: ContactStep[];
  callouts: { label: string; value: string }[];
  channels: ContactChannel[];
  footnote: string;
};

export type FooterContent = {
  label: string;
  role: string;
  madeWith: string;
  and: string;
  by: string;
  year: string;
  stackTitle: string;
  stackItems: string;
};

export type SiteContent = {
  hero: HeroContent;
  skills: SkillsContent;
  experience: ExperienceContent;
  contact: ContactContent;
  footer: FooterContent;
};

export const SITE_CONTENT: SiteContent = {
  hero: heroContent,
  skills: skillsContent,
  experience: experienceContent,
  contact: contactContent,
  footer: footerContent
};
