import { Router } from "express";
import { getAllProfile, getOneProfile, newUserProfile } from "../controllers/user_profile.js";
import { remoteUpload } from "../middlewares/uploads.js";

//Setting up Route
const profileRouter = Router()

//Creating routes
profileRouter.post('/users/profiles', remoteUpload.single('profilePicture'), newUserProfile)

profileRouter.get('/users/profiles', getAllProfile)

profileRouter.get('/users/profiles', getOneProfile)

export default profileRouter;