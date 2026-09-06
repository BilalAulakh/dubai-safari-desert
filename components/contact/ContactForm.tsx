"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
      {submitted ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Message Received!</h3>
          <p className="text-sm text-slate-600 max-w-sm mx-auto">
            Thank you for contacting us. A member of our reservation team will reply shortly via WhatsApp or email.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Send an Online Inquiry</h3>
          <p className="text-xs text-slate-500">
            Fill out the form below and we will get back to you promptly.
          </p>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Michael Smith"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                WhatsApp / Phone *
              </label>
              <input
                type="tel"
                required
                placeholder="+971 50 000 0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Message / Tour Requirements *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Tell us your desired date, package preference, or group size..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Send Inquiry Message</span>
          </button>
        </form>
      )}
    </div>
  );
}
