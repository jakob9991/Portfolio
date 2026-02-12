import { Download } from "lucide-react";
import { GlassCard } from "@/components/ui/terminal";
import { AboutResume } from "./types";

type AboutResumeCardProps = {
  resume: AboutResume;
};

export const AboutResumeCard = ({ resume }: AboutResumeCardProps) => {
  const handleOpenInNewTab = () => {
    window.open(resume.file_url, "_blank", "noopener,noreferrer");
  };

  return (
    <GlassCard hoverEffect className="hover:border-sky-500/30 p-6">
      <div className="flex items-center justify-between">
        <div className="font-mono">
          <div className="text-xs text-gray-500 mb-1">{resume.file_label}</div>
          <div className="text-sm text-gray-300">{resume.file_name}</div>
          <div className="text-xs text-gray-600 mt-1">{resume.file_meta}</div>
        </div>
        <button
          onClick={handleOpenInNewTab}
          aria-label={resume.button_label}
          className="flex items-center justify-center w-12 h-12 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500/20 hover:scale-110 transition-all group"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>
    </GlassCard>
  );
};

