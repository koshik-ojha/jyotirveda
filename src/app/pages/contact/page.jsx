"use client";

import { useState } from "react";
import {
  FiMail, FiPhone, FiSend, FiMessageCircle,
  FiHelpCircle, FiBookOpen, FiTwitter, FiInstagram, FiFacebook, FiYoutube, FiCheckCircle,
} from "react-icons/fi";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const CONTACTS = [
  { icon: FiMail,  label: "Email",  value: "hello@jyotirveda.com", sub: "We reply within 24 hours" },
  { icon: FiPhone, label: "Phone",  value: "+91 80-4567-8910",     sub: "Mon – Sat, 9 AM to 7 PM IST" },
];

const HELP_LINKS = [
  { icon: FiBookOpen,    title: "Reading Guides",     desc: "How to interpret your Kundli, Rashifal and reports.",         href: "#" },
  { icon: FiHelpCircle,  title: "FAQ",                desc: "Common questions on birth time, accuracy and privacy.",      href: "#" },
  { icon: FiMessageCircle, title: "Discussion Forum", desc: "Community Q&A — astrologers and seekers in one room.",        href: "/lal-kitab-discussion" },
];

const SOCIAL = [
  { icon: FiTwitter,  name: "Twitter / X", href: "#" },
  { icon: FiInstagram, name: "Instagram",  href: "#" },
  { icon: FiFacebook, name: "Facebook",   href: "/lal-kitab-facebook" },
  { icon: FiYoutube,  name: "YouTube",    href: "#" },
];

export default function ContactPage() {
  const [subject, setSubject] = useState("");

  return (
    <>
      <Navbar />
      <main className="cosmic-bg min-h-screen text-white">
        <section className="relative stars-bg pt-20 pb-16 px-6 ">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-veda-orange/10 blur-3xl animate-pulse-glow -z-10" />
          <div className="relative max-w-5xl mx-auto text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-veda-orange mb-5 px-4 py-1.5 rounded-full bg-veda-orange/10 border border-veda-orange/20">
              We&apos;re Listening
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-gradient-gold mb-6 leading-tight">
              Get in Touch
            </h1>
            <p className="text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
              Questions about a reading? Found a bug? Want to write for us? Send a message — every email lands in a human inbox, and we reply within a day.
            </p>
          </div>
        </section>

        <section className="px-6 pb-16 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CONTACTS.map((c) => (
              <div key={c.label} className="glass border border-white/10 rounded-2xl p-7 flex items-start gap-5">
                <div className="w-11 h-11 rounded-xl bg-veda-orange/15 border border-veda-orange/20 text-veda-orange flex items-center justify-center shrink-0">
                  <c.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{c.label}</p>
                  <p className="font-serif text-lg text-white mb-1">{c.value}</p>
                  <p className="text-xs text-veda-gold/70">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 pb-20 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-veda-orange/15 border border-veda-orange/20 text-veda-orange flex items-center justify-center">
                  <FiSend className="w-4 h-4" />
                </div>
                <h2 className="font-serif text-xl text-white">Send a Message</h2>
              </div>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white/50 uppercase tracking-wide">Full Name</label>
                  <Input placeholder="Your name" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white/50 uppercase tracking-wide">Email</label>
                  <Input type="email" placeholder="you@example.com" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-white/50 uppercase tracking-wide">Phone (optional)</label>
                  <Input type="tel" placeholder="+91" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-white/50 uppercase tracking-wide">What&apos;s this about?</label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Question</SelectItem>
                      <SelectItem value="reading">Reading Help / Interpretation</SelectItem>
                      <SelectItem value="bug">Bug Report</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="business">Business / Partnership</SelectItem>
                      <SelectItem value="press">Press / Media</SelectItem>
                      <SelectItem value="other">Something Else</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-white/50 uppercase tracking-wide">Message</label>
                  <Textarea placeholder="Tell us a little..." rows={5} />
                </div>
                <div className="md:col-span-2 flex items-center justify-between flex-wrap gap-3 mt-2">
                  <p className="text-xs text-white/40">
                    We read every message — typical reply within 24 hours.
                  </p>
                  <Button variant="primary-fill" size="md" type="submit" className="rounded-xl px-8">
                    <FiSend className="w-4 h-4" />
                    Send Message
                  </Button>
                </div>
              </form>
            </div>

            <div className="space-y-4">
              <div className="glass border border-white/10 rounded-2xl p-7">
                <div className="flex items-center gap-3 mb-5">
                  <FiCheckCircle className="w-5 h-5 text-veda-orange" />
                  <h3 className="font-serif text-lg text-white">What to Expect</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    { title: "24-hour reply", desc: "Every email gets a human response within one business day." },
                    { title: "No bots", desc: "Your message lands in a real inbox, not a ticketing queue." },
                    { title: "Confidential", desc: "Birth details and personal data are never shared with third parties." },
                  ].map((item) => (
                    <li key={item.title} className="flex gap-3">
                      <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-veda-orange shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="text-xs text-white/45 leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass border border-white/10 rounded-2xl p-7">
                <h3 className="font-serif text-lg text-white mb-4">Follow Us</h3>
                <div className="grid grid-cols-2 gap-2">
                  {SOCIAL.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-white/10 text-sm text-white/70 hover:border-veda-orange/40 hover:text-veda-orange transition-colors"
                    >
                      <s.icon className="w-4 h-4" />
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">Before You Write — Quick Help</h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Many questions are answered faster in our guides than over email.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {HELP_LINKS.map((l) => (
              <a key={l.title} href={l.href} className="glass border border-white/10 rounded-2xl p-6 hover:border-veda-orange/40 transition-colors group">
                <div className="w-11 h-11 rounded-xl bg-veda-orange/15 border border-veda-orange/20 text-veda-orange flex items-center justify-center mb-4">
                  <l.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-white mb-2 group-hover:text-veda-orange transition-colors">{l.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{l.desc}</p>
              </a>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
