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
const deletedReviewIds = new Set<string>();
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
function parsePickupLocation(item: any): PickupLocation {
  const rawName: string = item.name || "";
  if (rawName.includes("|||")) {
    const [name, map_url] = rawName.split("|||");
    return {
      ...item,
      name: name.trim(),
      map_url: map_url.trim(),
    };
  }
  return {
    ...item,
    name: rawName.trim(),
    map_url: item.map_url || undefined,
  };
}

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
        return data.map(parsePickupLocation);
      }
    }
  } catch {}
  return fallbackPickupLocations
    .filter((l) => l.active)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(parsePickupLocation);
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
        return data.map(parsePickupLocation);
      }
    }
  } catch {}
  return fallbackPickupLocations
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(parsePickupLocation);
}

export async function createPickupLocation(name: string, map_url?: string): Promise<PickupLocation> {
  const cleanName = name.trim();
  const cleanUrl = map_url?.trim();
  const storedName = cleanUrl ? `${cleanName}|||${cleanUrl}` : cleanName;

  let newLoc: PickupLocation = {
    id: `loc-${Date.now()}`,
    name: cleanName,
    active: true,
    sort_order: fallbackPickupLocations.length + 1,
    map_url: cleanUrl || undefined,
  };

  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("pickup_locations")
        .insert({
          name: storedName,
          active: true,
          sort_order: fallbackPickupLocations.length + 1,
        })
        .select()
        .single();

      if (!error && data) {
        newLoc = parsePickupLocation(data);
      }
    }
  } catch (err) {
    console.error("createPickupLocation error:", err);
  }

  fallbackPickupLocations.push(newLoc);
  return newLoc;
}

export async function updatePickupLocation(
  id: string,
  updates: Partial<PickupLocation>
): Promise<PickupLocation | null> {
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const dbUpdates: any = {};
      if (updates.active !== undefined) dbUpdates.active = updates.active;
      if (updates.sort_order !== undefined) dbUpdates.sort_order = updates.sort_order;
      if (updates.name !== undefined || updates.map_url !== undefined) {
        const cleanName = updates.name !== undefined ? updates.name.trim() : "";
        const cleanUrl = updates.map_url !== undefined ? updates.map_url.trim() : "";
        dbUpdates.name = cleanUrl ? `${cleanName}|||${cleanUrl}` : cleanName;
      }

      const { data, error } = await supabase
        .from("pickup_locations")
        .update(dbUpdates)
        .eq("id", id)
        .select()
        .maybeSingle();

      if (!error && data) {
        const parsed = parsePickupLocation(data);
        const fb = fallbackPickupLocations.find((l) => l.id === id);
        if (fb) Object.assign(fb, parsed);
        return parsed;
      }
    }
  } catch (err) {
    console.error("updatePickupLocation error:", err);
  }

  const fb = fallbackPickupLocations.find((l) => l.id === id);
  if (!fb) return null;
  Object.assign(fb, updates);
  return fb;
}

export async function deletePickupLocation(id: string): Promise<boolean> {
  let deleted = false;
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const { error } = await supabase.from("pickup_locations").delete().eq("id", id);
      if (!error) deleted = true;
    }
  } catch (err) {
    console.error("deletePickupLocation error:", err);
  }

  const idx = fallbackPickupLocations.findIndex((l) => l.id === id);
  if (idx !== -1) {
    fallbackPickupLocations.splice(idx, 1);
    return true;
  }
  return deleted;
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
  return initialGalleryItems
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

      if (!error && data) {
        const dbReviews: Review[] = data.map((r: any) => ({
          id: r.id,
          customer_name: r.customer_name || "Safari Guest",
          country: r.country || "International Guest",
          rating: Number(r.rating) || 5,
          comment: r.comment || "",
          status: (r.status as ReviewStatus) || "approved",
          featured: Boolean(r.featured),
          created_at: r.created_at || new Date().toISOString(),
          is_demo: false,
        }));

        const demoReviews = fallbackReviews.filter((r) => r.is_demo);
        return [...dbReviews, ...demoReviews]
          .filter((r) => !deletedReviewIds.has(r.id))
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }
    }
  } catch {}
  return fallbackReviews
    .filter((r) => r.status === "approved" && !deletedReviewIds.has(r.id))
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

      if (!error && data) {
        const dbReviews: Review[] = data.map((r: any) => ({
          id: r.id,
          customer_name: r.customer_name || "Safari Guest",
          country: r.country || "International Guest",
          rating: Number(r.rating) || 5,
          comment: r.comment || "",
          status: (r.status as ReviewStatus) || "approved",
          featured: Boolean(r.featured),
          created_at: r.created_at || new Date().toISOString(),
          is_demo: false,
        }));
        const demoReviews = fallbackReviews.filter((r) => r.is_demo);
        return [...dbReviews, ...demoReviews]
          .filter((r) => !deletedReviewIds.has(r.id))
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }
    }
  } catch {}
  return [...fallbackReviews]
    .filter((r) => !deletedReviewIds.has(r.id))
    .sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
}

