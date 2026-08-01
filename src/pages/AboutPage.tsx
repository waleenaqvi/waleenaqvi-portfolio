import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { User, Award, Terminal, CheckCircle2, MessageSquare, Code2, Zap, Cpu, Sparkles, BookOpen, Layers } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ProfileCard from '../components/ProfileCard';
import waleeImage from '../images/walee/image.webp';
import codePattern from '../images/Icons/code-pattern.svg';

export const AboutPage: React.FC = () => {
  const { openContactModal } = useTheme();

  const timeline = [
    {
      year: '2025 — Present',
      title: 'CMS & Web Development Intern',
      company: 'Infinit Digital Solutions',
      companyUrl: 'https://infinitdigitalsolutions.com/',
      description:
        "Helped build many custom React, Node, and TypeScript projects. Connected client platforms to external APIs and secure databases, and built responsive portals for small-business websites. Also wrote clear, easy-to-follow documentation so clients could manage and update their own content without needing a developer every time."
    },
    {
      year: '2023 — 2025',
      title: 'Jr. CMS & Front-End Engineer',
      company: 'Interface Technology Pvt. Ltd',
      companyUrl: 'https://www.interfacetechno.com/',
      description:
        "Built and customized more than 30 WordPress themes for enterprise clients, each tailored to the business's specific needs. Developed interactive features from scratch — subscription systems, SVG-based charts, and booking/reservation systems — using plain JavaScript and CSS, no frameworks required."
    },
    {
      year: '2023 — 2023',
      title: 'CMS & Web Development Intern',
      company: 'Interface Technology Pvt. Ltd',
      companyUrl: 'https://www.interfacetechno.com/',
      description:
        "Worked on lightweight, headless static site builds, taking performance scores from a mediocre 60s up to a perfect 100. Rebuilt Shopify stores and secured a solid grip on WordPress."
    }
  ];

  const toolbelt = [
    { category: 'CMS Platforms', tools: ['WordPress', 'Shopify', 'WooCommerce'] },
    { category: 'Core Web', tools: ['HTML', 'CSS', 'JavaScript', 'PHP'] },
    { category: 'SEO & Performance', tools: ['Basic SEO', 'Performance Optimization'] },
    { category: 'Other Skills', tools: ['WooCommerce', 'ACF', 'SCF', 'ElementorPro', 'SMTP', 'VibeCoding'] }
  ];

  const qualifications = [
    {
      title: 'Matriculation',
      institution: 'Shahwilayat Public School System',
      institutionUrl: 'https://shahwilayat.edu.pk/',
      desc: 'Built a foundation in mathematics, computer science, and logical problem-solving — this is where an early interest in how software and systems work first took shape.'
    },
    {
      title: 'Intermediate',
      institution: 'Commecs College',
      institutionUrl: 'https://commecscollege.edu.pk/',
      desc: 'Studied pre-engineering with a focus on computer science fundamentals, strengthening core concepts in programming logic and computing that laid the groundwork for a specialization in web development.'
    },
    {
      title: 'BS. in Game Engineering',
      institution: 'Sir Syed University of Engineering and Technologies',
      institutionUrl: 'https://www.ssuet.edu.pk/',
      desc: "Currently pursuing a bachelor's degree, studying software architecture, real-time systems, and interactive design — knowledge that directly feeds into building fast, functionality-focused, and highly interactive websites."
    }
  ];

  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 sm:space-y-20">
      {/* Bio Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Profile Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <User className="w-3.5 h-3.5" /> Full-Stack Developer Profile
          </div>

          <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-textDark dark:text-textLight tracking-tight">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-amber-500">Walee Naqvi</span>
          </h1>

          <p className="text-base sm:text-lg text-textMuted leading-relaxed">
            I got into web dev because I was curious how a layout could actually connect a business to its clients. For the last two years I've focused on building sites that are secure and genuinely fast — cutting the extra scripts and bloat that slow pages down.
          </p>

          <p className="text-base sm:text-lg text-textMuted leading-relaxed">
            I also build custom CMS themes and admin systems. Clients need something powerful enough to grow with their business, but simple enough that they can update it themselves without breaking anything — and it still looks as sharp as launch day, years later.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button onClick={() => openContactModal('General Inquiry')} className="btn-creative-primary text-xs">
              <MessageSquare className="w-4 h-4" /> Get in Touch
            </button>
            <a href="mailto:waliali1292@gmail.com" className="btn-creative-outline text-xs">
              Email Directly: waliali1292@gmail.com
            </a>
          </div>
        </motion.div>

        {/* Developer Avatar / Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-5 flex justify-center"
        >
          <ProfileCard
            name="Walee Naqvi"
            title="CMS & Web Developer"
            handle="waleenaqvi"
            status=""
            contactText="Contact"
            avatarUrl={waleeImage}
            iconUrl={codePattern}
            grainUrl="data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => openContactModal('General Inquiry')}
            behindGlowColor="rgba(24, 207, 128, 0.4)"
            behindGlowEnabled
            innerGradient="linear-gradient(145deg, rgba(16, 120, 75, 0.3) 0%, rgba(200, 120, 10, 0.2) 100%)"
          />
        </motion.div>
      </div>

      {/* Tech Toolbelt */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-heading font-bold text-textDark dark:text-textLight">Technical Toolbelt</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {toolbelt.map((section, idx) => (
            <div key={idx} className="glass-card p-6 space-y-4">
              <h3 className="font-heading font-bold text-lg text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-amber-500" /> {section.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {section.tools.map((t, i) => (
                  <span key={i} className="px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-textDark dark:text-textLight">Career & History</h2>
        </div>

        <div className="relative max-w-5xl mx-auto px-4">
          {/* Middle vertical line (curved dashed line that scrolls with scroll position) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden md:block">
            <svg viewBox="0 0 100 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 left-[-40px] w-[80px] h-full" preserveAspectRatio="none">
              <motion.path
                d="M50 0 C75 150, 25 300, 50 450 C75 600, 25 750, 50 800"
                stroke="#18CF80"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="8 8"
                style={{ pathLength }}
              />
            </svg>
          </div>

          <div className="space-y-12 relative">
            {timeline.map((item, idx) => {
              // 2 containers on the right (idx 0 and 2), 1 container on the left (idx 1)
              const isLeft = idx === 1;
              return (
                <div key={idx} className={`flex flex-col md:flex-row items-center ${isLeft ? 'md:flex-row-reverse' : ''} justify-between md:gap-8`}>
                  {/* Card Container */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="w-full md:w-[46%] p-6 rounded-3xl bg-cardLight dark:bg-cardDark border border-emerald-500/20 space-y-2 hover:border-emerald-500/40 transition-colors shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-heading font-bold text-lg text-textDark dark:text-textLight">{item.title}</h3>
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">{item.year}</span>
                    </div>
                    {item.companyUrl ? (
                      <a
                        href={item.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-amber-500 hover:underline inline-block"
                      >
                        {item.company}
                      </a>
                    ) : (
                      <p className="text-xs font-semibold text-amber-500">{item.company}</p>
                    )}
                    <p className="text-xs text-textMuted leading-relaxed">{item.description}</p>
                  </motion.div>

                  {/* Visual Node in Center (aligned with path coordinates: 1st node left, 2nd right, 3rd left) */}
                  <div className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-950 border-4 border-emerald-500 hidden md:block ${
                    idx === 0 ? 'translate-x-[-22px]' : idx === 1 ? 'translate-x-[6px]' : 'translate-x-[-22px]'
                  }`} />

                  {/* Spacer for layout balance */}
                  <div className="hidden md:block w-[46%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Qualifications Section */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-heading font-bold text-textDark dark:text-textLight">Qualifications</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {qualifications.map((qual, idx) => (
            <div key={idx} className="glass-card p-6 border-emerald-500/20 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#30190D] dark:bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-lg text-textDark dark:text-textLight">{qual.title}</h3>
                {qual.institutionUrl ? (
                  <a href={qual.institutionUrl} target="_blank" rel="noreferrer" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-block">
                    {qual.institution}
                  </a>
                ) : (
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{qual.institution}</span>
                )}
                <p className="text-xs text-textMuted leading-relaxed mt-2">{qual.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
