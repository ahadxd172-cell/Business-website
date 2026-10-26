import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Sun, ShieldCheck, Sparkles, Phone, Mail, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { API_BASE } from '../config/api';

export default function QuoteModal({ isOpen, onClose, initialData = {} }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    zip: '',
    roofType: 'shingle',
    bill: initialData?.bill || '$240/mo',
    propertyType: initialData?.propertyType || 'residential'
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Send quote to backend API
      await fetch(`${API_BASE}/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          plan: initialData?.plan || 'Custom Estimate',
          systemSize: initialData?.systemSize || 'Calculated Size'
        })
      });
    } catch (err) {
      console.log('Backend sync note (offline or local fallback):', err.message);
    } finally {
      setSubmitting(false);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#bbf451', '#38bdf8', '#fbbf24', '#ffffff']
      });
      setSubmitted(true);
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#0c1524] text-white rounded-3xl border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#bbf451]/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div>
            {/* Modal Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#bbf451]/15 text-[#bbf451] text-xs font-bold mb-3">
                <Sun className="w-3.5 h-3.5 fill-[#bbf451]" />
                <span>3D Satellite Solar Assessment</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Get Your Customized Estimate
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Receive an accurate 25-year financial savings projection with $0 down payment options.
              </p>
              {initialData?.plan && (
                <div className="mt-2.5 text-xs text-[#bbf451] font-semibold bg-white/5 px-3 py-1 rounded-xl inline-block border border-white/10">
                  Selected Package: {initialData.plan} ({initialData.price})
                </div>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#bbf451] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. (555) 234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#bbf451] transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#bbf451] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Zip Code / City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 85001"
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#bbf451] transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Roof Type
                  </label>
                  <select
                    value={formData.roofType}
                    onChange={(e) => setFormData({ ...formData, roofType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080d17] border border-white/15 text-white text-sm focus:outline-none focus:border-[#bbf451] transition"
                  >
                    <option value="shingle">Asphalt Shingle</option>
                    <option value="tile">Clay / Concrete Tile</option>
                    <option value="metal">Metal Standing Seam</option>
                    <option value="flat">Commercial Flat Roof</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Approx Monthly Power Bill
                  </label>
                  <input
                    type="text"
                    value={formData.bill}
                    onChange={(e) => setFormData({ ...formData, bill: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#bbf451] transition"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-full bg-[#bbf451] hover:bg-[#a6e236] text-[#0c1524] font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-[#bbf451]/30 transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75"
                >
                  <span>{submitting ? 'Submitting to Database...' : 'Submit & Unlock Free Estimate'}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#bbf451]" />
                <span>Zero obligation • We respect your privacy • Instant response</span>
              </div>
            </form>
          </div>
        ) : (
          /* Submission Confirmation View */
          <div className="text-center py-6 sm:py-8 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#bbf451]/20 border-2 border-[#bbf451] text-[#bbf451] flex items-center justify-center mx-auto shadow-lg shadow-[#bbf451]/20">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Solar Analysis Request Received!
              </h3>
              <p className="text-slate-300 text-sm mt-2 max-w-md mx-auto">
                Thank you, <strong className="text-white">{formData.name || 'there'}</strong>! Our senior solar engineering team is generating your high-resolution 3D roof diagram.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between text-slate-400">
                <span>Confirmation ID:</span>
                <span className="font-mono text-white">#SV-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Delivery Email:</span>
                <span className="text-white">{formData.email}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated Response:</span>
                <span className="text-[#bbf451] font-bold">Within 15 Minutes</span>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition"
            >
              Done / Return to Site
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
