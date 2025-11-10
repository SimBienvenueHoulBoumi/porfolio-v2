export type TutorialStack = "node" | "spring";

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
};

type TutorialSection = {
  id: string;
  title: string;
  description: string;
  bullets?: string[];
  code?: string;
};

type ProjectFile = {
  path: string;
  description: string;
  snippet: string;
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
  { id: "spring", label: "Spring Boot" }
];

const nodeSidebar: SidebarEntry[] = [
  { id: "intro", label: "Panorama" },
  { id: "setup", label: "Installation" },
  { id: "structure", label: "Structure" },
  { id: "routes", label: "Routes" },
  { id: "validation", label: "Validation" },
  { id: "testing", label: "Tests" }
];

const nodeQuickStartCards: QuickStartCard[] = [
  {
    id: "cli",
    title: "Initialiser le projet",
    minutes: "~2 min",
    command: `npm init -y
npm install express zod
npm install -D typescript ts-node-dev`,
    bullets: [
      "Créer le dossier src/ et un fichier tsconfig.json",
      'Ajouter "dev": "ts-node-dev src/server.ts" dans package.json'
    ]
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
    ]
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
    ]
  }
];

const nodeProjectTree = `src/
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
  user.test.ts`;

const nodeProjectFiles: ProjectFile[] = [
  {
    path: "src/server.ts",
    description: "Point d'entrée : instancie Express, câble le JSON parser et la route /users.",
    snippet: `import express from "express";
import userRoutes from "./routes/userRoutes";

export const app = express();
app.use(express.json());
app.use("/users", userRoutes);

const port = process.env.PORT ?? 3333;

if (require.main === module) {
  app.listen(port, () => {
    console.log(\`API ready on port \${port}\`);
  });
}`
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

export default router;`
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
};`
  },
  {
    path: "src/schemas/userSchema.ts",
    description: "Schéma Zod partagé entre runtime et TypeScript.",
    snippet: `import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email(),
  role: z.enum(["admin", "viewer"])
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;`
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
};`
  },
  {
    path: "tests/user.test.ts",
    description: "Test Vitest + Supertest pour sécuriser la route POST /users.",
    snippet: `import request from "supertest";
import { app } from "../src/server";

describe("users", () => {
  it("crée un utilisateur", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "ops@sim.dev", role: "admin" });

    expect(res.status).toBe(201);
    expect(res.body.email).toBe("ops@sim.dev");
  });
});`
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
    title: "01. Installation",
    description: "Initialisez npm et installez les dépendances côté runtime et tooling.",
    code: `npm init -y
npm install express zod
npm install -D typescript ts-node-dev @types/node @types/express vitest supertest
npx tsc --init`,
    bullets: [
      "Créer un tsconfig.json avec moduleResolution: node",
      'Ajouter "dev": "ts-node-dev --respawn src/server.ts" dans package.json'
    ]
  },
  {
    id: "structure",
    title: "02. Structurer le projet",
    description: "Organisez src/ avec server.ts, routes/ et services/. Centralisez votre logique métier dans des services testables.",
    code: nodeProjectTree,
    bullets: [
      "Séparer schemas/ pour les DTO Zod",
      "Utiliser middlewares/validate.ts pour réutiliser la logique de validation"
    ]
  },
  {
    id: "routes",
    title: "03. Définir les routes",
    description: "Utilisez Router d'Express et vos services pour exposer les endpoints typés.",
    code: `import { Router } from 'express';
import { validate } from '../middlewares/validate';
import { createUserSchema } from '../schemas/userSchemas';

const router = Router();
router.post('/users', validate(createUserSchema), controller.create);
router.get('/users', controller.list);
export default router;`
  },
  {
    id: "validation",
    title: "04. Validation & DTO",
    description: "Zod décrit vos DTO et sert de source unique pour les validations runtime.",
    code: `import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email(),
  role: z.enum(['admin', 'viewer']),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;`
  },
  {
    id: "testing",
    title: "05. Tester et monitorer",
    description: "Vitest + supertest simulent vos requêtes HTTP et vous assure que les routes restent stables.",
    code: `import request from 'supertest';
import { app } from '../server';

test('POST /users crée un compte', async () => {
  const res = await request(app)
    .post('/users')
    .send({ email: 'foo@bar.dev', role: 'admin' });

  expect(res.status).toBe(201);
});`
  }
];

const nodeResources = [
  { label: "Exemple Node.js + TypeScript", href: "https://github.com/vercel/next.js/tree/canary/examples/api-routes" },
  { label: "Documentation Express", href: "https://expressjs.com/fr/guide/routing.html" },
  { label: "Référence Zod", href: "https://zod.dev" },
  { label: "Exemple Vitest + Supertest", href: "https://vitest.dev/guide/features.html#testing-http-servers" }
];

const nodeContent: TutorialContent = {
  heroTitle: "Démarrage rapide Node.js + TypeScript",
  heroDescription:
    "Exposez une API REST fiable en moins d'une heure grâce à Express, TypeScript, Zod et Vitest. Cette page rassemble les commandes clés, la structure type et les garde-fous indispensables pour shipper sereinement.",
  learnList: [
    "Initialiser un projet TypeScript prêt pour la prod",
    "Structurer services/routes et sécuriser les payloads avec Zod",
    "Écrire des tests Vitest + Supertest et ajouter une route /health"
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
  { id: "structure", label: "Architecture" },
  { id: "persistence", label: "Persistence" },
  { id: "validation", label: "Exceptions" },
  { id: "testing", label: "Tests & CI" }
];

const springQuickStartCards: QuickStartCard[] = [
  {
    id: "init",
    title: "Générer le squelette",
    minutes: "~3 min",
    command: `curl https://start.spring.io/starter.zip \\
  -d dependencies=web,data-jpa,h2,lombok \\
  -d name=tasks \\
  -d packageName=simple.tasks \\
  -o tasks.zip
