import type { Language } from "prism-react-renderer";

export type TutorialStack = "node" | "spring" | "ansible" | "docker";

type SidebarEntry = {
  id: string;
  label: string;
};

type QuickStartCard = {
  id: string;
  title: string;
  minutes: string;
  command: string;
  bullets: string[];
  language?: Language;
};

type TutorialSection = {
  id: string;
  title: string;
  description: string;
  bullets?: string[];
  code?: string;
  codeLanguage?: Language;
};

type ProjectFile = {
  path: string;
  description: string;
  snippet: string;
  language?: Language;
};

type TutorialContent = {
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

export const tutorialStacks: { id: TutorialStack; label: string }[] = [
  { id: "node", label: "Node.js" },
  { id: "spring", label: "Spring Boot" },
  { id: "ansible", label: "Ansible" },
  { id: "docker", label: "Docker" }
];

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

const nodeQuickStartCards: QuickStartCard[] = [
  {
    id: "cli",
    title: "Initialiser le projet",
    minutes: "~2 min",
    command: `npm init -y
npm install express zod pino pino-http helmet cors express-rate-limit dotenv
npm install -D typescript ts-node-dev @types/node @types/express @types/cors @types/helmet @types/express-rate-limit vitest supertest`,
    bullets: [
      "Créer le dossier src/ et un fichier tsconfig.json",
      'Ajouter "dev": "ts-node-dev --respawn src/server.ts" et "lint": "eslint ." dans package.json'
    ],
    language: "bash"
  },
  {
    id: "server",
    title: "Monter le serveur",
    minutes: "~3 min",
    command: `import express from "express";
const app = express();
app.use(express.json());

app.listen(3333);`,
    bullets: [
      "Activer express.json pour parser le JSON",
      "Exposer app pour les tests Supertest"
    ],
    language: "typescript"
  },
  {
    id: "health",
    title: "Route santé & test",
    minutes: "~4 min",
    command: `app.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});`,
    bullets: [
      "Écrire un test Vitest qui attend 200",
      "Brancher la route dans un dashboard de monitoring"
    ],
    language: "typescript"
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
    description: "Point d'entrée : charge la configuration, sécurise Express et instancie les middlewares critiques.",
    snippet: `// src/server.ts
import express from "express";
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
    snippet: `// src/config/env.ts
import "dotenv/config";

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
    snippet: `// src/config/logger.ts
import pino from "pino";

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
    snippet: `// src/routes/userRoutes.ts
import { Router } from "express";
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
    snippet: `// src/services/userService.ts
import { CreateUserDTO } from "../schemas/userSchema";

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
    snippet: `// src/schemas/userSchema.ts
import { z } from "zod";

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
    snippet: `// src/middlewares/validate.ts
import { AnyZodObject } from "zod";
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
    description: "Initialisez npm et installez les dépendances runtime, sécurité, logs et qualité.",
    code: `npm init -y
npm install express zod pino pino-http helmet cors express-rate-limit dotenv
npm install -D typescript ts-node-dev @types/node @types/express @types/cors @types/helmet @types/express-rate-limit vitest supertest eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npx tsc --init`,
    bullets: [
      'Ajoutez "dev": "ts-node-dev --respawn src/server.ts" et "lint": "eslint src --ext .ts" dans package.json',
      "Préparez un .env (copie de .env.example) puis chargez-le avec loadEnv()"
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
    code: `// src/schemas/userSchema.ts
import { z } from 'zod';

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
    code: `// src/services/userService.ts
import { CreateUserDTO } from "../schemas/userSchema";

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
    code: `// src/routes/userRoutes.ts
import { Router } from 'express';
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
    code: `// src/config/logger.ts
import pino from 'pino';
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
    "Exposez une API REST fiable en moins d'une heure grâce à Express, TypeScript, Zod et Vitest. Cette page rassemble les commandes clés, la structure type et les garde-fous indispensables pour shipper sereinement.",
  learnList: [
    "Initialiser un projet TypeScript prêt pour la prod (sécurité, logs, lint)",
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

const springSidebar: SidebarEntry[] = [
  { id: "intro", label: "Panorama" },
  { id: "setup", label: "Installation" },
  { id: "config", label: "Configuration" },
  { id: "model", label: "Modèle & DTO" },
  { id: "repository", label: "Repository & Mapper" },
  { id: "services", label: "Services" },
  { id: "controller", label: "Contrôleur" },
  { id: "observability", label: "Observabilité" },
  { id: "testing", label: "Tests" },
  { id: "delivery", label: "CI/CD" }
];

const springQuickStartCards: QuickStartCard[] = [
  {
    id: "init",
    title: "Générer le squelette",
    minutes: "~3 min",
    command: `curl https://start.spring.io/starter.zip \\
  -d type=maven-project \\
  -d language=java \\
  -d bootVersion=3.3.2 \\
  -d dependencies=web,data-jpa,postgresql,lombok,validation \\
  -d groupId=simdev.demo \\
  -d artifactId=demo-rest-api \\
  -o demo-rest-api.zip
unzip demo-rest-api.zip && cd demo-rest-api
./mvnw clean compile`,
    bullets: [
      "JAVA_HOME doit pointer vers une JDK 17 avant de lancer mvnw",
      "Créez les packages controllers/, services/, servicesImpl/, dto/, mapper/, repositories/ comme dans la structure plus bas"
    ],
    language: "bash"
  },
  {
    id: "config",
    title: "Configurer Postgres & run",
    minutes: "~2 min",
    command: `docker compose up -d postgres
# src/main/resources/application.yml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/postgres
    username: postgres
    password: postgres
./mvnw spring-boot:run --args='--spring.profiles.active=local'`,
    bullets: [
      "Adaptez username/password si besoin, sinon utilisez docker-compose pour Postgres",
      "Profils Spring (local/prod) permettent d'activer les bons secrets et la sécurité"
    ],
    language: "yaml"
  },
  {
    id: "quality",
    title: "Tests & pipeline",
    minutes: "~2 min",
    command: `./mvnw test
./mvnw -Dspring.profiles.active=test verify`,
    bullets: [
      "Chaque use-case possède son test Mockito (Create/Get/Update/Delete)",
      "Ces commandes alimentent directement le Jenkinsfile fourni dans la démo"
    ],
    language: "bash"
  }
];

const springProjectTree = `src/main/java/simdev/demo/
  DemoApplication.java
  controllers/TasksController.java
  dto/TasksDto.java
  mapper/TasksMapper.java
  models/Tasks.java
  repositories/TasksRepository.java
  services/
    TasksService.java
    TasksCreationService.java
    TasksGetOneService.java
    TasksGetAllService.java
    TasksUpdateService.java
    TasksDeleteService.java
  servicesImpl/
    TasksServiceImpl.java
    TasksCreationServiceImpl.java
    TasksGetOneServiceImpl.java
    TasksGetAllServiceImpl.java
    TasksUpdateServiceImpl.java
    TasksDeleteServiceImpl.java
  exceptions/
    TaskNotFoundException.java
    TaskAlreadyExistsException.java
    GlobalExceptionHandler.java
  Enum/status.java
src/main/resources/application.yml
src/main/resources/db/migration/V1__create_tasks.sql
src/test/java/simdev/demo/services/unit/
  CreateTaskServiceTest.java
  GetTaskByIdServiceTest.java
  UpdateTaskServiceTest.java ...
.github/workflows/ci.yml
Dockerfile
docker-compose.yml`;

const springProjectFiles: ProjectFile[] = [
  {
    path: "src/main/java/simdev/demo/controllers/TasksController.java",
    description: "Couche REST : expose /api/tasks et délègue au service.",
    snippet: `@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public final class TasksController {
  private final TasksService tasksService;

  @PostMapping
  public ResponseEntity<Tasks> createTask(@RequestBody TasksDto taskDto) {
    return ResponseEntity.ok(tasksService.createTask(taskDto));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
    tasksService.deleteTask(id);
    return ResponseEntity.noContent().build();
  }
}

# exécuter les tests
./mvnw test`,
    language: "java"
  },
  {
    path: "src/main/java/simdev/demo/services/TasksService.java",
    description: "Contrat unique utilisé par le controller.",
    snippet: `public interface TasksService {
  Tasks createTask(TasksDto task);
  Tasks getTaskById(Long id);
  void updateTask(Long id, TasksDto task);
  void deleteTask(Long id);
  List<Tasks> getAllTasks();
}`,
    language: "java"
  },
  {
    path: "src/main/java/simdev/demo/servicesImpl/TasksServiceImpl.java",
    description: "Facade métier principale, gère repository + mapper.",
    snippet: `@Service
@AllArgsConstructor
public final class TasksServiceImpl implements TasksService {
  private final TasksRepository tasksRepository;
  private final TasksMapper tasksMapper;

  @Override
  public Tasks getTaskById(Long id) {
    return tasksRepository.findById(id)
      .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));
  }
}`,
    language: "java"
  },
  {
    path: "src/main/java/simdev/demo/servicesImpl/TasksCreationServiceImpl.java",
    description: "Use-case création : évite les doublons et applique le statut PENDING.",
    snippet: `@Service
@AllArgsConstructor
public class TasksCreationServiceImpl implements TasksCreationService {
  private final TasksRepository tasksRepository;
  private final TasksMapper tasksMapper;

  @Override
  public Tasks create(TasksDto newTask) {
    tasksRepository.findByName(newTask.getName())
      .ifPresent(task -> { throw new TaskAlreadyExistsException("Task with name '" + newTask.getName() + "' already exists"); });
    Tasks taskEntity = tasksMapper.toEntity(newTask);
    taskEntity.setStatus(status.PENDING.getStatus());
    return tasksRepository.save(taskEntity);
  }
}`,
    language: "java"
  },
  {
    path: "src/main/java/simdev/demo/repositories/TasksRepository.java",
    description: "Repository Spring Data avec finder custom.",
    snippet: `public interface TasksRepository extends JpaRepository<Tasks, Long> {
  Optional<Tasks> findByName(String name);
}`,
    language: "java"
  },
  {
    path: "src/main/java/simdev/demo/dto/TasksDto.java",
    description: "DTO simple (name/description/status) généré via Lombok.",
    snippet: `@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TasksDto {
  private String name;
  private String description;
  private String status;
}`,
    language: "java"
  },
  {
    path: "src/main/java/simdev/demo/models/Tasks.java",
    description: "Entité JPA avec timestamps auto.",
    snippet: `@Entity
@Data
@Builder
public class Tasks {
  @Id @GeneratedValue
  private Long id;
  private String name;
  private String description;
  private String status;
  private Date createdAt;
  private Date updatedAt;
}`,
    language: "java"
  },
  {
    path: "src/main/java/simdev/demo/exceptions/GlobalExceptionHandler.java",
    description: "ControllerAdvice pour retourner des erreurs JSON propres.",
    snippet: `@ControllerAdvice
public final class GlobalExceptionHandler {
  @ExceptionHandler(TaskNotFoundException.class)
  public ResponseEntity<Map<String, Object>> handle(TaskNotFoundException ex) {
    Map<String, Object> body = new HashMap<>();
    body.put("error", ex.getMessage());
    body.put("timestamp", Instant.now().toString());
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
  }
}`,
    language: "java"
  },
  {
    path: "src/main/resources/application.yml",
    description: "Configuration Postgres + port 5200 + Swagger.",
    snippet: `spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/postgres
    username: postgres
    password: postgres
  jpa:
    hibernate:
      ddl-auto: create-drop
server:
  port: 5200`,
    language: "yaml"
  },
  {
    path: "src/test/java/simdev/demo/services/unit/CreateTaskServiceTest.java",
    description: "Test Mockito qui sécurise la création de tâche.",
    snippet: `@ExtendWith(MockitoExtension.class)
class CreateTaskServiceTest {
  @Test
  void shouldThrowIfTaskAlreadyExists() {
    when(tasksRepository.findByName("Existing"))
      .thenReturn(Optional.of(existingTask));
    assertThatThrownBy(() -> tasksService.create(dto))
      .isInstanceOf(TaskAlreadyExistsException.class);
  }
}`,
    language: "java"
  },
  {
    path: "src/main/resources/application.yml",
    description: "Configuration centralisée des profils, datasource et Flyway.",
    snippet: `spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/postgres
    username: postgres
    password: postgres
  jpa:
    hibernate:
      ddl-auto: validate
  flyway:
    enabled: true
    locations: classpath:db/migration`,
    language: "yaml"
  },
  {
    path: "docker-compose.yml",
    description: "Stack locale Postgres + pgAdmin pour tester l'API.",
    snippet: `services:
  postgres:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"`,
    language: "yaml"
  },
  {
    path: ".github/workflows/ci.yml",
    description: "Pipeline Maven : build, tests unitaires et publication des rapports.",
    snippet: `name: spring-api-ci
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
      - name: Setup Temurin 17
        uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: 17
          cache: maven
      - run: ./mvnw -B verify`,
    language: "yaml"
  },

];

