import { Router } from "express";
import * as memberController from "../controllers/member";
import zodValidator from "../middlewares/zod-validator";
import * as memberSchemas from "../zod-schemas/member";

const router = Router();

router.get("/", memberController.getMembers);
router.get(
	"/:id",
	zodValidator(memberSchemas.findMember),
	memberController.getMember
);
router.post(
	"/",
	zodValidator(memberSchemas.addMember),
	memberController.addMember
);

export default router;
