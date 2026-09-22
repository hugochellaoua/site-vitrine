// Source unique de vérité pour tout le contenu texte du site.
// Principe éditorial : UNE IDÉE = UNE SCÈNE. Le visuel porte la démonstration,
// le texte ne fait que la nommer. Toute copie longue a été condensée ou supprimée.
// Contenu de référence vérifié sur helpify-ai.fr (2026-08-13) puis réduit.

export const links = {
  booking: "https://calendar.app.google/kAfRpMQoheceUQZY8",
  contact: "/contact",
  login: "/login",
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
    { label: "Produits", href: "/produits" },
    { label: "Le process", href: "/#story" },
    { label: "Intégrations", href: "/#integrations" },
    { label: "Services", href: "/#services" },
    { label: "Tarifs", href: "/#tarifs" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: links.contact },
  ],
  connexion: { label: "Connexion", href: links.login },
  cta: { label: "Réserver une démo", href: links.booking },
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
  sub: "9 étapes. Voici exactement ce qui se passe.",
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
    sub: "Compétences clés, contexte d'équipe, critères, deal-breakers.",
    role: "Customer Success Manager",
    roleLabel: "Poste à pourvoir",
    fields: ["Compétences clés", "Contexte d'équipe", "Critères", "Deal-breakers"],
    status: "Campagne prête",
  },
  {
    key: "diffusion",
    n: "03",
    title: "Vous diffusez un lien unique",
    sub: "Le même point d'entrée sur tous vos canaux.",
    link: "helpify.io/c/8f3a2",
    channels: ["LinkedIn", "Job boards", "Site carrière", "Cooptation", "Email", "Sourcing"],
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
      { value: 42, label: "profils pertinents" },
      { value: 10, label: "profils shortlistés" },
    ],
  },
  {
    key: "reponse",
    n: "09",
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
    { n: "02", title: "Expérience candidat", value: "4,8", unit: "/5", label: "note moyenne des candidats", steps: "Étapes 04 & 09" },
    { n: "03", title: "Évaluation", value: "3", unit: "×", label: "plus de signaux qualifiés", steps: "Étapes 01 & 07" },
  ],
};

// ─────────────────────────────────────────────────────────────
// PREUVE SOCIALE
//
// Les citations ci-dessous sont des EMPLACEMENTS, pas des témoignages.
// Elles ne s'affichent qu'en développement (voir components/testimonials.tsx)
// et ne partiront jamais en production tant qu'elles n'auront pas été
// remplacées par de vrais propos, recueillis avec l'accord de leur auteur.
//
// Publier de faux avis est une pratique commerciale trompeuse au sens du Code
// de la consommation : le risque juridique est réel, et la crédibilité perdue
// auprès d'un DRH ne se rattrape pas.
// ─────────────────────────────────────────────────────────────
export const testimonials = {
  eyebrow: "Ils utilisent Helpify",
  title: "Ce qu'en disent les recruteurs.",
  emphasis: "les recruteurs.",
  placeholderWarning:
    "Emplacements d'exemple, visibles uniquement en local. Remplacez-les par de vraies citations avant la mise en ligne.",
  items: [
    {
      quote: "Citation exacte du client, telle qu'il l'a formulée. Une phrase concrète et chiffrée convainc davantage qu'un superlatif.",
      name: "Prénom Nom",
      role: "Directeur ou directrice des talents",
      company: "Nom de l'entreprise",
    },
    {
      quote: "Deuxième citation. L'idéal est qu'elle traite d'une objection : le temps de mise en place, ou la réaction des candidats.",
      name: "Prénom Nom",
      role: "DRH",
      company: "Nom de l'ESN",
    },
    {
      quote: "Troisième citation. Celle-ci peut porter un résultat mesuré, à condition de pouvoir le justifier.",
      name: "Prénom Nom",
      role: "Responsable recrutement",
      company: "Nom du cabinet",
    },
  ],
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
      body: "Un candidat qui ne correspond pas à un poste peut être parfaitement adapté à un autre. 360 Matching identifie ces synergies dans l'ensemble de votre vivier.",
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
      messages: [
        { from: "helpify", text: "Racontez-moi comment vous avez monté un service client." },
        { from: "candidate", text: "J'étais seule au départ. J'ai écrit les process, recruté trois personnes, puis mis en place un suivi de satisfaction." },
      ],
      extracted: ["Expérience", "Compétences", "Motivations", "Soft skills", "Disponibilité"],
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
  items: [
    {
      n: "01",
      title: "Marque blanche",
      line: "Helpify déployé aux couleurs de votre cabinet : logo, ton, charte.",
    },
    {
      n: "02",
      title: "Accompagnement sur mesure",
      line: "Un chef de projet dédié anime des ateliers avec vos équipes pour cadrer vos campagnes et vos process.",
    },
  ],
};

