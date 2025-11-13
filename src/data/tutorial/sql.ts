import type { TutorialContent, SidebarEntry, QuickStartCard, ProjectFile, TutorialSection } from "./types";

const sqlSidebar: SidebarEntry[] = [
  { id: "intro", label: "Panorama" },
  { id: "setup", label: "Préparer l'environnement" },
  { id: "basics", label: "Fondamentaux" },
  { id: "intermediate", label: "Jointures & agrégations" },
  { id: "advanced", label: "CTE & fenêtres" },
  { id: "optimization", label: "Optimisation / données" }
];

const sqlQuickStartCards: QuickStartCard[] = [
  {
    id: "workspace",
    title: "Workspace local",
    minutes: "~1 min",
    command: `docker run --rm -d --name sql-lab -e POSTGRES_PASSWORD=postgres -p 5439:5432 postgres:15
psql postgresql://postgres:postgres@localhost:5439/postgres`,
    bullets: [
      "Utilisez un container Postgres jetable pour tester vos requêtes",
      "psql sert aussi pour rejouer vos scripts dans un pipeline CI"
    ],
    language: "bash"
  },
  {
    id: "seed",
    title: "Jeu de données",
    minutes: "~1 min",
    command: `psql -f sql/datasets/ecommerce_seed.sql postgresql://postgres:postgres@localhost:5439/postgres`,
    bullets: [
      "Travaillez toujours avec un dataset représentatif",
      "Tagguez vos seeds (v1, v2...) pour rejouer un scénario précis"
    ],
    language: "bash"
  },
  {
    id: "observe",
    title: "Observer une requête",
    minutes: "~2 min",
    command: `EXPLAIN (ANALYZE, BUFFERS)
SELECT c.segment, SUM(o.amount) AS ca
FROM orders o
JOIN customers c ON c.id = o.customer_id
GROUP BY c.segment
ORDER BY ca DESC;`,
    bullets: [
      "EXPLAIN (ANALYZE) est le point d'entrée pour comprendre les plans",
      "Ajoutez BUFFERS/TIMING pour repérer les lectures disque"
    ],
    language: "sql"
  }
];

const sqlProjectTree = `sql/
  datasets/
    ecommerce_seed.sql
  notebooks/
    exploration.sql
  foundations.sql
  analytics/
    joins.sql
    windows.sql
  optimization/
    indexing.sql
    governance.sql`;

const sqlProjectFiles: ProjectFile[] = [
  {
    path: "sql/foundations.sql",
    description: "CRUD de base : filtrer, ordonner, agréger.",
    snippet: `-- Lecture ciblée
SELECT order_id, amount, status
FROM orders
WHERE status = 'COMPLETED'
ORDER BY purchased_at DESC
LIMIT 25;

-- Données agrégées
SELECT status, COUNT(*) AS commandes, SUM(amount) AS ca
FROM orders
GROUP BY status;

-- Jointure simple
SELECT o.order_id, o.amount, c.segment
FROM orders o
JOIN customers c ON c.id = o.customer_id
WHERE c.segment = 'ENTERPRISE';`,
    language: "sql"
  },
  {
    path: "sql/analytics/joins.sql",
    description: "Jointures et sous-requêtes pour enrichir la donnée.",
    snippet: `WITH monthly_sales AS (
  SELECT date_trunc('month', purchased_at) AS mois,
         c.segment,
         SUM(amount) AS ca
  FROM orders o
  JOIN customers c ON c.id = o.customer_id
  GROUP BY 1, 2
)
SELECT mois, segment, ca,
       ca - LAG(ca) OVER (PARTITION BY segment ORDER BY mois) AS delta
FROM monthly_sales
ORDER BY mois DESC;`,
    language: "sql"
  },
  {
    path: "sql/optimization/indexing.sql",
    description: "Exemple d'EXPLAIN et d'indexation ciblée.",
    snippet: `EXPLAIN (ANALYZE, COSTS)
SELECT *
FROM orders
WHERE status = 'COMPLETED'
  AND purchased_at >= now() - INTERVAL '7 days';

CREATE INDEX IF NOT EXISTS idx_orders_status_purchased_at
  ON orders(status, purchased_at DESC);`,
    language: "sql"
  }
];

