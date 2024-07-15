import { Router } from "express";
import { getAllProfile, addUserProfile, patchProfile} from "../controllers/user_profile.js";
import { remoteUpload } from "../middlewares/uploads.js";
import { checkUserSession } from "../middlewares/auth.js";

//Setting up Route
const profileRouter = Router()

//Creating routes
profileRouter.post('/users/profile', remoteUpload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]), addUserProfile, checkUserSession);

profileRouter.get('/users/profile', checkUserSession, getAllProfile);

profileRouter.patch('/users/profile/:id', patchProfile, checkUserSession);


export default profileRouter;