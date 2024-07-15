import { Router } from "express";
import { addUserAchievement, deleteUserAchievement, getAllUserAchievements, getOneUserAchievement, updateUserAchievement } from "../controllers/achievement_controller.js";
import { checkUserSession } from "../middlewares/auth.js";


export const achievementRouter = Router();

achievementRouter.post('users/achievements',checkUserSession, addUserAchievement);
achievementRouter.get('users/achievements', checkUserSession, getAllUserAchievements);
achievementRouter.get('users/achievements/:id', checkUserSession, getOneUserAchievement);
achievementRouter.patch('users/achievements/:id', checkUserSession, updateUserAchievement );
achievementRouter.delete('users/achievements/:id', checkUserSession, deleteUserAchievement);
