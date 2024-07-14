import { Router } from "express";
import { addUserSkill, deleteUserSkill, getAllUserSkills, getOneUserSkill, updateUserSkill, } from "../controllers/skills_controllers.js";


export const skillRouter = Router()

skillRouter.post('users/skills', addUserSkill)
skillRouter.get('users/skills', getAllUserSkills)
skillRouter.get('users/skills/:id', getOneUserSkill)
skillRouter.patch('users/skills/:id', updateUserSkill )
skillRouter.delete('users/skills/:id', deleteUserSkill)