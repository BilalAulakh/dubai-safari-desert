import { Compass, Car, Sparkles, Users, CalendarCheck, HeadphonesIcon } from "lucide-react";

export default function WhyChooseUs() {
  const trustPoints = [
    {
      icon: Compass,
      title: "Experienced Safari Guides",
      description:
        "Licensed safari marshals with specialized desert navigation training ensure your tour is thrilling, scenic, and safe.",
    },
    {
      icon: Car,
      title: "Convenient Hotel Pickup",
      description:
        "Doorstep pickup and drop-off in clean, air-conditioned 4x4 Land Cruisers from hotels and apartments across Dubai.",
    },
    {
      icon: Sparkles,
      title: "Premium Desert Experience",
      description:
        "Curated Bedouin camps, authentic cultural entertainment, and 5-star international BBQ buffets with vegetarian selections.",
    },
    {
      icon: Users,
      title: "Flexible Packages",
      description:
        "Options tailored for solo explorers, couples, families with children, and private VIP corporate parties.",
    },
    {
      icon: CalendarCheck,
      title: "Easy Booking & Inquiry",
      description:
        "Simple reservation process via our online inquiry form or direct conversation with our team on WhatsApp.",
    },
    {
      icon: HeadphonesIcon,
      title: "Dedicated Customer Support",
      description:
        "Prompt assistance before, during, and after your booking to answer questions and adjust schedules smoothly.",
    },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Subtle Desert Dunes Contour Glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Why Choose DubaiSafariDesert
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Excellence in Every Desert Journey
          </h2>
          <p className="mt-3 text-base text-slate-300">
            We focus on genuine hospitality, safe dune driving standards, and authentic Arabian traditions to give you the most rewarding Dubai desert adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-500/40 hover:bg-white/[0.06] transition-all duration-300 flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{point.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
