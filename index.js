import express from "express";
import { dbConnection } from "./config/db.js";
import { volunteeringRouter } from "./routes/volunteering_routes.js";

// creating express route
const app = express();

app.use(volunteeringRouter);

// Call database
dbConnection();


// listening for incoming port
const port = 5050
app.listen(port, () => {
    console.log(`App listening on ${port}`)
})