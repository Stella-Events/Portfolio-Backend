import { ExperienceModel } from "../models/experience.js";
import { experienceSchema } from "../schema/user_experience.js";
import { UserModel } from "../models/user_model.js";


//Post user
export const createUserExperience = async (req, res) => {
    try {
      const { error, value } = experienceSchema.validate(req.body);
  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userSessionId = req.session?.user?.id || req?.user?.id;
     
  
      const user = await UserModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const experience = await ExperienceModel.create({ ...value, user: userSessionId });
  
      user.experiences.push(experience.id)
  
      await user.save();
  
      res.status(201).json({message: 'Experience added successfully', experience });
    } catch (error) {
      console.log(error);
    }
  };
  
  //Get all user
  export const getAllUserExperience = async (req, res) => {
    try {
      //we are fetching Experience that belongs to a particular user
      const userSessionId = req.session?.user?.id || req?.user?.id;

      // const allExperience = await ExperienceModel.find({ user: userSessionId });
      // if (allExperience.length == 0) {
      //   return res.status(404).send({ Experience: allExperience });
      // }
      res.status(200).json({ Experience: allExperience });
    } catch (error) {
      return res.status(500).json({error})
    }
  };

  //Update user
  export const updateUserExperience = async (req, res) => {
    try {
      const { error, value } = experienceSchema.validate(req.body);
  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userSessionId = req.session?.user?.id || req?.user?.id 
      const user = await UserModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const experience = await ExperienceModel.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!experience) {
            return res.status(404).send({ experience });
        }
  
      res.status(200).json({message: 'Experience updated successfully', experience });
    } catch (error) {
      return res.status(500).json({error})
    }
  };
//delete user
  export const deleteUserExperience = async (req, res) => {
    try {
     
      const userSessionId = req.session?.user?.id || req?.user?.id 
      const user = await UserModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const experience = await ExperienceModel.findByIdAndDelete(req.params.id);
        if (!experience) {
            return res.status(404).send("experience not found");
        }
  
        user.experiences.pull(req.params.id);
        await user.save();

      res.status(200).json("Experience deleted successfully");
    } catch (error) {
      return res.status(500).json({error})
    }
  };

  //Getting one userid

export const getExperienceById = async(req, res) =>{
  try {
    
      const userSessionId = req.session?.user?.id || req?.user?.id;
        const user = await UserModel.findById(userSessionId)
       
        // //Check if user exits
         if (!user) {
           return res.status(404).send("User not found");
         }
    
        //Get experience by id
        const experienceId = await ExperienceModel.findById(req.params.id);
        //Return response
        res.status(200).json(experienceId)
  } catch (error) {
    return res.status(200).json(error.message)
  }
  } 