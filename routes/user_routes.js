import { Router } from "express";
import { getUser, getUsers, login, logout, signup, token } from "../controllers/user_controllers.js";
import { checkUserSession } from "../middlewares/auth.js";



const userRouter = Router();

userRouter.post('/users/auth/signup', signup);

userRouter.post('/users/auth/login',  login);

userRouter.post('/users/auth/token',  token);

userRouter.post ('/users/auth/logout', checkUserSession, logout);

userRouter.get('/users/auth/:username', getUser);

userRouter.get('/users', getUsers)

export default userRouter
