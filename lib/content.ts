// Source unique de vérité pour tout le contenu texte du site.
// Principe éditorial : UNE IDÉE = UNE SCÈNE. Le visuel porte la démonstration,
// le texte ne fait que la nommer. Toute copie longue a été condensée ou supprimée.
// Contenu de référence vérifié sur helpify-ai.fr (2026-08-13) puis réduit.

import type { DemoContent } from "./demo-types";
import type { ExpertsContent } from "./expert-types";

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
  title: "Helpify — L'IA qui révèle et engage vos meilleurs talents | Recrutement",
  tagline: "L'IA qui révèle et engage vos meilleurs talents",
  description:
    "Helpify échange avec chaque candidat, restitue une évaluation structurée et vous livre une shortlist. Une IA de préqualification qui se branche sur votre ATS.",
};

export const nav = {
  // Quatre entrées seulement. Les trois premières déploient un grand panneau
  // où chaque lien porte sa phrase (voir navbar.tsx) ; tout le reste passe par
  // les Ressources ou le pied de page.
  links: [
    { label: "Produits", href: "/produits", dropdown: "products" as const },
    // On entre plus souvent par son problème que par le nom d'une brique
    // logicielle : les cas d'usage, présentés comme des solutions.
    { label: "Solutions", href: "/cas-d-usage", dropdown: "usecases" as const },
    { label: "Ressources", href: "/methodologie", dropdown: "resources" as const },
    { label: "Tarifs", href: "/#tarifs" },
  ],
  allProducts: { label: "Voir les quatre produits", href: "/produits" },
  servicesLabel: "Services",
  resources: [
    { label: "Le process", desc: "Comment Helpify mène l'entretien", href: "/#story" },
    { label: "Méthodologie", desc: "Une évaluation fondée sur les sciences du recrutement", href: "/methodologie" },
    { label: "L'équipe", desc: "Les expertises réunies autour de Helpify", href: "/equipe" },
    { label: "Pourquoi l'IA ?", desc: "Ce qu'elle change, et les questions qu'on nous pose", href: "/pourquoi-l-ia" },
    { label: "Vos données", desc: "Supervision humaine, transparence, RGPD", href: "/#donnees" },
    { label: "Questions fréquentes", desc: "Les questions qui reviennent", href: "/#faq" },
    { label: "Notice IA", desc: "Comment Helpify utilise l'IA, et vos droits", href: links.noticeIA },
    { label: "Contact", desc: "Une question ? Parlons de vos recrutements", href: links.contact },
  ],
  candidat: { label: "Espace candidat", href: "/candidats" },
  connexion: { label: "Connexion", href: links.login },
  cta: { label: "Réservez une démo", href: links.booking },
};

export const hero = {
  title: "L'intelligence qui révèle et engage vos meilleurs talents.",
  // Deux accents seulement : l'intelligence en orange, les meilleurs talents en violet
  // (la voix du candidat). `title` reste la phrase entière, pour les
  // lecteurs d'écran.
  segments: [
    { texte: "L'intelligence", ton: "warm" },
    { texte: "qui révèle et engage vos" },
    { texte: "meilleurs talents.", ton: "iris" },
  ] as { texte: string; ton?: "warm" | "iris" }[],
  subtitle:
    "Une conversation qui comprend votre entreprise, échange avec chaque candidat et vous aide à recruter plus vite et mieux.",
  cta: { label: "Réservez une démo", href: links.booking },
  scrollHint: "Faites défiler",
};

/**
 * La démonstration sous le titre : un échange entre Helpify et un candidat, joué
 * d'un bout à l'autre. Le ton est le sujet — Helpify parle comme un recruteur
 * sympa, pas comme un questionnaire, et le candidat peut poser ses questions.
 * Noms et chiffres sont inventés, et la page le dit.
 */
