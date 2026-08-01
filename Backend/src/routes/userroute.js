import express from "express";
import { CreateUser } from "../controllers/usercontroller.js";

const router = express.Router();

router.post("/" , CreateUser);

export default router;