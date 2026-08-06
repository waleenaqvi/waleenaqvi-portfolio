import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Menu, X, Sparkles, MessageSquare, Code2, Shield, User, Home, FolderKanban } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode, openContactModal, activePageView, setActivePageView, setIsProjectManagerOpen } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleNavClick = (page: 'home' | 'about' | 'privacy') => {
    setActivePageView(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-4 z-40 max-w-7xl mx-auto px-4 transition-all duration-300 w-full">
      <div className="w-full backdrop-blur-xl bg-slate-500/20 dark:bg-white/5 border border-emerald-500/25 rounded-2xl sm:rounded-3xl shadow-xl px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-[14px] bg-cardLight dark:bg-cardDark flex items-center justify-center font-heading font-extrabold text-lg text-white">
              &lt;/&gt;
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-lg sm:text-xl text-textDark dark:text-textLight tracking-tight group-hover:text-emerald-500 transition-colors">
                Walee Naqvi
              </span>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <span className="block text-[11px] font-medium text-textMuted uppercase tracking-wider">
              CMS Developer
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1.5 rounded-full border border-emerald-500/10">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all hover:border hover:border-emerald-500/50 ${
              activePageView === 'home'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md'
                : 'text-textMuted hover:text-textDark dark:hover:text-textLight border border-transparent'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all hover:border hover:border-emerald-500/50 ${
              activePageView === 'about'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md'
                : 'text-textMuted hover:text-textDark dark:hover:text-textLight border border-transparent'
            }`}
          >
            About
          </button>
        </nav>

        {/* Header Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Manage Projects CTA */}
          {(typeof window !== 'undefined' && (window.location.hash.includes('editwebsite') || window.location.pathname.includes('editwebsite') || window.location.search.includes('editwebsite'))) && (
            <button
              onClick={() => setIsProjectManagerOpen(true)}
              className="p-2.5 rounded-full border border-emerald-500/20 text-xs font-semibold text-textDark dark:text-textLight hover:bg-emerald-500/10 transition-colors flex items-center gap-1.5"
              title="Manage Projects CMS"
            >
              <FolderKanban className="w-4 h-4 text-amber-500" />
              <span className="hidden lg:inline">Manage Showcase</span>
            </button>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15 transition-all transform hover:rotate-12"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Contact Popup CTA */}
          <button
            onClick={() => openContactModal('General Inquiry')}
            className="btn-creative-primary text-xs"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Let's Talk</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl border border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-emerald-500/20 text-textDark dark:text-textLight"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Right Side Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              style={{ willChange: 'transform' }}
              className="fixed top-0 right-0 bottom-0 w-[80vw] max-w-sm z-50 bg-[#090f0c] border-l border-emerald-500/10 p-6 flex flex-col justify-between shadow-2xl md:hidden"
            >
              <div className="space-y-8">
                {/* Header inside drawer */}
                <div className="flex items-center justify-between pb-6 border-b border-emerald-500/10">
                  <span className="font-heading font-extrabold text-lg text-emerald-400">
                    Menu
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl border border-emerald-500/20 text-textDark dark:text-textLight"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6 text-emerald-400" />
                  </button>
                </div>

                {/* Main Links */}
                <nav className="flex flex-col gap-2">
                  <button
                    onClick={() => handleNavClick('home')}
                    className={`w-full text-left font-heading font-bold text-3xl tracking-tight py-2 transition-colors ${
                      activePageView === 'home'
                        ? 'text-emerald-400'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Home
                  </button>
                  <button
                    onClick={() => handleNavClick('about')}
                    className={`w-full text-left font-heading font-bold text-3xl tracking-tight py-2 transition-colors ${
                      activePageView === 'about'
                        ? 'text-emerald-400'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    About
                  </button>
                  <button
                    onClick={() => handleNavClick('privacy')}
                    className={`w-full text-left font-heading font-bold text-3xl tracking-tight py-2 transition-colors ${
                      activePageView === 'privacy'
                        ? 'text-emerald-400'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Privacy
                  </button>
                </nav>
              </div>

              {/* Drawer footer / CTA */}
              <div className="space-y-4 pt-6 border-t border-emerald-500/10">
                {(typeof window !== 'undefined' && (window.location.hash.includes('editwebsite') || window.location.pathname.includes('editwebsite') || window.location.search.includes('editwebsite'))) && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsProjectManagerOpen(true);
                    }}
                    className="w-full btn-creative-outline text-xs justify-center py-3"
                  >
                    <FolderKanban className="w-4 h-4 text-amber-500" />
                    Manage Projects CMS
                  </button>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openContactModal('General Inquiry');
                  }}
                  className="w-full btn-creative-primary text-sm justify-center py-3.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  Get in Touch
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
