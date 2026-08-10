import { motion } from 'framer-motion';
import PixelArt from '@/components/PixelArt';
import CityBackdrop from '@/components/CityBackdrop';
import RainEffect from '@/components/RainEffect';

export default function RooftopMode({ onClose, rainOn, play }) {
  return (
    <motion.div
      data-testid="rooftop-mode"
      className="fixed inset-0 z-[950]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <CityBackdrop interactive bigMoon />
      {rainOn && <RainEffect density={50} />}

      {/* rooftop ledge */}
      <div className="absolute bottom-0 left-0 right-0 h-[16vh] bg-[#05070d] border-t-2 border-slate-800">
        <div className="absolute -top-2 left-0 right-0 h-2 bg-slate-800/60" />
      </div>

      {/* silhouette */}
      <div className="absolute bottom-[14vh] left-1/2 -translate-x-1/2" style={{ filter: 'brightness(0) drop-shadow(0 0 18px rgba(225,29,72,0.35))' }}>
        <PixelArt name="character" scale={4.4} />
      </div>

      {/* web from moon-side */}
      <svg className="absolute top-0 right-[16%] w-24 h-[30vh] opacity-40" viewBox="0 0 60 200" aria-hidden="true">
        <line x1="30" y1="0" x2="30" y2="170" stroke="#f8fafc" strokeWidth="0.8" />
        <path d="M30 170 q-14 8 0 26 q14 -18 0 -26" stroke="#f8fafc" strokeWidth="0.6" fill="none" />
      </svg>

      <div className="absolute inset-x-0 top-[16vh] flex flex-col items-center gap-8 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="font-pixel text-[11px] sm:text-sm text-white leading-7"
          style={{ textShadow: '2px 2px 0 #9f1239' }}
        >
          "Sometimes you just need a new perspective."
        </motion.p>
        <motion.button
          data-testid="rooftop-return-btn"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="pixel-btn"
          onClick={() => { play('close'); onClose(); }}
        >
          RETURN TO DESKTOP
        </motion.button>
      </div>
    </motion.div>
  );
}
