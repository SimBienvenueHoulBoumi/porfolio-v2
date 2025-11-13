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
      "La première ligne lance un conteneur MongoDB temporaire avec Docker : --rm supprime automatiquement le conteneur à l'arrêt, -d le met en arrière-plan, -p expose le port 27017 pour l'accès local.",
      "La seconde ligne ouvre l'interface mongosh pour interagir avec la base : remplace l'ancien mongo shell, offre une meilleure UX avec autocomplétion et coloration syntaxique.",
      "Pourquoi ? Cela évite d'installer MongoDB localement et permet de tester sans pollution de votre environnement de dev."
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
      "use ecommerce : Sélectionne (ou crée) la base de données 'ecommerce' – en NoSQL, les DB sont créées à la première utilisation.",
      "insertMany([...]) : Insère plusieurs documents en une fois pour efficacité ; chaque objet est un document JSON-like stocké dans la collection 'products'.",
      "Pourquoi valider ? Exécutez ensuite db.products.countDocuments() pour confirmer (devrait retourner 2) – cela assure que vos données sont bien chargées avant de tester des queries.",
      "Astuce : Copiez ligne par ligne si vous préférez, ou sauvegardez en fichier .js et exécutez mongosh -f seed.js pour réutiliser."
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
      "explain('executionStats') : Enveloppe la query pour afficher le plan d'exécution détaillé – montre comment MongoDB scanne les données (COLLSCAN = scan complet, IXSCAN = utilise un index).",
      ".find({ category: 'electronics' }) : Filtre les documents où category = 'electronics' ; $eq est implicite.",
      ".sort({ price: -1 }) : Trie par prix décroissant (-1) ; sans index, cela peut être coûteux sur de gros datasets.",
      ".limit(5) : Limite à 5 résultats pour pagination ou échantillonnage.",
      "Pourquoi observer ? Comparez totalDocsExamined (docs scannés) vs. nReturned (docs retournés) : idéalement < 10x ; si élevé, ajoutez un index !"
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
    description: "CRUD de base (insert, find, update, delete) tel que documenté par MongoDB (https://www.mongodb.com/docs/manual/crud/) – insertOne est atomique et find exploite des opérateurs pour filtrer efficacement.",
    snippet: `// 1. Insertion : Crée un nouveau document (équivalent INSERT SQL, mais flexible car sans schéma fixe)
db.products.insertOne({
  name: "Wireless Mouse",
  price: 49.99,
  category: "accessories",
  stock: 150,
  tags: ["wireless", "office"]  // Arrays natives pour tags multiples
});
// Résultat : Retourne { acknowledged: true, insertedId: ObjectId(...) } – l'ID est auto-généré.

// 2. Recherche : Récupère des documents (équivalent SELECT). .pretty() formate l'output pour lisibilité.
db.products.find({ category: "electronics" }).pretty();  // Filtre sur category exacte ($eq implicite)

// 3. Mise à jour : Modifie un document existant (équivalent UPDATE). $set met à jour des champs spécifiques sans écraser le reste.
db.products.updateOne(
  { name: "Laptop Pro" },  // Filtre pour cibler
  { $set: { price: 1199, updatedAt: new Date() } }  // Mise à jour partielle
);
// Résultat : { acknowledged: true, matchedCount: 1, modifiedCount: 1 }

// 4. Suppression : Supprime des documents (équivalent DELETE). $lt compare stock < 10.
db.products.deleteMany({ stock: { $lt: 10 } });  // Supprime tous les produits en rupture
// Résultat : { acknowledged: true, deletedCount: X }`,
    language: "javascript"
  },
  {
    path: "nosql/analytics/aggregation.js",
    description: "Pipeline d'agrégation pour analyses complexes, conforme à la doc officielle (https://www.mongodb.com/docs/manual/core/aggregation-pipeline/) : transformations étape par étape pour des rapports dynamiques sans jointures lourdes.",
    snippet: `// Pipeline complet : Traite les commandes complétées par segment client (équivalent GROUP BY + SUM/AVG SQL)
db.orders.aggregate([
  // Étape 1: $match – Filtre les données (réduit le dataset tôt pour performance)
  { $match: { status: "completed" } },  // Seulement les commandes finies
  
  // Étape 2: $group – Agrège par segment (grouping key = _id)
  { $group: {
      _id: "$customer.segment",  // Groupe par segment (ex: "premium", "standard")
      totalOrders: { $sum: 1 },  // Compte les occurrences (équiv. COUNT(*))
      totalRevenue: { $sum: "$amount" },  // Somme des montants
      avgOrderValue: { $avg: "$amount" }  // Moyenne des montants
    }
  },
  
  // Étape 3: $sort – Trie les résultats (descendant sur revenue)
  { $sort: { totalRevenue: -1 } },  // -1 = décroissant
  
  // Étape 4: $project – Formate l'output (renomme champs, arrondit, cache _id)
  { $project: {
      segment: "$_id",  // Renomme _id en segment
      orders: "$totalOrders",
      revenue: "$totalRevenue",
      aov: { $round: ["$avgOrderValue", 2] },  // Arrondit à 2 décimales
      _id: 0  // Exclut _id du résultat
    }
  }
]);  // Résultat : Tableau d'objets agrégés, triés par revenue`,
    language: "javascript"
  },
  {
    path: "nosql/indexing.js",
    description: "Création d'index pour optimiser les requêtes, en suivant la référence MongoDB Indexes (https://www.mongodb.com/docs/manual/indexes/) : accélère find/sort via B-tree et types avancés (composés, textuels).",
    snippet: `// 1. Index simple : Accélère les queries sur un champ unique (ex: category)
db.products.createIndex({ category: 1 });  // 1 = ascendant (utilisez -1 pour descendant si sort fréquent)
// Pourquoi ? Sans index, MongoDB scanne TOUS les docs (COLLSCAN) ; avec, utilise IXSCAN (rapide).

// 2. Index composé : Pour queries multi-champs (ex: find category ET sort price)
db.products.createIndex({ category: 1, price: 1 });  // Ordre important : champ filtré d'abord
// Utilisez explain() pour vérifier : winningPlan montre l'index utilisé.

// 3. Index textuel : Pour recherche full-text (équiv. LIKE % en SQL, mais avec scoring)
db.products.createIndex({ name: "text", description: "text" });  // Champs text-indexés
db.products.find({
  $text: { $search: "laptop wireless" },  // Recherche AND/OR implicite
  score: { $meta: "textScore" }  // Score de pertinence
}).sort({ score: { $meta: "textScore" } });  // Trie par pertinence
// Limite : 1 index text par collection ; ignore stop words.

// 4. Vérifier les index : Liste tous les index et leur taille
db.products.getIndexes();  // Affiche { key: { category: 1 }, name: "category_1" }`,
    language: "javascript"
  }
];

