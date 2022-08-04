import mongoose from "mongoose";
import { UserInterface } from "./user.model";

export interface SessionInterface extends mongoose.Document {
  user: UserInterface["_id"];
  valid?: Boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<SessionInterface>("Session", SessionSchema);
