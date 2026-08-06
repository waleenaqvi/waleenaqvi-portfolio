import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Send, Copy, Check, MessageSquare, Mail, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../context/ThemeContext';
import { ContactFormData } from '../types';

export const ContactModal: React.FC = () => {
  const { isContactModalOpen, closeContactModal, contactCategory } = useTheme();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    number: '',
    whatsapp: '',
    category: contactCategory || 'WordPress Development',
    message: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [copiedDraft, setCopiedDraft] = useState<boolean>(false);
  const [draftText, setDraftText] = useState<string>('');

  useEffect(() => {
    if (contactCategory) {
      setFormData((prev) => ({ ...prev, category: contactCategory }));
    }
  }, [contactCategory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isContactModalOpen) {
        closeContactModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isContactModalOpen, closeContactModal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct formatted draft
    const formattedDraft = `NEW PROJECT INQUIRY FOR WALEE NAQVI
---------------------------------------
Full Name: ${formData.name}
Email Address: ${formData.email}
Phone Number: ${formData.number || 'N/A'}
WhatsApp Number: ${formData.whatsapp || 'N/A'}
Project Category: ${formData.category}

Project Details & Message:
${formData.message}

---------------------------------------
Sent via Walee Naqvi Portfolio Platform`;

    setDraftText(formattedDraft);

    // Fire Confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#18CF80', '#00673E', '#EA941B', '#A56000'],
      });
    } catch (err) {
      console.log('Confetti triggered');
    }

    // Trigger Mailto Redirect to waliali1292@gmail.com
    const mailtoSubject = encodeURIComponent(`Project Inquiry: ${formData.name} (${formData.category})`);
    const mailtoBody = encodeURIComponent(formattedDraft);
    const mailtoUrl = `mailto:waliali1292@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    window.location.href = mailtoUrl;

    setSubmitted(true);
  };

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(draftText);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      number: '',
      whatsapp: '',
      category: 'WordPress Development',
      message: '',
    });
  };

  if (!isContactModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto" data-lenis-prevent>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeContactModal}
        className="fixed inset-0 bg-[#121212]/85 backdrop-blur-md"
      />

      {/* Modal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: 'transform, opacity' }}
        className="relative w-full max-w-xl bg-slate-900/40 backdrop-blur-md border border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-emerald-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-heading font-bold text-white">
                Let's Work Together
              </h3>
              <p className="text-xs text-slate-300">Direct draft generated to waliali1292@gmail.com</p>
            </div>
          </div>
          <button
            onClick={closeContactModal}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-emerald-500/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/10 transition-all font-medium"
                  placeholder="e.g. John Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/10 transition-all font-medium"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/10 transition-all font-medium"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/10 transition-all font-medium"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                Project Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-emerald-500/20 bg-[#16201a] text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/10 transition-all font-medium"
              >
                <option value="WordPress Development" className="bg-[#111812] text-white">WordPress Theme Build</option>
                <option value="Shopify Store Development" className="bg-[#111812] text-white">Shopify Store Build</option>
                <option value="E-Commerce Build" className="bg-[#111812] text-white">Custom E-Commerce Store</option>
                <option value="Front-End Performance Optimization" className="bg-[#111812] text-white">Performance / Page Speed Optimization</option>
                <option value="General Inquiry" className="bg-[#111812] text-white">General Inquiry / Consultation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                Project Scope / Message
              </label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/10 transition-all font-medium resize-none"
                placeholder="Briefly describe what you're looking to build (e.g. site size, features, integrations)..."
              />
            </div>

            <button
              type="submit"
              className="w-full btn-creative-primary text-xs py-3 mt-2"
            >
              <Send className="w-4 h-4" />
              <span>Generate Draft & Send Email</span>
            </button>
          </form>
        ) : (
          <div className="mt-6 space-y-6 text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-2">Draft Generated Successfully!</h4>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                Your email client has been opened with your inquiry draft. If it didn't trigger, copy the draft details below to email directly to <strong className="text-emerald-400 font-bold">waliali1292@gmail.com</strong>.
              </p>
            </div>

            <div className="relative text-left bg-black/40 border border-emerald-500/20 rounded-xl p-4 font-mono text-[10px] text-slate-300 max-h-[160px] overflow-y-auto whitespace-pre-wrap">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Draft Message Copy
                </span>
                <button
                  onClick={handleCopyDraft}
                  className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-medium transition-colors"
                >
                  {copiedDraft ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Text
                    </>
                  )}
                </button>
              </div>
              <pre className="text-xs font-mono text-textDark/80 dark:text-textLight/80 whitespace-pre-wrap overflow-x-auto max-h-40 leading-relaxed">
                {draftText}
              </pre>
            </div>

            {/* Direct Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`mailto:waliali1292@gmail.com?subject=${encodeURIComponent(`Project Inquiry: ${formData.name}`)}&body=${encodeURIComponent(draftText)}`}
                className="btn-creative-primary w-full sm:w-auto text-xs"
              >
                <Mail className="w-4 h-4" />
                Re-Open Mail Client
              </a>

              {formData.whatsapp && (
                <a
                  href={`https://wa.me/${formData.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(draftText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-creative-secondary w-full sm:w-auto text-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  Open WhatsApp Chat
                </a>
              )}

              <button
                onClick={handleResetForm}
                className="btn-creative-outline w-full sm:w-auto text-xs"
              >
                Send Another Inquiry
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