const sqlSections: TutorialSection[] = [
  {
    id: "intro",
    title: "Panorama",
    description: "SQL reste la brique essentielle pour transformer, agréger et fiabiliser la donnée métier.",
    bullets: [
      "Niveau base : sélection, filtres, agrégations",
      "Niveau intermédiaire : jointures, sous-requêtes, CTE",
      "Niveau avancé : fenêtres analytiques, optimisation, gouvernance"
    ]
  },
  {
    id: "setup",
    title: "Préparer l'environnement",
    description: "Utilisez un Postgres jetable (Docker) + un dataset reproductible pour apprendre sans risque.",
    code: sqlQuickStartCards[0].command,
    bullets: [
      "Placez vos scripts dans sql/ et rejouez-les avec psql",
      "Ajoutez un Makefile ou npm script pour semer/supprimer la base"
    ],
    codeLanguage: "bash"
  },
  {
    id: "basics",
    title: "Fondamentaux",
    description: "Sélections, filtres, ORDER BY, LIMIT, agrégations : ces primitives couvrent 80 % des besoins.",
    code: sqlProjectFiles[0].snippet,
    bullets: [
      "Pensez « ensemble » : vos requêtes manipulent des sets, pas des boucles",
      "Les jointures INNER/LEFT font partie du socle : reliez vos tables tôt pour éviter des boucles applicatives",
      "Commencez vos explorations avec SELECT ... LIMIT 10 pour valider le shape"
    ],
    codeLanguage: "sql"
  },
  {
    id: "intermediate",
    title: "Jointures & agrégations",
    description: "Combinez plusieurs tables, créez des CTE pour structurer vos calculs intermédiaires.",
    code: sqlProjectFiles[1].snippet,
    bullets: [
      "Les CTE rendent vos requêtes lisibles et testables",
      "Utilisez les fenêtres pour comparer un enregistrement à son voisin (LAG/LEAD, ROW_NUMBER)"
    ],
    codeLanguage: "sql"
  },
  {
    id: "advanced",
    title: "CTE & fenêtres avancées",
    description: "Va plus loin : fenêtres partitionnées, pivot, JSON, fonctions custom.",
    code: `WITH cohort AS (
  SELECT customer_id,
         MIN(purchased_at) AS first_purchase
  FROM orders
  GROUP BY customer_id
)
SELECT date_trunc('month', first_purchase) AS cohort_month,
       COUNT(*) AS new_customers,
       AVG(
         EXTRACT(DAY FROM (now() - first_purchase))
       ) AS avg_age
FROM cohort
GROUP BY 1
ORDER BY 1 DESC;`,
    bullets: [
      "Les fenêtres partitionnées permettent des analyses par cohortes",
      "Combinez JSONB et fonctions (->, ->>) pour manipuler des payloads semi-structurés"
    ],
    codeLanguage: "sql"
  },
  {
    id: "optimization",
    title: "Optimisation & gouvernance",
    description: "Utilisez EXPLAIN, la collecte de stats et les index pour garder des temps de réponse stables.",
    code: sqlProjectFiles[2].snippet,
    bullets: [
      "Ajoutez toujours EXPLAIN (ANALYZE) dans vos notes pour tracer l'impact d'un index",
      "Surveillez les cardinalités et nettoyez vos index inutilisés via pg_stat_user_indexes"
    ],
    codeLanguage: "sql"
  }
];

const sqlResources = [
  { label: "PostgreSQL docs", href: "https://www.postgresql.org/docs/current/index.html" },
  { label: "Mode SQL Tutorial", href: "https://mode.com/sql-tutorial/" },
  { label: "Use The Index, Luke", href: "https://use-the-index-luke.com/" },
  { label: "Awesome SQL Window functions", href: "https://www.sqlshack.com/tag/window-functions/" }
];

export const sqlContent: TutorialContent = {
  heroTitle: "SQL & traitement des données",
  heroDescription:
    "Du SELECT basique aux fenêtres analytiques, cette feuille de route SQL te guide pour servir la donnée produit en toute confiance.",
  learnList: [
    "Structurer un espace SQL reproductible avec Docker + seeds",
    "Passer des requêtes CRUD aux analyses multi-cohortes",
    "Optimiser via EXPLAIN, index et gouvernance des jeux de données"
  ],
  quickStartHeading: "Démarrage rapide SQL",
  quickStartIntro: "Installe un Postgres jetable, charge un dataset et mesure ton impact via EXPLAIN.",
  sidebar: sqlSidebar,
  quickStartCards: sqlQuickStartCards,
  projectTree: sqlProjectTree,
  projectFiles: sqlProjectFiles,
  tutorialSections: sqlSections,
  resources: sqlResources
};
