import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall, ArrowRight } from 'lucide-react';

const faqs = [
  {
    question: "Is my roof a good fit for solar?",
    answer: "Most roofs with minimal tree shading facing south, west, or east are excellent candidates for solar. During our free 3D satellite consultation, our team examines your roof pitch, shading data, and structural integrity. If your roof requires minor repair or replacement, we can coordinate that in your clean energy package."
  },
  {
    question: "How much money can I really save with solar?",
    answer: "Most Sunvolt customers reduce their electric bill by 75% to 95%. Over 25 years, typical households save anywhere between $28,000 and $65,000, depending on utility rates and system size. Plus, solar shields you from unpredictable utility price hikes."
  },
  {
    question: "What happens on cloudy or rainy days?",
    answer: "Solar photovoltaic panels still generate electricity on cloudy or overcast days using diffused ambient sunlight. At night or during high storm activity, your home draws seamlessly from the grid or from your installed home battery storage (such as Tesla Powerwall or Enphase IQ)."
  },
  {
    question: "How long does the installation take?",
    answer: "The actual on-roof panel mounting and electrical wiring by our certified crew takes just 1 to 2 business days. The entire timeline—from engineering design, city permit submission, utility review to final Permission to Operate (PTO)—typically takes 2 to 4 weeks, with Sunvolt handling 100% of the logistics."
  },
  {
    question: "What warranties are included with my installation?",
    answer: "Sunvolt offers an industry-leading 25-Year Triple Protection Guarantee covering: 1) Solar panel performance (guaranteed 85%+ output after 25 years), 2) Microinverter equipment warranty, and 3) 25-Year workmanship and roof leak penetration protection."
  },
  {
    question: "How does the 30% Federal Clean Energy Tax Credit work?",
    answer: "Under the Residential Clean Energy Credit, you can deduct 30% of the total cost of your solar and battery storage system directly from your federal taxes owed with no dollar cap. We provide you with all required IRS documentation upon project completion."
  }
];

export default function FaqSection({ onOpenQuote }) {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default like in Dribbble

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Header matching Dribbble text */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 mb-4">
          <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          We've Got Answers
        </h2>
        <p className="text-slate-600 text-base sm:text-lg">
          Going solar can be overwhelming. Here are the most common questions to help you make an informed decision.
        </p>
      </div>

      {/* Accordion List matching Dribbble style */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-white border-[#bbf451] shadow-lg shadow-[#bbf451]/10'
                  : 'bg-white/70 hover:bg-white border-slate-200/90 shadow-sm'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-slate-900"
              >
                <span className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full transition-colors ${isOpen ? 'bg-[#bbf451]' : 'bg-slate-300'}`}></span>
                  {faq.question}
                </span>
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isOpen
                      ? 'bg-[#bbf451] text-[#0c1524] rotate-180'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in duration-200">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still have questions banner */}
      <div className="mt-12 p-6 rounded-2xl bg-slate-100/80 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-full bg-[#0c1524] text-[#bbf451] flex items-center justify-center shrink-0">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Have a unique roof or specific technical question?</h4>
            <p className="text-xs text-slate-500">Speak directly with a licensed solar engineer—no aggressive sales pitches.</p>
          </div>
        </div>
        <button
          onClick={onOpenQuote}
          className="px-5 py-2.5 rounded-full bg-[#0c1524] hover:bg-slate-800 text-white text-xs font-bold shrink-0 flex items-center gap-2 transition"
        >
          <span>Ask An Expert</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#bbf451]" />
        </button>
      </div>

    </section>
  );
}
