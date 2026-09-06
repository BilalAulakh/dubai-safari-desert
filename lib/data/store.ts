import {
  Package,
  Activity,
  PickupLocation,
  FAQ,
  GalleryItem,
  Review,
  BlogPost,
  Comment,
  Booking,
  BookingStatus,
  ReviewStatus,
  CommentStatus,
} from "@/types";
import { initialPackages } from "./packages";
import { initialActivities } from "./activities";
import { initialPickupLocations } from "./pickupLocations";
import { initialFAQs } from "./faqs";
import { initialGalleryItems } from "./gallery";
import { initialReviews } from "./reviews";
import { initialBlogPosts } from "./blogPosts";
import { generateBookingReference } from "../utils";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

function getPublicSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return createSupabaseClient(url, anonKey, {
    auth: { persistSession: false },
  });
}

// In-memory fallback stores for local/demo execution
const fallbackPackages: Package[] = [...initialPackages];
const fallbackActivities: Activity[] = [...initialActivities];
const fallbackPickupLocations: PickupLocation[] = [...initialPickupLocations];
const fallbackFAQs: FAQ[] = [...initialFAQs];
const fallbackGallery: GalleryItem[] = [...initialGalleryItems];
const fallbackReviews: Review[] = [...initialReviews];
const fallbackBlogPosts: BlogPost[] = [...initialBlogPosts];
const fallbackComments: Comment[] = [];
const fallbackBookings: Booking[] = [
  {
    id: "booking-demo-1",
    booking_reference: "DSD-2026-DXB81",
    package_id: "pkg-evening-safari",
    package_name: "Evening Desert Safari with BBQ Dinner",
    customer_name: "Alexander Wright",
    phone: "+971 52 987 6543",
    email: "alex.wright@example.com",
    booking_date: "2026-09-12",
    adults: 2,
    children: 1,
    pickup_location: "Downtown Dubai (Burj Khalifa area)",
    hotel_name: "Address Downtown",
    special_requests: "Vegetarian meal for 1 adult, baby seat for 1 child.",
    status: "pending",
    admin_notes: "Followed up on WhatsApp, waiting for customer to confirm pickup time.",
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "booking-demo-2",
    booking_reference: "DSD-2026-VIP44",
    package_id: "pkg-private-safari",
    package_name: "VIP Private Desert Safari Experience",
    customer_name: "Nadia Al-Hassan",
    phone: "+971 50 888 1234",
    email: "nadia.hassan@example.com",
    booking_date: "2026-09-15",
    adults: 4,
    children: 0,
    pickup_location: "Palm Jumeirah & Madinat Jumeirah",
    hotel_name: "Atlantis The Royal",
    special_requests: "Anniversary celebration table at camp.",
    status: "confirmed",
    admin_notes: "Private Land Cruiser allocated. Driver Rashid assigned.",
    created_at: new Date(Date.now() - 3600000 * 28).toISOString(),
  },
];

// --- PACKAGES ---
export async function getPackages(): Promise<Package[]> {
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("packages")
        .select("id, name, slug, short_description, description, price, duration, featured, active, main_image, gallery, pickup_info, cancellation_policy, seo_title, seo_description")
        .eq("active", true);

      if (!error && data && data.length > 0) {
        return data.map((pkg: any) => {
          const fallback = fallbackPackages.find((f) => f.slug === pkg.slug || f.id === pkg.id);
          return {
            ...pkg,
            price: Number(pkg.price),
            inclusions: fallback?.inclusions || ["4x4 Dune Bashing", "Camel Ride", "BBQ Dinner", "Live Shows"],
            exclusions: fallback?.exclusions || ["Alcoholic Drinks", "Quad Bike (optional)"],
            itinerary: fallback?.itinerary || [],
          };
        });
      }
    }
  } catch {
    // Fallback to in-memory store
  }
  return fallbackPackages.filter((p) => p.active);
}

export async function getAllPackages(): Promise<Package[]> {
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("packages")
        .select("id, name, slug, short_description, description, price, duration, featured, active, main_image, gallery, pickup_info, cancellation_policy, seo_title, seo_description");

      if (!error && data && data.length > 0) {
        return data.map((pkg: any) => {
          const fallback = fallbackPackages.find((f) => f.slug === pkg.slug || f.id === pkg.id);
          return {
            ...pkg,
            price: Number(pkg.price),
            inclusions: fallback?.inclusions || ["4x4 Dune Bashing", "Camel Ride", "BBQ Dinner", "Live Shows"],
            exclusions: fallback?.exclusions || ["Alcoholic Drinks", "Quad Bike (optional)"],
            itinerary: fallback?.itinerary || [],
          };
        });
      }
    }
  } catch {}
  return fallbackPackages;
}

