// backend/schema/postModel.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, default: "Anonymous" },
  hashtags: [String],
  createdAt: { type: Date, default: Date.now },
});

export const Post = mongoose.model("Post", postSchema);