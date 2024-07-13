import joi from "joi";

export const userProfileSchema = joi.object({
    profilePicture: joi.string(), 
    // sex: joi.string().valid('Male', 'Female'), //joi validation error to fix
    maritalStatus: joi.string(),
    address: joi.string().required(),
    dateOfBirth: joi.string().required(),
    bio: joi.string(), 
    about: joi.string(),
    contact: joi.string().required(),
    resume: joi.string(),
    languages: joi.string().required(),
    githubLink: joi.string(),
    linkedInLink: joi.string(),
    twitterLink: joi.string(),
    
      
})

