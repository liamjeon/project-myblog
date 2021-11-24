import express from "express";
import "express-async-errors";
import * as userController from "../controller/auth.js"

const router = express.Router();

//POST /signup
router.post('/signup', userController.signup);

//POST /login
router.post('/login', userController.login);

export default router;