export async function createReview(data: Omit<Review, "id" | "created_at" | "status">): Promise<Review> {
  const newReview: Review = {
    ...data,
    id: `rev-${Date.now()}`,
    status: "approved", // Auto-approved so review appears immediately
    created_at: new Date().toISOString(),
    is_demo: false,
  };

  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const { data: inserted, error } = await supabase
        .from("reviews")
        .insert({
          customer_name: data.customer_name,
          country: data.country,
          email: data.email || null,
          rating: data.rating,
          comment: data.comment,
          status: "approved",
          featured: false,
        })
        .select()
        .single();

      if (!error && inserted) {
        newReview.id = inserted.id;
      }
    }
  } catch (err) {
    console.error("Supabase insert review error:", err);
  }

  fallbackReviews.unshift(newReview);
  return newReview;
}

export async function updateReviewStatus(
  id: string,
  status?: ReviewStatus,
  featured?: boolean
): Promise<Review | null> {
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const updates: any = {};
      if (status !== undefined) updates.status = status;
      if (featured !== undefined) updates.featured = featured;
      await supabase.from("reviews").update(updates).eq("id", id);
    }
  } catch (err) {
    console.error("Supabase update review error:", err);
  }

  const review = fallbackReviews.find((r) => r.id === id);
  if (review) {
    if (status !== undefined) review.status = status;
    if (featured !== undefined) review.featured = featured;
    return review;
  }
  return null;
}

export async function deleteReview(id: string): Promise<boolean> {
  deletedReviewIds.add(id);
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) {
        console.error("Supabase delete review error:", error);
      }
    }
  } catch (err) {
    console.error("Supabase delete review error:", err);
  }

  const index = fallbackReviews.findIndex((r) => r.id === id);
  if (index !== -1) {
    fallbackReviews.splice(index, 1);
  }
  return true;
}

