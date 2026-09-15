import { withAdminAuth } from "@/lib/api-auth";
import { connectDB } from "@/lib/mongodb";
import { Availability } from "@/models/Availability";

export async function GET() {
  return withAdminAuth(async () => {
    await connectDB();
    let config = await Availability.findOne();
    if (!config) config = await Availability.create({});
    return Response.json(config);
  });
}

export async function PATCH(request: Request) {
  return withAdminAuth(async () => {
    await connectDB();
    const config = await Availability.findOneAndUpdate(
      {},
      await request.json(),
      { new: true, upsert: true }
    );
    return Response.json(config);
  });
}
