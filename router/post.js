import express from "express";
import "express-async-errors";
import * as postController from "../controller/post.js"
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

//GET /posts
router.get('/', isAuth, postController.getAllPost);

//GET /posts/:id
router.get('/:id', isAuth, postController.getPost);

//PUT /posts/:id
router.put('/:id', isAuth, postController.updatePost);

//POST /posts
router.post('/', isAuth, postController.createPost);

//DELETE /posts/:id
router.delete('/:id', isAuth, postController.deletePost);

export default router;