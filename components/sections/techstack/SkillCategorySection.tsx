"use client";

import { useRef } from "react";
import { TerminalHeader } from "@/components/ui/terminal";
import { useMobile } from "@/hooks/useMobile";
import { ReactNode } from "react";
import { Skill, SkillType, SectionAnimationConfig, themeStylesMap } from "./types";
import { SkillCard } from "./cards/SkillCard";
import { BackgroundDecorator } from "./backgrounds";
import { useCardEntrance } from "./animations/useCardEntrance";
import { useProgressBarAnimation } from "./animations/useProgressBarAnimation";

type SkillCategorySectionProps = {
  skills: Skill[];
  type: SkillType;
  title: string;
  terminalPath: string;
  headingClassName: string;
  sectionClassName: string;
  icon: ReactNode;
  animConfig: SectionAnimationConfig;
};

export const SkillCategorySection = ({
  skills,
  type,
  title,
  terminalPath,
  headingClassName,
  sectionClassName,
  icon,
  animConfig,
}: SkillCategorySectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  const styles = themeStylesMap[animConfig.theme];

  const filteredSkills = skills
    .filter((skill) => skill.is_visible && skill.type === type)
    .sort((a, b) => b.proficiency - a.proficiency);

  useCardEntrance(gridRef, sectionRef, animConfig.cardEntrance, isMobile);
  useProgressBarAnimation(gridRef, sectionRef, animConfig.progressBar, isMobile);

  if (filteredSkills.length === 0) {
    return null;
  }

  const headerBorderStyle = animConfig.theme === "devops" ? "border-dashed" : "";

  return (
    <div ref={sectionRef} className={`techstack-section ${sectionClassName} mb-20 relative`}>
      {!isMobile && animConfig.backgroundDecorator && (
        <BackgroundDecorator variant={animConfig.backgroundDecorator} sectionRef={sectionRef} />
      )}

      <div className={`${styles.headerBg} backdrop-blur-xl border ${styles.headerBorder} ${headerBorderStyle} rounded-xl overflow-hidden mb-8 relative z-10`}>
        <TerminalHeader
          title={
            <>
              {icon}
              {terminalPath}
            </>
          }
          style={{ backgroundColor: styles.headerBarColor }}
        />
        <div className="p-6 font-mono flex items-center gap-2">
          <h3 className={`text-2xl font-bold ${headingClassName}`}>{title}</h3>
          {animConfig.headerExtra === "cursor" && (
            <span className="w-0.5 h-6 bg-yellow-400 blink-cursor" />
          )}
          {animConfig.headerExtra === "typewriter" && (
            <span className="w-0.5 h-6 bg-orange-400 blink-cursor" />
          )}
        </div>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        {filteredSkills.map((skill, index) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            index={index}
            animConfig={animConfig}
          />
        ))}
      </div>
    </div>
  );
};
