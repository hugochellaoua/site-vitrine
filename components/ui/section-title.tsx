import type { ReactNode } from "react";

/**
 * Titre de section, dont la part décisive passe en orange.
 *
 * L'orange n'est pas distribué au hasard : il tombe toujours sur ce que la
 * section promet — le résultat, ou ce qui touche au talent. Le lecteur qui
 * ne parcourt que les mots orange doit y trouver l'argumentaire entier.
 */
export function SectionTitle({
  title,
  emphasis,
  className = "",
  as: Tag = "h2",
  encadre = false,
}: {
  title: string;
  emphasis?: string;
  className?: string;
  /** `h1` quand le titre est celui de la page entière, et non d'une section. */
  as?: "h1" | "h2";
  /** Le titre entier en blanc, dans un bloc noir qui épouse le texte. */
  encadre?: boolean;
}) {
  const base =
    "mx-auto max-w-[24ch] text-balance font-display text-[clamp(30px,4.2vw,52px)] font-normal leading-[1.04] tracking-[-0.04em] text-ink";

  if (encadre) {
    return (
      <Tag className={`${base} ${className}`}>
        <span className="inline-block rounded-[6px] bg-[#121214] px-[0.45em] pb-[0.24em] pt-[0.18em] text-white [box-decoration-break:clone]">
          {title}
        </span>
      </Tag>
    );
  }

  if (!emphasis || !title.endsWith(emphasis)) {
    return <Tag className={`${base} ${className}`}>{title}</Tag>;
  }

  const lead = title.slice(0, title.length - emphasis.length);
  return (
    <Tag className={`${base} ${className}`}>
      {lead}
      <span className="text-faint">{emphasis}</span>
    </Tag>
  );
}

/**
 * Pastille de chapitre — reprise telle quelle du produit : un point coloré,
 * le mot en capitales espacées, sur une surface translucide.
 *
 * La teinte répond à une question, et à une seule : de quoi la section parle.
 * `accent`, du produit ; `warm`, du candidat ; `iris`, de la méthode — ce que
 * Helpify fait de ce que le candidat a dit.
 */
const TEINTES_BADGE = {
  accent: {
    cadre: "border-accent/35 bg-accent-soft text-accent-light",
    point: "bg-accent-light",
    halo: "rgba(91,129,255,.9)",
  },
  warm: {
    cadre: "border-warm/35 bg-warm-soft text-warm-light",
    point: "bg-warm",
    halo: "rgba(255,160,70,.9)",
  },
  iris: {
    cadre: "border-iris/35 bg-iris-soft text-iris-light",
    point: "bg-iris",
    halo: "rgba(172,152,255,.9)",
  },
} as const;

export function Badge({
  children,
  tone = "accent",
}: {
  children: ReactNode;
  tone?: keyof typeof TEINTES_BADGE;
}) {
  // La teinte ne colore plus que le petit carré : l'étiquette reste sobre.
  const t = TEINTES_BADGE[tone];
  return (
    // Une étiquette en chasse fixe, sans pastille : un petit carré, puis le mot.
    <span className="inline-flex items-center gap-2 font-mono text-[11.5px] font-medium uppercase tracking-[0.08em] text-faint">
      <span className={`h-1.5 w-1.5 shrink-0 ${t.point}`} />
      {children}
    </span>
  );
}
