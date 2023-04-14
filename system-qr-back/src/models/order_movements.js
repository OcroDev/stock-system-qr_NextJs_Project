import sequelize from "../database/index.js";
import { DataTypes } from "sequelize";

const ORDER_MOVEMENT = sequelize.define(
  "order_movement",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mov_quantity: { type: DataTypes.INTEGER, allowNull: false },
    mov_note: { type: DataTypes.STRING(510), defaultValue: "" },
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

export default ORDER_MOVEMENT;
