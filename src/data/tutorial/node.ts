import type { SidebarEntry, QuickStartCard, TutorialSection, ProjectFile, TutorialContent } from "./types";

const nodeSidebar: SidebarEntry[] = [
  { id: "intro", label: "Panorama" },
  { id: "setup", label: "Installation" },
  { id: "structure", label: "Structure" },
  { id: "validation", label: "DTO & Validation" },
  { id: "services", label: "Service métier" },
  { id: "routes", label: "Routes" },
  { id: "observability", label: "Observabilité" },
  { id: "testing", label: "Tests" },
  { id: "delivery", label: "CI/CD" }
];

const nodeQuickStartCards: QuickStartCard[] = [];

const nodeProjectTree = `src/
  config/
    env.ts
    logger.ts
  server.ts
  routes/
    userRoutes.ts
  services/
    userService.ts
  schemas/
    userSchema.ts
  middlewares/
    validate.ts
tests/
  user.test.ts
.env.example
.github/
  workflows/
    ci.yml`;

const nodeProjectFiles: ProjectFile[] = [
  {
    path: "src/server.ts",
    description: "Point d'entrée : charge la configuration, sécurise Express et instancie les middlewares critiques.",
    snippet: `import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import pinoHttp from "pino-http";
import userRoutes from "./routes/userRoutes";
import { loadEnv } from "./config/env";
import { logger } from "./config/logger";

const config = loadEnv();
export const app = express();
app.use(pinoHttp({ logger }));
app.use(helmet());
app.use(cors({ origin: config.allowedOrigins }));
app.use(rateLimit({ windowMs: 60_000, max: 100 }));
app.use(express.json());
app.use("/users", userRoutes);

const port = config.port;

if (require.main === module) {
  app.listen(port, () => {
    logger.info({ port }, "API prête");
  });
}`,
    language: "typescript"
  },
  {
    path: "src/config/env.ts",
    description: "Centralise la lecture des variables d'environnement et fournit des valeurs sûres.",
    snippet: `import "dotenv/config";

export const loadEnv = () => {
  const origin = process.env.ALLOWED_ORIGINS ?? "*";
  return {
    port: Number(process.env.PORT ?? 3333),
    allowedOrigins: origin.split(",").map((entry) => entry.trim()),
    logLevel: process.env.LOG_LEVEL ?? "info"
  } as const;
};`,
    language: "typescript"
  },
  {
    path: "src/config/logger.ts",
    description: "Logger Pino configuré pour différencier le dev (pino-pretty) de la prod.",
    snippet: `import pino from "pino";

const isProd = process.env.NODE_ENV === "production";
export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  transport: isProd
    ? undefined
    : { target: "pino-pretty", options: { colorize: true, singleLine: false } }
});`,
    language: "typescript"
  },
  {
    path: "src/routes/userRoutes.ts",
    description: "Routes HTTP : validation Zod + délégation au service.",
    snippet: `import { Router } from "express";
import { userService } from "../services/userService";
import { validate } from "../middlewares/validate";
import { createUserSchema } from "../schemas/userSchema";

const router = Router();

router.post("/", validate(createUserSchema), (req, res) => {
  const user = userService.create(req.body);
  res.status(201).json(user);
});

router.get("/", (_req, res) => {
  res.json(userService.list());
});

export default router;`,
    language: "typescript"
  },
  {
    path: "src/services/userService.ts",
    description: "Service métier simplifié pour centraliser la logique et faciliter les tests.",
    snippet: `import { CreateUserDTO } from "../schemas/userSchema";

const store: Array<CreateUserDTO & { id: string }> = [];

export const userService = {
  create(payload: CreateUserDTO) {
    const user = { id: crypto.randomUUID(), ...payload };
    store.push(user);
    return user;
  },
  list() {
    return store;
  }
};`,
    language: "typescript"
  },
  {
    path: "src/schemas/userSchema.ts",
    description: "Schéma Zod partagé entre runtime et TypeScript.",
    snippet: `import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email(),
  role: z.enum(["admin", "viewer"])
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;`,
    language: "typescript"
  },
  {
    path: "src/middlewares/validate.ts",
    description: "Middleware générique pour propager une erreur 400 si le schéma échoue.",
    snippet: `import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten() });
  }
  req.body = result.data;
  return next();
};`,
    language: "typescript"
  },
  {
    path: ".env.example",
    description: "Variables d'environnement documentées pour guider la configuration.",
    snippet: `# .env.example
PORT=3333
ALLOWED_ORIGINS=http://localhost:3000
LOG_LEVEL=debug`,
    language: "ini"
  },
  {
    path: "tests/user.test.ts",
    description: "Test Vitest + Supertest pour sécuriser la route POST /users.",
    snippet: `// tests/user.test.ts
import request from "supertest";
import { app } from "../src/server";

describe("users", () => {
  it("crée un utilisateur", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "ops@sim.dev", role: "admin" });

    expect(res.status).toBe(201);
    expect(res.body.email).toBe("ops@sim.dev");
  });
});`,
    language: "typescript"
  },
  {
    path: ".github/workflows/ci.yml",
    description: "Pipeline GitHub Actions qui installe, lint et teste l'API à chaque push.",
    snippet: `name: api-ci
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --runInBand`,
    language: "yaml"
  }
];

