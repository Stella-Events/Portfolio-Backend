import { Schema, model } from "mongoose";

const userSchema = new Schema({
  user: {
    firstName: { type: String },
    lastName: { type: String },
    otherNames: { type: String },
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    termsAndConditions: { type: Boolean },
    password: { type: String },
  },

  userProfile: {
    profilePicture: { type: String },
    sex: { type: String, enum: ["male", "female"] },
    maritalStatus: {
      type: String,
      enum: ["single", "married", "prefer-not-to-say"],
    },
    address: { type: String },
    dateOfBirth: { type: String },
    bio: { type: String },
    about: { type: String },
    contact: { type: String },
    resume: { type: String },
    languages: [{ type: String }],
  },

  socials: {
    githubLink: { type: String },
    linkedInLink: { type: String },
    twitterLink: { type: String },
  },

  skills: [
    {
      name: { type: String },
      levelOfProficiency: {
        type: String,
        enum: ["beginner", "intermidiate", "advanced", "expert"],
      },
    },
  ],

  experience: [
    {
      companyName: { type: String },
      role: { type: String },
      responsibility: { type: String },
      skills: { type: String },
      location: { type: String },
      startDate: { type: String },
      endDate: { type: String },
    },
  ],

  education: [
    {
      schoolName: { type: String },
      program: { type: String },
      qualification: { type: String },
      grade: { type: String },
      location: { type: String },
      startDate: { type: String },
      endDate: { type: String },
    },
  ],

  achievements: [
    {
      awards: { type: String },
      description: { type: String },
      image: { type: String },
      date: { type: String },
      nameOfInstitution: { type: String },
    },
  ],

  projects: [
    {
      projectName: { type: String },
      description: { type: String },
      contributors: { type: String },
      skills: { type: String },
      links: { type: String },
      nameOfInstitution: { type: String },
    },
  ],

  volunteering: [
    {
      organization: { type: String },
      description: { type: String },
      skills: { type: String },
      role: { type: String },
      responsibility: { type: String },
      location: { type: String },
      startDate: { type: String },
      endDate: { type: String },
      projectName: { type: String },
    },
  ],
});

export const UserModel = model("User", userSchema);
