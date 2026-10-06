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
      "Vernon showed up on time to my driveway in Goodyear with everything he needed — water, power, the works. The interior looks brand new and the paint has a depth I did not think was possible without a body shop. Already booked my next detail.",
  },
  {
    _id: "site-t-2",
    customerName: "Jennifer & David R.",
    rating: 5,
    vehicle: "Family SUV",
    serviceReceived: "Reset Detail",
    featured: true,
    review:
      "Kids, dogs, and Arizona dust — the Reset package was exactly what we needed in Litchfield Park. Honest about what was included, super thorough, and the SUV smells and looks incredible. Five stars without hesitation.",
  },
  {
    _id: "site-t-3",
    customerName: "Chris M.",
    rating: 5,
    vehicle: "Chevy Silverado",
    serviceReceived: "Paint Correction",
    featured: true,
    review:
      "Swirls and sun haze were killing my truck in Avondale. They walked me through photos, quoted fairly, and delivered a finish that actually turns heads. Professional from booking to the final wipe-down.",
  },
  {
    _id: "site-t-4",
    customerName: "Sandra L.",
    rating: 5,
    vehicle: "Mercedes GLE",
    serviceReceived: "Ceramic Coating",
    featured: true,
    review:
      "Ceramic coating in Buckeye — water beads like crazy and the gloss is unreal. They explained desert maintenance and were careful on every panel. This is the mobile detailer I recommend to neighbors now.",
  },
  {
    _id: "site-t-5",
    customerName: "Alejandro V.",
    rating: 5,
    vehicle: "Tesla Model 3",
    serviceReceived: "Refresh Detail",
    featured: false,
    review:
      "Refresh detail at my office — huge time saver. Wheels, glass, and interior were flawless. Factory fresh is not marketing talk; that is what I got.",
  },
  {
    _id: "site-t-6",
    customerName: "Priya K.",
    rating: 5,
    vehicle: "Honda Accord",
    serviceReceived: "Signature Foam Hand Wash",
    featured: false,
    review:
      "Booked online, got a call back the same day to confirm, and they did an amazing hand wash in my apartment garage. Fair pricing and zero hassle.",
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
      "Five stars for punctuality, professionalism, and results in Surprise. I have used mobile detailers before — this is the first time I felt the price matched the quality.",
  },
];