const springSections: TutorialSection[] = [
  {
    id: "intro",
    title: "Panorama",
    description: "demo-rest-api (Spring Boot 3 + Java 17) livre une API de gestion de tâches testée, documentée et prête pour la CI.",
    bullets: [
      "Couche REST ultra fine grâce à TasksController + TasksService",
      "Use-cases séparés (Creation/Get/Update/Delete) pour isoler la logique",
      "GlobalExceptionHandler renvoie des 404 JSON exploitables"
    ]
  },
  {
    id: "setup",
    title: "Installation",
    description: "Générez le squelette avec Spring Initializr et installez les dépendances nécessaires.",
    code: `curl https://start.spring.io/starter.zip \
  -d type=maven-project \
  -d language=java \
  -d bootVersion=3.3.2 \
  -d dependencies=web,data-jpa,postgresql,lombok,validation,actuator,security \
  -d groupId=simdev.demo \
  -d artifactId=demo-rest-api \
  -o demo-rest-api.zip
unzip demo-rest-api.zip && cd demo-rest-api
./mvnw clean compile`,
    bullets: [
      "Utilisez JDK 17 et le wrapper Maven pour uniformiser l'environnement",
      "Créez la structure controllers/, services/, servicesImpl/, dto/, mapper/, repositories/, exceptions/ et config/"
    ],
    codeLanguage: "bash"
  },
  {
    id: "config",
    title: "Configuration applicative",
    description: "application.yml concentre datasource, Flyway, profils et Actuator.",
    code: `spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/postgres
    username: postgres
    password: postgres
  jpa:
    hibernate:
      ddl-auto: validate
management:
  endpoints:
    web.exposure.include: health,info`,
    bullets: [
      "Séparez application-local.yml / application-prod.yml si besoin",
      "Activez Flyway pour garder un historique versionné du schéma"
    ],
    codeLanguage: "yaml"
  },
  {
    id: "model",
    title: "Modèle et DTO",
    description: "Définissez l'entité JPA et les DTO associés avant de câbler le reste.",
    code: `// src/main/java/simdev/demo/models/Tasks.java
@Entity
@Data
@Builder
public class Tasks {
  @Id @GeneratedValue
  private Long id;
  private String name;
  private String description;
  private String status;
}`,
    bullets: [
      "L'entité Tasks stocke également les timestamps createdAt/updatedAt",
      "Le DTO TasksDto limite les champs exposés côté controller"
    ],
    codeLanguage: "java"
  },
  {
    id: "repository",
    title: "Repository et mapper",
    description: "Ajoutez le repository Spring Data et les mappers qui convertissent DTO ⇄ entité.",
    code: `// src/main/java/simdev/demo/repositories/TasksRepository.java
public interface TasksRepository extends JpaRepository<Tasks, Long> {
  Optional<Tasks> findByName(String name);
}

// src/main/java/simdev/demo/mapper/TasksMapper.java
@Component
public class TasksMapper {
  public Tasks toEntity(TasksDto dto) { ... }
}`,
    bullets: [
      "Spring Data JPA fournit les CRUD de base, add-on: findByName pour l'unicité",
      "Mapper isolé pour garder les services propres"
    ],
    codeLanguage: "java"
  },
  {
    id: "services",
    title: "Services métiers",
    description: "Implémentez les use-cases Create/Get/Update/Delete dans les services et leurs implémentations.",
    code: `// src/main/java/simdev/demo/servicesImpl/TasksServiceImpl.java
@Service
@AllArgsConstructor
public final class TasksServiceImpl implements TasksService {
  private final TasksRepository tasksRepository;
  private final TasksMapper tasksMapper;

  @Override
  public Tasks getTaskById(Long id) {
    return tasksRepository.findById(id)
      .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));
  }
}`,
    bullets: [
      "Les implémentations manipulent TasksRepository + TasksMapper pour rester testables",
      "Les exceptions métiers sont centralisées dans simdev.demo.exceptions"
    ],
    codeLanguage: "java"
  },
  {
    id: "controller",
    title: "Contrôleur REST",
    description: "Exposez /api/tasks une fois que les services sont en place.",
    code: `// src/main/java/simdev/demo/controllers/TasksController.java
@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public final class TasksController {
  private final TasksService tasksService;

  @PostMapping
  public ResponseEntity<Tasks> createTask(@RequestBody TasksDto taskDto) {
    return ResponseEntity.ok(tasksService.createTask(taskDto));
  }
}`,
    bullets: [
      "Chaque endpoint renvoie un ResponseEntity explicite (200/201/204)",
      "Le controller reste stateless pour simplifier les tests slice MVC"
    ],
    codeLanguage: "java"
  },
  {
    id: "observability",
    title: "Observabilité",
    description: "Actuator + logs structurés + docker-compose pour reproduire la prod.",
    code: `management:
  endpoints:
    web.exposure.include: health,info
logging:
  level:
    simdev.demo: INFO

# docker-compose.yml (extrait)
services:
  postgres:
    image: postgres:15
    ports:
      - "5432:5432"`,
    bullets: [
      "Surveillez /actuator/health avec vos outils APM (Datadog, Grafana Cloud, etc.)",
      "docker-compose.yml héberge Postgres + pgAdmin pour tester localement"
    ],
    codeLanguage: "yaml"
  },
  {
    id: "testing",
    title: "Tests",
    description: "Chaque use-case possède des tests Mockito + un test d'intégration sur le controller.",
    code: `// src/test/java/simdev/demo/services/unit/CreateTaskServiceTest.java
@ExtendWith(MockitoExtension.class)
class CreateTaskServiceTest {
  @Test
  void shouldThrowIfTaskAlreadyExists() {
    when(tasksRepository.findByName("Existing"))
      .thenReturn(Optional.of(existingTask));
    assertThatThrownBy(() -> tasksService.create(dto))
      .isInstanceOf(TaskAlreadyExistsException.class);
  }
}

./mvnw test`,
    bullets: [
      "./mvnw test génère les rapports Surefire exploitables par la CI",
      "Ajoutez un test @SpringBootTest avec Testcontainers pour valider Postgres"
    ],
    codeLanguage: "java"
  },
  {
    id: "delivery",
    title: "CI/CD",
    description: "GitHub Actions (ou Jenkins) lance verify, publie les rapports et construit l'image.",
    code: `# .github/workflows/ci.yml (extrait)
jobs:
  quality:
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: 17
          cache: maven
      - run: ./mvnw -B verify`,
    bullets: [
      "Ajoutez un job docker/build-push-action pour publier votre image",
      "Configurez sonar: true pour brancher SonarCloud si besoin"
    ],
    codeLanguage: "yaml"
  }
];

