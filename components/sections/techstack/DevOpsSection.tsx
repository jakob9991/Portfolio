import { Wrench } from "lucide-react";
import { Skill, SectionAnimationConfig } from "./types";
import { SkillCategorySection } from "./SkillCategorySection";

const animConfig: SectionAnimationConfig = {
  theme: "devops",
  cardEntrance: "pipeline-stage",
  progressBar: "default",
  hover: "deploy-status",
  accentColor: "purple",
  accentColorTw: "purple-400",
  backgroundDecorator: "devops",
};

export const DevOpsSection = ({ skills }: { skills: Skill[] }) => {
  return (
    <SkillCategorySection
      skills={skills}
      type="devops"
      title="DevOps & Infrastruktur"
      terminalPath="~/devops"
      headingClassName="text-purple-400"
      sectionClassName="devops-section"
      icon={<Wrench className="w-3 h-3" />}
      animConfig={animConfig}
    />
  );
};
