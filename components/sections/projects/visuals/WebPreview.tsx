import { Layout } from "lucide-react";
import { TerminalHeader } from "@/components/ui/terminal";
import { ProjectWithRelations } from "../types";

type WebPreviewProps = {
  project: ProjectWithRelations;
  chapterGlowClass: string;
};

export const WebPreview = ({ project, chapterGlowClass }: WebPreviewProps) => {
  const cover = project.media.find((item) => item.media_type === "cover");

  return (
    <div className="project-visual relative group/preview">
      <div className={`absolute -inset-4 rounded-2xl blur-2xl opacity-25 group-hover/preview:opacity-35 transition duration-700 bg-gradient-to-r ${chapterGlowClass}`} />

      <div className="relative bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden">
        <TerminalHeader
          dots="small"
          className="!h-8"
          title={<span className="text-[10px] text-gray-600 font-mono hidden sm:block">Browser-Vorschau</span>}
        />

        <div className="relative aspect-video bg-[#0a0a0a] overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

          {cover ? (
            <img
              src={cover.url}
              alt={cover.alt ?? `${project.title} Preview`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/preview:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Layout className="w-20 h-20 text-white/35" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 grid grid-cols-2 gap-2 font-mono text-[10px]">
            <div className="rounded bg-black/60 border border-white/10 px-2 py-1 text-sky-200">Responsive UI</div>
            <div className="rounded bg-black/60 border border-white/10 px-2 py-1 text-sky-200">SEO Ready</div>
          </div>
        </div>
      </div>
    </div>
  );
};