const springResources = [
  { label: "Documentation Spring Boot", href: "https://docs.spring.io/spring-boot/docs/current/reference/html/" },
  { label: "Spring Data JPA", href: "https://spring.io/projects/spring-data-jpa" },
  { label: "Spring Security", href: "https://spring.io/projects/spring-security" },
  { label: "Actuator & Observabilité", href: "https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html" },
  { label: "Guide JUnit 5 + Mockito", href: "https://junit.org/junit5/docs/current/user-guide/" },
  { label: "Guide OpenAPI/Swagger", href: "https://springdoc.org/" }
];

const springContent: TutorialContent = {
  heroTitle: "Démarrage rapide Spring Boot + Maven",
  heroDescription:
    "Dans ce tutoriel, on reproduit l'architecture du projet demo-rest-api (Spring Boot 3 + Java 17) en partant de zéro : controllers fins, sécurité Spring, observabilité Actuator et pipeline CI prêts pour la prod.",
  learnList: [
    "Initialiser demo-rest-api avec les bons starters (security, actuator, Flyway)",
    "Structurer controllers/services + verrouiller l'accès via Spring Security",
    "Brancher Actuator, les tests et la CI GitHub Actions"
  ],
  quickStartHeading: "Démarrage Spring Boot",
  quickStartIntro: "Commandes et snippets directement issus du repo demo-rest-api.",
  sidebar: springSidebar,
  quickStartCards: springQuickStartCards,
  projectTree: springProjectTree,
  projectFiles: springProjectFiles,
  tutorialSections: springSections,
  resources: springResources
};