unzip tasks.zip
cd tasks && ./mvnw spring-boot:run`,
    bullets: [
      "Package simple.tasks déjà câblé (web + JPA + Lombok)",
      "Utiliser ./mvnw pour garantir la version Maven wrapper"
    ]
  },
  {
    id: "controller",
    title: "Exposez le contrôleur",
    minutes: "~4 min",
    command: `@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TasksControllers {
  private final TasksCreateTask createTask;

  @PostMapping
  public Tasks create(@RequestBody TasksDto payload) {
    return createTask.createTask(payload);
  }
}`,
    bullets: [
      "Injecter chaque use-case via constructeur (pattern Tasks service)",
      "Séparer DTO et entité pour garder un contrat REST stable"
    ]
  },
  {
    id: "pipeline",
    title: "Tests et pipeline",
    minutes: "~2 min",
    command: `./mvnw clean test
./mvnw verify`,
    bullets: [
      "La target surefire produit les rapports JUnit pour Jenkins",
      "Facile à dockeriser : exposez le port 5300 défini dans application.yml"
    ]
  }
];

const springProjectTree = `src/
  main/java/simple/tasks/
    TasksApplication.java
    controllers/TasksControllers.java
    dto/TasksDto.java
    services/
      TasksCreateTask.java
      TasksGetTaskById.java
      TasksGetAllTasks.java
      UpdateTask.java
      DeleteTask.java
    models/Tasks.java
    jpa/TasksRepository.java
    exceptions/ResourceNotFoundException.java
  main/resources/application.yml
  test/java/simple/tasks/services/
    TasksCreateTaskTest.java ...`;

const springProjectFiles: ProjectFile[] = [
  {
    path: "TasksControllers.java",
    description: "Couche REST qui délègue chaque action à un service dédié.",
    snippet: `@RestController
public class TasksControllers {
  private final TasksCreateTask createTasksService;
  private final TasksGetTaskById tasksGetTaskByIdService;

  public TasksControllers(TasksCreateTask createTasksService, TasksGetTaskById tasksGetTaskByIdService, TasksGetAllTasks tasksGetAllTasks, UpdateTask updateTask, DeleteTask deleteTask) {
    this.createTasksService = createTasksService;
    this.tasksGetTaskByIdService = tasksGetTaskByIdService;
    this.tasksGetAllTasks = tasksGetAllTasks;
    this.updateTasksService = updateTask;
    this.deleteTasksService = deleteTask;
  }

  @GetMapping("/tasks")
  public List<Tasks> getAllTasks() {
    return tasksGetAllTasks.getAllTasks();
  }
}`
  },
  {
    path: "TasksCreateTask.java",
    description: "Service applicatif qui instancie l'entité et persiste via JPA.",
    snippet: `@Service
@AllArgsConstructor
public class TasksCreateTask {
  private final TasksRepository tasksRepository;

  public Tasks createTask(TasksDto task) {
    Tasks newTask = new Tasks(task.getName());
    return tasksRepository.save(newTask);
  }
}`
  },
  {
    path: "models/Tasks.java",
    description: "Entité JPA minimale (id auto + libellé).",
    snippet: `@Entity
@Data
@NoArgsConstructor
public class Tasks {
  @Id
  @GeneratedValue
  private Long id;
  private String name;

  public Tasks(String name) {
    this.name = name;
  }
}`
  },
  {
    path: "jpa/TasksRepository.java",
    description: "Repository Spring Data pour manipuler Tasks.",
    snippet: `public interface TasksRepository extends JpaRepository<Tasks, Long> {}`
  },
  {
    path: "src/test/.../TasksCreateTaskTest.java",
    description: "Test JUnit + Mockito qui vérifie la création de tâche.",
    snippet: `@Test
void testCreateTask() {
  TasksRepository repo = mock(TasksRepository.class);
  TasksCreateTask service = new TasksCreateTask(repo);
  TasksDto dto = new TasksDto("Nouvelle tâche");
  when(repo.save(any())).thenReturn(new Tasks("Nouvelle tâche"));

  Tasks result = service.createTask(dto);

  assertEquals("Nouvelle tâche", result.getName());
  verify(repo).save(any());
}`
  },
  {
    path: "main/resources/application.yml",
    description: "Configuration Postgres/H2 + port 5300.",
    snippet: `spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/sonar
    username: sonar
    password: sonar
  jpa:
    hibernate:
      ddl-auto: create-drop
