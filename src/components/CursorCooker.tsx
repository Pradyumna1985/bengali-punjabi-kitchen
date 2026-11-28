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
      <svg viewBox="0 0 76 84" fill="none" role="presentation" stroke="var(--cursor-sketch)">
        <g className="cursor-cooker__steam" strokeWidth="1.5" strokeLinecap="round">
          <path className="cursor-cooker__steam-wisp cursor-cooker__steam-wisp--one" d="M27 24C21 19 30 15 25 9C23 6 24 4 26 2" />
          <path className="cursor-cooker__steam-wisp cursor-cooker__steam-wisp--two" d="M37 22C32 17 42 13 37 7C35 5 36 3 38 1" />
          <path className="cursor-cooker__steam-wisp cursor-cooker__steam-wisp--three" d="M47 24C43 20 51 17 48 12" />
        </g>

        <g className="cursor-cooker__utensil" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M51 48L62 23" />
          <ellipse cx="64" cy="18" rx="4.5" ry="7" transform="rotate(20 64 18)" />
          <path className="cursor-cooker__faint" d="M61.5 14.5C63.5 16.5 64.6 19 64.8 22" strokeWidth="1" />
        </g>

        <g className="cursor-cooker__pot" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 30C17 27 25 25 36 25C47 25 55 27 55 30L52 33H20L17 30Z" />
          <ellipse cx="36" cy="29" rx="16" ry="3.5" />
          <path d="M20 33C19 40 21 48 28 51C33 53 41 53 46 51C52 48 54 40 52 33C44 36 28 36 20 33Z" />
          <path className="cursor-cooker__faint" d="M24 37C23 42 25 46 28 48" strokeWidth="1.1" />
          <path className="cursor-cooker__faint" d="M25 47C31 50 42 50 48 46" strokeWidth="1.1" />
          <path className="cursor-cooker__hatch" d="M42 39L45 43M45 37L48 41" strokeWidth="0.9" />
        </g>

        <g className="cursor-cooker__chulha" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 51H57L60 57H13L16 51Z" />
          <path d="M15 57H58L55 76H18L15 57Z" />
          <path d="M27 76V67C27 61 31 58 36.5 58C42 58 46 61 46 67V76" />
          <path className="cursor-cooker__faint" d="M20 62H24M49 62H54M21 66H24" strokeWidth="1.1" />
          <rect x="28.5" y="70" width="15" height="4.2" rx="2.1" transform="rotate(-6 36 72.1)" />
          <rect x="29.5" y="65.6" width="14" height="4" rx="2" transform="rotate(5 36.5 67.6)" />
          <path className="cursor-cooker__flame" d="M36 65C31.5 61.5 35 58.5 37 55C38 58.5 42.5 60.5 40 64C39 65.8 37 66.6 36 65Z" strokeWidth="1.3" />
          <path className="cursor-cooker__faint" d="M36.5 62.5C35.5 61 36 59.8 36.8 58.5" strokeWidth="0.9" />
          <path d="M18 76H14M55 76H59" />
        </g>
      </svg>
    </div>
  );
}
