import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, Sparkles, CheckCircle2, Quote, ArrowRight, Award } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ProjectDetailModal: React.FC = () => {
  const { selectedProject, setSelectedProject, openContactModal } = useTheme();

  if (!selectedProject) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto" data-lenis-prevent>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[96vh] bg-slate-900/40 backdrop-blur-md border border-emerald-500/20 rounded-3xl p-5 shadow-2xl z-10 my-auto flex flex-col overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-emerald-500/10 transition-colors z-20 cursor-pointer"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Non-Scrollable Layout Content */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Header Info */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {selectedProject.category}
                </span>
                <span className="text-[10px] text-slate-300">
                  {selectedProject.client} • {selectedProject.year}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white leading-tight">
                {selectedProject.title}
              </h2>
            </div>

            {/* Top Area: Full Width Image Mockup */}
            <div className="w-full aspect-video rounded-xl overflow-hidden border border-emerald-500/20 bg-black/5 shadow-inner group relative shrink-0">
              <div className="h-6 bg-black/10 border-b border-emerald-500/10 px-3 flex items-center gap-1.5 shrink-0">
                <div className="w-2 h-2 rounded-full bg-red-500/80" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                <div className="w-2 h-2 rounded-full bg-green-500/80" />
              </div>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-103"
              />
            </div>

            {/* Bottom Area: Columns for content */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Description */}
              <div className="md:col-span-8 flex flex-col justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>
              </div>

              {/* Stats & Tech Tags */}
              <div className="md:col-span-4 flex flex-col gap-3">
                {/* Platform Metric block */}
                {selectedProject.metrics && selectedProject.metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 shrink-0">
                    {selectedProject.metrics.slice(0, 2).map((m, idx) => (
                      <div
                        key={idx}
                        className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2 text-center"
                      >
                        <span className="block text-sm sm:text-base font-heading font-extrabold text-emerald-400">
                          {m.value}
                        </span>
                        <span className="text-[9px] text-slate-300 font-medium uppercase tracking-wider">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech tags list */}
                <div className="flex flex-wrap gap-1.5 shrink-0 max-h-[80px]">
                  {selectedProject.tags.slice(0, 6).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="mt-4 pt-3 border-t border-emerald-500/15 flex items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-3">
              {selectedProject.demoUrl && (
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-creative-primary text-xs py-1.5 px-4 rounded-full"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Preview
                </a>
              )}
            </div>

            <button
              onClick={() => {
                const cat = selectedProject.category;
                setSelectedProject(null);
                openContactModal(cat);
              }}
              className="btn-creative-secondary text-xs py-1.5 px-4 rounded-xl"
            >
              <span>Build Similar Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
