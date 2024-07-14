import { Router } from "express";
import { addUserProject, deleteUserProject, getAllUserProjects, getOneUserProject, updateUserProject } from "../controllers/project_controllers.js";

export const projectRouter = Router();

projectRouter.post('users/projects', addUserProject);
projectRouter.get('users/projects', getAllUserProjects);
projectRouter.get('users/projects/:id', getOneUserProject);
projectRouter.patch('users/projects/:id', updateUserProject );
projectRouter.delete('users/projects/:id', deleteUserProject);
