import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PixelArt from '@/components/PixelArt';

const BOOT_LINES = [
  'INITIALIZING...',
  'Loading New York...',
  'Connecting to network...',
  'Loading developer profile...',
  'Loading projects...',
  'Activating Spider-Sense...',
  'SYSTEM READY',
];

function WebSpinner() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60">
      {[8, 16, 24].map((r) => (
        <polygon
          key={r}
          points={Array.from({ length: 8 }, (_, i) => {
            const a = (Math.PI / 4) * i;
            return `${30 + r * Math.cos(a)},${30 + r * Math.sin(a)}`;
          }).join(' ')}
          fill="none"
          stroke="#f8fafc"
          strokeWidth="0.8"
          opacity="0.7"
        />
      ))}

      {Array.from({ length: 8 }, (_, i) => {
        const a = (Math.PI / 4) * i;
        return (
          <line
            key={i}
            x1="30"
            y1="30"
            x2={30 + 28 * Math.cos(a)}
            y2={30 + 28 * Math.sin(a)}
            stroke="#f8fafc"
            strokeWidth="0.6"
            opacity="0.6"
          />
        );
      })}
    </svg>
  );
}

export default function BootScreen({ phase, setPhase, play }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const timers = useRef([]);

  useEffect(() => {
    if (phase !== 'boot') return;

    play('boot');

    BOOT_LINES.forEach((_, i) => {
      timers.current.push(
        setTimeout(() => {
          setLineIdx(i + 1);
          play('type');
        }, 450 * (i + 1))
      );
    });

    timers.current.push(
      setTimeout(() => {
        setShowTitle(true);
        play('sense');
      }, 450 * BOOT_LINES.length + 700)
    );

    timers.current.push(
      setTimeout(
        () => setPhase('ready'),
        450 * BOOT_LINES.length + 3200
      )
    );

    // Only change made to fix the Vercel ESLint error
    const currentTimers = timers.current;

    return () => currentTimers.forEach(clearTimeout);
  }, [phase, setPhase, play]);

  const skip = () => {
    timers.current.forEach(clearTimeout);
    setPhase('ready');
  };

  return (
    <AnimatePresence>
      <motion.div
        key="boot"
        className="absolute inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center gap-8 px-6"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        data-testid="boot-screen"
        onClick={phase === 'boot' ? skip : undefined}
      >
        {phase === 'off' && (
          <button
            data-testid="power-on-btn"
            onClick={() => setPhase('boot')}
            className="flex flex-col items-center gap-8 group"
          >
            <PixelArt
              name="spider"
              scale={5}
              tint={{ K: '#e11d48', W: '#f8fafc' }}
              className="pixel-shadow-sm group-hover:scale-110 transition-transform"
              style={{
                filter:
                  'drop-shadow(0 0 14px rgba(225,29,72,0.5))',
              }}
            />
            BALA SYSTEM
            CLICK TO POWER ON
          </button>
        )}

        {phase === 'boot' && !showTitle && (
          <div className="flex flex-col items-center gap-8 w-full max-w-md">
            <WebSpinner />

            <div className="font-pixel text-xs text-white">
              BALA SYSTEM
            </div>

            <div className="w-full text-left space-y-2 min-h-[170px]">
              {BOOT_LINES.slice(0, lineIdx).map((l, i) => (
                <motion.div
                  key={l}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`text-xs ${
                    i === BOOT_LINES.length - 1
                      ? 'text-green-500 font-pixel text-[10px]'
                      : 'text-slate-400'
                  }`}
                >
                  {i < BOOT_LINES.length - 1 ? `> ${l}` : `> ${l}`}
                </motion.div>
              ))}
            </div>

            <div className="w-full h-3 border-2 border-slate-600 p-[2px]">
              <div
                className="h-full bg-rose-600 transition-all duration-300"
                style={{
                  width: `${(lineIdx / BOOT_LINES.length) * 100}%`,
                }}
              />
            </div>

            <div className="font-pixel text-[8px] text-slate-600">
              CLICK TO SKIP
            </div>
          </div>
        )}

        {phase === 'boot' && showTitle && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-6 text-center"
            data-testid="boot-title"
          >
            <PixelArt
              name="spider"
              scale={4}
              tint={{ K: '#e11d48', W: '#f8fafc' }}
              className="pixel-shadow-sm"
              style={{
                filter:
                  'drop-shadow(0 0 12px rgba(225,29,72,0.45))',
              }}
            />

            <h1
              className="font-pixel text-2xl sm:text-4xl text-white"
              style={{
                textShadow: '4px 4px 0 #9f1239',
              }}
            >
              BRAND NEW DAY
            </h1>

            <div className="font-pixel text-[9px] sm:text-[10px] text-slate-400 leading-6">
              <div>A NEW DAY.</div>
              <div>A NEW MISSION.</div>
              <div className="text-rose-500">
                A NEW DEVELOPER.
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}