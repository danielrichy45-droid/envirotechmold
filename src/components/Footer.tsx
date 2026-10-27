import React from 'react';
import { Logo } from './Logo.tsx';
import { COMPANY_INFO, CORE_SERVICES } from '../data/companyData.ts';
import { Phone, MessageSquare, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenConsultation: () => void;
  onOpenVoiceAgent: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenConsultation,
  onOpenVoiceAgent,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand & Address */}
          <div className="space-y-4">
            <Logo variant="light" size="md" />
            <p className="text-xs text-slate-400 leading-relaxed">
              Family-owned environmental remediation specialists providing certified mold removal, moisture inspection, and water damage cleanup across Peterborough and surrounding communities since 2012.
            </p>
            <div className="pt-1 space-y-2 text-xs">
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>657 Severn Rd, Peterborough, ON K9J 1H8, Canada</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="hover:text-emerald-300 font-semibold">
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Open 24/7 for Emergencies</span>
              </div>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs">
              {CORE_SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="hover:text-emerald-400 transition"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#services" className="hover:text-emerald-400 transition">
                  Attic Frost & Ventilation Correction
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition">
                  Basement Water Mitigation & Sealing
                </a>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Service Regions
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Peterborough & Kawartha Lakes</li>
              <li>Lindsay, Bobcaygeon & Fenelon Falls</li>
              <li>Northumberland (Cobourg, Port Hope)</li>
              <li>Durham Region (Oshawa, Clarington)</li>
              <li>Haliburton County Cottage Region</li>
            </ul>
            <div className="mt-4">
              <button
                onClick={onOpenVoiceAgent}
                className="text-xs text-emerald-400 hover:text-emerald-300 underline font-medium cursor-pointer"
              >
                Launch Voice AI Assistant →
              </button>
            </div>
          </div>

          {/* Fast Contact & Consultation */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Quick Contact
            </h4>
            <p className="text-xs text-slate-400">
              Need to ask about your property or schedule a free inspection?
            </p>
            <div className="space-y-2">
              <button
                onClick={onOpenConsultation}
                className="w-full py-2.5 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition cursor-pointer text-center"
              >
                Get a Free Consultation
              </button>
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-slate-700 font-semibold text-xs transition flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% Work Satisfaction Guarantee</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} EnviroTech Mold Pros. All rights reserved. Registered under EnviroTech Mold Remediation.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a href="#home" className="hover:text-slate-400">Home</a>
            <span>•</span>
            <a href="#services" className="hover:text-slate-400">Services</a>
            <span>•</span>
            <a href="#faq" className="hover:text-slate-400">FAQ</a>
            <span>•</span>
            <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="text-emerald-400 font-semibold">
              (705) 313-6321
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
