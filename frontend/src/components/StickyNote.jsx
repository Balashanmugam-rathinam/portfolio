import { motion } from 'framer-motion';

export default function StickyNote({ title, lines, quote, color = 'orange', x, y, rotate = -2, testId }) {
  const palette =
    color === 'orange'
      ? { bg: 'rgba(120,53,15,0.92)', border: '#f97316', title: '#fdba74' }
      : { bg: 'rgba(69,10,10,0.92)', border: '#e11d48', title: '#fda4af' };

  return (
    <motion.div
      data-testid={testId}
      data-sense
      drag
      dragMomentum={false}
      className="absolute z-[500] w-44 p-3 select-none"
      style={{
        left: x,
        top: y,
        rotate,
        background: palette.bg,
        border: `2px solid ${palette.border}`,
        boxShadow: '5px 5px 0 rgba(0,0,0,0.5)',
        cursor: 'grab',
        touchAction: 'none',
      }}
      whileDrag={{ scale: 1.04, rotate: 0 }}
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="w-2.5 h-2.5 rounded-full bg-slate-300/70 absolute -top-1.5 left-1/2 -translate-x-1/2 border border-black/50" />
      {title && (
        <div className="font-pixel text-[8px] mb-2" style={{ color: palette.title }}>
          {title}
        </div>
      )}
      <div className="text-[11px] leading-5 text-slate-100">
        {quote ? <em>"{quote}"</em> : lines.map((l) => <div key={l}>{l}</div>)}
      </div>
    </motion.div>
  );
}
