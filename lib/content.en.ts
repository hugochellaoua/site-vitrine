// English mirror of content.ts. Same export names, same shapes, same technical
// keys — only the prose changes. Anything that is not prose (input keys, visual
// names, step keys) must stay identical: the components match on them.

export const links = {
  booking: "https://calendar.app.google/kAfRpMQoheceUQZY8",
  contact: "/en/contact",
  login: "https://app.helpify-ai.fr/",
  mentionsLegales: "/en/legal-notice",
  privacy: "/en/privacy-policy",
  noticeIA: "/en/ai-notice",
  cgu: "/en/terms",
  linkedin: "https://www.linkedin.com/company/helpify-ia",
};

export const learnMore = { label: "Learn more", href: links.contact };

export const site = {
  name: "Helpify",
  title: "Helpify — The AI that prequalifies your candidates | Recruiting",
  tagline: "The AI that prequalifies your candidates",
  description:
    "Helpify talks to every candidate, returns a structured assessment and hands you a shortlist. Prequalification AI that plugs into your ATS.",
};

export const nav = {
  links: [
    { label: "Products", href: "/en/products", dropdown: "products" as const },
    { label: "Use cases", href: "/en/use-cases", dropdown: "usecases" as const },
    { label: "The process", href: "/en#story", dropdown: "process" as const },
    { label: "Services", href: "/en#services", dropdown: "services" as const },
    { label: "Pricing", href: "/en#tarifs" },
    { label: "FAQ", href: "/en#faq" },
    { label: "Contact", href: links.contact },
  ],
  connexion: { label: "Log in", href: links.login },
  cta: { label: "Book a demo", href: links.booking },
};

export const hero = {
  title: "Meet your best candidates.",
  emphasis: "Faster.",
  subtitle:
    "A conversation that understands your company, talks to every candidate, and helps you hire faster and better.",
  cta: { label: "Book a demo", href: links.booking },
  scrollHint: "Scroll",
};

export const processIntro = {
  eyebrow: "The process",
  title: "From your brief to the shortlist.",
  emphasis: "the shortlist.",
  sub: "10 steps. Here is exactly what happens.",
  reveal: "Discover the process",
  revealOpen: "Collapse the process",
};

export const processSteps = [
  {
    key: "entreprise",
    n: "01",
    title: "Helpify learns your company",
    sub: "ATS, CRM, documents, job posts, conversations with your teams.",
    sources: ["ATS", "CRM", "Documents", "Job posts", "Colleagues", "Your teams"],
    center: "Helpify",
  },
  {
    key: "besoin",
    n: "02",
    title: "You frame the role",
    sub: "You define the criteria and how much each one matters.",
    role: "Customer Success Manager",
    roleLabel: "Open role",
    fieldsLabel: "Criteria and weight",
    fields: [
      { label: "Enterprise client relationships", weight: "Essential" },
      { label: "Building a function from scratch", weight: "Essential" },
      { label: "Fluent English", weight: "Important" },
      { label: "SaaS experience", weight: "Bonus" },
    ],
    status: "Campaign ready",
  },
  {
    key: "diffusion",
    n: "03",
    title: "You share a single link",
    sub: "The same entry point across every channel.",
    link: "helpify-ai.fr/72401",
    channels: ["LinkedIn", "Job boards", "Careers site", "Email", "Sourcing"],
  },
  {
    key: "questions",
    n: "04",
    title: "The candidate asks their questions",
    sub: "The role, the team, expectations, what happens next.",
    messages: [
      { from: "candidate", text: "What's the context behind this role?" },
      { from: "helpify", text: "The support team doubles this year. You'd be structuring the client relationship." },
      { from: "candidate", text: "What are the next steps?" },
      { from: "helpify", text: "An interview with the manager, then a practical exercise." },
    ],
  },
  {
    key: "reponses",
    n: "05",
    title: "Helpify interviews the candidate",
    sub: "Their answers become structured data.",
    messages: [
      { from: "helpify", text: "Tell me about a time you built a customer service function." },
      {
        from: "candidate",
        text: "I was on my own at the start. I wrote the processes, hired three people, then set up satisfaction tracking.",
      },
    ],
    extracted: ["Experience", "Skills", "Motivations", "Soft skills", "Availability"],
  },
  {
    key: "always",
    n: "06",
    title: "The conversation happens at any hour",
    sub: "Without you having to be available.",
    times: ["09:12", "14:37", "23:48", "03:17"],
  },
  {
    key: "evaluation",
    n: "07",
    title: "Helpify assesses every profile",
    sub: "A score justified criterion by criterion, sourced in their own answers.",
    candidate: "Sarah K.",
    score: 92,
    rows: [
      { label: "Fit for the role", value: "Strong" },
      { label: "Key skills", value: "Structuring, retention" },
      { label: "Strengths", value: "Built customer service from zero" },
      { label: "Watch point", value: "Available in 3 months" },
    ],
  },
  {
    key: "shortlist",
    n: "08",
    title: "You receive the shortlist",
    sub: "200 candidates assessed, 10 profiles worth calling.",
    funnel: [
      { value: 200, label: "candidates" },
      { value: 200, label: "conversations analysed" },
      { value: 60, label: "relevant profiles" },
      { value: 10, label: "shortlisted profiles" },
    ],
  },
  {
    key: "decision",
    n: "09",
    title: "Your HR team decides",
    sub: "Better informed: the decision rests on an assessment made against the criteria set for the role.",
    from: "Helpify assessment",
    basis: ["Key skills", "Team context", "Deal-breakers"],
    owner: "Your HR team",
    verdict: "Decision",
  },
  {
    key: "reponse",
    n: "10",
    title: "Every candidate gets an answer",
    sub: "Written from their own conversation.",
    decisions: ["Move forward", "Decline"],
    email: {
      greeting: "Hello Sarah,",
      lead: "Our conversation showed us that:",
      points: [
        "you built a customer service function from zero, on your own;",
        "you wrote its processes before hiring three people;",
        "you put satisfaction tracking in place.",
      ],
      closing: "That is exactly what we are looking for in this role.",
    },
  },
] as const;

