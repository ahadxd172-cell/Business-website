import React, { useState } from 'react';
import { ArrowRight, Mail, Phone, MapPin, Shield, CheckCircle, Sun } from 'lucide-react';

export default function Footer({ onOpenQuote }) {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="contact" className="bg-[#080d17] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-5">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 via-[#bbf451] to-emerald-400 p-0.5 shadow-md">
                <div className="w-full h-full bg-[#0c1524] rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-[#bbf451] shadow-[0_0_10px_#bbf451]"></div>
                </div>
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Sun<span className="text-[#bbf451]">volt</span>
              </span>
            </a>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Delivering high-efficiency solar energy installations, smart battery storage, and complete electrical independence for residential and commercial clients nationwide.
            </p>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#bbf451]" />
                <span>Toll-Free: (800) 555-8658 (VOLT)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#bbf451]" />
                <span>hello@sunvolt-energy.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#bbf451]" />
                <span>Headquarters: 4200 Solaria Blvd, Suite 800, Phoenix, AZ</span>
              </div>
            </div>
          </div>

          {/* Quick Links: Solutions */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#bbf451]">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#services" className="hover:text-white transition">Residential Solar</a></li>
              <li><a href="#services" className="hover:text-white transition">Commercial Power</a></li>
              <li><a href="#services" className="hover:text-white transition">Tesla Battery Backup</a></li>
              <li><a href="#projects" className="hover:text-white transition">Ground-Mount Arrays</a></li>
              <li><a href="#services" className="hover:text-white transition">EV Fleet Charging</a></li>
              <li><a href="#services" className="hover:text-white transition">Panel Maintenance</a></li>
            </ul>
          </div>

          {/* Quick Links: Company & Tools */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#bbf451]">
              Tools & Info
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#calculator" className="hover:text-white transition">Solar Calculator</a></li>
              <li><a href="#pricing" className="hover:text-white transition">Solar Plans & Pricing</a></li>
              <li><a href="#about" className="hover:text-white transition">About Sunvolt</a></li>
              <li><a href="#projects" className="hover:text-white transition">Recent Installations</a></li>
              <li><a href="#faq" className="hover:text-white transition">FAQ & Help</a></li>
              <li><a href="#home" className="hover:text-white transition">Warranty Details</a></li>
            </ul>
          </div>

          {/* Newsletter & Certification */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#bbf451]">
              Stay Energized
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Subscribe for regional solar incentive alerts, tax rebate guides, and clean tech breakthroughs.
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-2xl bg-[#bbf451]/10 border border-[#bbf451]/30 text-xs text-[#bbf451] flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Thank you! You're subscribed to solar rebate updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#bbf451] transition"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-full bg-[#bbf451] hover:bg-[#a6e236] text-[#0c1524] text-xs font-bold shrink-0 transition"
                >
                  Join
                </button>
              </form>
            )}

            <div className="pt-3 flex items-center gap-3 text-[11px] text-slate-400">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Licensed Electrical Contractor #ROC328491 • NABCEP Certified</span>
            </div>
          </div>

        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Sunvolt Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition">Licensing & Safety</a>
            <a href="#" className="hover:text-slate-300 transition">Cookie Preferences</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
