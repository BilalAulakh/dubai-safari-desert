export const SITE_CONFIG = {
  name: "Safari Dune Tours",
  tagline: "Discover the Magic of the Arabian Desert",
  legalName: "Safari Dune Tours",
  title: "Safari Dune Tours | Dubai Desert Safari & Adventure Tours",
  description:
    "Explore Dubai desert safari experiences with Safari Dune Tours. Discover desert adventures, dune bashing, camel rides, sunset experiences and easy booking support.",
  url: "https://safaridunetours.com",
  ogImage: "https://safaridunetours.com/images/hero-desert.jpg",
  logo: "/images/logo-transparent.png",
  logoEmblem: "/images/logo-emblem.png",
  logoBadge: "/images/logo-badge.png",
  logoDark: "/images/logo-dark-mode.png",
  
  // Brand Color Palette
  colors: {
    primaryDark: "#17120D",
    gold: "#C89B3C",
    champagne: "#E8C48A",
    cream: "#FBF7F0",
  },
  
  // Centralized Business Contact
  contact: {
    phone: "+971 56 913 7131",
    whatsapp: "+971 56 913 7131",
    email: "muhammadakram37131@gmail.com",
    address: "Dubai, United Arab Emirates",
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
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};
