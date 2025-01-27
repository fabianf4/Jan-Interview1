import { Router } from "express";
import * as projectController from "../controllers/project";
import zodValidator from "../middlewares/zod-validator";
import * as projectSchema from "../zod-schemas/project";

const router = Router();

router.get("/", projectController.getProjects);
router.post(
	"/",
	zodValidator(projectSchema.addProject),
	projectController.addProject
);
router.delete(
	"/:id",
	zodValidator(projectSchema.deleteProject),
	projectController.deleteProject
);

export default router;
