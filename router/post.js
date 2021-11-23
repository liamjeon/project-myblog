import express from "express";
import "express-async-errors";
import * as postController from "../controller/post.js"

const router = express.Router();

//GET /posts
//GET /posts/:id

//POST /posts
router.post('/', postController.createPost);

//PUT /posts/:id

//DELETE /posts/:id

export default router;