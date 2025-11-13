import type { SidebarEntry, QuickStartCard, TutorialSection, ProjectFile, TutorialContent } from "./types";

const linuxSidebar: SidebarEntry[] = [
  { id: "intro", label: "Panorama" },
  { id: "setup", label: "Installation" },
  { id: "files", label: "Gestion des fichiers" },
  { id: "processes", label: "Processus" },
  { id: "services", label: "Services" },
  { id: "disk", label: "Disques & stockage" },
  { id: "ssh", label: "SSH & connexion" },
  { id: "users", label: "Utilisateurs & droits" },
  { id: "network", label: "Réseau" },
  { id: "monitoring", label: "Monitoring" }
];

const linuxQuickStartCards: QuickStartCard[] = [
  {
    id: "essentials",
    title: "Commandes essentielles",
    minutes: "~5 min",
    command: `ls -la /home
cd /var/log
tail -f syslog
df -h
free -h`,
    bullets: [
      "ls -la : liste détaillée avec permissions",
      "cd : navigation dans les dossiers",
      "tail -f : surveillance en temps réel",
      "df -h : espace disque format humain"
    ],
    language: "bash"
  },
  {
    id: "processes",
    title: "Gérer les processus",
    minutes: "~3 min",
    command: `ps aux | grep nginx
kill -9 1234
systemctl status nginx
systemctl restart nginx`,
    bullets: [
      "ps aux : liste tous les processus",
      "kill -9 : arrêt forcé d'un processus",
      "systemctl : gestion des services systemd"
    ],
    language: "bash"
  },
  {
    id: "users",
    title: "Gestion utilisateurs",
    minutes: "~4 min",
    command: `useradd -m -s /bin/bash devuser
passwd devuser
usermod -aG sudo devuser
chmod 755 /home/devuser`,
    bullets: [
      "useradd -m : crée home directory",
      "usermod -aG : ajoute aux groupes",
      "chmod : définit les permissions"
    ],
    language: "bash"
  }
];

const linuxProjectTree = `/
├── etc/
│   ├── passwd
│   ├── group
│   ├── ssh/
│   └── systemd/
├── home/
│   └── user/
├── var/
│   ├── log/
│   └── www/
├── usr/
│   ├── bin/
│   └── local/
└── root/`;

const linuxProjectFiles: ProjectFile[] = [
  {
    path: "/etc/passwd",
    description: "Base des utilisateurs système avec leurs informations.",
    snippet: `root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
devuser:x:1000:1000:Developer,,,:/home/devuser:/bin/bash`,
    language: "bash"
  },
  {
    path: "/etc/group",
    description: "Définition des groupes et de leurs membres.",
    snippet: `root:x:0:
sudo:x:27:devuser
www-data:x:33:www-data
developers:x:1001:devuser,alice,bob`,
    language: "bash"
  },
  {
    path: "/etc/ssh/sshd_config",
    description: "Configuration du serveur SSH.",
    snippet: `#Port 22
#AddressFamily any
#ListenAddress 0.0.0.0
PermitRootLogin no
PasswordAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys`,
    language: "bash"
  },
  {
    path: "/etc/systemd/system/myapp.service",
    description: "Unité systemd pour une application personnalisée.",
    snippet: `[Unit]
Description=My Application
After=network.target

[Service]
Type=simple
User=devuser
WorkingDirectory=/var/www/myapp
ExecStart=/usr/bin/node app.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target`,
    language: "bash"
  }
];

