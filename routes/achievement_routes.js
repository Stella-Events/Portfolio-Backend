import { Router } from "express";
import { addUserAchievement, deleteUserAchievement, getAllUserAchievements, getOneUserAchievement, updateUserAchievement } from "../controllers/achievement_controller.js";

export const achievementRouter = Router();

achievementRouter.post('users/achievements', addUserAchievement);
achievementRouter.get('users/achievements', getAllUserAchievements);
achievementRouter.get('users/achievements/:id', getOneUserAchievement);
achievementRouter.patch('users/achievements/:id', updateUserAchievement );
achievementRouter.delete('users/achievements/:id', deleteUserAchievement);