export const demo: DemoContent = {
  eyebrow: "Côté candidat",
  title: "Une conversation pour vous et vos candidats.",
  emphasis: "vos candidats.",
  sub: "Marc dépose son CV et son LinkedIn. Helpify les lit, puis lui parle comme le ferait un recruteur sympa.",
  fiction: "Échange fictif, à titre d'illustration.",
  header: { name: "Helpify", role: "Candidature · Responsable grands comptes" },
  candidate: {
    name: "Marc",
    initial: "M",
    cv: "Marc_Lefebvre_CV.pdf",
    cvSize: "184 Ko",
    linkedin: "linkedin.com/in/marc-lefebvre",
  },
  analysis: {
    reading: "Helpify lit votre profil…",
    done: "Profil analysé",
    points: ["8 ans en vente grands comptes", "SaaS B2B", "12 comptes stratégiques"],
  },
  notice: { label: "En savoir plus sur le traitement de ma candidature", href: links.noticeIA },
  controls: { pause: "Pause", play: "Lire", replay: "Revoir" },
  steps: [
    {
      type: "message",
      from: "helpify",
      text: "Bonjour **Marc**, je suis **Helpify**.\nJe suis là pour que nos recruteurs voient vraiment qui vous êtes, au-delà du CV, et pour vous présenter le poste afin que vous voyiez s'il vous correspond.\nVotre candidature sera toujours analysée par un recruteur.",
    },
    { type: "profile" },
    { type: "analysis" },
    {
      type: "message",
      from: "helpify",
      text: "Merci pour votre CV et votre LinkedIn, **Marc**.\nJ'ai vu que vous aviez géré des comptes stratégiques chez **Nordis**. Comment cela s'est passé, concrètement, pour les développer ?\nN'hésitez pas si vous avez aussi des questions sur notre poste.",
    },
    {
      type: "message",
      from: "candidate",
      text: "Merci ! En effet, j'avais 12 comptes.\nJ'ai mis en place un point trimestriel avec chaque direction pour détecter les upsells éventuels et assurer le suivi : +35 % de revenus en 18 mois.\nEt chez vous, que proposez-vous pour le développement de vos collaborateurs ?",
    },
    {
      type: "message",
      from: "helpify",
      text: "Bonne question ! Chez nous, c'est essentiel : chacun a son budget formation (formations, outils d'IA avancés, conférences, salons).\nAvez-vous déjà eu une situation avec un compte clé menacé de partir ? Qu'avez-vous pu mettre en place ?",
    },
    {
      type: "message",
      from: "candidate",
      text: "Par exemple, j'appelle le sponsor sous 48 heures pour comprendre la raison.\nJe monte un success plan et je reviens avec des engagements chiffrés.\nEt chez vous, comment ça se passe pour le télétravail ?",
    },
    {
      type: "message",
      from: "helpify",
      text: "Merci **Marc**, c'est très clair.\nCôté télétravail, nous proposons deux jours par semaine, que vous fixez en autonomie.\nSi vous avez d'autres questions, je suis là.",
    },
  ],
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
    title: "Vous validez le cadrage du poste",
    sub: "Les critères et leur importance.",
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
    title: "Helpify est diffusé sur vos canaux",
    sub: "Ceux que vous choisissez.",
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

/**
 * Les experts qui challengent la réflexion de l'équipe.
 *
 * Les fonctions et les descriptifs sont ceux fournis par l'entreprise, repris
 * tels quels : c'est la façon dont ces personnes sont présentées, on ne la
 * reformule pas.
 */
export const experts: ExpertsContent = {
  title: "Les experts qui nous entourent.",
  emphasis: "qui nous entourent.",
  intro:
    "Le soutien et l'expertise de profils expérimentés pour challenger notre réflexion sur les enjeux RH, business et technologiques.",
  logosLabel: "Nos experts exercent chez",
  items: [
    {
      name: "Brice Monnier",
      role: "DRH chez L'Oréal Innovation",
      logo: "loreal",
      body: "Apporte un regard stratégique sur les enjeux RH au sein de grands groupes, l'évolution des organisations et les problématiques liées au développement des talents.",
    },
    {
      name: "Florent Gbelidji",
      role: "Engineering Lead IA chez Reflection AI",
      logo: "reflection",
      body: "Apporte une expertise de pointe en ingénierie des modèles d'IA, avec un regard exigeant sur leur fiabilité, leur robustesse et leur maîtrise.",
    },
    {
      name: "Rome Lambert",
      role: "RRH & recruteuse indépendante",
      body: "Apporte une vision terrain des problématiques RH opérationnelles, avec une approche de proximité au plus près des réalités des entreprises.",
    },
  ],
};

export const synthesis = {
  eyebrow: "Résultats mesurés",
  title: "Quatre bénéfices, un seul process.",
  emphasis: "un seul process.",
  sub: "Le temps gagné, vos recruteurs le consacrent aux entretiens et à ce qui fait vraiment avancer votre activité.",
  items: [
    { n: "01", title: "Gain de temps", value: "−90", unit: "%", label: "de temps jusqu'à la shortlist", steps: "Étapes 03 & 08" },
    { n: "02", title: "Expérience candidat", value: "4,8", unit: "/5", label: "note moyenne des candidats", steps: "Étapes 04 & 10" },
    { n: "03", title: "Évaluation", value: "3", unit: "×", label: "plus de signaux qualifiés : les réalisations et leur contexte", steps: "Étapes 01 & 07" },
    { n: "04", title: "Vivier", value: "100", unit: "%", label: "des candidats avec un profil riche, pas seulement un CV", steps: "Étapes 05 & 07" },
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
  title: "Huit situations. Dans laquelle vous reconnaissez-vous ?",
  emphasis: "Dans laquelle vous reconnaissez-vous ?",
  intro:
    "Le recrutement ne bloque pas au même endroit selon les équipes. Partez de votre situation : voici ce qu'Helpify y change, concrètement.",
  menuLink: "Voir les huit cas d'usage",

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
        "Helpify transforme les informations recueillies pendant la conversation en un profil unifié et structuré, basé sur les critères importants pour le poste.",
      ],
      benefits: [
        "Profil candidat standardisé",
        "Informations structurées",
        "Lecture plus rapide",
        "Comparaison facilitée",
        "Mise en avant des informations pertinentes pour le poste",
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
      tone: "iris" as const,
    },
    {
      id: "experience-candidat",
      menu: "Améliorer l'expérience candidat",
      promise: "Donnez à chaque candidat la possibilité de s'exprimer",
      problem: "Je veux que mes candidats aient réellement l'occasion de s'exprimer.",
      answer: [
        "Aujourd'hui, seuls quelques candidats sont appelés par les recruteurs et ont l'occasion d'exprimer qui ils sont. Offrez cette occasion à tous vos candidats.",
        "Chaque candidat peut avoir une véritable conversation autour de son parcours, de son expérience et de ses attentes.",
        "Il peut expliquer qui il est, apporter du contexte à son parcours et poser ses propres questions. Il peut également recevoir un retour personnalisé, si vous activez l'option.",
      ],
      keyMessage: "Montrez une entreprise tournée vers ses candidats, qui s'intéresse à chacun d'eux.",
      tone: "iris" as const,
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
      tone: "iris" as const,
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
      tone: "iris" as const,
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
  verbs: ["Matcher", "Préqualifier", "Révéler les synergies", "Engager les candidats"],
  outro: "Une seule plateforme pour mieux comprendre vos talents et accélérer vos recrutements.",

  items: [
    {
      id: "matching",
      name: "Matching",
      headline: "Identifiez mieux les profils qui correspondent réellement au besoin",
      // La méthode, dite en un mot, au-dessus du texte : c'est un entretien.
      tag: "Entretien structuré, fondé sur les sciences du recrutement",
      body: "Helpify évalue chaque candidat selon vos critères, au cours d'un entretien structuré qui va chercher des preuves concrètes au-delà de ce que révèle un CV.",
      visual: "score" as const,
      tone: "accent" as const,
    },
    {
      id: "prequalification",
      name: "Préqualification",
      headline: "Préqualifiez 100 % de vos candidats",
      body: "Helpify échange avec chaque candidat et collecte automatiquement les informations essentielles à votre recrutement, sans un seul appel de préqualification.",
      visual: "chat-extract" as const,
      tone: "accent" as const,
    },
    {
      id: "360-matching",
      name: "360 Matching",
      headline: "Maximisez vos chances de trouver le bon candidat",
      body: "Chaque candidat est rapproché de toutes vos offres ouvertes auxquelles il peut correspondre, pas seulement de celle à laquelle il a postulé.",
      visual: "constellation" as const,
      tone: "accent" as const,
    },
    {
      id: "talent-ask",
      name: "Talent Ask",
      headline: "Engagez vos candidats et répondez à leurs questions, 24h/24",
      tag: "Des informations claires, pour que plus de candidats postulent",
      body: "Sans informations claires, beaucoup de candidats renoncent à postuler. Le poste, l'équipe, les conditions, la suite du processus : avec Talent Ask, chacun obtient ses réponses et peut se projeter. Et comme beaucoup de candidats cherchent et postulent en dehors des heures de bureau, Talent Ask leur répond à toute heure. Les questions qu'ils posent vous remontent : elles deviennent des insights pour mieux communiquer à l'externe et attirer les talents.",
      // Seul produit tourné vers le candidat : il porte donc l'orange, comme
      // partout ailleurs sur le site.
      visual: "ask" as const,
      tone: "iris" as const,
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
  heads: { products: "Produits", solutions: "Solutions", resources: "Ressources", company: "Entreprise", legal: "Légal" },
  allUseCases: "Tous les cas d'usage",
  address: "59 rue de Ponthieu, 75008 Paris",
  email: "contact@helpify-ai.fr",
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
 * Vos données : ce que la plateforme fait des candidatures, et ce qu'elle ne
 * fait pas. Chaque phrase reprend un engagement écrit dans la notice IA, la
 * politique de confidentialité ou les CGU du site : rien n'est promis ici qui
 * n'y figure pas déjà.
 */
/**
 * Helpify branché sur votre entreprise : trois temps, et le schéma qui les
 * illustre. Les étapes reprennent celles du process ; les blocs du schéma,
 * les sources, canaux et garde-fous déjà cités sur le site.
 */
/**
 * La bande qui défile : ce que font les équipes qui travaillent avec Helpify.
 * Chaque ligne reprend une promesse déjà faite ailleurs sur le site (produits,
 * cas d'usage, bénéfices).
 */
export const defile = {
  lead: "Les recruteurs qui",
  lignes: [
    "préqualifient sans appels de préqualification.",
    "évaluent chaque candidat au-delà du CV.",
    "ne passent plus à côté d'un talent.",
    "répondent aux candidats, 24h/24.",
    "enrichissent leur vivier à chaque conversation.",
    "appliquent les mêmes critères à tous.",
    "reçoivent leur shortlist automatiquement.",
  ],
  cta: { label: "Voir les produits", href: "/produits" },
};

/**
 * La méthode, en cinq temps : comment Helpify mène l'entretien, des critères
 * de l'offre jusqu'à l'analyse remise aux RH. Les exemples de l'illustration
 * (comportements observables, questions, relance) sont là pour montrer le
 * mécanisme ; ils reprennent le poste et les réponses de Sarah K. du site.
 */
/**
 * L'espace candidat : une page pour les candidats, en préparation. Le candidat
 * échange avec Helpify sur son parcours, en tire un profil qui le distingue
 * au-delà du CV, et le partage quand il postule ; le recruteur y ajoute sa
 * fiche de poste pour voir la correspondance. En attendant l'ouverture, une
 * liste d'attente.
 */
export const espaceCandidat = {
  eyebrow: "Espace candidat",
  badge: "Bientôt disponible",
  title: "Montrez qui vous êtes, au-delà de votre CV.",
  emphasis: "au-delà de votre CV.",
  intro: "Échangez avec Helpify sur votre parcours. Il fait ressortir ce que votre CV ne dit pas, et vous le partagez quand vous postulez.",
  etapesTitre: "Comment ça marchera.",
  etapes: [
    {
      titre: "Vous échangez avec Helpify",
      texte: "Un vrai entretien, à l'écrit ou à l'oral : des questions sur votre parcours, vos réalisations et leur contexte, ce que vous cherchez.",
    },
    {
      titre: "Votre profil prend forme",
      texte: "Helpify en tire un profil clair : ce que vous avez réellement fait, ce que vous savez faire, ce qui vous motive. De quoi vous démarquer bien au-delà d'un CV.",
    },
    {
      titre: "Vous le partagez quand vous postulez",
      texte: "Un lien à joindre à votre candidature, à côté de votre CV.",
    },
    {
      titre: "Le recruteur voit la correspondance",
      texte: "Il ajoute sa fiche de poste et voit en quoi votre profil y répond, critère par critère.",
    },
  ],
  apercu: {
    profil: "Profil",
    realisations: "Réalisations",
    realisation: "A monté un service client de zéro : process, recrutement de trois personnes, suivi de satisfaction.",
    competences: "Compétences",
    fiche: "Fiche de poste ajoutée",
    correspondance: "Correspondance",
  },
  attente: {
    titre: "Soyez parmi les premiers.",
    texte: "Inscrivez-vous : on vous prévient dès que l'espace candidat ouvre.",
    prenom: "Prénom",
    email: "E-mail",
    metier: "Métier ou poste recherché (facultatif)",
    bouton: "Rejoindre la liste d'attente",
    envoi: "Envoi…",
    mention: "En vous inscrivant, vous acceptez qu'Helpify vous écrive au sujet de l'espace candidat. Vos données ne servent qu'à cela.",
    confidentialite: { label: "Politique de confidentialité", href: links.privacy },
    ok: "C'est noté. On vous prévient dès que l'espace candidat ouvre.",
    erreur: "L'inscription n'a pas pu être envoyée. Réessayez dans un instant.",
    source: "Liste d'attente · Espace candidat",
  },
};

/**
 * L'équipe : les expertises réunies autour de Helpify, en quatre groupes. Les
 * fondateurs d'abord (relation client et produit, technique et sécurité),
 * puis les experts qui les accompagnent.
 */
export const equipe = {
  eyebrow: "L'équipe",
  title: "Les expertises réunies autour de Helpify.",
  emphasis: "autour de Helpify.",
  groupes: [
    {
      titre: "Relation client & produit",
      membres: [
        {
          nom: "Hugo Chellaoua",
          initiales: "HC",
          photo: "/equipe/hugo.jpg",
          role: "CEO",
          points: ["Porte la vision produit et la relation client", "En lien direct avec les enjeux des équipes recrutement"],
        },
      ],
    },
    {
      titre: "Technique & sécurité",
      membres: [
        {
          nom: "Mounir Zaghba",
          initiales: "MZ",
          role: "CTO",
          points: ["Garant de l'architecture, de la fiabilité et de la sécurité de la plateforme"],
        },
      ],
    },
    {
      titre: "Experts métier",
      membres: [
        {
          nom: "Brice Monnier",
          initiales: "BM",
          photo: "/equipe/brice-monnier.jpg",
          role: "DRH chez L'Oréal Innovation",
          logo: "loreal" as const,
          points: ["Apporte la vision des grands groupes sur les enjeux RH, la transformation et l'innovation"],
        },
        {
          nom: "Rome Lambert",
          initiales: "RL",
          photo: "/equipe/rome.jpg",
          role: "RRH & recruteuse indépendante",
          points: ["Le regard terrain du recrutement : sourcing, qualification et expérience candidat"],
        },
      ],
    },
    {
      titre: "Expert IA",
      membres: [
        {
          nom: "Florent Gbelidji",
          initiales: "FG",
          photo: "/equipe/florent.jpg",
          role: "Engineering Lead IA chez Reflection AI",
          logo: "reflection" as const,
          points: ["Contribue à la fiabilité de l'IA, du questionnement et de la restitution"],
        },
      ],
    },
  ] as { titre: string; membres: { nom: string; initiales: string; photo?: string; role: string; logo?: "loreal" | "reflection"; points: string[]; experience?: string }[] }[],
  cta: { titre: "Parlons de vos recrutements.", label: "Réservez une démo", href: links.booking },
};

/**
 * La page « Pourquoi utiliser l'IA dans le recrutement ? » : le constat, ce
 * que Helpify change des deux côtés, puis les objections qu'on nous oppose le
 * plus souvent. Les réponses reprennent les engagements du site (notice IA,
 * FAQ, cas d'usage).
 */
export const pourquoiIA = {
  eyebrow: "Ressources",
  title: "Pourquoi utiliser l'IA dans le recrutement ?",
  emphasis: "dans le recrutement ?",
  intro: "Ce que l'IA change pour vos candidats et pour vos recruteurs, et les questions qu'on nous pose le plus souvent.",
  constat: {
    titre: "Aujourd'hui, la plupart des candidats ne sont jamais écoutés.",
    texte: [
      "Un candidat envoie un CV et, dans 95 % des cas, n'obtient aucun retour. Il n'a pas d'espace pour expliquer qui il est, ni personne pour lui présenter le poste.",
      "De l'autre côté, vos recruteurs n'ont pas le temps d'appeler chaque candidat. Ils lisent des mots-clés, souvent optimisés par une IA, et passent à côté de profils qu'ils n'ont jamais entendus.",
    ],
    points: [
      "Le silence après une candidature est l'une des expériences que les candidats vivent le plus mal.",
      "Quand le parcours est long ou opaque, beaucoup abandonnent leur candidature en cours de route.",
    ],
  },
  attentes: {
    titre: "Ce que veulent les candidats.",
    items: [
      { attente: "Comprendre avant de postuler", reponse: "Talent Ask répond à leurs questions sur le poste, l'équipe et les conditions, à toute heure." },
      { attente: "Être écoutés, pas seulement lus", reponse: "Chaque candidat a un vrai échange autour de son parcours." },
      { attente: "Savoir ce que fait l'IA", reponse: "Helpify se présente comme une IA, s'appuie sur les critères du poste, et la décision revient à un recruteur." },
      { attente: "Que le temps gagné serve le contact humain", reponse: "Vos recruteurs consacrent le temps gagné aux entretiens." },
    ],
  },
  change: {
    titre: "Ce que Helpify change, des deux côtés.",
    colonnes: [
      {
        titre: "Pour vos candidats",
        points: [
          "Un vrai échange autour de leur parcours, pas seulement un CV.",
          "Des réponses à leurs questions sur le poste et l'entreprise, à toute heure.",
          "La certitude que la décision revient à un recruteur.",
        ],
      },
      {
        titre: "Pour vos recruteurs",
        points: [
          "Le temps gagné revient aux entretiens et à la décision.",
          "Chaque candidat évalué selon les mêmes critères, preuves à l'appui.",
          "Des profils réellement écoutés, et plus seulement des mots-clés.",
        ],
      },
    ],
  },
  objections: {
    titre: "Les questions qu'on nous pose.",
    items: [
      {
        q: "L'IA va-t-elle décider à la place de mes recruteurs ?",
        a: "Non. Aucune décision d'embauche, de rejet ou de classement définitif n'est prise automatiquement. Helpify prépare l'évaluation ; vos recruteurs gardent les critères, le jugement et la décision.",
      },
      {
        q: "Les candidats acceptent-ils d'échanger avec une IA ?",
        a: "Oui, surtout quand on leur explique. Un premier échange écrit ou vocal avant l'entretien est bien accepté quand les critères sont clairs et qu'un recruteur garde la décision. C'est exactement ce que fait Helpify : il se présente comme une IA, s'appuie sur les critères du poste, et rappelle que la décision revient à un recruteur.",
      },
      {
        q: "Comment évitez-vous les biais ?",
        a: "Les mêmes critères pour tous, définis pour le poste. Chaque conclusion est sourcée sur les réponses du candidat, et le score est justifié critère par critère. Vous gardez la décision finale.",
      },
      {
        q: "Et les CV rédigés avec l'IA ?",
        a: "De plus en plus de candidats utilisent l'IA pour préparer leurs candidatures. La conversation va chercher des éléments concrets : ce que le candidat a réellement fait, dans quel contexte, avec quels résultats.",
      },
      {
        q: "Que deviennent les données des candidats ?",
        a: "Elles sont conservées dans l'espace sécurisé de la plateforme, accessibles selon les droits que vous définissez, et jusqu'à 24 mois pour les candidats non retenus. Chaque candidat peut exercer ses droits RGPD.",
      },
      {
        q: "Faut-il changer d'outils ?",
        a: "Non. Helpify n'est pas un ATS : il se branche sur le vôtre, et les résultats remontent là où vos équipes travaillent déjà.",
      },
    ],
  },
  cta: { titre: "Voyez-le sur un de vos postes.", label: "Réservez une démo", href: links.booking },
};

export const methode = {
  title: "Comment Helpify mène l'entretien.",
  emphasis: "mène l'entretien.",
  etapes: [
    {
      titre: "Les critères du poste",
      texte: "Helpify extrait les critères de votre offre, leur importance et les comportements observables qui permettent de les évaluer.",
    },
    {
      titre: "Les questions d'entretien",
      texte: "À partir de ces critères, Helpify construit les questions de l'entretien.",
    },
    {
      titre: "Le CV du candidat",
      texte: "Quand le candidat dépose son CV, Helpify adapte les questions à son parcours et aux critères du poste, pour comprendre ce qui les relie.",
    },
    {
      titre: "Un vrai échange",
      texte: "Les questions s'ajustent à chaque réponse pour creuser, comme le ferait un recruteur en entretien.",
    },
    {
      titre: "L'analyse, critère par critère",
      texte: "Helpify restitue son analyse selon vos critères. Vos RH décident.",
    },
  ],
  cta: { label: "Réservez une démo", href: links.booking },
  demo: {
    offre: "Offre",
    observable: "Comportement observable",
    observables: [
      "A suivi des comptes clients stratégiques",
      "A mis en place des process et une équipe",
      "Échange professionnel en anglais",
      "A travaillé chez un éditeur SaaS",
    ],
    questions: "Questions de l'entretien",
    exemples: [
      "Racontez-moi comment vous avez monté un service client.",
      "Quel client grand compte avez-vous accompagné, et comment ?",
      "Pouvez-vous présenter un de vos projets en anglais ?",
    ],
    cv: "CV.pdf",
    adaptee: "Question adaptée au CV",
    relance: "Relance",
    relanceTexte: "Comment avez-vous choisi les trois personnes recrutées ?",
    analyse: "Analyse",
    valider: "À valider par vous",
  },
  cumul: {
    title: "Les quatre produits sont cumulables.",
    texte: "Ils reposent sur le même entretien : activez-en un, ou les quatre.",
  },
};

export const donnees = {
  eyebrow: "Vos données",
  title: "Une IA qui assiste, jamais qui décide.",
  emphasis: "jamais qui décide.",
  intro: "Ce que la plateforme fait des candidatures, et ce qu'elle ne fait pas.",
  items: [
    {
      title: "Supervision humaine",
      body: "Aucune décision d'embauche, de rejet ou de classement définitif n'est prise automatiquement. La décision finale appartient à votre entreprise.",
    },
    {
      title: "Transparence pour le candidat",
      body: "Le candidat sait qu'il échange avec une intelligence artificielle, et reçoit les informations sur son utilisation avant le début des échanges.",
    },
    {
      title: "Accès maîtrisé",
      body: "Les échanges sont stockés dans l'espace sécurisé de la plateforme, accessibles uniquement selon les droits que vous définissez.",
    },
    {
      title: "Conservation limitée",
      body: "Les données des candidats non retenus sont conservées jusqu'à 24 mois après le dernier contact, sauf suppression anticipée.",
    },
    {
      title: "Droits RGPD",
      body: "Accès, rectification, effacement, limitation, opposition, portabilité : chaque candidat peut exercer ses droits.",
    },
  ],
  links: [
    { label: "Lire la notice IA", href: links.noticeIA },
    { label: "Politique de confidentialité", href: links.privacy },
  ],
};

/**
 * Le bandeau de consentement. Refuser doit être aussi simple qu'accepter : les
 * deux boutons ont le même poids. Le texte nomme la finalité, la mesure
 * d'audience, et renvoie à la politique de confidentialité pour le détail
 * (outil, durée, droits).
 */
export const cookies = {
  title: "Cookies",
  text: "Nous utilisons des cookies pour mesurer l'audience de ce site et l'améliorer. Vous pouvez les accepter ou les refuser : cela ne change rien à votre navigation.",
  privacy: { label: "En savoir plus", href: links.privacy },
  accept: "Accepter",
  refuse: "Refuser",
  settings: "Gérer les cookies",
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
  discover: "Découvrir",
  seeInDemoBefore: "Voir ",
  seeInDemoAfter: " en démo",
  helpifyAnswer: "La réponse Helpify",
};