export const processOutro = {
  cta: { label: "Start my first campaign", href: links.booking },
  sub: "15 min, on one of your real roles.",
};

export const synthesis = {
  eyebrow: "Measured results",
  title: "Three benefits, one process.",
  emphasis: "one process.",
  items: [
    { n: "01", title: "Time saved", value: "−90", unit: "%", label: "less time to shortlist", steps: "Steps 03 & 08" },
    { n: "02", title: "Candidate experience", value: "4.8", unit: "/5", label: "average candidate rating", steps: "Steps 04 & 10" },
    { n: "03", title: "Assessment", value: "3", unit: "×", label: "more qualified signals", steps: "Steps 01 & 07" },
  ],
};

export const methodology = {
  eyebrow: "Our methodology",
  title: "An assessment methodology grounded in recruitment science",
  emphasis: "recruitment science",
  intro: [
    "Helpify does not simply ask questions.",
    "Every conversation is built around **precise assessment criteria**, then analysed from concrete, observable elements in the answers.",
  ],

  steps: [
    {
      n: "01",
      title: "Define the criteria",
      body: [
        "From the job description and the hiring context, Helpify identifies and suggests **criteria specific to the role**.",
        "No generic competencies: criteria must be **observable and assessable through concrete situations**.",
        "The recruiter then sets how much each one matters:",
      ],
      weights: ["Essential", "Important", "Bonus"],
    },
    {
      n: "02",
      title: "Build the questions",
      body: [
        "From the criteria retained, Helpify generates questions that explore the candidate's real experience: situations lived, actions taken, decisions made and results achieved.",
        "The conversation draws in particular on principles from the **STAR and reverse STAR** methods.",
      ],
    },
    {
      n: "03",
      title: "Assess the answers",
      body: [
        "Answers are analysed against the criteria defined and how much each one matters.",
        "Helpify looks for **observable, contextualised elements** rather than plain claims or keywords.",
      ],
    },
  ],

  chain: {
    title: "An assessment built end to end",
    steps: ["Precise criteria", "Fitting questions", "Observable elements", "Assessment"],
    lead: "The CV is the starting point.",
    punch: "The conversation goes after what a CV cannot show.",
  },

  cta: {
    title: "See the method applied to one of your roles.",
    emphasis: "one of your roles.",
    sub: "15 min: you describe the role, we walk the method through in front of you.",
  },
};