const ansibleSidebar: SidebarEntry[] = [
  { id: "intro", label: "Panorama" },
  { id: "setup", label: "Installation" },
  { id: "vars", label: "Variables" },
  { id: "roles", label: "Rôles" },
  { id: "playbook", label: "Playbook" },
  { id: "commands", label: "Commandes utiles" },
  { id: "quality", label: "Qualité & CI" }
];

const ansibleQuickStartCards: QuickStartCard[] = [
  {
    id: "deps",
    title: "Préparer Ansible",
    minutes: "~2 min",
    command: `python -m venv .venv
source .venv/bin/activate
pip install ansible==9.0.0`,
    bullets: [
      "Activez la venv avant chaque run pour garantir les mêmes versions",
      "ajoutez .venv/ au .gitignore pour éviter de versionner les dépendances"
    ],
    language: "bash"
  },
  {
    id: "ping",
    title: "Vérifier l'inventaire",
    minutes: "~2 min",
    command: `ansible all -i inventory.ini -m ping
ansible db -i inventory.ini -m setup -a 'filter=ansible_distribution'`,
    bullets: [
      "La commande ping teste la connexion SSH + sudo",
      "La collecte de facts (module setup) permet de récupérer la distro pour conditionner les packages"
    ],
    language: "bash"
  },
  {
    id: "deploy",
    title: "Déployer Postgres",
    minutes: "~3 min",
    command: `ansible-playbook -i inventory.ini playbooks/postgres.yml -e "postgres_version=15"`,
    bullets: [
      "Les variables -e permettent d'overrider group_vars/db.yml ponctuellement",
      "Ajoutez --check pour simuler et --diff pour afficher les modifications de templates"
    ],
    language: "bash"
  }
];