const nodeSections: TutorialSection[] = [
  {
    id: "intro",
    title: "Panorama",
    description: "Avant de plonger dans le code, voici les axes clés du tutoriel.",
    bullets: [
      "Architecture hexagonale light",
      "Validation Zod + middlewares",
      "Tests Vitest/Supertest"
    ]
  },
  {
    id: "setup",
    title: "Installation",
    description:
      "Initialisez npm et installez les dépendances runtime, sécurité, logs et qualité dans un répertoire dédié. Terminez ensuite la configuration pour passer en ESM et brancher la configuration applicative.",
    code: `mkdir my-node-api && cd my-node-api
npm init -y
npm install express zod pino pino-http helmet cors express-rate-limit dotenv
npm install -D typescript ts-node-dev @types/node @types/express @types/cors @types/helmet @types/express-rate-limit vitest supertest eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npx tsc --init
npm pkg set type="module"
npm pkg set scripts.dev="ts-node-dev --respawn src/server.ts"
npm pkg set scripts.test="vitest"
npm pkg set scripts.lint="eslint src --ext .ts"
cat <<'EOF' > .env.example
PORT=3333
ALLOWED_ORIGINS=http://localhost:3000
LOG_LEVEL=debug
EOF
cp .env.example .env`,
    bullets: [
      "tsconfig.json : fixez \"module\": \"NodeNext\", \"moduleResolution\": \"NodeNext\" et \"verbatimModuleSyntax\": true pour rester cohérent avec les imports ESM.",
      "src/server.ts : chargez immédiatement loadEnv() afin que les variables issues de .env soient disponibles avant d'instancier Express."
    ],
    codeLanguage: "bash"
  },
  {
    id: "structure",
    title: "Structurer le projet",
    description: "Avant de commencer à implémenter, créez le squelette src/ décrit ci-dessous pour savoir où chaque responsabilité vivra.",
    code: nodeProjectTree,
    bullets: [
      "Séparez schemas/, services/, routes/ et middlewares/ pour limiter les dépendances",
      "tests/ contiendra les specs Vitest + Supertest qui valident les endpoints"
    ],
    codeLanguage: "text"
  },
  {
    id: "validation",
    title: "Définir les DTO & la validation",
    description: "Zod décrit vos DTO et sert de source unique pour les validations runtime.",
    code: `import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email(),
  role: z.enum(['admin', 'viewer']),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;`,
    codeLanguage: "typescript"
  },
  {
    id: "services",
    title: "Service métier",
    description: "Centralisez la logique (stockage en mémoire, génération d'ID) dans un service testable avant de câbler vos routes.",
    code: `import { CreateUserDTO } from "../schemas/userSchema";

const store: Array<CreateUserDTO & { id: string }> = [];

export const userService = {
  create(payload: CreateUserDTO) {
    const user = { id: crypto.randomUUID(), ...payload };
    store.push(user);
    return user;
  },
  list() {
    return store;
  }
};`,
    codeLanguage: "typescript"
  },
  {
    id: "routes",
    title: "Définir les routes",
    description: "Une fois DTO + service prêts, exposez les endpoints avec Router d'Express et votre middleware de validation.",
    code: `import { Router } from 'express';
import { validate } from '../middlewares/validate';
import { createUserSchema } from '../schemas/userSchema';
import { userService } from '../services/userService';

const router = Router();
router.post('/users', validate(createUserSchema), (req, res) => {
  const user = userService.create(req.body);
  res.status(201).json(user);
});

router.get('/users', (_req, res) => {
  res.json(userService.list());
});

export default router;`,
    codeLanguage: "typescript"
  },
  {
    id: "observability",
    title: "Observabilité",
    description: "Injectez Pino pour tracer chaque requête et exposez une route /health monitorable.",
    code: `import pino from 'pino';
import pinoHttp from 'pino-http';

export const logger = pino({ level: process.env.LOG_LEVEL ?? 'info' });
app.use(pinoHttp({ logger }));

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});`,
    bullets: [
      "Pino écrit en JSON → collectable par Loki/Elastic",
      "Le healthcheck est utilisé par les probes Kubernetes et les dashboards"
    ],
    codeLanguage: "typescript"
  },
  {
    id: "testing",
    title: "Tester et monitorer",
    description: "Vitest + supertest simulent vos requêtes HTTP et vous assure que les routes restent stables. Terminez toujours par un run de tests.",
    code: `// tests/user.test.ts
import request from 'supertest';
import { app } from '../server';

test('POST /users crée un compte', async () => {
  const res = await request(app)
    .post('/users')
    .send({ email: 'foo@bar.dev', role: 'admin' });

  expect(res.status).toBe(201);
});

# exécuter les tests
npm run test`,
    codeLanguage: "typescript"
  },
  {
    id: "delivery",
    title: "CI/CD prêt à l'emploi",
    description: "Chaque push lance lint + tests sur GitHub Actions pour bloquer les régressions avant déploiement.",
    code: `# .github/workflows/ci.yml (extrait)
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --runInBand`,
    bullets: [
      "Ajoutez un job build Docker si vous déployez sur un orchestrateur",
      "Artifacts (coverage, rapports) peuvent être téléversés pour audit"
    ],
    codeLanguage: "yaml"
  }
];

