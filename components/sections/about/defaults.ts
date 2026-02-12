import { AboutProfile, AboutResume, AboutStat } from "./types";

export const defaultAboutProfile: AboutProfile = {
  id: 1,
  display_name: "Jakob",
  location_label: "Standort",
  location_value: "Frankfurt, DE",
  profile_image_url: "/images/profileImage.jpg",
  section_title_prefix: "Hi, ich bin",
  section_title_highlight: "Jakob",
  intro_text:
    "Ich baue digitale Loesungen, die funktionieren und Spass machen. Aktuell studiere ich Medieninformatik in Frankfurt mit Fokus auf Web- und Mobile-Entwicklung.",
  detail_text:
    "Was mich antreibt? Probleme loesen und Ideen zum Leben bringen. Von kompletten Web-Apps ueber Mobile-Loesungen bis hin zu Automatisierung.",
};

export const defaultAboutStats: AboutStat[] = [
  { id: 1, label: "Projekte", value: "10+", color_name: "cyan", sort_order: 1, is_visible: true },
  { id: 2, label: "Jahre Code", value: "6+", color_name: "emerald", sort_order: 2, is_visible: true },
  { id: 3, label: "Motivation", value: "inf", color_name: "purple", sort_order: 3, is_visible: true },
];

export const defaultAboutResume: AboutResume = {
  id: 1,
  file_label: "DOWNLOAD",
  file_name: "Lebenslauf_JakobDickhardt.pdf",
  file_meta: "248 KB - PDF",
  file_url: "/data/Lebenslauf_JakobDickhardt.pdf",
  button_label: "CV herunterladen",
};

