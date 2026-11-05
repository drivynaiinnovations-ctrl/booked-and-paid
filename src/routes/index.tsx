import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clock, MessageCircleQuestion, ShieldCheck, Sparkles, UserX, X } from "lucide-react";
import { Layout, StickyBuy } from "@/components/Chrome";
import { PhoneMockup } from "@/components/PhoneMockup";
import { Calculator } from "@/components/Calculator";
import { BRAND, GUARANTEE, OFFER, SITE_URL, SLOTS, STARTER, money, stackTotal } from "@/lib/site";
import { DEMOS } from "@/lib/demos";

export const Route = createFileRoute("/")({
  head: () => ({ links: [{ rel: "canonical", href: `${SITE_URL}/` }] }),
  component: Home,
});

const PAINS = [
  { icon: MessageCircleQuestion, title: "“How much?” DMs at 11pm", body: "You answer the same questions all week — and half of them never order." },
  { icon: UserX, title: "No-shows on custom orders", body: "You bought the ingredients, blocked the time, and they ghosted. No deposit, no protection." },
  { icon: Clock, title: "Sold out — then forgot who asked", body: "People wanted to buy. There was just no way to catch them for next week." },
];

const STEPS = [
  { day: "Day 1", title: "30-minute kickoff", body: "You tell us what you sell, how you price it and when people pick up." },
  { day: "Days 2–10", title: "We build everything", body: "Order page, deposit checkout, pickup slots, reminder texts, link-in-bio." },
  { day: "Day 11", title: "Test order together", body: "You place a real order on your phone and watch the deposit land." },
  { day: "Day 14", title: "Launch & first drop", body: "We hand you your link, QR sign and DM scripts. You start taking orders." },
];

const COMPARE = [
  { row: "Customers can pay on the spot", dm: false, site: false, engine: true },
  { row: "Deposits protect you from no-shows", dm: false, site: false, engine: true },
  { row: "Pickup slots you control", dm: false, site: false, engine: true },
  { row: "Reminder texts sent for you", dm: false, site: false, engine: true },
  { row: "Looks professional & shareable", dm: false, site: true, engine: true },
  { row: "Waitlist when you sell out", dm: false, site: false, engine: true },
];

const FAQS = [
  { q: "Do I need a website already?", a: "No. We build the whole thing. If you already have a site, we add the pre-order page to it or link to it." },
  { q: "Where does the money go?", a: "Straight to your own Stripe account. We never hold your money. Stripe's standard card fees apply." },
  { q: "What does the $149/month cover?", a: "Hosting, the reminder texts, security updates and small changes like new flavors, prices or pickup times. Cancel the monthly plan any time — your domain stays yours." },
  { q: "I'm not technical. Will I be able to use it?", a: "Yes. You'll get a simple dashboard and a 15-minute walkthrough. Most changes are a text to us." },
  { q: "What if I only sell at markets?", a: "That's exactly who it's for. The QR sign lets booth traffic pre-order next week instead of walking away when you sell out." },
  { q: "What if it doesn't work for me?", a: GUARANTEE.enabled ? GUARANTEE.body : "Book a fit call first — if we don't think it'll pay for itself, we'll tell you." },
];

