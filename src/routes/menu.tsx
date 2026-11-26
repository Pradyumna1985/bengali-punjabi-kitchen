import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";

import bengaliThaliImg from "@/assets/bengali-thali.jpg";
import punjabiTadkaImg from "@/assets/punjabi-tadka.jpg";
import { Button } from "@/components/ui/button";
import { KITCHEN_INFO, MENU_ITEMS, buildWhatsAppUrl, type MenuItem } from "@/data/kitchen";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Happy Hours | Bengali Cuisine & Punjabi Tadka Masala" },
      {
        name: "description",
        content:
          "Browse authentic Bengali dishes and Punjabi tadka masala with photos and prices at Happy Hours. Delivering in Kanchrapara, Kalyani, and Halisahar.",
      },
      { property: "og:title", content: "Happy Hours Menu" },
      {
        property: "og:description",
        content: "Shorshe Ilish, Kosha Mangsho, Punjabi Dal Tadka Masala, Paneer Butter Masala, and more.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MenuPage,
});

function DishCard({ item }: { item: MenuItem }) {
  const orderMessage = `Hi Happy Hours! I would like to order 1x ${item.name} (₹${item.price}).`;
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <img src={item.image} alt={item.name} className="aspect-[16/10] w-full object-cover" />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span
              className={
                item.isVeg
                  ? "inline-block text-xs font-bold uppercase tracking-wider text-veg"
                  : "inline-block text-xs font-bold uppercase tracking-wider text-nonveg"
              }
            >
              {item.isVeg ? "● Pure Veg" : "● Non-Veg"}
            </span>
            <h3 className="mt-1 text-xl font-bold text-foreground">{item.name}</h3>
          </div>
          <p className="shrink-0 font-display text-2xl font-bold text-primary">₹{item.price}</p>
        </div>
        <p className="mt-2.5 flex-1 text-base leading-relaxed text-muted-foreground">
          {item.description}
        </p>
        <div className="mt-5">
          <Button asChild variant="whatsapp" size="lg" className="w-full text-base">
            <a href={buildWhatsAppUrl(orderMessage)} target="_blank" rel="noreferrer">
              <MessageCircle className="size-4" />
              Order on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}

function MenuPage() {
  const bengaliItems = MENU_ITEMS.filter((item) => item.cuisine === "bengali");
  const punjabiItems = MENU_ITEMS.filter((item) => item.cuisine === "punjabi");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Our Fresh Daily Menu</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Clear dishes, honest prices, cooked to order. {KITCHEN_INFO.deliverySummary}.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="secondary" size="lg">
            <a href="#bengali-menu">Jump to Bengali Cuisine</a>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <a href="#punjabi-menu">Jump to Punjabi Tadka Masala</a>
          </Button>
          <Button asChild variant="default" size="lg">
            <Link to="/order">Go to WhatsApp Pay &amp; QR</Link>
          </Button>
        </div>
      </div>

      <section id="bengali-menu" className="mt-14 scroll-mt-24">
        <div className="overflow-hidden rounded-2xl border border-border bg-saffron-band md:grid md:grid-cols-5">
          <img
            src={bengaliThaliImg}
            alt="Authentic Bengali Cuisine spread"
            className="h-56 w-full object-cover md:col-span-2 md:h-full"
          />
          <div className="flex flex-col justify-center p-6 sm:p-8 md:col-span-3">
            <h2 className="text-3xl font-bold text-foreground">Authentic Bengali Cuisine</h2>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
              Traditional mustard-oil recipes, fresh river fish, tender slow-cooked kosha, and
              beloved sweet endings prepared the classic home way.
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bengaliItems.map((item) => (
            <DishCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section id="punjabi-menu" className="mt-16 scroll-mt-24">
        <div className="overflow-hidden rounded-2xl border border-border bg-saffron-band md:grid md:grid-cols-5">
          <img
            src={punjabiTadkaImg}
            alt="Punjabi Tadka Masala spread"
            className="h-56 w-full object-cover md:col-span-2 md:h-full"
          />
          <div className="flex flex-col justify-center p-6 sm:p-8 md:col-span-3">
            <h2 className="text-3xl font-bold text-foreground">Punjabi Tadka Masala</h2>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">
              Rich whole-spice gravies, smoky desi ghee tempering, and soft clay-oven breads made
              for hearty family lunches and cozy dinners.
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {punjabiItems.map((item) => (
            <DishCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}