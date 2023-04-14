import { Router } from "express";
import movementController from "../controllers/movementController.js";

const movementRouter = Router();

movementRouter.post("/", movementController.store);
movementRouter.post("/op-cod", movementController.findByOperationCod);
movementRouter.put("/delete", movementController.deleteMovement);

export default movementRouter;
