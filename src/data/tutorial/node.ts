import type { SidebarEntry, QuickStartCard, TutorialSection, ProjectFile, TutorialContent } from "./types";

const nodeSidebar: SidebarEntry[] = [
  { id: "intro", label: "Panorama" },
  { id: "setup", label: "Installation" },
  { id: "structure", label: "Structure" },
  { id: "services", label: "DTO & Service métier" },
  { id: "routes", label: "Routes" },
  { id: "observability", label: "Observabilité" },
  { id: "testing", label: "Tests" },
  { id: "delivery", label: "CI/CD" }
];

const nodeQuickStartCards: QuickStartCard[] = [
  {
    id: "init",
    title: "Initialisation du projet",
    minutes: "~3 min",
    command: `mkdir my-node-api && cd my-node-api
npm init -y
npm install express zod pino pino-http helmet cors express-rate-limit dotenv
npm install -D typescript tsx @types/node @types/express @types/cors @types/helmet @types/express-rate-limit vitest supertest eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npx tsc --init
npm pkg set type="module"
npm pkg set scripts.dev="tsx src/server.ts"
npm pkg set scripts.test="vitest"
npm pkg set scripts.lint="eslint src --ext .ts"`,
    bullets: [
      "mkdir && cd : Crée et entre dans le répertoire projet – organisez votre code dans un dossier dédié pour isolation.",
      "npm init -y : Initialise package.json avec valeurs par défaut ; c'est le manifeste de votre projet (dépendances, scripts).",
      "npm install ... : Installe runtime deps (express pour routes, zod pour validation, pino pour logs, helmet/cors/rate-limit pour sécurité). Pourquoi ? Sécurité (helmet protège headers), CORS (accès cross-origin), rate-limit (anti-DDoS).",
      "npm install -D ... : Dev deps pour build/test (typescript pour types, tsx pour exécution TS, vitest pour tests, eslint pour lint). -D = seulement en dev, pas en prod.",
      "npx tsc --init : Génère tsconfig.json pour config TypeScript (strict mode recommandé pour catch erreurs tôt).",
      "npm pkg set ... : Configure ESM (type='module' pour import/export moderne), scripts pour dev/test/lint – exécutez npm run dev pour lancer."
    ],
    language: "bash"
  },
  {
    id: "env",
    title: "Configuration .env",
    minutes: "~1 min",
    command: `cat <<'EOF' > .env.example
PORT=3333
ALLOWED_ORIGINS=http://localhost:3000
LOG_LEVEL=debug
EOF
cp .env.example .env`,
    bullets: [
      "cat <<'EOF' > .env.example : Crée un template .env avec vars critiques – PORT pour serveur, ALLOWED_ORIGINS pour CORS whitelist, LOG_LEVEL pour Pino (debug/info/error).",
      "Pourquoi .env ? Sépare config sensible (secrets) du code ; gitignore .env pour sécurité. .env.example guide les contributeurs.",
      "cp .env.example .env : Copie pour usage local ; éditez avec vos valeurs (ex: PORT=8080 si conflit).",
      "Astuce : Dans code, utilisez process.env.VAR ?? default ; validez avec zod pour types sûrs (Number(process.env.PORT))."
    ],
    language: "bash"
  },
  {
    id: "tsconfig",
    title: "Configurer TypeScript",
    minutes: "~2 min",
    command: `cat <<'EOF' > tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "verbatimModuleSyntax": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist"
  },
  "include": ["src", "tests"]
}
EOF`,
    bullets: [
      '"target": "ES2022" : Compile vers JS moderne (async/await natif) ; compatible Node 18+.',
      '"module": "NodeNext" : Support ESM (import/export) pour Node récent ; évite CommonJS legacy.',
      '"strict": true : Active checks TS stricts (null checks, etc.) – catch bugs compile-time, pas runtime.',
      '"include": ["src", "tests"] : TS scanne seulement ces dossiers ; ignore node_modules pour vitesse.',
      "Pourquoi ? tsconfig assure cohérence équipe ; testez avec npx tsc --noEmit pour valider sans build."
    ],
    language: "json"
  }
];

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
    description: "Ce fichier lance toute l'API conformément au guide Express (https://expressjs.com/fr/starter/hello-world.html). Il charge la configuration, crée l'application, empile les protections (logs, sécurité, CORS, limiteur) puis branche les routes avant d'écouter sur le port défini, comme recommandé par la documentation officielle.",
    snippet: `import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import pinoHttp from "pino-http";
import userRoutes from "./routes/userRoutes.js";
import { loadEnv } from "./config/env.js";
import { logger } from "./config/logger.js";

const config = loadEnv();

export const app = express();

app.use(pinoHttp({ logger }));
app.use(helmet());
app.use(cors({ origin: config.allowedOrigins }));
app.use(rateLimit({ windowMs: 60_000, max: 100 }));
app.use(express.json());

app.use("/users", userRoutes);

const port = config.port;

if (import.meta.url === \`file://\${process.argv[1]}\`) {
  app.listen(port, () => {
    logger.info({ port }, "API prête");
  });
}`,

    language: "typescript"
  },
  {
    path: "src/config/env.ts",
    description: "Ce module suit la documentation officielle dotenv (https://github.com/motdotla/dotenv#readme) : il lit .env, applique des valeurs de secours et expose un objet prêt à l'emploi afin que le code consomme la configuration validée sans manipuler la console.",
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
    description: "Ce fichier prépare Pino conformément au guide officiel (https://getpino.io/#/). Il lit vos variables d'environnement pour fixer le niveau de logs et adapte le transport JSON/pretty afin que chaque message reste exploitable quel que soit le contexte.",
    snippet: `import pino from "pino";

const isProd = process.env.NODE_ENV === "production";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  transport: isProd
    ? undefined
    : {
        target: "pino-pretty",
        options: {
          colorize: true,
          singleLine: false
        }
      }
});`,

    language: "typescript"
  },
  {
    path: "src/routes/userRoutes.ts",
    description: "Ce fichier rassemble les points d'entrée HTTP liés aux utilisateurs en appliquant la structure Router décrite dans la doc Express (https://expressjs.com/fr/guide/routing.html). Il relie validation, service métier et réponses HTTP pour faire transiter la requête jusqu'à la réponse officielle.",
    snippet: `import { Router } from "express";
import { userService } from "../services/userService.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema } from "../schemas/userSchema.js";

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
    description: "Le service encapsule la logique métier (création et lecture) en suivant la recommandation Node de séparer le domaine de la couche HTTP. Il utilise crypto.randomUUID comme décrit dans la doc officielle Node (https://nodejs.org/api/crypto.html#cryptorandomuuidoptions), ce qui facilitera la migration vers une base réelle.",
    snippet: `import { CreateUserDTO } from "../schemas/userSchema.js";

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
    description: "Ce module décrit la forme d'un utilisateur avec Zod conformément à la référence officielle (https://zod.dev/?id=basic-usage) et génère le type TypeScript associé. Ce contrat garantit que toute donnée non conforme est rejetée avant d'atteindre la suite de la pile.",
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
    description: "Ce middleware applique un schéma Zod sur req.body pour respecter la mécanique des middlewares Express décrite dans la doc officielle (https://expressjs.com/fr/guide/using-middleware.html). Il répond en 400 en cas d'erreur et ne laisse passer que des données conformes.",
    snippet: `import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
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
    description: "Ce fichier d'exemple suit la pratique décrite dans la documentation dotenv (https://github.com/motdotla/dotenv#usage). Chacun le copie en .env avec ses valeurs, ce qui aligne l'équipe sans exposer de secrets dans le dépôt.",
    snippet: `PORT=3333
ALLOWED_ORIGINS=http://localhost:3000
LOG_LEVEL=debug`,

    language: "ini"
  },
  {
    path: "tests/user.test.ts",
    description: "Cette suite Vitest + Supertest applique la démarche décrite dans la doc officielle Vitest (https://vitest.dev/guide/) pour simuler des requêtes HTTP et vérifier les réponses, offrant un filet de sécurité reproductible sans scénarios manuels.",
    snippet: `import request from "supertest";
import { app } from "../src/server";

describe("users API", () => {
  it("crée un utilisateur valide", async () => {
    const payload = { email: "ops@sim.dev", role: "admin" };

    const res = await request(app)
      .post("/users")
      .send(payload)
      .expect(201);

    expect(res.body).toHaveProperty("id");
    expect(res.body.email).toBe(payload.email);
    expect(res.body.role).toBe(payload.role);
  });

  it("liste les utilisateurs", async () => {
    const res = await request(app)
      .get("/users")
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
  });

  it("rejette email invalid", async () => {
    await request(app)
      .post("/users")
      .send({ email: "invalid", role: "admin" })
      .expect(400);
  });
});`,

    language: "typescript"
  },
  {
    path: ".github/workflows/ci.yml",
    description: "Ce workflow GitHub Actions suit la référence officielle (https://docs.github.com/actions) pour rejouer installation, lint et tests à chaque push/PR, fournissant un feu vert automatique avant même de consulter les logs locaux.",
    snippet: `name: API CI

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
npm install -D typescript tsx @types/node @types/express @types/cors @types/helmet @types/express-rate-limit vitest supertest eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npx tsc --init
npm pkg set type="module"
npm pkg set scripts.dev="tsx src/server.ts"
npm pkg set scripts.test="vitest"
npm pkg set scripts.lint="eslint src --ext .ts"
cat <<'EOF' > .env.example
PORT=3333
ALLOWED_ORIGINS=http://localhost:3000
LOG_LEVEL=debug
EOF
cp .env.example .env

cat <<'EOF' > tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "verbatimModuleSyntax": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist"
  },
  "include": ["src", "tests"]
}
EOF`,
    bullets: [
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
    description: "Zod décrit vos DTO selon la documentation officielle (https://zod.dev/?id=basic-usage) et devient votre source unique pour les validations runtime.",
    code: `import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email(),
  role: z.enum(['admin', 'viewer']),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;`,
    codeLanguage: "typescript",
    interactive: {
      type: "playground",
      code: `import { z } from 'zod';