function mapDbBlogToBlogPost(b: any): BlogPost {
  const wordCount = b.content ? b.content.trim().split(/\s+/).length : 0;
  const readTime = b.read_time || `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
  const publishedDate = b.published_at
    ? b.published_at.slice(0, 10)
    : b.published_date || new Date().toISOString().slice(0, 10);

  return {
    id: String(b.id),
    title: b.title || "",
    slug: b.slug || "",
    excerpt: b.excerpt || "",
    content: b.content || "",
    featured_image: b.featured_image || "",
    featured_image_alt: b.featured_image_alt || b.title || "",
    category: b.category || "Desert Safari",
    author: b.author || "Safari Dune Tours",
    published_date: publishedDate,
    published_at: b.published_at || b.created_at || new Date().toISOString(),
    read_time: readTime,
    status: (b.status as "draft" | "published") || "draft",
    meta_title: b.meta_title || b.seo_title || b.title,
    meta_description: b.meta_description || b.seo_description || b.excerpt,
    seo_title: b.meta_title || b.seo_title || b.title,
    seo_description: b.meta_description || b.seo_description || b.excerpt,
    created_at: b.created_at || new Date().toISOString(),
    updated_at: b.updated_at || new Date().toISOString(),
  };
}

// --- BLOG POSTS ---
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map(mapDbBlogToBlogPost);
      }
    }
  } catch (err) {
    console.error("Supabase getBlogPosts error:", err);
  }
  return fallbackBlogPosts.filter((b) => b.status === "published");
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map(mapDbBlogToBlogPost);
      }
    }
  } catch (err) {
    console.error("Supabase getAllBlogPosts error:", err);
  }
  return fallbackBlogPosts;
}

export async function getBlogPostBySlug(
  slug: string,
  allowDraft = false
): Promise<BlogPost | null> {
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      let query = supabase.from("blogs").select("*").eq("slug", slug);
      if (!allowDraft) {
        query = query.eq("status", "published");
      }
      const { data, error } = await query.maybeSingle();

      if (!error && data) {
        return mapDbBlogToBlogPost(data);
      }
    }
  } catch (err) {
    console.error("Supabase getBlogPostBySlug error:", err);
  }

  const post = fallbackBlogPosts.find((b) => b.slug === slug);
  if (!post) return null;
  if (!allowDraft && post.status !== "published") return null;
  return post;
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (!error && data) {
        return mapDbBlogToBlogPost(data);
      }
    }
  } catch (err) {
    console.error("Supabase getBlogPostById error:", err);
  }

  const post = fallbackBlogPosts.find((b) => b.id === id);
  return post || null;
}

export async function createBlogPost(
  data: Omit<BlogPost, "id" | "created_at" | "updated_at"> & { id?: string }
): Promise<BlogPost> {
  const now = new Date().toISOString();
  const wordCount = data.content ? data.content.trim().split(/\s+/).length : 0;
  const readTime = data.read_time || `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

  const newPost: BlogPost = {
    ...data,
    id: data.id || `post-${Date.now()}`,
    published_date: data.published_at ? data.published_at.slice(0, 10) : (data.published_date || now.slice(0, 10)),
    published_at: data.status === "published" ? (data.published_at || now) : undefined,
    read_time: readTime,
    status: data.status || "draft",
    category: data.category || "Desert Safari",
    author: data.author || "Safari Dune Tours",
    featured_image_alt: data.featured_image_alt || data.title,
    meta_title: data.meta_title || data.seo_title || data.title,
    meta_description: data.meta_description || data.seo_description || data.excerpt,
    created_at: now,
    updated_at: now,
  };

  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const insertPayload: any = {
        title: newPost.title,
        slug: newPost.slug,
        excerpt: newPost.excerpt,
        content: newPost.content,
        featured_image: newPost.featured_image,
        featured_image_alt: newPost.featured_image_alt,
        meta_title: newPost.meta_title,
        meta_description: newPost.meta_description,
        category: newPost.category,
        author: newPost.author,
        status: newPost.status,
        published_at: newPost.published_at || null,
      };

      const { data: inserted, error } = await supabase
        .from("blogs")
        .insert(insertPayload)
        .select()
        .single();

      if (!error && inserted) {
        newPost.id = String(inserted.id);
      } else if (error) {
        console.error("Supabase insert blog error:", error);
      }
    }
  } catch (err) {
    console.error("Supabase insert blog exception:", err);
  }

  // Also update local fallback store
  fallbackBlogPosts.unshift(newPost);
  return newPost;
}

export async function updateBlogPost(
  id: string,
  updates: Partial<BlogPost>
): Promise<BlogPost | null> {
  const now = new Date().toISOString();

  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const dbUpdates: any = { ...updates, updated_at: now };
      if (updates.status === "published" && !updates.published_at) {
        dbUpdates.published_at = now;
      }

      const { data, error } = await supabase
        .from("blogs")
        .update(dbUpdates)
        .eq("id", id)
        .select()
        .single();

      if (!error && data) {
        const mapped = mapDbBlogToBlogPost(data);
        const idx = fallbackBlogPosts.findIndex((b) => b.id === id);
        if (idx !== -1) fallbackBlogPosts[idx] = mapped;
        return mapped;
      }
    }
  } catch (err) {
    console.error("Supabase update blog exception:", err);
  }

  const post = fallbackBlogPosts.find((b) => b.id === id);
  if (!post) return null;

  Object.assign(post, updates, { updated_at: now });
  if (updates.status === "published" && !post.published_at) {
    post.published_at = now;
    post.published_date = now.slice(0, 10);
  }
  return post;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      await supabase.from("blogs").delete().eq("id", id);
    }
  } catch (err) {
    console.error("Supabase delete blog error:", err);
  }

  const index = fallbackBlogPosts.findIndex((b) => b.id === id);
  if (index !== -1) {
    fallbackBlogPosts.splice(index, 1);
  }
  return true;
}

