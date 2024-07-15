import { achievementSchema } from "../schema/user_achievement.js";
import { AchievementModel } from "../models/achievements.js";
import { UserModel } from "../models/user_model.js";


// Creating Achievements Portfolio
export const addUserAchievement = async (req, res) => {
  try {
    const { error, value } = achievementSchema.validate({  
      ...req.body,
      award: req.files.award[0].filename,
        image: req.files.image[0].filename,});

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session.user.id;

    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const achievement = await AchievementModel.create({ ...value, user: userSessionId });
    user.achievements.push(achievement._id); 
    await user.save();

    res.status(201).json({ achievement });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

// Get all user achievements
export const getAllUserAchievements = async (req, res) => {
  try {
    const userSessionId = req.session.user.id;
    const allAchievements = await AchievementModel.find({ user: userSessionId });
    if (allAchievements.length === 0) {
      return res.status(404).send("No achievements added");
    }
    res.status(200).json({ achievements: allAchievements });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

// Get one user achievement
export const getOneUserAchievement = async (req, res) => {
  try {
    const achievement = await AchievementModel.findById(req.params.achievementId); 
    if (!achievement) {
      return res.status(404).send('Achievement not found');
    }
    res.status(200).json({ achievement });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Update a user achievement
export const updateUserAchievement = async (req, res) => {
  try {
    const { error, value } = achievementSchema.validate9({
      ...req.body,
      award: req.files.award[0].filename,
        image: req.files.image[0].filename,
    })

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session.user.id; 
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const updatedAchievement = await AchievementModel.findByIdAndUpdate(req.params.achievementId, value, { new: true }); 
    if (!updatedAchievement) {
      return res.status(404).send("Achievement not found");
    }

    return res.status(200).json({ achievement: updatedAchievement }); 
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

// Delete a user achievement
export const deleteUserAchievement = async (req, res) => {
  try {
    const userSessionId = req.session.user.id; 
    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const deletedAchievement = await AchievementModel.findByIdAndDelete(req.params.id);
    if (!deletedAchievement) {
      return res.status(404).send('Achievement not found');
    }

    user.achievements.pull(req.params.id)
      await user.save();

    res.status(200).json("Achievement deleted");
  } catch (error) {
    res.status(500).send('Server error');
  }
};


