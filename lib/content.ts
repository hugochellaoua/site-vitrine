// Source unique de vérité pour tout le contenu texte du site.
// Principe éditorial : UNE IDÉE = UNE SCÈNE. Le visuel porte la démonstration,
// le texte ne fait que la nommer. Toute copie longue a été condensée ou supprimée.
// Contenu de référence vérifié sur helpify-ai.fr (2026-08-13) puis réduit.

export const links = {
  booking: "https://calendar.app.google/kAfRpMQoheceUQZY8",
  contact: "/contact",
  // L'application est sur son propre sous-domaine : le lien sort du site.
  login: "https://app.helpify-ai.fr/",
  mentionsLegales: "/mentions-legales",
  privacy: "/politique-de-confidentialite",
  noticeIA: "/notice-ia",
  cgu: "/cgu",
  linkedin: "https://www.linkedin.com/company/helpify-ia",
};

// Deux niveaux d'engagement, jamais un seul : « Réserver » pour qui est prêt à
// bloquer un créneau, « En savoir plus » pour qui veut d'abord poser une question.
// Le second mène au formulaire de contact du site.
export const learnMore = { label: "En savoir plus", href: links.contact };

export const site = {
  name: "Helpify",
  // Le titre doit contenir les mots que tapent les acheteurs — « recrutement »,
  // « candidats » — avant la formule de marque. L'ancien titre était joli mais
  // ne contenait aucun terme recherché.
  title: "Helpify — L'IA qui préqualifie vos candidats | Recrutement",
  tagline: "L'IA qui préqualifie vos candidats",
  description:
    "Helpify échange avec chaque candidat, restitue une évaluation structurée et vous livre une shortlist. Une IA de préqualification qui se branche sur votre ATS.",
};

export const nav = {
  links: [
    // `dropdown` : l'entrée déploie un sous-menu au survol (voir navbar.tsx).
    { label: "Produits", href: "/produits", dropdown: "products" as const },
    // Placé juste après les produits : on entre plus souvent par son problème
    // que par le nom d'une brique logicielle.
    { label: "Cas d'usage", href: "/cas-d-usage", dropdown: "usecases" as const },
    // La méthodologie se déplie sous le process : c'est la même matière — ce
    // qui se passe, puis comment on s'y prend — et la barre n'a plus la place
    // d'une huitième entrée de premier niveau.
    { label: "Le process", href: "/#story", dropdown: "process" as const },
    { label: "Services", href: "/#services", dropdown: "services" as const },
    { label: "Tarifs", href: "/#tarifs" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: links.contact },
  ],
  connexion: { label: "Connexion", href: links.login },
  cta: { label: "Réservez une démo", href: links.booking },
};

export const hero = {
  title: "Rencontrez vos meilleurs candidats.",
  // Mis en orange, comme dans la vidéo : la couleur porte la promesse.
  emphasis: "Rapidement.",
  subtitle:
    "Une conversation qui comprend votre entreprise, échange avec chaque candidat et vous aide à recruter plus vite et mieux.",
  cta: { label: "Réservez une démo", href: links.booking },
  scrollHint: "Faites défiler",
};

// ─────────────────────────────────────────────────────────────
// LE PROCESS, ÉTAPE PAR ÉTAPE.
//
// Cette séquence explique *comment le produit fonctionne* — rien d'autre.
// Les arguments de vente (pourquoi le CV ne suffit pas, les bénéfices) vivent
// plus bas dans la page : aucune idée n'est dite deux fois.
//
// Chaque étape : un repère (où l'on en est), une phrase courte, une preuve visuelle.
// ─────────────────────────────────────────────────────────────
export const processIntro = {
  eyebrow: "Le process",
  title: "De votre besoin à la shortlist.",
  emphasis: "la shortlist.",
  sub: "10 étapes. Voici exactement ce qui se passe.",
  // Le déroulé fait dix écrans : il s'ouvre à la demande, pour ne pas imposer
  // à tout visiteur une traversée qu'il n'a pas demandée.
  reveal: "Découvrir le process",
  revealOpen: "Replier le process",
};

