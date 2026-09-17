export const SITE_CONFIG = {
  name: "Safari Dune Tours",
  tagline: "Discover the Magic of the Arabian Desert",
  legalName: "Safari Dune Tours L.L.C.",
  title: "Safari Dune Tours | Dubai Desert Safari & Adventure Tours",
  description:
    "Explore Dubai desert safari experiences with Safari Dune Tours. Discover desert adventures, dune bashing, camel rides, sunset experiences and easy booking support.",
  url: "https://safaridunetours.com",
  ogImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
  
  // Brand Color Palette
  colors: {
    primaryDark: "#17120D",
    gold: "#C89B3C",
    champagne: "#E8C48A",
    cream: "#FBF7F0",
  },
  
  // Centralized Business Contact
  contact: {
    phone: "+971 50 123 4567",
    whatsapp: "+971 50 123 4567",
    email: "",
    address: "Downtown Dubai, Sheikh Mohammed bin Rashid Blvd, Dubai, United Arab Emirates",
    supportHours: "Open Daily: 08:00 AM – 11:00 PM (GST)",
    googleMapsUrl: "https://maps.google.com/?q=Dubai+Desert+Safari",
  },

  social: {
    instagram: "https://instagram.com/safaridunetours",
    facebook: "https://facebook.com/safaridunetours",
    tripadvisor: "https://tripadvisor.com",
  },

  // WhatsApp prefilled message templates
  whatsappTemplates: {
    general: "Hello Safari Dune Tours, I would like to know more about your desert safari packages and availability.",
    freeQuote: "Hello Safari Dune Tours, I would like to get a free quote for a Dubai desert safari.",
    packageInquiry: (packageName: string) =>
      `Hello Safari Dune Tours, I am interested in booking the "${packageName}". Could you share today's availability and details?`,
    bookingConfirmation: (reference: string, packageName: string) =>
      `Hello Safari Dune Tours, I have submitted a booking request for "${packageName}" with reference code: ${reference}. Looking forward to confirming my tour.`,
    customTour: "Hello Safari Dune Tours, I would like to request a private VIP custom desert safari experience.",
  },

  // Navigation Links
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Packages", href: "/packages" },
    { label: "Activities", href: "/activities" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Reviews", href: "/reviews" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
};
