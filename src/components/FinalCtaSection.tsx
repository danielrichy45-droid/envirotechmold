import React, { useState } from 'react';
import { COMPANY_INFO, CORE_SERVICES } from '../data/companyData.ts';
import { Phone, MessageSquare, Send, CheckCircle2, ShieldCheck, Clock, MapPin, AlertCircle } from 'lucide-react';

export const FinalCtaSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Professional Mold Removal',
    city: 'Peterborough',
    details: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [referenceId, setReferenceId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setStatus('submitting');
    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setReferenceId(data.referenceId || 'ENV-CONFIRMED');
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-gradient-to-b from-slate-900 to-emerald-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Reassuring Callout */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              Immediate Local Assistance
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Concerned About Mold or Water Damage?{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                Let's Talk.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Describe your concern and discuss the next step directly with EnviroTech. Whether you need urgent moisture extraction or a scheduled attic assessment, we are here to help.
            </p>

            <div className="pt-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-900/60 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Direct Telephone (24/7 Response)</div>
                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="text-lg font-extrabold text-white hover:text-emerald-300 transition"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-900/60 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">WhatsApp Photo Diagnosis</div>
                  <a
                    href={COMPANY_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-emerald-300 hover:text-emerald-200 underline underline-offset-2 transition"
                  >
                    Click to message on WhatsApp →
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-900/60 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Peterborough Office Address</div>
                  <div className="text-sm text-slate-200 font-semibold">
                    {COMPANY_INFO.address}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>We never sell or share your contact details. Free consultation, no pressure.</span>
            </div>
          </div>

          {/* Right Column: Free Consultation Submission Card */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-white text-slate-900 p-7 sm:p-9 shadow-2xl border border-slate-200">
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900">
                  Request a Free Consultation
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Tell us a bit about your property. Jamie or our crew will review and get in touch.
                </p>
              </div>

              {status === 'success' ? (
                <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">Consultation Request Received</h4>
                    <p className="text-sm text-slate-600 mt-2">
                      Thank you, <strong className="text-slate-900">{formData.name}</strong>. Reference ID:{' '}
                      <span className="font-mono text-emerald-700 font-semibold">{referenceId}</span>.
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      Our Peterborough team will review your details and contact you shortly at{' '}
                      <strong>{formData.phone}</strong>.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`tel:${COMPANY_INFO.phoneRaw}`}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-slate-900 text-white font-bold text-xs"
                    >
                      Call Now: (705) 313-6321
                    </a>
                    <button
                      onClick={() => {
                        setStatus('idle');
                        setFormData({
                          name: '',
                          phone: '',
                          email: '',
                          service: 'Professional Mold Removal',
                          city: 'Peterborough',
                          details: '',
                        });
                      }}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Smith"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(705) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address (optional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        City / Community *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Peterborough, Lindsay, etc."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Service Required
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    >
                      {CORE_SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="General Inspection / Not Sure">
                        General Inspection / Not Sure
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Brief Description of the Issue
                    </label>
                    <textarea
                      rows={3}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="e.g., Noticed damp smell in basement, black spots in attic near bathroom fan, recent water leak..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    ></textarea>
                  </div>

                  {status === 'error' && (
                    <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Something went wrong. Please call us directly at (705) 313-6321.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3.5 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {status === 'submitting' ? (
                      <span>Sending your request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Free Consultation Request</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
