import { motion } from 'framer-motion';
import PixelArt from '@/components/PixelArt';

export default function DesktopIcon({ id, icon, label, selected, onSelect, onOpen, play }) {
  return (
    <motion.button
      data-testid={`desktop-icon-${id}`}
      data-sense
      className="group flex flex-col items-center gap-2 w-[104px] p-2 focus:outline-none"
      onClick={(e) => { e.stopPropagation(); onSelect(id); play('click'); }}
      onDoubleClick={() => { play('open'); onOpen(id); }}
      onKeyDown={(e) => { if (e.key === 'Enter') { play('open'); onOpen(id); } }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      aria-label={`${label}. Double click to open.`}
    >
      <span
        className={`relative p-2 border-2 transition-colors ${
          selected ? 'border-rose-500 bg-rose-950/50' : 'border-transparent group-hover:border-blue-500/60 group-hover:bg-slate-800/50'
        }`}
      >
        <PixelArt name={icon} scale={3.4} className="pixel-shadow-sm" />
        <svg
          className="absolute -inset-3 opacity-0 group-hover:opacity-60 pointer-events-none"
          viewBox="0 0 60 60"
          style={{ animation: 'none' }}
          aria-hidden="true"
        >
          {[...Array(6)].map((_, i) => {
            const a = (Math.PI / 3) * i;
            return <line key={i} x1="30" y1="30" x2={30 + 28 * Math.cos(a)} y2={30 + 28 * Math.sin(a)} stroke="#f8fafc" strokeWidth="0.5" />;
          })}
          <circle cx="30" cy="30" r="14" fill="none" stroke="#f8fafc" strokeWidth="0.4" />
          <circle cx="30" cy="30" r="24" fill="none" stroke="#f8fafc" strokeWidth="0.4" />
        </svg>
      </span>
      <span
        className={`font-pixel text-[7px] leading-3 text-center px-1 py-0.5 max-w-[100px] break-words transition-colors ${
          selected ? 'bg-rose-700 text-white' : 'text-slate-200 group-hover:text-white'
        }`}
        style={{ textShadow: '1px 1px 0 #000' }}
      >
        {label}
      </span>
    </motion.button>
  );
}
