import type { TutorialContent, SidebarEntry, QuickStartCard, ProjectFile, TutorialSection } from "./types";

const nosqlSidebar: SidebarEntry[] = [
  { id: "intro", label: "Panorama" },
  { id: "setup", label: "Préparer l'environnement" },
  { id: "basics", label: "Fondamentaux" },
  { id: "queries", label: "Requêtes & agrégations" },
  { id: "indexing", label: "Indexation & performance" },
  { id: "design", label: "Conception de schémas" }
];

const nosqlQuickStartCards: QuickStartCard[] = [
  {
    id: "workspace",
    title: "Workspace local",
    minutes: "~1 min",
    command: `docker run --rm -d --name nosql-lab -p 27017:27017 mongo:7.0
mongosh mongodb://localhost:27017`,
    bullets: [
      "MongoDB container jetable pour tester vos opérations",
      "mongosh remplace mongo shell, avec coloration syntaxique"
    ],
    language: "bash"
  },
  {
    id: "seed",
    title: "Jeu de données",
    minutes: "~1 min",
    command: `mongosh mongodb://localhost:27017 <<EOF
use ecommerce
db.products.insertMany([
  { name: "Laptop Pro", price: 1299, category: "electronics", tags: ["premium", "laptop"] },
  { name: "Smartphone X", price: 899, category: "electronics", tags: ["mobile", "flagship"] }
])
EOF`,
    bullets: [
      "Utilisez insertMany pour charger en bulk",
      "Toujours validez vos seeds avec db.collection.countDocuments()"
    ],
    language: "bash"
  },
  {
    id: "observe",
    title: "Observer une opération",
    minutes: "~2 min",
    command: `db.products.explain("executionStats")
  .find({ category: "electronics" })
  .sort({ price: -1 })
  .limit(5);`,
    bullets: [
      "explain('executionStats') montre les plans d'exécution MongoDB",
      "Surveillez totalDocsExamined vs. nReturned pour l'efficacité"
    ],
    language: "javascript"
  }
];

const nosqlProjectTree = `nosql/
  datasets/
    ecommerce_seed.js
  notebooks/
    exploration.js
  foundations.js
  analytics/
    aggregation.js
    indexing.js
  design/
    schema_patterns.js
    migration.js`;

const nosqlProjectFiles: ProjectFile[] = [
  {
    path: "nosql/foundations.js",
    description: "CRUD de base : insert, find, update, delete.",
    snippet: `// Insertion
db.products.insertOne({
  name: "Wireless Mouse",
  price: 49.99,
  category: "accessories",
  stock: 150,
  tags: ["wireless", "office"]
});

// Recherche
db.products.find({ category: "electronics" }).pretty();

// Mise à jour
db.products.updateOne(
  { name: "Laptop Pro" },
  { $set: { price: 1199, updatedAt: new Date() } }
);

// Suppression
db.products.deleteMany({ stock: { $lt: 10 } });`,
    language: "javascript"
  },
  {
    path: "nosql/analytics/aggregation.js",
    description: "Pipeline d'agrégation pour analyses complexes.",
    snippet: `db.orders.aggregate([
  {
    $match: { status: "completed" }
  },
  {
    $group: {
      _id: "$customer.segment",
      totalOrders: { $sum: 1 },
      totalRevenue: { $sum: "$amount" },
      avgOrderValue: { $avg: "$amount" }
    }
  },
  {
    $sort: { totalRevenue: -1 }
  },
  {
    $project: {
      segment: "$_id",
      orders: "$totalOrders",
      revenue: "$totalRevenue",
      aov: { $round: ["$avgOrderValue", 2] },
      _id: 0
    }
  }
]);`,
    language: "javascript"
  },
  {
    path: "nosql/indexing.js",
    description: "Création d'index pour optimiser les requêtes.",
    snippet: `// Index simple
db.products.createIndex({ category: 1 });

// Index composé
db.products.createIndex({ category: 1, price: 1 });

// Index textuel pour recherche
db.products.createIndex({ name: "text", description: "text" });
db.products.find({
  $text: { $search: "laptop wireless" },
  score: { $meta: "textScore" }
}).sort({ score: { $meta: "textScore" } });

// Vérifier les index
db.products.getIndexes();`,
    language: "javascript"
  }
];

