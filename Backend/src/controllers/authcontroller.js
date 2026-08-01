import brcypt from "bcryptjs";
import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";

export const register = async(req , res)=>{
  try{
      const {name , email , password , role} = req.body;

    //   Check all fields of the user
      if(!name || !email || !password){
        return res.status(409).json({
            success : false,
            message : "All field is mandatory"
        });
      }

    //Check the existing User
    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(409).json({
            success : false,
            message : "User already Exist"
        });
    }

    // Hashed the Password
    const salt = await bcrypt.genSalt(10);

    const hashedpassword = await bcrypt.hash(password , salt);

    // Save User
    const user = await User.create({
        name,
        email,
        password : hashedpassword,
        role,
    });

    //Sending User data
    return res.status(201).json({
        success : true,
        message : "User registration Successful",
        data : {
            id : user.id,
            name : user.name,
            email : user.email,
            role : user.role
        }
    });
  }
  catch(error){
      res.status(500).json({
        success : false,
        message : error.message
     });
  }
}