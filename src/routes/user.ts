import { Router } from "express";
import * as userController from "../controllers/user";

const router = Router();

router.get("/", userController.getUser);
router.post("/", userController.addUser);

export default router;
