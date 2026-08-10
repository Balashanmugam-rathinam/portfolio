import { useMemo, useState, useEffect } from 'react';
import { usePrefersReducedMotion } from '@/hooks/hooks';

function mulberry(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const WINDOW_COLORS = ['#f97316', '#facc15', '#f8fafc', '#38bdf8'];

function makeLayer(seed, count, minH, maxH, color, litRatio) {
  const rand = mulberry(seed);
  const buildings = [];
  let x = -2;
  while (x < 104) {
    const w = 3.5 + rand() * 5;
    const h = minH + rand() * (maxH - minH);
    const cols = Math.max(2, Math.floor(w * 1.4));
    const rows = Math.max(3, Math.floor(h / 4));
    const windows = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (rand() < litRatio) {
          windows.push({
            x: x + 0.5 + (c * (w - 1)) / cols,
            y: 100 - h + 1.5 + (r * (h - 3)) / rows,
            c: WINDOW_COLORS[Math.floor(rand() * WINDOW_COLORS.length)],
            flicker: rand() < 0.22,
            delay: (rand() * 8).toFixed(2),
          });
        }
      }
    }
    buildings.push({ x, w, h, windows, tower: rand() < 0.14 });
    x += w + 0.6;
  }
  return { buildings, color };
}

function SkylineLayer({ layer, opacity = 1 }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 w-full h-full"
      style={{ opacity }}
      aria-hidden="true"
    >
      {layer.buildings.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={100 - b.h} width={b.w} height={b.h} fill={layer.color} />
          {b.tower && (
            <rect x={b.x + b.w * 0.3} y={100 - b.h - 5} width={b.w * 0.4} height={5} fill={layer.color} />
          )}
          {b.windows.map((win, j) => (
            <rect
              key={j}
              x={win.x}
              y={win.y}
              width={0.45}
              height={0.8}
              fill={win.c}
              opacity={0.85}
              className={win.flicker ? 'win-flicker' : ''}
              style={win.flicker ? { animationDelay: `${win.delay}s` } : undefined}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

export default function CityBackdrop({ interactive = true, bigMoon = false }) {
  const reduced = usePrefersReducedMotion();
  const [par, setPar] = useState({ x: 0, y: 0 });

  const far = useMemo(() => makeLayer(7, 0, 18, 42, '#0a0f1e', 0), []);
  const mid = useMemo(() => makeLayer(23, 0, 12, 32, '#0f172a', 0.16), []);
  const near = useMemo(() => makeLayer(51, 0, 8, 24, '#111c33', 0.3), []);

  useEffect(() => {
    if (!interactive || reduced) return;
    const onMove = (e) => {
      setPar({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [interactive, reduced]);

  const shift = (f) => ({ transform: `translate(${par.x * f}px, ${par.y * f * 0.5}px)` });

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* night sky */}
      <div className="absolute inset-0" style={{ background: '#050810' }} />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 70% 12%, rgba(30,58,138,0.35) 0%, transparent 55%)' }}
      />
      {/* moon */}
      <div className="absolute" style={{ right: '12%', top: bigMoon ? '8%' : '6%', ...shift(4) }}>
        <div
          className="rounded-full"
          style={{
            width: bigMoon ? 110 : 72,
            height: bigMoon ? 110 : 72,
            background: '#f8fafc',
            boxShadow: '0 0 60px 18px rgba(248,250,252,0.18), 0 0 120px 40px rgba(148,163,184,0.1)',
          }}
        />
        <div className="absolute rounded-full bg-slate-300" style={{ width: 12, height: 12, left: '22%', top: '30%', opacity: 0.5 }} />
        <div className="absolute rounded-full bg-slate-300" style={{ width: 8, height: 8, left: '58%', top: '60%', opacity: 0.4 }} />
      </div>
      {/* skyline layers */}
      <div className="absolute inset-0" style={shift(2)}>
        <SkylineLayer layer={far} />
      </div>
      <div className="absolute inset-0" style={shift(5)}>
        <SkylineLayer layer={mid} />
      </div>
      <div className="absolute inset-0" style={shift(9)}>
        <SkylineLayer layer={near} />
      </div>
      {/* street-level glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{ background: 'linear-gradient(to top, rgba(249,115,22,0.12), transparent)' }}
      />
      {/* fog */}
      <div
        className="fog-layer absolute bottom-[18%] left-[-10%] right-[-10%] h-24"
        style={{ background: 'linear-gradient(to right, transparent, rgba(148,163,184,0.06), transparent)' }}
      />
      <div
        className="fog-layer absolute bottom-[36%] left-[-10%] right-[-10%] h-16"
        style={{ animationDelay: '-12s', background: 'linear-gradient(to right, transparent, rgba(148,163,184,0.05), transparent)' }}
      />
      {/* web strands in corners */}
      <svg className="absolute top-0 left-0 w-40 h-40 opacity-25" viewBox="0 0 100 100" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <line key={i} x1="0" y1="0" x2={100 - i * 12} y2={i * 20} stroke="#f8fafc" strokeWidth="0.4" />
        ))}
        <path d="M10 4 Q30 20 20 40" stroke="#f8fafc" strokeWidth="0.4" fill="none" />
        <path d="M30 6 Q55 30 40 62" stroke="#f8fafc" strokeWidth="0.4" fill="none" />
      </svg>
      <svg className="absolute top-0 right-0 w-40 h-40 opacity-25 -scale-x-100" viewBox="0 0 100 100" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <line key={i} x1="0" y1="0" x2={100 - i * 12} y2={i * 20} stroke="#f8fafc" strokeWidth="0.4" />
        ))}
        <path d="M10 4 Q30 20 20 40" stroke="#f8fafc" strokeWidth="0.4" fill="none" />
        <path d="M30 6 Q55 30 40 62" stroke="#f8fafc" strokeWidth="0.4" fill="none" />
      </svg>
      {/* grain */}
      <div className="noise-overlay" />
    </div>
  );
}
