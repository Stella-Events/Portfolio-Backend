import joi from "joi";

export const  skillSchema = joi.object({
    name: joi.string(),
    levelOfProficiency: joi.string().valid('beginner', 'intermidiate', 'advanced', 'expert'),
        
})