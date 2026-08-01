import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SKILLS_DATA } from '../data/skillsData';
import { SkillItem } from '../types';
import { Code2, Zap, Sparkles, Terminal, Copy, Check, Sliders, Cpu, CheckCircle } from 'lucide-react';

export const InteractiveSkills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkill, setActiveSkill] = useState<SkillItem>(SKILLS_DATA[0]);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  
  // Interactive Live Parameter Toggles
  const [animSpeed, setAnimSpeed] = useState<number>(0.8);
  const [enableOptimistic, setEnableOptimistic] = useState<boolean>(true);

  const categories = ['All', 'Frontend', 'Backend', 'Performance & SEO', 'UI/UX & Motion'];

  const filteredSkills = SKILLS_DATA.filter(
    (s) => selectedCategory === 'All' || s.category === selectedCategory
  );

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeSkill.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            <Zap className="w-3.5 h-3.5 text-amber-500" /> Interactive Skill Matrix & Code Engine
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-textDark dark:text-textLight tracking-tight">
            Crafted for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-amber-500">Speed, Scale & Motion</span>
          </h2>

          <p className="text-base text-textMuted leading-relaxed">
            Test and inspect interactive code architecture live in the browser. Click any skill module below to inspect real-world implementation snippets.
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 scale-105'
                  : 'bg-black/5 dark:bg-white/5 text-textMuted hover:text-textDark dark:hover:text-textLight border border-emerald-500/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Grid: Left Skills Cards, Right Interactive Code Playground */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Skill Cards List */}
          <div className="lg:col-span-5 space-y-3">
            {filteredSkills.map((skill) => {
              const isSelected = activeSkill.id === skill.id;
              return (
                <motion.div
                  key={skill.id}
                  onClick={() => setActiveSkill(skill)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-cardLight dark:bg-cardDark border-emerald-500 shadow-xl ring-2 ring-emerald-500/20'
                      : 'bg-cardLight/50 dark:bg-cardDark/50 border-emerald-500/15 hover:border-emerald-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                        {skill.level}%
                      </div>
                      <h3 className="font-heading font-bold text-base text-textDark dark:text-textLight">
                        {skill.name}
                      </h3>
                    </div>

                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      {skill.category}
                    </span>
                  </div>

                  {/* Level progress bar */}
                  <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden my-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full"
                    />
                  </div>

                  <p className="text-xs text-textMuted line-clamp-2">
                    {skill.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Code Sandbox & Interactive Controls */}
          <div className="lg:col-span-7 bg-cardLight dark:bg-cardDark border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-emerald-500/15">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-500" />
                <span className="font-heading font-bold text-sm text-textDark dark:text-textLight">
                  {activeSkill.name} Sandbox
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>
            </div>

            {/* Interactive Param Sliders */}
            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/15 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-textDark dark:text-textLight flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-emerald-500" /> Live Render Tuning:
                </span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">
                  {animSpeed}s ease-in-out
                </span>
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0.2"
                  max="2.0"
                  step="0.1"
                  value={animSpeed}
                  onChange={(e) => setAnimSpeed(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Code Block Window */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-emerald-500/30 p-4 font-mono text-xs text-emerald-400 shadow-inner">
              <pre className="whitespace-pre-wrap overflow-x-auto leading-relaxed">
                {activeSkill.codeSnippet}
              </pre>
            </div>

            {/* Skill Engineering Highlights */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-textMuted mb-3">
                Key Capabilities
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {activeSkill.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-emerald-500/10 text-center text-xs font-medium text-textDark dark:text-textLight flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
