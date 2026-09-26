export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function readingTimeMinutes(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function serializeDoc<T extends { _id?: unknown; toObject?: () => object }>(
  doc: T
): Omit<T, "_id" | "toObject"> & { _id: string } {
  const obj =
    typeof doc.toObject === "function"
      ? (doc.toObject() as T & { _id: { toString(): string } })
      : (doc as T & { _id: { toString(): string } });
  return {
    ...obj,
    _id: String(obj._id),
  } as Omit<T, "_id" | "toObject"> & { _id: string };
}

export function apiError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

export function apiUnauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}
