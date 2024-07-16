import { Schema, model, Types } from "mongoose";
import {toJSON} from '@reis/mongoose-to-json'

const userProfileSchema = new Schema({
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
    githubLink: { type: String },
    linkedInLink: { type: String },
    twitterLink: { type: String },
    user: { type: Types.ObjectId, ref:'User', select:false},
},{
  timestamps: true
})

userProfileSchema.plugin(toJSON)
export const UserProfileModel = model('UserProfile', userProfileSchema)