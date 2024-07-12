import { Router } from "express";
import { addEducation } from "../controllers/education_controllers.js";

//Router
const educationRouter = Router()

//creating routes
educationRouter.post('/users/education', addEducation)


export default educationRouter