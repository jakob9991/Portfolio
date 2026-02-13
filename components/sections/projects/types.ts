export type ProjectCategory = "web" | "mobile" | "automation";
export type RepoVisibility = "public" | "private" | "none";

export type Project = {
  id: number;
  slug: string;
  category: ProjectCategory;
  title: string;
  subtitle: string | null;
  description: string;
  accent_from: string;
  accent_to: string;
  status_label: string | null;
  demo_url: string | null;
  repo_url: string | null;
  repo_visibility: RepoVisibility;
  is_visible: boolean;
  sort_order: number;
};

export type ProjectKpi = {
  id: number;
  project_id: number;
  label: string;
  value: string;
  sort_order: number;
};

export type ProjectTag = {
  id: number;
  project_id: number;
  tag: string;
  sort_order: number;
};

export type ProjectMedia = {
  id: number;
  project_id: number;
  media_type: "cover" | "mobile_screen" | "workflow_bg";
  url: string;
  alt: string | null;
  sort_order: number;
};

export type ProjectWorkflowStep = {
  id: number;
  project_id: number;
  step_label: string;
  step_tone: string;
  sort_order: number;
};

export type ProjectWithRelations = Project & {
  kpis: ProjectKpi[];
  tags: ProjectTag[];
  media: ProjectMedia[];
  workflowSteps: ProjectWorkflowStep[];
};