function Home() {
  const total = stackTotal();
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full bg-butter/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-0 size-[28rem] rounded-full bg-ember/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:pb-28 lg:pt-20">
          <div>
            <p className="eyebrow">For bakers, juice makers &amp; artists</p>
            <h1 className="mt-4 text-5xl font-extrabold leading-[0.98] sm:text-6xl lg:text-7xl">
              Get paid <span className="relative whitespace-nowrap text-ember">before<svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden><path d="M2 9 C 50 2, 150 2, 198 8" stroke="#ffd66b" strokeWidth="5" fill="none" strokeLinecap="round" /></svg></span> you bake.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-soft sm:text-xl">
              Your pre-order page, deposit checkout, pickup slots and reminder texts — built for you and live in{" "}
              <strong className="text-ink">{OFFER.buildDays} days</strong>.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/start" className="btn-buy text-lg">
                Get my Pre-Order Engine <ArrowRight size={20} />
              </Link>
              <Link to="/demos" className="btn-ghost">Try a live demo store</Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-ink-soft">
              {["Money goes straight to your Stripe", "You own your domain", "Cancel the monthly any time"].map((t) => (
                <li key={t} className="flex items-center gap-1.5"><Check size={16} className="text-money" /> {t}</li>
              ))}
            </ul>
          </div>
          <PhoneMockup />
        </div>
      </section>

      {/* PAIN */}
      <section className="border-y border-line bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-3xl font-extrabold sm:text-4xl">You don't have a demand problem.<br className="hidden sm:block" /> You have a <span className="text-ember">checkout</span> problem.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {PAINS.map((p) => (
              <div key={p.title} className="rounded-2xl border border-line bg-cream p-6">
                <p.icon className="text-ember" size={26} />
                <h3 className="mt-4 text-xl font-extrabold">{p.title}</h3>
                <p className="mt-2 text-ink-soft">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <p className="eyebrow">60-second check</p>
            <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">How much is your inbox costing you?</h2>
            <p className="mt-4 text-lg text-ink-soft">Drag the sliders to your real week.</p>
          </div>
          <div className="mt-10"><Calculator /></div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="eyebrow !text-butter">How it works</p>
          <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">Live in {OFFER.buildDays} days. You do about 1 hour of it.</h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.day} className="relative rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <span className="font-display text-5xl font-extrabold text-ember/90">{i + 1}</span>
                <p className="mt-3 text-xs font-bold uppercase tracking-widest text-butter">{s.day}</p>
                <h3 className="mt-1 text-xl font-extrabold">{s.title}</h3>
                <p className="mt-2 text-sm text-cream/70">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* OFFER / VALUE STACK */}
      <section id="offer" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Everything you get</p>
            <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">{OFFER.name}</h2>
          </div>
          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl border border-line bg-paper shadow-[0_30px_60px_-30px_rgb(27_21_18/0.35)]">
            <ul className="divide-y divide-line">
              {OFFER.stack.map((s) => (
                <li key={s.item} className="flex items-start gap-4 px-6 py-5 sm:px-8">
                  <Check className="mt-0.5 shrink-0 text-money" size={22} />
                  <div className="flex-1">
                    <p className="font-bold">{s.item}</p>
                    <p className="text-sm text-muted">{s.detail}</p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-muted line-through">{money(s.value)}</span>
                </li>
              ))}
              {OFFER.bonuses.map((s) => (
                <li key={s.item} className="flex items-start gap-4 bg-butter/20 px-6 py-5 sm:px-8">
                  <Sparkles className="mt-0.5 shrink-0 text-ember" size={22} />
                  <div className="flex-1">
                    <p className="font-bold"><span className="mr-2 rounded bg-ember px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">Bonus</span>{s.item}</p>
                    <p className="text-sm text-muted">{s.detail}</p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-muted line-through">{money(s.value)}</span>
                </li>
              ))}
            </ul>
            <div className="bg-ink px-6 py-8 text-center text-cream sm:px-8">
              <p className="text-sm text-cream/60">Total value <span className="line-through">{money(total)}</span></p>
              <p className="mt-1 font-display text-5xl font-extrabold">
                {money(OFFER.setup)}<span className="text-lg font-semibold text-cream/60"> setup</span>
              </p>
              <p className="text-cream/70">then {money(OFFER.monthly)}/mo · cancel the monthly any time</p>
              {SLOTS.current && (
                <p className="mt-4 inline-block rounded-full bg-ember/20 px-4 py-1.5 text-sm font-semibold text-butter">
                  We build {SLOTS.current.perMonth} engines a month · {SLOTS.current.left} left for {SLOTS.current.month}
                </p>
              )}
              <div className="mt-6">
                <Link to="/start" className="btn-buy text-lg">Claim my build slot <ArrowRight size={20} /></Link>
              </div>
            </div>
          </div>
          {GUARANTEE.enabled && (
            <div className="mx-auto mt-8 flex max-w-3xl gap-4 rounded-2xl border-2 border-money/40 bg-money-soft p-6">
              <ShieldCheck className="shrink-0 text-money" size={36} />
              <div>
                <p className="font-display text-xl font-extrabold">{GUARANTEE.headline}</p>
                <p className="mt-1 text-ink-soft">{GUARANTEE.body}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* COMPARISON */}
      <section className="border-y border-line bg-paper">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
          <h2 className="text-center text-3xl font-extrabold sm:text-4xl">A website shows what you sell.<br />The engine <span className="text-ember">sells it.</span></h2>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-sand/60 text-xs uppercase tracking-wider text-ink-soft">
                <tr>
                  <th className="px-5 py-4"> </th>
                  <th className="px-5 py-4 text-center">DMs &amp; cash</th>
                  <th className="px-5 py-4 text-center">Just a website</th>
                  <th className="bg-ink px-5 py-4 text-center text-butter">Pre-Order Engine</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line bg-paper">
                {COMPARE.map((c) => (
                  <tr key={c.row}>
                    <td className="px-5 py-4 font-semibold">{c.row}</td>
                    {[c.dm, c.site].map((v, i) => (
                      <td key={i} className="px-5 py-4 text-center">{v ? <Check className="mx-auto text-money" size={18} /> : <X className="mx-auto text-muted/60" size={18} />}</td>
                    ))}
                    <td className="bg-money-soft/60 px-5 py-4 text-center"><Check className="mx-auto text-money" size={20} strokeWidth={3} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* DEMOS */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow">Don't take our word for it</p>
              <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">Place a test order yourself.</h2>
              <p className="mt-3 text-lg text-ink-soft">Three working demo stores. Pick a slot, pay a pretend deposit, see what your customers would see.</p>
            </div>
            <Link to="/demos" className="btn-ghost">All demos <ArrowRight size={16} /></Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {DEMOS.map((d) => (
              <Link key={d.slug} to="/demos/$slug" params={{ slug: d.slug }} className="group overflow-hidden rounded-3xl border border-line bg-paper transition-shadow hover:shadow-xl">
                <div className="flex h-40 items-center justify-center text-7xl" style={{ background: `${d.accent}1a` }}>
                  <span className="transition-transform duration-300 group-hover:scale-110">{d.emoji}</span>
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: d.accent }}>{d.kind}</p>
                  <h3 className="mt-1 text-2xl font-extrabold">{d.business}</h3>
                  <p className="mt-2 text-sm text-muted">{d.sub}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-ember">Try the demo <ArrowRight size={16} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER (only when filled in) */}
      {BRAND.founder.name && (
        <section className="border-y border-line bg-paper">
          <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[220px_1fr]">
            {BRAND.founder.photo && <img src={BRAND.founder.photo} alt={BRAND.founder.name} className="aspect-square w-full rounded-3xl object-cover" />}
            <div>
              <p className="eyebrow">Who builds it</p>
              <h2 className="mt-2 text-3xl font-extrabold">{BRAND.founder.name}, {BRAND.founder.role}</h2>
              <p className="mt-3 text-lg text-ink-soft">{BRAND.founder.bio}</p>
            </div>
          </div>
        </section>
      )}

      {/* DOWNSELL */}
      <section>
        <div className="mx-auto max-w-4xl px-4 pb-4 pt-16 sm:px-6">
          <div className="flex flex-col items-start gap-5 rounded-3xl border border-dashed border-line bg-cream p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-muted">Not ready for the full engine?</p>
              <p className="font-display text-2xl font-extrabold">{STARTER.name} — {money(STARTER.price)} one time</p>
              <p className="mt-1 text-ink-soft">{STARTER.detail} Upgrade later and we credit it toward your engine.</p>
            </div>
            <Link to="/start" search={{ plan: "starter" }} className="btn-ghost shrink-0">Start smaller</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-4xl font-extrabold">Questions, answered.</h2>
          <div className="mt-10 divide-y divide-line rounded-2xl border border-line bg-paper">
            {FAQS.map((f) => (
              <details key={f.q} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold">
                  {f.q}
                  <span className="text-2xl text-ember transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-4 pb-28 sm:px-6 md:pb-20">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-ember px-6 py-16 text-center text-white sm:px-12">
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-butter/30 blur-2xl" />
          <h2 className="relative text-4xl font-extrabold sm:text-6xl">Next week's orders,<br />paid this week.</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/85">Two-minute application. We'll tell you honestly if the engine will pay for itself.</p>
          <Link to="/start" className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-lg font-bold text-white hover:bg-ink-soft">
            Get my Pre-Order Engine <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <StickyBuy />
    </Layout>
  );
}
