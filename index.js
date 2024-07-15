import express from "express";
import { dbConnection } from "./config/db.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import expressOasGenerator from "@mickeymond/express-oas-generator";
import mongoose from "mongoose";
import cors from 'cors'
import userRouter from "./routes/user_routes.js";
import profileRouter from "./routes/user_profile_route.js";
import educationRouter from "./routes/education_route.js";
import { skillRouter } from "./routes/skills_routes.js";
import { projectRouter } from "./routes/project_routes.js";
import { volunteeringRouter } from "./routes/volunteering_routes.js";
import { achievementRouter } from "./routes/achievement_routes.js";


// Call database
dbConnection();

// creating express route
const app = express();

//Applying middleware
app.use(cors());
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
//   cookie: { secure: true }

store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL
})
})
)

// Documentation
expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['auth','userProfile', 'skills', 'projects', 'volunteering', 'experiences', 'education', 'achievements'],
    mongooseModels: mongoose.modelNames(), 
});

//Use routers

app.use('/api/v1', educationRouter)
app.use('/api/v1', skillRouter)
app.use( '/api/v1', projectRouter)
app.use( '/api/v1', volunteeringRouter);
app.use( '/api/v1', achievementRouter)
app.use('/api/v1', userRouter)
app.use('/api/v1', profileRouter)

expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));

const reboot = async () => {
    setInterval(restartServer, process.env.INTERVAL)
    }

// listening for incoming port
const port = process.env.PORT|| 5050
app.listen(port, () => {
    console.log(`App listening on ${port}`)
})