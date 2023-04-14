import { Router } from "express";
import orderMovementController from "../controllers/orderMovementController.js";

const orderMovementRouter = Router();

//create new order
orderMovementRouter.post("/", orderMovementController.store);

export default orderMovementRouter;
