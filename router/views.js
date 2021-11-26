import express from "express";
import "express-async-errors";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

// 메인페이지 게시글 전체 조회
router.get("/", (req, res) => res.render("login"));
// 상세페이지
router.get("/detail", (req, res) => res.render("detail"));
//로그인페이지
router.get("/login", (req, res) => res.render("login"));
//회원가입
router.get("/signup", (req, res) => res.render("signup"));
//글 작성
router.get("/write", (req, res) => res.render("write"));
//글 수정
router.get("/modify", (req, res) => res.render("modify"));

export default router;
