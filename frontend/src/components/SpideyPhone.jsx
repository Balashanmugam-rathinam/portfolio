import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, BatteryFull } from 'lucide-react';
import PixelArt from '@/components/PixelArt';
import CityBackdrop from '@/components/CityBackdrop';
import RainEffect from '@/components/RainEffect';
import { useClock } from '@/hooks/hooks';
import { PROJECTS, SOCIALS, TICKER_ITEMS, IDENTITY } from '@/data/content';
import { APPS } from '@/registry';

const GRID_APPS = [
  ...PROJECTS.map((p) => ({ id: p.id, icon: p.icon, label: p.short })),
  { id: 'terminal', icon: 'terminal', label: 'Terminal' },
  { id: 'suits', icon: 'suit', label: 'Suits' },
  { id: 'skills', icon: 'skills', label: 'Skills' },
  { id: 'about', icon: 'spider', label: 'Bala' },
  { id: 'resume', icon: 'resume', label: 'Resume' },
  { id: 'socials', icon: 'contact', label: 'Socials' },
  { id: 'contact', icon: 'contact', label: 'Contact' },
  { id: 'trash', icon: 'trash', label: 'Rejected' },
];

export default function SpideyPhone({ play, soundOn, setSoundOn, onRooftop }) {
  const clock = useClock();
  const [activeApp, setActiveApp] = useState(null);

  const openApp = (id) => { play('open'); setActiveApp(id); };
  const cfg = activeApp ? APPS[activeApp] : null;

  return (
    <div className="absolute inset-0 overflow-hidden" data-testid="spidey-phone">
      <CityBackdrop interactive={false} />
      <RainEffect density={25} />

      {/* status bar */}
      <div
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-3 h-11 border-b border-white/10"
        style={{ background: 'rgba(10,10,10,0.8)', backdropFilter: 'blur(12px)' }}
        data-testid="phone-status-bar"
      >
        <span className="font-pixel text-[8px] text-rose-500">SPIDEY-PHONE</span>
        <div className="flex items-center gap-2">
          <button
            data-testid="phone-sound-toggle"
            className="font-pixel text-[7px] text-slate-300 border border-slate-600 px-1.5 py-0.5"
            onClick={() => { setSoundOn(!soundOn); play('click'); }}
          >
            {soundOn ? 'SND ON' : 'SND OFF'}
          </button>
          <Wifi size={12} className="text-slate-300" />
          <BatteryFull size={14} className="text-slate-300" />
          <span className="font-pixel text-[8px] text-slate-200 tabular-nums">{clock}</span>
        </div>
      </div>

      {/* live build ticker */}
      <div
        className="absolute top-11 left-0 right-0 z-20 h-8 flex items-center overflow-hidden border-b border-rose-900/50 bg-black/70"
        data-testid="live-build-ticker"
      >
        <span className="font-pixel text-[7px] text-black bg-rose-500 px-2 py-1 shrink-0 z-10">LIVE</span>
        <div className="ticker-track font-pixel text-[7px] text-rose-300 pl-4">
          {TICKER_ITEMS.map((t) => (
            <span key={t} className="mx-8">{t} <span className="text-slate-600">///</span></span>
          ))}
        </div>
      </div>

      {/* app grid */}
      <div className="absolute inset-0 top-[76px] bottom-[86px] overflow-auto win-scroll px-4 py-5">
        <div className="grid grid-cols-4 gap-x-2 gap-y-5 max-w-md mx-auto">
          {GRID_APPS.map((app) => (
            <button
              key={app.id}
              data-testid={`phone-icon-${app.id}`}
              className="flex flex-col items-center gap-1.5 active:scale-90 transition-transform"
              onClick={() => openApp(app.id)}
              aria-label={app.label}
            >
              <span className="p-2 border-2 border-white/10 bg-slate-900/70" style={{ boxShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}>
                <PixelArt name={app.icon} scale={2.6} />
              </span>
              <span className="font-pixel text-[6px] text-slate-200 text-center leading-3" style={{ textShadow: '1px 1px 0 #000' }}>
                {app.label}
              </span>
            </button>
          ))}
        </div>

        <button
          data-testid="phone-rooftop-btn"
          className="pixel-btn blue mx-auto mt-8 flex items-center gap-2"
          onClick={() => { play('sense'); onRooftop(); }}
        >
          <PixelArt name="moon" scale={1.6} /> ROOFTOP MODE
        </button>

        <p className="text-center font-pixel text-[6px] text-slate-600 mt-8 leading-4">
          {IDENTITY.name} — {IDENTITY.quote}
        </p>
      </div>

      {/* dock */}
      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2 px-3 py-2 border-2 border-white/15"
        style={{ background: 'rgba(10,10,10,0.75)', backdropFilter: 'blur(12px)', boxShadow: '4px 4px 0 rgba(0,0,0,0.5)' }}
        data-testid="phone-dock"
      >
        {[
          { id: 'terminal', icon: 'terminal' },
          { id: 'github', icon: 'github', url: SOCIALS.github.url },
          { id: 'linkedin', icon: 'linkedin', url: SOCIALS.linkedin.url },
          { id: 'instagram', icon: 'instagram', url: SOCIALS.instagram.url },
          { id: 'contact', icon: 'contact' },
        ].map((item) => (
          <button
            key={item.id}
            data-testid={`phone-dock-${item.id}`}
            className="p-1.5 border-2 border-white/10 bg-slate-900/70 active:scale-90 transition-transform"
            onClick={() => (item.url ? window.open(item.url, '_blank', 'noopener,noreferrer') : openApp(item.id))}
            aria-label={item.id}
          >
            <PixelArt name={item.icon} scale={2.6} />
          </button>
        ))}
      </div>

      {/* full-screen app */}
      <AnimatePresence>
        {cfg && (
          <motion.div
            key={activeApp}
            data-testid={`phone-app-${activeApp}`}
            className="absolute inset-0 z-30 flex flex-col"
            style={{ background: 'rgba(8,12,24,0.97)' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
          >
            <div className="flex items-center justify-between px-3 h-12 border-b border-white/10 bg-black/60 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <PixelArt name={cfg.icon} scale={1.6} />
                <span className="font-pixel text-[8px] text-white truncate">{cfg.title}</span>
              </div>
              <button
                data-testid="phone-app-close"
                className="pixel-btn !px-2 !py-1"
                onClick={() => { play('close'); setActiveApp(null); }}
                aria-label="Close app"
              >
                X
              </button>
            </div>
            <div className="win-scroll flex-1 overflow-auto p-4 text-left">
              {cfg.render({ play, openApp, onRooftop })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
