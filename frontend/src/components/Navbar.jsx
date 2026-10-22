import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, Sun, Sparkles, Phone, ChevronDown } from 'lucide-react';

export default function Navbar({ onOpenQuote }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 sm:px-6 lg:px-8 ${
          scrolled ? 'backdrop-blur-md bg-slate-950/70 py-3 shadow-lg shadow-black/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo matching Sunvolt Dribbble */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 via-[#bbf451] to-emerald-400 p-0.5 shadow-md shadow-[#bbf451]/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0c1524] rounded-full flex items-center justify-center overflow-hidden relative">
                {/* Sun & Solar rays icon */}
                <div className="w-4 h-4 rounded-full bg-[#bbf451] shadow-[0_0_12px_#bbf451]"></div>
                <div className="absolute inset-0 border border-[#bbf451]/40 rounded-full scale-125"></div>
                <div className="absolute w-1 h-1 bg-amber-400 rounded-full -top-0.5 left-1/2 -translate-x-1/2"></div>
                <div className="absolute w-1 h-1 bg-amber-400 rounded-full -bottom-0.5 left-1/2 -translate-x-1/2"></div>
                <div className="absolute w-1 h-1 bg-amber-400 rounded-full top-1/2 -left-0.5 -translate-y-1/2"></div>
                <div className="absolute w-1 h-1 bg-amber-400 rounded-full top-1/2 -right-0.5 -translate-y-1/2"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-white flex items-center">
                Sun<span className="text-[#bbf451]">volt</span>
              </span>
            </div>
          </a>

          {/* Desktop Glass Navigation Bar (Pill style matching hero overlay) */}
          <nav className="hidden lg:flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#0c1524]/65 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20 text-sm font-medium text-slate-200">
            <a
              href="#home"
              className="px-3.5 py-1.5 rounded-full text-white font-semibold hover:text-[#bbf451] transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              className="px-3.5 py-1.5 rounded-full hover:text-[#bbf451] transition-colors"
            >
              About
            </a>
            
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <a
                href="#services"
                className="px-3.5 py-1.5 rounded-full hover:text-[#bbf451] flex items-center gap-1 transition-colors"
              >
                Services
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesDropdown ? 'rotate-180 text-[#bbf451]' : ''}`} />
              </a>
              {servicesDropdown && (
                <div className="absolute top-full left-0 mt-2 w-56 rounded-2xl bg-[#0c1524]/95 backdrop-blur-xl border border-white/15 p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
                  <a href="#services" className="block px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition">
                    Residential Solar Installation
                  </a>
                  <a href="#services" className="block px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition">
                    Commercial Clean Power
                  </a>
                  <a href="#services" className="block px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition">
                    Battery Storage & Backup
                  </a>
                  <a href="#services" className="block px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition">
                    Solar Maintenance & Monitoring
                  </a>
                </div>
              )}
            </div>

            <a
              href="#projects"
              className="px-3.5 py-1.5 rounded-full hover:text-[#bbf451] transition-colors"
            >
              Projects
            </a>
            <a
              href="#pricing"
              className="px-3.5 py-1.5 rounded-full hover:text-[#bbf451] transition-colors"
            >
              Pricing
            </a>
            <a
              href="#calculator"
              className="px-3.5 py-1.5 rounded-full hover:text-[#bbf451] transition-colors"
            >
              Calculator
            </a>
            <a
              href="#faq"
              className="px-3.5 py-1.5 rounded-full hover:text-[#bbf451] transition-colors"
            >
              FAQ
            </a>
            <a
              href="#contact"
              className="px-3.5 py-1.5 rounded-full hover:text-[#bbf451] transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:18005558658"
              className="hidden xl:flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white px-3 py-2 rounded-full bg-white/5 border border-white/10 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#bbf451]" />
              <span>(800) 555-VOLT</span>
            </a>

            {/* Glowing Lime "Get Quote" Button from Dribbble */}
            <button
              onClick={onOpenQuote}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#bbf451] hover:bg-[#a6e236] text-[#0c1524] font-semibold text-sm shadow-lg shadow-[#bbf451]/30 hover:shadow-[#bbf451]/50 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span>Get Quote</span>
              <div className="w-5 h-5 rounded-full bg-[#0c1524] text-[#bbf451] flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3 h-3 stroke-[2.5]" />
              </div>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenQuote}
              className="px-3 py-1.5 rounded-full bg-[#bbf451] text-[#0c1524] text-xs font-bold"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900/80 border border-white/10 text-white hover:text-[#bbf451] transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 max-w-7xl mx-auto rounded-3xl bg-[#0c1524]/95 backdrop-blur-2xl border border-white/10 p-5 shadow-2xl animate-in slide-in-from-top-3 duration-200">
            <div className="flex flex-col gap-3 text-slate-200 font-medium">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-white/10 text-white font-semibold"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-white/10"
              >
                About
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-white/10"
              >
                Services
              </a>
              <a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-white/10"
              >
                Projects
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-white/10"
              >
                Pricing
              </a>
              <a
                href="#calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-white/10 text-[#bbf451] flex items-center justify-between"
              >
                <span>Solar Calculator</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#bbf451]/20">Interactive</span>
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-white/10"
              >
                FAQ
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl hover:bg-white/10"
              >
                Contact
              </a>
              
              <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
                <a
                  href="tel:18005558658"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 text-slate-300 text-sm font-medium"
                >
                  <Phone className="w-4 h-4 text-[#bbf451]" />
                  (800) 555-VOLT
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuote();
                  }}
                  className="w-full py-3 rounded-full bg-[#bbf451] text-[#0c1524] font-bold text-center shadow-lg shadow-[#bbf451]/30 flex items-center justify-center gap-2"
                >
                  <span>Get Your Free Estimate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
