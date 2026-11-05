import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { BRAND, OFFER, money } from "@/lib/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-xl font-extrabold tracking-tight ${className}`}>
      Booked <span className="text-ember">&amp;</span> Paid
    </span>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" aria-label={`${BRAND.name} home`}>
          <Logo />
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-ink-soft md:flex">
          <a href="/#calculator" className="hover:text-ink">What you're losing</a>
          <a href="/#offer" className="hover:text-ink">The offer</a>
          <Link to="/demos" className="hover:text-ink">Live demos</Link>
          <a href="/#faq" className="hover:text-ink">FAQ</a>
        </nav>
        <Link to="/start" className="btn-buy !px-5 !py-2.5 text-sm">
          Get my engine <ArrowRight size={16} />
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <Logo className="text-cream" />
          <p className="mt-3 max-w-xs text-sm text-cream/70">
            Pre-orders, deposits and reminders for makers who sell at markets, in DMs and by referral.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Explore</p>
          <ul className="mt-3 space-y-2 text-cream/70">
            <li><a href="/#offer" className="hover:text-cream">{OFFER.name}</a></li>
            <li><Link to="/demos" className="hover:text-cream">Live demo stores</Link></li>
            <li><Link to="/start" className="hover:text-cream">Apply for a build</Link></li>
            <li><Link to="/privacy" className="hover:text-cream">Privacy</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Talk to us</p>
          <ul className="mt-3 space-y-2 text-cream/70">
            {BRAND.email && <li><a href={`mailto:${BRAND.email}`} className="hover:text-cream">{BRAND.email}</a></li>}
            {BRAND.phone && <li><a href={`tel:${BRAND.phone.replace(/\D/g, "")}`} className="hover:text-cream">{BRAND.phone}</a></li>}
            <li><Link to="/start" className="font-semibold text-butter hover:underline">Start with a 2-minute application →</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} {BRAND.name}. {OFFER.name}: {money(OFFER.setup)} setup + {money(OFFER.monthly)}/mo.
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

// Phone-only sticky buy bar.
export function StickyBuy() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 p-3 backdrop-blur md:hidden">
      <Link to="/start" className="btn-buy w-full">
        Get my Pre-Order Engine <ArrowRight size={18} />
      </Link>
    </div>
  );
}