export const processSteps = [
  {
    key: "entreprise",
    n: "01",
    title: "Helpify comprend votre entreprise",
    sub: "ATS, CRM, documents, offres, échanges avec vos équipes.",
    sources: ["ATS", "CRM", "Documents", "Offres d'emploi", "Collaborateurs", "Vos équipes"],
    center: "Helpify",
  },
  {
    key: "besoin",
    n: "02",
    title: "Vous cadrez le poste",
    sub: "Vous définissez les critères et leur importance.",
    role: "Customer Success Manager",
    roleLabel: "Poste à pourvoir",
    // Le poids compte autant que le critère : c'est lui qui départage deux
    // candidats qui cochent les mêmes cases.
    fieldsLabel: "Critères et importance",
    fields: [
      { label: "Relation client grands comptes", weight: "Primordial" },
      { label: "Structuration d'un service", weight: "Primordial" },
      { label: "Anglais courant", weight: "Important" },
      { label: "Expérience SaaS", weight: "Bonus" },
    ],
    status: "Campagne prête",
  },
  {
    key: "diffusion",
    n: "03",
    title: "Vous diffusez un lien unique",
    sub: "Le même point d'entrée sur tous vos canaux.",
    link: "helpify-ai.fr/72401",
    channels: ["LinkedIn", "Job boards", "Site carrière", "Email", "Sourcing"],
  },
  {
    key: "questions",
    n: "04",
    title: "Le candidat pose ses questions",
    sub: "Le poste, l'équipe, les attentes, la suite du processus.",
    messages: [
      { from: "candidate", text: "Quel est le contexte du poste ?" },
      { from: "helpify", text: "L'équipe support double cette année. Vous structureriez la relation client." },
      { from: "candidate", text: "Comment se déroule la suite ?" },
      { from: "helpify", text: "Un entretien avec le manager, puis une mise en situation." },
    ],
  },
  {
    key: "reponses",
    n: "05",
    title: "Helpify interroge le candidat",
    sub: "Ses réponses deviennent des données structurées.",
    messages: [
      { from: "helpify", text: "Racontez-moi comment vous avez monté un service client." },
      {
        from: "candidate",
        text: "J'étais seule au départ. J'ai écrit les process, recruté trois personnes, puis mis en place un suivi de satisfaction.",
      },
    ],
    extracted: ["Expérience", "Compétences", "Motivations", "Soft skills", "Disponibilité"],
  },
  {
    key: "always",
    n: "06",
    title: "L'échange a lieu à toute heure",
    sub: "Sans que vous ayez à être disponible.",
    times: ["09:12", "14:37", "23:48", "03:17"],
  },
  {
    key: "evaluation",
    n: "07",
    title: "Helpify évalue chaque profil",
    sub: "Un score justifié critère par critère, sourcé sur ses réponses.",
    candidate: "Sarah K.",
    score: 92,
    rows: [
      { label: "Adéquation au poste", value: "Forte" },
      { label: "Compétences clés", value: "Structuration, fidélisation" },
      { label: "Points forts", value: "Service client monté de zéro" },
      { label: "Point de vigilance", value: "Disponible dans 3 mois" },
    ],
  },
  {
    key: "shortlist",
    n: "08",
    title: "Vous recevez la shortlist",
    sub: "200 candidats analysés, 10 profils à appeler.",
    funnel: [
      { value: 200, label: "candidats" },
      { value: 200, label: "conversations analysées" },
      { value: 60, label: "profils pertinents" },
      { value: 10, label: "profils shortlistés" },
    ],
  },
  {
    key: "decision",
    n: "09",
    title: "Vos RH prennent la décision",
    sub: "Plus éclairée : elle s'appuie sur une évaluation faite selon les critères définis pour le poste.",
    from: "Évaluation Helpify",
    basis: ["Compétences clés", "Contexte d'équipe", "Deal-breakers"],
    owner: "Vos RH",
    verdict: "Décision",
  },
  {
    key: "reponse",
    n: "10",
    title: "Chaque candidat reçoit sa réponse",
    sub: "Écrite à partir de sa propre conversation.",
    decisions: ["Continuer", "Refuser"],
    email: {
      greeting: "Bonjour Sarah,",
      lead: "Notre échange nous a permis de comprendre que :",
      points: [
        "vous avez monté un service client en partant de zéro, seule ;",
        "vous en avez écrit les process avant de recruter trois personnes ;",
        "vous y avez installé un suivi de la satisfaction client.",
      ],
      closing: "C'est exactement ce que nous cherchons sur ce poste.",
    },
  },
] as const;

export const processOutro = {
  cta: { label: "Démarrer ma première campagne", href: links.booking },
  sub: "15 min, sur un de vos postes réels.",
};

export const synthesis = {
  eyebrow: "Résultats mesurés",
  title: "Trois bénéfices, un seul process.",
  emphasis: "un seul process.",
  items: [
    { n: "01", title: "Gain de temps", value: "−90", unit: "%", label: "de temps jusqu'à la shortlist", steps: "Étapes 03 & 08" },
    { n: "02", title: "Expérience candidat", value: "4,8", unit: "/5", label: "note moyenne des candidats", steps: "Étapes 04 & 10" },
    { n: "03", title: "Évaluation", value: "3", unit: "×", label: "plus de signaux qualifiés", steps: "Étapes 01 & 07" },
  ],
};

/**
 * Notre méthodologie.
 *
 * Texte de l'entreprise, repris mot pour mot : c'est sa parole, on ne la
 * réécrit pas. Les `**…**` marquent ce qui doit ressortir à la lecture — le
 * composant de page les rend en clair sur fond sombre.
 */
