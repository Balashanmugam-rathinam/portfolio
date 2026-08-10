import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from '@/components/ui/sonner';
import '@/App.css';

import BootScreen from '@/components/BootScreen';
import CityBackdrop from '@/components/CityBackdrop';
import RainEffect from '@/components/RainEffect';
import MenuBar from '@/components/MenuBar';
import DesktopIcon from '@/components/DesktopIcon';
import DesktopWindow from '@/components/DesktopWindow';
import Dock from '@/components/Dock';
import SpiderCharacter from '@/components/SpiderCharacter';
import StickyNote from '@/components/StickyNote';
import RooftopMode from '@/components/RooftopMode';
import SpideyPhone from '@/components/SpideyPhone';
import PixelArt from '@/components/PixelArt';

import { APPS } from '@/registry';
import { PROJECTS, SOCIALS, IDENTITY } from '@/data/content';
import { useWindowManager } from '@/hooks/useWindowManager';
import { useSound, useIsMobile, useEasterEgg } from '@/hooks/hooks';

const DESKTOP_ICONS = [
  ...PROJECTS.map((p) => ({ id: p.id, icon: p.icon, label: p.short })),
  { id: 'terminal', icon: 'terminal', label: 'Terminal' },
  { id: 'suits', icon: 'suit', label: 'Suit Database' },
  { id: 'about', icon: 'spider', label: 'Who is Bala?' },
  { id: 'skills', icon: 'skills', label: 'Skills' },
  { id: 'resume', icon: 'resume', label: 'Resume' },
  { id: 'socials', icon: 'contact', label: 'Socials' },
  { id: 'contact', icon: 'contact', label: 'Contact' },
];

function EasterEggOverlay({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          data-testid="spidersense-easter-egg"
          className="fixed inset-0 z-[9990] flex items-center justify-center egg-flash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ backdropFilter: 'brightness(0.4)' }}
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {[...Array(9)].map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 12.5} x2="100" y2={50} stroke="#f8fafc" strokeWidth="0.15" opacity="0.5" />
            ))}
            {[...Array(9)].map((_, i) => (
              <line key={`v${i}`} x1={i * 12.5} y1="0" x2="50" y2="100" stroke="#f8fafc" strokeWidth="0.15" opacity="0.5" />
            ))}
            <circle cx="50" cy="50" r="18" fill="none" stroke="#ff003c" strokeWidth="0.3" className="web-pulse" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#3b82f6" strokeWidth="0.3" className="web-pulse" />
          </svg>
          <div className="relative text-center px-6">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 14 }}
            >
              <PixelArt name="spider" scale={6} className="mx-auto mb-6 pixel-shadow-sm" />
              <div className="font-pixel text-lg sm:text-2xl text-white mb-4" style={{ textShadow: '3px 3px 0 #9f1239' }}>
                SPIDER-SENSE ACTIVATED
              </div>
              <div className="font-pixel text-[10px] text-rose-400">"Something is coming."</div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [phase, setPhase] = useState('off');
  const [soundOn, setSoundOn] = useState(true);
  const [rainOn, setRainOn] = useState(true);
  const [senseActive, setSenseActive] = useState(false);
  const [rooftop, setRooftop] = useState(false);
  const [egg, setEgg] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);

  const play = useSound(soundOn);
  const wm = useWindowManager();
  const isMobile = useIsMobile();

  const openApp = useCallback(
    (appId, props = {}) => {
      if (!APPS[appId]) return;
      play('open');
      wm.openWindow(appId, props);
    },
    [play, wm]
  );

  useEasterEgg(() => {
    if (phase !== 'ready') return;
    setEgg(true);
    play('sense');
    setTimeout(() => setEgg(false), 3800);
  });

  useEffect(() => {
    const over = (e) => {
      setSenseActive(!!e.target.closest('a, button, input, textarea, [data-sense], [role="button"]'));
    };
    document.addEventListener('mouseover', over);
    return () => document.removeEventListener('mouseover', over);
  }, []);

  const openRooftop = useCallback(() => {
    play('sense');
    setRooftop(true);
  }, [play]);

  return (
    <div className="os-root" data-testid="bala-os">
      {phase !== 'ready' && <BootScreen phase={phase} setPhase={setPhase} play={play} />}

      {phase === 'ready' && !isMobile && (
        <>
          <CityBackdrop />
          {rainOn && <RainEffect />}

          <MenuBar
            openApp={openApp}
            soundOn={soundOn}
            setSoundOn={setSoundOn}
            rainOn={rainOn}
            setRainOn={setRainOn}
            senseActive={senseActive}
            play={play}
            onRooftop={openRooftop}
          />

          {/* desktop icons */}
          <div
            className="absolute left-4 top-14 bottom-32 grid content-start gap-1"
            style={{ gridTemplateColumns: 'repeat(3, 104px)' }}
            onClick={() => setSelectedIcon(null)}
            data-testid="desktop-icons"
          >
            {DESKTOP_ICONS.map((icon) => (
              <DesktopIcon
                key={icon.id}
                id={icon.id}
                icon={icon.icon}
                label={icon.label}
                selected={selectedIcon === icon.id}
                onSelect={setSelectedIcon}
                onOpen={openApp}
                play={play}
              />
            ))}
          </div>

          {/* sticky notes */}
          <StickyNote
            testId="sticky-note-mission"
            title="DAILY MISSION"
            lines={['Build.', 'Learn.', 'Ship.', 'Repeat.', '', 'Python Backend Dev', 'AI Engineer']}
            color="orange"
            x={400}
            y={80}
            rotate={2}
          />
          <StickyNote
            testId="sticky-note-quote"
            quote="With great code comes great responsibility."
            color="red"
            x={420}
            y={320}
            rotate={-3}
          />

          {/* windows */}
          {wm.windows.map((w) => {
            const cfg = APPS[w.appId];
            if (!cfg) return null;
            return (
              <DesktopWindow key={w.key} win={w} cfg={cfg} wm={wm} play={play}>
                {cfg.render({ play, openApp, onRooftop: openRooftop, ...w.props })}
              </DesktopWindow>
            );
          })}

          <SpiderCharacter play={play} />

          <Dock openApp={openApp} play={play} openKeys={wm.windows.map((w) => w.key)} />

          {/* footer */}
          <footer
            className="fixed bottom-2 left-3 z-[600] hidden md:block text-[10px] text-slate-500"
            data-testid="desktop-footer"
          >
            <span className="font-pixel text-[7px] text-slate-400">{IDENTITY.name}</span>
            <span className="mx-2">|</span>
            {IDENTITY.roles.join(' • ')}
            <span className="mx-2">|</span>
            {Object.values(SOCIALS).map((s, i) => (
              <span key={s.label}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-rose-400 transition-colors">
                  {s.label}
                </a>
                {i < 2 && ' • '}
              </span>
            ))}
            <span className="mx-2">|</span>
            <em>"{IDENTITY.quote}"</em>
          </footer>
        </>
      )}

      {phase === 'ready' && isMobile && (
        <SpideyPhone play={play} soundOn={soundOn} setSoundOn={setSoundOn} onRooftop={openRooftop} />
      )}

      <AnimatePresence>
        {rooftop && <RooftopMode onClose={() => setRooftop(false)} rainOn={rainOn} play={play} />}
      </AnimatePresence>

      <EasterEggOverlay active={egg} />

      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}
