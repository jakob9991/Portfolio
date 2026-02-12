import { GlassCard } from "@/components/ui/terminal";
import { AboutStat } from "./types";
import { getStatColorClasses } from "./helpers";

type AboutStatsGridProps = {
  stats: AboutStat[];
};

export const AboutStatsGrid = ({ stats }: AboutStatsGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat) => {
        const color = getStatColorClasses(stat.color_name);

        return (
          <GlassCard key={stat.id} hoverEffect className={color.border}>
            <div className={`text-3xl font-bold mb-1 font-mono ${color.text}`}>{stat.value}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
          </GlassCard>
        );
      })}
    </div>
  );
};

