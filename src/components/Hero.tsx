import React from 'react';
import { COMPANY_INFO } from '../data/companyData.ts';
import { Phone, MessageSquare, ShieldCheck, CheckCircle2, ArrowRight, Mic, Sparkles, MapPin, AlertCircle, Wind } from 'lucide-react';

interface HeroProps {
  onOpenConsultation: () => void;
  onOpenVoiceAgent: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenConsultation,
  onOpenVoiceAgent,
}) => {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950 text-white pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Background Subtle Geometric Pattern & Glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-500 blur-3xl"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-teal-500 blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Positioning & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Verified Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-medium backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Peterborough & Kawartha Lakes Remediation Specialists</span>
              <span className="text-emerald-500">•</span>
              <span className="text-emerald-200">Since 2012</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Professional Mold Removal.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                Peace of Mind
              </span>{' '}
              for Your Property.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              EnviroTech helps homeowners and property owners address mold and water-damage concerns with professional service across Peterborough and surrounding communities.
            </p>

            {/* The 3 Core Actions + Voice Agent */}
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-3">
              {/* Action 1: Get a Free Consultation */}
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-900/40 transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Get a Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Action 2: Call directly */}
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-100 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 transition-all active:scale-[0.98]"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call {COMPANY_INFO.phone}</span>
              </a>

              {/* Action 3: Chat on WhatsApp */}
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-500/30 transition-all active:scale-[0.98]"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Voice AI Interactive Pill */}
            <div className="pt-1">
              <button
                onClick={onOpenVoiceAgent}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-emerald-900/40 hover:bg-emerald-800/50 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm font-medium transition cursor-pointer group"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform"></span>
                <Mic className="w-4 h-4 text-emerald-300" />
                <span>Have a quick question? <strong>Talk to EnviroTech Voice AI</strong></span>
              </button>
            </div>

            {/* Small Trust Line using verified site claims */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Satisfaction Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Certified Remediation Technicians</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Locally Owned in Peterborough</span>
              </div>
            </div>

          </div>

          {/* Right Column: Authentic Property Remediation Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl bg-slate-800/90 border border-slate-700/80 p-6 shadow-2xl backdrop-blur-xl">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  <span className="text-sm font-bold text-slate-200 tracking-wide uppercase">
                    Remediation Standards
                  </span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                  Safe Containment
                </span>
              </div>

              {/* Inspection & Protocol Checklist */}
              <div className="py-4 space-y-3.5">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-700/40">
                  <div className="p-2 rounded-lg bg-emerald-900/50 text-emerald-400 shrink-0 mt-0.5">
                    <Wind className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Negative Air HEPA Filtration</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Sealed containment prevents airborne mold spores from migrating into living areas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-700/40">
                  <div className="p-2 rounded-lg bg-teal-900/50 text-teal-400 shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Eco-Conscious Antimicrobial Wash</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Deep sanitization on joists, rafters, and framing that is non-toxic and pet-friendly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-700/40">
                  <div className="p-2 rounded-lg bg-emerald-900/50 text-emerald-400 shrink-0 mt-0.5">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Root-Cause Moisture Resolution</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Fixing roof ventilation, bathroom fan exhaust bypasses, and basement moisture barriers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer Callout */}
              <div className="mt-2 pt-4 border-t border-slate-700/80 bg-emerald-950/40 -mx-6 -mb-6 p-4 rounded-b-2xl flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-300 font-medium">Need immediate advice?</div>
                  <div className="text-xs text-emerald-400 font-semibold">Speak directly with Jamie & our crew</div>
                </div>
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition"
                >
                  (705) 313-6321
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