const nosqlSections: TutorialSection[] = [
  {
    id: "intro",
    title: "Panorama",
    description: "NoSQL excelle pour les données semi-structurées, scalables horizontalement. MongoDB (document) illustre bien les concepts clés.",
    bullets: [
      "Modèle document : JSON-like, sans schéma rigide",
      "Opérations CRUD, agrégations, indexation",
      "Conception de schémas, sharding, réplication"
    ]
  },
  {
    id: "setup",
    title: "Préparer l'environnement",
    description: "MongoDB via Docker + dataset reproductible pour expérimenter sans impact.",
    code: nosqlQuickStartCards[0].command,
    bullets: [
      "Utilisez mongosh pour interagir (remplace mongo shell)",
      "Scripts .js pour seeds et migrations (exécutables avec mongosh -f)",
      "Toujours cleanup : docker stop && docker rm nosql-lab"
    ],
    codeLanguage: "bash"
  },
  {
    id: "basics",
    title: "Fondamentaux",
    description: "CRUD, find avec filtres, update/delete : les primitives NoSQL.",
    code: nosqlProjectFiles[0].snippet,
    bullets: [
      "find() retourne un curseur (itérable, lazy)",
      "Opérateurs : $eq, $gt, $in, $regex pour filtrer",
      "updateOne vs updateMany : granularité du contrôle",
      "Projections : .find({}, { name: 1, price: 1 }) pour limiter les champs"
    ],
    codeLanguage: "javascript"
  },
  {
    id: "queries",
    title: "Requêtes & agrégations",
    description: "Pipelines d'agrégation pour transformer et analyser les données.",
    code: nosqlProjectFiles[1].snippet,
    bullets: [
      "Pipeline : $match → $group → $sort → $project (comme SQL mais plus flexible)",
      "Opérateurs avancés : $lookup (jointure), $unwind (dé-normaliser arrays)",
      "Utilisez $facet pour exécuter plusieurs pipelines en parallèle"
    ],
    codeLanguage: "javascript"
  },
  {
    id: "indexing",
    title: "Indexation & performance",
    description: "Index pour accélérer les requêtes, explain pour analyser les plans.",
    code: nosqlProjectFiles[2].snippet,
    bullets: [
      "Index composé pour queries multi-champs fréquentes",
      "Index text pour full-text search (avec scoring)",
      "explain('executionStats') : winningPlan vs. rejectedPlans",
      "Surveillez index usage via db.collection.getIndexes()"
    ],
    codeLanguage: "javascript"
  },
  {
    id: "design",
    title: "Conception de schémas",
    description: "Dénormalisation, embedding vs. referencing, patterns de migration.",
    code: `// Embedding (dénormalisation)
db.users.insertOne({
  name: "Alice",
  orders: [
    { item: "Laptop", amount: 1299, date: new Date() },
    { item: "Mouse", amount: 49, date: new Date() }
  ]
});

// Referencing (normalisation)
db.users.insertOne({ _id: ObjectId(), name: "Bob" });
db.orders.insertMany([
  { userId: ObjectId("bob_id"), item: "Keyboard", amount: 79 }
]);

// Migration : ajouter champ sans downtime
db.products.updateMany(
  {},
  { $set: { tags: [], createdAt: new Date() } }
);`,
    bullets: [
      "Embedding pour lectures rapides (1 document = tout le contexte)",
      "Referencing pour updates fréquents (évite duplication)",
      "Dénormalisez pour performance, normalisez pour cohérence",
      "Migrations : $set/$unset atomiques, validez avec countDocuments"
    ],
    codeLanguage: "javascript"
  }
];

const nosqlResources = [
  { label: "MongoDB Docs", href: "https://www.mongodb.com/docs/manual/" },
  { label: "Aggregation Pipeline", href: "https://www.mongodb.com/docs/manual/core/aggregation-pipeline/" },
  { label: "Schema Design", href: "https://www.mongodb.com/docs/manual/core/data-model-design/" },
  { label: "Indexing Guide", href: "https://www.mongodb.com/docs/manual/indexes/" },
  { label: "NoSQL Patterns", href: "https://martinfowler.com/articles/nosql-intro.html" }
];

export const nosqlContent: TutorialContent = {
  heroTitle: "NoSQL & MongoDB",
  heroDescription:
    "Du CRUD basique aux pipelines d'agrégation, maîtrisez MongoDB pour les données flexibles et scalables. Focus sur conception, performance et bonnes pratiques.",
  learnList: [
    "Structurer un workspace MongoDB reproductible avec Docker",
    "Passer des opérations CRUD aux analyses via aggregation pipeline",
    "Optimiser avec index, explain et patterns de schéma NoSQL"
  ],
  quickStartHeading: "Démarrage rapide NoSQL",
  quickStartIntro: "Installez MongoDB local, chargez un dataset et analysez vos plans d'exécution.",
  sidebar: nosqlSidebar,
  quickStartCards: nosqlQuickStartCards,
  projectTree: nosqlProjectTree,
  projectFiles: nosqlProjectFiles,
  tutorialSections: nosqlSections,
  resources: nosqlResources
};
