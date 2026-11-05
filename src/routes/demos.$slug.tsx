import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Minus, Plus, MessageSquare } from "lucide-react";
import { demoBySlug } from "@/lib/demos";
import { OFFER, SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/demos/$slug")({
  loader: ({ params }) => {
    const demo = demoBySlug(params.slug);
    if (!demo) throw notFound();
    return demo;
  },
  head: ({ loaderData: d }) =>
    d
      ? {
          meta: [
            { title: `${d.business} (demo store) — Booked & Paid` },
            { name: "description", content: `A working demo of ${OFFER.name}: ${d.kind.toLowerCase()} pre-orders with deposits and ${d.slotLabel.toLowerCase()} slots.` },
          ],
          links: [{ rel: "canonical", href: `${SITE_URL}/demos/${d.slug}` }],
        }
      : {},
  component: DemoStore,
});

const fmt = (n: number) => `$${n.toFixed(2)}`;

function DemoStore() {
  const d = Route.useLoaderData();
  const [qty, setQty] = useState<Record<string, number>>({});
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);

  const subtotal = useMemo(() => d.items.reduce((s, i) => s + (qty[i.name] ?? 0) * i.price, 0), [d, qty]);
  const deposit = Math.round(subtotal * d.depositPct) / 100;
  const count = Object.values(qty).reduce((a, b) => a + b, 0);
  const ready = count > 0 && slot && name.trim();

  const change = (item: string, delta: number) =>
    setQty((q) => ({ ...q, [item]: Math.max(0, Math.min(9, (q[item] ?? 0) + delta)) }));

  return (
    <div className="min-h-screen" style={{ background: `${d.accent}0d` }}>
      {/* Demo banner — keeps it obvious this is not a real business */}
      <div className="bg-ink px-4 py-2.5 text-center text-xs font-semibold text-cream sm:text-sm">
        Demo store built with {OFFER.name} · no card is charged ·{" "}
        <Link to="/" className="text-butter underline underline-offset-2">Get one for your business →</Link>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <Link to="/demos" className="inline-flex items-center gap-1 text-sm font-semibold text-muted hover:text-ink">
          <ArrowLeft size={16} /> All demos
        </Link>

        {done ? (
          <div className="mx-auto mt-10 max-w-md text-center">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-money text-white"><Check size={32} /></div>
            <h1 className="mt-5 text-4xl font-extrabold">Order confirmed</h1>
            <p className="mt-2 text-ink-soft">{fmt(deposit)} deposit (demo) · {slot}</p>
            <div className="mx-auto mt-8 max-w-xs rounded-3xl border-[8px] border-ink bg-paper p-4 text-left shadow-xl">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold text-muted"><MessageSquare size={12} /> Text message</p>
              <div className="mt-2 rounded-2xl rounded-tl-sm bg-sand p-3 text-sm">
                Hi {name.trim().split(" ")[0]}! {d.business} here 👋 Your order is locked in for <strong>{slot}</strong>. Deposit received: {fmt(deposit)}. We'll text you when it's ready.
              </div>
            </div>
            <p className="mt-8 text-sm text-muted">That's the whole experience your customers get — and the deposit would already be in your Stripe.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/start" className="btn-buy">Get this for my business <ArrowRight size={18} /></Link>
              <button type="button" className="btn-ghost" onClick={() => { setDone(false); setQty({}); setSlot(null); setName(""); }}>
                Try again
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: d.accent }}>{d.business} · {d.kind}</p>
              <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">{d.emoji} {d.hero}</h1>
              <p className="mt-3 text-lg text-ink-soft">{d.sub}</p>

              <ul className="mt-8 space-y-3">
                {d.items.map((i) => {
                  const q = qty[i.name] ?? 0;
                  return (
                    <li key={i.name} className={`flex items-center gap-4 rounded-2xl border bg-paper p-4 ${i.soldOut ? "border-line opacity-60" : "border-line"}`}>
                      <span className="grid size-14 shrink-0 place-items-center rounded-xl text-3xl" style={{ background: `${d.accent}1a` }}>{i.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold">{i.name}</p>
                        <p className="text-sm text-muted">{i.note}</p>
                      </div>
                      <p className="font-display text-lg font-extrabold">{fmt(i.price)}</p>
                      {i.soldOut ? (
                        <span className="rounded-full bg-sand px-3 py-1 text-xs font-bold text-ink-soft">Sold out</span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button type="button" aria-label={`Remove one ${i.name}`} onClick={() => change(i.name, -1)} className="grid size-8 place-items-center rounded-full border border-line hover:bg-sand"><Minus size={14} /></button>
                          <span className="w-4 text-center font-bold">{q}</span>
                          <button type="button" aria-label={`Add one ${i.name}`} onClick={() => change(i.name, 1)} className="grid size-8 place-items-center rounded-full text-white" style={{ background: d.accent }}><Plus size={14} /></button>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <aside className="h-fit rounded-3xl border border-line bg-paper p-6 shadow-sm lg:sticky lg:top-6">
              <h2 className="text-xl font-extrabold">Your order</h2>
              <p className="mt-4 text-sm font-semibold text-ink-soft">{d.slotLabel}</p>
              <div className="mt-2 grid gap-2">
                {d.slots.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    disabled={s.left === 0}
                    onClick={() => setSlot(s.label)}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${slot === s.label ? "text-white" : "border-line hover:bg-sand"}`}
                    style={slot === s.label ? { background: d.accent, borderColor: d.accent } : undefined}
                  >
                    {s.label}
                    <span className="text-xs font-medium">{s.left === 0 ? "Full" : `${s.left} left`}</span>
                  </button>
                ))}
              </div>
              <label className="mt-5 block text-sm font-semibold text-ink-soft">
                Your name
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jordan" className="mt-1.5 w-full rounded-xl border border-line bg-cream px-4 py-3 text-base outline-none focus:border-ink" />
              </label>
              <dl className="mt-5 space-y-1.5 border-t border-line pt-4 text-sm">
                <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd className="font-semibold">{fmt(subtotal)}</dd></div>
                <div className="flex justify-between text-base"><dt className="font-bold">Due now ({d.depositPct}%)</dt><dd className="font-display text-xl font-extrabold">{fmt(deposit)}</dd></div>
                {d.depositPct < 100 && <div className="flex justify-between"><dt className="text-muted">Due at {d.slotLabel.toLowerCase()}</dt><dd>{fmt(subtotal - deposit)}</dd></div>}
              </dl>
              <button
                type="button"
                disabled={!ready}
                onClick={() => setDone(true)}
                className="mt-5 w-full rounded-full py-4 text-base font-bold text-white transition-opacity disabled:opacity-40"
                style={{ background: d.accent }}
              >
                {ready ? `Pay ${fmt(deposit)} deposit (demo)` : count === 0 ? "Add an item" : !slot ? `Choose a ${d.slotLabel.toLowerCase()}` : "Add your name"}
              </button>
              <p className="mt-3 text-center text-xs text-muted">Demo checkout — no card needed, nothing is charged.</p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
