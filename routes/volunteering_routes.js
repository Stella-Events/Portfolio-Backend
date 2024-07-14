import { Router } from "express";
import { addUserVolunteering, deleteUserVolunteering, getAllUserVolunteerings, getOneUserVolunteering, updateUserVolunteering } from "../controllers/volunteering_controllers.js";

export const volunteeringRouter = Router();

volunteeringRouter.post('users/volunteerings', addUserVolunteering);
volunteeringRouter.get('users/volunteerings', getAllUserVolunteerings)
volunteeringRouter.get('users/volunteerings/:id', getOneUserVolunteering);
volunteeringRouter.patch('users/volunteerings/:id', updateUserVolunteering );
volunteeringRouter.delete('users/volunteerings/:id', deleteUserVolunteering);

