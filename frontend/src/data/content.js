export const SOCIALS = {
  github: { label: 'GitHub', url: 'https://github.com/Balashanmugam-rathinam', handle: 'github.com/Balashanmugam-rathinam' },
  linkedin: { label: 'LinkedIn', url: 'https://www.linkedin.com/in/balashanmugamr/', handle: 'linkedin.com/in/balashanmugamr' },
  instagram: { label: 'Instagram', url: 'https://www.instagram.com/balxshanmugam.r/', handle: 'instagram.com/balxshanmugam.r' },
};

export const RESUME_URL = '/resume.pdf';

export const PROJECTS = [
  {
    id: 'proj-ai',
    name: 'AI Image Enhancement Platform',
    short: 'AI Image Enhancement',
    icon: 'aiEnhance',
    tagline: 'AI-powered image super-resolution and restoration.',
    tech: ['Python', 'Real-ESRGAN', 'GFPGAN', 'FSRCNN', 'OpenCV', 'Streamlit', 'Docker'],
    sections: [
      { title: 'OVERVIEW', body: 'An AI-powered image enhancement platform that restores and upscales low-quality images using state-of-the-art super-resolution and face-restoration models.' },
      { title: 'PROBLEM', body: 'Old, compressed or low-resolution images lose detail permanently. Traditional upscalers blur edges and destroy texture.' },
      { title: 'SOLUTION', body: 'A pipeline combining Real-ESRGAN for general super-resolution, GFPGAN for face restoration and FSRCNN for fast inference, exposed through a clean Streamlit interface.' },
      { title: 'ARCHITECTURE', body: 'Upload -> preprocessing (OpenCV) -> model pipeline (ESRGAN / GFPGAN / FSRCNN) -> post-processing -> side-by-side comparison. Fully containerised with Docker.' },
      { title: 'FEATURES', body: 'Batch enhancement, face restoration toggle, 2x/4x upscaling, before/after comparison slider, one-command Docker deployment.' },
      { title: 'CHALLENGES', body: 'Balancing inference speed against output quality, managing GPU/CPU fallbacks and keeping Docker images lightweight.' },
      { title: 'RESULTS', body: 'Sharper restored images with recovered facial detail and a reproducible, containerised deployment pipeline.' },
    ],
  },
  {
    id: 'proj-insta',
    name: 'Instagram Media Downloader',
    short: 'Instagram Downloader',
    icon: 'instaDown',
    tagline: 'Full-stack media downloader. FastAPI + React.',
    tech: ['FastAPI', 'React', 'Vite', 'yt-dlp', 'Docker', 'Nginx', 'Azure'],
    sections: [
      { title: 'OVERVIEW', body: 'A full-stack media downloading application with a FastAPI backend, React + Vite frontend and yt-dlp powered media extraction.' },
      { title: 'ARCHITECTURE', body: 'React frontend -> Nginx reverse proxy -> FastAPI service -> yt-dlp extraction workers. Containerised and deployed on Azure.' },
      { title: 'BACKEND', body: 'FastAPI endpoints validate URLs, dispatch yt-dlp jobs, stream media metadata and files back to the client with proper error handling.' },
      { title: 'FRONTEND', body: 'A fast Vite + React interface with paste-and-download flow, media previews and download progress states.' },
      { title: 'MEDIA PROCESSING', body: 'yt-dlp handles format negotiation, quality selection and muxing; responses are streamed to avoid memory pressure.' },
      { title: 'DEPLOYMENT', body: 'Docker Compose orchestrates frontend, backend and Nginx. Hosted on Azure with CI-driven rebuilds.' },
      { title: 'CHALLENGES', body: 'Handling platform-side layout changes, rate limits and keeping large media streams reliable under slow networks.' },
    ],
  },
  {
    id: 'proj-verify',
    name: 'VerifyMe.AI',
    short: 'VerifyMe.AI',
    icon: 'verify',
    tagline: 'Computer-vision based human verification.',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'NumPy'],
    sections: [
      { title: 'OVERVIEW', body: 'A computer-vision based human verification system that confirms a real human is present using face detection and gesture challenges.' },
      { title: 'DETECTION PIPELINE', body: 'Webcam feed -> OpenCV preprocessing -> MediaPipe face mesh + hand tracking -> gesture challenge validation -> verdict.' },
      { title: 'FACE DETECTION', body: 'MediaPipe face mesh tracks landmarks in real time to confirm liveness and head orientation.' },
      { title: 'GESTURE RECOGNITION', body: 'Randomised gesture challenges (blink, turn, hand signs) defeat static-image and replay spoofing.' },
      { title: 'CHALLENGES', body: 'Keeping detection robust across lighting conditions and camera qualities while running in real time on CPU.' },
    ],
  },
  {
    id: 'proj-ecom',
    name: 'E-Commerce Delivery Performance Analysis',
    short: 'E-Commerce Analysis',
    icon: 'ecom',
    tagline: '50,000+ delivery transactions analysed.',
    tech: ['SQL', 'Excel', 'Power BI'],
    sections: [
      { title: 'OVERVIEW', body: 'Analysed 50,000+ delivery transactions to identify delivery delays and operational patterns across regions and carriers.' },
      { title: 'DATASET', body: '50,000+ transactional delivery records covering timestamps, regions, carriers, product categories and delivery outcomes.' },
      { title: 'ANALYSIS', body: 'SQL-driven segmentation of delay patterns, seasonal trends and carrier performance, modelled into a clean star schema.' },
      { title: 'KEY FINDINGS', body: 'Identified congestion windows, underperforming routes and category-level delay drivers responsible for the majority of late deliveries.' },
      { title: 'DASHBOARD', body: 'Interactive Power BI dashboard with drill-downs by region, carrier and product category for operations teams.' },
      { title: 'RESULTS', body: 'Actionable recommendations that give operations a clear prioritisation list for reducing late deliveries.' },
    ],
  },
  {
    id: 'proj-hospital',
    name: 'Hospital Patient Wait-Time Optimization',
    short: 'Hospital Analytics',
    icon: 'hospital',
    tagline: '15,000+ patient records analysed.',
    tech: ['SQL', 'Python', 'Power BI'],
    sections: [
      { title: 'OVERVIEW', body: 'Analysed 15,000+ patient records to identify hospital congestion and waiting-time patterns across departments.' },
      { title: 'DATASET', body: '15,000+ anonymised patient visit records including arrival times, department, triage level, treatment duration and discharge.' },
      { title: 'ANALYSIS', body: 'Python + SQL pipeline to model queue behaviour, peak-hour congestion and department-level bottlenecks.' },
      { title: 'KEY FINDINGS', body: 'Mapped the hours and departments where wait times spike, and quantified the impact of triage-level distribution.' },
      { title: 'VISUALIZATION', body: 'Power BI dashboards showing hourly heatmaps, department comparisons and wait-time distributions.' },
      { title: 'RECOMMENDATIONS', body: 'Staffing alignment for peak windows and fast-track routing for low-acuity cases to relieve congestion.' },
      { title: 'RESULTS', body: 'A data-backed playbook for reducing average patient wait time and smoothing department load.' },
    ],
  },
  {
    id: 'proj-blog',
    name: 'Full-Stack Blog Application',
    short: 'Blog Application',
    icon: 'blog',
    tagline: 'Django blogging platform with auth + CRUD.',
    tech: ['Django', 'Python', 'SQL', 'HTML', 'CSS'],
    sections: [
      { title: 'OVERVIEW', body: 'A full-stack blogging platform with authentication, complete CRUD operations and relational database integration.' },
      { title: 'AUTHENTICATION', body: 'Django auth with registration, login, logout and per-user permissions for authoring and managing posts.' },
      { title: 'CRUD', body: 'Create, read, update and delete posts with rich text, drafts and publication states.' },
      { title: 'DATABASE', body: 'Relational schema with users, posts, comments and tags, managed through Django ORM migrations.' },
      { title: 'ARCHITECTURE', body: 'Classic Django MTV architecture with server-rendered templates, form validation and CSRF protection.' },
    ],
  },
];

