import { Smartphone } from "lucide-react";
import { TerminalHeader } from "@/components/ui/terminal";
import { ProjectWithRelations } from "../types";

type MobilePreviewProps = {
  project: ProjectWithRelations;
  chapterGlowClass: string;
};

export const MobilePreview = ({ project, chapterGlowClass }: MobilePreviewProps) => {
  const screens = project.media
    .filter((item) => item.media_type === "mobile_screen")
    .sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="project-visual relative group/preview">
      <div className={`absolute -inset-4 rounded-2xl blur-2xl opacity-25 group-hover/preview:opacity-35 transition duration-700 bg-gradient-to-r ${chapterGlowClass}`} />

      <div className="relative bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden">
        <TerminalHeader
          dots="small"
          className="!h-8"
          title={<span className="text-[10px] text-gray-600 font-mono hidden sm:block">Mobile-Simulator</span>}
        />

        <div className="relative aspect-video bg-[#0a0a0a] overflow-hidden p-4 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.08),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.08),transparent_45%)]" />

          {screens.length > 0 ? (
            <div className="relative z-10 flex justify-center items-center gap-2 sm:gap-4 h-full w-full">
              {screens.map((screen, index) => (
                <div
                  key={screen.id}
                  className={`mobile-screen relative h-full w-auto aspect-[9/19.5] rounded-xl overflow-hidden border-4 border-[#1a1a1a] shadow-2xl bg-black transform transition-all duration-500 group-hover/preview:scale-105 ${index === 1 ? "z-20 scale-105" : "z-10 scale-95 opacity-85"}`}
                >
                  <img src={screen.url} alt={screen.alt ?? `${project.title} Screen ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <Smartphone className="w-20 h-20 text-white/35" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