const createUserSchema = z.object({
  email: z.string().email(),
  role: z.enum(['admin', 'viewer']),
});

type CreateUserDTO = z.infer<typeof createUserSchema>;

const validUser: CreateUserDTO = {
  email: "user@example.com",
  role: "admin"
};

console.log("Utilisateur valide:", validUser);

try {
  createUserSchema.parse({
    email: "invalid-email",
    role: "invalid-role"
  });
} catch (error) {
  console.log("Erreur de validation:", error.message);
}`,
      language: "typescript"
    }
  },
  {
    id: "services",
    title: "DTO & Service métier",
    description: "Commencez par définir vos DTO avec Zod (https://zod.dev) puis centralisez la logique métier dans un service testable comme le recommandent les guides Express sur la séparation des responsabilités.",
    code: `import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email(),
  role: z.enum(['admin', 'viewer']),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;

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
    codeLanguage: "typescript",
    interactive: {
      type: "playground",
      code: `import { z } from 'zod';

const createUserSchema = z.object({
  email: z.string().email(),
  role: z.enum(['admin', 'viewer']),
});

type CreateUserDTO = z.infer<typeof createUserSchema>;

const validUser: CreateUserDTO = {
  email: "user@example.com",
  role: "admin"
};

console.log("Utilisateur valide:", validUser);

try {
  createUserSchema.parse({
    email: "invalid-email",
    role: "invalid-role"
  });
} catch (error) {
  console.log("Erreur de validation:", error.message);
}`,
      language: "typescript"
    }
  },
  {
    id: "routes",
    title: "Définir les routes",
    description: "Une fois DTO + service prêts, exposez les endpoints avec Router d'Express conformément à la doc officielle (https://expressjs.com/fr/guide/routing.html) et branchez votre middleware de validation.",
    code: `import { Router } from 'express';
import { validate } from '../middlewares/validate.js';
import { createUserSchema } from '../schemas/userSchema.js';
import { userService } from '../services/userService.js';

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
    description: "Injectez Pino pour tracer chaque requête comme dans la documentation officielle (https://getpino.io/#/) puis exposez une route /health monitorable pour respecter les recommandations Node sur les sondes de santé.",
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
    description: "Vitest + Supertest simulent vos requêtes HTTP conformément au guide Vitest (https://vitest.dev/guide/) afin de garantir la stabilité des routes ; terminez toujours par un run de tests.",
    code: `import request from 'supertest';
import { app } from '../server';

test('POST /users crée un compte', async () => {
  const res = await request(app)
    .post('/users')
    .send({ email: 'foo@bar.dev', role: 'admin' });

  expect(res.status).toBe(201);
});`,
    codeLanguage: "typescript",
    interactive: {
      type: "demo",
      code: `import request from 'supertest';
import { app } from '../src/server.js';
import { describe, it, expect } from 'vitest';

describe('User API', () => {
  describe('POST /users', () => {
    it('should create a user with valid data', async () => {
      const userData = {
        email: 'test@example.com',
        role: 'admin'
      };

      const response = await request(app)
        .post('/users')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.email).toBe(userData.email);
      expect(response.body.role).toBe(userData.role);
    });

    it('should return 400 for invalid email', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          email: 'invalid-email',
          role: 'admin'
        })
        .expect(400);

      expect(response.body).toHaveProperty('errors');
    });

    it('should return 400 for invalid role', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          email: 'test@example.com',
          role: 'invalid-role'
        })
        .expect(400);

      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      await request(app)
        .post('/users')
        .send({ email: 'user1@example.com', role: 'admin' });

      await request(app)
        .post('/users')
        .send({ email: 'user2@example.com', role: 'viewer' });

      const response = await request(app)
        .get('/users')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(2);
    });
  });
});`,
      language: "typescript"
    }
  },
  {
    id: "delivery",
    title: "CI/CD prêt à l'emploi",
    description: "GitHub Actions vérifie chaque push en suivant la documentation officielle (https://docs.github.com/actions) tandis qu'un pipeline Jenkins mirroré reste disponible pour les exécutions on-prem.",
    code: `jobs:
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
      - run: npm test -- --runInBand

pipeline {
  agent any
  stages {
    stage('Install') { steps { sh 'npm ci' } }
    stage('Lint') { steps { sh 'npm run lint' } }
    stage('Test') { steps { sh 'npm test -- --runInBand' } }
  }
  post {
    always { junit 'coverage/junit.xml' }
  }
}`,
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
  { label: "GitHub Actions", href: "https://docs.github.com/actions" },
  { label: "ES Modules Guide", href: "https://nodejs.org/api/esm.html" },
  { label: "tsx - TypeScript executor", href: "https://github.com/esbuild-kit/tsx" },
  { label: "Prism.js - Syntax highlighting", href: "https://prismjs.com/" }
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
