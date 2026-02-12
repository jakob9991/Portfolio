import { Terminal } from "lucide-react";
import { Skill, SectionAnimationConfig } from "./types";
import { SkillCategorySection } from "./SkillCategorySection";

const animConfig: SectionAnimationConfig = {
  theme: "tools",
  cardEntrance: "terminal-print",
  progressBar: "terminal",
  hover: "terminal-prefix",
  accentColor: "orange",
  accentColorTw: "orange-400",
  backgroundDecorator: "tools",
  headerExtra: "typewriter",
};

export const ToolsSection = ({ skills }: { skills: Skill[] }) => {
  return (
    <SkillCategorySection
      skills={skills}
      type="tool"
      title="Tools & Workflow"
      terminalPath="~/tools"
      headingClassName="text-orange-400"
      sectionClassName="tools-section"
      icon={<Terminal className="w-3 h-3" />}
      animConfig={animConfig}
    />
  );
};