export const SKILLS = [
  { category: 'BACKEND', color: 'red', items: ['Python', 'FastAPI', 'Django', 'REST APIs'] },
  { category: 'FRONTEND', color: 'blue', items: ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS'] },
  { category: 'AI / ML', color: 'red', items: ['Machine Learning', 'OpenCV', 'TensorFlow', 'PyTorch', 'LLMs', 'RAG', 'LangChain', 'LangGraph', 'Prompt Engineering'] },
  { category: 'DATABASE', color: 'blue', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'ChromaDB', 'FAISS'] },
  { category: 'DEVOPS', color: 'red', items: ['Docker', 'Git', 'GitHub', 'GitHub Actions', 'Azure', 'Nginx'] },
  { category: 'DATA', color: 'blue', items: ['SQL', 'Power BI', 'Excel', 'Pandas', 'NumPy', 'Matplotlib'] },
];

export const SUITS = [
  {
    name: 'BACKEND SUIT',
    status: 'SYSTEM: ONLINE',
    desc: 'Primary combat suit. Built for APIs, databases and shipping reliable server-side systems.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'REST APIs'],
    tint: { R: '#e11d48', r: '#9f1239', B: '#1d4ed8' },
  },
  {
    name: 'AI SUIT',
    status: 'SYSTEM: ONLINE',
    desc: 'Experimental suit. Tuned for models, vision pipelines and LLM-driven systems.',
    tech: ['Python', 'PyTorch', 'OpenCV', 'LLMs', 'RAG', 'LangChain'],
    tint: { R: '#3b82f6', r: '#1d4ed8', B: '#e11d48' },
  },
  {
    name: 'FULL-STACK SUIT',
    status: 'SYSTEM: ONLINE',
    desc: 'Stealth ops suit. Ships complete products from pixel to production.',
    tech: ['React', 'FastAPI', 'Docker', 'Nginx', 'PostgreSQL'],
    tint: { R: '#f97316', r: '#c2410c', B: '#0f172a' },
  },
];

export const IDENTITY = {
  name: 'BALA SHANMUGAM',
  display: 'BALA',
  roles: ['Python Backend Developer', 'AI Engineer', 'Full-Stack Developer'],
  education: ['MSc Data Science', 'BCA'],
  location: 'India',
  mission: ['Build useful systems.', 'Solve difficult problems.', 'Keep learning.'],
  quote: 'New day. New mission.',
};

export const REJECTED = [
  'Generic Portfolio #01',
  'Todo App #27',
  'Weather App #54',
  'Another Chatbot',
  'Random Crypto Project',
  'Gradient Landing Page',
  'Make It Like Every Other Portfolio',
];

export const TICKER_ITEMS = [
  'LIVE BUILD // CANVA PRO: brand kit design in progress',
  'LIVE BUILD // CANVA PRO: exporting web assets',
  'LIVE BUILD // CANVA PRO: refining pixel palette',
  'LIVE BUILD // CANVA PRO: portfolio deck v2 rendering',
];
