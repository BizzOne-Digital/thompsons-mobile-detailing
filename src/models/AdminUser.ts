import { Schema, models, model } from "mongoose";

export interface IAdminUser {
  email: string;
  passwordHash: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const AdminUser =
  models.AdminUser || model<IAdminUser>("AdminUser", AdminUserSchema);
