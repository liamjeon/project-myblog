import Mongoose from "mongoose";
import { useVirtualId } from "../database/database.js";
import * as UserRepository from "./auth.js";

const commentSchema = new Mongoose.Schema(
  {
    text: { type: String, required: true },
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    username: { type: String, required: true },
  },
  { timestamps: true }
);

useVirtualId(commentSchema); //스키마에 virtual id 추가
const Comment = Mongoose.model("Comment", commentSchema);

export async function getById(id){
    return Comment.findById(id);
}

export async function getByPostId(postId) {
  return Comment.find({ postId }).sort({ createdAt: 1 });
}

export async function create(postId, userId, text) {
  return UserRepository.findById(userId).then((user) =>
    new Comment({
      text,
      userId,
      postId,
      username: user.username,
    }).save()
  );
}

export async function update(id, text){
    return Comment.findByIdAndUpdate(id, {text}, {returnOriginal: false});//false면 수정되 값 리턴
}

export async function remove(id){
    return Comment.findByIdAndDelete(id);
}



