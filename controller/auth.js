import {} from "express-async-errors";
import * as userRepository from "../data/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const jwtSecretKey = "myblog-secret-key";
const jwtExpiresInDays = "2d";
const bcryptSaltRounds = 10;

export async function signup(req, res) {
  const { username, password } = req.body;
  const found = await userRepository.findByUsername(username);

  if (found) {
    //아이디가 이미 DB에 있을때 409
    return res.status(409).json({ message: `${username} 은 이미 있습니다.` });
  }
  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  const userId = await userRepository.createUser({
    username,
    password: hashed,
  });
  const token = createJwtToken(userId);
  res.status(201).json({ token, username, userId });
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  console.log(user);

  //username으로 찾았을 때 결과가 없다면 401 리턴
  if(!user){
    return res.status(401).json({message: "아이디 또는 비밀번호를 확인하세요."});
  }
  //bcrypt로 만든 password가 일치하지 않는다면 리턴
  const inValidPassword = await bcrypt.compare(password, user.password);
  if(!inValidPassword){
    return res.status(401).json({message: "아이디 또는 비밀번호를 확인하세요."});
  }
  const token = createJwtToken(user.id);
  res.status(200).json({token, username});
}

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}
