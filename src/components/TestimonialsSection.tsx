import React from 'react';
import { REAL_TESTIMONIALS, COMPANY_INFO } from '../data/companyData.ts';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950 opacity-90 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            Verified Customer Feedback
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What Homeowners Say About EnviroTech
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Real experiences from property owners who trusted our team to restore their homes.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REAL_TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="p-7 sm:p-8 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between hover:border-emerald-500/40 transition-all shadow-lg"
            >
              <div className="space-y-4">
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-emerald-500/30" />
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic">
                  "{review.quote}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-6 mt-6 border-t border-slate-700/60 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-white text-sm sm:text-base">
                    <span>{review.name}</span>
                    <span title="Verified Customer">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {review.location}
                  </div>
                </div>

                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">
                  {review.service}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Review Footer Trust Callout */}
        <div className="mt-12 text-center text-xs text-slate-400">
          Reviews sourced from verified public submissions on Google Reviews & HomeStars for EnviroTech Mold Remediation.
        </div>

      </div>
    </section>
  );
};
