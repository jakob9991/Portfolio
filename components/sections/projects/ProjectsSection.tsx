"use client";

import { useMemo, useRef } from "react";
import { Terminal } from "lucide-react";
import { SectionHeader } from "@/components/ui/terminal";
import { useProjectsChapterAnimations } from "./animations/useProjectsChapterAnimations";
import { AutomationChapter } from "./chapters/AutomationChapter";
import { MobileChapter } from "./chapters/MobileChapter";
import { WebChapter } from "./chapters/WebChapter";
import { ProjectWithRelations } from "./types";

type ProjectsSectionProps = {
  projects: ProjectWithRelations[];
};

export const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  useProjectsChapterAnimations(sectionRef);

  const grouped = useMemo(() => {
    const visible = projects.filter((project) => project.is_visible);

    return {
      web: visible.filter((project) => project.category === "web"),
      mobile: visible.filter((project) => project.category === "mobile"),
      automation: visible.filter((project) => project.category === "automation"),
    };
  }, [projects]);

  return (
    <section ref={sectionRef} id="projects" className="py-32 relative bg-[#0a0d14] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="projects-section-header max-w-4xl mx-auto mb-20">
          <SectionHeader
            terminalTitle={
              <>
                <Terminal className="w-3 h-3" />
                ~/projects
              </>
            }
            title={
              <>
                Narrative <span className="text-sky-400">Showcase</span>
              </>
            }
          />
        </div>

        <WebChapter projects={grouped.web} />
        <MobileChapter projects={grouped.mobile} />
        <AutomationChapter projects={grouped.automation} />
      </div>
    </section>
  );
};
