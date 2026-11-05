import { useEffect, useState } from "react";
import { BellRing, CheckCircle2 } from "lucide-react";

// Illustrative notifications for a demo bakery — the hero shows what the product does, not client results.
const EVENTS = [
  { title: "💸 $24.00 deposit received", body: "Strawberry shortcake · Sat 9–10am" },
  { title: "🗓️ New pre-order", body: "Brown butter cookies ×2 · Sat 10am" },
  { title: "💸 $42.50 deposit received", body: "Custom birthday cake · Sat 11am" },
  { title: "📱 Reminder sent", body: "“Your order is ready for pickup!”" },
  { title: "🔥 Saturday drop: 1 slot left", body: "Waitlist turned on automatically" },
];

export function PhoneMockup() {
  const [count, setCount] = useState(2);
  useEffect(() => {
    const t = setInterval(() => setCount((c) => (c >= EVENTS.length ? 2 : c + 1)), 2200);
    return () => clearInterval(t);
  }, []);
  const shown = EVENTS.slice(0, count).reverse();
  const total = 24 + (count > 2 ? 42.5 : 0);

  return (
    <div className="relative mx-auto w-[290px] sm:w-[320px]">
      <div className="phone-float rounded-[2.6rem] border-[10px] border-ink bg-ink shadow-[0_40px_80px_-30px_rgb(27_21_18/0.55)]">
        <div className="relative overflow-hidden rounded-[2rem] bg-paper">
          <div className="mx-auto mt-2 h-5 w-24 rounded-full bg-ink" />
          <div className="px-4 pb-5 pt-3">
            <div className="flex items-center justify-between text-[11px] font-semibold text-muted">
              <span>Crumb &amp; Co. · Orders</span>
              <BellRing size={14} className="text-ember" />
            </div>
            <div className="mt-3 rounded-2xl bg-money-soft p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-money">Collected this week</p>
              <p className="font-display text-3xl font-extrabold text-ink">${total.toFixed(2)}</p>
              <p className="text-[11px] text-ink-soft">before a single cake is baked</p>
            </div>
            <div className="mt-3 space-y-2">
              {shown.map((e) => (
                <div key={e.title} className="toast-in rounded-xl border border-line bg-white p-3 shadow-sm">
                  <p className="text-[13px] font-bold text-ink">{e.title}</p>
                  <p className="text-[11px] text-muted">{e.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-[10px] text-muted">
              <CheckCircle2 size={12} className="text-money" /> Demo store · illustrative notifications
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
