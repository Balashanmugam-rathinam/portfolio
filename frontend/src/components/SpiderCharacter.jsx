import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PixelArt from '@/components/PixelArt';
import { usePrefersReducedMotion } from '@/hooks/hooks';

export default function SpiderCharacter({ play }) {
  const [hover, setHover] = useState(false);
  const [bubbleStep, setBubbleStep] = useState(0);
  const [webShot, setWebShot] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!hover) { setBubbleStep(0); return; }
    const t = setTimeout(() => setBubbleStep(1), 1100);
    return () => clearTimeout(t);
  }, [hover]);

  useEffect(() => {
    if (reduced) return;
    const shoot = () => {
      setWebShot(true);
      setTimeout(() => setWebShot(false), 700);
    };
    const interval = setInterval(shoot, 9000);
    return () => clearInterval(interval);
  }, [reduced]);

  return (
    <div
      className="fixed z-[700] hidden lg:block"
      style={{ right: '6%', bottom: 108 }}
      data-testid="spider-character"
    >
      {/* rooftop ledge */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-[-14px] w-[190px] h-[16px] bg-[#0a0f1e] border-t-2 border-slate-700"
        style={{ boxShadow: '0 6px 0 rgba(0,0,0,0.6)' }}
      />
      {/* water tower silhouette */}
      <svg className="absolute -left-24 bottom-0 w-16 h-24 opacity-80" viewBox="0 0 40 60" aria-hidden="true">
        <rect x="8" y="8" width="24" height="18" fill="#0a0f1e" />
        <polygon points="8,8 20,0 32,8" fill="#0a0f1e" />
        <line x1="12" y1="26" x2="8" y2="60" stroke="#0a0f1e" strokeWidth="3" />
        <line x1="28" y1="26" x2="32" y2="60" stroke="#0a0f1e" strokeWidth="3" />
        <line x1="10" y1="40" x2="30" y2="40" stroke="#0a0f1e" strokeWidth="2" />
      </svg>

      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6 }}
            className="absolute -top-16 left-1/2 -translate-x-1/2 pixel-panel px-3 py-2 whitespace-nowrap"
            data-testid="character-bubble"
          >
            <span className="font-pixel text-[8px] text-white">
              {bubbleStep === 0 ? "Hey. I'm Bala." : 'Welcome to my web.'}
            </span>
            <span className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-2.5 h-2.5 bg-[#0f172a] border-b-2 border-r-2 border-white/15 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {webShot && (
        <svg className="absolute -left-28 top-2 w-28 h-20" viewBox="0 0 100 60" aria-hidden="true">
          <motion.path
            d="M100 30 Q50 0 0 18"
            stroke="#f8fafc"
            strokeWidth="1.4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.35 }}
          />
          <motion.circle cx="0" cy="18" r="3" fill="#f8fafc" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} />
        </svg>
      )}

      <motion.div
        className={reduced ? '' : 'char-bob'}
        onMouseEnter={() => { setHover(true); play('hover'); }}
        onMouseLeave={() => setHover(false)}
        whileHover={{ scale: 1.05 }}
        data-sense
        role="img"
        aria-label="Pixel art character of Bala in a Spider-Man inspired suit"
      >
        <PixelArt name="character" scale={3.4} className="pixel-shadow-sm" />
      </motion.div>
    </div>
  );
}
