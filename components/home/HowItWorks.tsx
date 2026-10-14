import { Compass, Send, Sun, CheckCircle2 } from "lucide-react";
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
      icon: Sun,
      title: "Enjoy Your Adventure",
      description: "Your 4x4 arrives at your doorstep. Experience high red dune bashing, camel rides, and starlit hospitality.",
    },
  ];

  return (
    <section className="section bg-[#F5EEE3] dark:bg-[#1D150E] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="eyebrow">
              Seamless & Card-Free
            </span>
            <h2 className="section-title">
              How Your Desert Safari Works
            </h2>
            <p className="section-lead">
              Reserve your Dubai desert adventure smoothly in 4 simple steps with zero upfront payment friction.
            </p>
          </div>
        </ScrollReveal>

        {/* One list for every screen: vertical timeline on mobile/tablet, four columns on desktop */}
        <ol className="relative grid gap-4 sm:gap-6 lg:grid-cols-4">
          {/* Desktop connecting line behind the numbered circles */}
          <div
            className="absolute top-[22px] left-[12%] right-[12%] hidden h-[1.5px] bg-gradient-to-r from-[#C89B3C]/30 via-[#C89B3C]/70 to-[#C89B3C]/30 pointer-events-none lg:block"
            aria-hidden="true"
          />

          {steps.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === steps.length - 1;
            return (
              <li key={item.step} className="relative">
                <ScrollReveal delay={index * 100}>
                  <div className="group flex items-stretch gap-3 sm:gap-4 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
                    {/* Numbered circle, with a vertical connector below it on small screens */}
                    <div className="flex shrink-0 flex-col items-center lg:mb-6">
                      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#C89B3C] bg-[#17120D] text-xs font-bold text-[#E8C48A] shadow-md transition-all duration-300 sm:h-10 sm:w-10 sm:text-sm lg:h-11 lg:w-11 lg:shadow-lg lg:group-hover:scale-110 lg:group-hover:border-[#E8C48A] lg:group-hover:shadow-[0_0_15px_rgba(200,155,60,0.4)]">
                        {item.step}
                      </div>
                      {!isLast && (
                        <div
                          className="my-1 min-h-[36px] w-[2px] grow bg-gradient-to-b from-[#C89B3C]/70 via-[#C89B3C]/40 to-[#C89B3C]/10 sm:min-h-[44px] lg:hidden"
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    {/* Step card */}
                    <div className="card card-hover mb-2 flex-1 p-4 sm:p-5 lg:mb-0 lg:flex lg:w-full lg:flex-col lg:items-center lg:p-6">
                      <div className="mb-2 flex items-center gap-2.5 sm:gap-3 lg:mb-0 lg:flex-col lg:gap-0">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#C89B3C]/12 text-[#8C6214] transition-transform duration-200 sm:h-9 sm:w-9 lg:mb-4 lg:h-12 lg:w-12 lg:rounded-xl lg:group-hover:scale-105 dark:text-[#E8C48A]">
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" aria-hidden="true" />
                        </div>
                        <h3 className="font-heading text-sm font-bold leading-snug text-[#17120D] sm:text-base lg:mb-2 dark:text-[#FBF7F0]">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-[#5E554C] dark:text-[#B8ADA2]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
