import { Router } from "express";
import { getAllProfile, addUserProfile, patchProfile} from "../controllers/user_profile.js";
import { remoteUpload } from "../middlewares/uploads.js";
import { checkUserSession } from "../middlewares/auth.js";


//Setting up Route
const profileRouter = Router()

//Creating routes
profileRouter.get('/users/profiles')

profileRouter.post('/users/profiles', remoteUpload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]), addUserProfile, checkUserSession);

profileRouter.get ('/users/profiles', checkUserSession, getAllProfile);

profileRouter.patch ('/users/profiles/:id', remoteUpload.fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]), patchProfile, checkUserSession);



export default profileRouter;