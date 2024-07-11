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
   const addUser = await UserMode.create(value)
   return res.status(201).send(addUser)
};