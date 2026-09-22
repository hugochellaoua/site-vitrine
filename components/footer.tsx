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
              className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-muted transition-colors hover:border-hairline-strong hover:text-ink"
            >
              {/* Lucide ne fournit pas d'icônes de marques : le glyphe est intégré ici. */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.4 21.5h5.2V9.3H2.4v12.2ZM9.9 9.3h4.98v1.67h.07c.7-1.25 2.4-2.57 4.93-2.57 5.27 0 6.24 3.3 6.24 7.6v5.5h-5.2v-4.88c0-1.17-.02-2.67-1.7-2.67-1.7 0-1.96 1.27-1.96 2.58v4.97H9.9V9.3Z" />
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
