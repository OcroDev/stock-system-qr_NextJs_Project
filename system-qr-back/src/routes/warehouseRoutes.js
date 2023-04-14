import { Router } from "express";
import warehouseController from "../controllers/warehouseController.js";

const warehouseRouter = Router();

//POST .../qrstock/api/warehouses
warehouseRouter.post("/", warehouseController.store);

//GET .../qrstock/api/warehouse ... FIND ALL
warehouseRouter.get("/", warehouseController.findAll);

//DELETE .../qrstock/api/warehouse ... DELETE ONE
warehouseRouter.delete("/:id", warehouseController.delete);

//PUT .../qrstock/api/warehouse ... update ONE
warehouseRouter.put("/update/:id", warehouseController.update);

//GET .../qrstock/api/warehouse ... FIND ONE
warehouseRouter.get("/update/:id", warehouseController.findOneById);

export default warehouseRouter;
