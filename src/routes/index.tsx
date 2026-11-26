import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Star } from "lucide-react";

import heroFeastImg from "@/assets/hero-feast.jpg";
import bengaliThaliImg from "@/assets/bengali-thali.jpg";
import punjabiTadkaImg from "@/assets/punjabi-tadka.jpg";
import { Button } from "@/components/ui/button";
import { INITIAL_FEEDBACKS, KITCHEN_INFO } from "@/data/kitchen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maach & Makki — Authentic Bengali Cuisine & Punjabi Tadka Masala" },
      {
        name: "description",
        content:
          "Order freshly cooked Bengali classics and Punjabi tadka masala from Maach & Makki cloud kitchen. Delivering across Kanchrapara, Kalyani, and Halisahar.",
      },
      { property: "og:title", content: "Maach & Makki — Bengali & Punjabi Cloud Kitchen" },
      {
        property: "og:description",
        content: "Authentic Bengali Cuisine & Punjabi Tadka Masala delivered in Kanchrapara, Kalyani & Halisahar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      <section className="relative flex min-h-[82vh] items-center overflow-hidden">
        <img
          src={heroFeastImg}
          alt="Feast of Bengali mustard fish curry, mutton kosha, Punjabi dal tadka, paneer masala, and garlic naan"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="hero-scrim absolute inset-0" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            Kanchrapara &middot; Kalyani &middot; Halisahar
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-[1.06] text-hero-foreground sm:text-6xl lg:text-7xl">
            Authentic Bengali warmth meets sizzling Punjabi tadka.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-hero-foreground/90 sm:text-xl">
            Freshly cooked home-style meals from Maach & Makki cloud kitchen — crafted for every
            generation at the table, from age 8 to 80.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild variant="hero" size="xl">
              <Link to="/menu">
                Explore Our Menu
                <ArrowRight className="size-5" />
              </Link>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <Link to="/order">
                <MessageCircle className="size-5" />
                WhatsApp Pay &amp; Order
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Two beloved kitchens, one happy table
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Whether you crave Sunday mustard Hilsa or smoky dhaba-style dal tadka, every dish is
            cooked fresh to order.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <article className="overflow-hidden rounded-2xl border border-border bg-card">
            <img
              src={bengaliThaliImg}
              alt="Authentic Bengali thali with Shorshe Ilish, Kosha Mangsho, and puffed luchis"
              className="aspect-[16/10] w-full object-cover"
            />
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-foreground">Authentic Bengali Cuisine</h3>
              <p className="mt-2.5 text-base leading-relaxed text-muted-foreground">
                Stone-ground mustard Shorshe Ilish, slow-braised Kosha Mangsho with hot luchis,
                crispy Kolkata Bhetki fry, and earthen-pot Mishti Doi.
              </p>
              <Button asChild variant="default" size="lg" className="mt-6">
                <Link to="/menu">View Bengali Menu</Link>
              </Button>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-border bg-card">
            <img
              src={punjabiTadkaImg}
              alt="Punjabi Dal Tadka Masala, Paneer Butter Masala, and charred garlic naan"
              className="aspect-[16/10] w-full object-cover"
            />
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-foreground">Punjabi Tadka Masala</h3>
              <p className="mt-2.5 text-base leading-relaxed text-muted-foreground">
                Desi ghee Dal Tadka Masala, char-grilled Paneer Tikka Butter Masala, Amritsari
                Butter Chicken, and blistered garlic butter naan.
              </p>
              <Button asChild variant="default" size="lg" className="mt-6">
                <Link to="/menu">View Punjabi Menu</Link>
              </Button>
            </div>
          </article>
        </div>
      </section>

      <section className="border-y border-border bg-saffron-band">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Simple ordering for ages 8 to 80
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="font-display text-3xl font-bold text-primary">1</p>
              <h3 className="mt-2 text-xl font-bold text-foreground">Pick your favorites</h3>
              <p className="mt-2 text-base text-muted-foreground">
                Browse big, clear photos and prices on our Bengali and Punjabi menus.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="font-display text-3xl font-bold text-primary">2</p>
              <h3 className="mt-2 text-xl font-bold text-foreground">Pay &amp; confirm on WhatsApp</h3>
              <p className="mt-2 text-base text-muted-foreground">
                Scan our quick payment QR and send your order to {KITCHEN_INFO.whatsappDisplay}.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="font-display text-3xl font-bold text-primary">3</p>
              <h3 className="mt-2 text-xl font-bold text-foreground">Hot local delivery</h3>
              <p className="mt-2 text-base text-muted-foreground">
                Freshly packed and delivered exclusively across Kanchrapara, Kalyani, and Halisahar.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Loved by local families</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Real notes from neighbors across Kanchrapara, Kalyani, and Halisahar.
            </p>
          </div>
          <Button asChild variant="outline" size="lg">
            <Link to="/order">See All Feedbacks &amp; Pay</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {INITIAL_FEEDBACKS.slice(0, 3).map((fb) => (
            <blockquote key={fb.id} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex gap-1 text-primary" aria-label={`${fb.rating} out of 5 stars`}>
                {Array.from({ length: fb.rating }).map((_, idx) => (
                  <Star key={idx} className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-base leading-relaxed text-foreground">"{fb.comment}"</p>
              <footer className="mt-4 text-sm font-semibold text-muted-foreground">
                {fb.name} &middot; {fb.area}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  );
}
