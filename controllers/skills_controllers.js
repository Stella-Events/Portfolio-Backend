import { skillSchema } from "../schema/user_skills.js";
import { SkillModel } from "../models/skills.js";
import { UserModel } from "../models/user_model.js";

// Creating Skills Portfolio
export const addUserSkill = async (req, res) => {
  try {
    const { error, value } = skillSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session.user.id;

    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const skill = await SkillModel.create({ ...value, user: userSessionId });
    user.skills.push(skill._id); // Fixed to use 'skills' array
    await user.save();

    res.status(201).json({ skill });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

// Get all user skills
export const getAllUserSkills = async (req, res) => {
  try {
    const userSessionId = req.session.user.id;
    const allSkills = await SkillModel.find({ user: userSessionId });
    if (allSkills.length === 0) {
      return res.status(404).send("No skills added");
    }
    res.status(200).json({ skills: allSkills });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

// Get one user skill
export const getOneUserSkill = async (req, res) => {
  try {
    const skill = await SkillModel.findById(req.params.skillId); // Fixed variable name
    if (!skill) {
      return res.status(404).send('Skill not found');
    }
    res.status(200).json({ skill });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Update a user skill
export const updateUserSkill = async (req, res) => {
  try {
    const { error, value } = skillSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const updatedSkill = await SkillModel.findByIdAndUpdate(req.params.skillId, value, { new: true }); // Fixed to use 'skillId'
    if (!updatedSkill) {
      return res.status(404).send("Skill not found");
    }

    return res.status(200).json({ skill: updatedSkill }); // Changed status code to 200
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

// Delete a user skill
export const deleteUserSkill = async (req, res) => {
  try {
    const deletedSkill = await SkillModel.findByIdAndDelete(req.params.skillId);

    if (!deletedSkill) {
      return res.status(404).send('Skill not found');
    }

    // Remove skill reference from user
    const user = await UserModel.findById(deletedSkill.user);
    if (user) {
      user.skills = user.skills.filter(skillId => skillId.toString() !== req.params.skillId); // Fixed to use 'skills' array
      await user.save();
    }

    res.status(200).json({ skill: deletedSkill });
  } catch (error) {
    res.status(500).send('Server error');
  }
};