export const methodology = {
  eyebrow: "Notre méthodologie",
  title: "Une méthodologie d'évaluation fondée sur les sciences du recrutement",
  emphasis: "les sciences du recrutement",
  intro: [
    "Helpify ne se contente pas de poser des questions.",
    "Chaque conversation est construite autour de **critères d'évaluation précis**, puis analysée à partir d'éléments concrets et observables dans les réponses.",
  ],

  steps: [
    {
      n: "01",
      title: "Définir les critères",
      body: [
        "À partir de la fiche de poste et du contexte de recrutement, Helpify identifie et suggère des **critères spécifiques au poste**.",
        "Pas de compétences génériques : les critères doivent pouvoir être **observés et évalués à travers des situations concrètes**.",
        "Le recruteur définit ensuite leur importance :",
      ],
      // Les trois niveaux reprennent le code couleur tenu partout : l'orange
      // pour ce qui est éliminatoire, le gris pour ce qui n'est qu'un plus.
      weights: ["Primordial", "Important", "Bonus"],
    },
    {
      n: "02",
      title: "Construire les questions",
      body: [
        // Pas de correspondance « un critère, une question » : tous ne sont pas
        // interrogés, et l'annoncer engagerait sur un fonctionnement qui n'est
        // pas le nôtre. Les critères orientent les questions, ils ne les
        // dictent pas une à une.
        "À partir des critères retenus, Helpify génère des questions qui explorent les expériences réelles du candidat : situations vécues, actions réalisées, décisions prises et résultats obtenus.",
        "La conversation s'appuie notamment sur des principes issus des méthodes **STAR et STAR inversé**.",
      ],
    },
    {
      n: "03",
      title: "Évaluer les réponses",
      body: [
        "Les réponses sont analysées au regard des critères définis et de leur niveau d'importance.",
        "Helpify recherche des **éléments observables et contextualisés**, plutôt que de simples déclarations ou mots-clés.",
      ],
    },
  ],

  chain: {
    title: "Une évaluation construite de bout en bout",
    steps: ["Critères précis", "Questions adaptées", "Éléments observables", "Évaluation"],
    lead: "Le CV donne le point de départ.",
    punch: "La conversation permet d'aller chercher ce que le CV ne peut pas montrer.",
  },

  cta: {
    title: "Voir la méthode appliquée à un de vos postes.",
    emphasis: "à un de vos postes.",
    sub: "15 min : vous décrivez le poste, on déroule la méthode devant vous.",
  },
};

/**
 * Cas d'usage.
 *
 * Chaque entrée part du problème tel que le recruteur le formule lui-même,
 * puis dit ce qu'Helpify y répond. C'est l'inverse d'une liste de
 * fonctionnalités : le visiteur doit se reconnaître dans une phrase avant
 * qu'on lui parle du produit.
 *
 * `menu` et `promise` sont la version courte affichée dans le sous-menu de la
 * navigation — la promesse y tient en une ligne. `tone` suit la règle de
 * couleur du site : orange quand le cas parle du candidat, bleu quand il parle
 * du travail du recruteur.
 */
