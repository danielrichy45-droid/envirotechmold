import React from 'react';
import { COMPANY_INFO } from '../data/companyData.ts';
import { ShieldCheck, HeartHandshake, Eye, Sparkles, Phone, CheckCircle } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const differentiators = [
    {
      title: 'Root-Cause Resolution',
      description:
        'We do not simply wipe away surface mold. Our technicians inspect attic soffits, bathroom fan routing, and basement moisture barriers to fix the actual moisture problem so it does not return.',
      icon: Eye,
    },
    {
      title: 'Zero Scare Tactics & Transparent Pricing',
      description:
        'Finding mold is stressful. We treat homeowners with respect, providing clear, straightforward explanations and honest quotes rather than high-pressure sales pitches or inflated extra costs.',
      icon: HeartHandshake,
    },
    {
      title: 'Safe Containment & HEPA Filtration',
      description:
        'Your family’s health comes first. We erect sealed negative-air zones using industrial HEPA scrubbers to ensure spores are completely contained and cannot contaminate other rooms during work.',
      icon: ShieldCheck,
    },
    {
      title: 'Local Peterborough Pride Since 2012',
      description:
        'We are not an out-of-town franchise. EnviroTech is locally based on Severn Road and operated by technicians who live and work right here in the Kawartha region.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="why-us" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              Why Homeowners Trust EnviroTech
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Reassurance, Honesty, and Permanent Solutions.
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              When mold or water damage strikes, you need straightforward answers from experienced technicians. For over a decade, EnviroTech has helped property owners across Peterborough navigate remediation with confidence.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">
                  <strong className="text-slate-900 font-semibold">Direct communication with lead specialists: </strong>
                  You talk directly with knowledgeable technicians like Jamie who guide you step-by-step through the process.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">
                  <strong className="text-slate-900 font-semibold">100% Work Satisfaction Commitment: </strong>
                  Every project is backed by our full guarantee to give you lasting peace of mind.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">
                  <strong className="text-slate-900 font-semibold">Clean, Courteous Worksites: </strong>
                  We leave your home fresher, clean, and safe, with proper post-remediation sanitization and disposal.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call Jamie & Crew: {COMPANY_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Right Cards Column */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {differentiators.map((diff) => {
              const IconComp = diff.icon;
              return (
                <div
                  key={diff.title}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center mb-4">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      {diff.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {diff.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
