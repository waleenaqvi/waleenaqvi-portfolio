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
    const a = document.createElement('a');
    a.href = url;
    a.download = `wali_ali_projects_${Date.now()}.json`;
    a.click();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto" data-lenis-prevent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsProjectManagerOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
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
                  Project Showcase Content Manager
                </h3>
                <p className="text-xs text-textMuted">
                  Dynamically manage, add, or edit showcase records across 4 categories ({projects.length} total)
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsProjectManagerOpen(false)}
              className="p-2 rounded-full text-textMuted hover:text-textDark dark:hover:text-textLight hover:bg-emerald-500/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center justify-between mt-6 border-b border-emerald-500/10 pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('list')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'list'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-textMuted hover:text-textDark dark:hover:text-textLight'
                }`}
              >
                Project List ({projects.length})
              </button>
              <button
                onClick={handleStartAdd}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'add'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-textMuted hover:text-textDark dark:hover:text-textLight'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                {editingId ? 'Edit Project' : 'Add New Project'}
              </button>
            </div>

            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/20 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Export JSON
            </button>
          </div>

          {/* List View */}
          {activeTab === 'list' && (
            <div className="mt-6 space-y-3">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-emerald-500/10 hover:border-emerald-500/30 transition-all group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-textDark dark:text-textLight truncate">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        {proj.category} • {proj.year}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleStartEdit(proj)}
                      className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-slate-950 transition-colors"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteProject(proj.id)}
                      className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add / Edit Form */}
          {activeTab === 'add' && (
            <form onSubmit={handleSaveProject} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-textMuted mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-sm text-textDark dark:text-textLight"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-textMuted mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as ProjectCategory })}
                    className="w-full px-4 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-sm text-textDark dark:text-textLight"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-textMuted mb-1">Tagline</label>
                <input
                  type="text"
                  required
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-sm text-textDark dark:text-textLight"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-textMuted mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-sm text-textDark dark:text-textLight"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-textMuted mb-1">Client Name</label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-sm text-textDark dark:text-textLight"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-textMuted mb-1">Year</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-sm text-textDark dark:text-textLight"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-textMuted mb-1">Featured Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-sm text-textDark dark:text-textLight"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-textMuted mb-1">Platform (CMS)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. WordPress, Shopify, Squarespace"
                  value={formData.metrics?.[0]?.value || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    metrics: [{ label: 'Platform', value: e.target.value }]
                  })}
                  className="w-full px-4 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-sm text-textDark dark:text-textLight"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-textMuted mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-sm text-textDark dark:text-textLight"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-textMuted mb-1">Key Features (comma separated)</label>
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-sm text-textDark dark:text-textLight"
                />
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
    </AnimatePresence>
  );
};
