import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, MessageCircle, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  INITIAL_FEEDBACKS,
  KITCHEN_INFO,
  buildWhatsAppUrl,
  type CustomerFeedback,
  type DeliveryZone,
} from "@/data/kitchen";

const FEEDBACK_STORAGE_KEY = "maach-and-makki-feedbacks-v1";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "WhatsApp Payment & Customer Feedbacks — Maach & Makki" },
      {
        name: "description",
        content:
          "Scan the Maach & Makki demo WhatsApp/UPI payment QR, confirm your order to +91 83360 68750, and read customer feedbacks from Kanchrapara, Kalyani, and Halisahar.",
      },
      { property: "og:title", content: "WhatsApp Pay & Customer Feedbacks — Maach & Makki" },
      {
        property: "og:description",
        content: "Easy WhatsApp payment QR and real customer reviews for Maach & Makki cloud kitchen.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OrderAndFeedbackPage,
});

function DemoPaymentQr() {
  const modules = [
    "111111101010101111111",
    "100000100110001000001",
    "101110101001101011101",
    "101110100101001011101",
    "101110101110101011101",
    "100000100010001000001",
    "111111101010101111111",
    "000000001101000000000",
    "101101110011101101011",
    "010010011100010010100",
    "110110101011011101101",
    "001001010100100010010",
    "101110111010110111001",
    "000000001001010001100",
    "111111101110101010111",
    "100000100100110100101",
    "101110101011001111010",
    "101110100110100010101",
    "101110101100111001110",
    "100000100011001010001",
    "111111101101101101101",
  ];

  return (
    <svg
      viewBox="0 0 25 25"
      role="img"
      aria-label="Demo WhatsApp and UPI payment QR code for Maach & Makki"
      className="mx-auto size-52 rounded-xl border-2 border-border bg-card p-3 text-foreground"
    >
      {modules.map((row, y) =>
        row.split("").map((cell, x) =>
          cell === "1" ? (
            <rect key={`${x}-${y}`} x={x + 2} y={y + 2} width="1" height="1" fill="currentColor" />
          ) : null,
        ),
      )}
    </svg>
  );
}

