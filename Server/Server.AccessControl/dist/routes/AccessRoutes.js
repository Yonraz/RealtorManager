import { Router } from "express";
import { login, register, refresh } from "../controller/AccessController.js";
const router = Router();
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/register", register);
export default router;
