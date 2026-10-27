import React, { useState } from 'react';
import { CORE_SERVICES, COMPANY_INFO, ServiceItem } from '../data/companyData.ts';
import { ShieldCheck, Search, Droplets, Home, Check, ArrowRight, MessageSquare, Phone, Info } from 'lucide-react';

interface ServicesSectionProps {
  onOpenConsultation: (serviceTitle?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenConsultation }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-700" />;
      case 'Search':
        return <Search className="w-6 h-6 text-emerald-700" />;
      case 'Droplets':
        return <Droplets className="w-6 h-6 text-emerald-700" />;
      case 'Home':
        return <Home className="w-6 h-6 text-emerald-700" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-emerald-700" />;
    }
  };

  return (
    <section id="services" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            Verified Environmental Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Core Property Services
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Professional remediation, moisture diagnostics, and cleanup performed with strict containment protocols to protect your indoor air quality.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CORE_SERVICES.map((service) => (
            <div
              key={service.id}
              className="flex flex-col justify-between rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all duration-200 overflow-hidden group"
            >
              <div className="p-7 sm:p-8 space-y-5">
                
                {/* Header & Badge */}
                <div className="flex items-center justify-between gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getServiceIcon(service.icon)}
                  </div>
                  {service.badge && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700">
                    {service.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Feature Bullet Points */}
                <div className="pt-2 border-t border-slate-100 space-y-2.5">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                    What we do:
                  </span>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Action Bar */}
              <div className="px-7 py-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => onOpenConsultation(service.title)}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition cursor-pointer"
                >
                  <span>Request Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={COMPANY_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-emerald-700 hover:bg-emerald-100 transition"
                    title="Ask on WhatsApp"
                    aria-label={`Ask about ${service.title} on WhatsApp`}
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="text-xs font-bold text-slate-700 hover:text-emerald-700 transition"
                  >
                    (705) 313-6321
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Reassuring Notice Box */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-slate-600">
              <strong className="font-semibold text-slate-900">Unsure what service you need? </strong>
              Every property situation is different. Our team will help assess your concerns honestly and guide you to the right next step without unnecessary testing or costs.
            </p>
          </div>
          <button
            onClick={() => onOpenConsultation('General Property Assessment')}
            className="shrink-0 px-4 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm transition cursor-pointer"
          >
            Ask a Specialist
          </button>
        </div>

      </div>
    </section>
  );
};