export const useCases = {
  eyebrow: "Cas d'usage",
  title: "Neuf situations. Dans laquelle vous reconnaissez-vous ?",
  emphasis: "Dans laquelle vous reconnaissez-vous ?",
  intro:
    "Le recrutement ne bloque pas au même endroit selon les équipes. Partez de votre situation : voici ce qu'Helpify y change, concrètement.",
  menuLink: "Voir les neuf cas d'usage",

  items: [
    {
      id: "volume",
      menu: "Volume important",
      promise: "Gagnez du temps quel que soit le nombre de candidats",
      problem:
        "Je gère un volume important de candidatures et je n'ai pas le temps de toutes les analyser.",
      answer: [
        "Helpify automatise la première étape d'analyse et de préqualification. Chaque candidat peut être interrogé et évalué selon les critères définis pour le poste, afin de permettre aux recruteurs de se concentrer sur les profils nécessitant réellement leur intervention.",
      ],
      benefits: [
        "Gain de temps sur le tri et la préqualification",
        "Capacité à traiter des volumes importants",
        "Première évaluation homogène des candidats",
        "Plus de temps consacré aux étapes à forte valeur ajoutée",
      ],
      tone: "accent" as const,
    },
    {
      id: "standardiser-mon-process",
      menu: "Standardiser mon process",
      promise: "Les mêmes critères pour tous",
      problem: "Je veux que tous les candidats soient évalués de la même manière.",
      answer: [
        "Les critères d'évaluation sont définis en amont et servent de base aux conversations avec les candidats. Chaque candidat est ainsi évalué selon le même cadre, indépendamment du recruteur.",
      ],
      keyMessage: "Les mêmes critères pour tous.",
      tone: "accent" as const,
    },
    {
      id: "mieux-lire-les-candidats",
      menu: "Mieux lire les candidats",
      promise: "Un profil unifié et structuré",
      problem:
        "Les informations sont dispersées et j'ai besoin d'une lecture plus simple des profils.",
      answer: [
        "Helpify transforme les informations recueillies pendant la conversation en un profil unifié et structuré, basé sur les critères importants pour le poste.",
      ],
      benefits: [
        "Profil candidat standardisé",
        "Informations structurées",
        "Lecture plus rapide",
        "Comparaison facilitée",
        "Mise en avant des informations pertinentes pour le poste",
      ],
      tone: "accent" as const,
    },
    {
      id: "evaluer-les-competences",
      menu: "Évaluer les compétences",
      promise: "Allez au-delà des compétences déclarées",
      problem:
        "Je ne veux pas seulement savoir ce que le candidat affirme savoir faire. Je veux pouvoir évaluer ses compétences.",
      answer: [
        "Helpify ne se contente pas de collecter des informations. La conversation est construite autour des critères d'évaluation définis pour le poste et permet d'aller chercher des éléments concrets sur l'expérience, les compétences et les situations vécues par le candidat.",
      ],
      keyMessage: "Ne vous contentez plus de lire les compétences déclarées. Évaluez-les.",
      tone: "accent" as const,
    },
    {
      id: "cv-boostes-par-ia",
      menu: "CV boostés par l'IA",
      promise: "Allez vérifier ce qu'il y a derrière le CV",
      problem:
        "Les candidats utilisent l'IA pour optimiser leur CV. Comment savoir ce qu'il y a réellement derrière le document ?",
      answer: [
        "Le CV n'est plus la seule source d'information. Helpify ajoute une conversation avec le candidat pour aller au-delà du document.",
        "Les questions sont construites à partir des critères d'évaluation du poste et d'une méthodologie structurée de recrutement. Le candidat doit apporter des éléments concrets sur son expérience et son parcours.",
      ],
      // Une promesse d'infaillibilité serait invendable le jour où elle est
      // prise en défaut. On dit donc ce que la conversation fait vraiment.
      nuance:
        "La conversation ne rend pas la triche impossible. Elle limite les réponses artificiellement optimisées et confronte les déclarations à des éléments concrets.",
      tone: "accent" as const,
    },
    {
      id: "ne-passer-a-cote-daucun-talent",
      menu: "Ne passer à côté d'aucun talent",
      promise: "100 % des candidats écoutés et évalués",
      problem:
        "Je ne veux pas écarter un bon candidat simplement parce que son CV ne correspond pas parfaitement à ce que je recherche.",
      answer: [
        "Avec Helpify, 100 % des candidats sont écoutés, entendus et évalués selon les critères définis pour le poste.",
        "La décision ne repose donc plus uniquement sur les quelques lignes visibles sur un CV.",
      ],
      keyMessage: "100 % des candidats sont écoutés, entendus et évalués.",
      tone: "warm" as const,
    },
    {
      id: "experience-candidat",
      menu: "Améliorer l'expérience candidat",
      promise: "Donnez à chaque candidat la possibilité de s'exprimer",
      problem: "Je veux que mes candidats aient réellement l'occasion de s'exprimer.",
      answer: [
        "Chaque candidat peut avoir une véritable conversation autour de son parcours, de son expérience et de ses attentes.",
        "Il peut expliquer qui il est, apporter du contexte à son parcours et poser ses propres questions. Il peut également recevoir un retour personnalisé, si vous activez l'option.",
      ],
      keyMessage: "Donnez à chaque candidat la possibilité de s'exprimer.",
      tone: "warm" as const,
    },
    {
      id: "profils-atypiques",
      menu: "Comprendre les profils atypiques",
      promise: "Évaluez le talent au-delà du parcours linéaire",
      problem:
        "Certains profils ne rentrent pas dans les cases classiques du CV, mais pourraient pourtant correspondre au poste.",
      answer: [
        "La conversation permet d'aller plus loin qu'une lecture linéaire du parcours.",
        "Elle permet de comprendre ce que le candidat a réellement fait, dans quel contexte, avec quelles responsabilités et quelles compétences, afin d'évaluer son adéquation avec le poste au-delà des intitulés et des parcours traditionnels.",
      ],
      keyMessage: "Comprendre le talent derrière le parcours.",
      tone: "warm" as const,
    },
    {
      id: "enrichir-le-vivier",
      menu: "Enrichir le vivier",
      promise: "Un vivier plus riche et mieux exploitable",
      problem:
        "Je veux mieux connaître mon vivier de candidats pour pouvoir mieux l'exploiter dans le temps.",
      answer: [
        "Chaque conversation permet d'enrichir progressivement les informations disponibles sur les candidats : leur expérience, leurs compétences, leurs expertises, leurs contextes d'intervention ou encore leurs aspirations.",
        "Votre vivier devient ainsi plus riche et mieux exploitable, avec davantage d'informations qualifiées pour retrouver plus facilement les profils pertinents lorsqu'un nouveau besoin apparaît.",
        "Ces données peuvent notamment permettre, dans le temps, de mieux identifier les candidats susceptibles de correspondre à de futurs besoins et de mieux les allouer en fonction des opportunités.",
      ],
      benefits: [
        "Une connaissance plus riche des candidats déjà présents dans le vivier",
        "Davantage d'informations qualifiées sur les profils",
        "Un vivier qui s'enrichit au fil des interactions",
        "Une meilleure capacité à retrouver les profils pertinents pour de futurs besoins",
        "Une meilleure exploitation des talents déjà présents dans votre vivier",
      ],
      keyMessage: "Un vivier enrichi et mieux exploitable.",
      tone: "warm" as const,
    },
  ],

  cta: {
    title: "Votre situation n'est pas dans la liste ?",
    emphasis: "pas dans la liste ?",
    sub: "Décrivez-nous votre process : on vous montre en 15 min ce qu'Helpify y change.",
  },
};

