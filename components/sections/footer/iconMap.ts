import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Smartphone,
  Terminal,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  smartphone: Smartphone,
  "map-pin": MapPin,
};

export const getIconByName = (name?: string | null): LucideIcon => {
  if (!name) {
    return Terminal;
  }

  return iconMap[name.toLowerCase()] ?? Terminal;
};

export const getColorClasses = (colorName: string) => {
  switch (colorName.toLowerCase()) {
    case "cyan":
      return {
        border: "hover:border-cyan-500/30",
        iconBg: "bg-cyan-500/10",
        iconText: "text-cyan-400",
        valueText: "text-cyan-400",
      };
    case "emerald":
      return {
        border: "hover:border-emerald-500/30",
        iconBg: "bg-emerald-500/10",
        iconText: "text-emerald-400",
        valueText: "text-emerald-400",
      };
    case "purple":
      return {
        border: "hover:border-purple-500/30",
        iconBg: "bg-purple-500/10",
        iconText: "text-purple-400",
        valueText: "text-purple-400",
      };
    case "orange":
      return {
        border: "hover:border-orange-500/30",
        iconBg: "bg-orange-500/10",
        iconText: "text-orange-400",
        valueText: "text-orange-400",
      };
    default:
      return {
        border: "hover:border-blue-500/30",
        iconBg: "bg-blue-500/10",
        iconText: "text-blue-400",
        valueText: "text-blue-400",
      };
  }
};

