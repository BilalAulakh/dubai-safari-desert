import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Activity } from "@/types";
import { optimizeImageUrl } from "@/lib/utils";
import ScrollReveal from "@/components/common/ScrollReveal";

interface ActivitiesShowcaseProps {
  activities: Activity[];
}

export default function ActivitiesShowcase({ activities }: ActivitiesShowcaseProps) {
  const displayActivities = activities.slice(0, 6);

  return (
    <section className="section bg-[#FBF7F0] dark:bg-[#17120D] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
            <div>
              <div className="eyebrow">
                <span>Thrills & Traditions</span>
              </div>
              <h2 className="section-title">
                Dubai Desert Safari Activities
              </h2>
              <p className="section-lead">
                From heart-racing red dune power slides and ATV quad biking to serene sunset camel rides and mesmerizing Sufi Tanoura shows.
              </p>
            </div>

            <Link
              href="/activities"
              className="link-arrow shrink-0"
            >
              <span>Explore All Activities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {displayActivities.map((act, index) => (
            <ScrollReveal key={act.id} delay={index * 80}>
              <div className="group relative rounded-2xl overflow-hidden bg-[#17120D] h-80 flex flex-col justify-end p-6 sm:p-7 hover:shadow-[0_18px_36px_-14px_rgba(23,18,13,0.45)] transition-all duration-300 hover:-translate-y-0.5">
                <img
                  src={optimizeImageUrl(act.image, 600)}
                  alt={act.name}
                  width={600}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-500 ease-out opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17120D]/95 via-[#17120D]/45 to-transparent" />

                <div className="relative z-10">
                  {/* Subtle Gold Accent Line that smoothly expands on hover */}
                  <div className="w-8 h-0.5 bg-[#C89B3C] group-hover:w-16 transition-all duration-300 mb-2.5 rounded-full" />

                  <h3 className="font-heading text-xl font-bold text-white group-hover:text-[#E8C48A] transition-colors leading-snug">
                    {act.name}
                  </h3>
                  <p className="mt-2 text-sm text-[#FBF7F0]/85 line-clamp-2 leading-relaxed">
                    {act.description}
                  </p>

                  {act.highlights && act.highlights.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {act.highlights.slice(0, 2).map((h, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2.5 py-0.5 rounded-md bg-white/10 text-[#F3D7A4] font-medium backdrop-blur-md border border-white/15"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
