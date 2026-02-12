import Image from "next/image";
import { Terminal } from "lucide-react";
import { TerminalHeader } from "@/components/ui/terminal";
import { AboutProfile } from "./types";

type AboutProfileCardProps = {
  profile: AboutProfile;
};

export const AboutProfileCard = ({ profile }: AboutProfileCardProps) => {
  return (
    <div className="bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl shadow-2xl overflow-hidden group relative">
      <div className="absolute -inset-[1px] bg-gradient-to-br from-cyan-500/20 via-transparent to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />

      <TerminalHeader
        title={
          <>
            <Terminal className="w-3 h-3" />
            ~/profile
          </>
        }
      />

      <div className="relative aspect-square">
        <Image
          src={profile.profile_image_url}
          alt={profile.display_name}
          fill
          className="object-cover"
          sizes="400px"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0f1219] via-[#0f1219]/50 to-transparent" />
      </div>

      <div className="p-4 bg-[#0a0d14]/80 border-t border-white/5 font-mono text-xs">
        <div className="flex items-center justify-between text-gray-500">
          <span className="text-gray-400">{profile.location_label}</span>
          <span className="text-cyan-400">{profile.location_value}</span>
        </div>
      </div>
    </div>
  );
};

