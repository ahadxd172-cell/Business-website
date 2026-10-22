import React from 'react';
import { ArrowRight, Phone, ShieldCheck, Zap, Award, Sparkles } from 'lucide-react';

export default function CtaBanner({ onOpenQuote }) {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-[2.5rem] lg:rounded-[3.5rem] bg-[#0c1524] p-8 sm:p-14 lg:p-20 text-center text-white overflow-hidden shadow-2xl border border-white/10">
        
        {/* Ambient Lime & Cyan Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#bbf451]/15 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[250px] bg-blue-500/10 rounded-full blur-[90px] pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-[#bbf451] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Limited Time 30% Federal Clean Energy Rebate</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6">
            Ready to Power Your Home With{' '}
            <span className="italic font-light text-[#bbf451]">Clean Solar Energy?</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Get an instant satellite 3D roof analysis and see your personalized 25-year financial savings report. No obligations, zero aggressive sales.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenQuote}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#bbf451] hover:bg-[#a6e236] text-[#0c1524] font-extrabold text-base shadow-xl shadow-[#bbf451]/30 hover:shadow-[#bbf451]/50 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Get Your Free Estimate</span>
              <div className="w-7 h-7 rounded-full bg-[#0c1524] text-[#bbf451] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </button>

            <a
              href="tel:18005558658"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white font-bold text-base transition-all hover:scale-105 active:scale-95"
            >
              <Phone className="w-4 h-4 text-[#bbf451]" />
              <span>(800) 555-VOLT</span>
            </a>
          </div>

          {/* Guarantee Badges */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#bbf451]" />
              <span>25-Year Full Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#bbf451]" />
              <span>NABCEP Certified Installers</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>$0 Out-of-Pocket Financing</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