// ─────────────────────────────────────────────────────────────
// PAGE PRODUITS
//
// Les titres et paragraphes sont repris mot pour mot du texte fourni : c'est
// la parole de l'entreprise, on ne la réécrit pas. Tout le reste — visuels,
// ancres, ordre de lecture — est de la mise en scène, et n'affirme rien de
// nouveau sur le produit.
//
// L'ordre suit le parcours réel d'une candidature : le candidat interroge
// (Talent Ask) arrive en dernier parce qu'il traverse tout le reste, mais la
// préqualification ouvre la page car c'est l'entrée en matière du recruteur.
// ─────────────────────────────────────────────────────────────
export const products = {
  eyebrow: "Nos produits",
  title: "Quatre produits. Une seule conversation.",
  emphasis: "Une seule conversation.",
  intro: [
    "Helpify transforme la conversation avec les candidats en un véritable outil de recrutement.",
    "De la première question à l'identification des meilleurs profils, nos quatre produits s'intègrent à votre ATS et s'adaptent à votre processus existant.",
  ],
  // La ligne en gras du texte source devient une suite d'étapes lisible d'un
  // coup d'œil : quatre verbes, quatre produits, dans l'ordre de la page.
  verbs: ["Préqualifier", "Matcher", "Révéler les synergies", "Répondre aux candidats"],
  outro: "Une seule plateforme pour mieux comprendre vos talents et accélérer vos recrutements.",

  items: [
    {
      id: "prequalification",
      name: "Préqualification",
      headline: "Les informations clés, sans les appels de préqualification",
      body: "Helpify échange avec chaque candidat pour collecter automatiquement les informations essentielles à votre recrutement.",
      visual: "chat-extract" as const,
      tone: "accent" as const,
    },
    {
      id: "matching",
      name: "Matching",
      headline: "Identifier les profils qui correspondent réellement au besoin",
      body: "Helpify analyse les profils selon vos critères et utilise la conversation pour aller au-delà de ce que révèle un CV.",
      visual: "score" as const,
      tone: "accent" as const,
    },
    {
      id: "360-matching",
      name: "360 Matching",
      headline: "Ne laissez plus passer un talent à cause d'une seule candidature",
      body: "Un candidat qui ne correspond pas à un poste peut être parfaitement adapté à un autre. 360 Matching identifie ces synergies dans l'ensemble de vos offres d'emploi.",
      visual: "constellation" as const,
      tone: "accent" as const,
    },
    {
      id: "talent-ask",
      name: "Talent Ask",
      headline: "Répondez aux candidats, 24h/24",
      body: "Talent Ask permet aux candidats de poser leurs questions sur votre entreprise, vos postes et votre environnement, directement dans leur parcours de recrutement.",
      // Seul produit tourné vers le candidat : il porte donc l'orange, comme
      // partout ailleurs sur le site.
      visual: "ask" as const,
      tone: "warm" as const,
    },
  ],

  // Éléments d'illustration, repris de ceux déjà présentés sur l'accueil pour
  // que le visiteur reconnaisse le même produit d'une page à l'autre.
  demo: {
    prequal: {
      // Une question factuelle : la préqualification collecte d'abord les
      // informations qu'un recruteur devrait sinon demander au téléphone.
      messages: [
        { from: "helpify", text: "Sous combien de temps êtes-vous disponible ?" },
        { from: "candidate", text: "Dans trois mois." },
      ],
      extracted: ["Disponibilité", "Mobilité", "Diplôme", "Langues parlées"],
    },
    score: {
      candidate: "Sarah K.",
      value: 92,
      rows: [
        { label: "Adéquation au poste", value: "Forte" },
        { label: "Compétences clés", value: "Structuration, fidélisation" },
        { label: "Points forts", value: "Service client monté de zéro" },
        { label: "Point de vigilance", value: "Disponible dans 3 mois" },
      ],
    },
    synergies: {
      center: "Sarah K.",
      roles: ["Customer Success Manager", "Account Manager", "Responsable support", "Chef de projet", "Consultant avant-vente", "Chargé de comptes"],
    },
    ask: {
      messages: [
        { from: "candidate", text: "Quel est le contexte du poste ?" },
        { from: "helpify", text: "L'équipe support double cette année. Vous structureriez la relation client." },
        { from: "candidate", text: "Comment se déroule la suite ?" },
        { from: "helpify", text: "Un entretien avec le manager, puis une mise en situation." },
      ],
      hours: ["09:12", "14:37", "23:48", "03:17"],
    },
  },

  // Aperçu sur l'accueil : on annonce les quatre produits avant de parler des
  // bénéfices, car on ne peut pas juger un résultat sans savoir d'où il vient.
  home: {
    eyebrow: "Nos produits",
    title: "Quatre produits. Une seule conversation.",
    emphasis: "Une seule conversation.",
    link: "Découvrir les quatre produits",
  },

  cta: {
    title: "Voir les quatre produits en conditions réelles.",
    emphasis: "en conditions réelles.",
    sub: "15 min sur un de vos postes, avec vos critères.",
  },
};

