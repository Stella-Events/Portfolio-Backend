import { ExperienceModel } from "../models/experience.js";
import { UserProfileModel } from "../models/user_Profile.js";
import { experienceSchema } from "../schema/user_experience.js";
import { UserModel } from "../models/user_model.js";
import { userProfileSchema } from "../schema/user_profile.js";

export const createUserExperience = async (req, res) => {
    try {
      const { error, value } = experienceSchema.validate(req.body);
  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userSessionId = req.session.user.id;
     
  
      const user = await UserModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const experience = await ExperienceModel.create({ ...value, user: userSessionId });
  
      user.experience.push(experience.id)
  
      await user.save();
  
      res.status(201).json({ experience });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getAllUserExperience = async (req, res) => {
    try {
      //we are fetching Experience that belongs to a particular user
      const userSessionId = req.session.user.id
      const allExperience = await ExperienceModel.find({ user: userSessionId });
      if (allExperience.length == 0) {
        return res.status(404).send("No Experience added");
      }
      res.status(200).json({ Experience: allExperience });
    } catch (error) {
      return res.status(500).json({error})
    }
  };

  export const updateUserExperience = async (req, res) => {
    try {
      const { error, value } = userProfileSchema.validate(req.body);
  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userSessionId = req.session.user.id; 
      const user = await UserModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const experience = await ExperienceModel.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!experience) {
            return res.status(404).send("experience not found");
        }
  
      res.status(200).json({ experience });
    } catch (error) {
      return res.status(500).json({error})
    }
  };


