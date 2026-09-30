"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { dict, type Locale } from "@/lib/i18n";
import { Badge, SectionTitle } from "@/components/ui/section-title";
import { cn } from "@/lib/cn";

export function Faq({ locale }: { locale: Locale }) {
  const { faq } = dict(locale);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="relative px-6 py-28">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <Badge>{faq.eyebrow}</Badge>
          <SectionTitle title={faq.title} emphasis={faq.emphasis} className="mt-6" />
        </div>

        <div className="mt-14 divide-y divide-hairline border-y border-hairline">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-5 py-6 text-left"
                >
                  <span
                    className={cn(
                      "text-[15.5px] font-medium transition-colors duration-300",
                      isOpen ? "text-ink" : "text-muted group-hover:text-ink"
                    )}
                  >
                    {item.q}
                  </span>
                  <Plus
                    size={16}
                    className={cn(
                      "shrink-0 transition-all duration-300",
                      isOpen ? "rotate-45 text-accent-light" : "text-faint group-hover:text-muted"
                    )}
                  />
                </button>
                {/* Ouverture en CSS : une grille qui passe de 0fr à 1fr anime
                    la hauteur sans la mesurer, et sans JavaScript. */}
                <div
                  // La réponse reste dans la page même repliée : les moteurs la
                  // lisent, ce qui sert le référencement. `inert` la retire en
                  // revanche des lecteurs d'écran et du parcours clavier tant
                  // qu'elle est fermée — sans quoi ils énonceraient toutes les
                  // réponses à la suite.
                  inert={!isOpen}
                  aria-hidden={!isOpen}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,0.8,0.24,1)]",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[62ch] pb-7 pr-8 text-[14px] leading-relaxed text-muted">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
