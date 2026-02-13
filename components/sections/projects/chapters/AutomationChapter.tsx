import { Activity, ExternalLink, Github, Lock, Workflow } from "lucide-react";
import { TerminalHeader } from "@/components/ui/terminal";
import { getCategoryStyle, getStepToneClass } from "../styles";
import { ProjectWithRelations } from "../types";
import { AutomationPreview } from "../visuals/AutomationPreview";

type AutomationChapterProps = {
  projects: ProjectWithRelations[];
};

export const AutomationChapter = ({ projects }: AutomationChapterProps) => {
  const style = getCategoryStyle("automation");

  return (
    <div className="project-chapter chapter-automation mb-16">
      <div className="bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden mb-8">
        <TerminalHeader
          title={
            <>
              <Workflow className="w-3 h-3" />
              {style.chapterPath}
            </>
          }
        />
        <div className="p-6 font-mono">
          <h3 className="text-2xl font-bold text-white mb-2">
            <span className={style.chapterTitleAccentClass}>{style.label}</span> · {style.chapterTitle}
          </h3>
          <p className="text-sm text-gray-400">{style.chapterDescription}</p>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#0f1219]/40 p-6 font-mono text-sm text-gray-400">
          Noch kein Automation-Projekt hinterlegt. Fuege in `projects` einen Eintrag mit Kategorie `automation` hinzu.
        </div>
      ) : (
        <div className="space-y-10">
          {projects.map((project) => (
            <article
              key={project.id}
              className={`project-card automation-board rounded-2xl border border-white/5 bg-[#0f1219]/60 backdrop-blur-xl p-6 md:p-8 transition-all duration-300 ${style.borderHoverClass}`}
            >
              <div className="mb-4 flex items-center justify-between font-mono">
                <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded border ${style.tagClass}`}>
                  Flow Orchestration
                </span>
                <span className="inline-flex items-center gap-2 text-xs text-gray-500">
                  <Activity className="w-3 h-3 text-orange-300" />
                  control-panel
                </span>
              </div>

              <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
                <AutomationPreview project={project} chapterGlowClass={style.glowClass} />

                <div className="automation-control-panel font-mono">
                  <h4 className="text-2xl font-bold text-white mb-1">{project.title}</h4>
                  {project.subtitle ? (
                    <p className={`text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${project.accent_from} ${project.accent_to} mb-4`}>
                      {project.subtitle}
                    </p>
                  ) : null}

                  <p className="text-sm text-gray-300 leading-relaxed mb-5">{project.description}</p>

                  <div className="relative pl-6 border-l border-white/10 space-y-3 mb-5">
                    {project.workflowSteps.map((step) => (
                      <div key={step.id} className="workflow-step-node relative">
                        <div className="absolute -left-[31px] top-2 w-3 h-3 rounded-full border border-white/20 bg-[#0a0d14]" />
                        <div className={`workflow-step rounded border px-2 py-2 font-mono text-[11px] ${getStepToneClass(step.step_tone)}`}>
                          {step.step_label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) => (
                      <span key={tag.id} className={`project-tag px-2 py-1 text-xs rounded border ${style.tagClass}`}>
                        {tag.tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
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
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
