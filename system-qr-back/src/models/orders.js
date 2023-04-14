import sequelize from "../database/index.js";
import DataTypes from "sequelize";
import ORDER_MOVEMENT from "./order_movements.js";

const ORDER = sequelize.define(
  "order",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
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

ORDER.hasMany(ORDER_MOVEMENT, {
  foreignKey: "order_cod",
  sourceKey: "id",
});

ORDER_MOVEMENT.belongsTo(ORDER, {
  foreignKey: "order_cod",
});

export default ORDER;
