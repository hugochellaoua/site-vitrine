"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Magnetic } from "@/components/ui/magnetic";
import {
  ArrowRight,
  Calculator,
  ChevronDown,
  CircleHelp,
  FileText,
  FlaskConical,
  Handshake,
  Mail,
  Menu,
  MessageCircleQuestion,
  MessagesSquare,
  Palette,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Target,
  Users,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import { LogoLockup } from "@/components/logo-mark";
import { dict, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { LanguageSwitch } from "@/components/ui/language-switch";

/**
 * Contenu des sous-menus, pour une langue donnée.
 *
 * Il est dérivé des sections du site plutôt que ressaisi : ajouter un produit
 * ou un service le fait apparaître dans le menu sans autre intervention, et les
 * libellés ne peuvent pas diverger de ceux des pages. Le calcul dépend de la
 * langue, il ne peut donc plus se faire au chargement du module.
 */
type Entree = { label: string; href: string; desc?: string; tone?: "warm" | "ink"; icon?: LucideIcon };

/** Une icône par produit, par service et par ressource, repérés par leur identifiant. */
const ICONES: Record<string, LucideIcon> = {
  matching: Target,
  prequalification: MessagesSquare,
  "talent-ask": MessageCircleQuestion,
  "marque-blanche": Palette,
  accompagnement: Handshake,
  process: Workflow,
  methode: FlaskConical,
  equipe: Users,
  ia: Sparkles,
  roi: Calculator,
  benefices: TrendingUp,
  donnees: ShieldCheck,
  faq: CircleHelp,
  notice: FileText,
  contact: Mail,
};
type Panneau = {
  items: Entree[];
  /** Un second groupe, sous un intitulé, dans le même panneau. */
  extra?: { title: string; items: Entree[] };
  all?: { label: string; href: string };
  /** Décalage du panneau vers la gauche, pour qu'il ne sorte pas de l'écran. */
  align: string;
  /** Faux : l'entrée ne déplie rien dans le menu mobile. */
  mobile?: boolean;
};

function submenus(locale: Locale): Record<"products" | "usecases" | "resources", Panneau> {
  const { products, services, useCases, nav } = dict(locale);
  const p = (path: string) => (locale === "fr" ? path : `/en${path === "/" ? "" : path}`);
  const produits = locale === "fr" ? "/produits" : "/en/products";
  const cas = locale === "fr" ? "/cas-d-usage" : "/en/use-cases";

  return {
    // Les produits, chacun avec sa promesse, puis les services : tout ce que
    // l'on achète, au même endroit.
    products: {
      align: "-left-24",
      items: products.items.map((x) => ({ label: x.name, desc: x.headline, href: `${produits}#${x.id}`, tone: "warm" as const, icon: ICONES[x.id] })),
      extra: {
        title: nav.servicesLabel,
        items: services.items.map((x) => ({ label: x.title, desc: x.line, href: p(`/#${x.id}`), icon: ICONES[x.id] })),
      },
      all: nav.allProducts,
    },
    /**
     * Les cas d'usage s'affichent problème → réponse. Un menu qui n'énumérerait
     * que « Volume important » ou « Profils atypiques » obligerait à cliquer
     * pour comprendre ; la promesse sous chaque libellé fait tout le travail.
     */
    usecases: {
      align: "-left-40",
      // Pas de sous-menu sur mobile : huit intitulés y rendraient la liste
      // interminable, alors que l'entrée mène déjà à la page qui les présente.
      mobile: false,
      items: useCases.items.map((u) => ({ label: u.menu, desc: u.promise, href: `${cas}#${u.id}` })),
      all: { label: useCases.menuLink, href: cas },
    },
    resources: {
      align: "-left-64",
      items: nav.resources.map(({ icone, ...r }) => ({ ...r, icon: ICONES[icone] })),
    },
  };
}

type Submenus = ReturnType<typeof submenus>;

/** L'icône d'une entrée, dans un petit carré. */
function Icone({ icon: I }: { icon: LucideIcon }) {
  return (
    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-chip text-ink transition-colors group-hover:bg-ink group-hover:text-void" aria-hidden="true">
      <I size={16} strokeWidth={1.6} />
    </span>
  );
}

/** Une entrée d'un panneau : son icône, son nom, puis sa phrase. */
function Lien({ item, fermer }: { item: Entree; fermer: () => void }) {
  return (
    <li>
      <Link href={item.href} onClick={fermer} className="group flex h-full gap-3 rounded-xl px-3.5 py-2.5 transition-colors hover:bg-ink/[0.045]">
        {item.icon && <Icone icon={item.icon} />}
        <span className="min-w-0">
        <span
          className={cn(
            "block font-display text-[14.5px] font-bold tracking-[-0.01em]",
            // L'orange est réservé aux noms de produits.
            item.tone === "warm" ? "text-warm" : "text-ink",
          )}
        >
          {item.label}
        </span>
        {item.desc && <span className="mt-0.5 block text-[12.5px] leading-snug text-muted">{item.desc}</span>}
        </span>
      </Link>
    </li>
  );
}

/**
 * Sous-menu déployé au survol d'une entrée du menu principal.
 *
 * L'ouverture est pilotée plutôt que confiée au seul `:hover` du CSS, pour une
 * raison précise : après un clic sur une entrée, le pointeur reste au-dessus du
 * panneau, qui resterait donc ouvert et masquerait la section vers laquelle on
 * vient de sauter. Ici, le clic referme.
 *
 * L'ouverture au clavier est conservée : le panneau s'affiche dès que le lien
 * déclencheur reçoit le focus, ce qui rend ses liens atteignables à la
 * tabulation. `Échap` referme, comme on l'attend d'un menu.
 */
function DropdownMenu({
  label,
  href,
  menu,
  sous,
}: {
  label: string;
  href: string;
  menu: keyof Submenus;
  sous: Submenus;
}) {
  const { items, extra, all, align } = sous[menu];
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        // Le focus quitte vraiment le menu, et ne se déplace pas simplement
        // d'un de ses liens à l'autre.
        if (!ref.current?.contains(e.relatedTarget as Node | null))
          setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <Link
        href={href}
        aria-expanded={open}
        onClick={() => setOpen(false)}
        className={cn(
          "relative flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-ink",
          open && "text-ink",
        )}
      >
        {label}
        <ChevronDown
          size={13}
          className={cn(
            "transition-transform duration-300",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </Link>

      {/* Le remplissage haut sert de pont : sans lui, le survol se perdrait
          dans l'espace entre le lien et le panneau, qui se refermerait. */}
      <div
        data-open={open}
        className={cn("dropdown absolute top-full z-10 pt-3", align)}
      >
        <div className="glass-panel glass-panel--solid dropdown-panel w-[min(640px,calc(100vw-2rem))] rounded-2xl p-2.5">
          <ul className="grid grid-cols-2 gap-x-1.5 gap-y-0.5">
            {items.map((item) => (
              <Lien key={item.href + item.label} item={item} fermer={() => setOpen(false)} />
            ))}
          </ul>
          {extra && (
            <>
              <p className="mt-2 border-t border-hairline px-3.5 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">
                {extra.title}
              </p>
              <ul className="grid grid-cols-2 gap-x-1.5 gap-y-0.5">
                {extra.items.map((item) => (
                  <Lien key={item.href + item.label} item={item} fermer={() => setOpen(false)} />
                ))}
              </ul>
            </>
          )}
          {all && (
            <div className="mt-2 border-t border-hairline pt-1.5">
              <Link
                href={all.href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-center gap-1.5 rounded-xl px-3.5 py-2.5 text-[13.5px] font-semibold text-accent-light transition-colors hover:bg-ink/[0.045]"
              >
                {all.label}
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Navbar({ locale }: { locale: Locale }) {
  const { nav } = dict(locale);
  const sous = submenus(locale);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [deplieMobile, setDeplieMobile] = useState<string | null>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="navbar-enter fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
      <nav
        className={cn(
          "glass-panel flex w-full max-w-[1180px] items-center justify-between gap-4 rounded-[6px] transition-[padding,background-color,box-shadow] duration-300 ease-out",
          // Au scroll, la barre bascule sur un fond quasi opaque : voir
          // `.glass-panel--solid` dans globals.css.
          scrolled ? "glass-panel--solid px-3 py-2" : "px-4 py-2.5",
        )}
      >
        <Link href="/#top" className="flex items-center px-2">
          <LogoLockup />
        </Link>

        <div className="hidden items-center gap-6 text-[13.5px] text-muted lg:flex">
          {nav.links.map((link) =>
            link.dropdown ? (
              <DropdownMenu
                key={link.href}
                label={link.label}
                href={link.href}
                menu={link.dropdown}
                sous={sous}
              />
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="relative whitespace-nowrap transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ),
          )}
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          {/* L'application vit sur son propre sous-domaine : ce lien quitte le
              site, d'où une ancre simple plutôt qu'un lien de navigation
              interne, dont le préchargement n'aurait rien à précharger. */}
          <Link href={nav.candidat.href} className="whitespace-nowrap text-[13.5px] text-muted transition-colors hover:text-ink">
            {nav.candidat.label}
          </Link>
          <a
            href={nav.connexion.href}
            className="whitespace-nowrap text-[13.5px] text-muted transition-colors hover:text-ink"
          >
            {nav.connexion.label}
          </a>
          <LanguageSwitch locale={locale} />
          <Magnetic radius={80} strength={0.24}>
            <Link
              href={nav.cta.href}
              className="inline-block whitespace-nowrap rounded-[4px] bg-accent px-5 py-2.5 text-[13.5px] font-semibold text-white transition-shadow duration-300"
            >
              {nav.cta.label}
            </Link>
          </Magnetic>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le menu"
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink lg:hidden"
        >
          <Menu size={20} />
        </button>
      </nav>

      <div
        data-open={open}
        className="mobile-menu fixed inset-0 z-[60] flex flex-col bg-void lg:hidden"
      >
        <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
          <LogoLockup />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fermer le menu"
            className="flex h-10 w-10 items-center justify-center rounded-[4px] border border-hairline text-ink"
          >
            <X size={20} />
          </button>
        </div>
        {/* Sur mobile, chaque entrée se déplie sur place : les produits, les
            solutions et les ressources s'affichent en liste, chacun avec sa
            phrase, comme dans les panneaux de la version ordinateur. */}
        <div className="flex-1 overflow-y-auto px-5">
          <ul>
            {nav.links.map((link) => {
              const sm = link.dropdown ? sous[link.dropdown] : null;
              const deplie = deplieMobile === link.href;
              return (
                <li key={link.href} className="border-b border-hairline">
                  {sm ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setDeplieMobile(deplie ? null : link.href)}
                        aria-expanded={deplie}
                        className="flex w-full items-center justify-between py-5 text-left font-display text-[24px] tracking-[-0.03em] text-ink"
                      >
                        {link.label}
                        <ChevronDown size={20} className={cn("text-faint transition-transform duration-300", deplie && "rotate-180")} />
                      </button>
                      {deplie && (
                        <ul className="flex flex-col gap-1 pb-5">
                          {[...sm.items, ...(sm.extra?.items ?? [])].map((item) => (
                            <li key={item.href + item.label}>
                              <Link
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="flex gap-3 rounded-[4px] bg-chip px-4 py-3"
                              >
                                {item.icon && (
                                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-void text-ink" aria-hidden="true">
                                    <item.icon size={16} strokeWidth={1.6} />
                                  </span>
                                )}
                                <span className="min-w-0">
                                  <span className="block text-[15.5px] font-medium text-ink">{item.label}</span>
                                  {item.desc && <span className="mt-0.5 block text-[13px] leading-snug text-muted">{item.desc}</span>}
                                </span>
                              </Link>
                            </li>
                          ))}
                          {sm.all && (
                            <li>
                              <Link
                                href={sm.all.href}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-1.5 px-4 py-3 text-[14px] font-medium text-ink"
                              >
                                {sm.all.label}
                                <ArrowRight size={14} />
                              </Link>
                            </li>
                          )}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-5 font-display text-[24px] tracking-[-0.03em] text-ink"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-3 border-t border-hairline px-5 py-5">
          <Link
            href={nav.cta.href}
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 rounded-[4px] bg-accent px-6 py-4 text-[15px] font-medium text-white"
          >
            {nav.cta.label}
            <ArrowRight size={16} />
          </Link>
          <Link
            href={nav.candidat.href}
            onClick={() => setOpen(false)}
            className="flex items-center justify-center rounded-[4px] border border-hairline-strong px-6 py-3.5 text-[15px] text-ink"
          >
            {nav.candidat.label}
          </Link>
          <div className="flex items-center justify-between">
            <a href={nav.connexion.href} onClick={() => setOpen(false)} className="text-[15px] text-muted">
              {nav.connexion.label}
            </a>
            <LanguageSwitch locale={locale} />
          </div>
        </div>
      </div>
    </header>
  );
}
