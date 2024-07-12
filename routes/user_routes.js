import { Router } from "express";
import { login, logout, signup } from "../controllers/user_controllers.js";
import { checkUserSession } from "../middlewares/auth.js";


const userRouter = Router();
userRouter.post('/users/signup', signup);

userRouter.post('/users/login', login);

userRouter.post ('/users/logout',checkUserSession, logout);








export default userRouter
