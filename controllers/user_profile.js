import { UserProfileModel } from "../models/user_Profile.js";
import { userProfileSchema } from "../schema/user_profile.js";
import { UserModel } from "../models/user_model.js";

//Post 
export const addUserProfile = async (req, res, next) =>{
    
   try {
      //Error handling
    const {error, value} = userProfileSchema.validate(req.body)
    if(error){
       return res.status(400).send(error.details[0].message)
    }
     console.log(value,'value')

     //find the user
     const user = await UserModel.findById(req.session.user.id)
     if(!user){
      return res.status(404).send('User not found')
     }
     
     //Create New Profile
     const newProfile = await UserProfileModel.create(req.session.user.id);
     user.userProfile = newProfile.id
     
     await user.save();

      
    //Response
      res.status(201).json({newProfile})
       
   } catch (error) {
    next(error)
   }
}

export const getAllProfile = async (req, res, next) =>{
   //Request
  try {
    const allProfile = await UserProfileModel.find();
      if(allProfile.length ==0){
         return res.status(404).send('No userProfile added')
      }
    
      //Response
    res.status(200).json({userProfile:allProfile})
  } catch (error) {
   next(error)
  }

}

export const getOneProfile = async(req, res, next) =>{
  try {
    //Request:Find the profile by Id
    const getProfile = await UserProfileModel.findById(req.params.id);

    //Check if profile exits
    if (!getProfile) {
      return res.status(404).json('Profile not found') 
    }
    
    //Response
    res.status(200).json(getProfile)
   
    //error handling
  } catch (error) {
   next(error)
  }
}

export const patchProfile = async(req, res, next) => {
   //Request
   const editUserProfile = await UserProfileModel.findByIdAndUpdate(
      req.params.id,
      {...req.body,
         profilePicture: req?.file?.filename}
   )
   res.status(200).json(editUserProfile)
}