export const useCases = {
  eyebrow: "Use cases",
  title: "Nine situations. Which one is yours?",
  emphasis: "Which one is yours?",
  intro:
    "Hiring does not break down in the same place for every team. Start from your own situation: here is what Helpify changes about it, concretely.",
  menuLink: "See the nine use cases",

  items: [
    {
      id: "volume",
      menu: "High volume",
      promise: "Save time whatever the number of candidates",
      problem: "I handle a high volume of applications and I don't have time to review them all.",
      answer: [
        "Helpify automates the first round of review and prequalification. Every candidate can be interviewed and assessed against the criteria set for the role, so recruiters can focus on the profiles that genuinely need them.",
      ],
      benefits: [
        "Time saved on screening and prequalification",
        "Capacity to handle high volumes",
        "A consistent first assessment for every candidate",
        "More time for the high-value stages",
      ],
      tone: "accent" as const,
    },
    {
      id: "standardise-my-process",
      menu: "Standardise my process",
      promise: "The same criteria for everyone",
      problem: "I want every candidate assessed the same way.",
      answer: [
        "Assessment criteria are defined upfront and form the basis of every conversation. Each candidate is therefore assessed within the same frame, whoever the recruiter is.",
      ],
      keyMessage: "The same criteria for everyone.",
      tone: "accent" as const,
    },
    {
      id: "read-candidates-better",
      menu: "Read candidates better",
      promise: "One unified, structured profile",
      problem: "Information is scattered and I need a simpler way to read profiles.",
      answer: [
        "Helpify turns what the conversation surfaces into a unified, structured profile, built on the criteria that matter for the role.",
      ],
      benefits: [
        "A standardised candidate profile",
        "Structured information",
        "Faster reading",
        "Easier comparison",
        "The information relevant to the role brought forward",
      ],
      tone: "accent" as const,
    },
    {
      id: "assess-skills",
      menu: "Assess skills",
      promise: "Go beyond claimed skills",
      problem:
        "I don't just want to know what a candidate says they can do. I want to be able to assess their skills.",
      answer: [
        "Helpify does not stop at collecting information. The conversation is built around the assessment criteria defined for the role, and goes after concrete evidence of experience, skills and situations the candidate has actually lived.",
      ],
      keyMessage: "Stop reading claimed skills. Assess them.",
      tone: "accent" as const,
    },
    {
      id: "ai-polished-cvs",
      menu: "AI-polished CVs",
      promise: "Go and check what sits behind the CV",
      problem:
        "Candidates use AI to polish their CV. How do I know what is really behind the document?",
      answer: [
        "The CV is no longer the only source. Helpify adds a conversation with the candidate to go beyond the document.",
        "Questions are built from the assessment criteria for the role and from a structured recruitment methodology. The candidate has to bring concrete evidence about their experience and their track record.",
      ],
      nuance:
        "The conversation does not make gaming impossible. It limits artificially polished answers and holds claims up against concrete evidence.",
      tone: "accent" as const,
    },
    {
      id: "never-miss-a-talent",
      menu: "Never miss a talent",
      promise: "100% of candidates heard and assessed",
      problem:
        "I don't want to rule out a good candidate simply because their CV doesn't match exactly what I'm looking for.",
      answer: [
        "With Helpify, 100% of candidates are heard, listened to and assessed against the criteria set for the role.",
        "The decision no longer rests on the few lines visible on a CV.",
      ],
      keyMessage: "100% of candidates are heard, listened to and assessed.",
      tone: "warm" as const,
    },
    {
      id: "candidate-experience",
      menu: "Improve candidate experience",
      promise: "Give every candidate room to speak",
      problem: "I want my candidates to genuinely have a chance to express themselves.",
      answer: [
        "Every candidate can have a real conversation about their background, their experience and what they are looking for.",
        "They can explain who they are, add context to their track record and ask their own questions. They can also receive personalised feedback, if you turn the option on.",
      ],
      keyMessage: "Give every candidate room to speak.",
      tone: "warm" as const,
    },
    {
      id: "non-linear-profiles",
      menu: "Understand non-linear profiles",
      promise: "Assess talent beyond a linear career path",
      problem:
        "Some profiles don't fit the usual CV boxes, yet they could be right for the role.",
      answer: [
        "The conversation goes further than a linear reading of a career.",
        "It shows what the candidate actually did, in what context, with what responsibilities and what skills — so their fit for the role can be assessed beyond job titles and conventional paths.",
      ],
      keyMessage: "Understand the talent behind the track record.",
      tone: "warm" as const,
    },
    {
      id: "enrich-the-talent-pool",
      menu: "Enrich the talent pool",
      promise: "A richer, more usable talent pool",
      problem: "I want to know my talent pool better so I can make more of it over time.",
      answer: [
        "Every conversation gradually enriches what is known about candidates: their experience, their skills, their areas of expertise, the contexts they have worked in and what they are looking for.",
        "Your talent pool becomes richer and more usable, with more qualified information to find the right profiles when a new need comes up.",
        "Over time, this data helps identify candidates likely to fit future needs and match them to the right opportunities.",
      ],
      benefits: [
        "Richer knowledge of the candidates already in the pool",
        "More qualified information on each profile",
        "A pool that grows with every interaction",
        "A better chance of finding the right profiles for future needs",
        "More value drawn from the talent already in your pool",
      ],
      keyMessage: "A richer, more usable talent pool.",
      tone: "warm" as const,
    },
  ],

  cta: {
    title: "Your situation isn't on the list?",
    emphasis: "isn't on the list?",
    sub: "Tell us about your process: we'll show you in 15 min what Helpify changes about it.",
  },
};

