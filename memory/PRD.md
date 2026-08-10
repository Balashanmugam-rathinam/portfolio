# PRD — BALA: BRAND NEW DAY (Spider-Man Desktop OS Portfolio)

## Original Problem Statement
Build a production-ready interactive developer portfolio for Bala Shanmugam (Python Backend Developer / AI Engineer / Full-Stack Developer, India) designed as a Spider-Man: Brand New Day-inspired retro pixel-art computer desktop (NOT a scrolling landing page). Boot screen -> NYC night desktop -> explorable apps: project windows, terminal, suit database (skills-as-suits), skills, resume, socials, contact, rooftop mode, rejected-concepts trash, SPIDERSENSE keyboard easter egg, custom pixel cursor, rain/sound toggles, and a mobile "Spidey-Phone" view with a Live Build ticker.

## Architecture
- Frontend: React 19 (CRA/craco template) + Tailwind CSS + Framer Motion, pixel-art sprites rendered as inline SVG (`src/sprites.js` + `PixelArt.jsx`), custom window manager (`useWindowManager`), WebAudio-synthesized placeholder sounds.
- Backend: FastAPI + MongoDB (motor). `POST /api/contact` stores messages in `contact_messages` and sends email via Resend when `RESEND_API_KEY` + `CONTACT_EMAIL` are set in `backend/.env`.
- Real social links wired everywhere: GitHub /Balashanmugam-rathinam, LinkedIn /in/balashanmugamr, Instagram /balxshanmugam.r

## User Personas
- Recruiter/hiring manager: quick access to resume, skills, projects, contact.
- Fellow developer: explores terminal, easter eggs, window system.
- Mobile visitor: Spidey-Phone full-screen apps.

## Implemented (2026-07)
- Boot screen: power-on gate, web spinner, typed boot log, progress bar, BRAND NEW DAY reveal, click-to-skip, synth boot sound.
- NYC night desktop: 3-layer parallax skyline, flickering apartment windows, moon, fog, corner webs, grain overlay, rain (toggleable), sticky notes (draggable), pixel Spider character with idle bob, hover speech, periodic web shot.
- Menu bar: BALA/File/Projects/Suit/Mission/About/Contact dropdowns, NEW YORK, wifi/battery, SPIDER-SENSE STANDBY/ACTIVE pulse on interactive hover, SOUND toggle, RAIN toggle, live local clock.
- Window manager: drag (title bar), close/min/max/restore, z-index bring-to-front, multiple windows, open animation from icon.
- 6 project apps with custom pixel icons + full section content; Projects launcher window.
- Terminal: skill scan on open (Python/DevOps), help/about/projects/skills/mission/github/linkedin/instagram/contact/rooftop/clear/sudo hire-bala.
- Suit Database (3 tinted suits), Spider-Sense//Skills grid, About, Resume (DOWNLOAD RESUME -> /resume.pdf placeholder), Socials (animated web strands), Contact (working form -> backend -> MongoDB + Resend when configured), Rejected Concepts trash.
- Rooftop Mode (BALA menu or terminal `rooftop`): big moon, silhouette, quote, return button.
- SPIDERSENSE keyboard easter egg: web lines, red/blue flash, "Something is coming."
- Custom pixel cursor (spider / web-target hover / click burst), disabled on touch.
- Mobile Spidey-Phone: status bar, LIVE BUILD ticker (Canva placeholder text — MOCKED), app grid, dock, full-screen apps, rooftop button.
- SEO title + meta description; accessibility: focus rings, aria labels, prefers-reduced-motion.

## Verified
- Backend: /api/, /api/health, /api/contact (stores message; emailed=false until Resend key provided).
- Frontend flows: boot -> desktop, project window open/max/min/restore/close, terminal commands, contact submit success, rooftop open/return, easter egg trigger, suits, mobile phone view + apps + terminal.

## Pending / Requires User
- P0: Provide real email address + Resend API key (resend.com -> API Keys) to activate contact-form email delivery; set `RESEND_API_KEY`, `CONTACT_EMAIL` in backend/.env, restart backend.
- P0: Replace `frontend/public/resume.pdf` with the real resume PDF.
- P1: Provide Canva Pro project details to replace MOCKED Live Build ticker text (`TICKER_ITEMS` in src/data/content.js).
- P1: Real GitHub repo URLs per project (currently buttons link to profile; LIVE DEMO buttons disabled as private builds).
- P2: Recorded sound assets to replace synthesized placeholder audio.

## Backlog
- P2: Window snapping, window resize handles, taskbar of minimized windows.
- P2: More terminal commands (cowsay-style spider ASCII, weather NYC).
- P2: Achievement toasts for discovering easter eggs.
