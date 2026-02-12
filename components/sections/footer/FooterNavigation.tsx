import { FooterLink } from "./types";

type FooterNavigationProps = {
  links: FooterLink[];
  scrollToSection: (sectionId: string) => void;
};

export const FooterNavigation = ({ links, scrollToSection }: FooterNavigationProps) => {
  return (
    <div>
      <div className="text-xs text-gray-500 mb-4">Navigation</div>
      <div className="footer-nav flex flex-wrap gap-4 text-sm">
        {links.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(item.href);
            }}
            className="footer-nav-link text-gray-400 hover:text-cyan-400 transition-colors relative group cursor-pointer"
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>
    </div>
  );
};

