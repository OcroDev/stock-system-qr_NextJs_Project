import { Router } from "express";
import departmentController from "../controllers/departmentController.js";

const departmentRouter = Router();

//POST .../qrstock/api/user
departmentRouter.post("/", departmentController.store);
//GET .../qrstock/api/user
departmentRouter.get("/", departmentController.findAll);
//DELETE .../qrstock/api/departments ... DELETE ONE
departmentRouter.delete("/:id", departmentController.delete);
//PUT .../qrstock/api/department ... UDPATE ONE
departmentRouter.put("/update/:id", departmentController.update);
//GET .../qrstock/api/department ... FIND ONE
departmentRouter.get("/update/:id", departmentController.findOneById);

export default departmentRouter;
