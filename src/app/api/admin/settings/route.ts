import { withAdminAuth } from "@/lib/api-auth";
import { connectDB } from "@/lib/mongodb";
import { SiteSettings } from "@/models/SiteSettings";

export async function GET() {
  return withAdminAuth(async () => {
    await connectDB();
    let settings = await SiteSettings.findOne();
    if (!settings) settings = await SiteSettings.create({});
    return Response.json(settings);
  });
}

export async function PATCH(request: Request) {
  return withAdminAuth(async () => {
    const body = await request.json();
    await connectDB();
    const settings = await SiteSettings.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
    });
    return Response.json(settings);
  });
}