const nosqlSections: TutorialSection[] = [
  {
    id: "intro",
    title: "Panorama",
    description: "NoSQL (Not Only SQL) cible les données semi-structurées et la scalabilité horizontale comme détaillé par MongoDB (https://www.mongodb.com/nosql-explained). Ce tutoriel se concentre sur MongoDB document store (JSON-like, schéma flexible, sharding natif).",
    bullets: [
      "Modèle document : Chaque enregistrement est un BSON (JSON binaire), scalable et queryable comme SQL mais sans jointures obligatoires.",
      "Avantages : Pas de schéma fixe (ajoutez champs à la volée), indexation puissante, agrégations intégrées pour analytics.",
      "Inconvénients : Moins fort en ACID pour transactions complexes ; nécessite une conception adaptée (dénormalisation).",
      "Cas d'usage : E-commerce (produits variables), logs (structures irrégulières), IoT (données temps réel)."
    ]
  },
  {
    id: "setup",
    title: "Préparer l'environnement",
    description: "Pour expérimenter sans installer MongoDB globalement, suivez le tutoriel officiel Docker (https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-docker/) : Docker fournit un environnement isolé et mongosh est l'interface supportée pour exécuter vos commandes.",
    code: nosqlQuickStartCards[0].command,
    bullets: [
      "docker run ... : Lance MongoDB en conteneur ; --rm auto-nettoie à l'arrêt, -d en arrière-plan, -p mappe le port local 27017 au conteneur.",
      "mongosh ... : Ouvre le shell interactif ; tapez 'exit' pour quitter. Si Docker n'est pas installé, suivez le guide officiel (gratuit, ~5 min).",
      "Vérification : Dans un autre terminal, docker ps pour voir le conteneur actif ; ps aux pour confirmer MongoDB écoute sur 27017.",
      "Alternative sans Docker : Téléchargez MongoDB Community (gratuit), mais Docker est recommandé pour isolation et portabilité."
    ],
    codeLanguage: "bash"
  },
  {
    id: "basics",
    title: "Fondamentaux",
    description: "Les opérations CRUD (Create/Read/Update/Delete) correspondent aux chapitres officiels MongoDB (https://www.mongodb.com/docs/manual/crud/). Elles sont atomiques, flexibles et scalables : insérez, puis queryez pour comprendre la différence avec SQL.",
    code: nosqlProjectFiles[0].snippet,
    bullets: [
      "insertOne({ ... }) : Crée UN document ; retourne l'ID généré. Utilisez pour inserts uniques ; pour bulk, préférez insertMany (plus efficace, moins d'overhead réseau).",
      "find({ filter }) : Récupère des docs ; retourne un curseur (lazy loading – itérez avec .toArray() si besoin). .pretty() formate pour lisibilité en shell.",
      "updateOne({ filter }, { $set: { ... } }) : Met à jour le PREMIER doc matching ; $set préserve les autres champs (vs. $setOnInsert pour inserts conditionnels).",
      "deleteMany({ filter }) : Supprime TOUS les docs matching ; utilisez deleteOne pour un seul. Toujours confirmez avec countDocuments avant pour éviter pertes accidentelles.",
      "Projections & opérateurs : Ajoutez .projection({ name: 1 }) pour limiter champs ; utilisez $gt (>, $in (IN), $regex pour patterns – ex: { name: { $regex: '^L' } } pour noms commençant par L."
    ],
    codeLanguage: "javascript"
  },
  {
    id: "queries",
    title: "Requêtes & agrégations",
    description: "Les requêtes simples (find) suffisent pour CRUD, mais pour analyses utilisez les pipelines décrits dans la doc Aggregation Pipeline (https://www.mongodb.com/docs/manual/core/aggregation-pipeline/). Enchaînez $match, $group, $lookup pour transformer vos données comme un ETL in-base.",
    code: nosqlProjectFiles[1].snippet,
    bullets: [
      "$match { ... } : Première étape – filtre tôt pour réduire le volume traité (comme WHERE SQL) ; appliquez sur index si possible pour vitesse.",
      "$group { _id: ..., $sum: ..., $avg: ... } : Agrège par clé (_id = segment) ; $sum compte/somme, $avg moyenne – équiv. GROUP BY + fonctions agrégées SQL.",
      "$sort { ... } : Trie les résultats finaux ; -1 pour descendant. Placez après $group pour éviter tri intermédiaire coûteux.",
      "$project { ... } : Formate l'output – renomme ($segment: '$_id'), arrondit ($round), exclut (_id: 0). Utilisez pour anonymiser ou simplifier.",
      "Avancé : $lookup pour jointures (équiv. JOIN SQL), $unwind pour 'exploser' arrays en docs séparés ; $facet pour multi-pipelines parallèles (ex: stats + top 10)."
    ],
    codeLanguage: "javascript"
  },
  {
    id: "indexing",
    title: "Indexation & performance",
    description: "Sans index, MongoDB scanne tout ; les index B-tree décrits ici (https://www.mongodb.com/docs/manual/indexes/) réduisent les temps de réponse. Utilisez explain pour comparer les plans et surveillez l'utilisation afin d'éviter les index coûteux.",
    code: nosqlProjectFiles[2].snippet,
    bullets: [
      "createIndex({ field: 1 }) : Index simple sur un champ ; 1=asc, -1=desc. Idéal pour equality filters (category=...) ou range ($gt).",
      "createIndex({ field1: 1, field2: 1 }) : Composé pour queries multi-champs ; ordre critique (filtre fréquent d'abord). Ex: category puis price pour find+sort.",
      "createIndex({ field: 'text' }) : Textuel pour full-text ; supporte $search avec stemming (laptopS → laptop). Score via $meta pour pertinence.",
      "find avec $text + sort score : Recherche pondérée ; limitez résultats pour performance. getIndexes() liste tous (taille, usage).",
      "Diagnostiquer : explain('executionStats') montre winningPlan (index utilisé) vs. rejectedPlans ; totalKeysExamined bas = bon index. Supprimez avec dropIndex si obsolète."
    ],
    codeLanguage: "javascript"
  },
  {
    id: "design",
    title: "Conception de schémas",
    description: "En NoSQL, pas de schéma fixe, mais suivez la doc MongoDB Data Modeling (https://www.mongodb.com/docs/manual/core/data-modeling-introduction/) : choisir embedding vs referencing équilibre performance et cohérence, avec migrations atomiques via $set.",
    code: `// 1. Embedding (dénormalisation) : Intégrez données liées dans un doc – rapide pour reads (1 query), mais updates complexes si arrays grandissent
db.users.insertOne({
  name: "Alice",
  profile: { email: "alice@example.com", age: 28 },
  orders: [  // Array embedded pour historique récent
    { item: "Laptop", amount: 1299, date: new Date(), status: "shipped" },
    { item: "Mouse", amount: 49, date: new Date(), status: "pending" }
  ]
});
// Avantage : db.users.find({ name: "Alice" }) récupère tout ; inconvénient : update order nécessite $push/$pull sur array.

db.users.updateOne(
  { name: "Alice" },
  { $push: { orders: { item: "Keyboard", amount: 79, date: new Date() } } }
);  // Ajoute à l'array sans rewrite complet

// 2. Referencing (normalisation) : Stockez refs via ID – facile updates, mais multi-queries pour reads
db.users.insertOne({ _id: ObjectId(), name: "Bob", email: "bob@example.com" });
db.orders.insertMany([
  { 
    userId: ObjectId("...bob_id..."),  // Référence à user._id
    item: "Keyboard", 
    amount: 79, 
    date: new Date() 
  }
]);
// Read : db.orders.find({ userId: ObjectId("bob_id") }) puis db.users.find({ _id: bob_id }) – 2 queries, mais scalable.

db.users.updateOne({ _id: ObjectId("bob_id") }, { $set: { email: "new@email.com" } });  // Update user sans toucher orders

// 3. Migration sans downtime : Ajoutez champs à tous docs atomiquement
db.products.updateMany(
  {},  // Tous docs
  { $set: { tags: [], createdAt: new Date() } }  // Ajoute champs par défaut
);
// Vérifiez : db.products.countDocuments({ tags: { $exists: true } }) devrait = total docs`,
    bullets: [
      "Embedding : Idéal pour 1:N avec reads fréquents (ex: user + recent orders) ; limitez arrays (<1000 elems) pour éviter docs trop gros (>16MB max).",
      "Referencing : Pour N:1 ou updates isolés (ex: user profile change sans propager) ; utilisez ObjectId pour refs (6 bytes, unique global).",
      "Hybride : Embed pour hot data (fréquemment lue), reference pour cold (archives). Testez avec explain pour valider performance.",
      "Migrations : $set/$unset/$rename atomiques ; toujours testez sur staging, validez avec countDocuments({ field: { $exists: true } }). Outils comme mongomigrate pour scripts complexes."
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
