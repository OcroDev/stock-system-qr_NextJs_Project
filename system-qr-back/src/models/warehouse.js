import { DataTypes } from "sequelize";
import sequelize from "../database/index.js";
import OPERATION from "./operation.js";
import ORDER from "./orders.js";

const WAREHOUSE = sequelize.define(
  "warehouse",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    w_description: {
      type: DataTypes.STRING,
    },
    isdeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdat: {
      type: DataTypes.STRING,
      defaultValue: new Date().toLocaleDateString("es-VE"),
    },
  },
  {
    timestamps: false,
  }
);

WAREHOUSE.hasMany(OPERATION, {
  foreignKey: "warehouse_out",
  sourceKey: "id",
});

OPERATION.belongsTo(WAREHOUSE, {
  foreignKey: "warehouse_out",
});

WAREHOUSE.hasMany(OPERATION, {
  foreignKey: "warehouse_in",
  sourceKey: "id",
});

OPERATION.belongsTo(WAREHOUSE, {
  foreignKey: "warehouse_in",
});

WAREHOUSE.hasMany(ORDER, {
  foreignKey: "warehouse_id",
  sourceKey: "id",
});

ORDER.belongsTo(WAREHOUSE, {
  foreignKey: "warehouse_id",
});

export default WAREHOUSE;

// // import mongoose from "mongoose";

// // const collegeSchema = mongoose.Schema(
// //   {
// //     co_description: { type: String, require: true },
// //     isDeleted: { type: Date, default: null },
// //   },
// //   {
// //     timestamps: true,
// //   }
// // );

// // const COLLEGE = mongoose.model("College", collegeSchema);

// // export default COLLEGE;
