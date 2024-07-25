import joi from "joi";

export const userProfileSchema = joi.object({
    profilePicture: joi.string(), 
    sex: joi.string().valid('male', 'female').required(), 
    maritalStatus: joi.string(),
    address: joi.string().required(),
    dateOfBirth: joi.string().required(),
    bio: joi.string(), 
    about: joi.string(),
    contact: joi.string(),
    resume: joi.string(),
    languages: joi.string(),
    githubLink: joi.string(),
    linkedInLink: joi.string(),
    twitterLink: joi.string(),
    
      
})

