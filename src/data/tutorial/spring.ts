import type { SidebarEntry, QuickStartCard, TutorialSection, ProjectFile, TutorialContent } from "./types";

const springSidebar: SidebarEntry[] = [
  { id: "intro", label: "Panorama" },
  { id: "setup", label: "Installation" },
  { id: "config", label: "Configuration" },
  { id: "model", label: "Modèle & DTO" },
  { id: "repository", label: "Repository & Mapper" },
  { id: "services", label: "Services" },
  { id: "controller", label: "Contrôleur" },
  { id: "security", label: "Sécurité & JWT" },
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
  security/
    AuthController.java
    AuthenticationService.java
    SecurityConfig.java
    JwtAuthenticationFilter.java
    JwtTokenProvider.java
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
    description: "Couche REST conforme au guide Spring Web MVC (https://docs.spring.io/spring-framework/reference/web/webmvc.html) : expose /api/tasks et délègue au service.",
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
    path: "src/main/java/simdev/demo/security/SecurityConfig.java",
    description: "Configuration Spring Security : expose /api/auth/** sans authentification, force l'utilisation d'un JWT pour les autres routes et ajoute un filtre personnalisé.",
    snippet: `@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
  private final JwtAuthenticationFilter jwtAuthenticationFilter;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
      .csrf(AbstractHttpConfigurer::disable)
      .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/api/auth/login", "/api/auth/register").permitAll()
        .requestMatchers("/api/auth/**").authenticated()
        .requestMatchers("/api/tasks/**").authenticated()
        .anyRequest().denyAll()
      )
      .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }
}`,
    language: "java"
  },
  {
    path: "src/main/java/simdev/demo/security/AuthenticationService.java",
    description: "Service d'authentification : vérifie les identifiants, encode les mots de passe, et génère des JWT pour les routes protégées.",
    snippet: `@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtTokenProvider jwtTokenProvider;

  public AuthResponse login(LoginRequest loginRequest) {
    var user = userRepository.findByEmail(loginRequest.getEmail())
      .orElseThrow(() -> new UsernameNotFoundException("Utilisateur introuvable"));
    if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
      throw new BadCredentialsException("Mot de passe invalide");
    }
    return AuthResponse.builder()
      .token(jwtTokenProvider.generateToken(user))
      .build();
  }

  public AuthResponse register(RegisterRequest registerRequest) {
    var userEntity = User.builder()
      .email(registerRequest.getEmail())
      .password(passwordEncoder.encode(registerRequest.getPassword()))
      .role("ROLE_USER")
      .build();
    var saved = userRepository.save(userEntity);
    return AuthResponse.builder()
      .token(jwtTokenProvider.generateToken(saved))
      .build();
  }
}`,
    language: "java"
  },
  {
    path: "src/main/java/simdev/demo/security/AuthController.java",
    description: "Controller d'authentification : login et register restent publics et renvoient les JWT générés par AuthenticationService.",
    snippet: `@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
  private final AuthenticationService authenticationService;

  @PostMapping("/login")
  public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
    return ResponseEntity.ok(authenticationService.login(request));
  }

  @PostMapping("/register")
  public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
    return ResponseEntity.ok(authenticationService.register(request));
  }
}`,
    language: "java"
  },
  {
    path: "src/main/java/simdev/demo/services/TasksService.java",
    description: "Contrat unique utilisé par le controller, conformément aux recommandations Spring sur l'injection de dépendances (https://docs.spring.io/spring-framework/reference/core/beans.html).",
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
    description: "Façade métier principale alignée sur Spring Data JPA (https://spring.io/projects/spring-data-jpa) pour orchestrer repository et mapper.",
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
    description: "Use-case création inspiré du guide Spring Service Layer (https://docs.spring.io/spring-framework/reference/core/beans.html#beans-scopes) : il empêche les doublons et force le statut PENDING.",
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
    description: "Repository Spring Data avec finder custom, tel que documenté dans https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.query-methods.",
    snippet: `public interface TasksRepository extends JpaRepository<Tasks, Long> {
  Optional<Tasks> findByName(String name);
}`,
    language: "java"
  },
  {
    path: "src/main/java/simdev/demo/dto/TasksDto.java",
    description: "DTO Lombok (https://projectlombok.org/features/Data) minimal qui transporte name/description/status côté controller.",
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
    description: "Entité JPA annotée selon la spécification officielle (https://jakarta.ee/specifications/persistence/3.1/) avec timestamps automatiques.",
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
    description: "ControllerAdvice conforme à la documentation Spring MVC (https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-controller-advice.html) pour renvoyer des erreurs JSON propres.",
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
    description: "Configuration Postgres + Actuator basée sur le guide Spring Boot application properties (https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html).",
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
    description: "Test Mockito/JUnit 5 aligné sur la doc officielle (https://junit.org/junit5/docs/current/user-guide/) pour sécuriser la création de tâche.",
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
    description: "Pipeline Maven GitHub Actions appliquant les recommandations officielles (https://docs.github.com/actions) pour build, tests et rapports.",
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
    description: "Bienvenue dans ce tutoriel pour construire une API Spring Boot complète, en suivant les meilleures pratiques de Spring Boot 3 et Java 17. Nous allons créer une architecture modulaire avec contrôleurs fins, services métier, repositories JPA et observabilité Actuator, prête pour la production.",
    bullets: [
      "Architecture modulaire avec séparation des responsabilités : contrôleurs pour les endpoints REST, services pour la logique métier, repositories pour l'accès aux données.",
      "Gestion centralisée des exceptions avec GlobalExceptionHandler pour des réponses d'erreur cohérentes.",
      "Observabilité intégrée avec Spring Boot Actuator pour la surveillance en production."
    ]
  },
  {
    id: "setup",
    title: "Installation",
    description: "Générez le projet Spring Boot avec Spring Initializr pour obtenir un squelette Maven prêt à l'emploi, incluant les dépendances essentielles pour le développement d'une API REST avec base de données.",
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
      "Assurez-vous que JAVA_HOME pointe vers une JDK 17 avant d'exécuter ./mvnw.",
      "Créez les packages nécessaires (controllers, services, etc.) selon la structure recommandée."
    ],
    codeLanguage: "bash"
  },
  {
    id: "config",
    title: "Configuration applicative",
    description: "Configurez application.yml pour la connexion à PostgreSQL, les paramètres JPA et l'exposition des endpoints Actuator, suivant la documentation Spring Boot.",
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
      "Utilisez des profils Spring (local, prod) pour différencier les configurations selon l'environnement.",
      "ddl-auto: create-drop est utile pour les tests, mais utilisez update ou validate en production."
    ],
    codeLanguage: "yaml"
  },
  {
    id: "model",
    title: "Modèle et DTO",
    description: "Définissez l'entité JPA avec les annotations appropriées et les DTO pour le transfert de données, suivant les spécifications Jakarta Persistence.",
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
      "Utilisez Lombok pour réduire le code boilerplate dans les entités et DTO.",
      "Les DTO permettent de contrôler les données exposées via l'API REST."
    ],
    codeLanguage: "java"
  },
  {
    id: "repository",
    title: "Repository et mapper",
    description: "Implémentez le repository Spring Data JPA pour l'accès aux données et un mapper pour la conversion entre entités et DTO, suivant les bonnes pratiques Spring Data.",
    code: `public interface TasksRepository extends JpaRepository<Tasks, Long> {
  Optional<Tasks> findByName(String name);
}

@Component
public class TasksMapper {
  public Tasks toEntity(TasksDto dto) { ... }
}`,
    bullets: [
      "Utilisez les méthodes dérivées de Spring Data pour les requêtes simples.",
      "Le mapper assure la séparation entre la couche de données et la couche de présentation."
    ],
    codeLanguage: "java"
  },
  {
    id: "services",
    title: "Services métiers",
    description: "Développez les services métier pour encapsuler la logique applicative, en séparant les use-cases (création, lecture, mise à jour, suppression) selon les principes de Spring.",
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
      "Utilisez des interfaces pour les services afin de faciliter les tests unitaires avec des mocks.",
      "Gérez les exceptions métier de manière centralisée pour une meilleure maintenabilité."
    ],
    codeLanguage: "java"
  },
  {
    id: "controller",
    title: "Contrôleur REST",
    description: "Créez le contrôleur REST pour exposer les endpoints /api/tasks, en utilisant les annotations Spring Web MVC pour mapper les requêtes HTTP aux méthodes métier.",
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
      "Utilisez ResponseEntity pour contrôler précisément les codes de statut HTTP.",
      "Gardez les contrôleurs fins en déléguant la logique aux services."
    ],
    codeLanguage: "java"
  },
  {
    id: "security",
    title: "Sécurité & JWT",
    description:
      "Ajoutez un contrôle Spring Security complet : l’authentification gère un UserDetailsService, les tokens JWT sont signés via JwtTokenProvider et les autres routes sont protégées par JwtAuthenticationFilter.",
    code: `@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserRepository userRepository;
  private final JwtTokenProvider jwtTokenProvider;
  private final PasswordEncoder passwordEncoder;

  public AuthResponse login(LoginRequest login) {
    var user = userRepository.findByEmail(login.getEmail())
      .orElseThrow(() -> new UsernameNotFoundException("Utilisateur introuvable"));
    if (!passwordEncoder.matches(login.getPassword(), user.getPassword())) {
      throw new BadCredentialsException("Mot de passe invalide");
    }
    return AuthResponse.builder()
      .token(jwtTokenProvider.generateToken(user))
      .build();
  }

  public AuthResponse register(RegisterRequest registerRequest) {
    var userEntity = User.builder()
      .email(registerRequest.getEmail())
      .password(passwordEncoder.encode(registerRequest.getPassword()))
      .role("ROLE_USER")
      .build();
    var saved = userRepository.save(userEntity);
    return AuthResponse.builder()
      .token(jwtTokenProvider.generateToken(saved))
      .build();
  }
}

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
  private final AuthenticationService authenticationService;

  @PostMapping("/login")
  public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
    return ResponseEntity.ok(authenticationService.login(request));
  }

  @PostMapping("/register")
  public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
    return ResponseEntity.ok(authenticationService.register(request));
  }
}`,
    bullets: [
      "Créez des routes /api/auth/login et /api/auth/register publiques pour émettre les tokens et enregistrer les utilisateurs.",
      "Implémentez JwtAuthenticationFilter pour valider chaque requête en extraire un claim, puis injectez un UserDetails authentifié dans le SecurityContext.",
      "Désactivez les sessions (STATLESS) et protégez explicitement /api/tasks/** pendant que seules les routes d’authentification restent sans JWT."
    ],
    codeLanguage: "java"
  },
  {
    id: "observability",
    title: "Observabilité",
    description: "Configurez Spring Boot Actuator pour exposer les métriques et endpoints de santé, et utilisez Docker Compose pour l'environnement de développement local.",
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
      "Les endpoints Actuator permettent la surveillance et le debugging en production.",
      "Docker Compose facilite la configuration d'un environnement de développement isolé."
    ],
    codeLanguage: "yaml"
  },
  {
    id: "testing",
    title: "Tests",
    description: "Écrivez des tests unitaires avec Mockito et JUnit 5 pour chaque use-case, ainsi que des tests d'intégration pour valider le comportement end-to-end.",
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
      "Les tests unitaires isolent les composants pour une couverture fiable.",
      "Utilisez Testcontainers pour les tests d'intégration nécessitant une base de données réelle."
    ],
    codeLanguage: "java"
  },

  {
    id: "delivery",
    title: "CI/CD",
    description: "Configurez des pipelines CI/CD avec GitHub Actions ou Jenkins pour automatiser les tests, la construction et le déploiement, suivant les meilleures pratiques de livraison continue.",
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
      "Automatisez la construction d'images Docker pour le déploiement.",
      "Intégrez des outils de qualité de code comme SonarQube pour l'analyse statique."
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
    "Dans ce tutoriel, nous reproduisons l'architecture du projet demo-rest-api (Spring Boot 3 + Java 17) en partant de zéro : contrôleurs fins, observabilité Actuator et pipeline CI prêts pour la production.",
  learnList: [
    "Initialiser demo-rest-api avec les bons starters (actuator, Flyway).",
    "Structurer controllers/services.",
    "Brancher Actuator, les tests et la CI GitHub Actions."
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
