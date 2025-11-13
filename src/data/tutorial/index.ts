import type { TutorialContent, TutorialStack } from "./types";
import { nodeContent } from "./node";
import { springContent } from "./spring";
import { ansibleContent } from "./ansible";
import { dockerContent } from "./docker";
import { linuxContent } from "./linux";

export * from "./types";

export const tutorialStacks: { id: TutorialStack; label: string }[] = [
  { id: "node", label: "Node.js" },
  { id: "spring", label: "Spring Boot" },
  { id: "ansible", label: "Ansible" },
  { id: "docker", label: "Docker" },
  { id: "linux", label: "Linux" }
];

export const tutorialContent: Record<TutorialStack, TutorialContent> = {
  node: nodeContent,
  spring: springContent,
  ansible: ansibleContent,
  docker: dockerContent,
  linux: linuxContent
};
