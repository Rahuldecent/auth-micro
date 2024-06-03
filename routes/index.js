import { Router } from "express";
const router = Router();
import AuthRoutes from "./AuthRoutes.js"
import UserRoutes from "./userRoutes.js"

router.use("/api",AuthRoutes);
router.use("/api",UserRoutes);


export default router;