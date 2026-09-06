import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function generateBookingReference(): string {
  const year = new Date().getFullYear();
  const randomChars = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `DSD-${year}-${randomChars}`;
}

export function createWhatsAppUrl(phone: string, text: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

/**
 * Optimizes image URLs by ensuring appropriate dimensions, WebP/AVIF format negotiation,
 * and high-efficiency compression.
 */
export function optimizeImageUrl(url: string, width = 800, quality = 80): string {
  if (!url) return "";
  if (url.includes("images.unsplash.com")) {
    const cleanUrl = url.split("?")[0];
    return `${cleanUrl}?auto=format&fit=crop&w=${width}&q=${quality}`;
  }
  return url;
}
