import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, Filter, LayoutGrid, List, ArrowRight, Zap, Award, Star, Code2, FolderKanban, MessageSquare, ChevronLeft, ChevronRight, ShieldCheck, CheckCircle2, Phone } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ProjectCategory, Project } from '../types';
import { CATEGORIES } from '../data/projectsData';
import { InteractiveSkills } from '../components/InteractiveSkills';
import DotField from '../components/DotField';
import { BorderGlow } from '../components/BorderGlow';
import { scrollToElement } from '../utils/scroll';

export const HomePage: React.FC = () => {
  const { projects, openContactModal, setSelectedProject, setIsProjectManagerOpen } = useTheme();

  // Search & Filter state for Projects Showcase
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'compact' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const projectsPerPage = 12;

  // Filtered Projects Logic
  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const matchesCategory =
        selectedCategory === 'All' || proj.category === selectedCategory;
      const matchesQuery =
        searchQuery.trim() === '' ||
        proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [projects, selectedCategory, searchQuery]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage) || 1;
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * projectsPerPage;
    return filteredProjects.slice(start, start + projectsPerPage);
  }, [filteredProjects, currentPage, projectsPerPage]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    setMousePos({ x: clientX - left, y: clientY - top });
  };

  const scrollToShowcase = () => {
    const el = document.getElementById('project-showcase');
    if (el) scrollToElement(el);
  };

  return (
    <div className="space-y-12 sm:space-y-24 pb-20">
      {/* ---------------- BENTO GRID HERO SECTION ---------------- */}
      <section className="relative pt-24 lg:pt-42 pb-8 hero-gradient-mesh overflow-hidden -mt-20">
        {/* DotField background for the entire hero section */}
        <div className="absolute inset-0 z-0 w-full h-full min-h-[600px] pointer-events-none opacity-40">
          <DotField
            dotRadius={3.8}
            dotSpacing={10}
            cursorRadius={180}
            cursorForce={0.3}
            bulgeOnly={true}
            bulgeStrength={60}
            glowRadius={100}
            gradientFrom="var(--dot-field-from, rgba(16, 120, 75, 0.5))"
            gradientTo="var(--dot-field-to, rgba(200, 120, 10, 0.45))"
            glowColor="#00000000"
            className="w-full h-full absolute inset-0"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main Bento Grid Container */}
          <div className="grid grid-cols-12 gap-5">
            
            {/* 1. Main Hero Block (Col 8) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="col-span-12 lg:col-span-8 bg-cardLight/90 dark:bg-[#111812]/95 backdrop-blur-sm border border-emerald-500/20 rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-xl cursor-default group"
            >
              <div className="absolute top-[-80px] right-[-80px] w-60 h-60 bg-emerald-500/10 blur-[90px] rounded-full pointer-events-none" />
              
              <div className="space-y-6 relative z-10">
                {/* Main Headline */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black tracking-tighter text-[#F0FFF2] leading-[0.95]">
                  WEBSITE <br />
                  <span className="text-emerald-500">DEVELOPER</span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-lg text-[#E0EFE3] max-w-xl font-normal leading-relaxed">
                  Hi, I'm <strong className="text-[#F0FFF2] font-bold">Walee Naqvi</strong>. I build fast, reliable CMS platforms, online stores, and custom front-end interfaces that turn visitors into customers. No bloated frameworks, just clean code shaped around what your business actually needs
                </p>
              </div>

              {/* Action Buttons & Tech Pill Stack */}
              <div className="pt-8 flex flex-wrap items-center justify-between gap-4 border-t border-emerald-500/10 mt-6">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => openContactModal('General Inquiry')}
                    className="btn-creative-secondary text-xs sm:text-sm"
                  >
                    <span>Contact Me</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={scrollToShowcase}
                    className="btn-creative-outline text-white hover:text-white text-xs sm:text-sm"
                  >
                    <span>Explore Showcase</span>
                  </button>
                </div>
              </div>
            </motion.div>

             {/* 2. Highlight Stats Bento Card (Col 4) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="col-span-12 sm:col-span-6 lg:col-span-4 bg-emerald-500 text-slate-950 rounded-[2rem] p-8 flex flex-col justify-between shadow-xl group hover:scale-[1.01] transition-transform"
            >
              <div className="flex justify-between items-start">
                <span className="text-5xl sm:text-6xl font-black tracking-tight font-heading">2+</span>
                <div className="w-12 h-12 border-2 border-slate-950/20 rounded-full flex items-center justify-center font-bold text-xl">
                  ★
                </div>
              </div>

              <div className="space-y-1 mt-6">
                <div className="text-sm font-black uppercase tracking-widest">
                  Years of CMS<br />Development Experience
                </div>
                <p className="text-xs font-semibold opacity-90 pt-2">
                  99/100 Lighthouse Standard • 100% Client Satisfaction
                </p>
              </div>
            </motion.div>

            {/* 4. Terminal Engine Bento Card (Col 8) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="col-span-12 lg:col-span-8 bg-slate-950 border border-emerald-500/30 rounded-[2rem] p-6 shadow-xl relative overflow-hidden flex flex-col justify-between"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">wn-terminal</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-[10px] font-mono text-emerald-400 border border-emerald-500/20">
                  CUSHTOM CMS
                </span>
              </div>

              <div className="space-y-2 font-mono text-xs text-emerald-400">
                <p className="text-slate-400">// --- Walee Naqvi Profile ---</p>
                <p><span className="text-amber-400">const</span> developer = &#123; name: <span className="text-amber-300">"Walee Naqvi"</span>, role: <span className="text-amber-300">"CMS Developer"</span>, email: <span className="text-amber-300">"waliali1292@gmail.com"</span> &#125;;</p>
                <p className="text-slate-400">// Ready for WordPress, Shopify, & Squarespace storefronts.</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => openContactModal('CMS Project Consultation')}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-2 hover:bg-emerald-400 transition-all hover:scale-105"
                >
                  <Phone className="w-3.5 h-3.5" /> Book Consultation Call
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ---------------- DYNAMIC PROJECT SHOWCASE ---------------- */}
      <section id="project-showcase" className="py-6 sm:py-12 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-emerald-500/15">
            <div>
              <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-textDark dark:text-textLight tracking-tight">
                Project Showcase
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {(typeof window !== 'undefined' && (window.location.hash.includes('editwebsite') || window.location.pathname.includes('editwebsite') || window.location.search.includes('editwebsite'))) && (
                <button
                  onClick={() => setIsProjectManagerOpen(true)}
                  className="btn-creative-outline text-xs"
                >
                  <FolderKanban className="w-4 h-4 text-amber-500" /> Manage Projects
                </button>
              )}
            </div>
          </div>

          {/* Search, Filter Bar, and View Mode Toggles */}
          <div className="space-y-4">
            {/* Top row: Search input & Category pills */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                <button
                  onClick={() => handleCategoryChange('All')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === 'All'
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'bg-cardLight dark:bg-cardDark text-textMuted border border-emerald-500/15 hover:text-textDark dark:hover:text-textLight'
                  }`}
                >
                  All ({projects.length})
                </button>

                {CATEGORIES.map((cat) => {
                  const count = projects.filter((p) => p.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                        selectedCategory === cat
                          ? 'bg-emerald-500 text-slate-950 shadow-md'
                          : 'bg-cardLight dark:bg-cardDark text-textMuted border border-emerald-500/15 hover:text-textDark dark:hover:text-textLight'
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Search and Layout Mode Toggle */}
              <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end shrink-0">
                <div className="relative flex-1 lg:w-64 max-w-xs">
                  <Search className="w-4 h-4 text-emerald-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search titles, stacks..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-emerald-500/20 bg-cardLight dark:bg-cardDark text-xs text-textDark dark:text-textLight focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-full border border-emerald-500/10">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-full text-xs transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-emerald-500 text-slate-950'
                        : 'text-textMuted hover:text-textDark dark:hover:text-textLight'
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-full text-xs transition-colors ${
                      viewMode === 'list'
                        ? 'bg-emerald-500 text-slate-950'
                        : 'text-textMuted hover:text-textDark dark:hover:text-textLight'
                    }`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Project List / Grid Rendering */}
          {paginatedProjects.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 min-[700px]:grid-cols-1 min-[1024px]:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {paginatedProjects.map((proj) => (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedProject(proj)}
                  className={`glass-card cursor-pointer group overflow-hidden ${
                    viewMode === 'list' ? 'flex flex-col sm:flex-row items-center p-4 gap-6' : 'p-5 flex flex-col justify-between'
                  }`}
                >
                  {/* Thumbnail */}
                  <div
                    className={
                      viewMode === 'list'
                        ? 'w-full sm:w-48 h-32 rounded-xl overflow-hidden shrink-0 relative'
                        : 'w-full h-48 rounded-2xl overflow-hidden relative mb-4'
                    }
                  >
                    <img
                      src={proj.image}
                      alt={proj.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                      {proj.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 space-y-2 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading font-bold text-lg text-textDark dark:text-textLight group-hover:text-emerald-500 transition-colors truncate">
                        {proj.title}
                      </h3>
                      <span className="text-xs font-mono text-textMuted">{proj.year}</span>
                    </div>

                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium line-clamp-1">
                      {proj.tagline}
                    </p>

                    <p className="text-xs text-textMuted line-clamp-2 leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Key Metric Badge if present */}
                    {proj.metrics && proj.metrics.length > 0 && (
                      <div className="pt-2 flex items-center gap-2">
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          {proj.metrics[0].label}: {proj.metrics[0].value}
                        </span>
                      </div>
                    )}

                    {/* Tech Tags */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {proj.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/5 dark:bg-white/5 text-textMuted"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-cardLight dark:bg-cardDark border border-emerald-500/20 rounded-3xl space-y-3">
              <Search className="w-8 h-8 text-emerald-500 mx-auto" />
              <h3 className="text-xl font-heading font-bold text-textDark dark:text-textLight">
                No matching projects found
              </h3>
              <p className="text-xs text-textMuted max-w-sm mx-auto">
                Try clearing your search criteria or switching categories.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="btn-creative-outline text-xs mt-2"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Pagination Controls with Dots */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 pt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl border border-emerald-500/20 disabled:opacity-40 hover:bg-emerald-500/10 transition-colors text-textDark dark:text-textLight"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      currentPage === idx + 1
                        ? 'bg-emerald-500 w-6'
                        : 'bg-emerald-500/20 hover:bg-emerald-500/50'
                    }`}
                    aria-label={`Go to page ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl border border-emerald-500/20 disabled:opacity-40 hover:bg-emerald-500/10 transition-colors text-textDark dark:text-textLight"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ---------------- WHY WORK WITH ME BREAKDOWN ---------------- */}
      <section className="py-8 sm:py-16 bg-emerald-500/5 border-y border-emerald-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-textDark dark:text-textLight">
              Why Work With Me
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Box 1 */}
            <div className="glass-card p-6 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                <FolderKanban className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-textDark dark:text-textLight">
                CMS DEVELOPMENT
              </h3>
              <p className="text-xs text-textMuted leading-relaxed">
                Clean, easy-to-manage theme builds that plug into headless or traditional platforms without any of the usual headaches.
              </p>
            </div>

            {/* Box 2 */}
            <div className="glass-card p-6 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-textDark dark:text-textLight">
                FUNCTIONAL BUILDS
              </h3>
              <p className="text-xs text-textMuted leading-relaxed">
                Custom features like interactive maps, scheduling tools, SaaS dashboards, and client portals, built exactly to your spec.
              </p>
            </div>

            {/* Box 3 */}
            <div className="glass-card p-6 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-textDark dark:text-textLight">
                E-COMMERCE STORES
              </h3>
              <p className="text-xs text-textMuted leading-relaxed">
                Smooth checkout flows, product catalogs that look great on any device, and payment integrations that scale with you.
              </p>
            </div>

            {/* Box 4 */}
            <div className="glass-card p-6 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-textDark dark:text-textLight">
                BUILT FOR SPEED
              </h3>
              <p className="text-xs text-textMuted leading-relaxed">
                Lightweight code with nothing extra weighing it down. Every site is optimized to load in under a second and stay that way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- MAIN CONTACT BANNER CTA ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 p-8 sm:p-12 text-slate-950 overflow-hidden shadow-2xl">
          <div className="max-w-2xl space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight">
              Have a Project in Mind? Let's Build Something Great.
            </h2>
            <p className="text-sm sm:text-base font-medium opacity-90 leading-relaxed">
              Click below to launch the contact popup. Fill in your name, email, phone, WhatsApp number, and message to generate an instant draft directed to <a href="mailto:waliali1292@gmail.com" className="underline font-bold hover:text-emerald-950">waliali1292@gmail.com</a>.
            </p>

            <button
              onClick={() => openContactModal('General Inquiry')}
              className="btn-creative-secondary text-xs sm:text-sm mt-4"
            >
              <span>Launch Contact Form</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
