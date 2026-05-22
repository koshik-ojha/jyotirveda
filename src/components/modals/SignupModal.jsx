"use client";
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiX, FiStar } from 'react-icons/fi';

const fieldShell =
  "bg-white/5 border border-white/10 rounded-xl h-12 text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:border-veda-orange/60 transition-colors";

const SignupModal = ({ open, onOpenChange, onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!agreed) {
      setError("Please agree to the Terms and Privacy Policy");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }
      onOpenChange(false);
      window.location.reload();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="p-0 overflow-hidden max-w-md border border-white/10 shadow-2xl rounded-2xl"
        style={{ background: "linear-gradient(160deg, #1A1B2F 0%, #0B0D17 60%)" }}
      >
        {/* Ambient glow orbs */}
        <div className="pointer-events-none absolute -top-10 -right-10 w-52 h-52 rounded-full blur-3xl" style={{ background: "rgba(168,85,247,0.12)" }} />
        <div className="pointer-events-none absolute -bottom-10 -left-10 w-44 h-44 rounded-full blur-3xl" style={{ background: "rgba(241,140,58,0.1)" }} />

        <div className="relative px-8 pt-8 pb-8">
          {/* Close */}
          <button onClick={() => onOpenChange(false)}
            className="absolute top-5 right-5 text-white/30 hover:text-white transition-colors rounded-full p-1.5 hover:bg-white/8">
            <FiX className="w-4 h-4" />
          </button>

          {/* Icon + Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 relative"
              style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(241,140,58,0.08))", border: "1px solid rgba(168,85,247,0.25)" }}>
              <div className="absolute inset-0 rounded-2xl blur-md" style={{ background: "rgba(168,85,247,0.15)" }} />
              <span className="relative text-2xl">✨</span>
            </div>
            <DialogTitle className="text-2xl font-serif text-white tracking-tight">Create Account</DialogTitle>
            <p className="text-sm text-white/40 mt-1.5">Begin your cosmic journey today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-[11px] font-bold text-white/40 uppercase tracking-widest mb-2">Full Name</label>
              <div className="relative">
                <FiUser className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 w-4 h-4" />
                <Input type="text" required value={form.name} onChange={update("name")} placeholder="Your Name" className={`pl-10 ${fieldShell}`} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] font-bold text-white/40 uppercase tracking-widest mb-2">Email</label>
              <div className="relative">
                <FiMail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 w-4 h-4" />
                <Input type="email" required value={form.email} onChange={update("email")} placeholder="you@example.com" className={`pl-10 ${fieldShell}`} />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-bold text-white/40 uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <FiLock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 w-4 h-4" />
                <Input type={showPassword ? 'text' : 'password'} required minLength={8} value={form.password} onChange={update("password")} placeholder="At least 8 characters" className={`pl-10 pr-11 ${fieldShell}`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2.5">
              <input type="checkbox" id="terms" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-4 h-4 mt-0.5 accent-veda-orange rounded shrink-0" />
              <label htmlFor="terms" className="text-sm text-white/40 select-none leading-snug cursor-pointer">
                I agree to the{' '}
                <a href="#" className="text-veda-orange hover:text-veda-gold transition-colors font-medium">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-veda-orange hover:text-veda-gold transition-colors font-medium">Privacy Policy</a>
              </label>
            </div>

            {error && (
              <p className="text-sm text-red-400/90 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <button type="submit" disabled={submitting} className="w-full h-12 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ background: "linear-gradient(135deg, #a855f7, #F18C3A)", boxShadow: "0 4px 24px rgba(168,85,247,0.3)" }}>
              {submitting ? "Creating account..." : "Create Account"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/8" />
              <FiStar className="w-3 h-3 text-white/15" />
              <div className="flex-1 h-px bg-white/8" />
            </div>

            {/* Switch */}
            <p className="text-center text-sm text-white/35">
              Already have an account?{' '}
              <button type="button" onClick={() => { onOpenChange(false); onSwitchToLogin?.(); }}
                className="text-veda-orange hover:text-veda-gold font-semibold transition-colors">
                Sign in
              </button>
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;
