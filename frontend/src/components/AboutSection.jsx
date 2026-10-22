import React from 'react';
import { Check, Shield, Award, Users, ArrowRight } from 'lucide-react';

export default function AboutSection({ onOpenQuote }) {
  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Team Photo with Badges matching Dribbble */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-900/10 border border-slate-200/80 group">
            {/* Cheerful installation team image */}
            <img
              src="https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1200&q=80"
              alt="Sunvolt solar installation team standing on rooftop with safety helmets"
              className="w-full h-[450px] sm:h-[520px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              onError={(e) => {
                e.currentTarget.src = "/images/image copy.png";
              }}
            />
            {/* Subtle gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

            {/* Floating Experience Card */}
            <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-xs p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/60 shadow-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#bbf451] flex items-center justify-center text-[#0c1524] font-bold text-lg shadow-sm">
                12+
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Industry Experience</p>
                <p className="text-sm font-extrabold text-slate-900">1,250+ Residential & Commercial Systems</p>
              </div>
            </div>
          </div>

          {/* Decorative Lime Accent Blob behind image */}
          <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[#bbf451]/20 rounded-full blur-2xl -z-10"></div>
          <div className="absolute -top-8 -right-8 w-48 h-48 bg-sky-200/40 rounded-full blur-2xl -z-10"></div>
        </div>

        {/* Right Column: Copy matching Dribbble layout */}
        <div className="lg:col-span-6">
          
          {/* Badge: About Sunvolt */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span>About Sunvolt</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
            A Team Focused on Clean Energy
          </h2>

          {/* Body Copy matching Dribbble */}
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
            Sunvolt is a solar installation company helping homeowners and small businesses reduce electricity costs with clean, dependable energy systems. Our team handles every step—inspection, planning, installation, and support—so clients get a smooth, worry-free experience from start to finish. We focus on quality materials, safe installation, and long-term performance.
          </p>

          {/* Checklist items in clean rounded containers */}
          <div className="space-y-3.5 mb-8">
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-[#bbf451] transition-colors">
              <div className="w-6 h-6 rounded-full bg-[#bbf451] flex items-center justify-center shrink-0 text-[#0c1524]">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-sm sm:text-[15px] font-semibold text-slate-800">
                From consultation to installation, we're connected throughout the process.
              </span>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-[#bbf451] transition-colors">
              <div className="w-6 h-6 rounded-full bg-[#bbf451] flex items-center justify-center shrink-0 text-[#0c1524]">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-sm sm:text-[15px] font-semibold text-slate-800">
                Over a decade of solar installation knowledge applied to every project.
              </span>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-[#bbf451] transition-colors">
              <div className="w-6 h-6 rounded-full bg-[#bbf451] flex items-center justify-center shrink-0 text-[#0c1524]">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-sm sm:text-[15px] font-semibold text-slate-800">
                We work with reliable panels, inverters, and batteries built to last.
              </span>
            </div>
          </div>

          {/* Action button */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenQuote}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#0c1524] hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <span>Meet Our Solar Engineers</span>
              <ArrowRight className="w-4 h-4 text-[#bbf451]" />
            </button>
          </div>
        </div>

      </div>

      {/* Trust & Client Logos Bar matching Dribbble (MNC, TELKOMSEL, etc.) */}
      <div className="mt-20 pt-10 border-t border-slate-200">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
          Trusted by Industry Leaders & Certified Hardware Partners
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 grayscale hover:grayscale-0 transition-all">
          <div className="text-xl sm:text-2xl font-black tracking-tighter text-slate-800 flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-sm bg-blue-600 inline-block"></span>
            MNC ENERGY
          </div>
          <div className="text-xl sm:text-2xl font-black tracking-wider text-red-600 flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            TELKOMSEL
          </div>
          <div className="text-xl sm:text-2xl font-bold tracking-widest text-slate-800">
            TESLA <span className="font-light text-slate-500 text-xs">ENERGY</span>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-amber-600">
            [e] enphase.
          </div>
          <div className="text-xl sm:text-2xl font-black tracking-tight text-blue-700">
            solaredge
          </div>
          <div className="text-xl sm:text-2xl font-bold tracking-tighter text-slate-700">
            CanadianSolar
          </div>
        </div>
      </div>
    </section>
  );
}
