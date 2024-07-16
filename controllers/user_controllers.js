import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user_model.js"
import { userSchema } from "../schema/user_validation.js"

//User Signup
export const signup = async(req, res) => {
    
  const {error, value} = userSchema.validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    //Check if user exits
    const email = value.email
    console.log('email', email)

    const findIfUserExist = await UserModel.findOne({email})
    if(findIfUserExist){
        return res.status(401).send('User already exists')
    }else{
      const hashedPassword = await bcrypt.hash(value.password, 12)
    value.password = hashedPassword
    console.log('val', value)
  //  const addUser = await UserModel.create(value)
  //  return res.status(201).send(addUser)
        
   const addUser = await UserModel.create(value)

   req.session.user = { id: addUser.id }

   return res.status(201).send('User created successfully')  
    }
    
};

//User login session
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
              
              console.log('user', req.session.user)
              //Return response
              res.status(201).json('Login successful')
           }
         }   
      } catch (error) {
       console.log(error)
      }
}

//User login token
export const token = async (req, res, next) => {
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
            //Generate a token
            const token = jwt.sign (
              {id: user.id}, 
              process.env.JWT_PRIVATE_KEY,
              {expiresIn: '3h'},
            );
            
            // console.log('user', req.session.user)
            //Return response
            res.status(200).json({
              message: 'User logged in',
              accessToken: token
            });
           
         }
       }   
    } catch (error) {
     console.log(error)
    }
}


export const logout = async(req, res, next) => {
  try {
     //Destroy user session
     await req.session.destroy();
     //Return response
     res.status(200).json('User logged out')
  } catch (error) {
     next(error)
  }
  }

  export const getUser = async(req, res, next) => {
   try {
    //get user based on the username
     const username = req.params.username.toLowerCase()
    
     //use populate to populate the fields
     //use the select to exclude the password
     
     const options = { sort: { startDate: -1 } }
     const userDetails = await UserModel.findOne({ username }).select("-password")
     .populate({
       path: "education",
       options,
     })
 
     .populate("userProfile")
    .populate("skills")

     .populate({
       path: "experiences",
       options,
     })
 
     .populate({
       path: "projects",
       options,
     })
 
     .populate({
       path: "volunteering",
       options,
     })
    
 
     .populate({
       path: "achievements",
       options: {sort: {}},
     })
    
     return res.status(201).json({user: userDetails})
   
    } catch (error) {
    next()
   }
  }

  export const getUsers = async (req, res) => {
 

    const email = req.query.email?.toLowerCase()
    const username = req.query.username?.toLowerCase();
  
    const filter = {};
    if (email) {
      filter.email = email;
    }
    if (username) {
      filter.username = username;
    }
  
    const users = await UserModel.find(filter);
  
    return res.status(200).json({ users });
  };