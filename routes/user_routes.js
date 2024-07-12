import { Router } from "express";
import { login, signup } from "../controllers/user_controllers.js";
import { checkUserSession } from "../middlewares/auth.js";


const userRouter = Router();
userRouter.post('/users/signup', signup);

userRouter.post('/users/login', login);










export default userRouter
