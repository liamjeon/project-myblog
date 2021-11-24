import Mongoose from "mongoose";
import { useVirtualId } from "../database/database.js";
import * as UserRepository from "./auth.js";

const postSchema = new Mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: String, required: true },
    username: { type: String, required: true },
  },
  { timestamps: true }
);

useVirtualId(postSchema); //스키마에 virtual id 추가
const Post = Mongoose.model("Post", postSchema);

export async function getAll(){
  return Post.find().sort({createdAt: -1});
}

export async function getById(id){
  return Post.findById(id);
}

export async function create(title, content, userId) {
  return UserRepository.findById(userId).then((user) => {
    return new Post({
      title, //
      userId,
      content,
      username: user.username,
    }).save()
  });
}

export async function update(id, title, content){
  return Post.findByIdAndUpdate(id, {title, content}, {returnOriginal: false}); //false:수정된 값이 리턴
}

export async function deletePost(id){
  return Post.findByIdAndDelete(id);
}