const ansibleProjectTree = `ansible/
  ansible.cfg
  inventory.ini
  group_vars/
    db.yml
  playbooks/
    postgres.yml
  roles/
    postgres/
      tasks/main.yml
      handlers/main.yml
      templates/
        postgresql.conf.j2
        pg_hba.conf.j2
  molecule/
    default/
      molecule.yml
      converge.yml
.github/workflows/ansible.yml`;

const ansibleProjectFiles: ProjectFile[] = [
  {
    path: "ansible/ansible.cfg",
    description: "Configuration locale : active le SSH multiplexing, force l'inventaire par défaut et centralise les callbacks.",
    snippet: `[defaults]
inventory = ./inventory.ini
remote_user = ubuntu
host_key_checking = False
retry_files_enabled = False
stdout_callback = yaml
[ssh_connection]
pipelining = True`,
    language: "bash"
  },
  {
    path: "ansible/inventory.ini",
    description: "Inventaire statique avec un groupe db dédié.",
    snippet: `[db]
db01 ansible_host=192.168.1.20 ansible_user=ubuntu ansible_become=true

[db:vars]
ansible_python_interpreter=/usr/bin/python3`,
    language: "bash"
  },
  {
    path: "ansible/group_vars/db.yml",
    description: "Variables partagées par le groupe db : version, ports, chemins de templates.",
    snippet: `postgres_version: "15"
postgres_listen_address: "0.0.0.0"
postgres_port: 5432
postgres_data_dir: /var/lib/postgresql/15/main`,
    language: "yaml"
  },
  {
    path: "ansible/roles/postgres/tasks/main.yml",
    description: "Rôle principal pour installer Postgres, créer les dossiers et déployer les templates.",
    snippet: `- name: Installer les dépendances APT
  ansible.builtin.apt:
    name:
      - gnupg
      - postgresql-{{ postgres_version }}
      - postgresql-client-{{ postgres_version }}
    state: present
    update_cache: yes

- name: Déployer postgresql.conf
  ansible.builtin.template:
    src: postgresql.conf.j2
    dest: /etc/postgresql/{{ postgres_version }}/main/postgresql.conf
  notify: Restart postgres`,
    language: "yaml"
  },
  {
    path: "ansible/roles/postgres/templates/postgresql.conf.j2",
    description: "Template de configuration Postgres personnalisable via les variables.",
    snippet: `listen_addresses = '{{ postgres_listen_address }}'
port = {{ postgres_port }}
max_connections = 100
shared_buffers = 256MB
wal_level = replica`,
    language: "jinja"
  },
  {
    path: "ansible/roles/postgres/handlers/main.yml",
    description: "Handlers déclenchés lors des changements de templates ou de services.",
    snippet: `- name: Restart postgres
  ansible.builtin.service:
    name: postgresql
    state: restarted`,
    language: "yaml"
  },
  {
    path: "ansible/playbooks/postgres.yml",
    description: "Playbook orchestrant l'installation Postgres via le rôle dédié.",
    snippet: `- name: Provisionner Postgres
  hosts: db
  become: true
  roles:
    - role: postgres`,
    language: "yaml"
  },
  {
    path: "molecule/default/molecule.yml",
    description: "Scénario Molecule pour tester le rôle postgres dans un conteneur ephemeral.",
    snippet: `dependency:
  name: galaxy
platforms:
  - name: instance
    image: geerlingguy/docker-ubuntu2204-ansible
provisioner:
  name: ansible
  playbooks:
    converge: converge.yml`,
    language: "yaml"
  },
  {
    path: ".github/workflows/ansible.yml",
    description: "Workflow qui lance lint + Molecule sur chaque PR.",
    snippet: `name: ansible-ci
on:
  pull_request:
    paths:
      - 'ansible/**'
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - run: pip install ansible ansible-lint molecule[docker]
      - run: ansible-lint ansible/
      - run: cd ansible && molecule test`,
    language: "yaml"
  },

];

