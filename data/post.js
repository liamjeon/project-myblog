import Mongoose from "mongoose";
import { useVirtualId } from "../database/database.js";

const postSchema = new Mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    username: { type: String, required: true },
  },
  { timestamps: true }
);

useVirtualId(postSchema); //스키마에 virtual id 추가
const Post = Mongoose.model("Post", postSchema);

export async function create(title, content, username) {
  return new Post({ title, content, username }).save();
}
