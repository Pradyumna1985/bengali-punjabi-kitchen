import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, PhoneCall } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { KITCHEN_INFO, buildWhatsAppUrl } from "@/data/kitchen";
import { BrandMark } from "@/components/BrandMark";
import { CursorCooker } from "@/components/CursorCooker";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Maach & Makki — Authentic Bengali Cuisine & Punjabi Tadka Masala" },
      {
        name: "description",
        content:
          "Maach & Makki cloud kitchen delivering authentic Bengali cuisine and Punjabi tadka masala across Kanchrapara, Kalyani, and Halisahar.",
      },
      { property: "og:title", content: "Maach & Makki Cloud Kitchen" },
      {
        property: "og:description",
        content: "Authentic Bengali Cuisine & Punjabi Tadka Masala delivered in Kanchrapara, Kalyani & Halisahar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..600&family=Fraunces:opsz,wght@9..144,500..700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
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

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/" as const, label: "Home" },
    { to: "/menu" as const, label: "Menu" },
    { to: "/about" as const, label: "Our Kitchen" },
    { to: "/order" as const, label: "WhatsApp Pay" },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <CursorCooker />
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
            <Link to="/" className="shrink-0">
              <BrandMark size="header" subtitle="Bengali & Punjabi Cloud Kitchen" />
            </Link>

            <nav aria-label="Main navigation" className="hidden items-center gap-2 md:flex">
              {navLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeProps={{ className: "bg-secondary text-primary font-semibold" }}
                  activeOptions={{ exact: item.to === "/" }}
                  className="rounded-lg px-4 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-secondary/70"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={buildWhatsAppUrl("Hi Maach & Makki! I would like to place an order.")}
                target="_blank"
                rel="noreferrer"
                className="ml-2 inline-flex items-center gap-2 rounded-xl bg-whatsapp px-4 py-2.5 text-base font-semibold text-whatsapp-foreground transition-colors hover:bg-whatsapp/90"
              >
                <PhoneCall className="size-4" />
                Order Now
              </a>
            </nav>

            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex size-11 items-center justify-center rounded-lg border border-border bg-card text-foreground md:hidden"
            >
              {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <nav aria-label="Mobile navigation" className="border-t border-border bg-card px-4 py-3 md:hidden">
              <div className="flex flex-col gap-1.5">
                {navLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    activeProps={{ className: "bg-secondary text-primary font-semibold" }}
                    activeOptions={{ exact: item.to === "/" }}
                    className="rounded-lg px-4 py-3 text-lg font-medium text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </header>

        <main className="flex-1">
          <Outlet />
        </main>

        <footer className="border-t border-border bg-saffron-band">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
            <div>
              <BrandMark size="footer" />
              <p className="mt-3 text-base text-foreground">{KITCHEN_INFO.deliverySummary}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {KITCHEN_INFO.hours} &middot; WhatsApp: {KITCHEN_INFO.whatsappDisplay}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {navLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-lg px-3 py-2 text-base font-medium text-foreground underline-offset-4 hover:underline"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
}
