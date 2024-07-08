import express from "express";

// creating express route
const app = express();


// listening for incoming port
const port = 5050
app.listen(port, () => {
    console.log(`App listening on ${port}`)
})