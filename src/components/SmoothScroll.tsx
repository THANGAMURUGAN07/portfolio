import { useEffect, useRef } from 'react';

// Lightweight smooth scrolling for desktop wheel/trackpad.
// Skips mobile and respects prefers-reduced-motion.
export default function SmoothScroll() {
  const rafRef = useRef<number | null>(null);
  const currentRef = useRef<number>(0);
  const targetRef = useRef<number>(0);
  const runningRef = useRef(false);
  const lastTouchYRef = useRef<number | null>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const hasFine = window.matchMedia('(pointer: fine)').matches; // desktop mice/trackpads
    const hasCoarse = window.matchMedia('(pointer: coarse)').matches; // touch devices

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

    // Touch handling for mobile (coarse pointers)
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      // If starting inside an inner scrollable, let it handle scroll
      let el = e.target as HTMLElement | null;
      while (el && el !== document.body) {
        const style = getComputedStyle(el);
        const canScrollY = el.scrollHeight > el.clientHeight && /(auto|scroll)/.test(style.overflowY);
        if (canScrollY) {
          lastTouchYRef.current = null;
          return;
        }
        el = el.parentElement;
      }
      lastTouchYRef.current = e.touches[0].clientY;
      currentRef.current = window.scrollY;
      targetRef.current = window.scrollY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;

      // If inside inner scrollable, don't hijack
      let el = e.target as HTMLElement | null;
      while (el && el !== document.body) {
        const style = getComputedStyle(el);
        const canScrollY = el.scrollHeight > el.clientHeight && /(auto|scroll)/.test(style.overflowY);
        if (canScrollY) return; // let native element scroll
        el = el.parentElement;
      }

      const y = e.touches[0].clientY;
      if (lastTouchYRef.current == null) {
        lastTouchYRef.current = y;
        return;
      }
      const dy = lastTouchYRef.current - y; // swipe up => positive dy
      lastTouchYRef.current = y;
      e.preventDefault();
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      targetRef.current = Math.max(0, Math.min(maxScroll, targetRef.current + dy));
      start();
    };

    const onTouchEnd = () => {
      lastTouchYRef.current = null;
      // momentum-lite: allow easing to settle to current target
      if (!runningRef.current) start();
    };

    const onResize = () => {
      // Clamp target within new bounds
      targetRef.current = Math.max(0, Math.min(document.body.scrollHeight - window.innerHeight, targetRef.current));
    };

    if (hasFine) {
      window.addEventListener('wheel', onWheel, { passive: false });
    }
    if (hasCoarse) {
      window.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onTouchEnd, { passive: true });
      window.addEventListener('touchcancel', onTouchEnd, { passive: true });
    }
    window.addEventListener('resize', onResize);
    return () => {
      if (hasFine) window.removeEventListener('wheel', onWheel as any);
      if (hasCoarse) {
        window.removeEventListener('touchstart', onTouchStart as any);
        window.removeEventListener('touchmove', onTouchMove as any);
        window.removeEventListener('touchend', onTouchEnd as any);
        window.removeEventListener('touchcancel', onTouchEnd as any);
      }
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return null;
}
