import React from 'react';
import { Star, Quote, CheckCircle, TrendingDown } from 'lucide-react';

const testimonials = [
  {
    name: "Marcus Vance",
    role: "Homeowner in Scottsdale, AZ",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    system: "12.8 kW + Tesla Powerwall",
    billBefore: "$380/mo",
    billAfter: "$18/mo",
    savings: "$4,340 / year saved",
    quote: "Our electric bill in Arizona summer was easily topping $400 every month. Sunvolt designed a gorgeous system that blends in with our Spanish tile roof. Our last bill was literally $18 for the grid connection fee. Best decision ever."
  },
  {
    name: "Elena Rostova",
    role: "Boutique Winery Owner, Napa CA",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    system: "28 kW Commercial Ground Array",
    billBefore: "$1,850/mo",
    billAfter: "$120/mo",
    savings: "$20,760 / year saved",
    quote: "The team at Sunvolt handled everything seamlessly with our county permits and utility interconnection. The ground array looks fantastic and powers all our refrigeration and tasting room lighting with 100% clean sun energy."
  },
  {
    name: "David & Sarah Chen",
    role: "Suburban Residence, Austin TX",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    system: "8.6 kW All-Black Rooftop",
    billBefore: "$240/mo",
    billAfter: "$22/mo",
    savings: "$2,610 / year saved",
    quote: "Zero out-of-pocket setup. Our fixed monthly solar loan payment is lower than what we used to pay the electric company, and we received over $6,000 back in federal tax credits. Couldn't recommend Sunvolt more!"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-50/50 rounded-[3rem]">
      
      {/* Header matching Dribbble "Switched to Solar" */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200/60 text-xs font-bold text-slate-800 mb-4">
          <span>Customer Stories</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Switched to Solar
        </h2>
        <p className="text-slate-600 text-base sm:text-lg">
          Over 1,200 homeowners and commercial businesses have taken control of their energy costs with Sunvolt.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-[2.5rem] p-8 border border-slate-200/90 shadow-card-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
          >
            <div>
              {/* Stars & Quote Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <Quote className="w-7 h-7 text-[#bbf451] opacity-70 group-hover:scale-110 transition-transform" />
              </div>

              {/* Quote Text */}
              <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>

              {/* Bill Impact Box */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 mb-6 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Previous Bill:</span>
                  <span className="font-bold text-red-500 line-through">{t.billBefore}</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-[#bbf451]/30 flex items-center justify-center text-[#0c1524]">
                  <TrendingDown className="w-3.5 h-3.5" />
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[11px]">Current Bill:</span>
                  <span className="font-extrabold text-emerald-600">{t.billAfter}</span>
                </div>
              </div>
            </div>

            {/* Author Info */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#bbf451]"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-slate-900 text-sm">{t.name}</h4>
                  <CheckCircle className="w-3.5 h-3.5 text-blue-500 fill-blue-500 text-white" />
                </div>
                <p className="text-xs text-slate-500">{t.role}</p>
                <p className="text-[11px] font-semibold text-emerald-600 mt-0.5">{t.savings}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
