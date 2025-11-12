import type { SidebarEntry, QuickStartCard, TutorialSection, ProjectFile, TutorialContent } from "./types";

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
    command: `mkdir -p docker && cd docker
cat <<'EOF' > .env
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

export { dockerContent };
