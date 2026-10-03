/**
 * Unique on-page copy per city — avoid repeating the same template with only the city swapped.
 */

export type AreaServiceLink = {
  slug: string;
  label: string;
};

export type AreaPageCopy = {
  /** Primary H1 / hero title — city name should appear early */
  h1: string;
  /** Meta title (before | brand suffix in buildMetadata) */
  metaTitle: string;
  metaDescription: string;
  /** Short hero subtitle under H1 */
  heroSubtitle: string;
  /** Opening paragraphs (unique per city) */
  intro: string[];
  /** At-home / mobile positioning */
  mobileBlock: string;
  /** Interior-focused section */
  interiorHeading: string;
  interiorBody: string;
  interiorLinks: AreaServiceLink[];
  /** Exterior-focused section */
  exteriorHeading: string;
  exteriorBody: string;
  exteriorLinks: AreaServiceLink[];
  /** Package blurbs — branded names + search language */
  refreshBlurb: string;
  restoreBlurb: string;
  resetBlurb: string;
  /** Honest local relevance — projects, terrain, neighborhoods */
  localProof: string;
  nearbySlugs: string[];
};

function refreshText(city: string) {
  return `Refresh Detail is the seasonal mobile car detailing package ${city} drivers book when the vehicle is in fair shape but needs a thorough inside-and-out reset — wash, vacuum, wipe-down, and light renewal without a full restoration.`;
}
function restoreText(city: string) {
  return `Restore Detail lines up with interior detailing, carpet and seat cleaning, stain removal, and deeper exterior recovery — built for ${city} dust, UV, and daily wear that a quick wash cannot fix.`;
}
function resetText(city: string) {
  return `Reset Detail is our deepest plan: neglected interiors, heavy pet hair, odor treatment, and serious buildup — the interior and exterior reset ${city} customers ask for when the cabin or paint has been pushed too long.`;
}