export async function getPackageBySlug(slug: string): Promise<Package | null> {
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("packages")
        .select("id, name, slug, short_description, description, price, duration, featured, active, main_image, gallery, pickup_info, cancellation_policy, seo_title, seo_description")
        .eq("slug", slug)
        .maybeSingle();

      if (!error && data) {
        const fallback = fallbackPackages.find((f) => f.slug === data.slug || f.id === data.id);
        return {
          ...data,
          price: Number(data.price),
          inclusions: fallback?.inclusions || ["4x4 Dune Bashing", "Camel Ride", "BBQ Dinner", "Live Shows"],
          exclusions: fallback?.exclusions || ["Alcoholic Drinks", "Quad Bike (optional)"],
          itinerary: fallback?.itinerary || [],
        };
      }
    }
  } catch {}
  const pkg = fallbackPackages.find((p) => p.slug === slug);
  return pkg || null;
}

export async function createPackage(pkg: Package): Promise<Package> {
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      await supabase.from("packages").insert({
        name: pkg.name,
        slug: pkg.slug,
        short_description: pkg.short_description,
        description: pkg.description,
        price: pkg.price,
        duration: pkg.duration,
        featured: pkg.featured,
        active: pkg.active,
        main_image: pkg.main_image,
        gallery: pkg.gallery,
        pickup_info: pkg.pickup_info,
        cancellation_policy: pkg.cancellation_policy,
        seo_title: pkg.seo_title,
        seo_description: pkg.seo_description,
      });
    }
  } catch {}
  fallbackPackages.unshift(pkg);
  return pkg;
}

export async function updatePackage(id: string, updates: Partial<Package>): Promise<Package | null> {
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      await supabase.from("packages").update(updates).eq("id", id);
    }
  } catch {}
  const index = fallbackPackages.findIndex((p) => p.id === id);
  if (index === -1) return null;
  fallbackPackages[index] = { ...fallbackPackages[index], ...updates };
  return fallbackPackages[index];
}

export async function deletePackage(id: string): Promise<boolean> {
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      await supabase.from("packages").delete().eq("id", id);
    }
  } catch {}
  const index = fallbackPackages.findIndex((p) => p.id === id);
  if (index === -1) return false;
  fallbackPackages.splice(index, 1);
  return true;
}

// --- ACTIVITIES ---
export async function getActivities(): Promise<Activity[]> {
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("activities")
        .select("id, name, slug, description, image, active, sort_order, highlights")
        .eq("active", true)
        .order("sort_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return data;
      }
    }
  } catch {}
  return fallbackActivities
    .filter((a) => a.active)
    .sort((a, b) => a.sort_order - b.sort_order);
}

export async function getAllActivities(): Promise<Activity[]> {
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("activities")
        .select("id, name, slug, description, image, active, sort_order, highlights")
        .order("sort_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return data;
      }
    }
  } catch {}
  return fallbackActivities.sort((a, b) => a.sort_order - b.sort_order);
}

// --- PICKUP LOCATIONS ---
export async function getPickupLocations(): Promise<PickupLocation[]> {
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("pickup_locations")
        .select("id, name, active, sort_order")
        .eq("active", true)
        .order("sort_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return data;
      }
    }
  } catch {}
  return fallbackPickupLocations
    .filter((l) => l.active)
    .sort((a, b) => a.sort_order - b.sort_order);
}

export async function getAllPickupLocations(): Promise<PickupLocation[]> {
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("pickup_locations")
        .select("id, name, active, sort_order")
        .order("sort_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return data;
      }
    }
  } catch {}
  return fallbackPickupLocations.sort((a, b) => a.sort_order - b.sort_order);
}

// --- FAQS ---
export async function getFAQs(): Promise<FAQ[]> {
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("faqs")
        .select("id, question, answer, category, active, sort_order")
        .eq("active", true)
        .order("sort_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return data;
      }
    }
  } catch {}
  return fallbackFAQs
    .filter((f) => f.active)
    .sort((a, b) => a.sort_order - b.sort_order);
}

export async function getAllFAQs(): Promise<FAQ[]> {
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("faqs")
        .select("id, question, answer, category, active, sort_order")
        .order("sort_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return data;
      }
    }
  } catch {}
  return fallbackFAQs.sort((a, b) => a.sort_order - b.sort_order);
}

// --- GALLERY ---
export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("gallery")
        .select("id, title, image_url, category, active, sort_order")
        .eq("active", true)
        .order("sort_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return data;
      }
    }
  } catch {}
  return fallbackGallery
    .filter((g) => g.active)
    .sort((a, b) => a.sort_order - b.sort_order);
}

export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("gallery")
        .select("id, title, image_url, category, active, sort_order")
        .order("sort_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return data;
      }
    }
  } catch {}
  return fallbackGallery.sort((a, b) => a.sort_order - b.sort_order);
}

