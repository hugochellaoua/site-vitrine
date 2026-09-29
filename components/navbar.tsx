"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Magnetic } from "@/components/ui/magnetic";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { LogoLockup } from "@/components/logo-mark";
import { nav, products, services, useCases } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * Contenu des sous-menus.
 *
 * Il est dérivé des sections du site plutôt que ressaisi : ajouter un produit
 * ou un service le fait apparaître dans le menu sans autre intervention, et
 * les libellés ne peuvent pas diverger de ceux des pages.
 */
const SUBMENUS = {
  products: {
    tone: "warm" as const,
    items: products.items.map((p) => ({
      label: p.name,
      href: `/produits#${p.id}`,
    })),
  },
  process: {
    tone: "ink" as const,
    items: [
      { label: "Le déroulé, étape par étape", href: "/#story" },
      { label: "Notre méthodologie", href: "/methodologie" },
    ],
  },
  services: {
    tone: "ink" as const,
    items: [
      // Les intégrations quittent le premier niveau du menu : elles relèvent de
      // ce que l'on met en place autour du produit, comme les autres services.
      { label: "Intégrations", href: "/#integrations" },
      ...services.items.map((s) => ({ label: s.title, href: `/#${s.id}` })),
    ],
  },
  /**
   * Les cas d'usage s'affichent problème → réponse, sur deux colonnes.
   *
   * Un menu qui n'énumérerait que « Volume important » ou « Profils atypiques »
   * obligerait à cliquer pour comprendre. La promesse posée sous chaque libellé
   * fait tout le travail : le visiteur reconnaît sa situation et sait déjà ce
   * qu'on lui répond.
   */
  usecases: {
    tone: "ink" as const,
    wide: true,
    // Pas de sous-menu sur mobile : déplier neuf intitulés y rendrait la liste
    // interminable, alors que l'entrée mène déjà à la page qui les présente
    // tous, mieux qu'un menu ne le ferait.
    mobile: false,
    all: { label: useCases.menuLink, href: "/cas-d-usage" },
    items: useCases.items.map((u) => ({
      label: u.menu,
      desc: u.promise,
      href: `/cas-d-usage#${u.id}`,
    })),
  },
};

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
}: {
  label: string;
  href: string;
  menu: keyof typeof SUBMENUS;
}) {
  const sousMenu = SUBMENUS[menu];
  const { items, tone } = sousMenu;
  const wide = "wide" in sousMenu && sousMenu.wide;
  const all = "all" in sousMenu ? sousMenu.all : null;
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
        className={cn(
          "dropdown absolute top-full z-10 pt-3",
          // Le panneau large est trop étendu pour être centré sur son entrée :
          // il déborderait de l'écran. Il s'aligne donc sur le bord gauche de
          // la barre, dont il ne dépasse jamais.
          wide ? "-left-40 xl:-left-44" : "left-1/2 -translate-x-1/2",
        )}
      >
        <ul
          className={cn(
            "glass-panel glass-panel--solid dropdown-panel rounded-2xl p-2",
            wide
              ? "grid w-[min(620px,calc(100vw-2rem))] grid-cols-2 gap-x-2 gap-y-0.5"
              : "flex min-w-[240px] flex-col gap-0.5",
          )}
        >
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-xl px-3.5 py-2.5 transition-colors hover:bg-white/[0.06]",
                  wide ? "h-full" : "whitespace-nowrap",
                )}
              >
                <span
                  className={cn(
                    "block font-display text-[14.5px] font-bold tracking-[-0.01em]",
                    // L'orange est réservé aux noms de produits ; les services
                    // et les cas d'usage restent en blanc pour qu'on distingue
                    // les deux registres.
                    tone === "warm" ? "text-warm" : "text-ink",
                  )}
                >
                  {item.label}
                </span>
                {"desc" in item && item.desc && (
                  // La réponse, sous le problème. La flèche dit le lien entre
                  // les deux sans qu'aucun mot ne soit nécessaire.
                  <span className="mt-0.5 block text-[12.5px] leading-snug text-muted">
                    <span className="text-accent-light" aria-hidden="true">
                      →{" "}
                    </span>
                    {item.desc}
                  </span>
                )}
              </Link>
            </li>
          ))}

          {all && (
            <li className="col-span-2 mt-1 border-t border-hairline pt-1">
              <Link
                href={all.href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-center gap-1.5 rounded-xl px-3.5 py-2.5 text-[13.5px] font-semibold text-accent-light transition-colors hover:bg-white/[0.06]"
              >
                {all.label}
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
          "glass-panel flex w-full max-w-[1020px] items-center justify-between gap-4 rounded-full transition-[padding,background-color,box-shadow] duration-300 ease-out",
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
          <a
            href={nav.connexion.href}
            className="whitespace-nowrap text-[13.5px] text-muted transition-colors hover:text-ink"
          >
            {nav.connexion.label}
          </a>
          <Magnetic radius={80} strength={0.24}>
            <Link
              href={nav.cta.href}
              className="inline-block whitespace-nowrap rounded-full bg-accent px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(29,80,254,0.75)] transition-shadow duration-300 hover:shadow-[0_14px_36px_-8px_rgba(29,80,254,0.9)]"
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
        className="mobile-menu fixed inset-0 z-[60] flex flex-col bg-void/98 backdrop-blur-xl lg:hidden"
      >
        <div className="flex items-center justify-between px-6 py-5">
          <LogoLockup />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fermer le menu"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink"
          >
            <X size={20} />
          </button>
        </div>
        {/* Sur mobile, il n'y a pas de survol : les sous-menus courts sont
            dépliés sous leur entrée, en pastilles distinctes plutôt qu'en une
            ligne de mots qui se lirait comme une phrase. Sans eux,
            « Intégrations » — passée sous Services — deviendrait inatteignable
            depuis le menu. Le conteneur défile, pour qu'un écran court ne coupe
            jamais le bas de la liste.

            Le centrage passe par des marges automatiques, et non par
            `justify-center` : quand la liste dépasse la hauteur de l'écran,
            celui-ci rejette le surplus au-dessus du bord défilable, où plus
            aucun défilement ne va le rechercher. Les marges automatiques, elles,
            se réduisent à zéro dès qu'il n'y a plus de place à répartir. */}
        <div className="flex flex-1 flex-col overflow-y-auto px-6 py-4">
          <div className="m-auto flex flex-col items-center gap-4">
            {nav.links.map((link) => {
              const sous = link.dropdown ? SUBMENUS[link.dropdown] : null;
              const deplie =
                sous && !("mobile" in sous && sous.mobile === false);
              return (
                <div
                  key={link.href}
                  className="flex flex-col items-center gap-1 text-center"
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="py-1 font-display text-[22px] leading-none text-ink"
                  >
                    {link.label}
                  </Link>
                  {deplie && (
                    // Les entrées du sous-menu se lisent comme le sous-titre de
                    // celle qui les porte : une seule ligne, sous le titre, dans
                    // une graisse qui ne lui dispute rien.
                    <ul className="flex flex-wrap items-center justify-center gap-x-1 text-[13px]">
                      {sous.items.map((item, i) => (
                        <li key={item.href} className="flex items-center gap-1">
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "py-1.5",
                              sous.tone === "warm" ? "text-warm" : "text-muted",
                            )}
                          >
                            {item.label}
                          </Link>
                          {/* Le séparateur suit son entrée plutôt qu'il ne
                              précède la suivante : au passage à la ligne, il
                              reste en fin de ligne au lieu d'en ouvrir une. */}
                          {i < sous.items.length - 1 && (
                            <span className="text-faint" aria-hidden="true">
                              ·
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
            <a
              href={nav.connexion.href}
              onClick={() => setOpen(false)}
              className="text-base text-muted"
            >
              {nav.connexion.label}
            </a>
            <Link
              href={nav.cta.href}
              onClick={() => setOpen(false)}
              className="rounded-full bg-accent px-7 py-4 text-base font-semibold text-white"
            >
              {nav.cta.label}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