export async function toggleBlogStatus(
  id: string,
  newStatus: "draft" | "published"
): Promise<BlogPost | null> {
  const updates: Partial<BlogPost> = {
    status: newStatus,
  };
  if (newStatus === "published") {
    updates.published_at = new Date().toISOString();
  }
  return updateBlogPost(id, updates);
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
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        const supabaseRefs = new Set(data.map((b: any) => b.booking_reference?.toLowerCase()));
        const uniqueFallbacks = fallbackBookings.filter(
          (fb) => !supabaseRefs.has(fb.booking_reference?.toLowerCase())
        );
        const combined = [...data, ...uniqueFallbacks].sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        return combined as Booking[];
      }
    }
  } catch (err) {
    console.error("Supabase getBookings error:", err);
  }

  return [...fallbackBookings].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function getBookingByReference(reference: string): Promise<Booking | null> {
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .ilike("booking_reference", reference)
        .maybeSingle();

      if (!error && data) {
        return data as Booking;
      }
    }
  } catch (err) {
    console.error("Supabase getBookingByReference error:", err);
  }

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
  const packageName = pkg ? pkg.name : "Custom Desert Safari";

  let newBooking: Booking = {
    ...data,
    id: `bkg-${Date.now()}`,
    booking_reference,
    package_name: packageName,
    status: "pending",
    created_at: new Date().toISOString(),
  };

  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const { data: inserted, error } = await supabase
        .from("bookings")
        .insert({
          booking_reference,
          package_id: data.package_id,
          package_name: packageName,
          customer_name: data.customer_name,
          phone: data.phone,
          email: data.email || null,
          booking_date: data.booking_date,
          adults: data.adults,
          children: data.children || 0,
          pickup_location: data.pickup_location,
          hotel_name: data.hotel_name || null,
          special_requests: data.special_requests || null,
          status: "pending",
        })
        .select()
        .single();

      if (!error && inserted) {
        newBooking = {
          ...inserted,
          id: inserted.id,
        };
      } else if (error) {
        console.error("Supabase createBooking insert error:", error);
      }
    }
  } catch (err) {
    console.error("Supabase createBooking exception:", err);
  }

  fallbackBookings.unshift(newBooking);
  return newBooking;
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus,
  adminNotes?: string
): Promise<Booking | null> {
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const updates: any = {
        status,
        updated_at: new Date().toISOString(),
      };
      if (adminNotes !== undefined) {
        updates.admin_notes = adminNotes;
      }

      const { data, error } = await supabase
        .from("bookings")
        .update(updates)
        .eq("id", id)
        .select()
        .maybeSingle();

      if (!error && data) {
        const fb = fallbackBookings.find((b) => b.id === id);
        if (fb) {
          fb.status = status;
          if (adminNotes !== undefined) fb.admin_notes = adminNotes;
        }
        return data as Booking;
      }
    }
  } catch (err) {
    console.error("Supabase updateBookingStatus error:", err);
  }

  const booking = fallbackBookings.find((b) => b.id === id);
  if (!booking) return null;
  booking.status = status;
  if (adminNotes !== undefined) booking.admin_notes = adminNotes;
  booking.updated_at = new Date().toISOString();
  return booking;
}

export async function deleteBooking(id: string): Promise<boolean> {
  let deleted = false;
  try {
    const supabase = getPublicSupabase();
    if (supabase) {
      const { error } = await supabase.from("bookings").delete().eq("id", id);
      if (!error) {
        deleted = true;
      } else {
        console.error("Supabase deleteBooking error:", error);
      }
    }
  } catch (err) {
    console.error("Supabase deleteBooking exception:", err);
  }

  const index = fallbackBookings.findIndex((b) => b.id === id);
  if (index !== -1) {
    fallbackBookings.splice(index, 1);
    return true;
  }

  return deleted;
}
