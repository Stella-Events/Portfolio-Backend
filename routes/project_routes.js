import { Router } from "express";
import { addUserProject, deleteUserProject, getAllUserProjects, getProjectById, updateUserProject } from "../controllers/project_controllers.js";
import { checkUserSession } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/uploads.js";

export const projectRouter = Router();

projectRouter.post('/users/projects',checkUserSession, remoteUpload.single('image'), addUserProject);

projectRouter.get('/users/projects',checkUserSession , getAllUserProjects);

projectRouter.get('/users/projects/:id', checkUserSession, getProjectById);

projectRouter.patch('/users/projects/:id',checkUserSession, remoteUpload.single('image'), updateUserProject );

projectRouter.delete('/users/projects/:id',checkUserSession, deleteUserProject);

