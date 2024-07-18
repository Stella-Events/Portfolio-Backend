import { Router } from "express";
import { getAllProfile, addUserProfile, patchProfile, getProfileById} from "../controllers/user_profile.js";
import { remoteUpload } from "../middlewares/uploads.js";
import { checkUserSession } from "../middlewares/auth.js";


//Setting up Route
const profileRouter = Router()

//Creating routes

profileRouter.get('/users/profiles/:id', checkUserSession, getProfileById)

profileRouter.post('/users/profiles', checkUserSession, remoteUpload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]), addUserProfile );

profileRouter.get ('/users/profiles', checkUserSession, getAllProfile);

profileRouter.patch ('/users/profiles/:id',checkUserSession, remoteUpload.fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]), patchProfile );



export default profileRouter;