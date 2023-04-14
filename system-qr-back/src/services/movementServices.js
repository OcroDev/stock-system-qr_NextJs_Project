import MOVEMENT from "../models/movements.js";

const movementServices = {
  countByType: (movementType) => {
    try {
    } catch (error) {}
  },
  store: (newMovement) => {
    try {
      const movement = MOVEMENT.create(newMovement);
      return movement;
    } catch (error) {}
  },
  deleteMovement: (id) => {
    try {
      return MOVEMENT.update(
        {
          isdeleted: true,
        },
        { where: { operation_cod: id } }
      );
    } catch (error) {}
  },
  findByOperationCod: (op_cod) => {
    try {
      return MOVEMENT.findAll({ where: { operation_cod: op_cod } });
    } catch (error) {}
  },
};

export default movementServices;
