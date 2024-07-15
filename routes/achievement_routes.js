import { Router } from "express";
import { addUserAchievement, deleteUserAchievement, getAllUserAchievements, getOneUserAchievement, updateUserAchievement } from "../controllers/achievement_controller.js";
import { checkUserSession } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/uploads.js";


export const achievementRouter = Router();

achievementRouter.post('/users/achievements',checkUserSession,remoteUpload.single('image'),addUserAchievement);

achievementRouter.get('/users/achievements', checkUserSession, getAllUserAchievements);

achievementRouter.get('/users/achievements/:id', checkUserSession, getOneUserAchievement);

achievementRouter.patch('/users/achievements/:id', checkUserSession,remoteUpload.single('image'), updateUserAchievement );

achievementRouter.delete('/users/achievements/:id', checkUserSession, deleteUserAchievement);