export const AREA_PAGE_COPY: Record<string, AreaPageCopy> = {
  "avondale-az": {
    h1: "Mobile Car Detailing in Avondale, AZ",
    metaTitle: "Mobile Detailing Avondale AZ | Car & Auto Detailing at Your Home",
    metaDescription:
      "Mobile detailing in Avondale, AZ — interior & exterior auto detailing at your driveway. Deep interior cleaning, pet hair, paint correction, ceramic coating. Book Refresh, Restore, or Reset.",
    heroSubtitle:
      "We come to you across Avondale and the West Valley with full mobile auto detailing — factory-fresh results at home or work.",
    intro: [
      "Avondale sits at the heart of the West Valley commute corridor, which means brake dust, construction grit, and baked-on Arizona sun show up fast on paint and interiors. Thompson's Mobile Detailing AZ is built for drivers who want true mobile car detailing at their Avondale home, office, or job site — not a tunnel wash that misses door jambs, pet hair, and swirl-prone clear coat.",
      "Whether you are near Old Town, along McDowell, or in newer neighborhoods off the 303, we bring water, power, and professional-grade products to you. Search terms like mobile auto detailing, interior detailing, and full detail all describe what we deliver in one appointment: structured packages plus targeted add-ons when your vehicle needs more than maintenance.",
    ],
    mobileBlock:
      "Every visit is at-home detailing: we set up on your driveway or approved parking area in Avondale so you can get back to your day while we handle exterior detailing, interior vacuum and wipe-down, and the deeper steps included in your chosen package.",
    interiorHeading: "Interior detailing & deep cleaning in Avondale",
    interiorBody:
      "Cabins here collect dust from open windows, kids' snacks, and pet hair that clings to static-charged cloth. We offer fabric seat and carpet shampoo and extraction, leather cleaning and conditioning, odor removal, and headliner-safe stain work — the deep interior cleaning Avondale customers request before selling a vehicle or heading into summer.",
    interiorLinks: [
      { slug: "fabric-seat-carpet-shampoo", label: "Carpet & seat shampoo / extraction" },
      { slug: "pet-hair-removal", label: "Pet hair removal" },
      { slug: "interior-odor-treatment", label: "Odor removal" },
      { slug: "leather-and-carpet-deep-clean", label: "Leather cleaning & conditioning" },
    ],
    exteriorHeading: "Exterior detailing, paint correction & protection",
    exteriorBody:
      "Rough paint after washing usually means embedded contamination — not a bad hose job. Clay bar decontamination, swirl and oxidation removal through paint correction, headlight restoration, and ceramic coating or sealant protection are available as add-ons or paired with Restore and Reset packages for Avondale drivers who want gloss that lasts through monsoon season.",
    exteriorLinks: [
      { slug: "clay-bar-decontamination", label: "Clay bar & paint decontamination" },
      { slug: "paint-correction", label: "Paint correction" },
      { slug: "ceramic-coating", label: "Ceramic coating" },
      { slug: "headlight-restoration", label: "Headlight restoration" },
    ],
    refreshBlurb: refreshText("Avondale"),
    restoreBlurb: restoreText("Avondale"),
    resetBlurb: resetText("Avondale"),
    localProof:
      "We regularly detail in Avondale driveways and West Valley workplaces — from daily drivers to show trucks. See real results on our gallery and testimonials pages, including Avondale clients who booked paint correction and full interior resets.",
    nearbySlugs: ["goodyear-az", "tolleson-az", "litchfield-park-az"],
  },

  "litchfield-park-az": {
    h1: "Mobile Auto Detailing in Litchfield Park, AZ",
    metaTitle: "Mobile Detailing Litchfield Park AZ | At-Home Car Detailing",
    metaDescription:
      "Mobile car detailing in Litchfield Park — interior detailing, exterior detailing, ceramic coating & paint correction at your home. Refresh, Restore, Reset packages. We come to you.",
    heroSubtitle:
      "Luxury homes and golf-community schedules deserve mobile detailing that respects your property and your time.",
    intro: [
      "Litchfield Park vehicles often live outdoors near fairways and resort-style landscaping — pollen, irrigation mist, and fine dust work into trim and glass. Our mobile auto detailing team arrives with contained setup and clear communication so your Litchfield Park driveway stays tidy while we restore the cabin and exterior.",
      "Clients here frequently ask for interior detailing that handles light-colored leather, carpet extraction after guests, and exterior detailing that brings back depth on darker paints without aggressive shortcuts.",
    ],
    mobileBlock:
      "We come to you in Wigwam Creek, Dreaming Summit, and throughout Litchfield Park — true at-home car detailing with professional extraction, hand wash, and protection options.",
    interiorHeading: "Deep interior cleaning & stain removal",
    interiorBody:
      "Spills, sunscreen, and pet traffic show on bolsters and second-row seats. Restore Detail and add-ons like fabric shampoo, odor treatment, and interior ceramic protection match how Litchfield Park owners search: deep interior cleaning, stain removal, and odor removal without hauling the car across town.",
    interiorLinks: [
      { slug: "restore-detail", label: "Restore Detail (interior + exterior recovery)" },
      { slug: "fabric-seat-carpet-shampoo", label: "Seat & carpet extraction" },
      { slug: "interior-ceramic-protection", label: "Interior ceramic protection" },
      { slug: "interior-odor-treatment", label: "Odor treatment" },
    ],
    exteriorHeading: "Full detail, wax & ceramic coating",
    exteriorBody:
      "Sun-facing garages are not always available — so paint and trim take a beating. We pair hand wash and decontamination with wax or sealant options, paint correction for swirls, and ceramic coating for owners who want easier maintenance washes after a full detail.",
    exteriorLinks: [
      { slug: "ceramic-coating", label: "Ceramic coating Arizona" },
      { slug: "paint-correction", label: "Swirl & oxidation correction" },
      { slug: "water-spot-glass-restoration", label: "Water spot & glass decontamination" },
      { slug: "wheel-tire-well-cleaning", label: "Wheel & wheel-well cleaning" },
    ],
    refreshBlurb: refreshText("Litchfield Park"),
    restoreBlurb: restoreText("Litchfield Park"),
    resetBlurb: resetText("Litchfield Park"),
    localProof:
      "Litchfield Park clients often book before travel season or home events — we document condition with photos when needed and tie recommendations to your actual paint and interior, not a generic menu.",
    nearbySlugs: ["goodyear-az", "avondale-az", "buckeye-az"],
  },

  "goodyear-az": {
    h1: "Mobile Car Detailing in Goodyear, AZ",
    metaTitle: "Mobile Detailing Goodyear AZ | Interior & Exterior Auto Detail",
    metaDescription:
      "Goodyear mobile detailing at your home — car detailing, deep interior cleaning, pet hair removal, paint correction & ceramic coating. Estrella, Palm Valley & West Valley.",
    heroSubtitle:
      "From Estrella to Palm Valley, we bring mobile car detailing and full auto detailing to your curb.",
    intro: [
      "Goodyear's mix of master-planned communities and open desert roads means vehicles pick up both fine dust and road film on the daily run toward the 303 or I-10. Thompson's Mobile Detailing AZ offers mobile detailing Goodyear families can schedule around school drop-offs and shift work — we handle the detail while you stay home.",
      "Search intent in Goodyear often blends car detailing with practical needs: pet hair removal after desert hikes, carpet shampoo after sports gear, and exterior detailing before listing a home with a sharp-looking daily driver in the driveway.",
    ],
    mobileBlock:
      "Power, water, and pro-grade chemistry arrive in our mobile unit — at-home detailing in Goodyear without you waiting in a shop lobby.",
    interiorHeading: "Interior detailing & carpet cleaning",
    interiorBody:
      "Hot-cabin months bake odors into vents and carpets. Our Restore and Reset packages cover the interior detailing searches you care about — extraction, stain removal, plastics restoration, and optional odor removal — plus engine bay cleaning when you want the whole presentation sharp for a sale.",
    interiorLinks: [
      { slug: "reset-detail", label: "Reset Detail (heavy interior & exterior)" },
      { slug: "pet-hair-removal", label: "Pet hair removal" },
      { slug: "interior-plastic-trim-restoration", label: "Interior plastics restoration" },
      { slug: "engine-bay-detail", label: "Engine bay cleaning" },
    ],
    exteriorHeading: "Exterior detailing & paint protection",
    exteriorBody:
      "Goodyear sun is relentless on clear coat and headlights. Add clay bar treatment, paint correction, headlight restoration, and ceramic coating when washing alone will not bring back gloss — we explain what your paint actually needs before quoting correction.",
    exteriorLinks: [
      { slug: "clay-bar-decontamination", label: "Clay bar decontamination" },
      { slug: "headlight-restoration", label: "Headlight restoration" },
      { slug: "exterior-trim-restoration", label: "Exterior trim restoration" },
      { slug: "paint-correction", label: "Paint correction" },
    ],
    refreshBlurb: refreshText("Goodyear"),
    restoreBlurb: restoreText("Goodyear"),
    resetBlurb: resetText("Goodyear"),
    localProof:
      "Goodyear is one of our most active routes — testimonials mention driveway service in Goodyear with full interior transformation and paint that finally looks deep again after Arizona summers.",
    nearbySlugs: ["avondale-az", "litchfield-park-az", "buckeye-az"],
  },

  "buckeye-az": {
    h1: "Mobile Detailing in Buckeye, AZ — We Come to You",
    metaTitle: "Mobile Detailing Buckeye AZ | Car Detailing at Home",
    metaDescription:
      "Buckeye AZ mobile auto detailing — dust, pet hair, interior deep clean, exterior detail, ceramic coating. Verrado, Sundance & far West Valley. Book online.",
    heroSubtitle:
      "Far-west Valley dust and new-build neighborhoods — we detail where you park in Buckeye.",
    intro: [
      "Buckeye drivers cover more miles on dry, dusty roads than almost anywhere in the metro. That shows up as hazy paint, packed wheel wells, and interiors that need real extraction — not a quick vacuum. Mobile detailing in Buckeye should mean a team that understands caliche dust and monsoon mud, and that is how we approach every job.",
      "Whether you are in Verrado, Sundance, or along Watson, we provide mobile car detailing and full auto detailing at your address so you are not driving a dirty vehicle across the Valley for a shop appointment.",
    ],
    mobileBlock:
      "We come to you in Buckeye with self-contained setup — mobile auto detailing that fits new construction driveways, RV pads, and wide rural lots.",
    interiorHeading: "Deep interior cleaning & odor removal",
    interiorBody:
      "Dogs, job-site boots, and farm-adjacent dust create the neglected interiors Reset Detail was designed for: heavy pet hair, odor removal, carpet and seat shampoo, and thorough crevice work. Restore Detail is the middle ground when staining and fading are noticeable but not extreme.",
    interiorLinks: [
      { slug: "pet-hair-removal", label: "Pet hair removal" },
      { slug: "fabric-seat-carpet-shampoo", label: "Carpet & seat shampoo" },
      { slug: "interior-odor-treatment", label: "Odor removal" },
      { slug: "reset-detail", label: "Reset Detail" },
    ],
    exteriorHeading: "Exterior detail & decontamination",
    exteriorBody:
      "Clay bar and decontamination remove embedded grit before polish or coating. Buckeye clients often pair a full hand wash with wheel and wheel-well cleaning, headlight restoration, and paint correction when sun fade and swirls finally warrant correction.",
    exteriorLinks: [
      { slug: "signature-foam-hand-wash", label: "Professional hand wash" },
      { slug: "clay-bar-decontamination", label: "Clay bar treatment" },
      { slug: "wheel-tire-well-cleaning", label: "Wheel & tire cleaning" },
      { slug: "ceramic-coating", label: "Ceramic coating" },
    ],
    refreshBlurb: refreshText("Buckeye"),
    restoreBlurb: restoreText("Buckeye"),
    resetBlurb: resetText("Buckeye"),
    localProof:
      "West Valley routes include Buckeye weekly — ideal for recurring maintenance washes or a one-time Reset before selling a home in a fast-growing community.",
    nearbySlugs: ["goodyear-az", "waddell-az", "surprise-az"],
  },

  "surprise-az": {
    h1: "Mobile Car Detailing in Surprise, AZ",
    metaTitle: "Mobile Detailing Surprise AZ | Auto Detailing at Your Driveway",
    metaDescription:
      "Surprise mobile detailing — interior detailing, exterior detailing, pet hair, ceramic coating & paint correction. Sun City border & Northwest Valley. Book Refresh, Restore, Reset.",
    heroSubtitle:
      "Northwest Valley mobile detailing for Surprise, Sun City borders, and active retirement communities.",
    intro: [
      "Surprise blends active adult communities with young families — and both groups want trustworthy mobile car detailing without shop wait times. We detail at your Surprise home with clear pricing through Refresh, Restore, and Reset packages plus optional add-ons.",
      "Common Surprise searches include interior detailing for spilled coffee and pet hair, exterior detailing for garage-kept cars that still fade in Arizona sun, and headlight restoration for safer night driving to the 303.",
    ],
    mobileBlock:
      "At-home detailing in Surprise — we work in driveways, carports, and community lots where HOA rules allow mobile vendors.",
    interiorHeading: "Interior detailing for Surprise drivers",
    interiorBody:
      "From cloth extraction to leather conditioning and odor treatment, we match service names to how you search: deep interior cleaning, stain removal, and carpet shampoo with professional equipment — not a handheld shop vacuum.",
    interiorLinks: [
      { slug: "leather-and-carpet-deep-clean", label: "Leather & carpet deep clean" },
      { slug: "fabric-seat-carpet-shampoo", label: "Fabric seat shampoo" },
      { slug: "interior-odor-treatment", label: "Interior odor treatment" },
      { slug: "restore-detail", label: "Restore Detail package" },
    ],
    exteriorHeading: "Full exterior detail & protection",
    exteriorBody:
      "Hand wash, decon, and protection keep Surprise vehicles ready for golf mornings and grandkid visits. Paint correction and ceramic coating are popular when owners plan to keep a vehicle long-term in the desert climate.",
    exteriorLinks: [
      { slug: "paint-correction", label: "Paint correction" },
      { slug: "ceramic-coating", label: "Ceramic coating" },
      { slug: "headlight-restoration", label: "Headlight restoration" },
      { slug: "recurring-maintenance-wash", label: "Recurring maintenance wash" },
    ],
    refreshBlurb: refreshText("Surprise"),
    restoreBlurb: restoreText("Surprise"),
    resetBlurb: resetText("Surprise"),
    localProof:
      "Surprise and adjacent Sun City areas are core service routes — many clients rebook seasonal Refresh details after winter travel.",
    nearbySlugs: ["sun-city-az", "glendale-az", "avondale-az"],
  },
};

