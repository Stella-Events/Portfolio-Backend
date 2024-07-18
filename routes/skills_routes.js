import { Router } from "express";
import { addUserSkill, deleteUserSkill, getAllUserSkills,  getSkillsById,  updateUserSkill, } from "../controllers/skills_controllers.js";
import { checkUserSession } from "../middlewares/auth.js";

export const skillRouter = Router()

skillRouter.get('/users/skills/:id', checkUserSession, getSkillsById);

skillRouter.post('/users/skills',checkUserSession, addUserSkill);

skillRouter.get('/users/skills',checkUserSession, getAllUserSkills);

skillRouter.patch('/users/skills/:id',checkUserSession, updateUserSkill );

skillRouter.delete('/users/skills/:id',checkUserSession, deleteUserSkill)