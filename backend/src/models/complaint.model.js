import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    photo: {
      type: String, // URL from Cloudinary
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "inProgress", "resolved"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    Area: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
  },
  { timestamps: true },
);

export const Complaint = mongoose.model("Complaint", complaintSchema);
