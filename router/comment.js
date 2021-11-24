import express from "express";
import "express-async-errors";
import { isAuth } from '../middleware/auth.js';
import * as commentController from "../controller/comment.js"

const router = express.Router();

//GET /comments/:postId
router.get('/:postId', isAuth, commentController.getComment);

//POST /comments/:postId
router.post('/:postId', isAuth, commentController.createComment);

//PUT /comments/:id
router.put('/:id', isAuth, commentController.updateComment);

//DELETE /comments/:id
router.delete('/:id', isAuth, commentController.deleteComment);

export default router;