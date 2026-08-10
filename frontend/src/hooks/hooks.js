import { useState, useEffect, useRef, useCallback } from 'react';

export function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function useIsMobile() {
  const [mobile, setMobile] = useState(
    typeof window !== 'undefined' && (window.innerWidth < 820 || window.matchMedia('(pointer: coarse)').matches)
  );
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 820 || window.matchMedia('(pointer: coarse)').matches);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return mobile;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fn = (e) => setReduced(e.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return reduced;
}

const SOUND_CONF = {
  click: [880, 0.06, 'square'],
  hover: [660, 0.04, 'square'],
  open: [440, 0.14, 'square'],
  close: [262, 0.14, 'square'],
  type: [1200, 0.025, 'square'],
  boot: [220, 0.5, 'sawtooth'],
  sense: [520, 0.6, 'sawtooth'],
};

export function useSound(enabled) {
  const ctxRef = useRef(null);
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  return useCallback((type) => {
    if (!enabledRef.current) return;
    try {
      if (!ctxRef.current) {
        ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = ctxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      const [freq, dur, wave] = SOUND_CONF[type] || SOUND_CONF.click;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = wave;
      o.frequency.setValueAtTime(freq, ctx.currentTime);
      if (type === 'boot' || type === 'sense') {
        o.frequency.exponentialRampToValueAtTime(freq * 2, ctx.currentTime + dur);
      }
      g.gain.setValueAtTime(0.07, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + dur);
    } catch (e) {
      /* audio unavailable */
    }
  }, []);
}

export function useEasterEgg(onTrigger) {
  const buffer = useRef('');
  const cbRef = useRef(onTrigger);
  cbRef.current = onTrigger;
  useEffect(() => {
    const onKey = (e) => {
      if (e.key && e.key.length === 1) {
        buffer.current = (buffer.current + e.key.toUpperCase()).slice(-16);
        if (buffer.current.endsWith('SPIDERSENSE')) {
          buffer.current = '';
          cbRef.current();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
}
