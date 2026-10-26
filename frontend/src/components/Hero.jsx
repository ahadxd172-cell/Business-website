import React from 'react';
import { ArrowRight, Star, ShieldCheck, Award, Zap, CheckCircle2 } from 'lucide-react';

export default function Hero({ onOpenQuote, onOpenCalculator, config = {} }) {
  const heroImage = config?.heroImage || "https://images.unsplash.com/photo-1508873696983-2df570464756?auto=format&fit=crop&w=2000&q=85";
  const heroTitle = config?.heroTitle || "Smart Solar Solutions for";
  const heroTitleItalic = config?.heroTitleItalic || "Homes & Businesses";
  const heroDescription = config?.heroDescription || "Sunvolt delivers solar installation and energy solutions for homes and businesses. Easy setup, lasting results.";
  const rating = config?.rating || "5.0";
  const reviewsCount = config?.reviewsCount || "100+ Reviews";

  return (
    <section id="home" className="pt-24 sm:pt-28 pb-8 sm:pb-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Outer Rounded Showcase Container matching Dribbble Card */}
      <div className="relative rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex flex-col justify-between p-6 sm:p-10 lg:p-16 shadow-2xl shadow-slate-900/15 border border-slate-200/50">
        
        {/* Background Image: Configurable from Admin */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Solar installation"
            className="w-full h-full object-cover object-center lg:object-[center_35%] filter brightness-[0.75] contrast-[1.08] transform hover:scale-[1.02] transition-transform duration-1000 ease-out"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1508873696983-2df570464756?auto=format&fit=crop&w=2000&q=85";
            }}
          />
          {/* Subtle multi-layer gradient overlays for maximum text legibility and rich contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1524]/95 via-[#0c1524]/55 to-[#0c1524]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c1524]/90 via-[#0c1524]/60 to-transparent" />
          
          {/* Subtle lime glow on top right for dynamic modern vibe */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#bbf451]/15 blur-3xl pointer-events-none"></div>
        </div>

        {/* Top spacer to balance floating nav */}
        <div className="relative z-10 pt-4 sm:pt-6"></div>

        {/* Hero Central Content */}
        <div className="relative z-10 max-w-2xl my-auto py-8">
          
          {/* 5-Star Reviews Pill Badge from Dribbble */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/15 text-xs font-semibold text-white mb-6 shadow-sm">
            <span className="text-[#bbf451] font-bold">{rating}</span>
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              ))}
            </div>
            <span className="text-slate-300 font-normal">{reviewsCount}</span>
          </div>

          {/* Main Headline with italic styling from Dribbble */}
          <h1 className="text-3xl sm:text-5xl lg:text-[58px] font-extrabold text-white tracking-tight leading-[1.1] sm:leading-[1.12] mb-6">
            {heroTitle}{' '}
            <span className="italic font-light text-slate-100 underline decoration-[#bbf451]/60 decoration-wavy decoration-2">
              {heroTitleItalic}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed font-normal mb-8 max-w-xl">
            {heroDescription}
          </p>

          {/* Action Buttons: Lime button & Dark glass button */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Primary: Get Your Estimate */}
            <button
              onClick={onOpenQuote}
              className="group inline-flex items-center gap-3 px-6 sm:px-7 py-3.5 rounded-full bg-[#bbf451] hover:bg-[#a8e833] text-[#0c1524] font-bold text-sm sm:text-base shadow-lg shadow-[#bbf451]/30 hover:shadow-[#bbf451]/50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <span>Get Your Estimate</span>
              <div className="w-7 h-7 rounded-full bg-[#0c1524] text-[#bbf451] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </button>

            {/* Secondary: View Services */}
            <a
              href="#services"
              className="group inline-flex items-center gap-3 px-6 sm:px-7 py-3.5 rounded-full bg-[#0c1524]/70 hover:bg-[#0c1524]/90 backdrop-blur-md border border-white/20 text-white font-semibold text-sm sm:text-base hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
            >
              <span>View Services</span>
              <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-white/20 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Feature Badges & Quick Stats */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-6 border-t border-white/10">
          
          {/* Quick trust metrics */}
          <div className="flex items-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#bbf451]" />
              <span>$0 Down Financing Available</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#bbf451]" />
              <span>Tier-1 Monocrystalline Panels</span>
            </div>
          </div>

          {/* Dribbble Floating Badges on the right */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0c1524]/75 backdrop-blur-md border border-white/15 text-xs font-medium text-slate-200 shadow-md hover:border-[#bbf451]/50 transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-[#bbf451]" />
              <span>25-Year Panel Warranty</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0c1524]/75 backdrop-blur-md border border-white/15 text-xs font-medium text-slate-200 shadow-md hover:border-[#bbf451]/50 transition-colors">
              <Award className="w-3.5 h-3.5 text-[#bbf451]" />
              <span>Certified Installers</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0c1524]/75 backdrop-blur-md border border-white/15 text-xs font-medium text-slate-200 shadow-md hover:border-[#bbf451]/50 transition-colors">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Free Energy Consultation</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
