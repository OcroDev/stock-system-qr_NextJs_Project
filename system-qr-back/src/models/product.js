import sequelize from "../database/index.js";
import { DataTypes } from "sequelize";
import MOVEMENT from "./movements.js";
import ORDER_MOVEMENT from "./order_movements.js";

const PRODUCT = sequelize.define(
  "products",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    p_description: {
      type: DataTypes.STRING,
      validate: { notEmpty: true, notNull: true },
      allowNull: false,
    },
    p_stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    p_minstock: { type: DataTypes.INTEGER, defaultValue: 0 },
    p_unit: { type: DataTypes.STRING, defaultValue: "" },
    p_ubication: {
      type: DataTypes.STRING,
      validate: { notEmpty: true, notNull: true },
      allowNull: false, //System-Qr-Back/src/assets/product_qr_code
    },
    p_qrcode: {
      type: DataTypes.STRING,
      allowNull: false,
      //validate: { notEmpty: true, notNull: true },
      defaultValue: "",
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

PRODUCT.hasMany(MOVEMENT, {
  foreignKey: "product_id",
  sourceKey: "id",
});

MOVEMENT.belongsTo(PRODUCT, {
  foreignKey: "product_id",
  //targedId: "id",
});

PRODUCT.hasMany(ORDER_MOVEMENT, {
  foreignKey: "product_id",
  sourceKey: "id",
});

ORDER_MOVEMENT.belongsTo(PRODUCT, {
  foreignKey: "product_id",
});

export default PRODUCT;

// // import mongoose from "mongoose";

// // const productSchema = mongoose.Schema(
// //   {
// //     p_description: { type: String, require: true },
// //     p_stock: { type: Number, default: 0 },
// //     p_MinStock: { type: Number, default: 0 },
// //     p_price: { type: Number, default: 0 },
// //     p_measurementUnit: { type: String, default: "" },
// //     p_location: { type: String, required: true },
// //     isDeleted: { type: Date, default: null },
// //   },
// //   {
// //     timestamps: true,
// //   }
// // );

// // const PRODUCT = mongoose.model("Product", productSchema);

// // export default PRODUCT;
