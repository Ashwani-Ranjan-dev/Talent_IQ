import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

export const protect = async (req, res, next) => {

    try {

        //Get the token from the browser
        const token = req.cookies.token;

        if (!token) {

            return res.status(401).json({

                success:false,

                message:"Not Authorized"

            });

        }

        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );

        // Find the user by the decode id
        const user = await User.findById(

            decoded.userId

        ).select("-password");

        if(!user){

            return res.status(401).json({

                success:false,

                message:"User not found"

            });

        }

        // Attach user with the every controller
        req.user = user;

        // Calling the next controller
        next();

    } catch(error){

        return res.status(401).json({

            success:false,

            message:"Invalid Token"

        });

    }

};