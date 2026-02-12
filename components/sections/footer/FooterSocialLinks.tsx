import { FooterLink } from "./types";
import { getIconByName } from "./iconMap";

type FooterSocialLinksProps = {
  links: FooterLink[];
};

export const FooterSocialLinks = ({ links }: FooterSocialLinksProps) => {
  return (
    <div>
      <div className="text-xs text-gray-500 mb-4">Socials</div>
      <div className="social-icons flex gap-3">
        {links.map((social) => {
          const Icon = getIconByName(social.icon_name);

          return (
            <a
              key={social.id}
              href={social.href}
              target={social.open_in_new_tab ? "_blank" : undefined}
              rel={social.open_in_new_tab ? "noopener noreferrer" : undefined}
              aria-label={social.label}
              className="social-icon w-11 h-11 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:scale-110 transition-all duration-300"
            >
              <Icon className="w-5 h-5" />
            </a>
          );
        })}
      </div>
    </div>
  );
};

