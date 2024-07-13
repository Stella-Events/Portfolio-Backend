import { Router } from "express";
import { addEducation } from "../controllers/education_controllers.js";

//Router
const educationRouter = Router()

//creating routes
educationRouter.post('/users/education', addEducation)

educationRouter.get('/users/education')

educationRouter.patch('/users/education/:id')

export default educationRouter