export const integrations = {
  eyebrow: "Intégrations",
  title: "Helpify se branche sur votre stack. Pas l'inverse.",
  emphasis: "Pas l'inverse.",
  center: "Helpify",
  logos: [
    "Salesforce",
    "Zoho",
    "SmartRecruiters",
    "Boond Manager",
    "Bullhorn",
    "Lever",
    "Greenhouse",
    "Teamtailor",
    "Workable",
    "HubSpot",
    "Recruitee",
    "JobAdder",
  ],
  note: "Et plus encore",
};

export const services = {
  eyebrow: "Services additionnels",
  title: "Ce que nous faisons en plus.",
  emphasis: "en plus.",
  // `line` tient sur une ligne et suffit à comprendre l'offre ; `body` se
  // déroule à la demande, pour qui veut savoir ce que cela recouvre vraiment.
  items: [
    {
      id: "marque-blanche",
      n: "01",
      title: "Marque blanche",
      line: "Helpify déployé aux couleurs de votre entreprise : logo, ton, charte.",
      body: [
        "Vos candidats échangent avec votre marque, pas avec la nôtre. Logo, couleurs et typographie sont les vôtres, du premier message jusqu'au compte rendu.",
        "C'est déterminant pour un cabinet ou une ESN, dont la relation candidat est le métier : elle doit rester à leur nom.",
      ],
    },
    {
      id: "accompagnement",
      n: "02",
      title: "Accompagnement sur mesure",
      line: "Un chef de projet dédié cadre le projet avec vos équipes : objectifs, ROI attendu, intégration à vos outils.",
      body: [
        "Un chef de projet dédié travaille avec vos équipes, pas à côté d'elles.",
        "Des ateliers d'abord, pour cadrer le projet : les objectifs, le ROI attendu et l'intégration à vos outils. On y décide de ce qui doit se passer — et de ce qui ne doit surtout pas changer.",
        "Le but n'est pas de vous faire adopter une nouvelle façon de travailler. C'est que tout s'enchaîne sans friction chez vous, que vos équipes gardent leurs habitudes, et que l'impact business soit clair avant même de commencer.",
        "Enfin des points réguliers, pour ajuster ce qui doit l'être à mesure que vos recrutements avancent.",
      ],
    },
  ],
  reveal: "En savoir plus",
  revealOpen: "Replier",
};

