import { ExternalLink, Github, Lock, Smartphone, Sparkles } from "lucide-react";
import { TerminalHeader } from "@/components/ui/terminal";
import { getCategoryStyle } from "../styles";
import { ProjectWithRelations } from "../types";
import { MobilePreview } from "../visuals/MobilePreview";

type MobileChapterProps = {
  projects: ProjectWithRelations[];
};

export const MobileChapter = ({ projects }: MobileChapterProps) => {
  const style = getCategoryStyle("mobile");

  return (
    <div className="project-chapter chapter-mobile mb-28">
      <div className="bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden mb-8">
        <TerminalHeader
          title={
            <>
              <Smartphone className="w-3 h-3" />
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
          Noch kein Mobile-Projekt hinterlegt. Fuege in `projects` einen Eintrag mit Kategorie `mobile` hinzu.
        </div>
      ) : (
        <div className="space-y-10">
          {projects.map((project) => (
            <article
              key={project.id}
              className={`project-card mobile-story-card rounded-2xl border border-white/5 bg-[#0f1219]/60 backdrop-blur-xl p-6 md:p-8 transition-all duration-300 ${style.borderHoverClass}`}
            >
              <div className="grid lg:grid-cols-[1.05fr_1.3fr_0.9fr] gap-6 items-start">
                <div className="mobile-story-panel font-mono space-y-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded border ${style.tagClass}`}>
                      Product Experience
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                      <Sparkles className="w-3 h-3" />
                      device-wall
                    </span>
                  </div>

                  <h4 className="text-2xl font-bold text-white">{project.title}</h4>
                  {project.subtitle ? (
                    <p className={`text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${project.accent_from} ${project.accent_to}`}>
                      {project.subtitle}
                    </p>
                  ) : null}

                  <p className="text-sm text-gray-300 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag.id} className={`project-tag px-2 py-1 text-xs rounded border ${style.tagClass}`}>
                        {tag.tag}
                      </span>
                    ))}
                  </div>
                </div>

                <MobilePreview project={project} chapterGlowClass={style.glowClass} />

                <div className="mobile-journey-panel font-mono">
                  <div className="rounded-xl border border-white/10 bg-black/25 p-4">
                    <div className="text-xs text-gray-500 mb-3">User Journey</div>
                    <div className="space-y-3">
                      {project.kpis.map((kpi, index) => (
                        <div key={kpi.id} className="project-kpi flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full border border-emerald-400/40 text-emerald-300 text-[11px] flex items-center justify-center shrink-0">
                            {index + 1}
                          </div>
                          <div>
                            <div className="text-[11px] text-gray-500">{kpi.label}</div>
                            <div className="text-sm text-gray-200 font-semibold">{kpi.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex flex-col gap-2">
                    {project.demo_url ? (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm font-semibold ${style.demoClass}`}
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
                        className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white transition-all text-sm ${style.codeClass}`}
                      >
                        <Github className="w-4 h-4" />
                        Code ansehen
                      </a>
                    ) : null}

                    {project.repo_visibility === "private" ? (
                      <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-sm">
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