server:
  port: 5300`
  }
];

const springSections: TutorialSection[] = [
  {
    id: "intro",
    title: "Panorama",
    description: "Le projet Tasks illustre une API Spring Boot modulaire : contrôleurs fins, services unitaires et repository JPA.",
    bullets: [
      "Couche REST ultra légère (pas de logique dans les contrôleurs)",
      "Services dédiés Create/Update/Delete pour faciliter les tests",
      "JPA + exceptions custom pour une gestion d'erreur claire"
    ]
  },
  {
    id: "setup",
    title: "01. Installation",
    description: "Utilisez le wrapper Maven pour builder et exposer l'API sans installer Maven globalement.",
    code: `./mvnw spring-boot:run
# ou
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev`,
    bullets: [
      "Le wrapper assure la même version Maven pour tous",
      "Expose par défaut le port 5300 (configurable dans application.yml)"
    ]
  },
  {
    id: "structure",
    title: "02. Architecture REST",
    description: "Chaque endpoint délègue à un service injecté : le contrôleur reste un simple orchestrateur.",
    code: `@RestController
@RequiredArgsConstructor
@RequestMapping("/tasks")
public class TasksControllers {
  private final TasksCreateTask createTask;
  private final TasksGetTaskById getTaskById;

  @PostMapping
  public Tasks create(@RequestBody TasksDto payload) {
    return createTask.createTask(payload);
  }
}`,
    bullets: [
      "Constructeur obligatoire => injection sûre et testable",
      "Classes de service séparées => responsabilité unique"
    ]
  },
  {
    id: "persistence",
    title: "03. Persistance & DTO",
    description: "Les DTO remontent côté REST tandis que l'entité Tasks reste une simple classe JPA.",
    code: `@Entity
@Data
@NoArgsConstructor
public class Tasks {
  @Id @GeneratedValue
  private Long id;
  private String name;

  public Tasks(String name) {
    this.name = name;
  }
}`,
    bullets: [
      "DTO (TasksDto) évite d'exposer l'entité complète",
      "Repository Spring Data fournit CRUD sans code supplémentaire"
    ]
  },
  {
    id: "validation",
    title: "04. Exceptions métier",
    description: "Centralisez les erreurs dans ResourceNotFoundException et utilisez-les dans les services.",
    code: `public Tasks getTaskById(Long id) {
  return tasksRepository.findById(id)
    .orElseThrow(() -> new ResourceNotFoundException("Task not found " + id));
}`,
    bullets: [
      "Les messages sont contextualisés => logs exploitables",
      "Spring renverra automatiquement un 500, personnalisez avec @ControllerAdvice si besoin"
    ]
  },
  {
    id: "testing",
    title: "05. Tests & CI",
    description: "Mockito permet d'isoler la couche service et d'alimenter le pipeline Jenkins.",
    code: `@Test
void testCreateTask() {
  TasksRepository repo = mock(TasksRepository.class);
  when(repo.save(any())).thenReturn(new Tasks("Nouvelle tâche"));

  TasksCreateTask service = new TasksCreateTask(repo);
  Tasks result = service.createTask(new TasksDto("Nouvelle tâche"));

  assertEquals("Nouvelle tâche", result.getName());
  verify(repo).save(any());
}`,
    bullets: [
      "./mvnw clean test pour alimenter les rapports surefire",
      "Les mêmes commandes s'intègrent dans un Jenkinsfile ou GitHub Actions"
    ]
  }
];

const springResources = [
  { label: "Projet Tasks (Spring Boot)", href: "https://github.com/simbie/tasks" },
  { label: "Documentation Spring Boot", href: "https://docs.spring.io/spring-boot/docs/current/reference/html/" },
  { label: "Référence Spring Data JPA", href: "https://spring.io/projects/spring-data-jpa" },
  { label: "Guide JUnit 5 + Mockito", href: "https://junit.org/junit5/docs/current/user-guide/" }
];

const springContent: TutorialContent = {
  heroTitle: "Démarrage rapide Spring Boot + Maven",
  heroDescription:
    "Le projet Tasks montre comment livrer une API Java propre : génération Spring Initializr, services unitaires, repository JPA et pipeline Maven/Jenkins prêt pour la CI.",
  learnList: [
    "Générer un squelette Spring Boot avec Maven wrapper",
    "Structurer controllers/dto/services + repository JPA",
    "Écrire des tests JUnit/Mockito et brancher la CI"
  ],
  quickStartHeading: "Démarrage Spring Boot",
  quickStartIntro: "Scripts Maven et snippets prêts à l’emploi pour sécuriser l’API Tasks.",
  sidebar: springSidebar,
  quickStartCards: springQuickStartCards,
  projectTree: springProjectTree,
  projectFiles: springProjectFiles,
  tutorialSections: springSections,
  resources: springResources
};

export const tutorialContent: Record<TutorialStack, TutorialContent> = {
  node: nodeContent,
  spring: springContent
};
