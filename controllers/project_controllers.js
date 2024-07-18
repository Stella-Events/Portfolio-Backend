import { ProjectModel } from "../models/projects.js";
import { projectSchema } from "../schema/user_projects.js";
import { UserModel } from "../models/user_model.js";


// Creating Projects Portfolio
export const addUserProject = async (req, res) => {
  try {
    const { error, value } = projectSchema.validate({
      ...req.body,
      image: req.file.filename,
    });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session?.user?.id || req?.user?.id

    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const project = await ProjectModel.create({ ...value, user: userSessionId });
    user.projects.push(project.id); 
    await user.save();

    res.status(201).json({message: 'Project added successfully', project });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

// Get all user projects
export const getAllUserProjects = async (req, res) => {
  try {
    const userSessionId = req.session?.user?.id || req?.user?.id
    const allProjects = await ProjectModel.find({ user: userSessionId });
    if (allProjects.length === 0) {
      return res.status(404).send({ projects: allProjects });
    }

    res.status(200).json({ projects: allProjects });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

;

// Update a user project
export const updateUserProject = async (req, res) => {
  try {
    const { error, value } = projectSchema.validate({
      ...req.body,
      image: req.file.filename,
    });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session?.user?.id || req?.user?.id
      const user = await UserModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
    const updatedProject = await ProjectModel.findByIdAndUpdate(req.params.id, value, { new: true }); 
    if (!updatedProject) {
      return res.status(404).send({ project: updatedProject });
    }

    return res.status(200).json({message: 'Project updated successfully', updatedProject }); 
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

// Delete a user project
export const deleteUserProject = async (req, res) => {
  try {
    

    const userSessionId = req.session?.user?.id || req?.user?.id 
    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const deletedProject = await ProjectModel.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).send('Project not found');
    }

    user.achievements.pull(req.params.id)
    await user.save();

    res.status(200).json('Project deleted successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
};

 //Getting one userid

 export const getProjectById = async(req, res, next) =>{
  try {
    
      const userSessionId = req.session?.user?.id || req?.user?.id;
        const user = await UserModel.findById(userSessionId)
       
        // //Check if user exits
         if (!user) {
           return res.status(404).send("User not found");
         }
    
        //Get project by id
        const projectId = await ProjectModel.findById(req.params.id);
        //Return response
        res.status(200).json(projectId)
  } catch (error) {
    next(error)
  }
  } 
