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
    description: `Contexte : c'est le tableau de bord Express. Objectif : suivre la checklist du guide Express et empiler config + middlewares avant de brancher /users et d'écouter le port. Réf : https://expressjs.com/fr/starter/hello-world.html.`,
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
    description: `Contexte : on charge la config via dotenv pour que tout le code lise les mêmes valeurs sûres. Objectif : appliquer la doc officielle (https://github.com/motdotla/dotenv#readme) et exposer un helper unique loadEnv.`,
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
    description: `Contexte : des logs illisibles ne servent à rien. Objectif : reproduire la config recommandée par Pino (https://getpino.io/#/) avec JSON en prod et pretty en dev pour garder une lecture humaine.`,
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
    description: `Contexte : toutes les routes /users passent par la même porte. Objectif : suivre la structure Router d'Express (https://expressjs.com/fr/guide/routing.html) et montrer comment validation + service + HTTP dialoguent.`,
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
    description: `Contexte : on veut un endroit unique pour la logique métier. Objectif : isoler Create/List dans un service testable, en reprenant crypto.randomUUID documenté par Node (https://nodejs.org/api/crypto.html#cryptorandomuuidoptions).`,
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
    description: `Contexte : sans contrat partagé, l'API accumule les surprises. Objectif : écrire le schéma Zod (https://zod.dev/?id=basic-usage), en déduire le type TypeScript et le réutiliser partout.`,
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
    description: `Contexte : chaque POST doit passer par un garde-fou. Objectif : empaqueter Zod dans un middleware Express (https://expressjs.com/fr/guide/using-middleware.html) qui renvoie un 400 propre et ne transmet que des données validées.`,
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
    description: `Contexte : partager les variables sans exposer les secrets. Objectif : fournir un .env.example conforme à la doc dotenv (https://github.com/motdotla/dotenv#usage) pour aligner tout le monde.`,
    snippet: `PORT=3333
ALLOWED_ORIGINS=http://localhost:3000
LOG_LEVEL=debug`,

    language: "ini"
  },
  {
    path: "tests/user.test.ts",
    description: `Contexte : on valide l'API comme dans un tuto Grafikart : un test par use-case, un feedback immédiat. Objectif : s'appuyer sur Vitest + Supertest (https://vitest.dev/guide/) pour simuler POST/GET et verrouiller les régressions.`,
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
    description: `Contexte : aucune feature ne part sans pipeline. Objectif : suivre la doc GitHub Actions (https://docs.github.com/actions) pour rejouer install/lint/test à chaque push et garder la même recette sur Jenkins.`,
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
    description: "Ce tutoriel démontre la construction d'une API REST avec Node.js et TypeScript, utilisant Express pour le routage, Zod pour la validation des schémas, et Vitest pour les tests, basé sur la documentation officielle et les meilleures pratiques.",
    bullets: [
      "Architecture hexagonale : Sépare la logique métier des préoccupations externes pour la maintenabilité.",
      "Validation Zod : Assure l'intégrité des données en analysant et validant les schémas d'entrée.",
      "Tests Vitest : Fournit des tests unitaires et d'intégration rapides pour détecter les problèmes tôt."
    ]
  },
  {
    id: "setup",
    title: "Installation",
    description: "Initialiser un projet Node.js avec TypeScript, installer les dépendances comme Express, Zod et Vitest, et configurer tsconfig.json pour la vérification stricte des types, suivant les meilleures pratiques Node.js et TypeScript.",
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
      "Défi : Lance 'npm run dev' après ça. Si ça plante, vérifie ton .env – c'est souvent là que ça coince !",
      "Astuce : Copie-colle ces commandes dans ton terminal, ligne par ligne, pour voir ce qui se passe. Pas de magie, juste de la rigueur."
    ],
    codeLanguage: "bash"
  },
  {
    id: "structure",
    title: "Structurer le projet",
    description: "Organiser la structure du projet avec des répertoires dédiés pour les schémas, services, routes, middlewares et tests pour promouvoir la séparation des préoccupations et la maintenabilité.",
    code: nodeProjectTree,
    bullets: [
      "Utiliser schemas/ pour les schémas de validation Zod, services/ pour la logique métier, routes/ pour les routes Express, et middlewares/ pour les middlewares personnalisés.",
      "Placer tests/ pour les spécifications Vitest afin d'assurer que les endpoints sont validés via des tests d'intégration."
    ],
    codeLanguage: "text"
  },
  {
    id: "validation",
    title: "Définir les DTO & la validation",
    description: "Définir les schémas Zod pour la validation des données, inférer les types TypeScript, et tester les schémas dans le playground pour assurer l'intégrité des données, suivant la documentation Zod.",
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
    description: "Centraliser la logique métier dans les services pour la testabilité et la maintenabilité, gardant les contrôleurs fins et concentrés sur les préoccupations HTTP, selon les meilleures pratiques Express.",
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
    description: "Connecter Express Router avec le middleware de validation pour exposer les endpoints /users, suivant la documentation de routage Express pour une gestion modulaire des routes.",
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
    description: "Implémenter la journalisation avec Pino pour le suivi des requêtes et ajouter un endpoint /health pour la surveillance de l'application, suivant la documentation Pino et les meilleures pratiques d'observabilité.",
    code: `import pino from 'pino';
import pinoHttp from 'pino-http';

export const logger = pino({ level: process.env.LOG_LEVEL ?? 'info' });
app.use(pinoHttp({ logger }));

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});`,
    bullets: [
      "Pino produit des logs JSON pour la collecte par des outils comme Loki ou Elasticsearch.",
      "Les vérifications de santé sont utilisées par les probes Kubernetes et les tableaux de bord de surveillance."
    ],
    codeLanguage: "typescript"
  },
  {
    id: "testing",
    title: "Tester et monitorer",
    description: "Écrire des tests avec Vitest et Supertest pour un retour immédiat sur les endpoints POST/GET, assurant la fiabilité du code et prévenant les régressions.",
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
    description: "Automatiser npm ci, lint et test sur GitHub Actions et Jenkins, suivant la documentation CI officielle pour assurer des portes de qualité à chaque commit.",
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
      "Ajoutez un job de build Docker si vous déployez sur un orchestrateur – votre API dans une boîte prête à voyager.",
      "Les artifacts (couverture, rapports) peuvent être téléversés pour audit – preuves que votre code est solide."
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
    "Initialiser un projet TypeScript prêt pour la prod.",
    "Structurer services/routes, valider avec Zod et exposer des DTO propres.",
    "Brancher observabilité (health/logs) et CI GitHub Actions."
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