const ansibleSections: TutorialSection[] = [
  {
    id: "intro",
    title: "Panorama",
    description: "On utilise Ansible pour provisionner Postgres 15 sur les hôtes du groupe db : structure pro (ansible.cfg, inventory, roles), variables explicites et commandes de run.",
    bullets: [
      "Inventaire clair (inventory.ini) + group_vars pour factoriser la config",
      "Rôles séparés (common, postgres) pour réutiliser les tâches",
      "Playbooks idempotents (APT, templates, handlers)"
    ]
  },
  {
    id: "setup",
    title: "Installation",
    description: "Créer un environnement isolé puis installer la version d'Ansible voulue.",
    code: `python -m venv .venv
source .venv/bin/activate
pip install ansible==9.0.0`,
    bullets: [
      "Activez toujours la venv pour éviter les différences entre machines",
      "ansible --version permet de vérifier python, config et inventaire par défaut"
    ],
    codeLanguage: "bash"
  },
  {
    id: "vars",
    title: "Variables & inventaire",
    description: "Définissez vos hôtes et variables séparément pour simplifier les overrides.",
    code: `# inventory.ini
[db]
db01 ansible_host=192.168.1.20 ansible_user=ubuntu ansible_become=true

# group_vars/db.yml
postgres_version: "15"
postgres_listen_address: "0.0.0.0"
postgres_port: 5432`,
    bullets: [
      "Centralisez les secrets via Ansible Vault (ansible-vault encrypt group_vars/db.yml)",
      "Utilisez des tags (ex: ansible-playbook ... --tags postgres_config) pour cibler"
    ],
    codeLanguage: "yaml"
  },
  {
    id: "roles",
    title: "Rôles & handlers",
    description: "Les rôles encapsulent la logique (install, config, templates) et déclenchent des handlers si besoin.",
    code: `# roles/postgres/tasks/main.yml
- name: Installer Postgres {{ postgres_version }}
  ansible.builtin.apt:
    name: "postgresql-{{ postgres_version }}"
    state: present
    update_cache: yes

- name: Copier pg_hba.conf
  ansible.builtin.template:
    src: pg_hba.conf.j2
    dest: /etc/postgresql/{{ postgres_version }}/main/pg_hba.conf
  notify: Restart postgres`,
    bullets: [
      "tasks/main.yml décrit l'ordre des actions; handlers/main.yml écoute les notify",
      "Templates Jinja2 permettent d'adapter la config avec les variables du groupe"
    ],
    codeLanguage: "yaml"
  },
  {
    id: "playbook",
    title: "Playbook principal",
    description: "Le playbook agrège tout : inventaire db, escalade sudo, exécution du rôle postgres.",
    code: `- name: Provisionner Postgres
  hosts: db
  become: true
  vars_files:
    - group_vars/db.yml
  roles:
    - role: postgres`,
    bullets: [
      "Ajoutez un rôle common pour gérer les paquets système, firewall, utilisateurs, etc.",
      "vars_files permet d'inclure des fichiers chiffrés via Vault"
    ],
    codeLanguage: "yaml"
  },
  {
    id: "commands",
    title: "Commandes utiles",
    description: "Exemples de commandes pour tester, exécuter en mode check ou dépanner.",
    code: `# tester la connexion SSH
ansible db -i inventory.ini -m ping

# exécuter en dry-run
ansible-playbook -i inventory.ini playbooks/postgres.yml --check --diff

# cibler un seul hôte et un tag
ansible-playbook -i inventory.ini playbooks/postgres.yml -l db01 --tags postgres_config

# valider que Postgres répond
ansible db -i inventory.ini -m shell -a \"psql -U postgres -c 'SELECT 1'\"`,
    bullets: [
      "Utilisez --limit/-l pour cibler un sous-ensemble d'hôtes",
      "Combinez --step et --start-at-task pour rejouer uniquement une partie du playbook",
      "Le SELECT 1 confirme la disponibilité de Postgres après déploiement"
    ],
    codeLanguage: "bash"
  },
  {
    id: "quality",
    title: "Qualité & CI",
    description: "ansible-lint + Molecule vérifient l'idempotence et vos workflows GitHub automatisent les checks.",
    code: `ansible-lint ansible/
cd ansible && molecule test

# .github/workflows/ansible.yml (extrait)
jobs:
  verify:
    steps:
      - run: pip install ansible ansible-lint molecule[docker]
      - run: ansible-lint ansible/
      - run: molecule test`,
    bullets: [
      "ansible-lint couvre YAML, modules, tags et bonnes pratiques",
      "Molecule lance un conteneur ephemeral pour valider le rôle avant de toucher vos serveurs",
      "La CI empêche toute régression avant merge"
    ],
    codeLanguage: "bash"
  }
];