// --- REVIEWS ---
export async function getApprovedReviews(): Promise<Review[]> {
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("reviews")
        .select("id, customer_name, rating, comment, country, created_at, status, featured")
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((r: any) => ({
          id: r.id,
          customer_name: r.customer_name || "Safari Guest",
          country: r.country || "International Guest",
          rating: Number(r.rating) || 5,
          comment: r.comment || "",
          status: r.status || "approved",
          featured: Boolean(r.featured),
          created_at: r.created_at || new Date().toISOString(),
          is_demo: false,
        }));
      }
    }
  } catch {}
  return fallbackReviews
    .filter((r) => r.status === "approved")
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function getAllReviews(): Promise<Review[]> {
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("reviews")
        .select("id, customer_name, rating, comment, country, created_at, status, featured")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((r: any) => ({
          id: r.id,
          customer_name: r.customer_name || "Safari Guest",
          country: r.country || "International Guest",
          rating: Number(r.rating) || 5,
          comment: r.comment || "",
          status: r.status || "pending",
          featured: Boolean(r.featured),
          created_at: r.created_at || new Date().toISOString(),
          is_demo: false,
        }));
      }
    }
  } catch {}
  return [...fallbackReviews].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function createReview(data: Omit<Review, "id" | "created_at" | "status">): Promise<Review> {
  const newReview: Review = {
    ...data,
    id: `rev-${Date.now()}`,
    status: "pending", // Always pending by default per prompt
    created_at: new Date().toISOString(),
  };
  fallbackReviews.unshift(newReview);
  return newReview;
}

export async function updateReviewStatus(
  id: string,
  status: ReviewStatus,
  featured?: boolean
): Promise<Review | null> {
  const review = fallbackReviews.find((r) => r.id === id);
  if (!review) return null;
  review.status = status;
  if (featured !== undefined) review.featured = featured;
  return review;
}

export async function deleteReview(id: string): Promise<boolean> {
  const index = fallbackReviews.findIndex((r) => r.id === id);
  if (index !== -1) {
    fallbackReviews.splice(index, 1);
    return true;
  }
  return false;
}

// --- BLOG POSTS ---
export async function getBlogPosts(): Promise<BlogPost[]> {
  return fallbackBlogPosts.filter((b) => b.status === "published");
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return fallbackBlogPosts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = fallbackBlogPosts.find((b) => b.slug === slug);
  return post || null;
}

// --- COMMENTS ---
export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
  return fallbackComments.filter(
    (c) => c.post_id === postId && c.status === "approved"
  );
}

export async function getAllComments(): Promise<Comment[]> {
  return fallbackComments;
}

export async function createComment(data: Omit<Comment, "id" | "created_at" | "status">): Promise<Comment> {
  const newComment: Comment = {
    ...data,
    id: `comm-${Date.now()}`,
    status: "pending",
    created_at: new Date().toISOString(),
  };
  fallbackComments.unshift(newComment);
  return newComment;
}

export async function updateCommentStatus(id: string, status: CommentStatus): Promise<Comment | null> {
  const comment = fallbackComments.find((c) => c.id === id);
  if (!comment) return null;
  comment.status = status;
  return comment;
}

export async function deleteComment(id: string): Promise<boolean> {
  const index = fallbackComments.findIndex((c) => c.id === id);
  if (index !== -1) {
    fallbackComments.splice(index, 1);
    return true;
  }
  return false;
}

// --- BOOKINGS ---
export async function getBookings(): Promise<Booking[]> {
  return [...fallbackBookings].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function getBookingByReference(reference: string): Promise<Booking | null> {
  const booking = fallbackBookings.find(
    (b) => b.booking_reference.toLowerCase() === reference.toLowerCase()
  );
  return booking || null;
}

export async function createBooking(
  data: Omit<Booking, "id" | "booking_reference" | "status" | "created_at">
): Promise<Booking> {
  const booking_reference = generateBookingReference();
  const pkg = fallbackPackages.find((p) => p.id === data.package_id);

  const newBooking: Booking = {
    ...data,
    id: `bkg-${Date.now()}`,
    booking_reference,
    package_name: pkg ? pkg.name : "Custom Desert Safari",
    status: "pending", // Default pending per prompt requirement
    created_at: new Date().toISOString(),
  };

  fallbackBookings.unshift(newBooking);
  return newBooking;
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus,
  adminNotes?: string
): Promise<Booking | null> {
  const booking = fallbackBookings.find((b) => b.id === id);
  if (!booking) return null;
  booking.status = status;
  if (adminNotes !== undefined) booking.admin_notes = adminNotes;
  booking.updated_at = new Date().toISOString();
  return booking;
}
