import { Cpu } from "lucide-react";
import { Skill, SectionAnimationConfig } from "./types";
import { SkillCategorySection } from "./SkillCategorySection";

const animConfig: SectionAnimationConfig = {
  theme: "backend",
  cardEntrance: "sequential-shimmer",
  progressBar: "glitch",
  hover: "data-pulse",
  accentColor: "emerald",
  accentColorTw: "emerald-400",
  backgroundDecorator: "backend",
};

export const BackendDataSection = ({ skills }: { skills: Skill[] }) => {
  return (
    <SkillCategorySection
      skills={skills}
      type="backend_data"
      title="Backend & Data"
      terminalPath="~/backend_data"
      headingClassName="text-emerald-400"
      sectionClassName="backend-data-section"
      icon={<Cpu className="w-3 h-3" />}
      animConfig={animConfig}
    />
  );
};
