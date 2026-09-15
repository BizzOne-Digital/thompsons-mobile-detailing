export const BRAND = {
  name: "Thompson's Mobile Detailing AZ",
  tagline: "Factory Fresh Results Guaranteed",
  headline:
    "Professional Mobile Auto Detailing in Avondale and Across the Phoenix Metro",
  phone: "623-999-7500",
  phoneHref: "tel:+16239997500",
  smsHref: "sms:+16239997500",
  email: "thompsonsdetailing1@gmail.com",
  hours: "Monday through Sunday, 5:00 AM to 5:00 PM",
};

export const SERVICE_AREAS = [
  "Buckeye",
  "Goodyear",
  "Avondale",
  "Litchfield Park",
  "Surprise",
  "Phoenix",
  "Scottsdale",
  "Glendale",
  "Peoria",
  "San Tan Valley",
  "Gilbert",
  "Mesa",
  "Chandler",
  "Surrounding Valley areas",
];

export const VEHICLE_TYPES = [
  { id: "sedan", label: "Sedan or Small Car" },
  { id: "midsize", label: "Midsize SUV or Small Truck" },
  { id: "large", label: "Large SUV or Full-Size Truck" },
] as const;

export type VehicleTypeId = (typeof VEHICLE_TYPES)[number]["id"];

export const BOOKING_STATUSES = [
  "New",
  "Pending Review",
  "Contacted",
  "Confirmed",
  "Rescheduled",
  "In Progress",
  "Completed",
  "Cancelled",
  "No Show",
] as const;

export const GALLERY_CATEGORIES = [
  "Interior",
  "Exterior",
  "Paint Correction",
  "Ceramic Coating",
  "Headlights",
  "Carpets and Seats",
] as const;

/** Desktop header nav (matches marketing hero mockup). */
export const HEADER_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/results", label: "Results" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export const NAV_LINKS = [
  ...HEADER_NAV_LINKS,
  { href: "/blog", label: "Blog" },
] as const;

export const SESSION_COOKIE = "tmd_admin_session";
export const INTRO_STORAGE_KEY = "tmd_intro_seen";
