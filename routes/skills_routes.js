import { Router } from "express";
import { addUserSkill, deleteUserSkill, getAllUserSkills, getOneUserSkill, updateUserSkill, } from "../controllers/skills_controllers.js";
import { checkUserSession } from "../middlewares/auth.js";

export const skillRouter = Router()

skillRouter.post('/users/skills',checkUserSession, addUserSkill);

skillRouter.get('/users/skills',checkUserSession, getAllUserSkills);

skillRouter.get('/users/skills/:id',checkUserSession, getOneUserSkill);

skillRouter.patch('/users/skills/:id',checkUserSession, updateUserSkill );

skillRouter.delete('/users/skills/:id',checkUserSession, deleteUserSkill)