import User from "../models/usermodel.js";

export const CreateUser = async(req , res)=>{

    try{
        const{name, email , password , role} = req.body;

        const user = await User.create({
            name,
            email,
            password,
            role,
        });

        res.status(201).json({
            success : true,
            message : "User created Successfully",
            data : user
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message : error.message
        });
    }
}
