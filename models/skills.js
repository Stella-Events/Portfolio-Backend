import { Schema, model, Types } from "mongoose";
import {toJSON} from '@reis/mongoose-to-json'

const skillSchema = new Schema({
    name: { type: String },
    levelOfProficiency: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
    },
    user: { type: Types.ObjectId, ref:'User', select:false},
},{
  timestamps:true
})

skillSchema.plugin(toJSON)
export const SkillModel = model('Skill', skillSchema)