import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Galaxy } from "@/components/galaxy";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/section-title";
import { legalEntity, legalEntityIntro, legalEntityIntroEn, legalEntityLabelsEn } from "@/lib/legal-entity";
import { dict, type Locale } from "@/lib/i18n";

/**
 * Mentions légales.
 *
 * Les valeurs ne se traduisent pas — une raison sociale et une adresse sont des
 * données d'état civil. Seules les étiquettes changent de langue, et la version
 * anglaise annonce que le texte français fait foi.
 */
export function LegalNoticePage({ locale }: { locale: Locale }) {
  const { links, ui } = dict(locale);
  const en = locale === "en";
  const t = en
    ? {
        badge: "Legal information",
        h1: "Legal notice",
        intro: legalEntityIntroEn,
        prevails:
          "This is a courtesy translation. Only the French version of this page is legally binding.",
        also: "See also the ",
        privacy: "privacy policy",
        and: " and the ",
        notice: "AI usage notice",
        todo: "To be completed before going live",
      }
    : {
        badge: "Informations légales",
        h1: "Mentions légales",
        intro: legalEntityIntro,
        prevails: null,
        also: "Consultez également la ",
        privacy: "politique de confidentialité",
        and: " et la ",
        notice: "notice d'utilisation de l'IA",
        todo: "À compléter avant la mise en ligne",
      };

  return (
    <>
      <Galaxy />
      <Navbar locale={locale} />
      <main className="relative z-10 px-6 pb-24 pt-36 sm:pt-44">
        <article className="mx-auto max-w-[68ch]">
          <Badge>{t.badge}</Badge>
          <h1 className="mt-6 font-display text-[clamp(28px,4vw,44px)] font-bold leading-[1.08] tracking-[-0.03em] text-ink">
            {t.h1}
          </h1>
          {t.prevails && <p className="mt-4 text-[13px] text-faint">{t.prevails}</p>}
          <p className="mt-6 text-[15px] leading-relaxed text-muted">{t.intro}</p>

          <dl className="mt-12 divide-y divide-hairline border-y border-hairline">
            {legalEntity.map((f) => (
              <div key={f.label} className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-6">
                <dt className="text-[13.5px] font-semibold text-ink">
                  {en ? (legalEntityLabelsEn[f.label] ?? f.label) : f.label}
                </dt>
                <dd className="text-[15px] leading-relaxed text-muted">
                  {f.value ?? (
                    <span className="inline-flex flex-col gap-0.5 rounded-lg border border-error/40 bg-error/10 px-3 py-2 text-[13px] text-[#ffc2c2]">
                      <span className="font-semibold">{t.todo}</span>
                      {f.hint && <span className="text-[12px] opacity-80">{f.hint}</span>}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 text-[15px] leading-relaxed text-muted">
            {t.also}
            <Link href={links.privacy} className="font-semibold text-ink underline underline-offset-4">
              {t.privacy}
            </Link>
            {t.and}
            <Link href={links.noticeIA} className="font-semibold text-ink underline underline-offset-4">
              {t.notice}
            </Link>
            .
          </p>

          <Link
            href={locale === "fr" ? "/" : "/en"}
            className="mt-16 inline-flex items-center gap-2 text-[14px] font-semibold text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft size={15} />
            {ui.backHome}
          </Link>
        </article>
      </main>
      <Footer locale={locale} />
    </>
  );
}
