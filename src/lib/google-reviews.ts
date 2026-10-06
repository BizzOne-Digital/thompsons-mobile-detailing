import { unstable_cache } from "next/cache";

export type GoogleReviewItem = {
  authorName: string;
  rating: number;
  text: string;
  relativeTimeDescription: string;
  profilePhotoUrl?: string;
};

export type GoogleReviewsSnapshot = {
  rating: number | null;
  totalReviews: number | null;
  reviews: GoogleReviewItem[];
  viewAllUrl: string;
  writeReviewUrl: string;
  source: "google" | "unconfigured";
};

/** How many reviews to surface on marketing pages (Places API returns at most 5). */
export const FEATURED_GOOGLE_REVIEW_COUNT = 4;

function reviewLinks(placeId?: string) {
  const mapsUrl =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL?.trim() ||
    (placeId
      ? `https://www.google.com/maps/search/?api=1&query=Thompson%27s+Mobile+Detailing+AZ&query_place_id=${placeId}`
      : "https://www.google.com/search?q=Thompson%27s+Mobile+Detailing+AZ");
  const writeReviewUrl =
    process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL?.trim() ||
    (placeId
      ? `https://search.google.com/local/writereview?placeid=${placeId}`
      : mapsUrl);
  return { viewAllUrl: mapsUrl, writeReviewUrl };
}

/** Prefer newer-looking and substantive 5-star reviews for homepage social proof. */
function recencyScore(relativeTimeDescription: string): number {
  const d = relativeTimeDescription.toLowerCase();
  if (d.includes("hour") || d.includes("day")) return 100;
  if (d.includes("week")) return 85;
  if (d.includes("month")) return 65;
  if (d.includes("year")) return 25;
  return 50;
}

export function rankGoogleReviewsForDisplay(
  reviews: GoogleReviewItem[]
): GoogleReviewItem[] {
  return [...reviews].sort((a, b) => {
    const ratingDiff = b.rating - a.rating;
    if (ratingDiff !== 0) return ratingDiff;
    const recencyDiff =
      recencyScore(b.relativeTimeDescription) -
      recencyScore(a.relativeTimeDescription);
    if (recencyDiff !== 0) return recencyDiff;
    return b.text.length - a.text.length;
  });
}

async function fetchGoogleReviewsUncached(): Promise<GoogleReviewsSnapshot> {
  const placeId = process.env.GOOGLE_PLACE_ID?.trim();
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const links = reviewLinks(placeId);

  if (!placeId || !apiKey) {
    return {
      rating: null,
      totalReviews: null,
      reviews: [],
      ...links,
      source: "unconfigured",
    };
  }

  try {
    const params = new URLSearchParams({
      place_id: placeId,
      fields: "rating,user_ratings_total,reviews,url",
      key: apiKey,
    });
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?${params}`,
      { next: { revalidate: 1800 } }
    );
    const data = (await res.json()) as {
      status?: string;
      result?: {
        rating?: number;
        user_ratings_total?: number;
        url?: string;
        reviews?: {
          author_name?: string;
          rating?: number;
          text?: string;
          relative_time_description?: string;
          profile_photo_url?: string;
        }[];
      };
    };

    if (data.status !== "OK" || !data.result) {
      return {
        rating: null,
        totalReviews: null,
        reviews: [],
        viewAllUrl: data.result?.url ?? links.viewAllUrl,
        writeReviewUrl: links.writeReviewUrl,
        source: "unconfigured",
      };
    }

    const mapped = (data.result.reviews ?? [])
      .map((r) => ({
        authorName: r.author_name ?? "Google reviewer",
        rating: r.rating ?? 5,
        text: r.text ?? "",
        relativeTimeDescription: r.relative_time_description ?? "",
        profilePhotoUrl: r.profile_photo_url,
      }))
      .filter((r) => r.text.length > 0);

    const reviews = rankGoogleReviewsForDisplay(mapped).slice(0, 5);

    return {
      rating: data.result.rating ?? null,
      totalReviews: data.result.user_ratings_total ?? null,
      reviews,
      viewAllUrl: data.result.url ?? links.viewAllUrl,
      writeReviewUrl: links.writeReviewUrl,
      source: "google",
    };
  } catch {
    return {
      rating: null,
      totalReviews: null,
      reviews: [],
      ...links,
      source: "unconfigured",
    };
  }
}

export async function getGoogleReviews(): Promise<GoogleReviewsSnapshot> {
  const placeId = process.env.GOOGLE_PLACE_ID?.trim() ?? "default";
  const cached = unstable_cache(
    fetchGoogleReviewsUncached,
    ["google-reviews-v2", placeId],
    { revalidate: 1800, tags: ["google-reviews"] }
  );
  return cached();
}
