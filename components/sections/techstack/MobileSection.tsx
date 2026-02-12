import { Smartphone } from "lucide-react";
import { Skill, SectionAnimationConfig } from "./types";
import { SkillCategorySection } from "./SkillCategorySection";

const animConfig: SectionAnimationConfig = {
  theme: "mobile",
  cardEntrance: "swipe-alternate",
  progressBar: "default",
  hover: "ripple-tilt",
  accentColor: "pink",
  accentColorTw: "pink-400",
};

export const MobileSection = ({ skills }: { skills: Skill[] }) => {
  return (
    <SkillCategorySection
      skills={skills}
      type="mobile"
      title="Mobile"
      terminalPath="~/mobile"
      headingClassName="text-pink-400"
      sectionClassName="mobile-section"
      icon={<Smartphone className="w-3 h-3" />}
      animConfig={animConfig}
    />
  );
};
