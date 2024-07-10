import joi from "joi";

export const achievementSchema = joi.object({
    awards: joi.string(),
    description: joi.string(),
    image: joi.string(),
    date: joi.string() ,
    nameOfInstitution: joi.string(),
})