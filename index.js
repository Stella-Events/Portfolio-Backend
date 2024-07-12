import express from "express";
import { dbConnection } from "./config/db.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import userRouter from "./routes/user_routes.js";
import profileRouter from "./routes/user_profile_route.js";

// Call database
dbConnection();

// creating express route
const app = express();

//Applying middleware
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


//App use
app.use('/api/v1', userRouter)
app.use(profileRouter)
 
// listening for incoming port
const port = 5050
app.listen(port, () => {
    console.log(`App listening on ${port}`)
})