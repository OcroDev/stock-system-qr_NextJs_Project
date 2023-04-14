//dev dependencies
import Colors from "colors";
//production dependecies
import express from "express";
//import app from "./app.js";
import Cors from "cors";
import * as dotenv from "dotenv";
import sequelize from "./src/database/index.js";
import warehouseRouter from "./src/routes/warehouseRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import departmentRouter from "./src/routes/departmentRoutes.js";
import productRouter from "./src/routes/productRoutes.js";
import movementRouter from "./src/routes/movementRoutes.js";
import operationRouter from "./src/routes/operationRoutes.js";
import orderRouter from "./src/routes/orderRoutes.js";
import orderMovementRouter from "./src/routes/orderMovementsRoutes.js";

import "./src/models/departments.js";
import "./src/models/movements.js";
import "./src/models/warehouse.js";
import "./src/models/operation.js";
import "./src/models/operationType.js";
import "./src/models/product.js";
import "./src/models/users.js";
import "./src/models/order_movements.js";
import "./src/models/orders.js";

const app = express();
app.use(Cors());

//ENVIROMENT CONSTANTS
dotenv.config();
const PORT = process.env.PORT || 5000;

//database connection
async function databaseConnetion() {
  try {
    await sequelize.sync({ alter: true });
    console.log(
      Colors.rainbow("Connection has been established successfully.")
    );
    app.listen(PORT, () => {
      console.log(Colors.rainbow(`SERVER PORT LISTENING ON PORT ${PORT}`));
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

databaseConnetion();

app.use(express.json());

//products
app.use("/qrstock/api/products", productRouter);

//product movements
app.use("/qrstock/api/movements", movementRouter);

//warehouse
app.use("/qrstock/api/warehouses", warehouseRouter);

//users
app.use("/qrstock/api/users", userRouter);

//departments
app.use("/qrstock/api/departments", departmentRouter);

//operations
app.use("/qrstock/api/operations", operationRouter);

//orders
app.use("/qrstock/api/orders", orderRouter);

//orders
app.use("/qrstock/api/ordermovements", orderMovementRouter);
