import { Code2 } from "lucide-react";
import { Skill, SectionAnimationConfig } from "./types";
import { SkillCategorySection } from "./SkillCategorySection";

const animConfig: SectionAnimationConfig = {
  theme: "languages",
  cardEntrance: "compiler-scan",
  progressBar: "stepped",
  hover: "default",
  accentColor: "yellow",
  accentColorTw: "yellow-400",
  headerExtra: "cursor",
};

export const LanguageSection = ({ skills }: { skills: Skill[] }) => {
  return (
    <SkillCategorySection
      skills={skills}
      type="language"
      title="Programmiersprachen"
      terminalPath="~/languages"
      headingClassName="text-yellow-400"
      sectionClassName="languages-section"
      icon={<Code2 className="w-3 h-3" />}
      animConfig={animConfig}
    />
  );
};
