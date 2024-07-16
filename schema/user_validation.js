import joi from "joi";

 export const userSchema = joi.object({
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        otherNames: joi.string(),
        email: joi.string().email().required(),
        password: joi.string().min(4).required(),
        confirmPassword: joi.ref('password'),
        username: joi.string().required(),
        termsAndConditions: joi.boolean(),
        
    
}) .with('password', 'confirmPassword')

export const userProfileSchema = joi.object({
        profilePicture: joi.string(), 
        sex: joi.string().valid('male', 'female').required(),  
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
        user: joi.string().required()
          
    }) 

    export const educationSchema = joi.object({
        schoolName: joi.string().required(),
          program: joi.string().required(),
          qualification: joi.string().required(),
          grade: joi.string(),
          location: joi.string().required(),
          startDate: joi.string().required(),
          endDate: joi.string(),
          user: joi.string().required(),
    })

    export const achievementSchema = joi.object({
        awards: joi.string(),
        description: joi.string(),
        image: joi.string(),
        date: joi.string() ,
        nameOfInstitution: joi.string(),
        user: joi.string().required(),
    })

    export const  skillSchema = joi.object({
        name: joi.string(),
        levelOfProficiency: joi.string().valid('beginner', 'intermidiate', 'advanced', 'expert'),
        user: joi.string().required()  
    })

    export const volunteeringSchema = joi.object({
        organization: joi.string(),
        description: joi.string(), 
        skills: joi.string(),
        role: joi.string(),
        responsibility: joi.string(), 
        location: joi.string(),
        startDate: joi.string(),
        endDate: joi.string(),
        projectName: joi.string(),
        user: joi.string().required()
    })

    export const projectSchema = joi.object({
        projectName: joi.string(),
        description: joi.string(),
        contributors: joi.string(),
        skills: joi.string(),
        links: joi.string(),
        nameOfInstitution: joi.string(),
        user: joi.string().required()
    })

    export const experienceSchema = joi.object({
        companyName: joi.string().required(),
        role: joi.string().required(),
        responsibility: joi.string().required(),
        skills: joi.string(),
        location: joi.string().required(),
        startDate: joi.string().required(),
        endDate: joi.string(),
        user: joi.string().required()
    })
