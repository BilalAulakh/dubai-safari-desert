import { Review } from "@/types";

export const initialReviews: Review[] = [
  {
    id: "rev-1",
    customer_name: "Sarah Jenkins",
    country: "United Kingdom",
    email: "sarah.j@example.com",
    rating: 5,
    comment:
      "The evening desert safari exceeded all our expectations! The dune bashing was thrilling yet felt completely safe with our driver Rashid. The BBQ dinner was delicious and the fire show under the night sky was spectacular.",
    status: "approved",
    featured: true,
    created_at: "2026-08-15T16:20:00Z",
    is_demo: true,
  },
  {
    id: "rev-2",
    customer_name: "Marco Rossi",
    country: "Italy",
    email: "m.rossi@example.com",
    rating: 5,
    comment:
      "We booked the VIP Private Safari for my family of four. Booking was effortless over WhatsApp, pickup arrived exactly on time, and having our private Land Cruiser made the experience so comfortable for the kids.",
    status: "approved",
    featured: true,
    created_at: "2026-08-20T11:45:00Z",
    is_demo: true,
  },
  {
    id: "rev-3",
    customer_name: "Elena Rostova",
    country: "Germany",
    email: "elena.rostova@example.com",
    rating: 5,
    comment:
      "Stunning sunset photography and camel ride. The sandboarding was so much fun! Clean camp facilities, friendly staff, and very tasty vegetarian dishes at the buffet. Highly recommended.",
    status: "approved",
    featured: true,
    created_at: "2026-08-28T19:10:00Z",
    is_demo: true,
  },
  {
    id: "rev-4",
    customer_name: "David Miller",
    country: "Australia",
    email: "dmiller@example.com",
    rating: 5,
    comment:
      "Did the Morning Desert Safari because we had an evening flight. The dawn light on the red dunes is breathtaking. Smooth pickup and quick response on WhatsApp. 10/10 service!",
    status: "approved",
    featured: false,
    created_at: "2026-09-01T08:30:00Z",
    is_demo: true,
  },
  {
    id: "rev-5",
    customer_name: "Fatima Al-Khatib",
    country: "Saudi Arabia",
    email: "fatima.k@example.com",
    rating: 5,
    comment:
      "Exceptional Arabian hospitality. The Tanoura dancer was mesmerising and the traditional Arabic coffee was authentic. Best desert safari operator in Dubai.",
    status: "approved",
    featured: true,
    created_at: "2026-09-03T18:00:00Z",
    is_demo: true,
  },
];
