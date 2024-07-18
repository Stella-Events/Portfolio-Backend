import { Router } from "express";
import { addUserVolunteering, deleteUserVolunteering, getAllUserVolunteerings,  getVolunteeringById,  updateUserVolunteering } from "../controllers/volunteering_controllers.js";
import { checkUserSession } from "../middlewares/auth.js";

export const volunteeringRouter = Router();

volunteeringRouter.post('/users/volunteerings',checkUserSession, addUserVolunteering);

volunteeringRouter.get('/users/volunteerings', checkUserSession, getAllUserVolunteerings);

volunteeringRouter.get('/users/volunteerings/:id', checkUserSession, getVolunteeringById)

volunteeringRouter.patch('/users/volunteerings/:id',checkUserSession, updateUserVolunteering );

volunteeringRouter.delete('/users/volunteerings/:id',checkUserSession, deleteUserVolunteering);

