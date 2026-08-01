import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText, Check, Search } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const sections = [
    {
      id: 'overview',
      title: '1. Overview & Commitment',
      content: 'This Privacy Policy outlines how Walee Naqvi ("Developer", "we", "our") handles user information across this portfolio platform. We respect your digital privacy. We do not sell, trade, or rent personal information to third-party advertisers or data brokers under any circumstances.'
    },
    {
      id: 'contact-data',
      title: '2. Contact Form & Draft Message Handling',
      content: 'When you utilize the contact popup form on this website, the information entered (Name, Email, Phone Number, WhatsApp Number, and Message) is processed locally on your client device to generate a structured email draft targeted to waliali1292@gmail.com. Submitting the form opens your device default mail client or WhatsApp application directly without storing unencrypted credentials on third-party tracking databases.'
    },
    {
      id: 'cookies-analytics',
      title: '3. Local Storage & Theme Preferences',
      content: 'This application uses standard HTML5 LocalStorage solely to persist your visual dark mode preference ("wali_portfolio_theme") and any local project showcase customization ("wali_portfolio_projects"). LocalStorage remains entirely on your machine and can be cleared via your browser settings at any time.'
    },
    {
      id: 'external-links',
      title: '4. External Links & Third-Party Resources',
      content: 'Our showcase contains external links to project live previews, GitHub repositories, and direct WhatsApp chat links. We encourage users to review the privacy policies of external sites, as we hold no control over third-party domains.'
    },
    {
      id: 'updates-contact',
      title: '5. Policy Revisions & Contact Inquiries',
      content: 'We reserve the right to update this privacy policy to reflect new web standards. For any privacy inquiries or data requests, please contact Walee Naqvi directly at waliali1292@gmail.com.'
    }
  ];

  const filteredSections = sections.filter(
    (sec) =>
      searchQuery === '' ||
      sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5" /> Legal & Transparency
        </div>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-textDark dark:text-textLight tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-textMuted font-mono">
          Last Updated: July 2026 • Official Developer Statement
        </p>
      </div>

      {/* Search Input for Policy */}
      <div className="relative max-w-md mx-auto">
        <Search className="w-4 h-4 text-emerald-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search policy topics..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-emerald-500/20 bg-cardLight dark:bg-cardDark text-xs text-textDark dark:text-textLight focus:outline-none focus:border-emerald-500"
        />
      </div>

      {/* Policy Sections */}
      <div className="space-y-6">
        {filteredSections.map((sec) => (
          <div
            key={sec.id}
            className="p-6 rounded-3xl bg-cardLight dark:bg-cardDark border border-emerald-500/20 space-y-3 shadow-sm hover:border-emerald-500/40 transition-colors"
          >
            <h2 className="font-heading font-bold text-xl text-textDark dark:text-textLight flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-500 shrink-0" />
              {sec.title}
            </h2>
            <p className="text-xs sm:text-sm text-textMuted leading-relaxed">
              {sec.content}
            </p>
          </div>
        ))}
      </div>

      {/* Contact Note */}
      <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
        <h3 className="font-heading font-bold text-lg text-emerald-600 dark:text-emerald-400">
          Have Privacy Questions?
        </h3>
        <p className="text-xs text-textMuted">
          Feel free to reach out to Walee Naqvi directly via email at{' '}
          <a href="mailto:waliali1292@gmail.com" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">waliali1292@gmail.com</a>.
        </p>
      </div>
    </div>
  );
};
