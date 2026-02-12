export type SkillType =
  | "language"
  | "frontend"
  | "mobile"
  | "backend_data"
  | "devops"
  | "tool";

export type Skill = {
  id: number;
  type: SkillType;
  name: string;
  proficiency: number;
  icon_name: string;
  description: string | null;
  is_visible: boolean;
};

export type ThemeVariant =
  | "languages"
  | "frontend"
  | "mobile"
  | "backend"
  | "devops"
  | "tools";

export type CardEntranceType =
  | "compiler-scan"
  | "spring-bounce"
  | "swipe-alternate"
  | "sequential-shimmer"
  | "pipeline-stage"
  | "terminal-print";

export type ProgressBarVariant =
  | "stepped"
  | "default"
  | "glitch"
  | "terminal";

export type HoverVariant =
  | "default"
  | "gradient-shimmer"
  | "ripple-tilt"
  | "data-pulse"
  | "deploy-status"
  | "terminal-prefix";

export interface SectionAnimationConfig {
  theme: ThemeVariant;
  cardEntrance: CardEntranceType;
  progressBar: ProgressBarVariant;
  hover: HoverVariant;
  accentColor: string;
  accentColorTw: string;
  backgroundDecorator?: ThemeVariant;
  headerExtra?: "cursor" | "typewriter";
}

export interface ThemeStyles {
  headerBorder: string;
  headerBg: string;
  headerBarColor: string;
  cardBg: string;
  cardBorder: string;
  cardHoverBorder: string;
  progressGradient: string;
  accentText: string;
  glowColor: string;
}

export const themeStylesMap: Record<ThemeVariant, ThemeStyles> = {
  languages: {
    headerBorder: "border-yellow-500/15",
    headerBg: "bg-[#141210]/70",
    headerBarColor: "#1a1710",
    cardBg: "bg-[#13120f]/60",
    cardBorder: "border-yellow-500/10",
    cardHoverBorder: "hover:border-yellow-500/30",
    progressGradient: "from-yellow-500 to-amber-500",
    accentText: "text-yellow-400",
    glowColor: "shadow-yellow-500/5",
  },
  frontend: {
    headerBorder: "border-blue-500/15",
    headerBg: "bg-[#0e1118]/70",
    headerBarColor: "#111620",
    cardBg: "bg-[#0d1017]/60",
    cardBorder: "border-blue-500/10",
    cardHoverBorder: "hover:border-blue-500/30",
    progressGradient: "from-blue-500 to-cyan-500",
    accentText: "text-blue-400",
    glowColor: "shadow-blue-500/5",
  },
  mobile: {
    headerBorder: "border-pink-500/15",
    headerBg: "bg-[#140e14]/70",
    headerBarColor: "#1a1119",
    cardBg: "bg-[#130d12]/60",
    cardBorder: "border-pink-500/10",
    cardHoverBorder: "hover:border-pink-500/30",
    progressGradient: "from-pink-500 to-rose-400",
    accentText: "text-pink-400",
    glowColor: "shadow-pink-500/5",
  },
  backend: {
    headerBorder: "border-emerald-500/15",
    headerBg: "bg-[#0e1412]/70",
    headerBarColor: "#0f1a17",
    cardBg: "bg-[#0d130f]/60",
    cardBorder: "border-emerald-500/10",
    cardHoverBorder: "hover:border-emerald-500/30",
    progressGradient: "from-emerald-500 to-teal-500",
    accentText: "text-emerald-400",
    glowColor: "shadow-emerald-500/5",
  },
  devops: {
    headerBorder: "border-purple-500/15",
    headerBg: "bg-[#120e18]/70",
    headerBarColor: "#16111f",
    cardBg: "bg-[#110d16]/60",
    cardBorder: "border-purple-500/10",
    cardHoverBorder: "hover:border-purple-500/30",
    progressGradient: "from-purple-500 to-violet-500",
    accentText: "text-purple-400",
    glowColor: "shadow-purple-500/5",
  },
  tools: {
    headerBorder: "border-orange-500/15",
    headerBg: "bg-[#14110e]/70",
    headerBarColor: "#1a1510",
    cardBg: "bg-[#13100d]/60",
    cardBorder: "border-orange-500/10",
    cardHoverBorder: "hover:border-orange-500/30",
    progressGradient: "from-orange-500 to-amber-500",
    accentText: "text-orange-400",
    glowColor: "shadow-orange-500/5",
  },
};

