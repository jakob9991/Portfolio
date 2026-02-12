import { FooterContact, FooterLink, FooterMeta } from "./types";

export const defaultFooterLinks: FooterLink[] = [
  {
    id: 1,
    type: "social",
    label: "GitHub",
    href: "https://github.com/jakob9991",
    icon_name: "github",
    open_in_new_tab: true,
    is_visible: true,
    sort_order: 1,
  },
  {
    id: 2,
    type: "social",
    label: "LinkedIn",
    href: "https://linkedin.com/in/jakob-dickhardt-b1a8ab293",
    icon_name: "linkedin",
    open_in_new_tab: true,
    is_visible: true,
    sort_order: 2,
  },
  {
    id: 3,
    type: "social",
    label: "Email",
    href: "mailto:Jakob.dickhardt@gmail.com",
    icon_name: "mail",
    open_in_new_tab: false,
    is_visible: true,
    sort_order: 3,
  },
  { id: 4, type: "nav", label: "Start", href: "#start", icon_name: null, open_in_new_tab: false, is_visible: true, sort_order: 1 },
  { id: 5, type: "nav", label: "Skills", href: "#skills", icon_name: null, open_in_new_tab: false, is_visible: true, sort_order: 2 },
  { id: 6, type: "nav", label: "Projekte", href: "#projects", icon_name: null, open_in_new_tab: false, is_visible: true, sort_order: 3 },
  { id: 7, type: "nav", label: "Karriere", href: "#career", icon_name: null, open_in_new_tab: false, is_visible: true, sort_order: 4 },
];

export const defaultFooterContacts: FooterContact[] = [
  {
    id: 1,
    key: "email",
    label: "E-Mail",
    value: "Jakob.dickhardt@gmail.com",
    value_secondary: null,
    href: "mailto:Jakob.dickhardt@gmail.com",
    icon_name: "mail",
    color_name: "cyan",
    is_visible: true,
    sort_order: 1,
  },
  {
    id: 2,
    key: "phone",
    label: "Telefon",
    value: "+49 151 516 293 65",
    value_secondary: null,
    href: "tel:+4915151629365",
    icon_name: "smartphone",
    color_name: "emerald",
    is_visible: true,
    sort_order: 2,
  },
  {
    id: 3,
    key: "location",
    label: "Standort",
    value: "Frankfurt am Main, 60437",
    value_secondary: "Alt-Niedereschbach 17",
    href: null,
    icon_name: "map-pin",
    color_name: "purple",
    is_visible: true,
    sort_order: 3,
  },
];

export const defaultFooterMeta: FooterMeta = {
  id: 1,
  brand_name: "Jakob Dickhardt",
  availability_text: "Verfugbar fur Projekte",
  legal_text: "Impressum & Inhalt",
};

