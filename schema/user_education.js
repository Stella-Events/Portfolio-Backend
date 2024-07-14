import joi from "joi";
  
export const educationSchema = joi.object({
    schoolName: joi.string().required(),
      program: joi.string().required(),
      qualification: joi.string().required(),
      grade: joi.string(),
      location: joi.string().required(),
      startDate: joi.string().required(),
      endDate: joi.string(),
})