import jwt from "jsonwebtoken";

const generatetoken = async(userId)=>{
    return jwt.sign(
        {userId},
        process.env.JWT_SECRET,{
            expiresIn : "7d",
        },
    );
};

export default generatetoken;