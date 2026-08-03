import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Copy, Check, MessageSquare, Mail, Phone, Sparkles } from 'lucide-react';
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
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto" data-lenis-prevent>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeContactModal}
          className="fixed inset-0 bg-[#121212]/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
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
            /* Contact Form */
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Your Name <span className="text-emerald-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Walee Naqvi"
                    className="w-full px-4 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 focus:bg-transparent focus:border-emerald-500 focus:outline-none text-sm text-white transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Email Address <span className="text-emerald-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@google.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 focus:bg-transparent focus:border-emerald-500 focus:outline-none text-sm text-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    placeholder="+111 2222 3333"
                    className="w-full px-4 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 focus:bg-transparent focus:border-emerald-500 focus:outline-none text-sm text-white transition-all"
                  />
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="+111 2222 3333"
                    className="w-full px-4 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 focus:bg-transparent focus:border-emerald-500 focus:outline-none text-sm text-white transition-all"
                  />
                </div>
              </div>

              {/* Project Category */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Project Category <span className="text-emerald-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-500/20 bg-slate-800 text-white focus:outline-none transition-all"
                >
                  <option className="bg-slate-800 text-white" value="WordPress Development">Static Website/Landing Page</option>
                  <option className="bg-slate-800 text-white" value="Shopify Storefront">E-commerce Store/Shop</option>
                  <option className="bg-slate-800 text-white" value="Squarespace Site">Functional Focused Website i.e custom features</option>                </select>
              </div>
              {/* Message */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Project Scope & Message <span className="text-emerald-500">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your goals, timeline, key features, and vision..."
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 focus:bg-transparent focus:border-emerald-500 focus:outline-none text-sm text-white transition-all resize-none"
                />
              </div>

              {/* Footer CTA Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-500" />
                  Auto-drafts to <span className="font-medium text-emerald-400">waliali1292@gmail.com</span>
                </p>

                <button type="submit" className="btn-creative-primary w-full sm:w-auto">
                  <Send className="w-4 h-4" />
                  <span>Send & Create Draft</span>
                </button>
              </div>
            </form>
          ) : (
            /* Confirmation Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 space-y-6 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <h4 className="text-2xl font-heading font-bold text-textDark dark:text-textLight">
                  Draft Created & Mail Triggered!
                </h4>
                <p className="text-sm text-textMuted mt-1 max-w-md mx-auto">
                  Your mail app should have opened automatically targeting <strong className="text-emerald-500">waliali1292@gmail.com</strong>.
                  You can also copy the formatted draft or reach out on WhatsApp directly.
                </p>
              </div>

              {/* Formatted Draft Box */}
              <div className="text-left bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4 relative group">
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
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
