import { UserProfileModel } from "../models/user_Profile.js";

export const newUserProfile = async (req, res, next) =>{
    //Request
   try {
     const addUserProfile = await UserProfileModel.create(req.body);
      
     //Response
      res.status(201).json(addUser)
     
      //Error handling
      const {error, value} = userSchema.validate(req.body)
      if(error){
         return res.status(400).send(error.details[0].message)
      }
   } catch (error) {
    next(error)
   }
}