function OrderAndFeedbackPage() {
  const [customerName, setCustomerName] = useState("");
  const [deliveryZone, setDeliveryZone] = useState<DeliveryZone>("Kalyani");
  const [orderItems, setOrderItems] = useState("1x Shorshe Ilish, 1x Punjabi Dal Tadka Masala");
  const [amountInput, setAmountInput] = useState("550");
  const [payError, setPayError] = useState("");

  const [feedbacks, setFeedbacks] = useState<CustomerFeedback[]>(INITIAL_FEEDBACKS);
  const [fbName, setFbName] = useState("");
  const [fbArea, setFbArea] = useState<DeliveryZone>("Kanchrapara");
  const [fbRating, setFbRating] = useState(5);
  const [fbComment, setFbComment] = useState("");
  const [fbError, setFbError] = useState("");
  const [fbSaved, setFbSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(FEEDBACK_STORAGE_KEY);
      if (stored !== null) {
        const parsed = JSON.parse(stored) as CustomerFeedback[];
        if (Array.isArray(parsed)) setFeedbacks(parsed);
      }
    } catch {
      // Ignore storage read errors and keep initial feedbacks.
    }
  }, []);

  function handleWhatsAppPay(event: FormEvent) {
    event.preventDefault();
    const trimmedName = customerName.trim();
    const trimmedItems = orderItems.trim();
    const numericAmount = Number(amountInput);

    if (!trimmedName) {
      setPayError("Please enter your name so we know whose order this is.");
      return;
    }
    if (!trimmedItems) {
      setPayError("Please list the dishes you would like to order.");
      return;
    }
    if (!Number.isFinite(numericAmount) || numericAmount <= 0 || numericAmount > 25000) {
      setPayError("Please enter a valid payment amount between ₹1 and ₹25,000.");
      return;
    }

    setPayError("");
    const msg = [
      `Hi Maach & Makki!`,
      `Name: ${trimmedName}`,
      `Delivery Area: ${deliveryZone}`,
      `Order: ${trimmedItems}`,
      `Amount Paid (Demo QR): ₹${Math.round(numericAmount)}`,
      `Please confirm my order!`,
    ].join("\n");

    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  }

  function handleFeedbackSubmit(event: FormEvent) {
    event.preventDefault();
    const cleanName = fbName.trim();
    const cleanComment = fbComment.trim();
    if (!cleanName || !cleanComment) {
      setFbError("Please add both your name and your feedback message.");
      return;
    }
    if (fbRating < 1 || fbRating > 5) {
      setFbError("Please select a star rating from 1 to 5.");
      return;
    }

    const entry: CustomerFeedback = {
      id: `fb-${Date.now()}`,
      name: cleanName,
      area: fbArea,
      rating: fbRating,
      comment: cleanComment,
      dateLabel: "Just now",
    };
    const updated = [entry, ...feedbacks];
    setFeedbacks(updated);
    setFbName("");
    setFbComment("");
    setFbRating(5);
    setFbError("");
    setFbSaved(true);

    try {
      window.localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage quota issues.
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
          WhatsApp Payment &amp; Customer Feedbacks
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Scan the demo QR below, then tap the green button to send your payment note directly to{" "}
          <strong className="text-foreground">{KITCHEN_INFO.whatsappDisplay}</strong>.
        </p>
      </div>

      <section className="mt-10 grid gap-8 lg:grid-cols-12">
        <div className="min-w-0 rounded-2xl border border-border bg-saffron-band p-6 text-center sm:p-8 lg:col-span-5">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Demo WhatsApp / UPI QR
          </p>
          <h2 className="mt-2 text-2xl font-bold text-foreground">Scan to Pay Maach &amp; Makki</h2>
          <div className="mt-5">
            <DemoPaymentQr />
          </div>
          <p className="mt-4 text-base font-semibold text-foreground">
            Demo UPI ID: {KITCHEN_INFO.demoUpiId}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            WhatsApp Pay Number: {KITCHEN_INFO.whatsappDisplay}
          </p>
          <p className="mt-4 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
            This is a demo QR for preview. After scanning, share your payment screenshot on
            WhatsApp to confirm delivery.
          </p>
        </div>

        <form
          onSubmit={handleWhatsAppPay}
          noValidate
          className="min-w-0 rounded-2xl border border-border bg-card p-6 sm:p-8 lg:col-span-7"
        >
          <h2 className="text-2xl font-bold text-foreground">Confirm Your Order on WhatsApp</h2>
          <p className="mt-1 text-base text-muted-foreground">{KITCHEN_INFO.deliverySummary}.</p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="customer-name" className="text-base">
                Your Name
              </Label>
              <Input
                id="customer-name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Sourav Sen"
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="delivery-zone" className="text-base">
                Delivery Area (Only 3 zones)
              </Label>
              <select
                id="delivery-zone"
                value={deliveryZone}
                onChange={(e) => setDeliveryZone(e.target.value as DeliveryZone)}
                className="h-12 w-full rounded-md border border-input bg-background px-3 text-base text-foreground"
              >
                {KITCHEN_INFO.deliveryZones.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <Label htmlFor="order-items" className="text-base">
              Dishes You Want to Order
            </Label>
            <Textarea
              id="order-items"
              value={orderItems}
              onChange={(e) => setOrderItems(e.target.value)}
              rows={3}
              className="text-base"
            />
          </div>

          <div className="mt-5 space-y-2">
            <Label htmlFor="payment-amount" className="text-base">
              Amount (₹)
            </Label>
            <Input
              id="payment-amount"
              type="number"
              min={1}
              max={25000}
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              className="h-12 text-base"
            />
          </div>

          {payError && (
            <p role="alert" className="mt-4 text-sm font-medium text-destructive">
              {payError}
            </p>
          )}

          <Button type="submit" variant="whatsapp" size="xl" className="mt-6 w-full whitespace-normal">
            <MessageCircle className="size-5" />
            Pay &amp; Order on WhatsApp
          </Button>
        </form>
      </section>

      <section id="feedbacks" className="mt-16 border-t border-border pt-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-bold text-foreground">Customer Feedbacks</h2>
            <p className="mt-2 text-base text-muted-foreground">
              Honest words from families across Kanchrapara, Kalyani, and Halisahar.
            </p>
            <div className="mt-6 space-y-4">
              {feedbacks.map((fb) => (
                <article key={fb.id} className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex gap-1 text-primary" aria-label={`${fb.rating} stars`}>
                      {Array.from({ length: fb.rating }).map((_, idx) => (
                        <Star key={idx} className="size-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">{fb.dateLabel}</span>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-foreground">"{fb.comment}"</p>
                  <p className="mt-3 text-sm font-semibold text-muted-foreground">
                    {fb.name} &middot; {fb.area}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleFeedbackSubmit}
            noValidate
            className="h-fit rounded-2xl border border-border bg-saffron-band p-6 sm:p-8 lg:col-span-5"
          >
            <h3 className="text-2xl font-bold text-foreground">Share Your Feedback</h3>
            <p className="mt-1 text-base text-muted-foreground">
              Tell us how your meal tasted today.
            </p>

            <div className="mt-5 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fb-name" className="text-base">
                  Your Name
                </Label>
                <Input
                  id="fb-name"
                  value={fbName}
                  onChange={(e) => setFbName(e.target.value)}
                  placeholder="e.g. Debashis Roy"
                  className="h-12 bg-card text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fb-area" className="text-base">
                  Your Area
                </Label>
                <select
                  id="fb-area"
                  value={fbArea}
                  onChange={(e) => setFbArea(e.target.value as DeliveryZone)}
                  className="h-12 w-full rounded-md border border-input bg-card px-3 text-base text-foreground"
                >
                  {KITCHEN_INFO.deliveryZones.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-base">Rating</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFbRating(star)}
                      aria-label={`Rate ${star} out of 5`}
                      className={
                        star <= fbRating
                          ? "inline-flex size-11 items-center justify-center rounded-lg border border-primary bg-primary text-primary-foreground"
                          : "inline-flex size-11 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground"
                      }
                    >
                      <Star className="size-5 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fb-comment" className="text-base">
                  Your Review
                </Label>
                <Textarea
                  id="fb-comment"
                  value={fbComment}
                  onChange={(e) => setFbComment(e.target.value)}
                  placeholder="What did you enjoy most?"
                  rows={3}
                  className="bg-card text-base"
                />
              </div>
            </div>

            {fbError && (
              <p role="alert" className="mt-4 text-sm font-medium text-destructive">
                {fbError}
              </p>
            )}
            {fbSaved && (
              <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-veg">
                <CheckCircle2 className="size-4" />
                Thank you! Your feedback has been added.
              </p>
            )}

            <Button type="submit" size="xl" className="mt-5 w-full">
              Post Feedback
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}