const linuxSections: TutorialSection[] = [
  {
    id: "intro",
    title: "Panorama",
    description: "Linux est le système d'exploitation de référence pour les serveurs. Maîtriser les commandes de base permet d'administrer efficacement vos infrastructures.",
    bullets: [
      "Navigation et gestion des fichiers (ls, cd, cp, mv, rm)",
      "Gestion des processus (ps, kill, top)",
      "Administration système (services, utilisateurs, disques)",
      "Connexion sécurisée (SSH) et réseau"
    ]
  },
  {
    id: "setup",
    title: "Installation et environnement",
    description: "Installation d'une distribution Linux et configuration de base.",
    code: `# Ubuntu/Debian
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget vim htop tree

# CentOS/RHEL
sudo yum update -y
sudo yum install -y curl wget vim htop tree

# Vérifier la version
lsb_release -a
uname -a`,
    bullets: [
      "Maintenez votre système à jour régulièrement",
      "Installez les outils essentiels (vim, htop, tree)",
      "Vérifiez toujours les versions avant l'installation"
    ],
    codeLanguage: "bash"
  },
  {
    id: "files",
    title: "Gestion des fichiers",
    description: "Navigation, manipulation et archivage des fichiers.",
    code: `# Navigation
pwd                    # répertoire actuel
ls -la                 # liste détaillée
cd /var/log           # changer de répertoire
find /home -name "*.log"  # recherche de fichiers

# Manipulation
cp fichier.txt backup.txt
mv fichier.txt /tmp/
rm -rf /tmp/old_files/

# Archivage
tar -czf archive.tar.gz /var/www
tar -xzf archive.tar.gz
gzip fichier.txt
gunzip fichier.txt.gz`,
    bullets: [
      "Utilisez ls -la pour voir les permissions",
      "find est très puissant pour la recherche",
      "tar avec -z pour compression gzip",
      "rm -rf est destructif, utilisez avec précaution"
    ],
    codeLanguage: "bash"
  },
  {
    id: "processes",
    title: "Gestion des processus",
    description: "Surveillance et contrôle des processus système.",
    code: `# Surveillance
ps aux | head -10     # liste des processus
top                   # monitoring interactif
htop                  # version améliorée de top
pgrep nginx           # trouver PID par nom

# Contrôle
kill 1234             # arrêt propre (SIGTERM)
kill -9 1234          # arrêt forcé (SIGKILL)
pkill -f nginx        # tuer par pattern
nice -n 10 ./script.sh  # priorité basse

# Background
./long_script.sh &    # exécution en arrière-plan
jobs                  # liste des jobs
fg %1                 # ramener au premier plan`,
    bullets: [
      "ps aux montre tous les processus avec détails",
      "kill -9 seulement si kill normal ne fonctionne pas",
      "nice permet de gérer les priorités CPU",
      "& pour les tâches longues en background"
    ],
    codeLanguage: "bash"
  },
  {
    id: "services",
    title: "Gestion des services",
    description: "Contrôle des services système avec systemd.",
    code: `# État des services
systemctl status nginx
systemctl list-units --type=service
systemctl is-active nginx

# Contrôle
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl restart nginx
sudo systemctl reload nginx

# Au démarrage
sudo systemctl enable nginx
sudo systemctl disable nginx

# Logs
journalctl -u nginx -f
journalctl -u nginx --since "1 hour ago"`,
    bullets: [
      "systemctl remplace les anciens init scripts",
      "enable/disable contrôle le démarrage automatique",
      "journalctl pour consulter les logs systemd",
      "reload pour recharger la configuration sans arrêt"
    ],
    codeLanguage: "bash"
  },
  {
    id: "disk",
    title: "Disques et stockage",
    description: "Gestion des partitions, systèmes de fichiers et espace disque.",
    code: `# Espace disque
df -h                   # utilisation des systèmes de fichiers
du -sh /var/*          # taille des répertoires
lsblk                  # liste des disques et partitions

# Systèmes de fichiers
mount /dev/sdb1 /mnt   # monter une partition
umount /mnt            # démonter
fdisk -l               # info sur les disques

# Permissions et quotas
chmod 755 fichier.sh
chown user:group fichier.txt
quota -u username      # vérifier les quotas

# Recherche d'espace
find / -type f -size +100M  # fichiers > 100MB
lsof | grep deleted        # fichiers supprimés mais ouverts`,
    bullets: [
      "df -h pour un aperçu rapide de l'espace",
      "du -sh pour analyser l'usage par répertoire",
      "chmod 755 = rwxr-xr-x (owner full, others read+execute)",
      "lsof utile pour trouver les fichiers bloquant la suppression"
    ],
    codeLanguage: "bash"
  },
  {
    id: "ssh",
    title: "SSH et connexion sécurisée",
    description: "Configuration et utilisation de SSH pour l'administration à distance.",
    code: `# Connexion
ssh user@192.168.1.100
ssh -i ~/.ssh/id_rsa user@server.com

# Copie de fichiers
scp fichier.txt user@server:/tmp/
rsync -avz /local/dir user@server:/remote/dir

# Configuration client
Host myserver
    HostName 192.168.1.100
    User devuser
    IdentityFile ~/.ssh/id_rsa

# Configuration serveur (/etc/ssh/sshd_config)
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes`,
    bullets: [
      "Utilisez des clés SSH plutôt que les mots de passe",
      "scp pour copie simple, rsync pour synchronisation",
      "~/.ssh/config pour éviter de retaper les options",
      "Désactivez l'accès root et les mots de passe en prod"
    ],
    codeLanguage: "bash"
  },
  {
    id: "users",
    title: "Utilisateurs et droits",
    description: "Gestion des comptes utilisateurs et des permissions.",
    code: `# Gestion utilisateurs
useradd -m -s /bin/bash newuser
usermod -aG sudo newuser
userdel -r olduser

# Mots de passe
passwd username
chpasswd < passwords.txt

# Groupes
groupadd developers
usermod -aG developers username
groups username

# Permissions
chmod 644 fichier.txt    # rw-r--r--
chmod 755 script.sh      # rwxr-xr-x
chown user:group fichier.txt

# Permissions spéciales
chmod +s executable      # setuid/setgid
chmod +t directory       # sticky bit

# ACLs (systèmes modernes)
setfacl -m u:username:rwx fichier.txt
getfacl fichier.txt`,
    bullets: [
      "useradd -m crée automatiquement le home directory",
      "usermod -aG ajoute aux groupes existants (attention au -a)",
      "chmod 644 pour fichiers, 755 pour exécutables",
      "ACLs permettent des permissions plus fines que les droits Unix classiques"
    ],
    codeLanguage: "bash"
  },
  {
    id: "network",
    title: "Configuration réseau",
    description: "Outils de base pour diagnostiquer et configurer le réseau.",
    code: `# Diagnostic
ping google.com
traceroute google.com
nslookup google.com
dig google.com

# Interfaces
ip addr show
ip route show
ifconfig  # déprécié mais encore utilisé

# Ports ouverts
netstat -tlnp
ss -tlnp
lsof -i :80

# Firewall (ufw)
sudo ufw status
sudo ufw allow 22/tcp
sudo ufw enable

# Transferts
wget https://example.com/file.zip
curl -O https://example.com/file.zip
curl -X POST -d "data=value" https://api.example.com`,
    bullets: [
      "ping et traceroute pour diagnostiquer la connectivité",
      "ss remplace netstat (plus rapide et moderne)",
      "ufw simplifie iptables pour Ubuntu/Debian",
      "curl et wget pour tester les APIs et téléchargements"
    ],
    codeLanguage: "bash"
  },
  {
    id: "monitoring",
    title: "Monitoring et logs",
    description: "Surveillance du système et analyse des logs.",
    code: `# Ressources système
free -h              # mémoire
vmstat 1             # statistiques virtuelles
iostat -x 1          # I/O disques
sar -u 1             # utilisation CPU

# Logs système
tail -f /var/log/syslog
tail -f /var/log/auth.log
journalctl -f        # logs systemd

# Surveillance processus
watch -n 1 'ps aux | head -10'
watch -n 5 'df -h'

# Alertes et notifications
echo "Disk full" | mail -s "Alert" admin@example.com
wall "System will reboot in 5 minutes"

# Monitoring simple
uptime               # temps de fonctionnement
who                  # utilisateurs connectés
w                    # who + activité`,
    bullets: [
      "tail -f pour surveillance en temps réel",
      "watch répète une commande à intervalle régulier",
      "journalctl centralise tous les logs systemd",
      "uptime donne un aperçu rapide de la charge système"
    ],
    codeLanguage: "bash"
  }
];

