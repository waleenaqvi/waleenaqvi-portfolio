export type ProjectCategory = 
  | 'E-Commerce'
  | 'Functionality-Focused'
  | 'Front-End Designs';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  tagline: string;
  description: string;
  longDescription: string;
  tags: string[];
  metrics: ProjectMetric[];
  client: string;
  year: string;
  image: string;
  featured: boolean;
  demoUrl: string;
  githubUrl: string;
  keyFeatures: string[];
  testimonial?: ProjectTestimonial;
}

export interface ContactFormData {
  name: string;
  email: string;
  number: string;
  whatsapp: string;
  category: string;
  message: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: number; // 0 - 100
  category: 'Frontend' | 'Backend' | 'Performance & SEO' | 'UI/UX & Motion';
  description: string;
  codeSnippet: string;
  iconName: string;
  highlights: string[];
}

export type PageView = 'home' | 'about' | 'privacy';
