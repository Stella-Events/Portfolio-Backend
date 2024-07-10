import { Schema, model, Types } from "mongoose";
import {toJSON} from '@reis/mongoose-to-json'

const projectSchema = new Schema({
    projectName: { type: String },
    description: { type: String },
    contributors: { type: String },
    skills: { type: String },
    links: { type: String },
    nameOfInstitution: { type: String },
    user: { type: Types.ObjectId, ref:'User'},
})

projectSchema.plugin(toJSON)
export const ProjectModel = model('Project',projectSchema)