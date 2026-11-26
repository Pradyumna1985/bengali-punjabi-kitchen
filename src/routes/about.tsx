import { createFileRoute, Link } from "@tanstack/react-router";

import kitchenCraftImg from "@/assets/kitchen-craft.jpg";
import bengaliSnacksImg from "@/assets/bengali-sweets-snacks.jpg";
import { Button } from "@/components/ui/button";
import { KITCHEN_INFO } from "@/data/kitchen";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Kitchen — Maach & Makki Cloud Kitchen" },
      {
        name: "description",
        content:
          "Meet Maach & Makki cloud kitchen: fresh whole spices, traditional Bengali mustard recipes, and Punjabi ghee tadka delivered in Kanchrapara, Kalyani, and Halisahar.",
      },
      { property: "og:title", content: "Our Kitchen — Maach & Makki" },
      {
        property: "og:description",
        content: "Freshly cooked Bengali cuisine and Punjabi tadka masala for every generation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Cooked with care for every plate, from age 8 to 80
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Maach & Makki started with one joyful idea: a family should never have to choose between
              the comforting aroma of Bengali mustard curry and the rich warmth of Punjabi tadka
              masala. Both belong hot on the same dinner table.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Every order is cooked fresh in small batches using cold-pressed mustard oil, pure desi
              ghee, and hand-roasted whole spices — gentle enough for elders, exciting enough for
              kids.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="xl">
                <Link to="/menu">Browse the Menu</Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/order">WhatsApp Pay &amp; Feedbacks</Link>
              </Button>
            </div>
          </div>
          <img
            src={kitchenCraftImg}
            alt="Fresh Indian whole spices, mustard seeds, Kashmiri chillies, and sizzling ghee tadka pan"
            className="aspect-[4/3] w-full rounded-2xl border border-border object-cover"
          />
        </div>
      </section>

      <section className="border-y border-border bg-saffron-band">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <img
            src={bengaliSnacksImg}
            alt="Crispy Kolkata Bhetki fish fry with kasundi mustard and earthen pots of Mishti Doi"
            className="aspect-[4/3] w-full rounded-2xl border border-border object-cover"
          />
          <div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Strictly local, always piping hot
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              We keep our delivery radius focused strictly on{" "}
              <strong className="text-foreground">
                Kanchrapara, Kalyani, and Halisahar
              </strong>{" "}
              so your luchis arrive puffed, your fish fry stays crisp, and your dal tadka reaches
              your doorstep steaming hot.
            </p>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-4">
                <dt className="text-sm font-medium text-muted-foreground">Delivery Corridor</dt>
                <dd className="mt-1 text-base font-bold text-foreground">
                  Kanchrapara &ndash; Kalyani &ndash; Halisahar
                </dd>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <dt className="text-sm font-medium text-muted-foreground">Kitchen Hours</dt>
                <dd className="mt-1 text-base font-bold text-foreground">{KITCHEN_INFO.hours}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}