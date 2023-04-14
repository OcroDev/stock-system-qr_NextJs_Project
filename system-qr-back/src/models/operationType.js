import sequelize from "../database/index.js";
import DataTypes from "sequelize";
import MOVEMENT from "./movements.js";
import OPERATION from "./operation.js";

const OPERATION_TYPE = sequelize.define(
  "operation_type",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
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

OPERATION_TYPE.hasMany(MOVEMENT, {
  foreignKey: "operation_type_id",
  sourceKey: "id",
});

MOVEMENT.belongsTo(OPERATION_TYPE, {
  foreignKey: "operation_type_id",
  //targedId: "id",
});

OPERATION_TYPE.hasMany(OPERATION, {
  foreignKey: "operation_type_id",
  sourceKey: "id",
});

OPERATION.belongsTo(OPERATION_TYPE, {
  foreignKey: "operation_type_id",
});

export default OPERATION_TYPE;
