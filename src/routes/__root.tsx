import { HeadContent, Link, Outlet, Scripts, createRootRoute, useRouter, type ErrorComponentProps } from "@tanstack/react-router";
import type { ReactNode } from "react";
import appCss from "../styles.css?url";
import { BRAND } from "@/lib/site";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${BRAND.name} — Pre-orders & deposits for makers, set up in 14 days` },
      {
        name: "description",
        content:
          "The Pre-Order Engine: a pre-order page, deposit checkout, pickup slots and automatic reminders for bakers, juice makers and artists. Live in 14 days.",
      },
      { property: "og:site_name", content: BRAND.name },
      { property: "og:type", content: "website" },
      { name: "theme-color", content: "#fbf6ef" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Inter:wght@400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: () => <Outlet />,
  notFoundComponent: NotFound,
  errorComponent: ErrorView,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-2 text-4xl font-extrabold">This page sold out.</h1>
        <Link to="/" className="btn-buy mt-6">Back home</Link>
      </div>
    </div>
  );
}

function ErrorView({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-2xl font-extrabold">This page didn't load</h1>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="btn-buy mt-6"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
