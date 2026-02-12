export type FooterLinkType = "social" | "nav";

export type FooterLink = {
  id: number;
  type: FooterLinkType;
  label: string;
  href: string;
  icon_name: string | null;
  open_in_new_tab: boolean;
  is_visible: boolean;
  sort_order: number;
};

export type FooterContact = {
  id: number;
  key: string;
  label: string;
  value: string;
  value_secondary: string | null;
  href: string | null;
  icon_name: string;
  color_name: "cyan" | "emerald" | "purple" | "blue" | "orange" | string;
  is_visible: boolean;
  sort_order: number;
};

export type FooterMeta = {
  id: number;
  brand_name: string;
  availability_text: string;
  legal_text: string;
};

