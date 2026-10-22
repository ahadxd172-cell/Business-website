import React from 'react';
import { Compass, FileCheck2, Wrench, Zap, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "3D Satellite Roof Audit",
    description: "Using advanced LiDAR aerial imaging, we map sun exposure, roof angles, and shade patterns to design your optimal solar footprint in 15 minutes.",
    icon: Compass,
    highlight: "100% Virtual & Free"
  },
  {
    number: "02",
    title: "Engineering & Permitting",
    description: "Our licensed in-house electrical engineers draft blueprint schematics and file all city permits and utility interconnection paperwork on your behalf.",
    icon: FileCheck2,
    highlight: "Zero Hassle for You"
  },
  {
    number: "03",
    title: "Clean 1-Day Installation",
    description: "Our certified technicians mount high-efficiency panels, install smart microinverters, and route concealed wiring in a single clean workday.",
    icon: Wrench,
    highlight: "Certified Technicians"
  },
  {
    number: "04",
    title: "Power On & Live Monitoring",
    description: "Your local utility grants Permission to Operate (PTO). We flip the switch and you start generating clean energy, tracked live from our mobile app.",
    icon: Zap,
    highlight: "Instant Savings"
  }
];

export default function ProcessSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-xs font-bold text-slate-800 mb-4">
          <span>Seamless Journey</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          How Going Solar Works
        </h2>
        <p className="text-slate-600 text-base sm:text-lg">
          We handle every detail from city permits to panel mounting so you can enjoy worry-free energy independence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className="group relative bg-white rounded-[2rem] p-7 border border-slate-200/80 shadow-card-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-800 group-hover:bg-[#bbf451] group-hover:text-[#0c1524] transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black font-mono text-slate-300 group-hover:text-[#bbf451] transition-colors">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-600">
                <CheckCircle2 className="w-4 h-4 text-[#bbf451] shrink-0" />
                <span>{step.highlight}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
