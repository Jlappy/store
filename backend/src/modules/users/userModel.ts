import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import { TUser } from "./userInterface";

interface UserModel extends Model<TUser> {}

const userSchema = new Schema<TUser, UserModel>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], required: true },
});

//  Mã hóa mật khẩu trước khi lưu
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Thêm phương thức so sánh mật khẩu
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = mongoose.model<TUser, UserModel>("User", userSchema);
