import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Project, ContactFormData } from '../types';
import { INITIAL_PROJECTS } from '../data/projectsData';
import { scrollToTop } from '../utils/scroll';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isContactModalOpen: boolean;
  openContactModal: (category?: string) => void;
  closeContactModal: () => void;
  contactCategory: string;
  selectedProject: Project | null;
  setSelectedProject: (proj: Project | null) => void;
  projects: Project[];
  addProject: (newProj: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  isProjectManagerOpen: boolean;
  setIsProjectManagerOpen: (open: boolean) => void;
  activePageView: 'home' | 'about' | 'privacy';
  setActivePageView: (page: 'home' | 'about' | 'privacy') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('wali_portfolio_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Contact popup state
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [contactCategory, setContactCategory] = useState<string>('General Inquiry');

  // Selected project modal state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Dynamic projects list (persisted in local storage for easy editing/adding)
const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);

  // Project manager drawer state
  const [isProjectManagerOpen, setIsProjectManagerOpen] = useState<boolean>(false);

  // Active page view (instant scroll on change so page transitions don't fight smooth scroll)
  const [activePageView, setActivePageViewState] = useState<'home' | 'about' | 'privacy'>('home');

  const setActivePageView = useCallback((page: 'home' | 'about' | 'privacy') => {
    scrollToTop('instant');
    setActivePageViewState(page);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('wali_portfolio_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('wali_portfolio_theme', 'light');
    }
  }, [isDarkMode]);


  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const openContactModal = (category?: string) => {
    if (category) setContactCategory(category);
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => setIsContactModalOpen(false);

  const addProject = (newProj: Omit<Project, 'id'>) => {
    const id = `proj-custom-${Date.now().toString(36)}`;
    const created: Project = { ...newProj, id };
    setProjects((prev) => [created, ...prev]);
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        isContactModalOpen,
        openContactModal,
        closeContactModal,
        contactCategory,
        selectedProject,
        setSelectedProject,
        projects,
        addProject,
        updateProject,
        deleteProject,
        isProjectManagerOpen,
        setIsProjectManagerOpen,
        activePageView,
        setActivePageView,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
