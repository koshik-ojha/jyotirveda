"use client";
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FiMail, FiLock, FiEye, FiEyeOff, FiX, FiArrowLeft, FiKey, FiStar } from 'react-icons/fi';

const fieldShell =
  "bg-white/5 border border-white/10 rounded-xl h-12 text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:border-veda-orange/60 transition-colors";

const LoginModal = ({ open, onOpenChange, onSwitchToSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
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
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          showCloseButton={false}
          className="p-0 overflow-hidden max-w-md border border-white/10 shadow-2xl rounded-2xl"
          style={{ background: "linear-gradient(160deg, #1A1B2F 0%, #0B0D17 60%)" }}
        >
          {/* Ambient glow orbs */}
          <div className="pointer-events-none absolute -top-10 -right-10 w-52 h-52 rounded-full blur-3xl" style={{ background: "rgba(241,140,58,0.12)" }} />
          <div className="pointer-events-none absolute -bottom-10 -left-10 w-44 h-44 rounded-full blur-3xl" style={{ background: "rgba(168,85,247,0.1)" }} />

          <div className="relative px-8 pt-8 pb-8">
            {/* Close */}
            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-5 right-5 text-white/30 hover:text-white transition-colors rounded-full p-1.5 hover:bg-white/8"
            >
              <FiX className="w-4 h-4" />
            </button>

            {/* Icon + Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 relative"
                style={{ background: "linear-gradient(135deg, rgba(241,140,58,0.2), rgba(217,145,82,0.08))", border: "1px solid rgba(241,140,58,0.25)" }}>
                <div className="absolute inset-0 rounded-2xl blur-md" style={{ background: "rgba(241,140,58,0.15)" }} />
                <span className="relative text-2xl">🪐</span>
              </div>
              <DialogTitle className="text-2xl font-serif text-white tracking-tight">
                Welcome Back
              </DialogTitle>
              <p className="text-sm text-white/40 mt-1.5">Sign in to your JyotirVeda account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
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
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[11px] font-bold text-white/40 uppercase tracking-widest">Password</label>
                  <button type="button" onClick={() => { onOpenChange(false); setForgotOpen(true); }}
                    className="text-xs text-veda-orange hover:text-veda-gold transition-colors font-medium">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <FiLock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 w-4 h-4" />
                  <Input type={showPassword ? 'text' : 'password'} required value={form.password} onChange={update("password")} placeholder="••••••••" className={`pl-10 pr-11 ${fieldShell}`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                    {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2.5">
                <input type="checkbox" id="remember" className="w-4 h-4 accent-veda-orange rounded" />
                <label htmlFor="remember" className="text-sm text-white/40 select-none cursor-pointer">Remember me</label>
              </div>

              {error && (
                <p className="text-sm text-red-400/90 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button type="submit" disabled={submitting} className="w-full h-12 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ background: "linear-gradient(135deg, #F18C3A, #D99152)", boxShadow: "0 4px 24px rgba(241,140,58,0.35)" }}>
                {submitting ? "Signing in..." : "Sign In"}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/8" />
                <FiStar className="w-3 h-3 text-white/15" />
                <div className="flex-1 h-px bg-white/8" />
              </div>

              {/* Switch */}
              <p className="text-center text-sm text-white/35">
                New to JyotirVeda?{' '}
                <button type="button" onClick={() => { onOpenChange(false); onSwitchToSignup?.(); }}
                  className="text-veda-orange hover:text-veda-gold font-semibold transition-colors">
                  Create an account
                </button>
              </p>
            </form>
          </div>
        </DialogContent>
      </Dialog>

    <ForgotPasswordDialog
      open={forgotOpen}
      onOpenChange={setForgotOpen}
      onBackToLogin={() => onOpenChange(true)}
    />
    </>
  );
};

// ── Forgot Password Dialog ──────────────────────────────────────────────────
const ForgotPasswordDialog = ({ open, onOpenChange, onBackToLogin }) => {
  const [sent, setSent] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="p-0 overflow-hidden max-w-md border border-white/10 shadow-2xl rounded-2xl"
        style={{ background: "linear-gradient(160deg, #1A1B2F 0%, #0B0D17 60%)" }}
      >
        <div className="pointer-events-none absolute -top-10 -right-10 w-52 h-52 rounded-full blur-3xl" style={{ background: "rgba(217,145,82,0.1)" }} />
        <div className="pointer-events-none absolute -bottom-10 -left-10 w-44 h-44 rounded-full blur-3xl" style={{ background: "rgba(241,140,58,0.08)" }} />

        <div className="relative px-8 pt-8 pb-8">
          <button onClick={() => onOpenChange(false)}
            className="absolute top-5 right-5 text-white/30 hover:text-white transition-colors rounded-full p-1.5 hover:bg-white/8">
            <FiX className="w-4 h-4" />
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 relative"
              style={{ background: "linear-gradient(135deg, rgba(217,145,82,0.2), rgba(241,140,58,0.08))", border: "1px solid rgba(217,145,82,0.25)" }}>
              <div className="absolute inset-0 rounded-2xl blur-md" style={{ background: "rgba(217,145,82,0.15)" }} />
              <FiKey className="relative w-6 h-6 text-veda-gold" />
            </div>
            <DialogTitle className="text-2xl font-serif text-white tracking-tight">Reset Password</DialogTitle>
            <p className="text-sm text-white/40 mt-1.5">
              {sent ? 'Check your inbox for the reset link' : "We'll send a magic link to your email"}
            </p>
          </div>

          <div className="space-y-5">
            {!sent ? (
              <>
                <div>
                  <label className="block text-[11px] font-bold text-white/40 uppercase tracking-widest mb-2">Email Address</label>
                  <div className="relative">
                    <FiMail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 w-4 h-4" />
                    <Input type="email" placeholder="you@example.com" className={`pl-10 ${fieldShell}`} />
                  </div>
                </div>
                <button type="button" onClick={() => setSent(true)}
                  className="w-full h-12 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #D99152, #F18C3A)", boxShadow: "0 4px 24px rgba(217,145,82,0.35)" }}>
                  Send Reset Link
                </button>
              </>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="text-4xl mb-2">📩</div>
                <p className="text-sm text-white/50 leading-relaxed">
                  A password reset link has been sent. Check your spam folder if you don&apos;t see it.
                </p>
              </div>
            )}
            <button type="button" onClick={() => { setSent(false); onOpenChange(false); onBackToLogin?.(); }}
              className="w-full flex items-center justify-center gap-2 text-sm text-white/35 hover:text-veda-orange transition-colors pt-1">
              <FiArrowLeft className="w-4 h-4" /> Back to Sign In
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
