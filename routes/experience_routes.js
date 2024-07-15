import { Router } from "express";

//Router
const experienceRouter = Router();

//Routes
experienceRouter.get('/users/experiences')

experienceRouter.post('/users/experiences', createUserExperience)

experienceRouter.get('/users/experiences', getAllUserExperience)

experienceRouter.patch('/users/experiences/:id', updateUserExperience)


experienceRouter.delete('/users/experiences/:id', deleteUserExperience)