type SecondaryOpts = {
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1?: string;
  heroSubtitle: string;
  intro: [string, string];
  mobileBlock: string;
  interiorBody: string;
  exteriorBody: string;
  localProof: string;
  nearbySlugs: string[];
  interiorHeading?: string;
  exteriorHeading?: string;
};

function secondaryArea(opts: SecondaryOpts): AreaPageCopy {
  const { name } = opts;
  return {
    h1: opts.h1 ?? `Mobile Detailing in ${name}, AZ`,
    metaTitle: opts.metaTitle,
    metaDescription: opts.metaDescription,
    heroSubtitle: opts.heroSubtitle,
    intro: opts.intro,
    mobileBlock: opts.mobileBlock,
    interiorHeading: opts.interiorHeading ?? `Interior detailing in ${name}`,
    interiorBody: opts.interiorBody,
    interiorLinks: [
      { slug: "fabric-seat-carpet-shampoo", label: "Carpet & seat shampoo" },
      { slug: "pet-hair-removal", label: "Pet hair removal" },
      { slug: "restore-detail", label: "Restore Detail" },
      { slug: "reset-detail", label: "Reset Detail" },
    ],
    exteriorHeading: opts.exteriorHeading ?? `Exterior detailing in ${name}`,
    exteriorBody: opts.exteriorBody,
    exteriorLinks: [
      { slug: "clay-bar-decontamination", label: "Clay bar decontamination" },
      { slug: "paint-correction", label: "Paint correction" },
      { slug: "ceramic-coating", label: "Ceramic coating" },
      { slug: "headlight-restoration", label: "Headlight restoration" },
    ],
    refreshBlurb: refreshText(name),
    restoreBlurb: restoreText(name),
    resetBlurb: resetText(name),
    localProof: opts.localProof,
    nearbySlugs: opts.nearbySlugs,
  };
}

