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
  {    id: "concepts",
    title: "Concepts fondamentaux",
    minutes: "~5 min",
    command: `# Créer le dossier du projet
mkdir my-node-api && cd my-node-api

# Initialiser le projet Node.js avec un package.json
npm init -y

# Installer les dépendances de production
npm install express zod pino pino-http helmet cors express-rate-limit dotenv

# Installer les dépendances de développement
npm install -D typescript tsx @types/node @types/express @types/cors @types/helmet @types/express-rate-limit vitest supertest eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Générer la configuration TypeScript
npx tsc --init

# Configurer les modules ES6 modernes
npm pkg set type="module"

# Définir les scripts npm pour développement et tests
npm pkg set scripts.dev="tsx src/server.ts"

npm pkg set scripts.test="vitest"

npm pkg set scripts.lint="eslint src --ext .ts"`,
    bullets: [
      "mkdir && cd : Crée et entre dans le répertoire projet – organisez votre code dans un dossier dédié pour isolation.",
      "npm init -y : Initialise package.json avec valeurs par défaut ; c'est le manifeste de votre projet (dépendances, scripts).",
      "npm install ... : Installe runtime deps (express pour routes, zod pour validation, pino pour logs, helmet/cors/rate-limit pour sécurité).",
      "npm install -D ... : Dev deps pour build/test (typescript pour types, tsx pour exécution TS, vitest pour tests, eslint pour lint).",
      "npx tsc --init : Génère tsconfig.json pour config TypeScript (strict mode recommandé pour catch erreurs tôt).",
      "npm pkg set ... : Configure ESM (type='module' pour import/export moderne), scripts pour dev/test/lint – exécutez npm run dev pour lancer."
    ],
    language: "bash"
  },
  {
    id: "patterns",
    title: "Design Patterns appliqués",
    minutes: "~3 min",
    command: `# Créer la structure de dossiers
mkdir -p src/{routes,services,schemas,middlewares,config}

# Créer les fichiers de base
touch src/server.ts src/config/{env.ts,logger.ts} src/routes/userRoutes.ts src/services/userService.ts src/schemas/userSchema.ts src/middlewares/validate.ts

# Créer le fichier de variables d'environnement
cat > .env.example << 'EOF'
PORT=3333
ALLOWED_ORIGINS=http://localhost:3000
LOG_LEVEL=debug
EOF

# Créer le fichier de tests
mkdir tests && touch tests/user.test.ts

# Copier le fichier d'environnement
cp .env.example .env`,
    bullets: [
      "mkdir -p : Crée toute l'arborescence de dossiers en une commande (routes, services, schemas, etc.).",
      "touch : Crée les fichiers vides de base (server.ts, userRoutes.ts, etc.) pour commencer le développement.",
      "cat > .env.example : Crée le fichier d'exemple des variables d'environnement avec les valeurs par défaut.",
      "mkdir tests && touch : Crée le dossier de tests et le fichier de test principal.",
      "cp .env.example .env : Copie le fichier d'exemple pour créer le fichier d'environnement réel."
    ],
    language: "bash"
  },
  {
    id: "evolution",
    title: "Évolution du projet",
    minutes: "~4 min",
    command: `# Démarrer l'API en mode développement
npm run dev

# Lancer les tests
npm test

# Vérifier le linting du code
npm run lint

# Tester l'API avec curl
curl -X POST http://localhost:3333/users \\
  -H "Content-Type: application/json" \\
  -d '{"email":"test@example.com","role":"admin"}'

# Lister les utilisateurs
curl http://localhost:3333/users

# Tester un endpoint de santé
curl http://localhost:3333/health`,
    bullets: [
      "npm run dev : Lance l'API en mode développement avec rechargement automatique à chaque modification.",
      "npm test : Exécute tous les tests pour vérifier que l'API fonctionne correctement.",
      "npm run lint : Vérifie la qualité du code et applique les règles de style définies.",
      "curl -X POST : Teste la création d'un utilisateur avec des données JSON valides.",
      "curl GET : Récupère la liste de tous les utilisateurs existants.",
      "curl /health : Vérifie que l'API est opérationnelle et retourne son statut de santé."
    ],
    language: "bash"
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
    description: `Le fichier principal qui configure Express avec tous les middlewares de sécurité et les routes. Il suit la checklist du guide Express officiel.`,
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
    description: `Charge la configuration depuis les variables d'environnement avec dotenv. Fournit un helper centralisé pour accéder aux valeurs de config.`,
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
    description: `Configuration du logger Pino avec format JSON en production et pretty-print en développement pour une meilleure lisibilité.`,
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
    description: `Définit les routes pour les utilisateurs avec validation Zod et connexion aux services métier. Utilise Express Router pour une organisation modulaire.`,
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
    description: `Service métier qui gère la logique des utilisateurs. Fournit les méthodes create et list avec génération d'ID unique via crypto.randomUUID.`,
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
    description: `Schéma de validation Zod pour les utilisateurs. Définit la structure des données et génère automatiquement les types TypeScript correspondants.`,
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
    description: `Middleware Express qui valide les données d'entrée avec Zod. Renvoie une erreur 400 si la validation échoue, sinon passe les données validées.`,
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
    description: `Fichier d'exemple des variables d'environnement. Définit les valeurs par défaut pour PORT, ALLOWED_ORIGINS et LOG_LEVEL.`,
    snippet: `PORT=3333
ALLOWED_ORIGINS=http://localhost:3000
LOG_LEVEL=debug`,

    language: "ini"
  },
  {
    path: "tests/user.test.ts",
    description: `Tests unitaires et d'intégration avec Vitest et Supertest. Vérifie les endpoints POST/GET et les cas d'erreur pour éviter les régressions.`,
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
    description: `Pipeline CI/CD GitHub Actions qui exécute automatiquement npm ci, lint et test à chaque push. Compatible avec Jenkins pour l'intégration continue.`,
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
    title: "Pourquoi Node.js pour une API ?",
    description: "Avant de plonger dans le code, comprenons pourquoi Node.js est un excellent choix pour développer des APIs web. Nous allons explorer les avantages de JavaScript côté serveur et comment il facilite le développement full-stack.",
    bullets: [
      "JavaScript partout : Même langage du frontend au backend, facilitant le partage de code et de connaissances. Plus besoin de jongler entre PHP, Python ou Java - un seul langage pour tout faire.",
      "Écosystème riche : npm propose des millions de packages pour tous les besoins (bases de données, authentification, etc.). Besoin d'un ORM ? Il y en a 50. D'un logger ? 30 choix différents. Tout est là.",
      "Performance pour l'I/O : Modèle asynchrone non-bloquant idéal pour les APIs qui font beaucoup d'entrées/sorties. Pendant qu'une requête attend la base de données, Node.js traite 100 autres requêtes en parallèle.",
      "Déploiement simplifié : Une seule application à gérer, pas besoin de serveurs séparés pour frontend et backend. Moins de complexité opérationnelle, moins de points de défaillance."
    ]
  },
  {
    id: "setup",
    title: "Organiser son projet Node.js",
    description: "Découvrez comment structurer efficacement un projet Node.js pour qu'il reste maintenable au fur et à mesure qu'il grandit. Nous allons voir les bonnes pratiques de séparation des responsabilités.",
    bullets: [
      "Dossiers par responsabilité : Un dossier src/routes/ pour les routes HTTP (ce qui arrive de l'extérieur), src/services/ pour la logique métier (les règles de votre domaine), src/schemas/ pour les contrats de données.",
      "Configuration centralisée : Un seul fichier src/config/env.ts qui charge toutes les variables d'environnement. Plus de process.env éparpillés partout dans le code.",
      "Imports organisés : Des fichiers index.ts dans chaque dossier pour centraliser les exports. Au lieu d'importer depuis 5 fichiers différents, tout passe par un point d'entrée unique.",
      "Scripts npm clairs : npm run dev pour développer, npm run build pour compiler, npm test pour tester. Des commandes évidentes qui disent ce qu'elles font."
    ]
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
    title: "Contrats de données et validation",
    description: "Comprendre l'importance des contrats explicites entre les composants. Apprendre à définir des DTO (Data Transfer Objects) avec Zod pour garantir l'intégrité des données et faciliter la maintenance.",
    bullets: [
      "DTO comme contrats : Au lieu de recevoir n'importe quoi dans vos fonctions, vous définissez exactement ce qui est attendu. Plus de 'req.body.email' qui pourrait être undefined ou mal formaté.",
      "Validation en entrée : Plutôt que de découvrir les erreurs au milieu de votre logique métier, Zod vérifie tout dès l'arrivée. Si l'email n'est pas valide, on le dit immédiatement avec un message clair.",
      "Types déduits : TypeScript regarde votre schéma Zod et génère automatiquement les types. Plus besoin d'écrire les interfaces à la main - elles sont toujours synchronisées.",
      "Évolution sécurisée : Quand vous ajoutez un champ obligatoire, Zod vous dit exactement où ça casse. Les tests automatisés vous protègent des régressions."
    ],
    interactive: {
      type: "playground",
      code: `import { z } from 'zod';

// Définition du contrat
const createUserSchema = z.object({
  email: z.string().email('Format email invalide'),
  role: z.enum(['admin', 'viewer'], {
    errorMap: () => ({ message: 'Rôle doit être admin ou viewer' })
  }),
});

// Type déduit automatiquement
type CreateUserDTO = z.infer<typeof createUserSchema>;

// Utilisation sécurisée
function createUser(dto: CreateUserDTO) {
  // Ici, dto.email est garanti d'être un email valide
  // dto.role est garanti d'être 'admin' | 'viewer'
  return { id: crypto.randomUUID(), ...dto };
}

// Test de validation
try {
  const user = createUser({
    email: "user@example.com",
    role: "admin"
  });
  console.log("✅ Utilisateur créé:", user);
} catch (error) {
  console.log("❌ Erreur:", error.message);
}`,
      language: "typescript"
    }
  },
  {
    id: "services",
    title: "Logique métier et services",
    description: "Comprendre comment isoler la logique métier des détails d'implémentation. Apprendre à créer des services testables qui encapsulent les règles métier et orchestrent les opérations complexes.",
    bullets: [
      "Services comme frontière : Votre logique métier ne doit pas savoir qu'elle tourne derrière une API HTTP ou qu'elle utilise PostgreSQL. Ça facilite les tests unitaires et les changements technologiques.",
      "Responsabilités claires : Un service UserService gère tout ce qui concerne les utilisateurs. Pas de code éparpillé dans 10 fichiers différents.",
      "Injection de dépendances : Au lieu de créer ses dépendances en dur, le service les reçoit en paramètre. Pour les tests, vous passez des mocks ; en prod, les vraies implémentations.",
      "Gestion d'erreurs métier : Une erreur 'Email déjà utilisé' n'est pas la même qu'une erreur 'Base de données indisponible'. Traitez-les différemment."
    ],
    interactive: {
      type: "playground",
      code: `import { z } from 'zod';

// Définition métier
const createUserSchema = z.object({
  email: z.string().email(),
  role: z.enum(['admin', 'viewer'])
});

type CreateUserDTO = z.infer<typeof createUserSchema>;
type User = CreateUserDTO & { id: string };

// Interface pour l'abstraction de persistance
interface UserRepository {
  save(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
}

// Implémentation en mémoire pour les tests/démo
class InMemoryUserRepository implements UserRepository {
  private store = new Map<string, User>();

  async save(user: User): Promise<User> {
    this.store.set(user.id, user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    for (const user of this.store.values()) {
      if (user.email === email) return user;
    }
    return null;
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.store.values());
  }
}

// Service métier pur (testable sans dépendances externes)
class UserService {
  constructor(private repository: UserRepository) {}

  async createUser(dto: CreateUserDTO): Promise<User> {
    // Règle métier : email unique
    const existing = await this.repository.findByEmail(dto.email);
    if (existing) {
      throw new Error('Un utilisateur avec cet email existe déjà');
    }

    const user: User = {
      id: crypto.randomUUID(),
      ...dto
    };

    return this.repository.save(user);
  }

  async listUsers(): Promise<User[]> {
    return this.repository.findAll();
  }
}

// Utilisation
const repository = new InMemoryUserRepository();
const userService = new UserService(repository);

try {
  const user = await userService.createUser({
    email: "john@example.com",
    role: "admin"
  });
  console.log("✅ Utilisateur créé:", user);

  const users = await userService.listUsers();
  console.log("📋 Utilisateurs:", users);
} catch (error) {
  console.log("❌ Erreur métier:", error.message);
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
  heroTitle: "Architecture d'une API Node.js professionnelle",
  heroDescription:
    "Découvrez comment construire une API REST maintenable et évolutive avec Node.js et TypeScript. De l'architecture hexagonale aux design patterns, apprenez les concepts et méthodes pour développer des applications robustes.",
  learnList: [
    "Maîtriser l'architecture hexagonale et les design patterns pour des APIs maintenables.",
    "Comprendre l'évolution d'un projet : de l'API minimale viable au déploiement en production.",
    "Appliquer les bonnes pratiques de validation, testabilité et observabilité."
  ],
  quickStartHeading: "Concepts et méthodes clés",
  quickStartIntro: "Les trois piliers pour construire des APIs professionnelles et évolutives.",
  sidebar: nodeSidebar,
  quickStartCards: nodeQuickStartCards,
  projectTree: nodeProjectTree,
  projectFiles: nodeProjectFiles,
  tutorialSections: nodeSections,
  resources: nodeResources
};

export { nodeContent };
