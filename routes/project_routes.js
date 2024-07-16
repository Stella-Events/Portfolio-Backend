import { Router } from "express";
import { addUserProject, deleteUserProject, getAllUserProjects, updateUserProject } from "../controllers/project_controllers.js";
import { checkUserSession } from "../middlewares/auth.js";

export const projectRouter = Router();

projectRouter.post('/users/projects',checkUserSession, addUserProject);

projectRouter.get('/users/projects',checkUserSession , getAllUserProjects);

projectRouter.patch('/users/projects/:id',checkUserSession, updateUserProject );

projectRouter.delete('/users/projects/:id',checkUserSession, deleteUserProject);
