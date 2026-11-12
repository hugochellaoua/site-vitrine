import Link from "next/link";
import { dict, type Locale } from "@/lib/i18n";
import { LogoLockup } from "@/components/logo-mark";
import { CookieSettingsButton } from "@/components/cookie-consent";

/**
 * Le pied de page, en colonnes : la marque et ses coordonnées, puis les
 * produits, les solutions, les ressources, l'entreprise et le légal. Tout y
 * est dérivé des sections du site, pour que les libellés restent les mêmes
 * que dans les pages.
 */
function Colonne({ titre, liens }: { titre: string; liens: { label: string; href: string; externe?: boolean }[] }) {
  return (
    <div>
      <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink">{titre}</p>
      <ul className="mt-4 flex flex-col gap-2.5">
        {liens.map((l) => (
          <li key={l.href + l.label}>
            {l.externe ? (
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-[13.5px] text-muted transition-colors hover:text-ink">
                {l.label}
              </a>
            ) : (
              <Link href={l.href} prefetch={false} className="text-[13.5px] text-muted transition-colors hover:text-ink">
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const { footer, nav, cookies, products, useCases, site, services } = dict(locale);
  const produits = locale === "fr" ? "/produits" : "/en/products";
  const cas = locale === "fr" ? "/cas-d-usage" : "/en/use-cases";
  const accueil = locale === "fr" ? "/" : "/en";
  return (
    <footer className="sombre relative border-t border-hairline bg-void px-6 pb-28 pt-16 lg:pb-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.3fr_repeat(4,1fr)] lg:gap-8">
          <div className="col-span-2 lg:col-span-1">
            <Link href={`${accueil}#top`}>
              <LogoLockup />
            </Link>
            <p className="mt-4 max-w-[30ch] text-[14px] leading-relaxed text-muted">{site.tagline}</p>
            <address className="mt-6 flex flex-col gap-1.5 text-[13.5px] not-italic text-muted">
              <span>{footer.address}</span>
              <a href={`mailto:${footer.email}`} className="transition-colors hover:text-ink">
                {footer.email}
              </a>
            </address>
            <a
              href={footer.social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={footer.social.label}
              title={footer.social.label}
              className="mt-6 flex h-9 w-9 items-center justify-center rounded-full border border-hairline transition-colors hover:border-hairline-strong"
            >
              {/* La marque officielle de LinkedIn — Lucide ne fournit pas les
                  logos de marques. Elle garde son bleu : un logo redessiné ou
                  recoloré n'est plus le logo de personne. */}
              <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#0A66C2"
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
            </a>
          </div>

          <Colonne
            titre={footer.heads.products}
            liens={[
              ...products.items.map((x) => ({ label: x.name, href: `${produits}#${x.id}` })),
              ...services.items.map((x) => ({ label: x.title, href: `${accueil}#${x.id}` })),
            ]}
          />
          <Colonne
            titre={footer.heads.solutions}
            liens={[
              ...useCases.items.slice(0, 6).map((u) => ({ label: u.menu, href: `${cas}#${u.id}` })),
              { label: footer.allUseCases, href: cas },
            ]}
          />
          <Colonne titre={footer.heads.resources} liens={nav.resources.map((r) => ({ label: r.label, href: r.href }))} />
          <Colonne
            titre={footer.heads.company}
            liens={[
              { label: nav.cta.label, href: nav.cta.href, externe: true },
              { label: nav.connexion.label, href: nav.connexion.href, externe: true },
              { label: "LinkedIn", href: footer.social.href, externe: true },
              ...footer.legal.map((l) => ({ label: l.label, href: l.href })),
            ]}
          />
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-hairline pt-7 sm:flex-row sm:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[12px] text-faint">
            {footer.badges.map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-faint">
            <CookieSettingsButton label={cookies.settings} />
            <span>{footer.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
