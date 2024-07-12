import * as bcrypt from "bcrypt";
import { UserModel } from "../models/user_model.js"
import { userSchema } from "../schema/user_validation.js"


export const signup = async(req, res) => {
    const {error, value} = userSchema.validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    const email = value.email
    console.log('email', email)

    const findIfUserExist = await UserModel.findOne({email})
    if(findIfUserExist){
        return res.status(401).send('User already exists')
    }else{
        const addUser = await UserModel.create(value)
        return res.status(201).send('User created successfully')
    }

    const hashedPassword = await bcrypt.hash(value.password, 12)
    value.password = hashedPassword
   const addUser = await UserModel.create(value)
   return res.status(201).send(addUser)
};

export const login = async (req, res, next) => {
    try {
        const {email, username, password} = req.body;
         //Find a user using their unique identifier
         const user = await UserModel.findOne({
           $or:[
             {email: email},
             {username: username},
           ]
         });
         if(!user){
           return res.status(401).json('No user found')
         }else{
           
           //Verify their password
           const correctPassword = bcrypt.compareSync(req.body.password, user.password);//or await bcrypt.compare
           
           if(!correctPassword) {
              res.status(401).json('Invalid credentials');
           }else{
              //Generate a session
              req.session.user = {id: user.id}//something unique that will help locate user
              //Return response
              res.status(200).json('Login successful')
           }
         }   
      } catch (error) {
       next(error)
      }
}