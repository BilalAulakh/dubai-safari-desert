"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { optimizeImageUrl } from "@/lib/utils";

interface PackageGalleryProps {
  /** Every photo of the package, in order; the first is the main photo */
  all: string[];
  name: string;
}

// Compact mosaic: one main photo with up to two thumbnails beside it, at a fixed modest
// height. Clicking any photo opens a full-screen viewer with every photo.
// Built on <dialog>, so Esc, focus trapping and the backdrop come from the browser.
export default function PackageGallery({ all, name }: PackageGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback((delta: number) => setIndex((i) => (i + delta + all.length) % all.length), [all.length]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    dialog.addEventListener("keydown", onKey);
    return () => dialog.removeEventListener("keydown", onKey);
  }, [step]);

  if (all.length === 0) return null;

  const thumbs = all.slice(1, 3);
  const tile =
    "group/photo relative block h-full w-full overflow-hidden rounded-xl bg-dune-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-page";
  const img =
    "absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-[var(--ease-out-soft)] motion-safe:group-hover/photo:scale-[1.04]";
  const morePill = (
    <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-full bg-dune-950/75 px-3 py-1 text-xs font-semibold text-sand-50 backdrop-blur-md">
      <Expand className="h-3.5 w-3.5" aria-hidden="true" />
      {all.length} photos
    </span>
  );

  return (
    <>
      <div
        className={`grid h-52 gap-2 sm:h-64 lg:h-[270px] ${
          thumbs.length > 0 ? "grid-cols-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]" : "grid-cols-1"
        }`}
      >
        <button type="button" onClick={() => open(0)} className={tile} aria-label={`Open photo 1 of ${name}`}>
          <img
            src={optimizeImageUrl(all[0], 900)}
            alt={`${name} photo 1`}
            width={900}
            height={600}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className={img}
          />
          {/* On phones the thumbnails are hidden, so the count sits on the main photo */}
          {all.length > 1 && <span className="sm:hidden">{morePill}</span>}
        </button>

        {thumbs.length > 0 && (
          <div className={`hidden gap-2 sm:grid ${thumbs.length > 1 ? "grid-rows-2" : "grid-rows-1"}`}>
            {thumbs.map((src, t) => {
              const i = t + 1;
              return (
                <button key={src} type="button" onClick={() => open(i)} className={tile} aria-label={`Open photo ${i + 1} of ${name}`}>
                  <img
                    src={optimizeImageUrl(src, 500)}
                    alt={`${name} photo ${i + 1}`}
                    width={500}
                    height={330}
                    loading="lazy"
                    decoding="async"
                    className={img}
                  />
                  {t === thumbs.length - 1 && all.length > 1 && morePill}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <dialog
        ref={dialogRef}
        aria-label={`${name} photos`}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="m-auto h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-dune-950/90 backdrop:backdrop-blur-sm"
      >
        <div className="flex h-full w-full items-center justify-center p-4 sm:p-10" onClick={(e) => e.target === e.currentTarget && close()}>
          <img
            src={optimizeImageUrl(all[index], 1600)}
            alt={`${name} photo ${index + 1} of ${all.length}`}
            className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl"
          />
        </div>

        <button
          type="button"
          onClick={close}
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
          aria-label="Close photos"
          autoFocus
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {all.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:left-6"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:right-6"
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-md" aria-live="polite">
              {index + 1} / {all.length}
            </p>
          </>
        )}
      </dialog>
    </>
  );
}
