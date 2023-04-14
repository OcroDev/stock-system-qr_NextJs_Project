import { Router } from "express";
import productController from "../controllers/productController.js";

const productRouter = Router();

//POST .../qrstock/api/product ... CREATE ONE
productRouter.post("/", productController.store);
//GET .../qrstock/api/product ... FIND ALL
productRouter.get("/", productController.findAll);
//DELETE .../qrstock/api/product ... DELETE ONE
productRouter.delete("/:id", productController.delete);
//PUT .../qrstock/api/product ... update ONE
productRouter.put("/update/:id", productController.update);
//GET .../qrstock/api/product ... FIND ONE
productRouter.get("/update/:id", productController.findOneById);
//PUT .../qrstock/api/product
productRouter.put("/update-stock", productController.updateStock);
//Get ... MIN STOCK
productRouter.get("/minstock", productController.findByMinStock);
//Get ... MUST OUT
productRouter.get("/mustout", productController.getMustOut);

//find one by id
productRouter.put("/id", productController.findByID);

export default productRouter;
