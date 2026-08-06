import express from "express";

import { register , login ,  currentUser , logout} from "../controllers/authcontroller.js";
import { protect } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/register" , register);
router.post("/login" , login);
router.get("/me" , protect , currentUser);
router.post("/logout" , logout);

export default router;
