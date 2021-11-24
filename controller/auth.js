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

// export async function login(req, res) {
//   const { username, password } = req.body;
//   const user = userRepository.findByUsername(username);
  
// }

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}