const nodeResources = [
  { label: "Documentation Express", href: "https://expressjs.com/fr/guide/routing.html" },
  { label: "Référence Zod", href: "https://zod.dev" },
  { label: "Helmet & hardening", href: "https://helmetjs.github.io/" },
  { label: "Logger Pino", href: "https://getpino.io/#/" },
  { label: "Référence TypeScript", href: "https://www.typescriptlang.org/docs/" },
  { label: "Vitest + Supertest", href: "https://vitest.dev/guide/features.html#testing-http-servers" },
  { label: "GitHub Actions", href: "https://docs.github.com/actions" }
];

const nodeContent: TutorialContent = {
  heroTitle: "Démarrage rapide Node.js + TypeScript",
  heroDescription:
    "Exposez une API REST fiable en moins d'une heure grâce à Express, TypeScript, Zod et Vitest. Cet article rassemble les commandes clés, la structure type et les garde-fous indispensables pour la mettre en place sereinement.",
  learnList: [
    "Initialiser un projet TypeScript prêt pour la prod",
    "Structurer services/routes, valider avec Zod et exposer des DTO propres",
    "Brancher observabilité (health/logs) et CI GitHub Actions"
  ],
  quickStartHeading: "Démarrage rapide Node.js",
  quickStartIntro: "Les trois blocs critiques pour livrer une API robuste.",
  sidebar: nodeSidebar,
  quickStartCards: nodeQuickStartCards,
  projectTree: nodeProjectTree,
  projectFiles: nodeProjectFiles,
  tutorialSections: nodeSections,
  resources: nodeResources
};

export { nodeContent };
