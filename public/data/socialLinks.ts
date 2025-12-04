
import { Github, Mail, Linkedin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
interface SocialLink {
    icon : LucideIcon;
    href: string;
    label: string;
}
export const socialLinks:SocialLink[] = [
    { icon: Github , href: "https://github.com/jakob9991", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/jakob-dickhardt-b1a8ab293", label: "LinkedIn" }, 
    { icon: Mail , href: "mailto:Jakob.dickhardt@gmail.com", label: "Email" },
  ];

