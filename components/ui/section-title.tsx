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
}: {
  title: string;
  emphasis?: string;
  className?: string;
  /** `h1` quand le titre est celui de la page entière, et non d'une section. */
  as?: "h1" | "h2";
}) {
  const base =
    "mx-auto max-w-[20ch] text-balance font-display text-[clamp(26px,3.7vw,44px)] font-bold leading-[1.06] tracking-[-0.03em] text-ink";

  if (!emphasis || !title.endsWith(emphasis)) {
    return <Tag className={`${base} ${className}`}>{title}</Tag>;
  }

  const lead = title.slice(0, title.length - emphasis.length);
  return (
    <Tag className={`${base} ${className}`}>
      {lead}
      <span className="text-warm">{emphasis}</span>
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
  const t = TEINTES_BADGE[tone];
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-[10.5px] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm ${t.cadre}`}
    >
      <span
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${t.point}`}
        style={{ boxShadow: `0 0 10px 1px ${t.halo}` }}
      />
      {children}
    </span>
  );
}