const ansibleResources = [
  { label: "Documentation Ansible", href: "https://docs.ansible.com/" },
  { label: "Ansible Galaxy", href: "https://galaxy.ansible.com/" },
  { label: "Collection community.postgresql", href: "https://docs.ansible.com/ansible/latest/collections/community/postgresql/" },
  { label: "ansible-lint", href: "https://ansible.readthedocs.io/projects/lint/en/latest/" },
  { label: "Molecule", href: "https://ansible.readthedocs.io/projects/molecule/" },
  { label: "Best practices Ansible", href: "https://docs.ansible.com/ansible/latest/tips_tricks/index.html" }
];

const dockerSidebar: SidebarEntry[] = [
  { id: "intro", label: "Panorama" },
  { id: "setup", label: "Préparation" },
  { id: "compose", label: "docker-compose.yml" },
  { id: "init", label: "Script d'initialisation" },
  { id: "volumes", label: "Volumes & sauvegardes" },
  { id: "verification", label: "Vérifications" },
  { id: "troubleshooting", label: "Dépannage" }
];

const dockerQuickStartCards: QuickStartCard[] = [
  {
    id: "env",
    title: "Définir les variables",
    minutes: "~1 min",
    command: `cat <<'EOF' > .env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=app
PGDATA=/var/lib/postgresql/data/pgdata
EOF`,
    bullets: [
      "Les variables .env sont injectées automatiquement dans docker-compose",
      "Ne versionnez jamais un .env contenant des secrets réels"
    ],
    language: "bash"
  },
  {
    id: "compose",
    title: "Lancer Postgres",
    minutes: "~1 min",
    command: `# seulement après avoir créé .env
docker compose up -d --build
# vérifier les logs
docker compose logs -f postgres`,
    bullets: [
      "Assurez-vous que le fichier .env est prêt avant de lancer compose",
      "Le service postgres attend l'exécution du script d'init",
      "stoppez avec docker compose down -v pour repartir d'un volume propre"
    ],
    language: "bash"
  },
  {
    id: "psql",
    title: "Contrôler l'init",
    minutes: "~2 min",
    command: `docker compose exec postgres psql -U $POSTGRES_USER -d $POSTGRES_DB -c "SELECT * FROM admin.accounts;"`,
    bullets: [
      "La commande confirme que les tables et données seeds existent",
      "Utilisez-le aussi dans un job CI pour valider la stack"
    ],
    language: "bash"
  }
];

const dockerProjectTree = `docker/
  docker-compose.yml
  init/
    001_schema.sql
    002_seed.sql
  scripts/
    wait-for-postgres.sh
.env`;

const dockerProjectFiles: ProjectFile[] = [
  {
    path: "docker/docker-compose.yml",
    description: "Décrit le service Postgres, le volume persistant et l'exécution du script d'init.",
    snippet: `services:
  postgres:
    image: postgres:15
    container_name: dev-postgres
    restart: unless-stopped
    env_file: ../.env
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:\${PGDATA}
      - ./init:/docker-entrypoint-initdb.d
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $\${POSTGRES_USER} -d $\${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5
volumes:
  postgres-data:`,
    language: "yaml"
  },
  {
    path: "docker/init/001_schema.sql",
    description: "Création du schéma cible et des rôles par défaut.",
    snippet: `CREATE SCHEMA IF NOT EXISTS app;
CREATE TABLE IF NOT EXISTS app.accounts (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);`,
    language: "sql"
  },
  {
    path: "docker/init/002_seed.sql",
    description: "Jeu de données minimal chargé lors de l'initialisation.",
    snippet: `INSERT INTO app.accounts (id, email)
VALUES
  (gen_random_uuid(), 'ops@sim.dev'),
  (gen_random_uuid(), 'cto@sim.dev')
ON CONFLICT DO NOTHING;`,
    language: "sql"
  },
  {
    path: "docker/scripts/wait-for-postgres.sh",
    description: "Script optionnel pour attendre la disponibilité dans les pipelines.",
    snippet: `#!/usr/bin/env bash
set -euo pipefail
until PGPASSWORD="$POSTGRES_PASSWORD" psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "SELECT 1" >/dev/null 2>&1; do
  echo "⏳ attente de Postgres..."
  sleep 2
done
echo "✅ Postgres prêt"`,
    language: "bash"
  }
];

