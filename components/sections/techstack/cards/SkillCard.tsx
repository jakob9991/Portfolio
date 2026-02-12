"use client";

import { useRef, useCallback } from "react";
import { gsap } from "gsap";
import { Skill, SectionAnimationConfig, themeStylesMap } from "../types";
import { useMobile } from "@/hooks/useMobile";

type Props = {
  skill: Skill;
  index: number;
  animConfig: SectionAnimationConfig;
};

const hoverCardClasses: Partial<Record<SectionAnimationConfig["hover"], string>> = {
  "gradient-shimmer": "frontend-shimmer-card",
  "ripple-tilt": "mobile-ripple-card",
};

export const SkillCard = ({ skill, animConfig }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  const styles = themeStylesMap[animConfig.theme];

  const themeCardClass = hoverCardClasses[animConfig.hover] ?? "";
  const borderStyle = animConfig.theme === "devops" ? "border-dashed" : "";
  const leftAccent = animConfig.theme === "languages" ? "border-l-[3px] border-l-yellow-500/15" : "";

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || animConfig.hover !== "ripple-tilt") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(e.currentTarget, {
      rotateY: x * 12,
      rotateX: -y * 12,
      transformPerspective: 600,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, [isMobile, animConfig.hover]);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || animConfig.hover !== "ripple-tilt") return;
    gsap.to(e.currentTarget, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  }, [isMobile, animConfig.hover]);

  return (
    <div
      ref={cardRef}
      className={`skill-card group ${styles.cardBg} backdrop-blur-xl border ${styles.cardBorder} ${borderStyle} ${leftAccent} ${styles.cardHoverBorder} rounded-lg p-5 transition-all duration-300 relative overflow-hidden ${themeCardClass} hover:shadow-lg ${styles.glowColor}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {animConfig.cardEntrance === "sequential-shimmer" && (
        <div className="shimmer-overlay" />
      )}

      <div className="flex items-start gap-4 relative z-10">
        <div className="text-3xl leading-none">{skill.icon_name}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4 mb-2">
            <h4 className="font-mono font-bold text-white text-base truncate flex items-center gap-1">
              {animConfig.hover === "terminal-prefix" && (
                <span className="opacity-0 group-hover:opacity-100 text-orange-400 transition-opacity duration-200 font-mono blink-cursor">
                  {">"}&nbsp;
                </span>
              )}
              {skill.name}
            </h4>
            <span className={`text-sm font-mono ${styles.accentText}`}>
              {skill.proficiency}%
            </span>
          </div>

          {skill.description && (
            <p className="text-xs text-gray-400 mb-3">{skill.description}</p>
          )}

          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className={`progress-bar h-full rounded-full bg-gradient-to-r ${styles.progressGradient}`}
              data-proficiency={skill.proficiency}
            />
          </div>

          {animConfig.theme === "devops" && (
            <div className="deploy-status mt-2 text-[10px] font-mono text-gray-500 h-4" />
          )}
        </div>
      </div>
    </div>
  );
};