export const roi = {
  eyebrow: "ROI",
  title: "Ce qu'Helpify vous fait gagner.",
  emphasis: "gagner.",
  sub: "Toutes les hypothèses sont modifiables. Le calcul se met à jour immédiatement.",
  reveal: "Calculer mon ROI",
  revealOpen: "Replier le calcul",

  // Bloc 1 — le temps repris sur des tâches que Helpify absorbe.
  time: {
    title: "Le temps récupéré",
    inputs: [
      { key: "applications", label: "Candidatures reçues par an", value: 3000, min: 100, max: 50000, step: 100, unit: "" },
      { key: "cvMinutes", label: "Temps de lecture d'un CV", value: 3, min: 1, max: 30, step: 1, unit: " min" },
      { key: "relevantRate", label: "Taux de candidatures pertinentes", value: 30, min: 5, max: 100, step: 5, unit: " %" },
      { key: "prequalMinutes", label: "Durée d'une préqualification", value: 20, min: 5, max: 90, step: 5, unit: " min" },
      { key: "questionMinutes", label: "Réponses aux questions d'un candidat", value: 2, min: 1, max: 20, step: 1, unit: " min", note: "Hypothèse moyenne : 2 min par candidat pertinent." },
      { key: "hourlyCost", label: "Coût horaire chargé d'un recruteur", value: 45, min: 20, max: 150, step: 5, unit: " €" },
    ],
  },

  // Bloc 2 — la valeur d'un recrutement qui aboutit plus vite.
  speed: {
    title: "Accélérez vos recrutements",
    // La réduction du time-to-hire n'est plus un curseur à régler : c'est
    // l'ordre de grandeur que nous retenons, posé une fois pour toutes. Un
    // visiteur n'a aucun moyen d'estimer ce chiffre lui-même ; le lui demander
    // ne faisait que déplacer sur lui une hypothèse qui nous revient.
    cut: 15,
    // Un poste vacant coûte ce qu'il ne produit pas. Plutôt que de demander au
    // visiteur de deviner « la valeur d'une journée gagnée », on la déduit du
    // salaire — et au plus bas que le secteur admette.
    //
    // Les calculateurs de référence posent : journée = salaire annuel ×
    // multiplicateur de poste ÷ jours ouvrés, avec un multiplicateur de 1,2
    // (support, ops) à 4 (commercial). On retient 1, soit en dessous de leur
    // plancher, et on n'ajoute pas les charges patronales : pendant la vacance,
    // l'entreprise ne verse pas ce salaire. Un chiffre qu'un DRH ne peut pas
    // contester vaut mieux qu'un chiffre flatteur qu'il démonte en rendez-vous.
    valueMultiplier: 1,
    workingDays: 220,
    inputs: [
      { key: "hires", label: "Recrutements par an", value: 100, min: 1, max: 1000, step: 1, unit: "" },
      { key: "timeToHire", label: "Time-to-hire actuel", value: 30, min: 5, max: 180, step: 1, unit: " j" },
      { key: "grossSalary", label: "Salaire brut annuel moyen du poste", value: 45000, min: 20000, max: 200000, step: 1000, unit: " €" },
    ],
    note: "Réduction du time-to-hire retenue : 15 %. Une journée gagnée est valorisée au salaire brut du poste rapporté à 220 jours ouvrés, sans multiplicateur — là où les calculateurs du secteur en appliquent un de 1,2 à 4 selon le poste.",
  },

  // Le simulateur est le moment où le visiteur est le plus engagé : il vient
  // de manipuler ses propres chiffres. C'est là qu'on propose de garder le lien.
  capture: {
    title: "Recevez cette simulation par e-mail",
    sub: "Vos hypothèses et le détail du calcul, pour les partager en interne.",
    placeholder: "vous@entreprise.fr",
    submit: "Recevoir",
    sending: "Envoi…",
    sent: "C'est envoyé. Nous revenons vers vous avec le détail.",
    error: "L'envoi n'a pas abouti. Réessayez dans un instant.",
    source: "Simulateur de ROI",
  },
  summary: {
    title: "Votre valeur annuelle estimée avec Helpify",
    lines: [
      { key: "time", label: "Économies de temps" },
      { key: "speed", label: "Valeur de l'accélération des recrutements" },
    ],
    totalLabel: "Valeur annuelle estimée",
    note: "Simulation indicative basée sur les hypothèses renseignées.",
  },

  // Volontairement hors du calcul : ces bénéfices ne se convertissent pas en euros.
  candidate: {
    title: "Et l'expérience candidat ?",
    items: [
      "100 % des candidats évalués",
      "Un retour personnalisé à chaque candidat, si vous activez l'option",
      "Une expérience plus rapide et plus humaine",
    ],
  },
};

export const pricing = {
  eyebrow: "Tarifs",
  title: "Un prix adapté à votre ROI.",
  emphasis: "votre ROI.",
  sub: "Pas de licence par siège. Pas de surprise.",
  stat: 380,
  statLabel: "ROI moyen constaté",
  cta: { label: "Réservez une démo", href: links.booking },
  ctaSub: "15 min · Sans engagement",
  altLink: { label: "J'ai déjà un compte", href: links.login },
};

