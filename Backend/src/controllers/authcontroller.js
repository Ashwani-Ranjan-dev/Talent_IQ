import brcypt from "bcryptjs";
import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import generatetoken from "../utils/generatetoken.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        //   Check all fields of the user
        if (!name || !email || !password) {
            return res.status(409).json({
                success: false,
                message: "All field is mandatory"
            });
        }

        //Check the existing User
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already Exist"
            });
        }

        // Hashed the Password
        const salt = await bcrypt.genSalt(10);

        const hashedpassword = await bcrypt.hash(password, salt);

        // Save User
        const user = await User.create({
            name,
            email,
            password: hashedpassword,
            role,
        });

        //Sending User data
        return res.status(201).json({
            success: true,
            message: "User registration Successful",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }


        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = await  generatetoken(user.id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export const currentUser = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: req.user
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const logout = async (req, res) => {
    try {
        //Deleting the Cookie 
        //Note:- Cookie  option should match when it is created during login
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        // Sending message after successful logout
        return res.status(200).json({
            success: "true",
            message: "Logout Successful"
        });
    }
    catch (error) {
        //Catching error if something error happen
        return res.status(500).json({
            success: false,
            message: error.message
        })

    }
}