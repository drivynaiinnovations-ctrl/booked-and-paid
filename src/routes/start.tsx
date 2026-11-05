import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Layout } from "@/components/Chrome";
import { BRAND, GUARANTEE, OFFER, SITE_URL, STARTER, money } from "@/lib/site";

type Search = { plan?: "engine" | "starter"; lost?: number };

export const Route = createFileRoute("/start")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    plan: s.plan === "starter" ? "starter" : undefined,
    lost: Number.isFinite(Number(s.lost)) && Number(s.lost) > 0 ? Math.round(Number(s.lost)) : undefined,
  }),
  head: () => ({
    meta: [{ title: "Apply for a build — Booked & Paid" }],
    links: [{ rel: "canonical", href: `${SITE_URL}/start` }],
  }),
  component: Start,
});

const field = "mt-1.5 w-full rounded-xl border border-line bg-cream px-4 py-3 text-base outline-none focus:border-ink";
const label = "block text-sm font-semibold text-ink-soft";

function Start() {
  const { plan, lost } = Route.useSearch();
  const [sent, setSent] = useState<string | null>(null);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = (k: string) => String(fd.get(k) ?? "").trim();
    const body = [
      `Plan: ${v("plan")}`,
      `Name: ${v("name")}`,
      `Business: ${v("business")}`,
      `Sells: ${v("sells")}`,
      `Sells through: ${fd.getAll("where").join(", ") || "-"}`,
      `Inquiries per week: ${v("dms") || "-"}`,
      `Average order: ${v("order") || "-"}`,
      lost ? `Calculator estimate: ${money(lost)}/mo lost` : "",
      `Email: ${v("email")}`,
      `Phone: ${v("phone") || "-"}`,
    ].filter(Boolean).join("\n");
    if (BRAND.email) {
      window.location.href = `mailto:${BRAND.email}?subject=${encodeURIComponent(`Build application: ${v("business")}`)}&body=${encodeURIComponent(body)}`;
    }
    setSent(v("name").split(" ")[0] || "there");
  }

  return (
    <Layout>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="eyebrow">2-minute application</p>
          <h1 className="mt-3 text-5xl font-extrabold leading-tight">Let's see if the engine pays for itself.</h1>
          {lost && (
            <p className="mt-5 rounded-2xl bg-ink p-5 text-cream">
              Your calculator estimate: <strong className="text-butter">{money(lost)}/month</strong> in orders that don't get placed today.
            </p>
          )}
          <ul className="mt-8 space-y-3 text-ink-soft">
            {[
              "We read every application ourselves.",
              "If we don't think it'll pay for itself, we'll say so — no pitch.",
              `If it's a fit, we start within a week and you're live in ${OFFER.buildDays} days.`,
            ].map((t) => (
              <li key={t} className="flex gap-2"><Check size={20} className="mt-0.5 shrink-0 text-money" /> {t}</li>
            ))}
          </ul>
          {GUARANTEE.enabled && (
            <div className="mt-8 flex gap-3 rounded-2xl border-2 border-money/40 bg-money-soft p-5">
              <ShieldCheck size={28} className="shrink-0 text-money" />
              <p className="text-sm text-ink-soft"><strong className="text-ink">{GUARANTEE.headline}</strong> {GUARANTEE.body}</p>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-line bg-paper p-6 shadow-sm sm:p-8">
          {sent ? (
            <div className="py-10 text-center">
              <div className="mx-auto grid size-14 place-items-center rounded-full bg-money text-white"><Check size={28} /></div>
              <h2 className="mt-4 text-3xl font-extrabold">Thanks, {sent}!</h2>
              <p className="mt-2 text-ink-soft">
                {BRAND.email
                  ? "Your email app opened with your application filled in — hit send and we'll reply within one business day."
                  : "Applications are opening shortly. In the meantime, try a demo store to see exactly what your customers would get."}
              </p>
              <Link to="/demos" className="btn-ghost mt-6">Try a demo store</Link>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <fieldset>
                <legend className={label}>What are you interested in?</legend>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {[
                    { v: "engine", t: OFFER.name, s: `${money(OFFER.setup)} + ${money(OFFER.monthly)}/mo` },
                    { v: "starter", t: STARTER.name, s: `${money(STARTER.price)} one time` },
                  ].map((o) => (
                    <label key={o.v} className="flex cursor-pointer items-start gap-3 rounded-xl border border-line p-4 has-[:checked]:border-ember has-[:checked]:bg-ember/5">
                      <input type="radio" name="plan" value={o.t} defaultChecked={(plan ?? "engine") === o.v} className="mt-1 accent-[#ff5a1f]" />
                      <span><span className="block font-bold">{o.t}</span><span className="text-sm text-muted">{o.s}</span></span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className={label}>Your name<input name="name" required className={field} /></label>
                <label className={label}>Business name<input name="business" required className={field} /></label>
              </div>
              <label className={label}>What do you sell?<input name="sells" required placeholder="Custom cakes, cold-pressed juice, prints…" className={field} /></label>
              <fieldset>
                <legend className={label}>Where do you sell today?</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Markets", "Instagram / TikTok DMs", "Referrals", "Storefront", "Other"].map((w) => (
                    <label key={w} className="cursor-pointer rounded-full border border-line px-4 py-2 text-sm font-semibold has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-cream">
                      <input type="checkbox" name="where" value={w} className="sr-only" />{w}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className={label}>Order inquiries per week<input name="dms" inputMode="numeric" className={field} /></label>
                <label className={label}>Average order ($)<input name="order" inputMode="decimal" className={field} /></label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className={label}>Email<input name="email" type="email" required className={field} /></label>
                <label className={label}>Phone (optional)<input name="phone" type="tel" className={field} /></label>
              </div>
              <button type="submit" className="btn-buy w-full text-lg">Send my application <ArrowRight size={20} /></button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
}
