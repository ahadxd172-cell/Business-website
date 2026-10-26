import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, Eye, EyeOff, Sparkles, Key } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const [email, setEmail] = useState('admin@sunvolt.com');
  const [password, setPassword] = useState('Admin@Sunvolt2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Authentication failed. Please check your credentials.');
      }

      // Store auth session
      localStorage.setItem('sunvolt_admin_token', data.token);
      localStorage.setItem('sunvolt_admin_user', JSON.stringify(data.admin));

      onLoginSuccess(data.token, data.admin);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@sunvolt.com');
    setPassword('Admin@Sunvolt2026!');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#070c16] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden selection:bg-[#bbf451] selection:text-[#0c1524]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#bbf451]/10 via-emerald-500/10 to-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#bbf451]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Back to Site link at top */}
      <div className="w-full max-w-md flex justify-between items-center mb-6 z-10">
        <button
          onClick={onBackToSite}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition cursor-pointer"
        >
          ← Return to Website
        </button>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>MongoDB Atlas Connected</span>
        </div>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#0f192b]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/60 relative z-10">
        {/* Header / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#bbf451] to-emerald-400 text-[#0c1524] font-black text-2xl shadow-lg shadow-[#bbf451]/25 mb-4">
            ⚡
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Sun<span className="text-[#bbf451]">volt</span> Admin Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
            Sign in with your admin credentials to manage content & leads
          </p>
        </div>

        {/* Credentials Notice Box for user */}
        <div className="mb-6 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs">
          <div className="flex items-center justify-between text-slate-300 font-semibold mb-1.5">
            <span className="flex items-center gap-1 text-[#bbf451]">
              <Key className="w-3.5 h-3.5" /> Your Admin Credentials:
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] text-[#bbf451] hover:underline cursor-pointer"
            >
              Auto-Fill
            </button>
          </div>
          <div className="space-y-0.5 text-slate-400 font-mono text-[11px]">
            <div>Email: <strong className="text-white">admin@sunvolt.com</strong></div>
            <div>Password: <strong className="text-white">Admin@Sunvolt2026!</strong></div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-start gap-2 animate-shake">
            <span className="text-sm font-bold">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sunvolt.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#bbf451] focus:ring-1 focus:ring-[#bbf451] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-11 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#bbf451] focus:ring-1 focus:ring-[#bbf451] transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#bbf451] hover:bg-[#a8e635] text-[#0c1524] font-bold text-sm shadow-lg shadow-[#bbf451]/20 hover:shadow-[#bbf451]/30 transition transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-[#0c1524] border-t-transparent rounded-full animate-spin" />
                <span>Verifying Access...</span>
              </>
            ) : (
              <>
                <span>Access Admin Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Secured with JWT & bcrypt password encryption</span>
        </div>
      </div>
    </div>
  );
}
