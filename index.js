import express from "express";
import { dbConnection } from "./config/db.js";
import { skillRouter } from "./routes/skills_routes.js";

// creating express route
const app = express();

// use routes
app.use(skillRouter)

// Call database
dbConnection();



// listening for incoming port
const port = 5050
app.listen(port, () => {
    console.log(`App listening on ${port}`)
})