export const products = {
  eyebrow: "Our products",
  title: "Four products. One conversation.",
  emphasis: "One conversation.",
  intro: [
    "Helpify turns the conversation with candidates into a genuine recruiting tool.",
    "From the first question to identifying the best profiles, our four products plug into your ATS and fit the process you already have.",
  ],
  verbs: ["Prequalify", "Match", "Surface synergies", "Answer candidates"],
  outro: "One platform to understand your talent better and move your hiring faster.",

  items: [
    {
      id: "prequalification",
      name: "Prequalification",
      headline: "The key information, without the prequalification calls",
      body: "Helpify talks to every candidate to collect automatically the information your hiring depends on.",
      visual: "chat-extract" as const,
      tone: "accent" as const,
    },
    {
      id: "matching",
      name: "Matching",
      headline: "Identify the profiles that genuinely fit the need",
      body: "Helpify analyses profiles against your criteria and uses the conversation to go beyond what a CV shows.",
      visual: "score" as const,
      tone: "accent" as const,
    },
    {
      id: "360-matching",
      name: "360 Matching",
      headline: "Stop losing a talent to a single application",
      body: "A candidate who doesn't fit one role may be exactly right for another. 360 Matching surfaces those synergies across all your open roles.",
      visual: "constellation" as const,
      tone: "accent" as const,
    },
    {
      id: "talent-ask",
      name: "Talent Ask",
      headline: "Answer candidates, around the clock",
      body: "Talent Ask lets candidates ask their questions about your company, your roles and your environment, right inside their hiring journey.",
      visual: "ask" as const,
      tone: "warm" as const,
    },
  ],

  demo: {
    prequal: {
      messages: [
        { from: "helpify", text: "How soon would you be available?" },
        { from: "candidate", text: "In three months." },
      ],
      extracted: ["Availability", "Mobility", "Qualifications", "Languages"],
    },
    score: {
      candidate: "Sarah K.",
      value: 92,
      rows: [
        { label: "Fit for the role", value: "Strong" },
        { label: "Key skills", value: "Structuring, retention" },
        { label: "Strengths", value: "Built customer service from zero" },
        { label: "Watch point", value: "Available in 3 months" },
      ],
    },
    synergies: {
      center: "Sarah K.",
      roles: ["Customer Success Manager", "Account Manager", "Support Lead", "Project Manager", "Solutions Consultant", "Account Executive"],
    },
    ask: {
      messages: [
        { from: "candidate", text: "What's the context behind this role?" },
        { from: "helpify", text: "The support team doubles this year. You'd be structuring the client relationship." },
        { from: "candidate", text: "What are the next steps?" },
        { from: "helpify", text: "An interview with the manager, then a practical exercise." },
      ],
      hours: ["09:12", "14:37", "23:48", "03:17"],
    },
  },

  home: {
    eyebrow: "Our products",
    title: "Four products. One conversation.",
    emphasis: "One conversation.",
    link: "Explore the four products",
  },

  cta: {
    title: "See the four products on real conditions.",
    emphasis: "on real conditions.",
    sub: "15 min on one of your roles, with your criteria.",
  },
};

export const integrations = {
  eyebrow: "Integrations",
  title: "Helpify plugs into your stack. Not the other way round.",
  emphasis: "Not the other way round.",
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
  note: "And more",
};

