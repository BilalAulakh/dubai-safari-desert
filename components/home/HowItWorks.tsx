import { Compass, Calendar, Send, MessageCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: Compass,
      title: "Choose Your Safari",
      description: "Browse our evening, morning, overnight, or private VIP packages to find your ideal desert experience.",
    },
    {
      step: "02",
      icon: Calendar,
      title: "Select Date & Guests",
      description: "Pick your travel date, guest count, and your Dubai hotel or residence pickup location.",
    },
    {
      step: "03",
      icon: Send,
      title: "Submit Booking Request",
      description: "Submit your request in seconds with zero advance card requirements. You receive an instant reference code.",
    },
    {
      step: "04",
      icon: MessageCircle,
      title: "Confirm With Our Team",
      description: "Our safari coordinator contacts you on WhatsApp or phone to confirm timings and details.",
    },
  ];

  return (
    <section className="py-20 bg-[#F8F5EE] border-y border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
            Simple & Transparent
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            How It Works
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Reserve your Dubai desert adventure smoothly without complex payment gateways or hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative bg-white p-6 rounded-2xl border border-amber-900/10 shadow-sm flex flex-col items-center text-center"
              >
                {/* Step Number Badge */}
                <div className="absolute -top-3.5 left-6 px-2.5 py-0.5 rounded-full bg-slate-900 text-amber-400 text-xs font-extrabold tracking-wider border border-amber-500/30">
                  STEP {item.step}
                </div>

                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center mb-5 mt-2">
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
