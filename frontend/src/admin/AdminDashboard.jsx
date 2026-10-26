import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  FileText,
  Sliders,
  Settings,
  LogOut,
  ExternalLink,
  Save,
  Trash2,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Clock,
  Sparkles,
  RefreshCw,
  Search,
  Filter,
  Image as ImageIcon,
  Key,
  ShieldAlert,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { API_BASE } from '../config/api';

const HERO_PRESETS = [
  {
    name: 'Solar Tech on Rooftop',
    url: 'https://images.unsplash.com/photo-1508873696983-2df570464756?auto=format&fit=crop&w=2000&q=85'
  },
  {
    name: 'Modern Home Solar Panels',
    url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=2000&q=85'
  },
  {
    name: 'Commercial Solar Array',
    url: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=2000&q=85'
  },
  {
    name: 'Clean Blue Panel Field',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2000&q=85'
  }
];

export default function AdminDashboard({ token, adminUser, onLogout, onBackToSite }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'content' | 'quotes' | 'settings'

  // Quotes / Leads State
  const [quotes, setQuotes] = useState([]);
  const [quotesLoading, setQuotesLoading] = useState(false);
  const [quoteFilter, setQuoteFilter] = useState('all');
  const [quoteSearch, setQuoteSearch] = useState('');
  const [selectedQuote, setSelectedQuote] = useState(null);

  // Site Configuration State
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
    email: "hello@sunvolt-energy.com",
    address: "1200 Solar Way, Suite 400, Austin, TX 78701",
    statYears: "15+",
    statInstalls: "12,500+",
    statCleanEnergy: "500M+ kWh",
    ctaHeadline: "Ready to Power Your Home With Clean Solar Energy?",
    ctaSubhead: "Join over 12,500 property owners saving up to $1,800/yr on electric utility bills."
  });
  const [configLoading, setConfigLoading] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Admin Profile Update State
  const [profileForm, setProfileForm] = useState({
    name: adminUser?.name || 'Sunvolt Super Admin',
    email: adminUser?.email || 'admin@sunvolt.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [profileMsg, setProfileMsg] = useState({ type: '', text: '' });
  const [profileLoading, setProfileLoading] = useState(false);

  // Fetch initial data
  useEffect(() => {
    fetchConfig();
    fetchQuotes();
  }, []);

  const fetchConfig = async () => {
    try {
      setConfigLoading(true);
      const res = await fetch(`${API_BASE}/config`);
      const data = await res.json();
      if (data.success && data.data) {
        setConfig(prev => ({ ...prev, ...data.data }));
      }
    } catch (err) {
      console.error('Failed to load config:', err);
    } finally {
      setConfigLoading(false);
    }
  };

  const fetchQuotes = async () => {
    try {
      setQuotesLoading(true);
      const res = await fetch(`${API_BASE}/quotes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setQuotes(data.data);
      }
    } catch (err) {
      console.error('Failed to load quotes:', err);
    } finally {
      setQuotesLoading(false);
    }
  };

  const handleSaveConfig = async (e) => {
    e.preventDefault();
    setConfigLoading(true);
    setSaveSuccessMsg('');

    try {
      const res = await fetch(`${API_BASE}/config`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(config)
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to update website content.');
      }

      setSaveSuccessMsg('✅ Changes saved to MongoDB! Live website updated.');
      // Notify other tabs/windows if open
      window.dispatchEvent(new CustomEvent('sunvolt_config_updated', { detail: config }));
      setTimeout(() => setSaveSuccessMsg(''), 4500);
    } catch (err) {
      alert(`Error saving: ${err.message}`);
    } finally {
      setConfigLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/quotes/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setQuotes(prev => prev.map(q => q._id === id ? { ...q, status: newStatus } : q));
      }
    } catch (err) {
      console.error('Error changing quote status:', err);
    }
  };

  const handleDeleteQuote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this quote lead permanently?')) return;

    try {
      const res = await fetch(`${API_BASE}/quotes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setQuotes(prev => prev.filter(q => q._id !== id));
        if (selectedQuote?._id === id) setSelectedQuote(null);
      }
    } catch (err) {
      console.error('Error deleting quote:', err);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileMsg({ type: '', text: '' });

    if (profileForm.newPassword && profileForm.newPassword !== profileForm.confirmPassword) {
      setProfileMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    setProfileLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/update-credentials`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: profileForm.name,
          email: profileForm.email,
          currentPassword: profileForm.currentPassword,
          newPassword: profileForm.newPassword || undefined
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to update credentials.');
      }

      setProfileMsg({ type: 'success', text: 'Admin credentials updated successfully!' });
      setProfileForm(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    } catch (err) {
      setProfileMsg({ type: 'error', text: err.message });
    } finally {
      setProfileLoading(false);
    }
  };

  // Filtered quotes
  const filteredQuotes = quotes.filter(q => {
    const matchesFilter = quoteFilter === 'all' || q.status === quoteFilter;
    const matchesSearch = !quoteSearch ||
      q.name?.toLowerCase().includes(quoteSearch.toLowerCase()) ||
      q.email?.toLowerCase().includes(quoteSearch.toLowerCase()) ||
      q.phone?.includes(quoteSearch) ||
      q.zip?.includes(quoteSearch);
    return matchesFilter && matchesSearch;
  });

  const newQuotesCount = quotes.filter(q => q.status === 'new').length;

  return (
    <div className="min-h-screen bg-[#070c16] text-slate-100 flex flex-col selection:bg-[#bbf451] selection:text-[#0c1524]">
      {/* Top Navbar */}
      <header className="h-16 bg-[#0c1524]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#bbf451] to-emerald-400 text-[#0c1524] font-black flex items-center justify-center text-lg shadow-md shadow-[#bbf451]/20">
            ⚡
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              Sun<span className="text-[#bbf451]">volt</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-[#bbf451]/20 text-[#bbf451]">
                Admin
              </span>
            </div>
            <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>MongoDB Atlas Connected</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onBackToSite}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer border border-white/10"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#bbf451]" />
          </button>

          <div className="h-6 w-px bg-white/10 hidden sm:block"></div>

          <div className="hidden sm:flex items-center gap-2 text-xs">
            <div className="w-7 h-7 rounded-full bg-slate-800 border border-white/20 flex items-center justify-center font-bold text-[#bbf451] text-xs">
              {(adminUser?.name || 'A')[0].toUpperCase()}
            </div>
            <div className="text-left">
              <div className="font-semibold text-white leading-tight">{adminUser?.name || 'Admin'}</div>
              <div className="text-[10px] text-slate-400 leading-tight">{adminUser?.email || 'admin@sunvolt.com'}</div>
            </div>
          </div>

          <button
            onClick={onLogout}
            title="Log out"
            className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition cursor-pointer border border-white/10"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-[#09101d] border-b md:border-b-0 md:border-r border-white/10 p-3 sm:p-4 shrink-0 flex md:flex-col justify-between">
          <div className="space-y-1 w-full flex md:flex-col gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap w-full text-left ${
                activeTab === 'overview'
                  ? 'bg-[#bbf451] text-[#0c1524] shadow-md shadow-[#bbf451]/20 font-bold'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('content')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap w-full text-left ${
                activeTab === 'content'
                  ? 'bg-[#bbf451] text-[#0c1524] shadow-md shadow-[#bbf451]/20 font-bold'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Sliders className="w-4 h-4 shrink-0" />
              <span>Website Content CMS</span>
            </button>

            <button
              onClick={() => setActiveTab('quotes')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap w-full text-left ${
                activeTab === 'quotes'
                  ? 'bg-[#bbf451] text-[#0c1524] shadow-md shadow-[#bbf451]/20 font-bold'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 shrink-0" />
                <span>Quote Leads</span>
              </div>
              {newQuotesCount > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === 'quotes' ? 'bg-[#0c1524] text-[#bbf451]' : 'bg-[#bbf451] text-[#0c1524]'
                }`}>
                  {newQuotesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap w-full text-left ${
                activeTab === 'settings'
                  ? 'bg-[#bbf451] text-[#0c1524] shadow-md shadow-[#bbf451]/20 font-bold'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4 shrink-0" />
              <span>Admin Profile & Security</span>
            </button>
          </div>

          {/* Quick Info Box in Sidebar */}
          <div className="hidden md:block p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs mt-6">
            <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#bbf451]" />
              <span>Live Sync Mode</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Edits made here update MongoDB Atlas immediately. Frontend reflects changes live.
            </p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Welcome back, {adminUser?.name || 'Admin'}! 👋
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Manage your website content, review solar quote requests, and keep track of incoming client inquiries.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#0c1524] border border-white/10 shadow-lg">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
                    <span>Total Quote Leads</span>
                    <FileText className="w-4 h-4 text-[#bbf451]" />
                  </div>
                  <div className="text-3xl font-black text-white">{quotes.length}</div>
                  <div className="text-[11px] text-slate-400 mt-2">Saved directly in MongoDB</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0c1524] border border-white/10 shadow-lg">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
                    <span>New / Uncontacted</span>
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-3xl font-black text-amber-400">{newQuotesCount}</div>
                  <div className="text-[11px] text-slate-400 mt-2">Awaiting solar consultation</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0c1524] border border-white/10 shadow-lg">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
                    <span>MongoDB Atlas</span>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-lg font-bold text-emerald-400">Cluster0 ACTIVE</div>
                  <div className="text-[11px] text-slate-400 mt-2 font-mono">DB: sunvolt</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0c1524] border border-white/10 shadow-lg">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
                    <span>Current Hero Status</span>
                    <Sparkles className="w-4 h-4 text-[#bbf451]" />
                  </div>
                  <div className="text-sm font-semibold text-white truncate">{config.heroTitle}</div>
                  <div className="text-[11px] text-[#bbf451] mt-2 italic truncate">{config.heroTitleItalic}</div>
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hero Preview Card */}
                <div className="p-6 rounded-2xl bg-[#0c1524] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#bbf451]" />
                      Current Hero Banner Preview
                    </h3>
                    <button
                      onClick={() => setActiveTab('content')}
                      className="text-xs text-[#bbf451] hover:underline cursor-pointer"
                    >
                      Edit Content →
                    </button>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden h-48 border border-white/10">
                    <img
                      src={config.heroImage}
                      alt="Hero preview"
                      className="w-full h-full object-cover brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-end">
                      <div className="inline-block px-2 py-0.5 rounded bg-black/60 text-[#bbf451] text-[10px] font-bold w-max mb-1">
                        ⭐ {config.rating} • {config.reviewsCount}
                      </div>
                      <div className="text-base font-bold text-white leading-tight">
                        {config.heroTitle} <span className="italic text-[#bbf451]">{config.heroTitleItalic}</span>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-1 mt-1">
                        {config.heroDescription}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recent Leads Preview */}
                <div className="p-6 rounded-2xl bg-[#0c1524] border border-white/10 space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#bbf451]" />
                        Recent Quote Inquiries
                      </h3>
                      <button
                        onClick={() => setActiveTab('quotes')}
                        className="text-xs text-[#bbf451] hover:underline cursor-pointer"
                      >
                        View All ({quotes.length}) →
                      </button>
                    </div>

                    {quotes.length === 0 ? (
                      <div className="text-center py-8 text-xs text-slate-500">
                        No customer quotes received yet. When visitors fill the "Get Free Quote" form, they will appear here in real-time.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {quotes.slice(0, 3).map(q => (
                          <div key={q._id} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                            <div>
                              <div className="font-semibold text-white">{q.name}</div>
                              <div className="text-[11px] text-slate-400">{q.email} • {q.phone}</div>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              q.status === 'new' ? 'bg-amber-500/20 text-amber-300' :
                              q.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300' :
                              'bg-blue-500/20 text-blue-300'
                            }`}>
                              {q.status || 'new'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Need to check the frontend?</span>
                    <button
                      onClick={onBackToSite}
                      className="px-3 py-1.5 rounded-xl bg-[#bbf451] text-[#0c1524] text-xs font-bold hover:bg-[#a8e635] transition cursor-pointer"
                    >
                      Open Live Site ↗
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONTENT CMS */}
          {activeTab === 'content' && (
            <div className="max-w-4xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Website Content Manager (CMS)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Edit texts, headlines, hero image, and contact details. Click "Save Changes" to publish live to the frontend.
                  </p>
                </div>
                <button
                  onClick={handleSaveConfig}
                  disabled={configLoading}
                  className="px-5 py-2.5 rounded-xl bg-[#bbf451] hover:bg-[#a8e635] text-[#0c1524] font-extrabold text-xs shadow-lg shadow-[#bbf451]/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{configLoading ? 'Saving to MongoDB...' : 'Save Changes to Website'}</span>
                </button>
              </div>

              {saveSuccessMsg && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-bounce">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}

              <form onSubmit={handleSaveConfig} className="space-y-6">
                {/* Section 1: Hero Banner */}
                <div className="p-6 rounded-2xl bg-[#0c1524] border border-white/10 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-white/10">
                    <Sparkles className="w-4 h-4 text-[#bbf451]" />
                    Hero Section Headline & Content
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Main Title (Bold)
                      </label>
                      <input
                        type="text"
                        value={config.heroTitle}
                        onChange={(e) => setConfig({ ...config, heroTitle: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#bbf451]"
                        placeholder="Smart Solar Solutions for"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Italic Accent Title (Underlined)
                      </label>
                      <input
                        type="text"
                        value={config.heroTitleItalic}
                        onChange={(e) => setConfig({ ...config, heroTitleItalic: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#bbf451]"
                        placeholder="Homes & Businesses"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Hero Description / Subtitle
                    </label>
                    <textarea
                      rows={3}
                      value={config.heroDescription}
                      onChange={(e) => setConfig({ ...config, heroDescription: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#bbf451]"
                      placeholder="Sunvolt delivers solar installation..."
                    />
                  </div>

                  {/* Hero Background Image */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Hero Background Image URL
                    </label>
                    <input
                      type="url"
                      value={config.heroImage}
                      onChange={(e) => setConfig({ ...config, heroImage: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#bbf451] mb-2"
                      placeholder="https://..."
                    />

                    {/* Presets */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] text-slate-400">Quick presets:</span>
                      {HERO_PRESETS.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setConfig({ ...config, heroImage: p.url })}
                          className={`text-[10px] px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                            config.heroImage === p.url
                              ? 'bg-[#bbf451] text-[#0c1524] font-bold border-[#bbf451]'
                              : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                          }`}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Star Rating Badge */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Reviews Star Rating
                      </label>
                      <input
                        type="text"
                        value={config.rating}
                        onChange={(e) => setConfig({ ...config, rating: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#bbf451]"
                        placeholder="5.0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Reviews Count Badge Text
                      </label>
                      <input
                        type="text"
                        value={config.reviewsCount}
                        onChange={(e) => setConfig({ ...config, reviewsCount: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#bbf451]"
                        placeholder="100+ Reviews"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Top Announcement Bar */}
                <div className="p-6 rounded-2xl bg-[#0c1524] border border-white/10 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-white/10">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    Top Announcement / Incentive Bar
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Banner Message
                      </label>
                      <input
                        type="text"
                        value={config.announcement}
                        onChange={(e) => setConfig({ ...config, announcement: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#bbf451]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Action Link Text
                      </label>
                      <input
                        type="text"
                        value={config.announcementLink}
                        onChange={(e) => setConfig({ ...config, announcementLink: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#bbf451]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Contact & Business Information */}
                <div className="p-6 rounded-2xl bg-[#0c1524] border border-white/10 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-white/10">
                    <Phone className="w-4 h-4 text-[#bbf451]" />
                    Business Contact Info & Headquarters
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Toll-Free Phone
                      </label>
                      <input
                        type="text"
                        value={config.phone}
                        onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#bbf451]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Support Email
                      </label>
                      <input
                        type="email"
                        value={config.email}
                        onChange={(e) => setConfig({ ...config, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#bbf451]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Office Location
                      </label>
                      <input
                        type="text"
                        value={config.address}
                        onChange={(e) => setConfig({ ...config, address: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#bbf451]"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={configLoading}
                    className="px-6 py-3 rounded-xl bg-[#bbf451] hover:bg-[#a8e635] text-[#0c1524] font-extrabold text-xs shadow-lg shadow-[#bbf451]/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{configLoading ? 'Saving...' : 'Save & Publish Live'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: QUOTE LEADS */}
          {activeTab === 'quotes' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Customer Quotes & Leads
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Live client inquiries received through the website free quote modal & calculator.
                  </p>
                </div>

                <button
                  onClick={fetchQuotes}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${quotesLoading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={quoteSearch}
                    onChange={(e) => setQuoteSearch(e.target.value)}
                    placeholder="Search by customer name, email, phone, zip..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c1524] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#bbf451]"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {['all', 'new', 'contacted', 'scheduled', 'completed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setQuoteFilter(status)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition cursor-pointer shrink-0 ${
                        quoteFilter === status
                          ? 'bg-[#bbf451] text-[#0c1524] font-bold'
                          : 'bg-[#0c1524] border border-white/10 text-slate-300 hover:text-white'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quotes Table */}
              <div className="rounded-2xl bg-[#0c1524] border border-white/10 overflow-hidden shadow-xl">
                {filteredQuotes.length === 0 ? (
                  <div className="text-center py-16 px-4">
                    <FileText className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                    <h3 className="text-sm font-semibold text-white">No quotes found</h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                      {quoteSearch ? 'Try clearing your search query.' : 'Customer quote submissions will appear here automatically from MongoDB.'}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-900/80 border-b border-white/10 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                        <tr>
                          <th className="py-3 px-4">Date</th>
                          <th className="py-3 px-4">Customer</th>
                          <th className="py-3 px-4">Property / Roof</th>
                          <th className="py-3 px-4">Monthly Bill</th>
                          <th className="py-3 px-4">Plan / Size</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredQuotes.map((q) => (
                          <tr key={q._id} className="hover:bg-white/[0.02] transition">
                            <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                              {q.createdAt ? new Date(q.createdAt).toLocaleDateString() : 'Recent'}
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="font-bold text-white">{q.name}</div>
                              <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                                <a href={`mailto:${q.email}`} className="hover:text-[#bbf451]">{q.email}</a>
                                <span>•</span>
                                <a href={`tel:${q.phone}`} className="hover:text-[#bbf451]">{q.phone}</a>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap text-slate-300">
                              <div className="capitalize">{q.propertyType || 'Residential'}</div>
                              <div className="text-[11px] text-slate-500 capitalize">{q.roofType || 'Shingle'} Roof • ZIP {q.zip}</div>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap font-semibold text-[#bbf451]">
                              {q.bill || '$240/mo'}
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap text-slate-300">
                              <div>{q.plan || 'Standard'}</div>
                              <div className="text-[11px] text-slate-500">{q.systemSize || 'Est. 8.4 kW'}</div>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <select
                                value={q.status || 'new'}
                                onChange={(e) => handleStatusChange(q._id, e.target.value)}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase border focus:outline-none cursor-pointer ${
                                  q.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                                  q.status === 'scheduled' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
                                  q.status === 'contacted' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                                  'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                }`}
                              >
                                <option value="new" className="bg-slate-900 text-white">NEW</option>
                                <option value="contacted" className="bg-slate-900 text-white">CONTACTED</option>
                                <option value="scheduled" className="bg-slate-900 text-white">SCHEDULED</option>
                                <option value="completed" className="bg-slate-900 text-white">COMPLETED</option>
                              </select>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap text-right">
                              <div className="flex items-center justify-end gap-2">
                                <a
                                  href={`tel:${q.phone}`}
                                  title="Call Customer"
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 transition"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                </a>
                                <a
                                  href={`mailto:${q.email}?subject=Your%20Sunvolt%20Solar%20Quote`}
                                  title="Email Customer"
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 transition"
                                >
                                  <Mail className="w-3.5 h-3.5" />
                                </a>
                                <button
                                  onClick={() => handleDeleteQuote(q._id)}
                                  title="Delete lead"
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: SETTINGS & SECURITY */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Admin Profile & Security
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Change your login email or password. These credentials are saved securely in your backend.
                </p>
              </div>

              {/* Status Notice */}
              {profileMsg.text && (
                <div className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                  profileMsg.type === 'error'
                    ? 'bg-rose-500/10 border border-rose-500/20 text-rose-300'
                    : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
                }`}>
                  {profileMsg.type === 'error' ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle className="w-4 h-4 shrink-0" />}
                  <span>{profileMsg.text}</span>
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className="p-6 rounded-2xl bg-[#0c1524] border border-white/10 space-y-5">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-white/10">
                  <Key className="w-4 h-4 text-[#bbf451]" />
                  Update Login Credentials
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Admin Display Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#bbf451]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Admin Email Address
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#bbf451]"
                  />
                </div>

                <div className="pt-2 border-t border-white/10">
                  <div className="text-xs font-bold text-white mb-3">Change Password (Optional)</div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Current Password (Required to set a new password)
                      </label>
                      <input
                        type="password"
                        value={profileForm.currentPassword}
                        onChange={(e) => setProfileForm({ ...profileForm, currentPassword: e.target.value })}
                        placeholder="••••••••••••"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#bbf451]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={profileForm.newPassword}
                          onChange={(e) => setProfileForm({ ...profileForm, newPassword: e.target.value })}
                          placeholder="New secure password"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#bbf451]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={profileForm.confirmPassword}
                          onChange={(e) => setProfileForm({ ...profileForm, confirmPassword: e.target.value })}
                          placeholder="Repeat new password"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#bbf451]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="submit"
                    disabled={profileLoading}
                    className="px-5 py-2.5 rounded-xl bg-[#bbf451] hover:bg-[#a8e635] text-[#0c1524] font-extrabold text-xs shadow-md shadow-[#bbf451]/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{profileLoading ? 'Updating...' : 'Update Credentials'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
