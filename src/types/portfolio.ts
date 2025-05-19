
export interface SkillItem {
  id: string;
  name: string;
  proficiency: number; // 1-100
  category?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string | null;
  description: string;
  technologies?: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | null;
  description?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface PortfolioData {
  profile: {
    name: string;
    title: string;
    summary: string;
    avatarUrl?: string;
  };
  skills: SkillItem[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  contact: ContactInfo;
}
