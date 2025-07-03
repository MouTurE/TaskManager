const express = require('express');
const app = express();

const port = 3001;


app.use(express.json()); // Parsing json data into database
const db = require("./models");

// Routers
const taskRouter = require('./routes/Tasks'); 
app.use("/tasks", taskRouter); // middleware

db.sequelize.sync().then(() => {

    
    app.listen(port, () => {
        console.log("Server Running on Port " + port); 
    });

}); 
