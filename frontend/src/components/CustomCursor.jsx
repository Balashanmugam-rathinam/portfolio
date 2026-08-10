import { useState, useEffect, useRef } from 'react';
import PixelArt from '@/components/PixelArt';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [mode, setMode] = useState('normal');
  const [bursts, setBursts] = useState([]);
  const idRef = useRef(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => {
      const interactive = e.target.closest('a, button, input, textarea, [data-sense], [role="button"]');
      setMode(interactive ? 'hover' : 'normal');
    };
    const down = (e) => {
      const id = ++idRef.current;
      setBursts((b) => [...b, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 500);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mousedown', down);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mousedown', down);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        className="fixed z-[99998] pointer-events-none"
        style={{ left: pos.x, top: pos.y, transform: 'translate(-30%, -30%)' }}
        data-testid="custom-cursor"
        aria-hidden="true"
      >
        {mode === 'hover' ? (
          <svg width="38" height="38" viewBox="0 0 30 30" className="web-pulse" style={{ filter: 'drop-shadow(0 0 6px rgba(255,0,60,0.9))' }}>
            <circle cx="15" cy="15" r="11" fill="none" stroke="#ff003c" strokeWidth="1.8" />
            <circle cx="15" cy="15" r="5" fill="none" stroke="#f8fafc" strokeWidth="1.2" />
            <line x1="15" y1="0" x2="15" y2="30" stroke="#f8fafc" strokeWidth="0.8" />
            <line x1="0" y1="15" x2="30" y2="15" stroke="#f8fafc" strokeWidth="0.8" />
          </svg>
        ) : (
          <PixelArt
            name="cursor"
            scale={3.4}
            tint={{ K: '#f8fafc', W: '#ff003c' }}
            style={{ filter: 'drop-shadow(0 0 5px rgba(255,0,60,0.9)) drop-shadow(2px 2px 0 rgba(0,0,0,0.9))' }}
          />
        )}
      </div>
      {bursts.map((b) => (
        <span key={b.id} className="click-burst" style={{ left: b.x, top: b.y }} />
      ))}
    </>
  );
}
