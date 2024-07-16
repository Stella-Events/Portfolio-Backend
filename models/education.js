import { Schema, model, Types } from "mongoose";
import {toJSON} from '@reis/mongoose-to-json';

const educationSchema = new Schema({
    schoolName: { type: String },
    program: { type: String },
    qualification: { type: String },
    grade: { type: String },
    location: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    user: { type: Types.ObjectId, ref:'User', select:false},
},{
    timestamps:true
});

educationSchema.plugin(toJSON)

export const EducationModel = model('Education',educationSchema)