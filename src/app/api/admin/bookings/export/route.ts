import { withAdminAuth } from "@/lib/api-auth";
import { connectDB } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";

function escapeCsv(value: string) {
  if (value.includes(",") || value.includes('"')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET() {
  return withAdminAuth(async () => {
    await connectDB();
    const bookings = await Booking.find().sort({ createdAt: -1 }).lean();
    const headers = [
      "Customer",
      "Email",
      "Phone",
      "Service",
      "Date",
      "Time",
      "Status",
      "Estimated Price",
    ];
    const rows = bookings.map((b) =>
      [
        b.customerName,
        b.email,
        b.phone,
        b.serviceName,
        new Date(b.preferredDate).toISOString().slice(0, 10),
        b.preferredTime,
        b.status,
        String(b.adjustedPrice ?? b.estimatedPrice),
      ]
        .map(escapeCsv)
        .join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="bookings.csv"',
      },
    });
  });
}
