import ORDER_MOVEMENT from "../models/order_movements.js";

const orderMovementServices = {
  store: (newMovement) => {
    try {
      return ORDER_MOVEMENT.create(newMovement);
    } catch (error) {
      console.log(error);
    }
  },
};

export default orderMovementServices;
