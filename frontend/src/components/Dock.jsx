import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import PixelArt from '@/components/PixelArt';
import { SOCIALS } from '@/data/content';

function DockIcon({ item, mouseX, onAction, play }) {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);

  let scale = 1;
  if (mouseX !== null && ref.current) {
    const rect = ref.current.getBoundingClientRect();
    const dist = Math.abs(mouseX - (rect.left + rect.width / 2));
    scale = 1 + Math.max(0, 0.55 * (1 - dist / 130));
  }

  return (
    <motion.button
      ref={ref}
      data-testid={`dock-icon-${item.id}`}
      data-sense
      className="relative flex flex-col items-center"
      style={{ transformOrigin: 'bottom center' }}
      animate={{ scale }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      whileTap={{ y: -10, transition: { type: 'spring', stiffness: 600, damping: 12 } }}
      onMouseEnter={() => { setHover(true); play('hover'); }}
      onMouseLeave={() => setHover(false)}
      onClick={() => { play('click'); onAction(item); }}
      aria-label={item.label}
    >
      {hover && (
        <span className="absolute -top-9 font-pixel text-[8px] bg-slate-900 border border-white/20 px-2 py-1 whitespace-nowrap z-10">
          {item.label}
        </span>
      )}
      <span
        className="p-1.5 border-2 border-white/10 bg-slate-900/70"
        style={{ boxShadow: hover ? '0 0 16px rgba(255,0,60,0.55)' : '3px 3px 0 rgba(0,0,0,0.5)' }}
      >
        <PixelArt name={item.icon} scale={2.9} />
      </span>
      {item.active && <span className="w-1.5 h-1.5 bg-rose-500 mt-1" />}
    </motion.button>
  );
}

export default function Dock({ openApp, play, openKeys }) {
  const [mouseX, setMouseX] = useState(null);

  const items = [
    { id: 'finder', icon: 'finder', label: 'Finder', app: 'about' },
    { id: 'projects', icon: 'folder', label: 'Projects', app: 'projects' },
    { id: 'terminal', icon: 'terminal', label: 'Terminal', app: 'terminal' },
    { id: 'suits', icon: 'suit', label: 'Suit Database', app: 'suits' },
    { id: 'github', icon: 'github', label: 'GitHub', url: SOCIALS.github.url },
    { id: 'linkedin', icon: 'linkedin', label: 'LinkedIn', url: SOCIALS.linkedin.url },
    { id: 'instagram', icon: 'instagram', label: 'Instagram', url: SOCIALS.instagram.url },
    { id: 'resume', icon: 'resume', label: 'Resume', app: 'resume' },
    { id: 'contact', icon: 'contact', label: 'Contact', app: 'contact' },
    { id: 'trash', icon: 'trash', label: 'Rejected Concepts', app: 'trash' },
  ];

  const onAction = (item) => {
    if (item.url) window.open(item.url, '_blank', 'noopener,noreferrer');
    else openApp(item.app);
  };

  return (
    <nav
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[800]"
      data-testid="dock"
      aria-label="Application dock"
    >
      <svg className="absolute -top-6 left-1/2 -translate-x-1/2 w-64 h-6 opacity-30" viewBox="0 0 200 20" aria-hidden="true">
        <path d="M0 20 Q50 0 100 14 T200 20" stroke="#f8fafc" strokeWidth="0.6" fill="none" />
        <path d="M20 20 Q70 6 120 16 T200 18" stroke="#f8fafc" strokeWidth="0.4" fill="none" />
      </svg>
      <div
        className="flex items-end gap-1.5 sm:gap-2 px-3 py-2 border-2 border-white/15"
        style={{ background: 'rgba(10,10,10,0.72)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: '6px 6px 0 rgba(0,0,0,0.5)' }}
        onMouseMove={(e) => setMouseX(e.clientX)}
        onMouseLeave={() => setMouseX(null)}
      >
        {items.map((item) => (
          <DockIcon
            key={item.id}
            item={{ ...item, active: item.app && openKeys.includes(item.app) }}
            mouseX={mouseX}
            onAction={onAction}
            play={play}
          />
        ))}
      </div>
    </nav>
  );
}
