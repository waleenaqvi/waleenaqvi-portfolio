import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ProjectManagerModal } from './components/ProjectManagerModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { LenisController } from './components/LenisController';

const AppContent: React.FC = () => {
  const { activePageView, isContactModalOpen, selectedProject, isProjectManagerOpen } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-bgLight dark:bg-bgDark text-textDark dark:text-textLight font-body transition-colors duration-300">
      {/* Shared Header */}
      <Header />

      {/* Main Page View Router */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePageView}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {activePageView === 'home' && <HomePage />}
            {activePageView === 'about' && <AboutPage />}
            {activePageView === 'privacy' && <PrivacyPolicyPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Shared Footer */}
      <Footer />

      {/* Popup Modals */}
      <AnimatePresence>
        {isContactModalOpen && <ContactModal />}
      </AnimatePresence>
      <AnimatePresence>
        {selectedProject && <ProjectDetailModal />}
      </AnimatePresence>
      <AnimatePresence>
        {isProjectManagerOpen && <ProjectManagerModal />}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LenisController />
      <AppContent />
    </ThemeProvider>
  );
}
