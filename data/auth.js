import Mongoose from "mongoose";
import { useVirtualId } from "../database/database.js";

const userSchema = new Mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

useVirtualId(userSchema); //가상의 id 추가
const User = Mongoose.model("User", userSchema); //use collection과 schema 연결

export async function findById(id) {
  return User.findOne({ id });
}

export async function findByUsername(username) {
  return User.findOne({ username });
}

//입력받은 user 정보로 user를 db에 생성하고서, 생성한 user의 고유id를 리턴해줌. token 생성용
export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
}