const dockerSections: TutorialSection[] = [
  {
    id: "intro",
    title: "Panorama",
    description: "Compose + scripts init = un Postgres reproductible, prêt pour les devs comme pour la CI.",
    bullets: [
      "docker compose + env file",
      "Scripts SQL versionnés",
      "Healthcheck pour orchestrateurs et pipelines"
    ]
  },
  {
    id: "setup",
    title: "Préparer l'environnement",
    description: "Créer le dossier docker/, un .env et activer Docker Desktop ou Colima.",
    code: `mkdir -p docker/init docker/scripts
cp .env.example .env
# vérifier que docker compose fonctionne
docker compose version`,
    bullets: [
      "Le .env est lu automatiquement par Compose",
      "Créez une version .env.ci pour vos pipelines"
    ],
    codeLanguage: "bash"
  },
  {
    id: "compose",
    title: "Définir docker-compose.yml",
    description: "Expose le service Postgres, monte les scripts et crée un volume persistant.",
    code: dockerProjectFiles[0].snippet,
    bullets: [
      "⚠️ Lancez `docker compose up` uniquement après avoir créé .env et placé vos scripts dans init/",
      "Modifiez les ports/volumes selon votre environnement (dev, CI, staging)"
    ],
    codeLanguage: "yaml"
  },
  {
    id: "init",
    title: "Scripts d'initialisation",
    description: "Tout fichier .sql placé dans docker-entrypoint-initdb.d est exécuté au premier démarrage.",
    code: dockerProjectFiles[1].snippet,
    bullets: [
      "Utilisez un préfixe numéroté pour contrôler l'ordre",
      "Ajoutez 002_seed.sql pour insérer des données de test"
    ],
    codeLanguage: "sql"
  },
  {
    id: "volumes",
    title: "Volumes & sauvegardes",
    description: "Séparez vos données de l'image et automatisez les exports.",
    code: `# effectuer une sauvegarde
PGPASSWORD=$POSTGRES_PASSWORD docker compose exec postgres   pg_dump -U $POSTGRES_USER -d $POSTGRES_DB > backups/$(date +%F).sql

# repartir de zéro
docker compose down -v`,
    bullets: [
      "backups/ est ignoré par git mais stocke les dumps",
      "down -v supprime le volume pour réexécuter les scripts d'init"
    ],
    codeLanguage: "bash"
  },
  {
    id: "verification",
    title: "Vérifier le provisioning",
    description: "Exposez une commande psql ou un test automatisé pour contrôler l'état.",
    code: dockerQuickStartCards[2].command,
    codeLanguage: "bash"
  },
  {
    id: "troubleshooting",
    title: "Dépanner",
    description: "Commandes utiles quand un init ou un volume échoue.",
    code: `docker compose logs postgres
# supprimer uniquement le container
docker compose rm -sf postgres
# inspecter le volume
docker volume inspect docker_postgres-data`,
    bullets: [
      "docker compose logs -f postgres pour voir l'exécution des scripts",
      "docker volume rm recrée un volume propre"
    ],
    codeLanguage: "bash"
  }
];

const dockerResources = [
  { label: "Docs Docker Compose", href: "https://docs.docker.com/compose/" },
  { label: "Image officielle Postgres", href: "https://hub.docker.com/_/postgres" },
  { label: "Volumes Docker", href: "https://docs.docker.com/storage/volumes/" },
  { label: "psql cheatsheet", href: "https://www.postgresql.org/docs/current/app-psql.html" }
];

const dockerContent: TutorialContent = {
  heroTitle: "Mise en place de Postgres avec Docker",
  heroDescription:
    "docker-compose, scripts SQL et commandes de vérification pour livrer un Postgres reproductible avec jeu de données d'initialisation.",
  learnList: [
    "Structurer un dossier docker/ versionné",
    "Écrire des scripts 001_schema.sql / 002_seed.sql exécutés automatiquement",
    "Automatiser les vérifications et sauvegardes avec docker compose"
  ],
  quickStartHeading: "Démarrage rapide Docker",
  quickStartIntro: "3 commandes pour obtenir un Postgres provisionné",
  sidebar: dockerSidebar,
  quickStartCards: dockerQuickStartCards,
  projectTree: dockerProjectTree,
  projectFiles: dockerProjectFiles,
  tutorialSections: dockerSections,
  resources: dockerResources
};

const ansibleContent: TutorialContent = {
  heroTitle: "Déployer Postgres avec Ansible",
  heroDescription:
    "Structure professionnelle (ansible.cfg, inventaire, rôles, Molecule) pour installer Postgres 15 via Ansible en appliquant les bonnes pratiques (variables, handlers, CI).",
  learnList: [
    "Préparer l’environnement Ansible (venv, inventaire, variables sécurisées)",
    "Créer un rôle Postgres idempotent avec templates, handlers et tests Molecule",
    "Automatiser lint + déploiements via ansible-lint, Molecule et GitHub Actions"
  ],
  quickStartHeading: "Démarrage rapide Ansible",
  quickStartIntro: "Commandes clés pour préparer, tester et exécuter vos playbooks.",
  sidebar: ansibleSidebar,
  quickStartCards: ansibleQuickStartCards,
  projectTree: ansibleProjectTree,
  projectFiles: ansibleProjectFiles,
  tutorialSections: ansibleSections,
  resources: ansibleResources
};

export const tutorialContent: Record<TutorialStack, TutorialContent> = {
  node: nodeContent,
  spring: springContent,
  ansible: ansibleContent,
  docker: dockerContent
};
