import { UserProfileModel } from "../models/user_Profile.js";
import { userProfileSchema } from "../schema/user_profile.js";
import { UserModel } from "../models/user_model.js";

//Post 
export const addUserProfile = async (req, res, next) => {

  try {
    //Error handling
    const { error, value } = userProfileSchema.validate({
      ...req.body,
      profilePicture: req.files.profilePicture[0].filename,
      resume: req.files.resume[0].filename,
    });

    if (error) {
      return res.status(400).send(error.details[0].message)
    }
    console.log(value, 'value')

    //find the user
    console.log('userId', req.session.user.id)

    const userSessionId = req.session.user.id

    const user = await UserModel.findById(req.session.user.id)
    if (!user) {
      return res.status(404).send('User not found')
    }

    //Create New Profile with the value
    const profile = await UserProfileModel.create({ ...value, user: userSessionId });

    //Push the user as an object
    user.userProfile = profile.id

    //Save the user as  user profile id
    await user.save();


    //Return profile response
    res.status(201).json({ profile })

  } catch (error) {
    next(error)
  }
}

//Get all user
export const getAllProfile = async (req, res, next) => {

  //Fetching a profile belonging to a user
  try {
    const userSessionId = req.session.user.id
    const allProfile = await UserProfileModel.find({ user: userSessionId });
    if (!allProfile) {
      return res.status(404).send('No profile added')
    }

    //Response
    res.status(200).json({ userProfile: allProfile });
  } catch (error) {
    next(error)
  }

}

//Update User
export const patchProfile = async (req, res,) => {
  //Request
  try {
    const { error, value} = userProfileSchema.validate ({
      ...req.body,
      profilePicture: req.files.profilePicture[0].filename,
      resume:req.files.resume[0].filename,
    })
    
    if(error) {
      return res.status(400).send(error.details[0].message);

    }

    const userSessionId = req.session.user.id; 
      const user = await UserModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }

      const profile = await UserProfileModel.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!profile) {
            return res.status(404).send("Profile not found");
        }
  
      res.status(201).json({ profile });
    
  } catch (error) {
    res.status(500).json({ error: error.message})
  }
}