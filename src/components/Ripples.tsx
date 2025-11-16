import { useEffect, useRef, useState } from 'react';

type Ripple = {
  id: number;
  x: number;
  y: number;
  size: number;
};

export default function Ripples() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    function addRipple(x: number, y: number) {
      const maxDim = Math.max(window.innerWidth, window.innerHeight);
      const size = Math.ceil(maxDim * 0.85); // reduced overall ripple size
      const id = ++idRef.current;

      setRipples((prev) => {
        const next = [...prev, { id, x, y, size }];
        // cap number of concurrent ripples to avoid DOM bloat
        return next.slice(-8);
      });

      // remove after animation ends (keep in sync with CSS duration)
      const DURATION = 1400; // ms (slower wave)
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, DURATION + 50);
    }

    const onPointer = (e: PointerEvent | MouseEvent | TouchEvent) => {
      let x = 0, y = 0;
      if (e instanceof TouchEvent) {
        const t = e.touches[0] || e.changedTouches[0];
        if (!t) return;
        x = t.clientX; y = t.clientY;
      } else if ('clientX' in e) {
        x = (e as MouseEvent).clientX; y = (e as MouseEvent).clientY;
      }
      addRipple(x, y);
    };

    // Use pointerdown for both mouse/touch; also listen to touchstart for older devices
    window.addEventListener('pointerdown', onPointer as any, { passive: true });
    window.addEventListener('touchstart', onPointer as any, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', onPointer as any);
      window.removeEventListener('touchstart', onPointer as any);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5]"
      style={{ contain: 'layout paint' }}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="ripple"
          style={{
            left: r.x - r.size / 2,
            top: r.y - r.size / 2,
            width: r.size,
            height: r.size,
          }}
        >
          <span className="ripple-swell" />
          <span className="ripple-ring" />
          <span className="ripple-ring-2" />
        </span>
      ))}
    </div>
  );
}
