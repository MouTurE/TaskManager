const express = require('express');
const router = express.Router();

const {Task} = require('../models');

router.get("/", (req,res) => {
    res.send("Hello World!");
});

router.post("/", async (req, res) => {
    const task = req.body;

    await Task.create(task); // Adds to the database
    res.json(task); 
});


module.exports = router; 