export const faq = {
  eyebrow: "Questions fréquentes",
  title: "Les questions qui reviennent.",
  emphasis: "reviennent.",
  items: [
    {
      q: "Ai-je vraiment besoin d'un outil de tri si je gère déjà ?",
      a: "Vous gérez les candidatures que vous lisez. Mais combien lisez-vous vraiment ? Sur 200 candidatures, à 6 secondes par candidature, ça fait 20 minutes pour passer à côté de la moitié de vos talents. Helpify ne remplace pas votre œil, il s'assure que les bons profils arrivent jusqu'à lui.",
    },
    {
      q: "Pourquoi confier cette première étape à une IA ?",
      a: "Elle ne prend le travail de personne — regardez où elle se place. Aujourd'hui, un candidat envoie un CV et, dans 95 % des cas, n'obtient aucun retour. Il n'a jamais eu l'occasion de s'expliquer, et vous n'avez de lui que des mots clés : souvent optimisés par une IA, parfois simplement mal présentés. Cette première étape est la seule du processus où personne ne parle à personne. Tout ce qui suit — l'entretien, la mise en situation — repose au contraire sur une conversation, une évaluation structurée, une écoute. Helpify met la première étape au niveau des suivantes. Vos recruteurs gardent leur métier : les critères, le jugement, la décision. Ce qui change, c'est qu'ils la rendent sur des profils qu'on a réellement écoutés, et non sur une pile de CV.",
    },
    {
      q: "Comment gérez-vous les biais de l'IA ?",
      a: "Helpify ne juge pas, ne devine pas, n'invente pas : il écoute et synthétise. Chaque conclusion est sourcée mot pour mot sur les réponses du candidat (citations textuelles incluses). Le score est justifié critère par critère. Vous gardez la décision finale, toujours.",
    },
    {
      q: "Les candidats sont-ils réfractaires à échanger avec une IA ?",
      a: "Au contraire. Aujourd'hui, la majorité des candidats n'est jamais écoutée : ils n'ont que leurs mots clés pour se présenter, et finissent dans une pile. Avec Helpify, ils ont enfin l'opportunité d'être entendus, de raconter leur parcours, leurs motivations, ce qu'aucun mot-clé ne capture. Nos premiers candidats nous disent qu'ils se sentent enfin écoutés, pas filtrés. Et vous pouvez customiser le ton de l'IA pour qu'elle ressemble à votre marque.",
    },
    {
      q: "Est-ce compatible avec notre ATS existant ?",
      a: "Helpify n'est pas un ATS. C'est le filtre intelligent qui se branche en amont de votre ATS (Bullhorn, Lever, Greenhouse, Teamtailor…). Vous gardez vos outils, on enlève le bruit. La shortlist scorée arrive directement dans votre flux habituel.",
    },
    {
      q: "Encore un outil de plus à faire adopter à mes équipes ?",
      a: "Non, et c'est justement le point : vos recruteurs ne changent pas d'outil. Helpify s'intègre à votre ATS, où sont récupérées toutes les informations nécessaires pour lancer une campagne sur un nouveau poste. Une extension Chrome permet de piloter Helpify sans quitter l'ATS, et les résultats y remontent au même endroit. Vos équipes gardent leurs habitudes : le passage par Helpify est transparent.",
    },
    {
      q: "Combien de temps pour mettre ça en place ?",
      a: "15 minutes pour la première campagne. Vous décrivez le poste, Helpify génère le flow de questions, vous validez, vous partagez le lien. Pas de set-up technique, pas d'intégration obligatoire au démarrage.",
    },
    {
      q: "Mes données et celles des candidats sont-elles protégées ?",
      a: "Hébergement européen, conforme RGPD. Les candidats sont informés et peuvent demander l'effacement à tout moment. C'est la base, on ne fait pas d'exception.",
    },
    {
      q: "Ça coûte combien ?",
      a: "Ça dépend de votre volume de campagnes et de candidats. La meilleure réponse, c'est 15 minutes de démo pour qu'on planifie ça ensemble, sans engagement.",
    },
    {
      q: "Et si on veut tester avant de s'engager ?",
      a: "Nous proposons des pilotes sur un poste réel, facturés mais avec une garantie « satisfait ou remboursé ». Vous évaluez la qualité des shortlists en conditions réelles, sans engagement durable : si le résultat n'est pas au rendez-vous, vous êtes remboursé.",
    },
  ],
};

export const contact = {
  eyebrow: "Contact",
  title: "Une question ? Parlons de vos recrutements.",
  emphasis: "vos recrutements.",
  sub: "Laissez-nous vos coordonnées, nous revenons vers vous pour y répondre.",
  // Mêmes champs que le formulaire HubSpot d'origine : seul l'e-mail est obligatoire.
  fields: {
    firstName: "Prénom",
    lastName: "Nom",
    email: "E-mail",
    phone: "Téléphone",
    message: "Votre message",
  },
  submit: "Envoyer",
  sending: "Envoi…",
  sent: {
    title: "Merci, votre demande est bien arrivée.",
    body: "Nous revenons vers vous pour y répondre.",
  },
  error: "L'envoi n'a pas abouti. Réessayez dans un instant, ou réservez directement un créneau.",
  alt: { lead: "Vous préférez en parler de vive voix ?", label: "Réservez une démo", href: links.booking },
};

export const finalCta = {
  chips: [
    "Gain de temps",
    "Évaluation au-delà du CV",
    "Ne passez plus à côté de talents",
    "Retour personnalisé",
    "Vivier enrichi",
    "Candidats écoutés",
    "Shortlist automatisée",
  ],
  title: "Rencontrez vos meilleurs candidats.",
  emphasis: "Rapidement.",
  cta: { label: "Réservez une démo", href: links.booking },
};

export const footer = {
  legal: [
    { label: "Mentions légales", href: links.mentionsLegales },
    { label: "Confidentialité", href: links.privacy },
    { label: "Notice utilisation IA", href: links.noticeIA },
    { label: "CGU", href: links.cgu },
  ],
  social: { label: "Helpify sur LinkedIn", href: links.linkedin },
  badges: ["Conforme RGPD", "Hébergement UE", "Données européennes"],
  copyright: "© 2026 Helpify",
};

/**
 * Les quelques mots d'interface qui n'appartiennent à aucune section : libellés
 * de navigation interne, repères de progression, intitulés de boutons répétés.
 * Ils vivaient en dur dans les composants, ce qui les rendait intraduisibles.
 */
export const ui = {
  backHome: "Retour à l'accueil",
  learnMore: "En savoir plus",
  step: "Étape",
  stepOf: "sur",
  firstStep: "Première étape",
  prevStep: "Étape précédente",
  nextStep: "Étape suivante",
  lastStep: "Dernière étape",
  seeInDemoBefore: "Voir ",
  seeInDemoAfter: " en démo",
  helpifyAnswer: "La réponse Helpify",
};
