import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, MapPin, Zap } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Small Business Solar Setup",
    category: "commercial",
    location: "Phoenix, Arizona",
    capacity: "18 kW System",
    description: "18kW installation for a retail building with high daytime energy usage. Reduced daytime operating costs by 82%.",
    image: "https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=800&q=80",
    savings: "$680/mo saved"
  },
  {
    id: 2,
    title: "Ground-Mount Solar Array",
    category: "ground-mount",
    location: "Nevada, USA",
    capacity: "45 kW Array",
    description: "Designed for properties with wide open land and strong sunlight. Heavy-duty tracking mounts optimized for seasonal sun angles.",
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=80",
    savings: "$1,450/mo saved"
  },
  {
    id: 3,
    title: "Modern Suburban Home",
    category: "residential",
    location: "Austin, Texas",
    capacity: "11.4 kW Rooftop",
    description: "Low-profile aesthetic all-black monocrystalline panels with dual battery backup. Fully covers 100% of household cooling needs.",
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80",
    savings: "$310/mo saved"
  },
  {
    id: 4,
    title: "Eco Distribution Facility",
    category: "commercial",
    location: "Denver, Colorado",
    capacity: "85 kW Flat-Roof",
    description: "Commercial flat-roof ballast racking system installed with zero roof penetrations, generating 120,000 kWh clean power annually.",
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    savings: "$3,200/mo saved"
  }
];

export default function ProjectsSection({ onOpenQuote }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header matching Dribbble text */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-800 mb-3">
            <span>Our Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Recent Installations
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            We've helped homeowners and businesses cut their energy bills with reliable solar systems. Here are a few of our recent installations.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-full border border-slate-200 text-xs font-bold">
          {['all', 'residential', 'commercial', 'ground-mount'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full capitalize transition-all ${
                activeFilter === cat
                  ? 'bg-slate-900 text-[#bbf451] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat === 'all' ? 'All Installations' : cat.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid matching Dribbble cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-200/90 shadow-card-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Container with aspect ratio */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
              
              {/* Floating Capacity Badge */}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#0c1524]/80 backdrop-blur-md border border-white/15 text-xs font-bold text-[#bbf451] flex items-center gap-1.5 shadow-md">
                <Zap className="w-3 h-3 fill-[#bbf451]" />
                <span>{project.capacity}</span>
              </div>

              {/* Savings pill */}
              <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-emerald-500/90 backdrop-blur-md text-white text-xs font-bold shadow">
                {project.savings}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{project.location}</span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-slate-800 mb-3">
                  {project.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Green Circle Arrow Link matching Dribbble */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">
                  Explore Case Study
                </span>
                <button
                  onClick={() => onOpenQuote({ project: project.title })}
                  className="w-10 h-10 rounded-full bg-[#bbf451] group-hover:bg-[#a6e236] text-[#0c1524] flex items-center justify-center shadow-md shadow-[#bbf451]/30 group-hover:scale-110 transition-all"
                  aria-label={`View ${project.title}`}
                >
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Projects Button matching Dribbble */}
      <div className="mt-12 text-center">
        <button
          onClick={() => onOpenQuote({ inquiry: 'Complete Portfolio & Case Studies' })}
          className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-lg shadow-slate-900/20 hover:scale-105 active:scale-95 transition-all"
        >
          <span>View All Projects</span>
          <div className="w-6 h-6 rounded-full bg-[#bbf451] text-[#0c1524] flex items-center justify-center">
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        </button>
      </div>

    </section>
  );
}
