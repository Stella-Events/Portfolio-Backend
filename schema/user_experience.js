import joi from "joi";

export const experienceSchema = joi.object({
    companyName: joi.string().required(),
    role: joi.string().required(),
    responsibility: joi.string().required(),
    skills: joi.string(),
    location: joi.string().required(),
    startDate: joi.string().required(),
    endDate: joi.string(),
})