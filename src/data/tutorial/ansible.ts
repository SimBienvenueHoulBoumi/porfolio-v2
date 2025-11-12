import type { SidebarEntry, QuickStartCard, TutorialSection, ProjectFile, TutorialContent } from "./types";

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

export { ansibleContent };
