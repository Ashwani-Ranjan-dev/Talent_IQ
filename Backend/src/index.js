import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "../config/db.js";

dotenv.config();

connectDB();

// Create Express Server
const app = express();

// Middleware to parse the cross origin request
app.use(cors());

// Middleware to parse the json body
app.use(express.json());

//Routes 
app.get("/" , (req , res) =>{
    res.send("Welcome to the TalentIQ Backend");
});

// Routes to check the backend and Frontend connectivity
app.get('/health' , (req , res)=>{
    res.json({
        success : true,
        message : 'Backend is healthy'
    });
});


const PORT = process.env.PORT  || 5000;

app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
});


