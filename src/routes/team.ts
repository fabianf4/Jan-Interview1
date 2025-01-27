import { Router } from "express";
import * as teamController from "../controllers/team";
import zodValidator from "../middlewares/zod-validator";
import * as teamSchema from "../zod-schemas/team";

const router = Router();

router.get("/", teamController.getTeams);
router.post("/", zodValidator(teamSchema.addTeam), teamController.addTeam);
router.delete(
	"/:id",
	zodValidator(teamSchema.deleteTeam),
	teamController.deleteTeam
);
router.delete(
	"/",
	zodValidator(teamSchema.deleteTeams),
	teamController.deleteTeams
);

export default router;
