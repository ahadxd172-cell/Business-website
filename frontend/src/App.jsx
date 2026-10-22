import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureCards from './components/FeatureCards';
import AboutSection from './components/AboutSection';
import SolarCalculator from './components/SolarCalculator';
import ProjectsSection from './components/ProjectsSection';
import ProcessSection from './components/ProcessSection';
import PricingSection from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';

export default function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteInitialData, setQuoteInitialData] = useState({});

  const handleOpenQuote = (data = {}) => {
    setQuoteInitialData(data);
    setIsQuoteOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-slate-800 antialiased selection:bg-[#bbf451] selection:text-[#0c1524]">
      {/* Top Banner Notice */}
      <div className="bg-[#0c1524] text-white text-[11px] sm:text-xs py-2 px-4 text-center border-b border-white/10 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#bbf451] animate-ping"></span>
        <span>
          ☀️ <strong>2026 Solar Incentive:</strong> Claim up to 30% Federal Clean Energy Rebates on residential & commercial installations.
        </span>
        <button
          onClick={() => handleOpenQuote({ incentive: '30% Clean Energy Tax Rebate' })}
          className="underline font-bold text-[#bbf451] hover:text-white transition ml-1 cursor-pointer"
        >
          Check Eligibility →
        </button>
      </div>

      {/* Floating Navbar */}
      <Navbar onOpenQuote={() => handleOpenQuote()} />

      {/* Main Content Flow */}
      <main>
        {/* Hero Section matching Dribbble */}
        <Hero
          onOpenQuote={() => handleOpenQuote()}
          onOpenCalculator={() => {
            const el = document.getElementById('calculator');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 3 Value Proposition / Feature Cards from Dribbble */}
        <FeatureCards onOpenQuote={() => handleOpenQuote()} />

        {/* About Section: Team & Trust Badges from Dribbble */}
        <AboutSection onOpenQuote={() => handleOpenQuote()} />

        {/* Interactive Solar Savings Calculator */}
        <SolarCalculator onOpenQuote={(data) => handleOpenQuote(data)} />

        {/* Recent Installations / Projects Portfolio from Dribbble */}
        <ProjectsSection onOpenQuote={(data) => handleOpenQuote(data)} />

        {/* How Going Solar Works (4-Step Process) */}
        <ProcessSection />

        {/* Affordable Solar Plans / Pricing from Dribbble */}
        <PricingSection onOpenQuote={(data) => handleOpenQuote(data)} />

        {/* Customer Testimonials & Verified Savings */}
        <TestimonialsSection />

        {/* FAQ Accordion from Dribbble */}
        <FaqSection onOpenQuote={() => handleOpenQuote()} />

        {/* High-Converting CTA Banner */}
        <CtaBanner onOpenQuote={() => handleOpenQuote()} />
      </main>

      {/* Footer */}
      <Footer onOpenQuote={() => handleOpenQuote()} />

      {/* Interactive Free Quote / Estimate Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={handleCloseQuote}
        initialData={quoteInitialData}
      />
    </div>
  );
}
