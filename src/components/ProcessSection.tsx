import React from 'react';
import { COMPANY_INFO } from '../data/companyData.ts';
import { MessageSquareText, FileSearch, ShieldCheck, ArrowRight, Phone, MessageSquare } from 'lucide-react';

interface ProcessSectionProps {
  onOpenConsultation: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenConsultation }) => {
  const steps = [
    {
      num: '01',
      title: 'Contact EnviroTech & Describe Your Concern',
      description:
        'Call our local line at (705) 313-6321, message us on WhatsApp with photos, or submit a consultation request. Tell us where you noticed moisture or mold.',
      icon: MessageSquareText,
    },
    {
      num: '02',
      title: 'Discuss Your Property & What You Need',
      description:
        'Speak directly with our team to discuss the situation. We evaluate whether you need a comprehensive visual assessment, thermal moisture check, or direct containment plan.',
      icon: FileSearch,
    },
    {
      num: '03',
      title: 'Arrange Next Steps Directly With Us',
      description:
        'We coordinate on-site inspection or scheduled remediation backed by our 100% satisfaction guarantee. Clear pricing, honest guidance, and clean execution.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            Clear & Honest Path Forward
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How to Get Started
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Resolving mold or moisture issues should never feel confusing. Here is our straightforward process:
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div
                key={step.num}
                className="relative p-8 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-emerald-300 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold text-emerald-700/30 group-hover:text-emerald-700/60 transition-colors">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center">
                      <IconComp className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <span>Step {idx + 1} of 3</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action CTA Bar */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenConsultation}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-md shadow-emerald-900/10 transition active:scale-[0.98] cursor-pointer"
          >
            <span>Request a Free Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={`tel:${COMPANY_INFO.phoneRaw}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition"
          >
            <Phone className="w-4 h-4 text-emerald-700" />
            <span>Call (705) 313-6321</span>
          </a>

          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Photos on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
