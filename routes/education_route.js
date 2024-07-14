import { Router } from "express";
import { checkUserSession } from "../middlewares/auth.js"; 
import { addEducation, getAllUserEducaton, patchEducation } from "../controllers/education_controllers.js";


//Router
const educationRouter = Router();

//creating routes
educationRouter.post('/users/education', checkUserSession, addEducation);

educationRouter.get('/users/education', checkUserSession, getAllUserEducaton);

educationRouter.patch('/users/education/:id', checkUserSession, patchEducation);

export default educationRouter