const SECONDARY_AREAS: Record<string, AreaPageCopy> = {
  "waddell-az": secondaryArea({
    name: "Waddell",
    metaTitle: "Mobile Detailing Waddell AZ | At-Home Auto Detailing",
    metaDescription:
      "Waddell mobile car detailing on your property — interior deep clean, pet hair, exterior detail, engine bay. West Valley mobile auto detailing. Book online.",
    heroSubtitle: "Northwest of the 303 — we detail on rural driveways and suburban streets alike.",
    intro: [
      "Waddell sits between open desert and fast-growing suburbs, so vehicles pick up fine dust on every trip toward Surprise or Buckeye. Our mobile detailing team treats that as normal Arizona wear — not something a five-minute wash fixes.",
      "We bring full auto detailing to Waddell addresses with Refresh for maintenance, Restore for staining and fading, and Reset when pet hair, odors, or neglected interiors need a true restoration.",
    ],
    mobileBlock:
      "We come to you in Waddell with self-contained mobile car detailing — no shop drop-off, no waiting room.",
    interiorBody:
      "Carpet and seat shampoo, leather conditioning, odor removal, and plastics restoration are booked most often before selling a home or after muddy weekend projects.",
    exteriorBody:
      "Exterior detailing covers foam hand wash, wheels, and optional clay bar treatment; paint correction and ceramic coating are quoted when swirls and sun fade need professional correction.",
    localProof:
      "Waddell is on our West Valley rotation with Buckeye and Surprise — see testimonials and gallery photos for recent Valley projects.",
    nearbySlugs: ["surprise-az", "buckeye-az", "glendale-az"],
  }),
  "glendale-az": secondaryArea({
    name: "Glendale",
    metaTitle: "Mobile Detailing Glendale AZ | Car Detailing Near You",
    metaDescription:
      "Glendale AZ mobile detailing — interior detailing, full detail, paint correction, ceramic coating at your home. Arrowhead, Westgate & central Glendale.",
    heroSubtitle: "From Arrowhead to historic districts — mobile auto detailing across Glendale.",
    intro: [
      "Glendale drivers stack miles on stadium weekends, school runs, and crosstown commutes. That shows up as ticket dust on interiors and road film on bumpers. Mobile car detailing in Glendale should fit your calendar, not the other way around.",
      "We link branded Refresh, Restore, and Reset packages to the services people actually search — interior detailing, deep interior cleaning, exterior detailing, and paint correction — with add-ons when you need headlight restoration or engine bay cleaning.",
    ],
    mobileBlock:
      "At-home detailing in Glendale: driveway, apartment guest parking (where permitted), or workplace — we bring water, power, and pro products.",
    interiorBody:
      "Stain removal, extraction, and odor treatment are common before family visits and holidays; Restore Detail is the sweet spot for cloth and leather that has seen a full Arizona summer.",
    exteriorBody:
      "Full detail visits include decontamination options for rough paint, plus wheel and wheel-well cleaning. Ceramic coating follows paint correction when you want long-term gloss in Glendale sun.",
    localProof:
      "Glendale clients book us for seasonal Refresh details and pre-sale Resets — results photos live on our results page with West Valley and central Valley work.",
    nearbySlugs: ["phoenix-az", "surprise-az", "tolleson-az"],
  }),
  "tolleson-az": secondaryArea({
    name: "Tolleson",
    metaTitle: "Mobile Detailing Tolleson AZ | Mobile Car Detailing",
    metaDescription:
      "Tolleson mobile auto detailing at your door — car detailing, interior cleaning, pet hair removal, exterior wash & ceramic coating. Book Refresh, Restore, Reset.",
    heroSubtitle: "Industrial corridors and residential streets — we detail where Tolleson residents park.",
    intro: [
      "Tolleson vehicles often see warehouse districts, construction traffic, and quick hops to I-10 — a recipe for dusty dashboards and grimy lower doors. Thompson's provides mobile detailing Tolleson workers and families can schedule before or after shifts.",
      "Search-friendly services — mobile auto detailing, interior detailing, stain removal, and full detail — map directly to our packages so you know what you are buying.",
    ],
    mobileBlock:
      "Mobile car detailing in Tolleson means we set up at your home or approved job-site parking with contained runoff and professional equipment.",
    interiorBody:
      "Deep interior cleaning and carpet shampoo tackle work boots, lunch spills, and pet hair; Reset Detail is there when the cabin has been ignored too long.",
    exteriorBody:
      "Hand wash, clay bar decontamination, and headlight restoration refresh daily drivers; paint correction is available when oxidation and swirls are beyond a single-stage wash.",
    localProof:
      "Tolleson sits between Avondale and Phoenix routes — easy to book alongside neighboring West Valley cities.",
    nearbySlugs: ["avondale-az", "phoenix-az", "glendale-az"],
  }),
  "phoenix-az": secondaryArea({
    name: "Phoenix",
    h1: "Mobile Car Detailing in Phoenix, AZ",
    metaTitle: "Mobile Detailing Phoenix AZ | At-Home Auto Detailing",
    metaDescription:
      "Phoenix mobile detailing — interior & exterior auto detailing we bring to you. Deep cleaning, paint correction, ceramic coating, pet hair. Citywide Valley service.",
    heroSubtitle: "America's fifth-largest city — we bring mobile detailing to your Phoenix address.",
    intro: [
      "Phoenix is too big for one generic pitch: a downtown high-rise garage, a Arcadia driveway, and a Maryvale carport all need different setup — but the same factory-fresh standard. We provide mobile car detailing across Phoenix with packages scaled to your vehicle's condition.",
      "Whether you search mobile detailing, car detailing, or interior detailing, the outcome is the same: structured Refresh, Restore, or Reset service with honest add-ons for paint correction, ceramic coating, and odor removal.",
    ],
    mobileBlock:
      "We come to you in Phoenix — true at-home auto detailing with professional extraction, hand wash, and protection options.",
    interiorBody:
      "Phoenix heat bakes spills into carpets and fades plastics; Restore and Reset packages cover extraction, stain removal, pet hair, and odor treatment with equipment that reaches under seats and into vents.",
    exteriorBody:
      "Exterior detailing includes decontamination for gritty paint, swirl removal through paint correction, and sealant or ceramic coating when you want easier maintenance in desert sun.",
    localProof:
      "Phoenix-wide service ties into our Valley routes — read Google reviews mentioning driveway details across the metro.",
    nearbySlugs: ["glendale-az", "tolleson-az", "north-phoenix-az"],
  }),
  "north-phoenix-az": secondaryArea({
    name: "North Phoenix",
    metaTitle: "Mobile Detailing North Phoenix AZ | Car Detailing at Home",
    metaDescription:
      "North Phoenix mobile detailing — Desert Ridge, Deer Valley & Norterra. Interior detailing, full detail, ceramic coating. We come to your driveway.",
    heroSubtitle: "Desert Ridge, Deer Valley, and Norterra — north Valley mobile auto detailing.",
    intro: [
      "North Phoenix combines freeway commutes and desert-edge dust storms. Vehicles here need mobile auto detailing that addresses both — interior dust in vents and rock chips on lower panels.",
      "We serve North Phoenix with the same Refresh, Restore, and Reset framework used across the Valley, emphasizing deep interior cleaning when monsoon mud and summer dust load the carpets.",
    ],
    mobileBlock:
      "At-home car detailing in North Phoenix — we work in driveways and communities where mobile vendors are permitted.",
    interiorBody:
      "Carpet and seat shampoo, leather care, and interior ceramic protection are popular with families and commuters who want a healthier cabin after allergy season.",
    exteriorBody:
      "Clay bar treatment, water spot removal on glass, and ceramic coating follow a proper wash when paint feels rough or dull.",
    localProof:
      "North Phoenix appointments often pair with Cave Creek and Anthem routes on the same service days.",
    nearbySlugs: ["phoenix-az", "anthem-az", "cave-creek-az"],
  }),
  "cave-creek-az": secondaryArea({
    name: "Cave Creek",
    metaTitle: "Mobile Detailing Cave Creek AZ | Auto Detailing at Home",
    metaDescription:
      "Cave Creek mobile car detailing — dust, pet hair, interior deep clean, exterior detail & paint protection. We come to you in North Scottsdale foothills.",
    heroSubtitle: "Foothills dust and trail parking — mobile detailing for Cave Creek & Carefree area.",
    intro: [
      "Cave Creek owners often split time between paved commutes and dirt parking at trailheads. That loads pet hair, red dust, and fine grit into interiors faster than city-only driving.",
      "Our mobile detailing focuses on extraction, stain removal, and exterior decontamination — the practical searches Cave Creek residents use when a hose-down is not enough.",
    ],
    mobileBlock:
      "We come to you in Cave Creek with mobile car detailing setup suited to gravel drives and hillside homes.",
    interiorBody:
      "Reset Detail handles heavy pet hair and neglected cabins after busy seasons; Restore Detail covers routine interior detailing and carpet shampoo.",
    exteriorBody:
      "Wheel wells, clay bar passes, and paint correction address desert dust on darker paints; headlight restoration helps on rural night drives.",
    localProof:
      "North Valley routes include Cave Creek alongside Anthem and North Phoenix — gallery photos show real correction and interior work.",
    nearbySlugs: ["anthem-az", "north-phoenix-az", "scottsdale-az"],
  }),
  "anthem-az": secondaryArea({
    name: "Anthem",
    metaTitle: "Mobile Detailing Anthem AZ | Car Detailing at Your Home",
    metaDescription:
      "Anthem AZ mobile auto detailing — interior detailing, exterior full detail, ceramic coating, pet hair removal. Master-planned community mobile service.",
    heroSubtitle: "Anthem country club communities — scheduled mobile detailing at your garage.",
    intro: [
      "Anthem's master-planned streets and garage-forward homes make mobile detailing a natural fit — we detail while you work from home or run errands in the community.",
      "Clients ask for interior detailing before hosting, ceramic coating after paint correction, and Refresh details on a seasonal rhythm to beat desert dust.",
    ],
    mobileBlock:
      "We come to you in Anthem with full mobile auto detailing — no need to drive down the 17 for a shop appointment.",
    interiorBody:
      "Deep interior cleaning, odor removal, and leather conditioning keep SUVs and third-row family haulers ready for school and sports seasons.",
    exteriorBody:
      "Foam hand wash, clay bar decontamination, and protection packages maintain gloss on vehicles parked outside Anthem's golf and trail amenities.",
    localProof:
      "Anthem shares routes with New River and North Phoenix — flexible morning slots match early commuters.",
    nearbySlugs: ["new-river-az", "north-phoenix-az", "cave-creek-az"],
  }),
  "new-river-az": secondaryArea({
    name: "New River",
    metaTitle: "Mobile Detailing New River AZ | At-Home Car Detailing",
    metaDescription:
      "New River mobile detailing on your property — interior & exterior auto detailing, pet hair, dust & paint care. North Valley we come to you.",
    heroSubtitle: "Rural north Valley — mobile detailing for New River driveways and horse properties.",
    intro: [
      "New River vehicles see gravel, feed dust, and long drives into Phoenix. Mobile car detailing here means respecting larger lots and bringing enough water and power to do the job right on site.",
      "We match Restore and Reset packages to real conditions: pet hair, stain removal, and exterior buildup from unpaved stretches.",
    ],
    mobileBlock:
      "At-home detailing in New River — we coordinate access for wide driveways and rural addresses.",
    interiorBody:
      "Carpet shampoo, odor treatment, and seat extraction matter when work gear and pets share the cabin.",
    exteriorBody:
      "Hand wash plus wheel and well cleaning; paint correction and coating when sun and dust have dulled the finish.",
    localProof:
      "New River is grouped with Anthem and Cave Creek on north Valley service days.",
    nearbySlugs: ["anthem-az", "cave-creek-az", "north-phoenix-az"],
  }),
  "paradise-valley-az": secondaryArea({
    name: "Paradise Valley",
    metaTitle: "Mobile Detailing Paradise Valley AZ | Luxury Auto Detailing",
    metaDescription:
      "Paradise Valley mobile detailing at your estate or driveway — interior detailing, paint correction, ceramic coating, full detail. Discreet at-home service.",
    heroSubtitle: "Low-profile, high-standard mobile detailing for Paradise Valley homes.",
    intro: [
      "Paradise Valley owners often want meticulous interior detailing and paint care without transporting vehicles to a busy shop. We arrive on time, work cleanly, and document condition when custom quotes are needed.",
      "Services align with luxury search intent: full detail, paint correction, ceramic coating, leather conditioning, and interior ceramic protection — always tied to named packages and add-ons.",
    ],
    mobileBlock:
      "We come to you in Paradise Valley — discreet mobile auto detailing with professional-grade products.",
    interiorBody:
      "Leather cleaning, carpet extraction, and odor removal protect high-end interiors; interior plastics restoration revives sun-faded trim.",
    exteriorBody:
      "Paint correction for swirls, clay bar decontamination, and ceramic coating are common when exotics and daily luxury SUVs share the same driveway standards.",
    localProof:
      "Paradise Valley jobs are scheduled alongside Scottsdale and Phoenix central routes.",
    nearbySlugs: ["scottsdale-az", "phoenix-az", "fountain-hills-az"],
  }),
  "scottsdale-az": secondaryArea({
    name: "Scottsdale",
    metaTitle: "Mobile Detailing Scottsdale AZ | Car & Auto Detailing",
    metaDescription:
      "Scottsdale mobile car detailing — Old Town, North Scottsdale & DC Ranch. Interior detailing, paint correction, ceramic coating at home.",
    heroSubtitle: "Old Town, McCormick Ranch, North Scottsdale — mobile detailing with Valley-wide experience.",
    intro: [
      "Scottsdale ranges from condo garages to sprawling north-side driveways. Our mobile detailing adapts setup to your property while delivering the same Refresh, Restore, and Reset structure.",
      "Popular requests include paint correction before coating, deep interior cleaning for wine and coffee stains, and recurring maintenance washes for second vehicles.",
    ],
    mobileBlock:
      "At-home car detailing in Scottsdale — we bring extraction, hand wash, and correction services to your address.",
    interiorBody:
      "Interior detailing covers leather, cloth extraction, and odor treatment; Reset Detail addresses neglected interiors on work trucks and family SUVs alike.",
    exteriorBody:
      "Ceramic coating, clay bar treatment, and headlight restoration round out exterior programs for desert sun and golf-community pollen.",
    localProof:
      "Scottsdale clients appear throughout our testimonials — including paint depth results that match showroom expectations.",
    nearbySlugs: ["paradise-valley-az", "fountain-hills-az", "phoenix-az"],
  }),
  "fountain-hills-az": secondaryArea({
    name: "Fountain Hills",
    metaTitle: "Mobile Detailing Fountain Hills AZ | At-Home Detailing",
    metaDescription:
      "Fountain Hills mobile auto detailing — hillside dust, interior deep clean, exterior detail, ceramic coating. We come to your Fountain Hills home.",
    heroSubtitle: "Hillside homes and fountain views — mobile detailing with careful water management.",
    intro: [
      "Fountain Hills dust rolls downhill onto paint and into window seals. Mobile auto detailing should include decontamination and interior dust removal, not just a cosmetic wipe.",
      "We service Fountain Hills with Restore for typical wear and Reset when pet hair or long-term neglect needs a deeper interior restoration.",
    ],
    mobileBlock:
      "We come to you in Fountain Hills — mobile car detailing suited to sloped driveways and tight cul-de-sacs.",
    interiorBody:
      "Stain removal, carpet shampoo, and odor treatment keep interiors fresh when windows stay cracked for mountain air.",
    exteriorBody:
      "Paint correction and ceramic coating protect against intense elevation sun; headlight restoration improves night visibility on McDowell Mountain roads.",
    localProof:
      "Fountain Hills shares east/north routing with Scottsdale and Mesa-area appointments.",
    nearbySlugs: ["scottsdale-az", "paradise-valley-az", "gilbert-az"],
  }),
  "gilbert-az": secondaryArea({
    name: "Gilbert",
    metaTitle: "Mobile Detailing Gilbert AZ | Car Detailing at Home",
    metaDescription:
      "Gilbert AZ mobile detailing — family SUVs, interior detailing, pet hair, sports gear stains, ceramic coating. Agritopia to Higley, we come to you.",
    heroSubtitle: "East Valley family hubs — mobile detailing for Gilbert driveways and townhomes.",
    intro: [
      "Gilbert means youth sports, school carpools, and hot parking lots — interiors absorb spills and sunscreen fast. Our mobile car detailing targets stain removal and extraction parents actually need.",
      "Refresh keeps well-maintained vehicles on schedule; Restore and Reset step up when Gilbert dust storms and summer heat push interiors past a quick clean.",
    ],
    mobileBlock:
      "We come to you in Gilbert with mobile auto detailing — ideal for double-car garages and townhome communities.",
    interiorBody:
      "Fabric seat shampoo, pet hair removal, and odor treatment are the most requested interior services; leather conditioning is available for upgraded trims.",
    exteriorBody:
      "Full exterior detailing with clay bar when paint feels gritty; ceramic coating after correction for long-term east Valley sun.",
    localProof:
      "Gilbert sits on east Valley routes with Chandler and Queen Creek — see results for recent SUV and sedan transformations.",
    nearbySlugs: ["chandler-az", "queen-creek-az", "san-tan-valley-az"],
  }),
  "chandler-az": secondaryArea({
    name: "Chandler",
    metaTitle: "Mobile Detailing Chandler AZ | Interior & Exterior Detail",
    metaDescription:
      "Chandler mobile car detailing — tech corridor commutes, interior deep clean, paint correction, ceramic coating. Ocotillo, Chandler Heights, at-home service.",
    heroSubtitle: "From Ocotillo to Chandler Heights — mobile detailing for east Valley commutes.",
    intro: [
      "Chandler commutes along the 101 and 202 load brake dust onto wheels and fine pollution into cabin vents. Mobile detailing Chandler professionals should address both interior air quality and paint contamination.",
      "We connect Restore Detail with interior detailing searches and Reset with heavy pet hair and odor removal — transparent package language, not vague full service quotes.",
    ],
    mobileBlock:
      "At-home detailing in Chandler — we detail while you work from home or during weekend windows.",
    interiorBody:
      "Deep interior cleaning, carpet extraction, and plastics restoration refresh tech-worker sedans and family minivans alike.",
    exteriorBody:
      "Hand wash, wheel cleaning, paint correction, and ceramic coating protect vehicles parked outside Chandler offices and schools.",
    localProof:
      "Chandler clients book seasonal Refresh before summer travel — testimonials highlight interior like-new results.",
    nearbySlugs: ["gilbert-az", "queen-creek-az", "phoenix-az"],
  }),
  "queen-creek-az": secondaryArea({
    name: "Queen Creek",
    metaTitle: "Mobile Detailing Queen Creek AZ | Mobile Auto Detailing",
    metaDescription:
      "Queen Creek mobile detailing — agricultural dust, new builds, interior & exterior car detailing at your home. San Tan foothills service.",
    heroSubtitle: "San Tan foothills growth — mobile detailing for Queen Creek neighborhoods.",
    intro: [
      "Queen Creek blends farmland dust with brand-new subdivisions. Vehicles pick up fine soil on every trip toward Gilbert or the 202. Mobile auto detailing should include wheel wells, carpets, and paint decon — not just a spray wax.",
      "We offer Refresh for newer vehicles, Restore when staining shows, and Reset for neglected interiors with pet hair and strong odors.",
    ],
    mobileBlock:
      "We come to you in Queen Creek — mobile car detailing for wide new-driveway communities and horse-area properties.",
    interiorBody:
      "Seat and carpet shampoo, odor removal, and leather care handle family and livestock-adjacent dust tracked inside.",
    exteriorBody:
      "Clay bar decontamination and paint correction address swirl marks from automatic washes; ceramic coating locks in gloss after correction.",
    localProof:
      "Queen Creek routes connect with San Tan Valley and Gilbert for efficient east Valley scheduling.",
    nearbySlugs: ["san-tan-valley-az", "gilbert-az", "chandler-az"],
  }),
  "san-tan-valley-az": secondaryArea({
    name: "San Tan Valley",
    metaTitle: "Mobile Detailing San Tan Valley AZ | Car Detailing at Home",
    metaDescription:
      "San Tan Valley mobile detailing — interior detailing, pet hair, exterior wash, paint correction. Johnson Ranch & Pecan Creek. We come to you.",
    heroSubtitle: "Johnson Ranch, Pecan Creek, and east Mesa edges — San Tan Valley mobile detailing.",
    intro: [
      "San Tan Valley is one of the fastest-changing pockets of the metro — new asphalt, ongoing construction, and desert wind mean constant dust inside and out. We provide mobile detailing San Tan Valley residents can book online without calling a shop.",
      "Interior detailing, stain removal, and full exterior detail map to Restore and Reset; Refresh stays popular on newer leases and daily commuters.",
    ],
    mobileBlock:
      "At-home auto detailing in San Tan Valley — we work in community driveways where HOA permits mobile vendors.",
    interiorBody:
      "Pet hair removal and carpet extraction are frequent requests; odor treatment helps when summer heat sets in spills.",
    exteriorBody:
      "Engine bay cleaning, headlight restoration, and ceramic coating round out long-term ownership plans in harsh sun.",
    localProof:
      "San Tan Valley is paired with Queen Creek and Gilbert on east Valley service days — gallery shows real before/after work.",
    nearbySlugs: ["queen-creek-az", "gilbert-az", "chandler-az"],
  }),
  "sun-city-az": {
    h1: "Mobile Auto Detailing in Sun City, AZ",
    metaTitle: "Mobile Detailing Sun City AZ | At-Home Car & Auto Detailing",
    metaDescription:
      "Sun City mobile car detailing at your home — interior detailing, exterior wash, headlight restoration, odor removal. We come to you. Refresh, Restore, Reset packages.",
    heroSubtitle:
      "Garage-kept classics and daily drivers — respectful mobile detailing throughout Sun City and Sun City West.",
    intro: [
      "Sun City and Sun City West residents often keep vehicles longer and care about visibility, comfort, and pride of ownership. Mobile detailing here should feel straightforward: on-time arrival, careful work around landscaping, and interior detailing that addresses odors, stains, and dusty vents without you driving across the Valley.",
      "We hear requests for headlight restoration, gentle paint care on older clear coat, and deep interior cleaning when grandchildren visits or club outings track sand and snacks into the cabin.",
    ],
    mobileBlock:
      "We come to you — true at-home car detailing in Sun City with courteous setup and the same factory-fresh standard we bring to every Phoenix Metro neighborhood.",
    interiorHeading: "Interior detailing & deep cleaning",
    interiorBody:
      "Restore Detail aligns with carpet and seat cleaning, stain removal, and odor removal searches. Reset Detail is available when a vehicle has been neglected or when pet hair and buildup need a full interior restoration before a trip or sale.",
    interiorLinks: [
      { slug: "restore-detail", label: "Restore Detail" },
      { slug: "fabric-seat-carpet-shampoo", label: "Carpet & seat extraction" },
      { slug: "interior-odor-treatment", label: "Odor removal" },
      { slug: "interior-plastic-trim-restoration", label: "Dash & trim restoration" },
    ],
    exteriorHeading: "Exterior detailing & headlight clarity",
    exteriorBody:
      "Exterior detailing includes hand wash, wheel cleaning, and optional clay bar decontamination. Headlight restoration improves night visibility — a common Sun City priority — and paint correction or ceramic coating can be quoted when paint is a candidate for polishing.",
    exteriorLinks: [
      { slug: "headlight-restoration", label: "Headlight restoration" },
      { slug: "signature-foam-hand-wash", label: "Foam hand wash" },
      { slug: "paint-correction", label: "Paint correction (custom quote)" },
      { slug: "wheel-tire-well-cleaning", label: "Wheel & well cleaning" },
    ],
    refreshBlurb: refreshText("Sun City"),
    restoreBlurb: restoreText("Sun City"),
    resetBlurb: resetText("Sun City"),
    localProof:
      "Sun City sits on our regular Northwest Valley route alongside Surprise — book online or call for flexible morning appointments that match early-Arizona schedules.",
    nearbySlugs: ["surprise-az", "glendale-az", "waddell-az"],
  },
};

