import express from "express";
import { dbConnection } from "./config/db.js";
import userRouter from "./routes/user_routes.js";
import profileRouter from "./routes/user_profile_route.js";

// creating express route
const app = express();

//Applying middleware
app.use(express.json());


//App use
app.use('/api/v1', userRouter)
app.use(profileRouter)
 
// Call database
dbConnection();


// listening for incoming port
const port = 5050
app.listen(port, () => {
    console.log(`App listening on ${port}`)
})