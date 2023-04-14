import { Router } from "express";
import orderController from "../controllers/orderController.js";

const orderRouter = Router();

//get last id
orderRouter.get("/last-id", orderController.findLastId);

//get all orders
orderRouter.get("/", orderController.findAll);
//get all orders report
orderRouter.get("/report", orderController.findAllReport);

//create new order
orderRouter.post("/", orderController.store);
//delete new order
orderRouter.put("/delete", orderController.delete);

orderRouter.post("/report", orderController.findOrderReportById);

export default orderRouter;
