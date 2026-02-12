export type AboutProfile = {
  id: number;
  display_name: string;
  location_label: string;
  location_value: string;
  profile_image_url: string;
  section_title_prefix: string;
  section_title_highlight: string;
  intro_text: string;
  detail_text: string;
};

export type AboutStat = {
  id: number;
  label: string;
  value: string;
  color_name: "cyan" | "emerald" | "purple" | string;
  sort_order: number;
  is_visible: boolean;
};

export type AboutResume = {
  id: number;
  file_label: string;
  file_name: string;
  file_meta: string;
  file_url: string;
  button_label: string;
};

