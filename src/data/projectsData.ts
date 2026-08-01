import { Project, ProjectCategory } from '../types';
import rawProjects from '../../projects.json';

export const CATEGORIES: ProjectCategory[] = [
  'E-Commerce',
  'Functionality-Focused',
  'Front-End Designs',
];

const categoryMap: Record<string, ProjectCategory> = {
  'ecommerce': 'E-Commerce',
  'frontend-designs': 'Front-End Designs',
  'functionality-focused': 'Functionality-Focused'
};

const imageModules = import.meta.glob('/src/images/projects/*', { eager: true, import: 'default' });

export const INITIAL_PROJECTS: Project[] = rawProjects.map(p => {
  const imageKey = '/src/' + p.featuredImage;
  const imagePath = (imageModules[imageKey] as string) || '';

  return {
    id: p.id,
    title: p.title,
    category: categoryMap[p.categories[0]] || 'Front-End Designs',
    tagline: p.cms + ' Development',
    description: p.summary || 'A custom ' + p.cms + ' build focusing on performance and user experience.',
    longDescription: p.summary || 'A custom ' + p.cms + ' build focusing on performance and user experience.',
    tags: [p.cms, ...p.categories],
    metrics: [{label: 'Platform', value: p.cms}],
    client: p.title,
    year: '2023',
    image: imagePath,
    featured: p.featured || false,
    demoUrl: p.url || '',
    githubUrl: '',
    keyFeatures: ['Custom Design', p.cms + ' Integration']
  };
});