export const services = {
  eyebrow: "Additional services",
  title: "What else we do.",
  emphasis: "else we do.",
  items: [
    {
      id: "white-label",
      n: "01",
      title: "White label",
      line: "Helpify deployed in your company's colours: logo, tone, brand guidelines.",
      body: [
        "Your candidates talk to your brand, not ours. Logo, colours and typography are yours, from the first message through to the report.",
        "That matters for a search firm or a consultancy, whose business is the candidate relationship: it has to stay in their name.",
      ],
    },
    {
      id: "tailored-support",
      n: "02",
      title: "Tailored support",
      line: "A dedicated project lead frames the project with your teams: goals, expected ROI, integration with your tools.",
      body: [
        "A dedicated project lead works with your teams, not alongside them.",
        "Workshops first, to frame the project: the goals, the ROI you expect and the integration with your tools. That is where we decide what should happen — and what must not change.",
        "The point is not to make you adopt a new way of working. It is that everything runs without friction on your side, that your teams keep their habits, and that the business impact is clear before anything starts.",
        "Then regular check-ins, to adjust what needs adjusting as your hiring moves along.",
      ],
    },
  ],
  reveal: "Learn more",
  revealOpen: "Collapse",
};

export const roi = {
  eyebrow: "ROI",
  title: "What Helpify gains you.",
  emphasis: "gains you.",
  sub: "Every assumption can be changed. The calculation updates immediately.",
  reveal: "Calculate my ROI",
  revealOpen: "Collapse the calculation",

  time: {
    title: "Time recovered",
    inputs: [
      { key: "applications", label: "Applications received per year", value: 3000, min: 100, max: 50000, step: 100, unit: "" },
      { key: "cvMinutes", label: "Time to read one CV", value: 3, min: 1, max: 30, step: 1, unit: " min" },
      { key: "relevantRate", label: "Share of relevant applications", value: 30, min: 5, max: 100, step: 5, unit: " %" },
      { key: "prequalMinutes", label: "Length of one prequalification", value: 20, min: 5, max: 90, step: 5, unit: " min" },
      { key: "questionMinutes", label: "Answering one candidate's questions", value: 2, min: 1, max: 20, step: 1, unit: " min", note: "Average assumption: 2 min per relevant candidate." },
      { key: "hourlyCost", label: "Fully loaded hourly cost of a recruiter", value: 45, min: 20, max: 150, step: 5, unit: " €" },
    ],
  },

  speed: {
    title: "Hire faster",
    cut: 15,
    valueMultiplier: 1,
    workingDays: 220,
    inputs: [
      { key: "hires", label: "Hires per year", value: 100, min: 1, max: 1000, step: 1, unit: "" },
      { key: "timeToHire", label: "Current time-to-hire", value: 30, min: 5, max: 180, step: 1, unit: " d" },
      { key: "grossSalary", label: "Average gross annual salary for the role", value: 45000, min: 20000, max: 200000, step: 1000, unit: " €" },
    ],
    note: "Time-to-hire reduction used: 15%. A day gained is valued at the role's gross salary over 220 working days, with no multiplier — where industry calculators apply one of 1.2 to 4 depending on the role.",
  },

  capture: {
    title: "Get this simulation by email",
    sub: "Your assumptions and the detail of the calculation, to share internally.",
    placeholder: "you@company.com",
    submit: "Send it",
    sending: "Sending…",
    sent: "On its way. We'll come back to you with the detail.",
    error: "That didn't go through. Try again in a moment.",
    source: "ROI simulator",
  },
  summary: {
    title: "Your estimated annual value with Helpify",
    lines: [
      { key: "time", label: "Time savings" },
      { key: "speed", label: "Value of faster hiring" },
    ],
    totalLabel: "Estimated annual value",
    note: "Indicative simulation based on the assumptions entered.",
  },

  candidate: {
    title: "And the candidate experience?",
    items: [
      "100% of candidates assessed",
      "Personalised feedback for every candidate, if you turn the option on",
      "A faster, more human experience",
    ],
  },
};

export const pricing = {
  eyebrow: "Pricing",
  title: "A price that follows your ROI.",
  emphasis: "your ROI.",
  sub: "No per-seat licence. No surprises.",
  stat: 380,
  statLabel: "average ROI observed",
  cta: { label: "Book a demo", href: links.booking },
  ctaSub: "15 min · No commitment",
  altLink: { label: "I already have an account", href: links.login },
};

