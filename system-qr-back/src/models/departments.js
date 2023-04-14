import sequelize from "../database/index.js";
import { DataTypes } from "sequelize";
import OPERATION from "./operation.js";
import ORDER from "./orders.js";

const DEPARTMENT = sequelize.define(
  "departments",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    d_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
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

DEPARTMENT.hasMany(OPERATION, {
  foreignKey: "dep_in",
  sourceKey: "id",
});

OPERATION.belongsTo(DEPARTMENT, {
  foreignKey: "dep_in",
});

DEPARTMENT.hasMany(ORDER, {
  foreignKey: "department_id",
  sourceKey: "id",
});

ORDER.belongsTo(DEPARTMENT, {
  foreignKey: "department_id",
});

export default DEPARTMENT;
