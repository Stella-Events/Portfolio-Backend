import { ProjectModel } from "../models/projects.js";
import { projectSchema } from "../schema/user_projects.js";
import { UserModel } from "../models/user_model.js";


// Creating Projects Portfolio
export const addUserProject = async (req, res) => {
  try {
    const { error, value } = projectSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session.user.id;

    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const project = await ProjectModel.create({ ...value, user: userSessionId });
    user.projects.push(project._id); 
    await user.save();

    res.status(201).json({ project });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

// Get all user projects
export const getAllUserProjects = async (req, res) => {
  try {
    const userSessionId = req.session.user.id;
    const allProjects = await ProjectModel.find({ user: userSessionId });
    if (allProjects.length === 0) {
      return res.status(404).send("No projects added");
    }

    res.status(200).json({ projects: allProjects });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

// Get one user project
export const getOneUserProject = async (req, res) => {
  try {
    const project = await ProjectModel.findById(req.params.projectId); 
    if (!project) {
      return res.status(404).send('Project not found');
    }
    res.status(200).json({ project });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Update a user project
export const updateUserProject = async (req, res) => {
  try {
    const { error, value } = projectSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session.user.id; 
      const user = await User.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
    const updatedProject = await ProjectModel.findByIdAndUpdate(req.params.projectId, value, { new: true }); 
    if (!updatedProject) {
      return res.status(404).send("Project not found");
    }

    return res.status(200).json({ project: updatedProject }); 
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

// Delete a user project
export const deleteUserProject = async (req, res) => {
  try {
    

    const userSessionId = req.session.user.id; 
    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const deletedProject = await ProjectModel.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).send('Project not found');
    }


    res.status(200).json({ project: deletedProject });
  } catch (error) {
    res.status(500).send('Server error');
  }
};
