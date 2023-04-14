import { Router } from "express";
import userController from "../controllers/userController.js";

const userRouter = Router();

//POST .../qrstock/api/user
userRouter.post("/", userController.store);

//GET .../qrstock/api/user
userRouter.get("/", userController.findAll);

//DELETE .../qrstock/api/user ... DELETE ONE
userRouter.delete("/:id", userController.delete);

//PUT .../qrstock/api/user ... update ONE
userRouter.put("/update/:id", userController.update);

//GET .../qrstock/api/user ... FIND ONE by id
userRouter.get("/update/:id", userController.findOneById);

//GET ... /qrstock/api/user ... FIND ONE BY NAME "login"
userRouter.post("/login", userController.loginCheck);

export default userRouter;
