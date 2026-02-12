import { FooterContact } from "./types";
import { getColorClasses, getIconByName } from "./iconMap";

type FooterContactsProps = {
  contacts: FooterContact[];
};

export const FooterContacts = ({ contacts }: FooterContactsProps) => {
  return (
    <div className="contact-grid grid md:grid-cols-3 gap-4 mb-10">
      {contacts.map((contact) => {
        const Icon = getIconByName(contact.icon_name);
        const colors = getColorClasses(contact.color_name);

        const content = (
          <>
            <div className={`p-2 rounded-lg ${colors.iconBg} group-hover:scale-110 transition-transform`}> 
              <Icon className={`w-4 h-4 ${colors.iconText}`} />
            </div>
            <div className="flex-1">
              <div className="text-[10px] text-gray-600 mb-1">{contact.label}</div>
              <div className={`text-xs font-semibold ${colors.valueText} break-words`}>{contact.value}</div>
              {contact.value_secondary ? (
                <div className={`text-xs font-semibold ${colors.valueText}`}>{contact.value_secondary}</div>
              ) : null}
            </div>
          </>
        );

        const className = `contact-card bg-[#0a0d14]/60 backdrop-blur-xl border border-white/5 rounded-lg p-4 ${colors.border} transition-all group`;

        if (contact.href) {
          return (
            <a key={contact.id} href={contact.href} className={className}>
              <div className="flex items-center gap-3">{content}</div>
            </a>
          );
        }

        return (
          <div key={contact.id} className={`${className} cursor-default`}>
            <div className="flex items-center gap-3">{content}</div>
          </div>
        );
      })}
    </div>
  );
};

