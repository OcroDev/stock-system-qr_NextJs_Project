import sequelize from "../database/index.js";
import { DataTypes } from "sequelize";

const MOVEMENT = sequelize.define(
  "movements",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mov_note: { type: DataTypes.STRING, defaultValue: "" },
    mov_quantity: { type: DataTypes.INTEGER, allowNull: false },
    isdeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdat: {
      type: DataTypes.STRING,
      defaultValue: new Date().toLocaleDateString("es-VE"),
    },
  },
  {
    timestamps: false,
  }
);

export default MOVEMENT;

// // import mongoose from "mongoose";

// // const movementSchema = mongoose.Schema(
// //   {
// //     mov_cod: { type: String, required: true },
// //     p_id: { type: Array, required: true },
// //     mov_note: { type: String },
// //     mov_quantity: { type: Array, required: true },
// //     mov_type: { type: String, required: true },
// //     isDeleted: { type: Date, defalut: null },
// //   },
// //   {
// //     timestamps: true,
// //   }
// // );

// // const MOVEMENT = mongoose.model("Movement", movementSchema);

// // export default MOVEMENT;