Object.assign(AREA_PAGE_COPY, SECONDARY_AREAS);

export function getAreaPageCopy(slug: string): AreaPageCopy | undefined {
  const key = slug.toLowerCase().replace(/\/$/, "");
  return AREA_PAGE_COPY[key] ?? AREA_PAGE_COPY[`${key}-az`];
}

/** Fallback when a slug has no bespoke copy yet */
export function fallbackAreaCopy(name: string, slug: string): AreaPageCopy {
  return secondaryArea({
    name,
    metaTitle: `Mobile Detailing ${name} AZ`,
    metaDescription: `Professional mobile auto detailing in ${name}, Arizona — interior and exterior car detailing at your home. Book Refresh, Restore, or Reset online.`,
    heroSubtitle: `Mobile car detailing in ${name} — we come to you.`,
    intro: [
      `Thompson's Mobile Detailing AZ serves ${name} with structured mobile auto detailing packages and honest add-ons.`,
      `Choose Refresh, Restore, or Reset based on how your vehicle looks and smells today — not a one-size-fits-all menu.`,
    ],
    mobileBlock: `We bring at-home car detailing to ${name} driveways and workplaces.`,
    interiorBody: `Interior detailing, deep cleaning, stain removal, and pet hair services are available through our packages and add-ons.`,
    exteriorBody: `Exterior detailing, clay bar decontamination, paint correction, and ceramic coating protect your finish in Arizona sun.`,
    localProof: `View our service areas, blog, and testimonials for more about mobile detailing across the Phoenix Metro.`,
    nearbySlugs: [],
  });
}
