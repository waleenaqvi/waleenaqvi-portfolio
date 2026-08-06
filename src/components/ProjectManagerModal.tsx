import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Trash2, Edit3, Save, Download, RefreshCw, FolderPlus, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Project, ProjectCategory } from '../types';
import { CATEGORIES } from '../data/projectsData';

export const ProjectManagerModal: React.FC = () => {
  const { isProjectManagerOpen, setIsProjectManagerOpen, projects, addProject, deleteProject, updateProject } = useTheme();

  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');

  // Form state for adding/editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: '',
    category: 'E-Commerce',
    tagline: '',
    description: '',
    longDescription: '',
    tags: ['WordPress', 'Shopify'],
    metrics: [{ label: 'Platform', value: 'WordPress' }],
    client: 'Custom Client',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    demoUrl: 'https://example.com/demo',
    githubUrl: '',
    keyFeatures: ['SEO Optimized', 'Fast Load Time'],
  });

  const [tagInput, setTagInput] = useState<string>('WordPress, Shopify');
  const [featureInput, setFeatureInput] = useState<string>('SEO Optimized, Fast Load Time');

  if (!isProjectManagerOpen) return null;

  const handleStartAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'E-Commerce',
      tagline: '',
      description: '',
      longDescription: '',
      tags: ['WordPress'],
      metrics: [{ label: 'Platform', value: 'WordPress' }],
      client: '',
      year: '2026',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      featured: false,
      demoUrl: 'https://example.com/demo',
      githubUrl: '',
      keyFeatures: ['SEO Optimized', 'Fast Load Time'],
    });
    setTagInput('WordPress');
    setFeatureInput('SEO Optimized, Fast Load Time');
    setActiveTab('add');
  };

  const handleStartEdit = (proj: Project) => {
    setEditingId(proj.id);
    setFormData({
      title: proj.title,
      category: proj.category,
      tagline: proj.tagline,
      description: proj.description,
      longDescription: proj.longDescription,
      tags: proj.tags,
      metrics: proj.metrics,
      client: proj.client,
      year: proj.year,
      image: proj.image,
      featured: proj.featured,
      demoUrl: proj.demoUrl,
      githubUrl: proj.githubUrl,
      keyFeatures: proj.keyFeatures,
      testimonial: proj.testimonial,
    });
    setTagInput(proj.tags.join(', '));
    setFeatureInput(proj.keyFeatures.join(', '));
    setActiveTab('add');
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedTags = tagInput.split(',').map((t) => t.trim()).filter(Boolean);
    const parsedFeatures = featureInput.split(',').map((f) => f.trim()).filter(Boolean);

    const payload = {
      ...formData,
      tags: parsedTags,
      keyFeatures: parsedFeatures,
    };

    if (editingId) {
      updateProject(editingId, payload);
    } else {
      addProject(payload);
    }

    setActiveTab('list');
    setEditingId(null);
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(projects, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  };

  if (!isProjectManagerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto" data-lenis-prevent>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsProjectManagerOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 15 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: 'transform, opacity' }}
        className="relative w-full max-w-4xl max-h-[85vh] bg-slate-900/40 backdrop-blur-md border border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-auto overflow-y-auto"
        data-lenis-prevent
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-emerald-500/15">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-heading font-bold text-textDark dark:text-textLight">
                Projects Showcase CMS
              </h3>
              <p className="text-xs text-textMuted mt-0.5">Manage, add, and customize portfolio cards locally</p>
            </div>
          </div>
          <button
            onClick={() => setIsProjectManagerOpen(false)}
            className="p-2 rounded-full text-slate-400 hover:text-textDark dark:hover:text-textLight hover:bg-slate-500/15 transition-all"
            aria-label="Close panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 mt-6">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'list'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15'
            }`}
          >
            <Save className="w-3.5 h-3.5" /> All Projects ({projects.length})
          </button>
          <button
            onClick={() => {
              setEditingId(null);
              setFormData({
                title: '',
                category: 'WordPress',
                client: '',
                year: new Date().getFullYear().toString(),
                image: '',
                demoUrl: '',
                description: '',
                tags: '',
                keyFeatures: '',
                platform: 'WordPress',
              });
              setActiveTab('add');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'add'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15'
            }`}
          >
            <FolderPlus className="w-3.5 h-3.5" /> Add New Project
          </button>

          <button
            onClick={handleExportJSON}
            className="ml-auto px-4 py-2 rounded-xl text-xs font-semibold bg-blue-500/15 text-blue-500 hover:bg-blue-500/25 transition-all flex items-center gap-1.5 border border-blue-500/20"
          >
            <Download className="w-3.5 h-3.5" /> Export Data (projectsData.ts)
          </button>
        </div>

        {/* Tabs Body */}
        {activeTab === 'list' ? (
          <div className="mt-6 space-y-3 max-h-[50vh] overflow-y-auto pr-1">
            {projects.length === 0 ? (
              <div className="text-center py-12 text-textMuted text-sm">
                No custom projects found. Feel free to add some!
              </div>
            ) : (
              projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 hover:bg-emerald-500/10 flex items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-12 h-12 rounded-lg object-cover bg-slate-900 border border-emerald-500/10"
                    />
                    <div>
                      <h4 className="font-heading font-bold text-sm text-textDark dark:text-textLight">
                        {proj.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-textMuted">
                        <span>{proj.category}</span>
                        <span>•</span>
                        <span>{proj.year}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStartEdit(proj)}
                      className="p-2 rounded-xl text-emerald-500 hover:bg-emerald-500/10 transition-colors"
                      title="Edit project"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteProject(proj.id)}
                      className="p-2 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <form onSubmit={handleSaveProject} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-1.5">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-sm text-textDark dark:text-textLight focus:outline-none focus:border-emerald-500 transition-all"
                  placeholder="e.g. My Hats Boutique"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-1.5">
                  Platform (CMS)
                </label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-500/20 bg-[#16201a] text-sm text-textDark dark:text-textLight focus:outline-none focus:border-emerald-500 transition-all font-medium"
                >
                  <option value="WordPress" className="bg-[#111812] text-white">WordPress</option>
                  <option value="Shopify" className="bg-[#111812] text-white">Shopify</option>
                  <option value="Squarespace" className="bg-[#111812] text-white">Squarespace</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-1.5">
                  Project Category Tab
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-500/20 bg-[#16201a] text-sm text-textDark dark:text-textLight focus:outline-none focus:border-emerald-500 transition-all font-medium"
                >
                  <option value="E-Commerce" className="bg-[#111812] text-white">E-Commerce</option>
                  <option value="Functionality-Focused" className="bg-[#111812] text-white">Functionality-Focused</option>
                  <option value="Front-End Designs" className="bg-[#111812] text-white">Front-End Designs</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-1.5">
                  Year
                </label>
                <input
                  type="text"
                  required
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-sm text-textDark dark:text-textLight focus:outline-none focus:border-emerald-500 transition-all"
                  placeholder="2026"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-1.5">
                  Featured Image URL
                </label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-sm text-textDark dark:text-textLight focus:outline-none focus:border-emerald-500 transition-all"
                  placeholder="https://images.unsplash.com/photo-..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-1.5">
                  Demo Preview URL
                </label>
                <input
                  type="url"
                  value={formData.demoUrl}
                  onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-sm text-textDark dark:text-textLight focus:outline-none focus:border-emerald-500 transition-all"
                  placeholder="https://my-hats-demo.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-1.5">
                Client Name / Info
              </label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-sm text-textDark dark:text-textLight focus:outline-none focus:border-emerald-500 transition-all"
                placeholder="e.g. Hats Boutique Inc."
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-1.5">
                Description / Scope
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-sm text-textDark dark:text-textLight focus:outline-none focus:border-emerald-500 transition-all resize-none"
                placeholder="Describe project details..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-1.5">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-sm text-textDark dark:text-textLight focus:outline-none focus:border-emerald-500 transition-all"
                  placeholder="WordPress, CSS, Elementor"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-textMuted mb-1.5">
                  Key Features (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.keyFeatures}
                  onChange={(e) => setFormData({ ...formData, keyFeatures: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-sm text-textDark dark:text-textLight focus:outline-none focus:border-emerald-500 transition-all"
                  placeholder="Payment Gateway, Custom API"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('list')}
                className="btn-creative-outline text-xs"
              >
                Cancel
              </button>
              <button type="submit" className="btn-creative-primary text-xs">
                <Save className="w-4 h-4" /> Save Project
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
