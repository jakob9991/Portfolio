import { Terminal } from "lucide-react";
import { TerminalHeader } from "@/components/ui/terminal";
import { AboutProfile } from "./types";

type AboutBioCardProps = {
  profile: AboutProfile;
};

export const AboutBioCard = ({ profile }: AboutBioCardProps) => {
  return (
    <div className="bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl shadow-2xl overflow-hidden group relative">
      <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-sky-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />

      <TerminalHeader
        title={
          <>
            <Terminal className="w-3 h-3" />
            ~/about
          </>
        }
      />

      <div className="p-6 font-mono">
        <div className="pl-4 border-l-2 border-sky-500/30 space-y-3 text-sm">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {profile.section_title_prefix} <span className="text-sky-400">{profile.section_title_highlight}</span>
            </h2>
          </div>

          <p className="text-gray-300 leading-relaxed">{profile.intro_text}</p>
          <p className="text-gray-400 leading-relaxed">{profile.detail_text}</p>
        </div>
      </div>
    </div>
  );
};

