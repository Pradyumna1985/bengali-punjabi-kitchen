import chefsEmblemImg from "@/assets/chefs-emblem.jpg";

function MaachIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M27.5 12C24.2 6.8 18.2 4.5 11.8 6.4C8.4 7.4 5.7 9.5 4 12C5.7 14.5 8.4 16.6 11.8 17.6C18.2 19.5 24.2 17.2 27.5 12Z"
        fill="var(--maach)"
      />
      <path d="M26.5 12L33.5 6.5C32.4 10 32.4 14 33.5 17.5L26.5 12Z" fill="var(--maach-accent)" />
      <path d="M14.5 6.2C16.8 3.6 19.6 3.5 21.5 6.4" fill="var(--maach-accent)" />
      <path d="M15 17.6C16.8 19.8 19.2 19.8 20.8 17.4" fill="var(--maach-accent)" />
      <path
        d="M15.5 9.2C16.8 10.6 16.8 13.4 15.5 14.8M19.5 9C20.8 10.5 20.8 13.5 19.5 15"
        stroke="var(--primary-foreground)"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.85"
      />
      <circle cx="9.8" cy="11" r="1.4" fill="var(--primary-foreground)" />
      <circle cx="9.5" cy="11" r="0.65" fill="var(--foreground)" />
    </svg>
  );
}

function MakkiIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 32" fill="none" aria-hidden="true" className={className}>
      <ellipse cx="14" cy="12.5" rx="5.5" ry="9.5" fill="var(--makki)" />
      <path
        d="M10.5 7.5H17.5M9.5 11H18.5M9.8 14.5H18.2M11 18H17M14 4V20.5"
        stroke="var(--brand-ring)"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M14 29C9.5 27.5 6 22 6.5 14.5C9.5 17.2 11.8 20.8 13.8 25.2C14.2 26.4 14.3 27.8 14 29Z"
        fill="var(--makki-husk)"
      />
      <path
        d="M14 29C18.5 27.5 22 22 21.5 14.5C18.5 17.2 16.2 20.8 14.2 25.2C13.8 26.4 13.7 27.8 14 29Z"
        fill="var(--makki-husk)"
        opacity="0.88"
      />
      <path d="M12 27.5H16V30.2C16 30.8 15.1 31.2 14 31.2C12.9 31.2 12 30.8 12 30.2V27.5Z" fill="var(--makki-husk)" />
    </svg>
  );
}

interface BrandMarkProps {
  size?: "header" | "footer";
  subtitle?: string;
}

export function BrandMark({ size = "header", subtitle }: BrandMarkProps) {
  const isFooter = size === "footer";

  return (
    <div className="flex items-center gap-3">
      <img
        src={chefsEmblemImg}
        alt="Punjabi female chef and Bengali male chef emblem for Maach & Makki"
        width={816}
        height={816}
        className={
          isFooter
            ? "size-16 shrink-0 rounded-full object-cover ring-2 ring-brand-ring shadow-sm"
            : "size-12 shrink-0 rounded-full object-cover ring-2 ring-brand-ring shadow-sm sm:size-14"
        }
      />
      <div className="flex flex-col leading-tight">
        <span className="inline-flex flex-wrap items-center gap-1.5 font-display text-xl font-bold tracking-tight text-primary sm:text-2xl">
          <MaachIcon className="h-5 w-7 shrink-0 sm:h-5 sm:w-8" />
          <span>Maach</span>
          <span className="text-brand-ring">&amp;</span>
          <span>Makki</span>
          <MakkiIcon className="h-6 w-5 shrink-0 sm:h-6 sm:w-5" />
        </span>
        {subtitle && (
          <span className="text-xs font-medium text-muted-foreground sm:text-sm">{subtitle}</span>
        )}
      </div>
    </div>
  );
}