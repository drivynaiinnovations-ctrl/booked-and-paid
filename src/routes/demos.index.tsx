import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/Chrome";
import { DEMOS } from "@/lib/demos";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/demos/")({
  head: () => ({
    meta: [{ title: "Live demo stores — Booked & Paid" }],
    links: [{ rel: "canonical", href: `${SITE_URL}/demos` }],
  }),
  component: Demos,
});

function Demos() {
  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="eyebrow">Live demos</p>
        <h1 className="mt-3 text-5xl font-extrabold">Be the customer for a minute.</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          These are demo businesses, not clients. Everything works — slots, deposits, the confirmation text — except no card is ever charged.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {DEMOS.map((d) => (
            <Link key={d.slug} to="/demos/$slug" params={{ slug: d.slug }} className="group overflow-hidden rounded-3xl border border-line bg-paper transition-shadow hover:shadow-xl">
              <div className="flex h-48 items-center justify-center text-8xl" style={{ background: `${d.accent}1a` }}>
                <span className="transition-transform duration-300 group-hover:scale-110">{d.emoji}</span>
              </div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: d.accent }}>{d.kind}</p>
                <h2 className="mt-1 text-2xl font-extrabold">{d.business}</h2>
                <p className="mt-2 text-sm text-muted">{d.sub}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-ember">Open the store <ArrowRight size={16} /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
