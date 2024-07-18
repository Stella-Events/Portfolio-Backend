import { achievementSchema } from "../schema/user_achievement.js";
import { AchievementModel } from "../models/achievements.js";
import { UserModel } from "../models/user_model.js";


// Creating Achievements Portfolio
export const addUserAchievement = async (req, res) => {
  try {
    const { error, value } = achievementSchema.validate({
      ...req.body,
      image: req.file.filename,
    });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session?.user?.id || req?.user?.id;

    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const achievement = await AchievementModel.create({ ...value, user: userSessionId });
    user.achievements.push(achievement.id);
    await user.save();

    res.status(201).json({ achievement });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// Get all user achievements
export const getAllUserAchievements = async (req, res) => {
  try {
    const userSessionId = req.session?.user?.id || req?.user?.id;
    const allAchievements = await AchievementModel.find({ user: userSessionId });
    if (allAchievements.length === 0) {
      return res.status(404).send("No achievements added");
    }
    res.status(200).json({ achievements: allAchievements });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};



// Update a user achievement
export const updateUserAchievement = async (req, res) => {
  try {
    const { error, value } = achievementSchema.validate({
      ...req.body,
      image: req.file.filename,
    })

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const updatedAchievement = await AchievementModel.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!updatedAchievement) {
      console.log('updatedAchievement', updatedAchievement)
      return res.status(404).send("Achievement not found");
    }

    return res.status(200).json({ achievement: updatedAchievement });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// Delete a user achievement
export const deleteUserAchievement = async (req, res) => {
  try {
    const userSessionId = req.session?.user?.id || req?.user?.id;
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

    res.status(200).json("Achievement deleted successfully");
  } catch (error) {
    res.status(500).json(console.log(error.message));
  }
};

//Getting one userid

export const getAchievementById = async(req, res, next) =>{
try {
  
    const userSessionId = req.session?.user?.id || req?.user?.id;
      const user = await UserModel.findById(userSessionId)
     
      // //Check if user exits
       if (!user) {
         return res.status(404).send("User not found");
       }
  
      //Get achievement by id
      const achievementId = await AchievementModel.findById(req.params.id);
      //Return response
      res.status(200).json(achievementId)
} catch (error) {
  next(error)
}
} 
