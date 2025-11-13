import type { SidebarEntry, QuickStartCard, TutorialSection, ProjectFile, TutorialContent } from "./types";

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
  -d dependencies=web,data-jpa,postgresql,lombok,validation,actuator,security \\
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
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/postgres
    username: postgres
    password: postgres
  jpa:
    hibernate:
      ddl-auto: create-drop
./mvnw spring-boot:run`,
    bullets: [
      "Docker Compose lance Postgres + pgAdmin pour tester localement",
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
      "Ces commandes alimentent directement le workflow GitHub Actions fourni dans la démo"
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
`,
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
    description: "Configuration Postgres + port 5300 + Actuator activé.",
    snippet: `spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/postgres
    username: postgres
    password: postgres
  jpa:
    hibernate:
      ddl-auto: create-drop
management:
  endpoints:
    web.exposure.include: health,info
server:
  port: 5300`,
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
    description: "application.yml concentre datasource Postgres, JPA et Actuator.",
    code: `spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/postgres
    username: postgres
    password: postgres
  jpa:
    hibernate:
      ddl-auto: create-drop
management:
  endpoints:
    web.exposure.include: health,info`,
    bullets: [
      "Docker Compose lance Postgres + pgAdmin pour tester localement",
      "ddl-auto: create-drop recrée le schéma à chaque démarrage"
    ],
    codeLanguage: "yaml"
  },
  {
    id: "model",
    title: "Modèle et DTO",
    description: "Définissez l'entité JPA et les DTO associés avant de câbler le reste.",
    code: `@Entity
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
    code: `public interface TasksRepository extends JpaRepository<Tasks, Long> {
  Optional<Tasks> findByName(String name);
}

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
    code: `@Service
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
    code: `@RestController
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
    code: `@ExtendWith(MockitoExtension.class)
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
    description: "GitHub Actions et Jenkins déclenchent verify, publient les rapports et préparent l'image Docker.",
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
      - run: ./mvnw -B verify

// Jenkinsfile (pipeline équivalent)
pipeline {
  agent any
  tools { jdk 'temurin-17' }
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Test & Verify') { steps { sh './mvnw -B verify' } }
  }
  post {
    always { junit '**/surefire-reports/*.xml' }
  }
}`,
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

export { springContent };
