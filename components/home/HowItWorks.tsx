import { Compass, Calendar, Send, Sparkles, CheckCircle2 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: Compass,
      title: "Choose Your Safari",
      description: "Browse our signature evening, sunrise, overnight, or private VIP packages to find your ideal adventure.",
    },
    {
      step: "02",
      icon: Send,
      title: "Submit Booking Request",
      description: "Select your preferred date, party size, and Dubai pickup address. Zero advance card required.",
    },
    {
      step: "03",
      icon: CheckCircle2,
      title: "Receive Confirmation",
      description: "Our reservation team confirms your schedule and pickup timing instantly via WhatsApp or message.",
    },
    {
      step: "04",
      icon: Sparkles,
      title: "Enjoy Your Desert Adventure",
      description: "Your 4x4 arrives at your doorstep. Experience high red dune bashing, camel rides, and starlit hospitality.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F2E8D5] dark:bg-[#1D150E] border-y border-[#C89B3C]/15 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C89B3C]">
            Seamless & Card-Free
          </span>
          <h2 className="font-heading mt-2 text-2xl sm:text-3xl lg:text-[36px] font-bold tracking-tight text-[#17120D] dark:text-[#FBF7F0] leading-[1.15]">
            How Your Desert Safari Works
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#6B6258] dark:text-[#B8ADA2] leading-relaxed">
            Reserve your Dubai desert adventure smoothly in 4 simple steps with zero upfront payment friction.
          </p>
        </div>

        {/* 4-Step Visual Grid with Connecting Line */}
        <div className="relative">
          {/* Subtle Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] -translate-y-6 h-0.5 border-t-2 border-dashed border-[#C89B3C]/30 z-0 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 relative z-10">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="relative bg-white dark:bg-[#241A12] p-6 sm:p-7 rounded-2xl border border-[#C89B3C]/20 shadow-sm hover:border-[#C89B3C]/50 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1"
                >
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 px-2.5 py-0.5 rounded-full bg-[#17120D] text-[#E8C48A] text-[10px] font-bold tracking-widest border border-[#C89B3C]/40 shadow-sm">
                    STEP {item.step}
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-[#C89B3C]/10 border border-[#C89B3C]/25 text-[#C89B3C] flex items-center justify-center mb-4 mt-1">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-heading text-base sm:text-lg font-bold text-[#17120D] dark:text-[#FBF7F0] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B6258] dark:text-[#B8ADA2] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
