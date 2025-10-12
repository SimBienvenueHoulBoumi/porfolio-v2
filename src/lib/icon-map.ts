import {
  FaDocker,
  FaReact,
  FaJava,
  FaDatabase,
  FaCloud,
  FaTerminal,
  FaGithub,
  FaLinkedin
} from "react-icons/fa";
import {
  SiKubernetes,
  SiJenkins,
  SiAnsible,
  SiTypescript,
  SiRedux,
  SiTailwindcss
} from "react-icons/si";
import { FiActivity, FiLayers, FiTrendingUp, FiMail } from "react-icons/fi";

export const ICON_MAP = {
  docker: FaDocker,
  react: FaReact,
  java: FaJava,
  cloud: FaCloud,
  database: FaDatabase,
  terminal: FaTerminal,
  kubernetes: SiKubernetes,
  jenkins: SiJenkins,
  ansible: SiAnsible,
  typescript: SiTypescript,
  redux: SiRedux,
  tailwind: SiTailwindcss,
  activity: FiActivity,
  layers: FiLayers,
  trendingUp: FiTrendingUp,
  mail: FiMail,
  github: FaGithub,
  linkedin: FaLinkedin
} as const;

export type IconKey = keyof typeof ICON_MAP;
