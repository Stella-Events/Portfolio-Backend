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
        
        const userSessionId = req.session?.user?.id || req?.user?.id
        
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
        res.status(201).json({message: 'Education added succesfully' ,education })

    } catch (error) {
        return res.status(500).send(error)
    }
}

//Get all education
export const getAllUserEducaton = async (req, res, next) => {
   try {
     //fetching education that belongs to a particular user
     const userSessionId = req.session?.user?.id || req?.user?.id
     
     const allEducation = await EducationModel.find({user: userSessionId});
 if(allEducation.length == 0){
     return res.status(404).send({ education: allEducation});
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
  
      const userSessionId = req.session?.user?.id || req?.user?.id; 
      const user = await UserModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const Education = await EducationModel.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!Education) {
            return res.status(404).send({ Education });
        }
  
      res.status(201).json({message: 'Education updated successfully', Education });
    } catch (error) {
      return res.status(500).json({error})
    }
  };

  //Delete
  export const deleteUserEducation = async (req, res) => {
    try {
     
  
      const userSessionId = req.session?.user?.id || req?.user?.id; 
      const user = await UserModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const education = await EducationModel.findByIdAndDelete(req.params.id);
        if (!education) {
            return res.status(404).send("Education not found");
        }
  
        user.education.pull(req.params.id);
        await user.save();
      res.status(200).json("Education deleted");
    } catch (error) {
      return res.status(500).json({error})
    }
  };

  //Getting one userid

export const getEducationById = async(req, res) =>{
  try {
    
      const userSessionId = req.session?.user?.id || req?.user?.id;
        const user = await UserModel.findById(userSessionId)
       
        // //Check if user exits
         if (!user) {
           return res.status(404).send("User not found");
         }
    
        //Get education by id
        const educationId = await EducationModel.findById(req.params.id);
        //Return response
        res.status(200).json(educationId)
  } catch (error) {
    return res.status(500).json(error.message)
  }
  } 
  