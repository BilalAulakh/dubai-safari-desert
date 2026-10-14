"use client";

import { useEffect, useRef } from "react";

// Background video for the hero. The poster paints first; the video is attached only
// after the page has loaded so it never competes with critical CSS/JS/fonts.
// Data-saver, slow-connection and reduced-motion users keep the still poster.
export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    if (connection?.saveData) return;
    if (connection?.effectiveType && ["slow-2g", "2g", "3g"].includes(connection.effectiveType)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const start = () => {
      video.src = window.matchMedia("(max-width: 767px)").matches
        ? "/videos/hero-desert-540.mp4"
        : "/videos/hero-desert-1080.mp4";
      video.muted = true;
      video.play().catch(() => {
        // Autoplay blocked: poster stays visible
      });
    };

    if (document.readyState === "complete") {
      start();
      return;
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      poster="/images/hero-poster.webp"
      aria-hidden="true"
      className="h-full w-full object-cover object-center"
    />
  );
}
