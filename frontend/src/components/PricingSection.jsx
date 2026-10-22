import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';

const plans = [
  {
    name: "Starter Home Solar",
    badge: "Entry System",
    description: "Ideal for 1-2 bedroom apartments, small cottages, or energy-conscious households.",
    size: "6.2 kW System",
    panels: "14 Tier-1 Monocrystalline Panels",
    monthlyPrice: 79,
    cashPrice: 11400,
    featured: false,
    features: [
      "25-Year Manufacturer Panel Warranty",
      "Enphase Microinverter Hardware",
      "Standard Roof Flashing & Weatherproofing",
      "Mobile Energy Production App",
      "Full Local Utility Permitting Included",
      "1-Year Free System Performance Check"
    ]
  },
  {
    name: "Family Independence Plan",
    badge: "Most Popular",
    description: "Our top-rated package designed for 3-4 bedroom homes with high cooling/heating & EV charging.",
    size: "11.4 kW + Battery Ready",
    panels: "26 High-Output 430W Modules",
    monthlyPrice: 139,
    cashPrice: 19800,
    featured: true,
    features: [
      "25-Year Comprehensive Bumper-to-Bumper Warranty",
      "Smart SolarEdge Optimizer Architecture",
      "Tesla Powerwall / Enphase Battery Ready",
      "24/7 AI-Powered Proactive Grid Monitoring",
      "Guaranteed $0 Out-of-Pocket Down Payment",
      "Priority Rapid Installation Scheduling",
      "30% Federal Investment Tax Credit Eligible"
    ]
  },
  {
    name: "Commercial & Large Estate",
    badge: "Maximum Output",
    description: "Engineered for large luxury properties, agricultural ranches, and commercial retail facilities.",
    size: "24.0 kW+ Custom Array",
    panels: "50+ Heavy-Duty Solar Modules",
    monthlyPrice: 289,
    cashPrice: 38500,
    featured: false,
    features: [
      "30-Year Extended Heavy Industrial Warranty",
      "Dual Inverter Redundancy Setup",
      "Multi-Unit Battery Storage Integration",
      "Dedicated Commercial Project Engineer",
      "Commercial Depreciation (MACRS) Assistance",
      "Annual Thermal Drone Inspections",
      "EV Fleet Charging Station Integration"
    ]
  }
];

export default function PricingSection({ onOpenQuote }) {
  const [billingMode, setBillingMode] = useState('loan'); // 'loan' or 'cash'

  return (
    <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header matching Dribbble text */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 mb-4">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          <span>Pricing</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Affordable Solar Plans
        </h2>
        <p className="text-slate-600 text-base sm:text-lg">
          Tailored solar packages designed to fit different home sizes and energy needs. Lock in zero electric rate inflation.
        </p>

        {/* Payment Model Toggle */}
        <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => setBillingMode('loan')}
            className={`px-5 py-2 rounded-full transition-all ${
              billingMode === 'loan'
                ? 'bg-slate-900 text-[#bbf451] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            $0 Down Monthly Loan
          </button>
          <button
            type="button"
            onClick={() => setBillingMode('cash')}
            className={`px-5 py-2 rounded-full transition-all ${
              billingMode === 'cash'
                ? 'bg-slate-900 text-[#bbf451] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Direct Cash Purchase
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-[2.5rem] p-8 sm:p-10 transition-all duration-300 flex flex-col justify-between ${
              plan.featured
                ? 'bg-[#0c1524] text-white shadow-2xl ring-2 ring-[#bbf451] lg:-translate-y-3'
                : 'bg-white text-slate-900 border border-slate-200/90 shadow-card-soft hover:shadow-card-hover'
            }`}
          >
            {/* Featured Badge */}
            {plan.featured && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#bbf451] text-[#0c1524] font-extrabold text-xs uppercase tracking-wider shadow-md">
                  <Sparkles className="w-3.5 h-3.5 fill-[#0c1524]" />
                  {plan.badge}
                </span>
              </div>
            )}

            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-extrabold tracking-tight mb-1">{plan.name}</h3>
                  <p className={`text-xs font-semibold ${plan.featured ? 'text-[#bbf451]' : 'text-slate-500'}`}>
                    {plan.size}
                  </p>
                </div>
                {!plan.featured && (
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    {plan.badge}
                  </span>
                )}
              </div>

              <p className={`text-sm leading-relaxed mb-6 ${plan.featured ? 'text-slate-300' : 'text-slate-600'}`}>
                {plan.description}
              </p>

              {/* Price Display */}
              <div className="mb-6 pb-6 border-b border-slate-100/20">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black font-mono">
                    ${billingMode === 'loan' ? plan.monthlyPrice : plan.cashPrice.toLocaleString()}
                  </span>
                  <span className={`text-sm font-medium ${plan.featured ? 'text-slate-400' : 'text-slate-500'}`}>
                    {billingMode === 'loan' ? '/month' : 'one-time'}
                  </span>
                </div>
                <p className={`text-xs mt-1.5 ${plan.featured ? 'text-slate-400' : 'text-slate-500'}`}>
                  {billingMode === 'loan' ? 'Fixed 25-yr solar loan at 4.99% APR' : 'Includes 30% tax credit savings'}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3.5 mb-8">
                <p className={`text-xs font-bold uppercase tracking-wider ${plan.featured ? 'text-[#bbf451]' : 'text-slate-400'}`}>
                  What's Included:
                </p>
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      plan.featured ? 'bg-[#bbf451] text-[#0c1524]' : 'bg-slate-100 text-slate-800'
                    }`}>
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className={`text-xs sm:text-sm font-medium leading-tight ${plan.featured ? 'text-slate-200' : 'text-slate-700'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA Button */}
            <button
              onClick={() => onOpenQuote({ plan: plan.name, price: billingMode === 'loan' ? `$${plan.monthlyPrice}/mo` : `$${plan.cashPrice}` })}
              className={`w-full py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-md ${
                plan.featured
                  ? 'bg-[#bbf451] hover:bg-[#a8e833] text-[#0c1524] shadow-[#bbf451]/30'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              <span>Choose {plan.name.split(' ')[0]}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

    </section>
  );
}
