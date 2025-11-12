import type { TutorialContent, TutorialStack } from "./types";
import { nodeContent } from "./node";
import { springContent } from "./spring";
import { ansibleContent } from "./ansible";
import { dockerContent } from "./docker";

export * from "./types";

export const tutorialStacks: { id: TutorialStack; label: string }[] = [
  { id: "node", label: "Node.js" },
  { id: "spring", label: "Spring Boot" },
  { id: "ansible", label: "Ansible" },
  { id: "docker", label: "Docker" }
];

export const tutorialContent: Record<TutorialStack, TutorialContent> = {
  node: nodeContent,
  spring: springContent,
  ansible: ansibleContent,
  docker: dockerContent
};
