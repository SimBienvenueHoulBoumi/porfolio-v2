import type { TutorialContent, TutorialStack } from "./types";
import { nodeContent } from "./node";
import { springContent } from "./spring";
import { ansibleContent } from "./ansible";
import { dockerContent } from "./docker";
import { nosqlContent } from "./nosql";
import { linuxContent } from "./linux";
import { sqlContent } from "./sql";

export * from "./types";

export const tutorialStacks: { id: TutorialStack; label: string }[] = [
  { id: "node", label: "Node.js" },
  { id: "spring", label: "Spring Boot" },
  { id: "ansible", label: "Ansible" },
  { id: "docker", label: "Docker" },
  { id: "linux", label: "Linux" },
  { id: "sql", label: "SQL" },
  { id: "nosql", label: "NoSQL" }
];

export const tutorialContent: Record<TutorialStack, TutorialContent> = {
  node: nodeContent,
  spring: springContent,
  ansible: ansibleContent,
  docker: dockerContent,
  linux: linuxContent,
  sql: sqlContent,
  nosql: nosqlContent
};
