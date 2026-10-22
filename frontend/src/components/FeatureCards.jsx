import React from 'react';
import { Sun, Cpu, Headphones, ArrowUpRight, ShieldCheck, Activity } from 'lucide-react';

export default function FeatureCards({ onOpenQuote }) {
  return (
    <section id="services" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header matching Dribbble text */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Experienced installers for every project.
        </h2>
        <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
          Engineered for maximum power generation, aesthetic architectural appeal, and zero-headache reliability.
        </p>
      </div>

      {/* 3-Card Grid faithfully matching Dribbble */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        
        {/* Card 1: Advanced Panels (White Card) */}
        <div className="group relative bg-white rounded-[2rem] p-8 sm:p-9 border border-slate-200/80 shadow-card-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
          <div>
            {/* Custom Icon Box matching Dribbble SVG illustration */}
            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-7 group-hover:scale-110 group-hover:bg-[#bbf451]/10 transition-all duration-300">
              <div className="relative">
                <Sun className="w-7 h-7 text-slate-700 group-hover:text-amber-500 transition-colors" />
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-slate-200 rounded border border-white flex items-center justify-center">
                  <div className="w-2 h-2 grid grid-cols-2 gap-0.5">
                    <span className="bg-slate-700"></span>
                    <span className="bg-slate-700"></span>
                    <span className="bg-slate-700"></span>
                    <span className="bg-slate-700"></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors">
              Advanced Panels
            </h3>

            {/* Description matching Dribbble copy */}
            <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
              We install high-efficiency modules designed to capture more sunlight, deliver stronger output, and maintain performance over many years.
            </p>
          </div>

          {/* Interactive footer micro-feature */}
          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-slate-900 transition-colors">
            <span>22.8% Cell Efficiency</span>
            <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-[#bbf451] group-hover:text-slate-900 flex items-center justify-center transition-all">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 2: Smart Energy Setup (Featured Lime Card from Dribbble!) */}
        <div className="group relative bg-[#bbf451] rounded-[2rem] p-8 sm:p-9 shadow-xl shadow-[#bbf451]/30 hover:shadow-2xl hover:shadow-[#bbf451]/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 transform">
          {/* Subtle popular pill on top right */}
          <div className="absolute top-6 right-6">
            <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-900/90 text-[#bbf451] shadow-sm">
              Featured
            </span>
          </div>

          <div>
            {/* Custom Icon Box in White matching Dribbble */}
            <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center mb-7 group-hover:scale-110 transition-all duration-300">
              <Cpu className="w-7 h-7 text-slate-900" />
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0c1524] mb-3">
              Smart Energy Setup
            </h3>

            {/* Description matching Dribbble copy */}
            <p className="text-[#0c1524]/85 text-sm sm:text-[15px] leading-relaxed font-medium">
              Every installation includes optimized wiring, reliable inverters, and clean hardware placement to ensure consistent performance and easier monitoring.
            </p>
          </div>

          {/* Interactive footer micro-feature */}
          <div className="pt-6 mt-6 border-t border-[#0c1524]/15 flex items-center justify-between text-xs font-bold text-[#0c1524]">
            <span>App-Connected Inverters</span>
            <div className="w-7 h-7 rounded-full bg-slate-900 text-[#bbf451] flex items-center justify-center group-hover:scale-110 transition-transform">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 3: Reliable Support (White Card) */}
        <div className="group relative bg-white rounded-[2rem] p-8 sm:p-9 border border-slate-200/80 shadow-card-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
          <div>
            {/* Custom 24/7 Support Icon Box */}
            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-7 group-hover:scale-110 group-hover:bg-[#bbf451]/10 transition-all duration-300">
              <Headphones className="w-7 h-7 text-slate-700 group-hover:text-emerald-600 transition-colors" />
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors">
              Reliable Support
            </h3>

            {/* Description matching Dribbble copy */}
            <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
              Our team provides clear guidance, quick responses, and ongoing help before and after installation, ensuring your system runs smoothly long term.
            </p>
          </div>

          {/* Interactive footer micro-feature */}
          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-slate-900 transition-colors">
            <span>24/7 Production Monitoring</span>
            <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-[#bbf451] group-hover:text-slate-900 flex items-center justify-center transition-all">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
