import { useMemo } from 'react';
import { usePrefersReducedMotion } from '@/hooks/hooks';

export default function RainEffect({ density = 70 }) {
  const reduced = usePrefersReducedMotion();
  const drops = useMemo(
    () =>
      Array.from({ length: density }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        height: 14 + Math.random() * 22,
        duration: 0.7 + Math.random() * 0.9,
        delay: Math.random() * 3,
        opacity: 0.25 + Math.random() * 0.4,
      })),
    [density]
  );

  if (reduced) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true" data-testid="rain-layer">
      {drops.map((d) => (
        <span
          key={d.id}
          className="rain-drop"
          style={{
            left: `${d.left}%`,
            height: d.height,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
            opacity: d.opacity,
          }}
        />
      ))}
    </div>
  );
}
