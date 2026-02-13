import { ExternalLink, Github, Globe2, Lock } from "lucide-react";
import { TerminalHeader } from "@/components/ui/terminal";
import { getCategoryStyle } from "../styles";
import { ProjectWithRelations } from "../types";
import { WebPreview } from "../visuals/WebPreview";

type WebChapterProps = {
  projects: ProjectWithRelations[];
};

export const WebChapter = ({ projects }: WebChapterProps) => {
  const style = getCategoryStyle("web");

  return (
    <div className="project-chapter chapter-web mb-28">
      <div className="bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden mb-8">
        <TerminalHeader
          title={
            <>
              <Globe2 className="w-3 h-3" />
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
          Noch kein Web-Projekt hinterlegt. Fuege in `projects` einen Eintrag mit Kategorie `web` hinzu.
        </div>
      ) : (
        <div className="space-y-10">
          {projects.map((project) => (
            <article
              key={project.id}
              className={`project-card web-launch-card rounded-2xl border border-white/5 bg-[#0f1219]/60 backdrop-blur-xl p-6 md:p-8 transition-all duration-300 ${style.borderHoverClass}`}
            >
              <div className="web-hero mb-7">
                <WebPreview project={project} chapterGlowClass={style.glowClass} />
              </div>

              <div className="grid lg:grid-cols-[1.35fr_0.65fr] gap-6">
                <div className="font-mono">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded border ${style.tagClass}`}>
                      Launch Surface
                    </span>
                    <span className="text-xs text-gray-500">{project.slug}</span>
                  </div>

                  <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h4>
                  {project.subtitle ? (
                    <p className={`text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r ${project.accent_from} ${project.accent_to} mb-4`}>
                      {project.subtitle}
                    </p>
                  ) : null}

                  <div className={`border-l-2 pl-4 text-gray-300 leading-relaxed text-sm mb-5 ${style.descriptionBorderClass}`}>
                    {project.description}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag.id} className={`project-tag px-2 py-1 text-xs rounded border ${style.tagClass}`}>
                        {tag.tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="font-mono space-y-3">
                  {project.kpis.map((kpi) => (
                    <div key={kpi.id} className="project-kpi rounded-lg bg-white/5 border border-white/10 p-3">
                      <div className="text-[11px] text-gray-500 mb-1">{kpi.label}</div>
                      <div className="text-sm text-gray-200 font-semibold">{kpi.value}</div>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-white/5 flex flex-col gap-2">
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
