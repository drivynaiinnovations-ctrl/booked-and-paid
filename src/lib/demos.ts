// Three working demo stores. They are clearly labeled demos — no real business, no real payment.

export type DemoItem = { name: string; price: number; note: string; emoji: string; soldOut?: boolean };

export type Demo = {
  slug: "bakery" | "juice" | "artist";
  business: string;
  kind: string;
  emoji: string;
  hero: string;
  sub: string;
  accent: string; // tailwind-compatible hex for the demo's own brand
  depositPct: number;
  slotLabel: string;
  slots: { label: string; left: number }[];
  items: DemoItem[];
};

export const DEMOS: Demo[] = [
  {
    slug: "bakery",
    business: "Crumb & Co.",
    kind: "Home bakery",
    emoji: "🎂",
    hero: "Saturday cake drop",
    sub: "Order by Thursday 8pm. 50% deposit holds your cake.",
    accent: "#c2410c",
    depositPct: 50,
    slotLabel: "Pickup",
    slots: [
      { label: "Sat 9–10am", left: 3 },
      { label: "Sat 10–11am", left: 1 },
      { label: "Sat 11am–12pm", left: 0 },
    ],
    items: [
      { name: "Strawberry shortcake (8\")", price: 48, note: "Serves 12", emoji: "🍓" },
      { name: "Lemon-blueberry loaf", price: 22, note: "Glazed", emoji: "🍋" },
      { name: "Brown butter cookies (dozen)", price: 26, note: "Sea salt", emoji: "🍪" },
      { name: "Custom birthday cake", price: 85, note: "From $85 · we'll confirm design", emoji: "🎉", soldOut: true },
    ],
  },
  {
    slug: "juice",
    business: "Root & Rind",
    kind: "Cold-pressed juice",
    emoji: "🥤",
    hero: "This week's flavors",
    sub: "Pre-order by Wednesday. Pick up Friday — we text you when it's ready.",
    accent: "#15803d",
    depositPct: 100,
    slotLabel: "Friday pickup",
    slots: [
      { label: "Fri 7–8am", left: 6 },
      { label: "Fri 12–1pm", left: 4 },
      { label: "Fri 5–6pm", left: 2 },
    ],
    items: [
      { name: "Green Reset", price: 9, note: "Kale, apple, ginger", emoji: "🥬" },
      { name: "Beet Glow", price: 9, note: "Beet, carrot, lemon", emoji: "🫐" },
      { name: "Pineapple Heat", price: 10, note: "Pineapple, cayenne, lime", emoji: "🍍" },
      { name: "6-bottle weekly box", price: 50, note: "Mix & match", emoji: "📦" },
    ],
  },
  {
    slug: "artist",
    business: "Maya Okafor Studio",
    kind: "Painter & printmaker",
    emoji: "🎨",
    hero: "Commissions & print drops",
    sub: "Commission a piece with a 50% deposit. We'll send progress photos as it comes together.",
    accent: "#7c3aed",
    depositPct: 50,
    slotLabel: "Start date",
    slots: [
      { label: "Nov 18 start", left: 1 },
      { label: "Dec 2 start", left: 2 },
      { label: "Dec 16 start", left: 3 },
    ],
    items: [
      { name: "Pet portrait (12×16)", price: 260, note: "Acrylic on canvas", emoji: "🐕" },
      { name: "House portrait (11×14)", price: 220, note: "Ink & watercolor", emoji: "🏡" },
      { name: "Signed print — “Saturday Market”", price: 45, note: "Edition of 50", emoji: "🖼️" },
      { name: "Large original commission", price: 900, note: "From $900", emoji: "✨", soldOut: true },
    ],
  },
];

export const demoBySlug = (slug: string) => DEMOS.find((d) => d.slug === slug);
