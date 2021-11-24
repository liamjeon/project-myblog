import express from "express";
import "express-async-errors";
import { isAuth } from '../middleware/auth.js';
import * as commentController from "../controller/comment.js"

const router = express.Router();

//GET /comments/:postId
router.get('/:postId', isAuth, commentController.getComment);

//POST /comments/:postId
router.post('/:postId', isAuth, commentController.createComment);

export default router;