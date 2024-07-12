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

        //create education with the value
        const education = await EducationModel.create(value)

        //after, find the user with the id that you passed when creating the education
        const user = await UserModel.findById(value.user)
        if (!user) {
            return res.status(404).send('User not found');
        }

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
     const userId =req.params.id
     const allEducation = await EducationModel.find({user: userId})
 if(allEducation.length == 0){
     return res.status(404).send('No education added')
 }
     res.status(200).json({education:allEducation})
   } catch (error) {
    next(error)
   }
}
 //Get one educatiom
export const getOneEducation = async (req, res) => {

    const education = await EducationModel.findById(req.params.id)
    res.status(200).json(education)

}

//Update education
export const patchEducation = async (req, res) => {

};