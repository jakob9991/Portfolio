import { ExternalLink, Github, Lock } from "lucide-react";
import { ProjectWithRelations } from "../types";
import { CategoryStyle } from "../styles";

type ProjectInfoPanelProps = {
  project: ProjectWithRelations;
  style: CategoryStyle;
};

export const ProjectInfoPanel = ({ project, style }: ProjectInfoPanelProps) => {
  return (
    <div className="project-info font-mono space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h3 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h3>
          {project.status_label ? (
            <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-white/5 border border-white/10 text-gray-300">
              {project.status_label}
            </span>
          ) : null}
        </div>
        {project.subtitle ? (
          <p className={`text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r ${project.accent_from} ${project.accent_to}`}>
            {project.subtitle}
          </p>
        ) : null}
      </div>

      {project.kpis.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          {project.kpis.map((kpi) => (
            <div key={kpi.id} className="project-kpi rounded-lg bg-white/5 border border-white/10 p-3">
              <div className="text-[11px] text-gray-500 mb-1">{kpi.label}</div>
              <div className="text-sm text-gray-200 font-semibold">{kpi.value}</div>
            </div>
          ))}
        </div>
      ) : null}

      <div className={`border-l-2 pl-4 text-gray-300 leading-relaxed text-sm ${style.descriptionBorderClass}`}>
        {project.description}
      </div>

      {project.tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag.id} className={`project-tag px-2 py-1 text-xs rounded border ${style.tagClass}`}>
              {tag.tag}
            </span>
          ))}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
        {project.demo_url ? (
          <a
            href={project.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm font-semibold ${style.demoClass}`}
          >
            <ExternalLink className="w-4 h-4" />
            Live-Demo
          </a>
        ) : null}

        {project.repo_visibility === "public" && project.repo_url ? (
          <a
            href={project.repo_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white transition-all text-sm ${style.codeClass}`}
          >
            <Github className="w-4 h-4" />
            Code ansehen
          </a>
        ) : null}

        {project.repo_visibility === "private" ? (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-sm">
            <Lock className="w-4 h-4" />
            Privates Repo
          </div>
        ) : null}
      </div>
    </div>
  );
};
