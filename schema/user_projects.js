import joi from "joi";
  
export const projectSchema = joi.object({
    projectName: joi.string(),
    description: joi.string(),
    contributors: joi.string(),
    skills: joi.string(),
    links: joi.string(),
    nameOfInstitution: joi.string(),
})