import { useState, useEffect, useRef, useCallback } from 'react';
import { PROJECTS, SKILLS, SOCIALS, IDENTITY } from '@/data/content';

const SCAN_LINES = [
  '[SCAN] Python ............. DETECTED',
  '[SCAN] FastAPI ............ DETECTED',
  '[SCAN] Django ............. DETECTED',
  '[SCAN] Docker ............. DETECTED',
  '[SCAN] Azure .............. DETECTED',
  '[SCAN] Nginx .............. DETECTED',
  '[SCAN] Git / GitHub ....... DETECTED',
  'SPIDER-SENSE SCAN COMPLETE. All systems operational.',
];

const HELP = [
  'Available commands:',
  '  help              show this list',
  '  about             who is Bala',
  '  projects          list all projects',
  '  skills            skill summary',
  '  mission           current mission',
  '  github            open GitHub',
  '  linkedin          open LinkedIn',
  '  instagram         open Instagram',
  '  contact           contact Bala',
  '  rooftop           go to the rooftop',
  '  clear             clear terminal',
  '  sudo hire-bala    ???',
];

export default function Terminal({ play, openApp, onRooftop }) {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const scanned = useRef(false);

  const push = useCallback((items) => {
    setHistory((h) => [...h, ...items]);
  }, []);

  useEffect(() => {
    if (scanned.current) return;
    scanned.current = true;
    push([{ text: 'BALA-OS TERMINAL v2.0 — New York node online.', cls: 'text-slate-400' }]);
    SCAN_LINES.forEach((line, i) => {
      setTimeout(() => {
        play('type');
        push([{ text: line, cls: line.startsWith('[SCAN]') ? 'text-green-500' : 'text-rose-400 font-semibold' }]);
      }, 320 * (i + 1));
    });
    setTimeout(() => push([{ text: "Type 'help' to see available commands.", cls: 'text-slate-400' }]), 320 * (SCAN_LINES.length + 1));
  }, [push, play]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [history]);

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    push([{ text: `bala@nyc:~$ ${raw}`, cls: 'text-slate-200' }]);
    play('click');

    const social = (key) => [
      { text: `Opening ${SOCIALS[key].label}...`, cls: 'text-blue-400' },
      { text: SOCIALS[key].handle, cls: 'text-slate-400' },
      { action: { label: `OPEN ${SOCIALS[key].label.toUpperCase()}`, url: SOCIALS[key].url } },
    ];

    switch (cmd) {
      case '':
        return;
      case 'help':
        push(HELP.map((t) => ({ text: t, cls: 'text-slate-300' })));
        break;
      case 'about':
        push([
          { text: IDENTITY.name, cls: 'text-rose-400 font-semibold' },
          ...IDENTITY.roles.map((r) => ({ text: `  ${r}`, cls: 'text-slate-300' })),
          { text: `  Education: ${IDENTITY.education.join(' | ')}`, cls: 'text-slate-400' },
          { text: `  Location: ${IDENTITY.location}`, cls: 'text-slate-400' },
        ]);
        break;
      case 'projects':
        push([
          { text: 'PROJECT DATABASE:', cls: 'text-rose-400' },
          ...PROJECTS.map((p, i) => ({ text: `  [${i + 1}] ${p.name}`, cls: 'text-slate-300' })),
          { text: "Double-click a desktop icon or type the project name's app from the Projects menu.", cls: 'text-slate-500' },
        ]);
        break;
      case 'skills':
        push(
          SKILLS.map((s) => ({ text: `  ${s.category}: ${s.items.join(', ')}`, cls: 'text-slate-300' }))
        );
        break;
      case 'mission':
        push(IDENTITY.mission.map((t) => ({ text: `  ${t}`, cls: 'text-slate-300' })));
        push([{ text: `"${IDENTITY.quote}"`, cls: 'text-rose-400' }]);
        break;
      case 'github':
        push(social('github'));
        break;
      case 'linkedin':
        push(social('linkedin'));
        break;
      case 'instagram':
        push(social('instagram'));
        break;
      case 'contact':
        push([
          { text: 'Opening a secure web channel...', cls: 'text-blue-400' },
          { action: { label: 'CONTACT BALA', app: 'contact' } },
        ]);
        break;
      case 'rooftop':
        push([{ text: 'Climbing to the rooftop...', cls: 'text-blue-400' }]);
        setTimeout(onRooftop, 600);
        break;
      case 'clear':
        setHistory([]);
        break;
      case 'sudo hire-bala':
        play('sense');
        push([
          { text: 'ACCESS GRANTED', cls: 'text-green-500 font-bold' },
          { text: '', cls: '' },
          { text: 'Developer detected.', cls: 'text-slate-200' },
          { text: '', cls: '' },
          ...IDENTITY.roles.map((r) => ({ text: `  ${r}`, cls: 'text-slate-300' })),
          { text: '', cls: '' },
          { text: 'MISSION STATUS:', cls: 'text-rose-400' },
          { text: 'READY FOR NEW CHALLENGES.', cls: 'text-green-500 font-semibold' },
          { action: { label: '[ CONTACT BALA ]', app: 'contact' } },
        ]);
        break;
      default:
        push([{ text: `command not found: ${cmd}. Type 'help'.`, cls: 'text-rose-500' }]);
    }
  };

  return (
    <div
      className="flex flex-col h-full bg-black border border-green-900/60 relative overflow-hidden"
      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      onClick={() => inputRef.current?.focus()}
      data-testid="terminal-app"
    >
      <div className="scanline" />
      <div ref={bodyRef} className="win-scroll flex-1 overflow-auto p-3 text-[12px] leading-5">
        {history.map((item, i) => (
          <div key={i} className={item.cls || ''}>
            {item.text}
            {item.action && (
              <button
                data-testid={`terminal-action-${item.action.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className="pixel-btn green mt-1 mb-1"
                onClick={(e) => {
                  e.stopPropagation();
                  play('open');
                  if (item.action.url) window.open(item.action.url, '_blank', 'noopener,noreferrer');
                  else if (item.action.app) openApp(item.action.app);
                }}
              >
                {item.action.label}
              </button>
            )}
          </div>
        ))}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-green-500 shrink-0">bala@nyc:~$</span>
          <input
            ref={inputRef}
            data-testid="terminal-input"
            className="flex-1 bg-transparent outline-none text-slate-100 caret-green-500 min-w-0"
            value={input}
            autoFocus
            onChange={(e) => { setInput(e.target.value); play('type'); }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                run(input);
                setInput('');
              }
            }}
            aria-label="Terminal input"
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}
