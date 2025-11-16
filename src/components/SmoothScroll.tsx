import { useEffect, useRef } from 'react';

// Lightweight smooth scrolling for desktop wheel/trackpad.
// Skips mobile and respects prefers-reduced-motion.
export default function SmoothScroll() {
  const rafRef = useRef<number | null>(null);
  const currentRef = useRef<number>(0);
  const targetRef = useRef<number>(0);
  const runningRef = useRef(false);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches; // desktop mice/trackpads
    if (isReduced || !isFinePointer) return;

    currentRef.current = window.scrollY;
    targetRef.current = window.scrollY;

    const ease = 0.12; // lower = smoother/longer
    const step = () => {
      const current = currentRef.current;
      const target = targetRef.current;
      const diff = target - current;
      if (Math.abs(diff) < 0.5) {
        currentRef.current = target;
        window.scrollTo(0, target);
        runningRef.current = false;
        rafRef.current = null;
        return;
      }
      const next = current + diff * ease;
      currentRef.current = next;
      window.scrollTo(0, next);
      rafRef.current = requestAnimationFrame(step);
    };

    const start = () => {
      if (runningRef.current) return;
      runningRef.current = true;
      rafRef.current = requestAnimationFrame(step);
    };

    const onWheel = (e: WheelEvent) => {
      // Allow horizontal scroll and modifier scrolls
      if (e.defaultPrevented) return;
      // Ignore if inside an element with own scroll (like modals with overflow)
      let el = e.target as HTMLElement | null;
      while (el && el !== document.body) {
        const style = getComputedStyle(el);
        const canScrollY = el.scrollHeight > el.clientHeight && /(auto|scroll)/.test(style.overflowY);
        if (canScrollY) return; // let inner scrollers handle it
        el = el.parentElement;
      }
      e.preventDefault();
      targetRef.current = Math.max(0, Math.min(document.body.scrollHeight - window.innerHeight, targetRef.current + e.deltaY));
      start();
    };

    const onResize = () => {
      // Clamp target within new bounds
      targetRef.current = Math.max(0, Math.min(document.body.scrollHeight - window.innerHeight, targetRef.current));
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('wheel', onWheel as any);
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return null;
}
