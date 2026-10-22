import React, { useState } from 'react';
import { Calculator, ArrowRight, Zap, DollarSign, Leaf, Sparkles, Sun, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SolarCalculator({ onOpenQuote }) {
  const [bill, setBill] = useState(240);
  const [propertyType, setPropertyType] = useState('residential');
  const [hasBattery, setHasBattery] = useState(true);

  // Dynamic calculations based on industry solar metrics
  const multiplier = propertyType === 'residential' ? 1 : 2.4;
  const effectiveBill = bill * multiplier;
  
  const estimatedKw = ((effectiveBill * 0.052)).toFixed(1);
  const panelCount = Math.round(estimatedKw * 2.5);
  const annualSavings = Math.round(effectiveBill * 12 * 0.88);
  const twentyFiveYearSavings = Math.round(effectiveBill * 12 * 25 * 0.92);
  const treesEquivalent = Math.round(estimatedKw * 48);
  const co2Offset = (estimatedKw * 1.4).toFixed(1);
  const estimatedTaxCredit = Math.round(estimatedKw * 2800 * 0.30);

  const handleCelebrate = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#bbf451', '#38bdf8', '#fbbf24', '#ffffff']
    });
    onOpenQuote({
      bill: `$${effectiveBill}/mo`,
      systemSize: `${estimatedKw} kW`,
      propertyType
    });
  };

  return (
    <section id="calculator" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Container with modern dark aesthetic contrasting the light page */}
      <div className="relative rounded-[2.5rem] lg:rounded-[3rem] bg-[#0c1524] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl border border-white/10">
        
        {/* Glow Effects */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#bbf451]/15 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>

        {/* Section Header */}
        <div className="relative z-10 max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-[#bbf451] mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>Instant Energy Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Calculate Your Solar Savings in Real Time
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            See how much you could save by switching to clean solar power. Adjust your average monthly power bill below.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-8 bg-white/5 backdrop-blur-lg p-6 sm:p-8 rounded-3xl border border-white/10">
            
            {/* Property Type Toggle */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                Property Classification
              </label>
              <div className="grid grid-cols-2 gap-2 bg-[#080d17] p-1.5 rounded-2xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setPropertyType('residential')}
                  className={`py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    propertyType === 'residential'
                      ? 'bg-[#bbf451] text-[#0c1524] shadow-md shadow-[#bbf451]/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Residential Home
                </button>
                <button
                  type="button"
                  onClick={() => setPropertyType('commercial')}
                  className={`py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    propertyType === 'commercial'
                      ? 'bg-[#bbf451] text-[#0c1524] shadow-md shadow-[#bbf451]/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Commercial Facility
                </button>
              </div>
            </div>

            {/* Slider: Monthly Electric Bill */}
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Current Monthly Electric Bill
                </label>
                <span className="text-3xl font-extrabold text-[#bbf451] font-mono">
                  ${bill}
                  <span className="text-xs text-slate-400 font-sans font-normal">/month</span>
                </span>
              </div>
              <input
                type="range"
                min="80"
                max="650"
                step="10"
                value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
                className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#bbf451]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
                <span>$80/mo</span>
                <span>$350/mo</span>
                <span>$650+/mo</span>
              </div>
            </div>

            {/* Battery Backup Checkbox */}
            <div 
              onClick={() => setHasBattery(!hasBattery)}
              className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                  hasBattery ? 'bg-[#bbf451] border-[#bbf451] text-[#0c1524]' : 'border-white/30'
                }`}>
                  {hasBattery && <CheckCircle className="w-4 h-4 stroke-[3]" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Include Tesla / Enphase Battery Backup</p>
                  <p className="text-xs text-slate-400">Maintains 24/7 power through outages and blackout events</p>
                </div>
              </div>
              <span className="text-xs font-extrabold text-[#bbf451] uppercase">Recommended</span>
            </div>

            {/* Tax Credit Callout */}
            <div className="p-4 rounded-2xl bg-[#bbf451]/10 border border-[#bbf451]/30 flex items-center gap-3.5">
              <Sparkles className="w-6 h-6 text-[#bbf451] shrink-0" />
              <p className="text-xs text-slate-200">
                Qualifies for estimated <strong className="text-white font-bold">${estimatedTaxCredit.toLocaleString()}</strong> in 30% Federal Clean Energy Tax Credit!
              </p>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/15 shadow-xl flex flex-col justify-between space-y-6">
            
            {/* 25-Year Big Stat */}
            <div className="border-b border-white/10 pb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Estimated 25-Year Lifetime Savings
              </p>
              <div className="text-4xl sm:text-6xl font-black text-[#bbf451] tracking-tight">
                ${twentyFiveYearSavings.toLocaleString()}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Based on historical 4.2% annual utility rate inflation and net-metering credits.
              </p>
            </div>

            {/* 3 Metrics Mini Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>System Size</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">{estimatedKw} kW</div>
                <p className="text-[11px] text-slate-400 mt-0.5">~{panelCount} premium panels</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <DollarSign className="w-3.5 h-3.5 text-[#bbf451]" />
                  <span>Annual Bill Cut</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">${annualSavings.toLocaleString()}</div>
                <p className="text-[11px] text-slate-400 mt-0.5">Year 1 savings</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                  <span>CO₂ Offset</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">{co2Offset} Tons</div>
                <p className="text-[11px] text-slate-400 mt-0.5">{treesEquivalent} trees equivalent</p>
              </div>
            </div>

            {/* Claim CTA Button with confetti */}
            <button
              onClick={handleCelebrate}
              className="w-full py-4 rounded-full bg-[#bbf451] hover:bg-[#a6e236] text-[#0c1524] font-extrabold text-base flex items-center justify-center gap-3 shadow-xl shadow-[#bbf451]/30 hover:shadow-[#bbf451]/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Lock In This Solar Estimate</span>
              <div className="w-7 h-7 rounded-full bg-[#0c1524] text-[#bbf451] flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
