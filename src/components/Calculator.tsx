import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { OFFER, money } from "@/lib/site";

function Slider({
  label, value, min, max, step, onChange, format,
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (n: number) => void; format: (n: number) => string;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-semibold text-ink-soft">{label}</span>
        <span className="font-display text-xl font-extrabold text-ink">{format(value)}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[#ff5a1f]"
      />
    </label>
  );
}

// "Revenue leak" calculator: inquiries that never turn into a paid order.
export function Calculator() {
  const [dms, setDms] = useState(25);
  const [ghost, setGhost] = useState(40);
  const [order, setOrder] = useState(35);
  const lostPerMonth = Math.round(dms * 4.33 * (ghost / 100) * order);
  const paybackWeeks = lostPerMonth > 0 ? Math.max(1, Math.ceil((OFFER.setup / lostPerMonth) * 4.33)) : null;

  return (
    <div className="grid gap-8 rounded-3xl border border-line bg-paper p-6 shadow-sm sm:p-10 lg:grid-cols-[1.1fr_1fr]">
      <div className="space-y-7">
        <Slider label="Order inquiries per week (DMs, texts, market)" value={dms} min={5} max={150} step={5} onChange={setDms} format={(n) => `${n}`} />
        <Slider label="How many never turn into a paid order" value={ghost} min={10} max={80} step={5} onChange={setGhost} format={(n) => `${n}%`} />
        <Slider label="Average order" value={order} min={10} max={300} step={5} onChange={setOrder} format={money} />
        <p className="text-xs text-muted">
          An estimate from your own numbers, not a promise. Most lost orders come from slow replies, “I'll get back to you,” and no way to pay on the spot.
        </p>
      </div>
      <div className="flex flex-col justify-between rounded-2xl bg-ink p-7 text-cream">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-butter">You're leaving on the table</p>
          <p className="mt-2 font-display text-5xl font-extrabold sm:text-6xl">
            {money(lostPerMonth)}
            <span className="text-xl font-semibold text-cream/60">/mo</span>
          </p>
          <p className="mt-2 text-sm text-cream/70">That's {money(lostPerMonth * 12)} a year in orders people already wanted to place.</p>
          {paybackWeeks && (
            <p className="mt-5 rounded-xl bg-white/10 p-4 text-sm">
              Win back even half of that and the {money(OFFER.setup)} setup pays for itself in about{" "}
              <strong className="text-butter">{Math.ceil(paybackWeeks * 2)} weeks</strong>.
            </p>
          )}
        </div>
        <Link to="/start" search={{ lost: lostPerMonth }} className="btn-buy mt-7 w-full">
          Stop the leak <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
