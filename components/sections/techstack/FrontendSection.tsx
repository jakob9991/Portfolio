import { Package } from "lucide-react";
import { Skill, SectionAnimationConfig } from "./types";
import { SkillCategorySection } from "./SkillCategorySection";

const animConfig: SectionAnimationConfig = {
  theme: "frontend",
  cardEntrance: "spring-bounce",
  progressBar: "default",
  hover: "gradient-shimmer",
  accentColor: "blue",
  accentColorTw: "blue-400",
  backgroundDecorator: "frontend",
};

export const FrontendSection = ({ skills }: { skills: Skill[] }) => {
  return (
    <SkillCategorySection
      skills={skills}
      type="frontend"
      title="Frontend (Frameworks & Styling)"
      terminalPath="~/frontend"
      headingClassName="text-blue-400"
      sectionClassName="frontend-section"
      icon={<Package className="w-3 h-3" />}
      animConfig={animConfig}
    />
  );
};
