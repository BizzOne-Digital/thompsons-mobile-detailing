/** Client-provided hero photography for city / area pages (Mar 2026). */
const base = "/images/client/city-heroes-2026";

const h = (filename: string) => `${base}/${filename}`;

export const CITY_HERO_BY_SLUG: Record<string, string> = {
  "avondale-az": h("avondale-white-escalade-desert.jpg"),
  "litchfield-park-az": h("litchfield-gmc-sierra-at4-pavers.jpg"),
  "goodyear-az": h("goodyear-blue-honda-accord.jpg"),
  "buckeye-az": h("buckeye-white-super-duty-lifted.jpg"),
  "waddell-az": h("waddell-gmc-sierra-denali-gloss.jpg"),
  "surprise-az": h("surprise-ford-super-duty-front.jpg"),
  "sun-city-az": h("sun-city-kia-telluride.jpg"),
  "glendale-az": h("glendale-black-escalade.jpg"),
  "tolleson-az": h("tolleson-red-charger-gloss.jpg"),
  "phoenix-az": h("phoenix-black-tahoe-detail.jpg"),
  "north-phoenix-az": h("north-phoenix-bmw-x5.jpg"),
  "cave-creek-az": h("cave-creek-gmc-denali-gloss.jpg"),
  "anthem-az": h("anthem-blue-tundra-lifted.jpg"),
  "new-river-az": h("new-river-bronco-foam-wash.jpg"),
  "paradise-valley-az": h("paradise-valley-porsche-911.jpg"),
  "scottsdale-az": h("scottsdale-porsche-cayenne.jpg"),
  "fountain-hills-az": h("fountain-hills-mustang-mach-e.jpg"),
  "gilbert-az": h("gilbert-ford-bronco-foam.jpg"),
  "chandler-az": h("chandler-blue-honda-accord.jpg"),
  "queen-creek-az": h("queen-creek-porsche-cayenne-driveway.jpg"),
  "san-tan-valley-az": h("san-tan-valley-blue-tundra.jpg"),
};

export const DEFAULT_CITY_HERO = CITY_HERO_BY_SLUG["avondale-az"];
