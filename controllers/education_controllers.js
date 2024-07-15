import { EducationModel } from "../models/education.js";
import { UserModel } from "../models/user_model.js";
import { educationSchema } from "../schema/user_education.js";

//Post Education
export const addEducation = async (req, res) => {
    try {
        const { error, value } = educationSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        // find the user with the id to check whether it exits
        console.log('userId', req.session.user.id)
        
        const userSessionId = req.session.user.id
        
        const user = await UserModel.findById(userSessionId)
        
        if (!user) {
            return res.status(404).send('User not found');
        }
        
        //create education with the sessinonId
        const education = await EducationModel.create({...value, user:userSessionId})
        
        //if you find the user, push the education id you just created inside
        user.education.push(education.id);

        //and save the user now with the educationId
        await user.save();

        //return the education
        res.status(201).json({ education })

    } catch (error) {
        return res.status(500).send(error)
    }
}

//Get all education
export const getAllUserEducaton = async (req, res, next) => {
   try {
     //fetching education that belongs to a particular user
     const userSessionId = req.session.user.id
     
     const allEducation = await EducationModel.find({user: userSessionId});
 if(allEducation.length == 0){
     return res.status(404).send('No education added');
 }
     res.status(200).json({ education: allEducation});
   } catch (error) {
    next(error)
   }
}

//Update education
export const patchEducation = async (req, res) => {
    try {
      const { error, value } = educationSchema.validate(req.body);
  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userSessionId = req.session.user.id; 
      const user = await UserModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const Education = await EducationModel.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!Education) {
            return res.status(404).send("Education not found");
        }
  
      res.status(201).json({ Education });
    } catch (error) {
      return res.status(500).json({error})
    }
  };

  //Delete
  export const deleteUserEducation = async (req, res) => {
    try {
     
  
      const userSessionId = req.session.user.id; 
      const user = await UserModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const education = await EducationModel.findByIdAndDelete(req.params.id);
        if (!education) {
            return res.status(404).send("Education not found");
        }
  
        user.EducationModel.pull(req.params.id);
        await user.save();
      res.status(200).json("Education deleted");
    } catch (error) {
      return res.status(500).json({error})
    }
  };