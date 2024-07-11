import { Router } from "express";
import { signup } from "../controllers/user_controllers.js";


const userRouter = Router();
userRouter.post('/users/signup', signup)

export default userRouter
