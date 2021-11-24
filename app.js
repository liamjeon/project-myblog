import express from "express";
import "express-async-errors";
import { connectDB } from "./database/database.js";
import postRouter from "./router/post.js";
import userRouter from "./router/auth.js";
import commentRouter from "./router/comment.js";
import mainRouter from './router/main.js';
import path from 'path';

const __dirname = path.resolve();
const app = express();
app.use(express.json());

app.use("/", mainRouter);
app.use("/posts", postRouter);
app.use("/auth", userRouter);
app.use("/comments", commentRouter);

// html을 대체하는 ejs 엔진을 설정
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

connectDB() //mongoose.connection()의 promise 반환.
  .then(() => {
    console.log("init");
    const server = app.listen(8080); //8080포트에 연결
  })
  .catch(console.error);
