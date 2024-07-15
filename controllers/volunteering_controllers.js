import { VolunteeringModel } from "../models/volunteering.js";
import { UserModel } from "../models/user_model.js";
import { volunteeringSchema } from "../schema/user_volunteering.js";


// Creating Volunteering Portfolio
export const addUserVolunteering = async (req, res) => {
  try {
    const { error, value } = volunteeringSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session.user.id;

    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const volunteering = await VolunteeringModel.create({ ...value, user: userSessionId });
    user.volunteering.push(volunteering.id);
    await user.save();

    res.status(201).json({ volunteering });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

// Get all user volunteerings
export const getAllUserVolunteerings = async (req, res) => {
  try {
    const userSessionId = req.session.user.id;
    const allVolunteerings = await VolunteeringModel.find({ user: userSessionId });
    if (allVolunteerings.length === 0) {
      return res.status(404).send("No volunteerings added");
    }
    res.status(200).json({ volunteerings: allVolunteerings });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

// Get one user volunteering
export const getOneUserVolunteering = async (req, res) => {
  try {
    const volunteering = await VolunteeringModel.findById(req.params.id);
    if (!volunteering) {
      return res.status(404).send('Volunteering not found');
    }
    res.status(200).json({ volunteering });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Update a user volunteering
export const updateUserVolunteering = async (req, res) => {
  try {
    const { error, value } = volunteeringSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session.user.id;
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const updatedVolunteering = await VolunteeringModel.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!updatedVolunteering) {
      return res.status(404).send("Volunteering not found");
    }

    return res.status(200).json({ volunteering: updatedVolunteering });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

// Delete a user volunteering
export const deleteUserVolunteering = async (req, res) => {
  try {
    const userSessionId = req.session.user.id;
    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const deletedVolunteering = await VolunteeringModel.findByIdAndDelete(req.params.id);
    if (!deletedVolunteering) {
      return res.status(404).send('Volunteering not found');
    }

    user.volunteering.pull(req.params.id)
    await user.save();


    res.status(200).json("Volunteering deleted successfully");
  } catch (error) {
    res.status(500).send('Server error');
  }
};
