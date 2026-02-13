import { Workflow } from "lucide-react";
import { TerminalHeader } from "@/components/ui/terminal";
import { ProjectWithRelations } from "../types";

type AutomationPreviewProps = {
  project: ProjectWithRelations;
  chapterGlowClass: string;
};

export const AutomationPreview = ({ project, chapterGlowClass }: AutomationPreviewProps) => {
  const background = project.media.find((item) => item.media_type === "workflow_bg");

  return (
    <div className="project-visual relative group/preview">
      <div className={`absolute -inset-4 rounded-2xl blur-2xl opacity-25 group-hover/preview:opacity-35 transition duration-700 bg-gradient-to-r ${chapterGlowClass}`} />

      <div className="relative bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden">
        <TerminalHeader
          dots="small"
          className="!h-8"
          title={<span className="text-[10px] text-gray-600 font-mono hidden sm:block">Flow Canvas</span>}
        />

        <div className="relative aspect-video bg-[#0a0a0a] overflow-hidden">
          {background ? (
            <img
              src={background.url}
              alt={background.alt ?? `${project.title} Workflow`}
              className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover/preview:scale-105"
            />
          ) : null}

          <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.10)_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute inset-0 bg-[#0a0a0a]/55" />

          <div className="absolute inset-0 p-6 flex items-center justify-center">
            <div className="w-full max-w-xl grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
              <div className="rounded border border-orange-500/40 bg-orange-500/10 px-3 py-2 text-xs font-mono text-orange-200 text-center">
                Webhook Trigger
              </div>
              <div className="h-[2px] bg-orange-500/40" />
              <div className="rounded border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs font-mono text-amber-200 text-center">
                AI Parse + Enrich
              </div>
              <div className="h-[2px] bg-amber-500/40" />
              <div className="rounded border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-mono text-red-200 text-center">
                CRM / Notify
              </div>
            </div>
          </div>

          {!background ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Workflow className="w-20 h-20 text-white/35" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
