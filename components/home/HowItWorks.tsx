import { Compass, Send, Sparkles, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/common/ScrollReveal";

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
      title: "Enjoy Your Adventure",
      description: "Your 4x4 arrives at your doorstep. Experience high red dune bashing, camel rides, and starlit hospitality.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F2E8D5] dark:bg-[#1D150E] border-y border-[#C89B3C]/15 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
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
        </ScrollReveal>

        {/* Desktop View: 01 ───── 02 ───── 03 ───── 04 */}
        <div className="hidden lg:block relative">
          {/* Subtle Continuous Gold Connecting Line */}
          <div className="absolute top-[22px] left-[12%] right-[12%] h-[1.5px] bg-gradient-to-r from-[#C89B3C]/30 via-[#C89B3C]/70 to-[#C89B3C]/30 z-0 pointer-events-none" />

          <div className="grid grid-cols-4 gap-6 relative z-10">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={index} delay={index * 100}>
                  <div className="group flex flex-col items-center text-center">
                    {/* Gold Numbered Circle */}
                    <div className="w-11 h-11 rounded-full bg-[#17120D] text-[#E8C48A] border-2 border-[#C89B3C] font-bold text-sm flex items-center justify-center shadow-lg relative z-10 mb-6 group-hover:scale-110 group-hover:border-[#E8C48A] group-hover:shadow-[0_0_15px_rgba(200,155,60,0.4)] transition-all duration-300">
                      {item.step}
                    </div>

                    {/* Step Card */}
                    <div className="w-full bg-white dark:bg-[#241A12] p-6 rounded-2xl border border-[#C89B3C]/20 shadow-sm hover:border-[#C89B3C]/50 hover:shadow-[0_12px_28px_rgba(23,18,13,0.12)] transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1">
                      <div className="w-12 h-12 rounded-xl bg-[#C89B3C]/10 border border-[#C89B3C]/25 text-[#C89B3C] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                        <Icon className="w-6 h-6" />
                      </div>

                      <h3 className="font-heading text-base font-bold text-[#17120D] dark:text-[#FBF7F0] mb-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6B6258] dark:text-[#B8ADA2] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet View: 01 │ 02 │ 03 │ 04 Vertical Connected Timeline */}
        <div className="lg:hidden relative">
          <div className="space-y-4 sm:space-y-6">
            {steps.map((item, index) => {
              const Icon = item.icon;
              const isLast = index === steps.length - 1;
              return (
                <ScrollReveal key={index} delay={index * 80}>
                  <div className="relative flex items-stretch gap-3 sm:gap-4">
                    {/* Left Column: Gold Circle & Connecting Line */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#17120D] text-[#E8C48A] border-2 border-[#C89B3C] font-bold text-xs sm:text-sm flex items-center justify-center shadow-md relative z-10 shrink-0">
                        {item.step}
                      </div>
                      {!isLast && (
                        <div className="w-[2px] grow min-h-[36px] sm:min-h-[44px] bg-gradient-to-b from-[#C89B3C]/70 via-[#C89B3C]/40 to-[#C89B3C]/10 my-1" />
                      )}
                    </div>

                    {/* Step Card Content */}
                    <div className="flex-1 bg-white dark:bg-[#241A12] p-4 sm:p-5 rounded-2xl border border-[#C89B3C]/20 shadow-sm hover:border-[#C89B3C]/50 transition-all duration-300 mb-2">
                      <div className="flex items-center gap-2.5 sm:gap-3 mb-2">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#C89B3C]/10 border border-[#C89B3C]/25 text-[#C89B3C] flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <h3 className="font-heading text-sm sm:text-base font-bold text-[#17120D] dark:text-[#FBF7F0]">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-[#6B6258] dark:text-[#B8ADA2] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
