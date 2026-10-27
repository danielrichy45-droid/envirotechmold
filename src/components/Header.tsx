import React, { useState, useEffect } from 'react';
import { Logo } from './Logo.tsx';
import { COMPANY_INFO } from '../data/companyData.ts';
import { Phone, MessageSquare, Menu, X, ShieldAlert, Sparkles, Mic } from 'lucide-react';

interface HeaderProps {
  onOpenConsultation: () => void;
  onOpenVoiceAgent: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenConsultation,
  onOpenVoiceAgent,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'About Us', href: '#why-us' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top Notification Bar for 24/7 Availability & Quick Contacts */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              24/7 Emergency Response
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-300">
              Serving Peterborough, Kawartha Lakes & Surrounding Areas
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <button
              onClick={onOpenVoiceAgent}
              className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 font-medium transition cursor-pointer"
              title="Talk to EnviroTech Voice AI"
            >
              <Mic className="w-3.5 h-3.5 text-emerald-400" />
              <span>Voice AI Agent</span>
            </button>
            <span className="text-slate-600">|</span>
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="inline-flex items-center gap-1 font-bold text-white hover:text-emerald-400 transition"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
          isScrolled ? 'shadow-md border-b border-slate-200/80 py-3' : 'border-b border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#home" className="shrink-0 focus:outline-none">
            <Logo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-emerald-700 transition py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-emerald-600 after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="hidden md:flex flex-col text-right group"
              title="Direct Emergency & Consultation Line"
            >
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Call Our Team
              </span>
              <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition">
                {COMPANY_INFO.phone}
              </span>
            </a>

            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm shadow-emerald-900/10 transition active:scale-[0.98] cursor-pointer"
            >
              Get a Free Consultation
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="sm:hidden p-2 text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
              aria-label="Call EnviroTech"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2 pb-2">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-slate-900 text-white font-medium text-xs text-center"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call (705) 313-6321</span>
              </a>
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-emerald-600 text-white font-medium text-xs text-center"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVoiceAgent();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold"
            >
              <Mic className="w-4 h-4 text-emerald-600" />
              <span>Talk to EnviroTech Voice AI</span>
            </button>

            <div className="flex flex-col space-y-2 pt-2 border-t border-slate-100">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-base font-medium text-slate-800 hover:text-emerald-700 hover:bg-slate-50 rounded-lg transition"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full mt-3 py-3 px-4 rounded-lg bg-emerald-700 text-white font-semibold text-center text-sm shadow-sm"
            >
              Get a Free Consultation
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};
