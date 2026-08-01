import React, { useState } from 'react';
import { Mail, Copy, Check, MessageSquare, ArrowUp, Linkedin, Instagram, Facebook } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { scrollToTop } from '../utils/scroll';

export const Footer: React.FC = () => {
  const { openContactModal, setActivePageView } = useTheme();
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('waliali1292@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://pk.linkedin.com/in/walee-naqvi', icon: Linkedin },
    { name: 'Instagram', url: 'https://www.instagram.com/waleenaqvi', icon: Instagram },
    { name: 'Facebook', url: 'https://www.facebook.com/waleenaqvi', icon: Facebook },
  ];

  return (


    <footer className="w-full bg-cardLight dark:bg-cardDark border-t border-emerald-500/15 pt-16 pb-12 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative gradient blur background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-emerald-500/10">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={() => {
                setActivePageView('home');
                scrollToTop();
              }}
              className="flex items-center gap-3 group text-left"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-heading font-extrabold text-lg text-[#11381B] dark:text-amber-500 group-hover:scale-105 transition-transform duration-300">
                &lt;/&gt;
              </div>
              <span className="font-heading font-extrabold text-2xl text-textDark dark:text-textLight group-hover:text-emerald-500 transition-colors">
                Walee Naqvi
              </span>
            </button>

            <p className="text-sm text-textMuted max-w-sm leading-relaxed">
              CMS Developer crafting high-performance WordPress, Shopify, and Squarespace storefronts focusing on maximum speed and search engine visibility.
            </p>

            {/* Email Copy Card */}
            <div className="inline-flex items-center gap-2 p-2 px-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
              <Mail className="w-4 h-4 text-emerald-500" />
              <a
                href="mailto:waliali1292@gmail.com"
                className="font-mono text-emerald-600 dark:text-emerald-400 font-bold hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-300 hover:underline"
              >
                waliali1292@gmail.com
              </a>
              <button
                onClick={handleCopyEmail}
                className="ml-2 p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-600 dark:text-emerald-400 hover:text-slate-950 transition-colors cursor-pointer"
                title="Copy email address"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              {/* Social Icons */}
<div className="flex items-center gap-1 pt-3 ml-3 -mt-3">
  {socialLinks.map((social) => {
    const Icon = social.icon;
    return (
    <a  
        key={social.name}
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.name}
        className="w-9 h-9 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 flex items-center justify-center hover:bg-emerald-500 hover:text-slate-950 hover:scale-110 transition-all"
      >
        <Icon className="w-4 h-4" />
      </a>
    );
  })}
</div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm text-textMuted">
              <li>
                <button
                  onClick={() => setActivePageView('home')}
                  className="hover:text-emerald-500 transition-colors"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePageView('about')}
                  className="hover:text-emerald-500 transition-colors"
                >
                  About Developer
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePageView('privacy')}
                  className="hover:text-emerald-500 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct CTA */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Start a Project
            </h4>
            <p className="text-xs text-textMuted">
              Have a web app, e-commerce site, or custom interactive experience in mind? Let's turn your vision into code.
            </p>
            <button
              onClick={() => openContactModal('General Inquiry')}
              className="btn-creative-primary text-xs w-full sm:w-auto"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Launch Popup Contact Form</span>
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-textMuted">
          <p className="flex items-center gap-1.5">
            © {new Date().getFullYear()} Walee Naqvi. VIBECODED
          </p>

          <button
            onClick={() => scrollToTop('smooth')}
            className="p-2.5 rounded-full border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 transition-colors flex items-center gap-1.5"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