export const roi = {
  eyebrow: "ROI",
  title: "Ce que Helpify vous fait gagner.",
  emphasis: "gagner.",
  sub: "Toutes les hypothèses sont modifiables. Le calcul se met à jour immédiatement.",

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
    inputs: [
      { key: "hires", label: "Recrutements par an", value: 100, min: 1, max: 1000, step: 1, unit: "" },
      { key: "timeToHire", label: "Time-to-hire actuel", value: 30, min: 5, max: 180, step: 1, unit: " j" },
      { key: "timeToHireCut", label: "Réduction estimée du time-to-hire", value: 15, min: 0, max: 60, step: 5, unit: " %" },
      { key: "dayValue", label: "Valeur d'une journée gagnée", value: 100, min: 0, max: 1000, step: 50, unit: " €", note: "Hypothèse prudente de valeur économique d'une journée de recrutement gagnée." },
    ],
  },

  // Bloc 3 — le coût évité sur les recrutements qui échouent.
  quality: {
    title: "Améliorez la qualité de vos recrutements",
    inputs: [
      { key: "badHireRate", label: "Taux de recrutements inadéquats", value: 10, min: 0, max: 50, step: 1, unit: " %" },
      { key: "badHireCost", label: "Coût d'un recrutement inadéquat", value: 10000, min: 1000, max: 100000, step: 1000, unit: " €" },
      { key: "badHireCut", label: "Réduction estimée grâce à Helpify", value: 10, min: 0, max: 50, step: 5, unit: " %" },
    ],
    note: "Estimation prudente basée sur des hypothèses modifiables.",
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
      { key: "quality", label: "Valeur potentielle d'une meilleure qualité de recrutement" },
    ],
    totalLabel: "Valeur annuelle estimée",
    note: "Simulation indicative basée sur les hypothèses renseignées.",
  },

  // Volontairement hors du calcul : ces bénéfices ne se convertissent pas en euros.
  candidate: {
    title: "Et l'expérience candidat ?",
    items: [
      "100 % des candidats évalués",
      "100 % reçoivent un retour personnalisé",
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
  cta: { label: "Réserver ma démo", href: links.booking },
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
      a: "Vous gérez les candidatures que vous lisez. Mais combien lisez-vous vraiment ? Sur 200 candidatures, à 6 secondes par mot clé, ça fait 20 minutes pour passer à côté de la moitié de vos talents. Helpify ne remplace pas votre œil, il s'assure que les bons profils arrivent jusqu'à lui.",
    },
    {
      q: "Comment gérez-vous les biais de l'IA ?",
      a: "Helpify ne juge pas, ne devine pas, n'invente pas : elle écoute et synthétise. Chaque conclusion est sourcée mot pour mot sur les réponses du candidat (citations textuelles incluses). Le score est justifié critère par critère. Vous gardez la décision finale, toujours.",
    },
    {
      q: "Les candidats sont-ils réfractaires à échanger avec une IA ?",
      a: "Au contraire. Aujourd'hui, la majorité des candidats n'est jamais écoutée : ils n'ont que leurs mots clés pour se présenter, et finissent dans une pile. Avec Helpify, ils ont enfin l'opportunité d'être entendus, de raconter leur parcours, leurs motivations, ce qu'aucun mot-clé ne capture. Nos premiers candidats nous disent qu'ils se sentent enfin écoutés, pas filtrés. Et vous pouvez customiser le ton de l'IA pour qu'elle ressemble à votre marque.",
    },
    {
      q: "Est-ce compatible avec notre ATS existant ?",
      a: "Helpify n'est pas un ATS. C'est le filtre intelligent qui se branche AVANT votre ATS (Bullhorn, Lever, Greenhouse, Teamtailor…). Vous gardez vos outils, on enlève le bruit. La shortlist scorée arrive directement dans votre flux habituel.",
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
      a: "Ça dépend de votre volume de campagnes et de candidats. La meilleure réponse, c'est 15 minutes de démo pour qu'on cale ça ensemble, sans engagement.",
    },
    {
      q: "Et si on veut tester avant de s'engager ?",
      a: "Nous proposons des pilotes sur un poste réel, facturés mais avec une garantie « satisfait ou remboursé ». Vous évaluez la qualité des shortlists en conditions réelles, sans engagement durable, si le résultat n'est pas au rendez-vous, vous êtes remboursé.",
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
