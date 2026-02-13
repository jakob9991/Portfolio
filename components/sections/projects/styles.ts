import { ProjectCategory } from "./types";

export type CategoryStyle = {
  label: string;
  chapterPath: string;
  chapterTitle: string;
  chapterTitleAccentClass: string;
  chapterDescription: string;
  borderHoverClass: string;
  descriptionBorderClass: string;
  tagClass: string;
  demoClass: string;
  codeClass: string;
  glowClass: string;
};

export const categoryStyles: Record<ProjectCategory, CategoryStyle> = {
  web: {
    label: "Web",
    chapterPath: "~/projects/web",
    chapterTitle: "Launch Surface",
    chapterTitleAccentClass: "text-sky-400",
    chapterDescription: "Fokus auf Produktpraesenz, Klarheit und Conversion mit starkem Frontend-Finish.",
    borderHoverClass: "hover:border-sky-500/30",
    descriptionBorderClass: "border-sky-500/30",
    tagClass: "bg-sky-500/10 border-sky-500/30 text-sky-300",
    demoClass: "bg-sky-500/10 border-sky-500/30 text-sky-400 hover:bg-sky-500/20",
    codeClass: "hover:border-sky-500/30 hover:text-sky-300",
    glowClass: "from-sky-500/30 to-blue-500/20",
  },
  mobile: {
    label: "Mobile",
    chapterPath: "~/projects/mobile",
    chapterTitle: "Device Stack",
    chapterTitleAccentClass: "text-emerald-400",
    chapterDescription: "Fokus auf App-Flows, Touch-Erlebnis und Plattformkonsistenz ueber iOS und Android.",
    borderHoverClass: "hover:border-emerald-500/30",
    descriptionBorderClass: "border-emerald-500/30",
    tagClass: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
    demoClass: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20",
    codeClass: "hover:border-emerald-500/30 hover:text-emerald-300",
    glowClass: "from-emerald-500/30 to-cyan-500/20",
  },
  automation: {
    label: "n8n Automation",
    chapterPath: "~/projects/automation",
    chapterTitle: "Flow Control Room",
    chapterTitleAccentClass: "text-orange-400",
    chapterDescription: "Fokus auf Prozesslogik, API-Orchestrierung und messbaren Automationsnutzen.",
    borderHoverClass: "hover:border-orange-500/30",
    descriptionBorderClass: "border-orange-500/30",
    tagClass: "bg-orange-500/10 border-orange-500/30 text-orange-300",
    demoClass: "bg-orange-500/10 border-orange-500/30 text-orange-400 hover:bg-orange-500/20",
    codeClass: "hover:border-orange-500/30 hover:text-orange-300",
    glowClass: "from-orange-500/30 to-red-500/20",
  },
};

export const getCategoryStyle = (category: ProjectCategory): CategoryStyle => {
  return categoryStyles[category] ?? categoryStyles.web;
};

export const getStepToneClass = (tone: string): string => {
  const normalized = tone.toLowerCase();
  if (normalized === "red") return "bg-red-500/10 border-red-500/30 text-red-200";
  if (normalized === "amber") return "bg-amber-500/10 border-amber-500/30 text-amber-200";
  if (normalized === "orange") return "bg-orange-500/10 border-orange-500/30 text-orange-200";
  return "bg-slate-500/10 border-slate-500/30 text-slate-200";
};
