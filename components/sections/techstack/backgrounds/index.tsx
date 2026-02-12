"use client";

import { RefObject } from "react";
import { ThemeVariant } from "../types";
import { FrontendBackground } from "./FrontendBackground";
import { BackendBackground } from "./BackendBackground";
import { DevOpsBackground } from "./DevOpsBackground";
import { ToolsBackground } from "./ToolsBackground";

export const BackgroundDecorator = ({
  variant,
  sectionRef,
}: {
  variant: ThemeVariant;
  sectionRef: RefObject<HTMLDivElement | null>;
}) => {
  switch (variant) {
    case "frontend":
      return <FrontendBackground sectionRef={sectionRef} />;
    case "backend":
      return <BackendBackground sectionRef={sectionRef} />;
    case "devops":
      return <DevOpsBackground sectionRef={sectionRef} />;
    case "tools":
      return <ToolsBackground />;
    default:
      return null;
  }
};
