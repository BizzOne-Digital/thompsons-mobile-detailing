export type SiteTestimonial = {
  _id: string;
  customerName: string;
  rating: number;
  review: string;
  vehicle?: string;
  serviceReceived?: string;
  featured: boolean;
};

export const SITE_TESTIMONIALS: SiteTestimonial[] = [
  {
    _id: "site-t-1",
    customerName: "Marcus T.",
    rating: 5,
    vehicle: "2022 BMW 5 Series",
    serviceReceived: "Restore Detail",
    featured: true,
    review:
      "Showed up on time to my driveway in Goodyear with everything they needed. The interior looks brand new and the paint has a depth I did not think was possible without a body shop. Will book again.",
  },
  {
    _id: "site-t-2",
    customerName: "Jennifer & David R.",
    rating: 5,
    vehicle: "Family SUV",
    serviceReceived: "Reset Detail",
    featured: true,
    review:
      "We had kids, dogs, and Arizona dust working against us. Thompson's team was professional, thorough, and honest about what the Reset package would cover. The van smells and looks incredible.",
  },
  {
    _id: "site-t-3",
    customerName: "Alejandro V.",
    rating: 5,
    vehicle: "Tesla Model 3",
    serviceReceived: "Refresh Detail",
    featured: true,
    review:
      "Fully mobile service at my office in Phoenix — huge time saver. Attention to detail on the wheels, glass, and interior was top notch. Factory fresh is not marketing talk; that is what I got.",
  },
  {
    _id: "site-t-4",
    customerName: "Priya K.",
    rating: 5,
    vehicle: "Honda Accord",
    serviceReceived: "Signature Foam Hand Wash",
    featured: true,
    review:
      "Booked online, got a call back the same day to confirm, and they did an amazing hand wash in my apartment garage. Fair pricing and zero hassle.",
  },
  {
    _id: "site-t-5",
    customerName: "Chris M.",
    rating: 5,
    vehicle: "Chevy Silverado",
    serviceReceived: "Paint Correction",
    featured: false,
    review:
      "Swirls and haze from years of sun were killing the look of my truck. They walked me through custom quote photos and delivered a finish that turns heads in Avondale.",
  },
  {
    _id: "site-t-6",
    customerName: "Sandra L.",
    rating: 5,
    vehicle: "Mercedes GLE",
    serviceReceived: "Ceramic Coating",
    featured: false,
    review:
      "Water beads like crazy after the ceramic coating and the gloss is unreal. They explained maintenance and were careful around every panel. Highly recommend for desert heat protection.",
  },
  {
    _id: "site-t-7",
    customerName: "Tyler W.",
    rating: 5,
    vehicle: "Ford F-150",
    serviceReceived: "Restore Detail + Pet Hair",
    featured: false,
    review:
      "Pet hair was everywhere. They got it out of the carpets and seats and the whole cab feels like a new truck. Communication was clear from booking to finish.",
  },
  {
    _id: "site-t-8",
    customerName: "Elena G.",
    rating: 5,
    vehicle: "Toyota Camry",
    serviceReceived: "Refresh Detail",
    featured: false,
    review:
      "Five stars for punctuality, professionalism, and results. I have used mobile detailers before — this is the first time I felt the price matched the quality.",
  },
];
