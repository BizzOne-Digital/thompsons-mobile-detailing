import { Schema, models, model } from "mongoose";

export interface ITeamMember {
  name: string;
  role: string;
  biography: string;
  photo?: { url: string; alt?: string; publicId?: string };
  socialLinks: { platform: string; url: string }[];
  displayOrder: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    biography: { type: String, required: true },
    photo: { url: String, alt: String, publicId: String },
    socialLinks: [{ platform: String, url: String }],
    displayOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const TeamMember =
  models.TeamMember || model<ITeamMember>("TeamMember", TeamMemberSchema);
