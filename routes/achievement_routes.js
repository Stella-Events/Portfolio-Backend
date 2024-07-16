import { Router } from "express";
import { addUserAchievement, deleteUserAchievement, getAllUserAchievements, updateUserAchievement } from "../controllers/achievement_controller.js";
import { checkUserSession } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/uploads.js";


export const achievementRouter = Router();

achievementRouter.post('/users/achievements',checkUserSession,remoteUpload.single('image'),addUserAchievement);

achievementRouter.get('/users/achievements', checkUserSession, getAllUserAchievements);

achievementRouter.patch('/users/achievements/:id', checkUserSession,remoteUpload.single('image'), updateUserAchievement );

achievementRouter.delete('/users/achievements/:id', checkUserSession, deleteUserAchievement);