export const faq = {
  eyebrow: "Frequently asked",
  title: "The questions that keep coming up.",
  emphasis: "keep coming up.",
  items: [
    {
      q: "Do I really need a screening tool if I'm coping already?",
      a: "You cope with the applications you read. But how many do you really read? Across 200 applications, at 6 seconds each, that's 20 minutes spent missing half your talent. Helpify doesn't replace your eye — it makes sure the right profiles reach it.",
    },
    {
      q: "Why hand this first stage to an AI?",
      a: "It takes nobody's job — look at where it sits. Today a candidate sends a CV and, in 95% of cases, hears nothing back. They never had a chance to explain themselves, and all you have of them is keywords: often polished by an AI, sometimes simply badly presented. This first stage is the only one in the process where nobody talks to anybody. Everything that follows — the interview, the practical exercise — rests instead on a conversation, a structured assessment, on listening. Helpify brings the first stage up to the level of the ones after it. Your recruiters keep their craft: the criteria, the judgement, the decision. What changes is that they exercise it on profiles someone actually listened to, rather than on a pile of CVs.",
    },
    {
      q: "How do you handle AI bias?",
      a: "Helpify doesn't judge, doesn't guess, doesn't invent: it listens and summarises. Every conclusion is sourced word for word in the candidate's answers, quotations included. The score is justified criterion by criterion. You keep the final decision, always.",
    },
    {
      q: "Are candidates reluctant to talk to an AI?",
      a: "Quite the opposite. Today most candidates are never heard: all they have is keywords to introduce themselves, and they end up in a pile. With Helpify they finally get the chance to be listened to, to tell their story and their motivations — everything no keyword captures. Our first candidates tell us they feel heard rather than filtered. And you can customise the AI's tone so it sounds like your brand.",
    },
    {
      q: "Does it work with our existing ATS?",
      a: "Helpify is not an ATS. It's the intelligent filter that sits upstream of yours (Bullhorn, Lever, Greenhouse, Teamtailor…). You keep your tools, we remove the noise. The scored shortlist lands straight in your usual flow.",
    },
    {
      q: "Yet another tool for my teams to adopt?",
      a: "No, and that's precisely the point: your recruiters don't change tools. Helpify integrates with your ATS, where everything needed to launch a campaign on a new role is picked up. A Chrome extension lets you drive Helpify without leaving the ATS, and the results come back to the same place. Your teams keep their habits: Helpify runs in the background.",
    },
    {
      q: "How long does it take to set up?",
      a: "15 minutes for the first campaign. You describe the role, Helpify generates the question flow, you approve it, you share the link. No technical set-up, no mandatory integration to get started.",
    },
    {
      q: "Is my data and my candidates' data protected?",
      a: "European hosting, GDPR compliant. Candidates are informed and can request erasure at any time. That's the baseline, and we make no exceptions.",
    },
    {
      q: "How much does it cost?",
      a: "It depends on your volume of campaigns and candidates. The best answer is 15 minutes of demo so we can work it out together, with no commitment.",
    },
    {
      q: "What if we want to test before committing?",
      a: "We run pilots on a real role, paid but with a money-back guarantee. You judge the quality of the shortlists in real conditions, with no long-term commitment: if the result isn't there, you're refunded.",
    },
  ],
};

export const contact = {
  eyebrow: "Contact",
  title: "A question? Let's talk about your hiring.",
  emphasis: "your hiring.",
  sub: "Leave us your details and we'll come back to you with an answer.",
  fields: {
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone",
    message: "Your message",
  },
  submit: "Send",
  sending: "Sending…",
  sent: {
    title: "Thank you — your message has reached us.",
    body: "We'll come back to you with an answer.",
  },
  error: "That didn't go through. Try again in a moment, or book a slot directly.",
  alt: { lead: "Would you rather talk it through?", label: "Book a demo", href: links.booking },
};

export const finalCta = {
  chips: [
    "Time saved",
    "Assessment beyond the CV",
    "No talent missed",
    "Personalised feedback",
    "Richer talent pool",
    "Candidates heard",
    "Automated shortlist",
  ],
  title: "Meet your best candidates.",
  emphasis: "Faster.",
  cta: { label: "Book a demo", href: links.booking },
};

export const footer = {
  legal: [
    { label: "Legal notice", href: links.mentionsLegales },
    { label: "Privacy", href: links.privacy },
    { label: "AI usage notice", href: links.noticeIA },
    { label: "Terms", href: links.cgu },
  ],
  social: { label: "Helpify on LinkedIn", href: links.linkedin },
  badges: ["GDPR compliant", "EU hosting", "European data"],
  copyright: "© 2026 Helpify",
};

/** Interface words that belong to no section — see the French file. */
export const ui = {
  backHome: "Back to home",
  learnMore: "Learn more",
  step: "Step",
  stepOf: "of",
  firstStep: "First step",
  prevStep: "Previous step",
  nextStep: "Next step",
  lastStep: "Last step",
  seeInDemoBefore: "See ",
  seeInDemoAfter: " in a demo",
  helpifyAnswer: "The Helpify answer",
};