const linuxResources = [
  { label: "Documentation Ubuntu", href: "https://ubuntu.com/server/docs" },
  { label: "Guide CentOS", href: "https://docs.centos.org/" },
  { label: "Manuel Linux", href: "https://tldp.org/LDP/intro-linux/html/" },
  { label: "Cheat sheet commandes", href: "https://devhints.io/bash" },
  { label: "Systemd documentation", href: "https://www.freedesktop.org/wiki/Software/systemd/" },
  { label: "Guide SSH", href: "https://www.ssh.com/academy/ssh" }
];

const linuxContent: TutorialContent = {
  heroTitle: "Maîtriser Linux pour les développeurs",
  heroDescription:
    "Guide complet des commandes Linux essentielles : navigation, processus, services, utilisateurs, SSH et monitoring. Devenez autonome sur vos serveurs.",
  learnList: [
    "Naviguer et manipuler les fichiers efficacement",
    "Gérer les processus et services système",
    "Administrer utilisateurs, groupes et permissions",
    "Configurer SSH et diagnostiquer le réseau",
    "Monitorer les ressources et analyser les logs"
  ],
  quickStartHeading: "Commandes Linux essentielles",
  quickStartIntro: "Les commandes de base pour débuter avec Linux.",
  sidebar: linuxSidebar,
  quickStartCards: linuxQuickStartCards,
  projectTree: linuxProjectTree,
  projectFiles: linuxProjectFiles,
  tutorialSections: linuxSections,
  resources: linuxResources
};

export { linuxContent };
