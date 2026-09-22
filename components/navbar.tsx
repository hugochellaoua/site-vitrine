"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Magnetic } from "@/components/ui/magnetic";
import { Menu, X } from "lucide-react";
import { LogoLockup } from "@/components/logo-mark";
import { nav } from "@/lib/content";
import { cn } from "@/lib/cn";

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
          "glass-panel flex w-full max-w-[880px] items-center justify-between gap-4 rounded-full transition-[padding,background-color] duration-300 ease-out",
          scrolled ? "px-3 py-2 bg-void/80" : "px-4 py-2.5"
        )}
      >
        <Link href="/#top" className="flex items-center px-2">
          <LogoLockup />
        </Link>

        <div className="hidden items-center gap-6 text-[13.5px] text-muted lg:flex">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
             
              className="relative transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          <Link href={nav.connexion.href} prefetch={false} className="text-[13.5px] text-muted transition-colors hover:text-ink">
            {nav.connexion.label}
          </Link>
          <Magnetic radius={80} strength={0.24}>
            <Link
              href={nav.cta.href}
              className="inline-block rounded-full bg-gradient-to-br from-accent-light to-accent px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(30,79,255,0.7)] transition-shadow duration-300 hover:shadow-[0_14px_36px_-8px_rgba(30,79,255,0.85)]"
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
        <div className="flex flex-1 flex-col items-center justify-center gap-8">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-display text-3xl text-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={nav.connexion.href}
            prefetch={false}
            onClick={() => setOpen(false)}
            className="text-base text-muted"
          >
            {nav.connexion.label}
          </Link>
          <Link
            href={nav.cta.href}
            onClick={() => setOpen(false)}
            className="rounded-full bg-accent px-7 py-4 text-base font-semibold text-white"
          >
            {nav.cta.label}
          </Link>
        </div>
      </div>
    </header>
  );
}
