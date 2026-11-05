import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Chrome";
import { BRAND, SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [{ title: "Privacy — Booked & Paid" }],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacy` }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <Layout>
      <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <h1 className="text-4xl font-extrabold">Privacy</h1>
        <div className="mt-6 space-y-4 text-ink-soft">
          <p>{BRAND.name} only collects what you type into the application form, and only to reply to you about a build.</p>
          <p>The calculator and demo stores run in your browser. Nothing you enter there is stored or sent, and demo checkouts never charge a card.</p>
          <p>We don't sell or share your information. To have anything you sent us deleted, reply to any email from us and ask.</p>
        </div>
      </article>
    </Layout>
  );
}
