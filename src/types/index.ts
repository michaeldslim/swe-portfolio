export interface INavItem {
  id: string;
  label: string;
  href: string;
}

export interface IExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  description: string;
  techStack?: string[];
}

export type ProjectCategory = "web" | "mobile" | "macos" | "ios" | "other";

export interface IProject {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  href?: string;
  iosHref?: string;
  category: ProjectCategory;
  note?: string;
  screenshotNames?: string[];
}

export type ThemeName = "dark-teal" | "dark-green" | "light-neutral";
