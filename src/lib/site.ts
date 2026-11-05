// Everything a business owner would change lives here: brand, contact, offer, guarantee, slots.
// Anything left empty is hidden on the site — never ship placeholder contact details or fake scarcity.

export const SITE_URL = "https://booked-and-paid.drivyn-ai-innovations.workers.dev";

export const BRAND = {
  name: "Booked & Paid",
  tagline: "Get paid before you bake.",
  // Fill these in before launch. Empty values are hidden (the apply form falls back to on-page confirmation).
  email: "",
  phone: "",
  founder: { name: "", role: "Founder", photo: "", bio: "" },
};

export const OFFER = {
  name: "The Pre-Order Engine",
  setup: 1250,
  monthly: 149,
  buildDays: 14,
  // Value of each piece if bought separately — keep these defensible.
  stack: [
    { item: "Your own pre-order page", detail: "Menu or catalog, weekly drops, sold-out states. On your domain.", value: 1500 },
    { item: "Deposit checkout", detail: "Take 50% (or full) payment at order time. Money lands in your Stripe.", value: 900 },
    { item: "Pickup & delivery slot booking", detail: "Customers pick a slot; you set the limits so you never overbook.", value: 700 },
    { item: "Automatic text reminders", detail: "Order confirmed, pickup tomorrow, ready now — sent for you.", value: 600 },
    { item: "Instagram & TikTok link-in-bio setup", detail: "Turn “link in bio” into an order, not a scroll.", value: 300 },
    { item: "30 days of tweaks after launch", detail: "Change prices, flavors, slots — we handle it.", value: 800 },
  ],
  bonuses: [
    { item: "DM reply scripts", detail: "Copy-paste replies that move “how much?” DMs to your order page.", value: 200 },
    { item: "Waitlist page for sold-out drops", detail: "Collect numbers when you sell out, text them first next time.", value: 300 },
    { item: "Market-day QR sign", detail: "Print-ready sign so booth traffic can pre-order next week.", value: 100 },
  ],
};

export const STARTER = {
  name: "Starter Page",
  price: 499,
  detail: "One clean page with your products, prices and an order form. Live in 5 days.",
};

// Only switch these on when they're true for your business.
export const GUARANTEE = {
  enabled: true,
  headline: "First paid pre-order in 30 days — or your setup fee back.",
  body: "If your Pre-Order Engine doesn't bring in at least one paid pre-order within 30 days of launch, we refund the setup fee. You keep everything we built.",
};

export const SLOTS = {
  // e.g. { perMonth: 4, left: 2, month: "December" } — leave null to hide scarcity entirely.
  current: null as null | { perMonth: number; left: number; month: string },
};

export const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export const stackTotal = () =>
  [...OFFER.stack, ...OFFER.bonuses].reduce((sum, s) => sum + s.value, 0);
