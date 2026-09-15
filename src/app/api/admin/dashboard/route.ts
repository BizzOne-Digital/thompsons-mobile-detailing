import { withAdminAuth } from "@/lib/api-auth";
import { connectDB } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";
import { ContactMessage } from "@/models/ContactMessage";
import { BlogPost } from "@/models/BlogPost";
import { GalleryItem } from "@/models/GalleryItem";

export async function GET() {
  return withAdminAuth(async () => {
    await connectDB();

    const [
      total,
      newCount,
      confirmed,
      completed,
      cancelled,
      revenueAgg,
      recent,
      serviceAgg,
      unread,
      blogCount,
      galleryCount,
      monthly,
      statusBreakdown,
    ] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ status: "New" }),
      Booking.countDocuments({ status: "Confirmed" }),
      Booking.countDocuments({ status: "Completed" }),
      Booking.countDocuments({ status: "Cancelled" }),
      Booking.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: "$estimatedPrice" },
          },
        },
      ]),
      Booking.find().sort({ createdAt: -1 }).limit(8).lean(),
      Booking.aggregate([
        { $group: { _id: "$serviceName", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]),
      ContactMessage.countDocuments({ read: false, archived: false }),
      BlogPost.countDocuments({ status: "published" }),
      GalleryItem.countDocuments({ published: true }),
      Booking.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
        { $limit: 12 },
      ]),
      Booking.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
    ]);

    const upcoming = await Booking.find({
      preferredDate: { $gte: new Date() },
      status: { $in: ["Confirmed", "Pending Review", "Contacted"] },
    })
      .sort({ preferredDate: 1 })
      .limit(6)
      .lean();

    return Response.json({
      stats: {
        total,
        newCount,
        confirmed,
        completed,
        cancelled,
        estimatedRevenue: revenueAgg[0]?.total ?? 0,
        unreadMessages: unread,
        blogCount,
        galleryCount,
      },
      recent,
      serviceAgg,
      upcoming,
      monthly,
      statusBreakdown,
    });
  });
}
