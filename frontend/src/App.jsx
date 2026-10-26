import React, { useState, useEffect } from 'react';
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
import AdminPortal from './admin/AdminPortal';
import { API_BASE } from './config/api';

export default function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteInitialData, setQuoteInitialData] = useState({});

  // View state: 'site' | 'admin'
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/admin' || hash === '#admin') return 'admin';
    }
    return 'site';
  });

  // Dynamic Site Configuration from Backend / MongoDB
  const [config, setConfig] = useState({
    announcement: "☀️ 2026 Solar Incentive: Claim up to 30% Federal Clean Energy Rebates on residential & commercial installations.",
    announcementLink: "Check Eligibility →",
    heroTitle: "Smart Solar Solutions for",
    heroTitleItalic: "Homes & Businesses",
    heroDescription: "Sunvolt delivers solar installation and energy solutions for homes and businesses. Easy setup, lasting results.",
    heroImage: "https://images.unsplash.com/photo-1508873696983-2df570464756?auto=format&fit=crop&w=2000&q=85",
    rating: "5.0",
    reviewsCount: "100+ Reviews",
    phone: "(800) 555-VOLT",
    email: "hello@sunvolt-energy.com"
  });

  // Fetch site configuration from MongoDB
  const fetchLiveConfig = async () => {
    try {
      const res = await fetch(`${API_BASE}/config`);
      const data = await res.json();
      if (data.success && data.data) {
        setConfig(prev => ({ ...prev, ...data.data }));
      }
    } catch (err) {
      // Keep default config if backend is momentarily unreachable
    }
  };

  useEffect(() => {
    fetchLiveConfig();

    // Listen for custom event from Admin Dashboard when changes are saved
    const handleConfigUpdate = (e) => {
      if (e.detail) {
        setConfig(prev => ({ ...prev, ...e.detail }));
      } else {
        fetchLiveConfig();
      }
    };

    const handleHashChange = () => {
      if (window.location.hash.toLowerCase() === '#admin') {
        setCurrentView('admin');
      } else if (window.location.pathname.toLowerCase() === '/admin') {
        setCurrentView('admin');
      }
    };

    window.addEventListener('sunvolt_config_updated', handleConfigUpdate);
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    return () => {
      window.removeEventListener('sunvolt_config_updated', handleConfigUpdate);
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const handleOpenQuote = (data = {}) => {
    setQuoteInitialData(data);
    setIsQuoteOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteOpen(false);
  };

  const handleNavigateToAdmin = () => {
    window.location.hash = 'admin';
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToSite = () => {
    window.location.hash = '';
    setCurrentView('site');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in Admin view, render Admin Portal
  if (currentView === 'admin') {
    return <AdminPortal onBackToSite={handleNavigateToSite} />;
  }

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-slate-800 antialiased selection:bg-[#bbf451] selection:text-[#0c1524]">
      {/* Top Banner Notice (Configurable from Admin) */}
      <div className="bg-[#0c1524] text-white text-[11px] sm:text-xs py-2 px-4 text-center border-b border-white/10 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#bbf451] animate-ping"></span>
        <span>{config.announcement}</span>
        <button
          onClick={() => handleOpenQuote({ incentive: '30% Clean Energy Tax Rebate' })}
          className="underline font-bold text-[#bbf451] hover:text-white transition ml-1 cursor-pointer"
        >
          {config.announcementLink || 'Check Eligibility →'}
        </button>
      </div>

      {/* Floating Navbar */}
      <Navbar onOpenQuote={() => handleOpenQuote()} />

      {/* Main Content Flow */}
      <main>
        {/* Hero Section with live config from MongoDB */}
        <Hero
          config={config}
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

      {/* Footer with onOpenAdmin handler */}
      <Footer
        onOpenQuote={() => handleOpenQuote()}
        onOpenAdmin={handleNavigateToAdmin}
      />

      {/* Interactive Free Quote / Estimate Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={handleCloseQuote}
        initialData={quoteInitialData}
      />
    </div>
  );
}
