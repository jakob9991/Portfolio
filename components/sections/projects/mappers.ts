import {
  Project,
  ProjectCategory,
  ProjectKpi,
  ProjectMedia,
  ProjectTag,
  ProjectWithRelations,
  ProjectWorkflowStep,
  RepoVisibility,
} from "./types";

type MappingInput = {
  projects: unknown[] | null | undefined;
  kpis: unknown[] | null | undefined;
  tags: unknown[] | null | undefined;
  media: unknown[] | null | undefined;
  workflowSteps: unknown[] | null | undefined;
};

const categoryOrder: Record<ProjectCategory, number> = {
  web: 0,
  mobile: 1,
  automation: 2,
};

const asRecord = (value: unknown): Record<string, unknown> => {
  if (!value || typeof value !== "object") {
    return {};
  }

  return value as Record<string, unknown>;
};

const toStringValue = (value: unknown, fallback = ""): string => {
  if (typeof value === "string") {
    return value;
  }

  if (value == null) {
    return fallback;
  }

  return String(value);
};

const toNullableString = (value: unknown): string | null => {
  if (typeof value === "string") {
    return value;
  }

  return null;
};

const toNumberValue = (value: unknown, fallback = 0): number => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const toBooleanValue = (value: unknown, fallback = false): boolean => {
  if (typeof value === "boolean") {
    return value;
  }

  return fallback;
};

const parseCategory = (value: unknown): ProjectCategory => {
  const normalized = toStringValue(value, "web").toLowerCase();
  if (normalized === "mobile") return "mobile";
  if (normalized === "automation") return "automation";
  return "web";
};

const parseRepoVisibility = (value: unknown): RepoVisibility => {
  const normalized = toStringValue(value, "private").toLowerCase();
  if (normalized === "public") return "public";
  if (normalized === "none") return "none";
  return "private";
};

const parseMediaType = (value: unknown): "cover" | "mobile_screen" | "workflow_bg" => {
  const normalized = toStringValue(value, "cover").toLowerCase();
  if (normalized === "mobile_screen") return "mobile_screen";
  if (normalized === "workflow_bg") return "workflow_bg";
  return "cover";
};

const mapProjects = (rows: unknown[]): Project[] => {
  return rows.map((row, index) => {
    const item = asRecord(row);

    return {
      id: toNumberValue(item.id, index + 1),
      slug: toStringValue(item.slug, `project-${index + 1}`),
      category: parseCategory(item.category),
      title: toStringValue(item.title, "Unbenanntes Projekt"),
      subtitle: toNullableString(item.subtitle),
      description: toStringValue(item.description, ""),
      accent_from: toStringValue(item.accent_from, "from-sky-500"),
      accent_to: toStringValue(item.accent_to, "to-blue-600"),
      status_label: toNullableString(item.status_label),
      demo_url: toNullableString(item.demo_url),
      repo_url: toNullableString(item.repo_url),
      repo_visibility: parseRepoVisibility(item.repo_visibility),
      is_visible: toBooleanValue(item.is_visible, true),
      sort_order: toNumberValue(item.sort_order, 0),
    };
  });
};

const mapKpis = (rows: unknown[]): ProjectKpi[] => {
  return rows.map((row, index) => {
    const item = asRecord(row);

    return {
      id: toNumberValue(item.id, index + 1),
      project_id: toNumberValue(item.project_id, 0),
      label: toStringValue(item.label, ""),
      value: toStringValue(item.value, ""),
      sort_order: toNumberValue(item.sort_order, 0),
    };
  });
};

const mapTags = (rows: unknown[]): ProjectTag[] => {
  return rows.map((row, index) => {
    const item = asRecord(row);

    return {
      id: toNumberValue(item.id, index + 1),
      project_id: toNumberValue(item.project_id, 0),
      tag: toStringValue(item.tag, ""),
      sort_order: toNumberValue(item.sort_order, 0),
    };
  });
};

const mapMedia = (rows: unknown[]): ProjectMedia[] => {
  return rows.map((row, index) => {
    const item = asRecord(row);

    return {
      id: toNumberValue(item.id, index + 1),
      project_id: toNumberValue(item.project_id, 0),
      media_type: parseMediaType(item.media_type),
      url: toStringValue(item.url, ""),
      alt: toNullableString(item.alt),
      sort_order: toNumberValue(item.sort_order, 0),
    };
  });
};

const mapWorkflowSteps = (rows: unknown[]): ProjectWorkflowStep[] => {
  return rows.map((row, index) => {
    const item = asRecord(row);

    return {
      id: toNumberValue(item.id, index + 1),
      project_id: toNumberValue(item.project_id, 0),
      step_label: toStringValue(item.step_label, ""),
      step_tone: toStringValue(item.step_tone, "orange"),
      sort_order: toNumberValue(item.sort_order, 0),
    };
  });
};

const groupByProjectId = <T extends { project_id: number; sort_order: number }>(items: T[]): Map<number, T[]> => {
  const grouped = new Map<number, T[]>();

  items.forEach((item) => {
    const current = grouped.get(item.project_id) ?? [];
    current.push(item);
    grouped.set(item.project_id, current);
  });

  grouped.forEach((value, key) => {
    grouped.set(
      key,
      [...value].sort((a, b) => a.sort_order - b.sort_order),
    );
  });

  return grouped;
};

export const buildProjectsWithRelations = ({
  projects,
  kpis,
  tags,
  media,
  workflowSteps,
}: MappingInput): ProjectWithRelations[] => {
  const mappedProjects = mapProjects(projects ?? []).filter((project) => project.is_visible);
  const mappedKpis = mapKpis(kpis ?? []);
  const mappedTags = mapTags(tags ?? []);
  const mappedMedia = mapMedia(media ?? []);
  const mappedSteps = mapWorkflowSteps(workflowSteps ?? []);

  const kpiMap = groupByProjectId(mappedKpis);
  const tagMap = groupByProjectId(mappedTags);
  const mediaMap = groupByProjectId(mappedMedia);
  const stepMap = groupByProjectId(mappedSteps);

  return mappedProjects
    .map((project) => ({
      ...project,
      kpis: kpiMap.get(project.id) ?? [],
      tags: tagMap.get(project.id) ?? [],
      media: mediaMap.get(project.id) ?? [],
      workflowSteps: stepMap.get(project.id) ?? [],
    }))
    .sort((a, b) => {
      const categoryDiff = categoryOrder[a.category] - categoryOrder[b.category];
      if (categoryDiff !== 0) {
        return categoryDiff;
      }

      return a.sort_order - b.sort_order;
    });
};
