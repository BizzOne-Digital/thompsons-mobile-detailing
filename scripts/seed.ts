import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

dotenv.config({ path: ".env.local" });
dotenv.config();
import {
  seedAddOns,
  seedBlogCategories,
  seedFaqs,
  seedServices,
  seedTestimonials,
} from "./seed-data";

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is required");
    process.exit(1);
  }

  await mongoose.connect(uri);

  const { Service } = await import("../src/models/Service");
  const { AddOn } = await import("../src/models/AddOn");
  const { FAQ } = await import("../src/models/FAQ");
  const { BlogCategory } = await import("../src/models/BlogCategory");
  const { SiteSettings } = await import("../src/models/SiteSettings");
  const { Availability } = await import("../src/models/Availability");
  const { AdminUser } = await import("../src/models/AdminUser");
  const { Testimonial } = await import("../src/models/Testimonial");

  await Service.deleteMany({});
  await AddOn.deleteMany({});
  await FAQ.deleteMany({});
  await BlogCategory.deleteMany({});

  await Service.insertMany(
    seedServices.map((s) => ({
      ...s,
      images: [],
      exclusions: [],
      active: true,
      customQuote: s.customQuote ?? false,
    }))
  );

  await AddOn.insertMany(
    seedAddOns.map((a) => ({
      ...a,
      serviceSlugs: [],
      active: true,
    }))
  );

  await FAQ.insertMany(seedFaqs.map((f) => ({ ...f, active: true })));
  await BlogCategory.insertMany(seedBlogCategories);

  await Testimonial.deleteMany({ reviewSource: "seed" });
  await Testimonial.insertMany(seedTestimonials);

  const settings = await SiteSettings.findOne();
  if (!settings) {
    await SiteSettings.create({
      aboutText:
        "Thompson's Mobile Detailing AZ provides professional mobile auto detailing throughout the Valley, bringing spotless water, power, professional equipment, and premium products directly to your home or workplace.",
      privacyPolicy: "Privacy policy content can be edited in admin settings.",
      termsOfService: "Terms of service content can be edited in admin settings.",
    });
  }

  const availability = await Availability.findOne();
  if (!availability) {
    await Availability.create({
      operatingDays: Array.from({ length: 7 }, (_, day) => ({
        day,
        open: "05:00",
        close: "17:00",
        closed: false,
      })),
    });
  }

  const email = process.env.SEED_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD;
  const name = process.env.SEED_ADMIN_NAME || "Thompson Admin";

  if (email && password) {
    if (password.length < 12) {
      console.warn(
        "SEED_ADMIN_PASSWORD should be at least 12 characters for security."
      );
    }
    const passwordHash = await bcrypt.hash(password, 12);
    await AdminUser.findOneAndUpdate(
      { email },
      { email, passwordHash, name },
      { upsert: true, returnDocument: "after" }
    );
    console.log("Admin user ready:", email);
  } else {
    console.log(
      "No admin upserted. Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in .env.local."
    );
  }

  console.log("Seed completed.");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
