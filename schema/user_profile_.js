import joi from "joi";

const userProfileSchema = joi.object({
    profilePicture: joi.string(), 
    sex: joi.string(),
    maritalStatus: joi.string(),
    address: joi.string(),
    dateOfBirth: joi.string(),
    bio: joi.string(), 
    about: joi.string(),
    contact: joi.string(),
    resume: joi.string(),
    languages: joi.string(), 

})

