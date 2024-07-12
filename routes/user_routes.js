import { Router } from "express";
import { login, logout, signup } from "../controllers/user_controllers.js";
import { checkUserSession } from "../middlewares/auth.js";


const userRouter = Router();
userRouter.post('/users/signup', checkUserSession, signup);

userRouter.post('/users/login', checkUserSession, login);

userRouter.post ('/users/logout', checkUserSession, logout);

userRouter.get('/users/')








export default userRouter
