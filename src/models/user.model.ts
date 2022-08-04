import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface UserInterface extends mongoose.Document {
  email: string;
  name: String;
  password: String;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
  generateAccessToken: (session: string) => string;
  generateRefreshToken: (session: string) => string;
}

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const user = this;
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  return isPasswordCorrect;
};

UserSchema.methods.generateAccessToken = function (session: string) {
  const user = this;
  const expiresIn = process.env.ACCESS_TOKEN_TTL as unknown as string;
  const privateKey = process.env.ACCESS_TOKEN_PRIVATE_KEY as unknown as string;
  return jwt.sign({ session, email: user.email }, privateKey, {
    expiresIn,
    algorithm: "RS256",
  });
};

UserSchema.methods.generateRefreshToken = function (session: string) {
  const user = this;
  const expiresIn = process.env.REFRESH_TOKEN_TTL as unknown as string;
  const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY as unknown as string;
  return jwt.sign({ session, email: user.email }, privateKey, {
    expiresIn,
    algorithm: "RS256",
  });
};

export default mongoose.model<UserInterface>("User", UserSchema);
