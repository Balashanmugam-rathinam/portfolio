import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import PixelArt from '@/components/PixelArt';
import { PROJECTS, SKILLS, SUITS, SOCIALS, IDENTITY, REJECTED, RESUME_URL } from '@/data/content';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function Section({ title, children }) {
  return (
    <div className="mb-5">
      <h3 className="font-pixel text-[10px] text-rose-400 mb-2 flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-rose-600" />
        {title}
      </h3>
      <div className="text-[13px] leading-6 text-slate-300">{children}</div>
    </div>
  );
}

function SocialRow() {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {Object.entries(SOCIALS).map(([key, s]) => (
        <a
          key={key}
          data-testid={`social-link-${key}`}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className="pixel-btn blue inline-flex items-center gap-2 no-underline"
        >
          <PixelArt name={key} scale={1.6} /> {s.label.toUpperCase()}
        </a>
      ))}
    </div>
  );
}

export function ProjectsWindow({ openApp }) {
  return (
    <div data-testid="projects-app">
      <h2 className="font-pixel text-sm text-white mb-1">PROJECT DATABASE</h2>
      <p className="text-[12px] text-slate-400 mb-5">Six missions completed. Select a file to open it.</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {PROJECTS.map((p) => (
          <button
            key={p.id}
            data-testid={`projects-open-${p.id}`}
            className="flex items-start gap-3 p-3 border-2 border-white/10 bg-slate-900/60 hover:border-rose-500/70 hover:bg-slate-800/70 transition-colors text-left"
            onClick={() => openApp(p.id)}
          >
            <PixelArt name={p.icon} scale={2.4} className="pixel-shadow-sm shrink-0 mt-0.5" />
            <span>
              <span className="font-pixel text-[8px] text-white block mb-1.5 leading-4">{p.short}</span>
              <span className="text-[11px] text-slate-400 leading-4 block">{p.tagline}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProjectWindow({ project, play }) {
  return (
    <div data-testid={`project-${project.id}`}>
      <div className="flex items-start gap-4 mb-5 pb-4 border-b border-white/10">
        <div className="p-2 border-2 border-rose-600/60 bg-slate-900/80 shrink-0">
          <PixelArt name={project.icon} scale={3.4} className="pixel-shadow-sm" />
        </div>
        <div className="min-w-0">
          <h2 className="font-pixel text-[11px] sm:text-sm text-white leading-5 mb-2">{project.name}</h2>
          <p className="text-[12px] text-slate-400">{project.tagline}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-6">
        {project.tech.map((t, i) => (
          <span key={t} className={`pixel-chip ${i % 2 === 0 ? 'red' : 'blue'}`}>{t}</span>
        ))}
      </div>

      {project.sections.map((s) => (
        <Section key={s.title} title={s.title}>{s.body}</Section>
      ))}

      <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-white/10">
        <a
          data-testid={`project-github-${project.id}`}
          href={SOCIALS.github.url}
          target="_blank"
          rel="noopener noreferrer"
          className="pixel-btn no-underline inline-block"
          onClick={() => play('open')}
        >
          GITHUB
        </a>
        <button data-testid={`project-demo-${project.id}`} className="pixel-btn" disabled title="Private build — demo offline">
          LIVE DEMO — OFFLINE
        </button>
      </div>
    </div>
  );
}

export function SuitDatabase({ play }) {
  return (
    <div data-testid="suit-database">
      <h2 className="font-pixel text-sm text-white mb-1">SUIT DATABASE</h2>
      <p className="text-[12px] text-slate-400 mb-5">Every suit is a skill set. Choose the right one for the mission.</p>
      <div className="grid md:grid-cols-3 gap-4">
        {SUITS.map((suit) => (
          <div
            key={suit.name}
            data-testid={`suit-${suit.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="border-2 border-white/10 bg-slate-900/60 p-4 hover:border-rose-500/60 transition-colors group"
          >
            <div className="flex justify-center py-3 bg-black/40 border border-white/5 mb-3 group-hover:scale-105 transition-transform">
              <PixelArt name="suit" scale={4} tint={suit.tint} className="pixel-shadow-sm" />
            </div>
            <div className="font-pixel text-[9px] text-white mb-1">{suit.name}</div>
            <div className="font-pixel text-[7px] text-green-500 mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 inline-block animate-pulse" />
              {suit.status}
            </div>
            <p className="text-[11px] text-slate-400 leading-5 mb-3">{suit.desc}</p>
            <div className="flex flex-wrap gap-1">
              {suit.tech.map((t) => (
                <span key={t} className="pixel-chip">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkillsWindow() {
  return (
    <div className="relative" data-testid="skills-app">
      <div className="scanline" />
      <h2 className="font-pixel text-sm text-white mb-1">SPIDER-SENSE // SKILLS</h2>
      <p className="text-[12px] text-slate-400 mb-5">Detected capabilities, sorted by combat category.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {SKILLS.map((cat) => (
          <div key={cat.category} className="border-2 border-white/10 bg-slate-900/60 p-4">
            <div className={`font-pixel text-[9px] mb-3 ${cat.color === 'red' ? 'text-rose-400' : 'text-blue-400'}`}>
              {cat.category}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {cat.items.map((item) => (
                <span key={item} className={`pixel-chip ${cat.color}`}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AboutWindow() {
  return (
    <div data-testid="about-app">
      <div className="flex items-center gap-4 mb-6 pb-5 border-b border-white/10">
        <PixelArt name="character" scale={2.2} className="pixel-shadow-sm shrink-0" />
        <div>
          <h2 className="font-pixel text-sm sm:text-base text-white mb-2" style={{ textShadow: '2px 2px 0 #9f1239' }}>
            WHO IS BALA?
          </h2>
          <div className="font-pixel text-[8px] text-slate-400 leading-5">
            {IDENTITY.roles.map((r) => <div key={r}>{r}</div>)}
          </div>
        </div>
      </div>

      <Section title="IDENTITY">
        {IDENTITY.name} — {IDENTITY.roles.join(' / ')} based in {IDENTITY.location}.
      </Section>
      <Section title="EDUCATION">
        {IDENTITY.education.map((e) => <div key={e} className="mb-1">+ {e}</div>)}
      </Section>
      <Section title="MISSION">
        {IDENTITY.mission.map((m) => <div key={m} className="mb-1">{m}</div>)}
      </Section>
      <Section title="CONNECTIONS">
        <SocialRow />
      </Section>
    </div>
  );
}

export function ResumeWindow({ play }) {
  return (
    <div data-testid="resume-app">
      <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-white/10 flex-wrap">
        <div>
          <h2 className="font-pixel text-sm text-white mb-2">BALA — DEVELOPER PROFILE</h2>
          <p className="text-[12px] text-slate-400">Official record. Verified by Spider-Sense.</p>
        </div>
        <a
          data-testid="resume-download"
          href={RESUME_URL}
          download="Bala_Shanmugam_Resume.pdf"
          className="pixel-btn no-underline inline-block"
          onClick={() => play('open')}
        >
          DOWNLOAD RESUME
        </a>
      </div>

      <Section title="ABOUT">
        {IDENTITY.name}. {IDENTITY.roles.join(', ')}. Based in {IDENTITY.location}. I build backend systems, AI applications and full-stack software that ships.
      </Section>
      <Section title="EDUCATION">
        {IDENTITY.education.map((e) => <div key={e}>+ {e}</div>)}
      </Section>
      <Section title="SKILLS">
        {SKILLS.map((c) => (
          <div key={c.category} className="mb-1.5">
            <span className="text-rose-400">{c.category}: </span>
            {c.items.join(', ')}
          </div>
        ))}
      </Section>
      <Section title="PROJECTS">
        {PROJECTS.map((p) => (
          <div key={p.id} className="mb-2">
            <span className="text-white font-semibold">{p.name}</span>
            <span className="text-slate-500"> — {p.tech.slice(0, 4).join(', ')}</span>
          </div>
        ))}
      </Section>
      <Section title="EXPERIENCE">
        Backend, AI and full-stack project experience across computer vision, data analytics and web platforms. Detailed history available in the downloadable resume.
      </Section>
      <Section title="CONTACT">
        <SocialRow />
      </Section>
    </div>
  );
}

export function SocialsWindow() {
  return (
    <div data-testid="socials-app">
      <h2 className="font-pixel text-sm text-white mb-1">SOCIAL CONNECTIONS</h2>
      <p className="text-[12px] text-slate-400 mb-6">Three web strands. All of them lead to Bala.</p>
      <div className="relative py-4">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 180" preserveAspectRatio="none" aria-hidden="true">
          <path d="M66 90 Q133 20 200 90" stroke="#e11d48" strokeWidth="1" fill="none" strokeDasharray="4 4" className="web-pulse" />
          <path d="M200 90 Q267 160 334 90" stroke="#3b82f6" strokeWidth="1" fill="none" strokeDasharray="4 4" className="web-pulse" style={{ animationDelay: '-1.2s' }} />
          <path d="M66 90 Q200 175 334 90" stroke="#f8fafc" strokeWidth="0.6" fill="none" strokeDasharray="3 5" opacity="0.4" />
        </svg>
        <div className="relative flex justify-between items-start max-w-[420px] mx-auto">
          {Object.entries(SOCIALS).map(([key, s]) => (
            <a
              key={key}
              data-testid={`socials-link-${key}`}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 group w-24 no-underline"
            >
              <span className="p-3 border-2 border-white/15 bg-slate-900/80 group-hover:border-rose-500 group-hover:scale-110 transition-all" style={{ boxShadow: '4px 4px 0 rgba(0,0,0,0.5)' }}>
                <PixelArt name={key} scale={3} />
              </span>
              <span className="font-pixel text-[8px] text-white">{s.label.toUpperCase()}</span>
              <span className="text-[9px] text-slate-500 break-all text-center leading-3">{s.handle}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ContactWindow({ play }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    play('open');
    try {
      await axios.post(`${API}/contact`, form);
      setStatus('sent');
      play('sense');
      toast.success('Web signal sent. Bala will swing by your inbox soon.');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      toast.error('Signal lost in the city. Try again.');
    }
  };

  const field = 'w-full bg-black/60 border-2 border-white/15 focus:border-rose-500 text-slate-100 text-[13px] px-3 py-2.5 outline-none transition-colors placeholder:text-slate-600';

  return (
    <div data-testid="contact-app">
      <h2 className="font-pixel text-sm text-white mb-1">SEND A WEB SIGNAL</h2>
      <p className="text-[12px] text-slate-400 mb-5">Your message swings straight to Bala's inbox.</p>

      {status === 'sent' ? (
        <div className="border-2 border-green-600/60 bg-green-950/30 p-5 mb-5" data-testid="contact-success">
          <div className="font-pixel text-[10px] text-green-500 mb-2">SIGNAL RECEIVED</div>
          <p className="text-[12px] text-slate-300">Thanks for reaching out. Bala will get back to you soon.</p>
          <button className="pixel-btn mt-4" data-testid="contact-again-btn" onClick={() => setStatus('idle')}>SEND ANOTHER</button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label htmlFor="contact-name" className="font-pixel text-[8px] text-slate-400 block mb-1.5">NAME</label>
            <input id="contact-name" data-testid="contact-name-input" required className={field} value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Peter Parker" />
          </div>
          <div>
            <label htmlFor="contact-email" className="font-pixel text-[8px] text-slate-400 block mb-1.5">EMAIL</label>
            <input id="contact-email" data-testid="contact-email-input" required type="email" className={field} value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="peter@dailybugle.com" />
          </div>
          <div>
            <label htmlFor="contact-message" className="font-pixel text-[8px] text-slate-400 block mb-1.5">MESSAGE</label>
            <textarea id="contact-message" data-testid="contact-message-input" required rows={5} className={`${field} resize-none`} value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="We need a developer who can handle great responsibility..." />
          </div>
          {status === 'error' && <div className="text-rose-500 text-[12px]" data-testid="contact-error">Transmission failed. Check your connection and retry.</div>}
          <button data-testid="contact-send-btn" type="submit" className="pixel-btn w-full" disabled={status === 'sending'}>
            {status === 'sending' ? 'SHOOTING WEB...' : 'SEND WEB'}
          </button>
        </form>
      )}

      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="font-pixel text-[8px] text-slate-500 mb-2">OR FIND ME ON THE WEB</div>
        <SocialRow />
      </div>
    </div>
  );
}

export function TrashWindow() {
  return (
    <div data-testid="trash-app">
      <h2 className="font-pixel text-sm text-white mb-1">REJECTED CONCEPTS</h2>
      <p className="text-[12px] text-slate-400 mb-5">Ideas that never made it past the web.</p>
      <div className="space-y-2">
        {REJECTED.map((r) => (
          <div key={r} className="flex items-center gap-3 p-2.5 border border-white/10 bg-slate-900/50 text-slate-500 line-through text-[12px]">
            <PixelArt name="trash" scale={1.6} className="shrink-0 opacity-60" />
            {r}
          </div>
        ))}
      </div>
      <p className="font-pixel text-[8px] text-slate-500 mt-6 text-center">"Some ideas don't make it past the web."</p>
    </div>
  );
}
