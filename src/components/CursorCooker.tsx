import { useEffect, useRef } from "react";

const FOLLOWER_SIZE = 68;
const POINTER_OFFSET = 22;

export function CursorCooker() {
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine) and (hover: hover)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const follower = followerRef.current;

    if (!follower || !finePointer.matches || reducedMotion.matches) return;

    let frame = 0;
    let visible = false;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;
      follower.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frame = window.requestAnimationFrame(render);
    };

    const moveFollower = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      const placeLeft = event.clientX > window.innerWidth - FOLLOWER_SIZE - POINTER_OFFSET;
      const placeAbove = event.clientY > window.innerHeight - FOLLOWER_SIZE - POINTER_OFFSET;
      targetX = event.clientX + (placeLeft ? -FOLLOWER_SIZE - 12 : POINTER_OFFSET);
      targetY = event.clientY + (placeAbove ? -FOLLOWER_SIZE - 12 : POINTER_OFFSET);

      if (!visible) {
        currentX = targetX;
        currentY = targetY;
        visible = true;
        follower.dataset["visible"] = "true";
        frame = window.requestAnimationFrame(render);
      }
    };

    const hideFollower = () => {
      visible = false;
      follower.dataset["visible"] = "false";
      window.cancelAnimationFrame(frame);
    };

    window.addEventListener("pointermove", moveFollower, { passive: true });
    document.documentElement.addEventListener("mouseleave", hideFollower);
    window.addEventListener("blur", hideFollower);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", moveFollower);
      document.documentElement.removeEventListener("mouseleave", hideFollower);
      window.removeEventListener("blur", hideFollower);
    };
  }, []);

  return (
    <div ref={followerRef} className="cursor-cooker" data-visible="false" aria-hidden="true">
      <svg viewBox="0 0 76 80" fill="none" role="presentation">
        <defs>
          <linearGradient id="cursor-cooker-body" x1="18" y1="34" x2="52" y2="65" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--makki)" />
            <stop offset="1" stopColor="var(--accent)" />
          </linearGradient>
          <linearGradient id="cursor-cooker-lid" x1="17" y1="29" x2="52" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--card)" />
            <stop offset="1" stopColor="var(--brand-ring)" />
          </linearGradient>
        </defs>

        <g className="cursor-cooker__steam" stroke="var(--maach)" strokeWidth="2.2" strokeLinecap="round">
          <path className="cursor-cooker__steam-wisp cursor-cooker__steam-wisp--one" d="M26 24C20 19 30 15 25 9C23 6 24 4 26 2" />
          <path className="cursor-cooker__steam-wisp cursor-cooker__steam-wisp--two" d="M37 22C32 17 42 13 37 7C35 5 36 3 38 1" />
          <path className="cursor-cooker__steam-wisp cursor-cooker__steam-wisp--three" d="M47 24C43 20 51 17 48 12" />
        </g>

        <g className="cursor-cooker__utensil" stroke="var(--foreground)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M53 61L64 25" />
          <ellipse cx="65.5" cy="20" rx="4.5" ry="7" transform="rotate(18 65.5 20)" fill="var(--maach-accent)" />
          <path d="M63 17L67 23M65 15L68 20" stroke="var(--primary-foreground)" strokeWidth="1.2" />
        </g>

        <g className="cursor-cooker__pot" stroke="var(--foreground)" strokeWidth="2" strokeLinejoin="round">
          <path d="M15 40H9C6 40 6 46 10 46H16M53 40H59C63 40 63 46 59 46H53" fill="var(--primary)" />
          <path d="M15 38H54L51 59C50.5 63 47 66 43 66H26C22 66 18.5 63 18 59L15 38Z" fill="url(#cursor-cooker-body)" />
          <path d="M20 44L22 57C22.5 60 25 62 28 62" stroke="var(--primary-foreground)" strokeWidth="2.2" strokeLinecap="round" opacity="0.65" />
          <path d="M13 35C13 31 23 28 34 28C46 28 56 31 56 35V38H13V35Z" fill="url(#cursor-cooker-lid)" />
          <path d="M29 28V24H40V28" fill="var(--primary)" />
          <path d="M34 24V20H39" stroke="var(--foreground)" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="41" cy="20" r="2.5" fill="var(--primary)" stroke="none" />
          <path d="M27 66V69H23M43 66V69H47" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
