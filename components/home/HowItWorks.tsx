import { Compass, Send, Sun, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/common/ScrollReveal";

// Step accents run from afternoon gold to dusk, like the evening in the dunes
const STEP_COLORS = ["#E9A64B", "#E3833A", "#D9542A", "#B35A6B"];

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
    // Always night navy: the dark band between the light package and review sections
    <section className="section-y relative overflow-hidden bg-dune-900 text-sand-50 dark:bg-dune-950">
      {/* Soft dune-gold glow, decorative only */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-240 -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <ScrollReveal>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="kicker justify-center text-amber-300 after:h-px after:w-8 after:bg-current after:opacity-70 after:content-['']">
              Seamless &amp; Card-Free
            </p>
            <h2 className="mt-5 font-display text-h2 font-bold">
              How your desert safari <span className="italic text-amber-300">works</span>
            </h2>
            <p className="mt-5 text-body-lg text-sand-400">
              Reserve your Dubai desert adventure in 4 simple steps, with no upfront payment.
            </p>
          </div>
        </ScrollReveal>

        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon;
            const color = STEP_COLORS[index];
            return (
              <li key={item.step}>
                <ScrollReveal delay={index * 100}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-6 transition-colors duration-300 hover:border-white/20 hover:bg-white/6 lg:p-7">
                    {/* Colour bar along the top edge */}
                    <span className="absolute inset-x-0 top-0 h-0.75" style={{ backgroundColor: color }} aria-hidden="true" />
                    <div className="flex items-center justify-between">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${color}22`, color }}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="font-display text-4xl font-semibold leading-none text-white/10">{item.step}</span>
                    </div>
                    <h3 className="mt-6 font-display text-h3 font-bold">{item.title}</h3>
                    <p className="mt-2.5 text-small leading-relaxed text-sand-400">{item.description}</p>
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
