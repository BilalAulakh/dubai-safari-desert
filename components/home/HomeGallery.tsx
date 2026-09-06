import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";
import { GalleryItem } from "@/types";

interface HomeGalleryProps {
  items: GalleryItem[];
}

export default function HomeGallery({ items }: HomeGalleryProps) {
  const displayItems = items.slice(0, 6);

  return (
    <section className="py-20 bg-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
              Visual Moments
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Glimpses of the Arabian Dunes
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              From golden sunset shadows to glowing embers at our Bedouin fortress.
            </p>
          </div>

          <Link
            href="/gallery"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors group"
          >
            <Camera className="w-4 h-4" />
            <span>View Full Gallery</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="group relative h-48 sm:h-64 rounded-xl overflow-hidden shadow-sm bg-slate-900"
            >
              <img
                src={item.image_url}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-xs font-semibold text-white truncate">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
