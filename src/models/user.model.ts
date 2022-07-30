import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface UserInterface extends mongoose.Document {
  email: string;
  name: String;
  password: String;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
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

export default mongoose.model("User", UserSchema);
