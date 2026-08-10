import { useState, useRef, useEffect } from 'react';
import { Wifi, BatteryFull } from 'lucide-react';
import { useClock } from '@/hooks/hooks';
import { PROJECTS } from '@/data/content';
import PixelArt from '@/components/PixelArt';

function MenuDropdown({ label, items, openApp, play, onRooftop, testId }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        data-testid={testId}
        className={`font-pixel text-[9px] px-2 py-1 transition-colors ${open ? 'bg-rose-700 text-white' : 'text-slate-200 hover:bg-slate-700/60'}`}
        onClick={() => { setOpen((o) => !o); play('click'); }}
      >
        {label}
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 min-w-[190px] pixel-panel py-1 z-[999]">
          {items.map((item) => (
            <button
              key={item.label}
              data-testid={`menu-item-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="w-full text-left px-3 py-2 text-[11px] text-slate-300 hover:bg-rose-700/80 hover:text-white transition-colors font-pixel text-[8px] leading-4"
              onClick={() => {
                play('click');
                setOpen(false);
                if (item.rooftop) onRooftop();
                else openApp(item.app, item.props || {});
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MenuBar({ openApp, soundOn, setSoundOn, rainOn, setRainOn, senseActive, play, onRooftop }) {
  const clock = useClock();

  return (
    <header
      className="fixed top-0 left-0 right-0 h-9 z-[900] flex items-center justify-between px-2 sm:px-3 border-b border-white/10"
      style={{ background: 'rgba(10,10,10,0.78)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
      data-testid="menu-bar"
    >
      <div className="flex items-center gap-0.5 sm:gap-1 min-w-0">
        <MenuDropdown
          label="BALA"
          testId="menu-bala"
          openApp={openApp}
          play={play}
          onRooftop={onRooftop}
          items={[
            { label: 'About Bala', app: 'about' },
            { label: 'Projects', app: 'projects' },
            { label: 'Skills', app: 'skills' },
            { label: 'Resume', app: 'resume' },
            { label: 'Rooftop', rooftop: true },
            { label: 'Contact', app: 'contact' },
          ]}
        />
        <div className="hidden md:flex items-center gap-0.5">
          <MenuDropdown
            label="File"
            testId="menu-file"
            openApp={openApp}
            play={play}
            onRooftop={onRooftop}
            items={[
              { label: 'About Bala', app: 'about' },
              { label: 'Resume', app: 'resume' },
              { label: 'Rooftop', rooftop: true },
              { label: 'Rejected Concepts', app: 'trash' },
            ]}
          />
          <MenuDropdown
            label="Projects"
            testId="menu-projects"
            openApp={openApp}
            play={play}
            onRooftop={onRooftop}
            items={PROJECTS.map((p) => ({ label: p.short, app: p.id }))}
          />
          <MenuDropdown
            label="Suit"
            testId="menu-suit"
            openApp={openApp}
            play={play}
            onRooftop={onRooftop}
            items={[
              { label: 'Suit Database', app: 'suits' },
              { label: 'Spider-Sense // Skills', app: 'skills' },
            ]}
          />
          <MenuDropdown
            label="Mission"
            testId="menu-mission"
            openApp={openApp}
            play={play}
            onRooftop={onRooftop}
            items={[
              { label: 'Terminal', app: 'terminal' },
              { label: 'Social Connections', app: 'socials' },
            ]}
          />
          <button
            data-testid="menu-about"
            className="font-pixel text-[9px] px-2 py-1 text-slate-200 hover:bg-slate-700/60 transition-colors"
            onClick={() => { play('click'); openApp('about'); }}
          >
            About
          </button>
          <button
            data-testid="menu-contact"
            className="font-pixel text-[9px] px-2 py-1 text-slate-200 hover:bg-slate-700/60 transition-colors"
            onClick={() => { play('click'); openApp('contact'); }}
          >
            Contact
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <span className="hidden lg:inline font-pixel text-[8px] text-slate-400">NEW YORK</span>
        <Wifi size={13} className="text-slate-300" aria-label="Wi-Fi connected" />
        <BatteryFull size={15} className="text-slate-300 hidden sm:inline" aria-label="Battery full" />
        <span
          data-testid="spider-sense-indicator"
          className={`font-pixel text-[8px] px-2 py-1 border border-slate-600 text-slate-400 transition-colors ${senseActive ? 'sense-active' : ''}`}
        >
          SPIDER-SENSE: {senseActive ? 'ACTIVE' : 'STANDBY'}
        </span>
        <button
          data-testid="sound-toggle"
          className="font-pixel text-[8px] px-2 py-1 border border-slate-600 text-slate-300 hover:border-rose-500 transition-colors"
          onClick={() => { setSoundOn(!soundOn); play('click'); }}
        >
          SOUND: {soundOn ? 'ON' : 'OFF'}
        </button>
        <button
          data-testid="rain-toggle"
          className="hidden sm:inline font-pixel text-[8px] px-2 py-1 border border-slate-600 text-slate-300 hover:border-blue-500 transition-colors"
          onClick={() => { setRainOn(!rainOn); play('click'); }}
        >
          RAIN: {rainOn ? 'ON' : 'OFF'}
        </button>
        <span data-testid="live-clock" className="font-pixel text-[8px] text-slate-200 tabular-nums">{clock}</span>
      </div>
    </header>
  );
}
