export const SITE_CONFIG = {
  name: "DubaiSafariDesert",
  legalName: "Dubai Safari Desert Tourism L.L.C.",
  title: "Dubai Safari Desert | Premium Desert Safari Tours & Adventures in Dubai",
  description:
    "Experience Dubai's most authentic desert safari adventures. Enjoy thrilling dune bashing, camel rides, sandboarding, BBQ dinner buffets, and traditional live entertainment under Arabian stars.",
  url: "https://dubaisafaridesert.com",
  ogImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
  
  // Centralized Business Contact
  contact: {
    phone: "+971 50 123 4567",
    whatsapp: "+971 50 123 4567",
    email: "info@dubaisafaridesert.com",
    address: "Downtown Dubai, Sheikh Mohammed bin Rashid Blvd, Dubai, United Arab Emirates",
    supportHours: "Open Daily: 08:00 AM – 11:00 PM (GST)",
    googleMapsUrl: "https://maps.google.com/?q=Dubai+Desert+Safari",
  },

  social: {
    instagram: "https://instagram.com/dubaisafaridesert",
    facebook: "https://facebook.com/dubaisafaridesert",
    tripadvisor: "https://tripadvisor.com",
  },

  // WhatsApp prefilled message templates
  whatsappTemplates: {
    general: "Hello DubaiSafariDesert, I would like to know more about your desert safari packages and availability.",
    packageInquiry: (packageName: string) =>
      `Hello DubaiSafariDesert, I am interested in booking the "${packageName}". Could you share today's availability and details?`,
    bookingConfirmation: (reference: string, packageName: string) =>
      `Hello DubaiSafariDesert, I have submitted a booking request for "${packageName}" with reference code: ${reference}. Looking forward to confirming my tour.`,
    customTour: "Hello DubaiSafariDesert, I would like to request a private VIP custom desert safari experience.",
  },

  // Navigation Links
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Safari Packages", href: "/packages" },
    { label: "Activities", href: "/activities" },
    { label: "About Us", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Reviews", href: "/reviews" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
};
