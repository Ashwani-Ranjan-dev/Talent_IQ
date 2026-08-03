import express, { Router } from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userroute.js";
import authroute from "./routes/authroute.js";

dotenv.config();

connectDB();

// Create Express Server
const app = express();

// Middleware to parse the cross origin request
app.use(
    cors({
        origin : "http://localhost:5173",
        credentials: true,
    })
);

// Middleware to parse the json body
app.use(express.json());

// Middleware for the Cookie-parser
app.use(cookieParser());



//Routes 
app.use("/api/user" , userRoute);

app.use("/api/auth" , authroute );

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


