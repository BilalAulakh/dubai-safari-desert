export type BookingStatus =
  | "pending"
  | "contacted"
  | "confirmed"
  | "cancelled"
  | "completed";

export type ReviewStatus = "pending" | "approved" | "rejected";
export type CommentStatus = "pending" | "approved" | "rejected";

export interface PackageInclusion {
  id?: string;
  package_id?: string;
  title: string;
  description?: string;
}

export interface PackageExclusion {
  id?: string;
  package_id?: string;
  title: string;
}

export interface PackageItineraryItem {
  id?: string;
  package_id?: string;
  time: string;
  title: string;
  description: string;
  sort_order: number;
}

export interface Package {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  price: number;
  duration: string;
  featured: boolean;
  active: boolean;
  main_image: string;
  gallery: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: PackageItineraryItem[];
  pickup_info: string;
  cancellation_policy: string;
  seo_title?: string;
  seo_description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Booking {
  id: string;
  booking_reference: string;
  package_id: string;
  package_name?: string;
  customer_name: string;
  phone: string;
  email?: string;
  booking_date: string;
  adults: number;
  children: number;
  pickup_location: string;
  hotel_name?: string;
  special_requests?: string;
  status: BookingStatus;
  admin_notes?: string;
  // Future-ready payment fields
  payment_status?: string;
  payment_method?: string;
  payment_reference?: string;
  paid_amount?: number;
  created_at: string;
  updated_at?: string;
}

export interface Activity {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  active: boolean;
  sort_order: number;
  highlights?: string[];
}

export interface PickupLocation {
  id: string;
  name: string;
  active: boolean;
  sort_order: number;
}

export interface Review {
  id: string;
  customer_name: string;
  country: string;
  email?: string;
  rating: number;
  comment: string;
  image_url?: string;
  status: ReviewStatus;
  featured: boolean;
  created_at: string;
  is_demo?: boolean;
}

export interface Comment {
  id: string;
  post_id: string;
  customer_name: string;
  email: string;
  comment: string;
  status: CommentStatus;
  created_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  active: boolean;
  sort_order: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  category: "desert" | "dune-bashing" | "camp" | "food" | "entertainment" | "activities";
  active: boolean;
  sort_order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: string;
  published_date: string;
  read_time: string;
  status: "draft" | "published";
  seo_title?: string;
  seo_description?: string;
}

export interface SiteSettings {
  id: string;
  business_name: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  google_maps_url: string;
  instagram_url: string;
  facebook_url: string;
  support_hours: string;
  logo_url: string;
  footer_description: string;
}
