import WAREHOUSE from "../models/warehouse.js";
import Colors from "colors";

const warehouseServices = {
  findAll: () => {
    try {
      return WAREHOUSE.findAll({
        where: { isdeleted: false },
      });
    } catch (error) {
      console.log(error);
    }
  },
  findOneByDescription: (description) => {
    try {
      const werehouse = WAREHOUSE.findOne({
        where: { w_description: description },
      });
      return werehouse;
    } catch (error) {
      console.log(error);
    }
  },
  findOneById: (warehouseId) => {
    try {
      return WAREHOUSE.findByPk(warehouseId);
    } catch (error) {
      console.log(error);
    }
  },
  update: (id, warehouse) => {
    try {
      return WAREHOUSE.update(
        {
          w_description: warehouse.w_description,
        },
        { where: { id: id } }
      );
    } catch (error) {
      console.log(error);
    }
  },
  store: (newWarehouse) => {
    const { w_description } = newWarehouse;

    try {
      const warehouse = WAREHOUSE.create({ w_description });
      return warehouse;
    } catch (error) {
      console.log(error);
    }
  },
  delete: (warehouseId) => {
    try {
      return WAREHOUSE.update(
        { isdeleted: true },
        { where: { id: warehouseId } }
      );
    } catch (error) {
      console.log(error);
    }
  },
};

export default warehouseServices;
