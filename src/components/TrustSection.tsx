import React from 'react';
import { COMPANY_INFO, TRUST_POINTS } from '../data/companyData.ts';
import { Award, CheckCircle2, Leaf, Clock, MapPin, Shield, Star } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Award':
        return <Award className="w-6 h-6 text-emerald-700" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-6 h-6 text-emerald-700" />;
      case 'Leaf':
        return <Leaf className="w-6 h-6 text-emerald-700" />;
      case 'Clock':
        return <Clock className="w-6 h-6 text-emerald-700" />;
      default:
        return <Shield className="w-6 h-6 text-emerald-700" />;
    }
  };

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Rating and Verification Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-10 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-sm font-bold text-slate-800">
              {COMPANY_INFO.googleRating} / 5.0 Star Rated
              <span className="text-slate-500 font-normal ml-1">
                across verified Google & HomeStars reviews
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3.5 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>Family-Owned & Locally Operated in Peterborough, ON</span>
          </div>
        </div>

        {/* 4 Core Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
          {TRUST_POINTS.map((point) => (
            <div
              key={point.title}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {getIcon(point.icon)}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {point.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Established Service Regions */}
        <div className="mt-10 p-5 rounded-xl bg-emerald-50/60 border border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-5 h-5 text-emerald-700 shrink-0" />
            <div className="text-xs sm:text-sm text-slate-800">
              <strong className="font-semibold text-emerald-950">Active Service Regions: </strong>
              Peterborough, City of Kawartha Lakes, Northumberland County, Durham Region, and Haliburton.
            </div>
          </div>
          <a
            href={`tel:${COMPANY_INFO.phoneRaw}`}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline underline-offset-4 shrink-0"
          >
            Check your area: (705) 313-6321 →
          </a>
        </div>

      </div>
    </section>
  );
};
