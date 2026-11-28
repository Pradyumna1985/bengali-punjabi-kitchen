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
      <svg viewBox="0 0 76 84" fill="none" role="presentation">
        <defs>
          <linearGradient id="cursor-handi-body" x1="20" y1="28" x2="49" y2="53" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--accent)" />
            <stop offset="0.55" stopColor="var(--primary)" />
            <stop offset="1" stopColor="var(--foreground)" />
          </linearGradient>
          <linearGradient id="cursor-chulha-body" x1="17" y1="52" x2="56" y2="76" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--brand-ring)" />
            <stop offset="1" stopColor="var(--primary)" />
          </linearGradient>
        </defs>

        <g className="cursor-cooker__steam" stroke="var(--muted-foreground)" strokeWidth="2" strokeLinecap="round">
          <path className="cursor-cooker__steam-wisp cursor-cooker__steam-wisp--one" d="M27 24C21 19 30 15 25 9C23 6 24 4 26 2" />
          <path className="cursor-cooker__steam-wisp cursor-cooker__steam-wisp--two" d="M37 22C32 17 42 13 37 7C35 5 36 3 38 1" />
          <path className="cursor-cooker__steam-wisp cursor-cooker__steam-wisp--three" d="M47 24C43 20 51 17 48 12" />
        </g>

        <g className="cursor-cooker__utensil" stroke="var(--foreground)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M51 48L62 23" stroke="var(--brand-ring)" strokeWidth="3.4" />
          <ellipse cx="64" cy="18" rx="4.5" ry="7" transform="rotate(20 64 18)" fill="var(--brand-ring)" />
          <path d="M62 14C64 16 65 19 65 22" stroke="var(--accent)" strokeWidth="1.1" opacity="0.75" />
        </g>

        <g className="cursor-cooker__pot" stroke="var(--foreground)" strokeWidth="1.8" strokeLinejoin="round">
          <path d="M17 30C17 27 25 25 36 25C47 25 55 27 55 30L52 33H20L17 30Z" fill="var(--brand-ring)" />
          <ellipse cx="36" cy="29" rx="16" ry="3.5" fill="var(--foreground)" />
          <path d="M20 33C19 40 21 48 28 51C33 53 41 53 46 51C52 48 54 40 52 33C44 36 28 36 20 33Z" fill="url(#cursor-handi-body)" />
          <path d="M24 37C23 42 25 46 28 48" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
          <path d="M25 47C31 50 42 50 48 46" stroke="var(--brand-ring)" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
        </g>

        <g className="cursor-cooker__chulha" stroke="var(--foreground)" strokeWidth="1.8" strokeLinejoin="round">
          <path d="M16 51H57L60 57H13L16 51Z" fill="var(--brand-ring)" />
          <path d="M15 57H58L55 76H18L15 57Z" fill="url(#cursor-chulha-body)" />
          <path d="M27 76V67C27 61 31 58 36.5 58C42 58 46 61 46 67V76H27Z" fill="var(--foreground)" />
          <path d="M20 62H24M49 62H54M21 66H24" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
          <path d="M30 73L43 68M31 68L44 74" stroke="var(--brand-ring)" strokeWidth="3" strokeLinecap="round" />
          <path className="cursor-cooker__flame" d="M36 72C31 68 35 65 37 61C38 65 43 67 40 71C39 73 37 74 36 72Z" fill="var(--makki)" stroke="var(--accent)" strokeWidth="1" />
          <path d="M18 76H14M55 76H59" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
