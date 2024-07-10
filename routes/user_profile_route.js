import { Router } from "express";
import { newUserProfile } from "../controllers/user_profile.js";

//Setting up Route
const profileRouter = Router()

//Creating routes
profileRouter.post('/userprofile')



export default profileRouter