import { useEffect, useState } from 'react';

export default function SectionTransitions() {
  const [active, setActive] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section')) as HTMLElement[];
    if (sections.length === 0) return;

    const onScroll = () => {
      const y = window.scrollY;
      setDirection(y > lastY ? 'down' : 'up');
      setLastY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Trigger a brief wipe overlay on section enter
            setActive(true);
            const t = setTimeout(() => setActive(false), 700);
            return () => clearTimeout(t);
          }
        }
      },
      { threshold: 0.6 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, [lastY]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40">
      {active && (
        <div className={`wipe-overlay ${direction === 'down' ? 'wipe-down' : 'wipe-up'}`}></div>
      )}
    </div>
  );
}
