import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import StoreProvider from "@/lib/redux/StoreProvider";
import { SITE_CONFIG } from "@/lib/config/site";
import { toInternationalPhone } from "@/lib/utils";

// One typeface across the whole site; headings differ only by weight and tracking
const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

// Display serif for headlines and prices only
const fontDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#17120D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    // Page titles already end with the brand name, so no suffix is appended here
    template: "%s",
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Dubai Desert Safari",
    "Desert Safari Dubai",
    "Dubai Desert Safari Booking",
    "Evening Desert Safari Dubai",
    "Morning Desert Safari Dubai",
    "Overnight Desert Safari Dubai",
    "Private Desert Safari Dubai",
    "Dune Bashing Dubai",
    "Camel Ride Dubai",
    "Quad Bike Dubai",
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: "Dubai Desert Safari Adventures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data (JSON-LD) for Organization, WebSite, TravelAgency & TouristAttraction
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_CONFIG.url}#organization`,
        name: SITE_CONFIG.name,
        legalName: SITE_CONFIG.legalName,
        url: SITE_CONFIG.url,
        logo: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
        description: SITE_CONFIG.description,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: toInternationalPhone(SITE_CONFIG.contact.phone),
          contactType: "customer service",
          areaServed: "AE",
          availableLanguage: ["English", "Arabic"],
        },
        sameAs: [
          SITE_CONFIG.social.instagram,
          SITE_CONFIG.social.facebook,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_CONFIG.url}#website`,
        url: SITE_CONFIG.url,
        name: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        publisher: {
          "@id": `${SITE_CONFIG.url}#organization`,
        },
      },
      {
        "@type": ["TravelAgency", "LocalBusiness"],
        "@id": `${SITE_CONFIG.url}#business`,
        name: SITE_CONFIG.name,
        legalName: SITE_CONFIG.legalName,
        url: SITE_CONFIG.url,
        logo: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
        image: SITE_CONFIG.ogImage,
        telephone: toInternationalPhone(SITE_CONFIG.contact.phone),
        email: SITE_CONFIG.contact.email,
        priceRange: "AED 130 - AED 950",
        currenciesAccepted: "AED, USD, EUR, GBP",
        paymentAccepted: "Cash, Credit Card, Debit Card, Online Payment Link",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dubai",
          addressRegion: "Dubai",
          addressCountry: "AE",
        },
        areaServed: { "@type": "City", name: "Dubai" },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "08:00",
          closes: "23:00",
        },
      },
      {
        "@type": "TouristAttraction",
        "@id": `${SITE_CONFIG.url}#attraction`,
        name: "Safari Dune Tours - Dubai Desert Safari Adventures",
        description: SITE_CONFIG.description,
        url: SITE_CONFIG.url,
        touristType: ["Adventure Tourism", "Cultural Tourism", "Family Friendly"],
      },
    ],
  };

  return (
    <html lang="en" className={`${fontSans.variable} ${fontDisplay.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){document.documentElement.classList.add("js");try{var t=localStorage.getItem("dsd_theme")||"dark";if(t==="dark"){document.documentElement.classList.add("dark")}else{document.documentElement.classList.remove("dark")}}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-main)] font-sans antialiased selection:bg-[#C89B3C] selection:text-[#17120D]`}>
        <StoreProvider>
          <ThemeProvider>
            <AppShell footer={<Footer />}>{children}</AppShell>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
