import Link from "next/link";
import { footer, nav } from "@/lib/content";
import { LogoLockup } from "@/components/logo-mark";

export function Footer() {
  return (
    <footer className="relative border-t border-hairline px-6 pb-28 pt-12 lg:pb-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-4">
            <Link href="/#top">
              <LogoLockup />
            </Link>
            <a
              href={footer.social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={footer.social.label}
              title={footer.social.label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline transition-colors hover:border-hairline-strong"
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
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-muted">
            {nav.links.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-ink">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-hairline pt-7 sm:flex-row sm:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12.5px] text-faint">
            {footer.legal.map((l) => (
              <Link key={l.href} href={l.href} prefetch={false} className="transition-colors hover:text-muted">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-faint">
            {footer.badges.map((b) => (
              <span key={b}>{b}</span>
            ))}
            <span className="text-hairline-strong">·</span>
            <span>{footer.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
