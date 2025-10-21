import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    url: { type: String, required: true },
    public_id: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default mongoose.model("Image", imageSchema);
