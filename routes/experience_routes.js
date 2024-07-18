import { Router } from "express";
import { checkUserSession } from "../middlewares/auth.js";
import { createUserExperience, deleteUserExperience, getAllUserExperience, getExperienceById, updateUserExperience } from "../controllers/experience_controller.js";
//Router
const experienceRouter = Router();

//Routes
experienceRouter.get('/users/experiences/:id',checkUserSession, getExperienceById)

experienceRouter.post('/users/experiences',checkUserSession, createUserExperience)

experienceRouter.get('/users/experiences',checkUserSession, getAllUserExperience)

experienceRouter.patch('/users/experiences/:id',checkUserSession, updateUserExperience)

experienceRouter.delete('/users/experiences/:id',checkUserSession, deleteUserExperience)

export default experienceRouter;