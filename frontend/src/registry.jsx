import { PROJECTS } from '@/data/content';
import {
  ProjectsWindow,
  ProjectWindow,
  SuitDatabase,
  SkillsWindow,
  AboutWindow,
  ResumeWindow,
  SocialsWindow,
  ContactWindow,
  TrashWindow,
} from '@/components/apps';
import Terminal from '@/components/Terminal';

export const APPS = {
  projects: { title: 'PROJECTS', icon: 'folder', w: 640, h: 460, render: (p) => <ProjectsWindow {...p} /> },
  terminal: { title: 'TERMINAL', icon: 'terminal', w: 640, h: 460, render: (p) => <Terminal {...p} /> },
  suits: { title: 'SUIT DATABASE', icon: 'suit', w: 780, h: 480, render: (p) => <SuitDatabase {...p} /> },
  skills: { title: 'SPIDER-SENSE // SKILLS', icon: 'skills', w: 680, h: 520, render: (p) => <SkillsWindow {...p} /> },
  about: { title: 'WHO IS BALA?', icon: 'spider', w: 600, h: 560, render: (p) => <AboutWindow {...p} /> },
  resume: { title: 'BALA — DEVELOPER PROFILE', icon: 'resume', w: 680, h: 560, render: (p) => <ResumeWindow {...p} /> },
  socials: { title: 'SOCIAL CONNECTIONS', icon: 'contact', w: 560, h: 420, render: (p) => <SocialsWindow {...p} /> },
  contact: { title: 'SEND A WEB SIGNAL', icon: 'contact', w: 560, h: 580, render: (p) => <ContactWindow {...p} /> },
  trash: { title: 'REJECTED CONCEPTS', icon: 'trash', w: 480, h: 480, render: (p) => <TrashWindow {...p} /> },
};

PROJECTS.forEach((proj) => {
  APPS[proj.id] = {
    title: proj.short.toUpperCase(),
    icon: proj.icon,
    w: 720,
    h: 540,
    render: (p) => <ProjectWindow project={proj} {...p} />,
  };
});
